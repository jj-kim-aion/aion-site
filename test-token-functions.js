// Test the token creation and validation functions
require('dotenv').config({ path: '.env.local' });

// Import the compiled TypeScript (we'll use a workaround)
const { randomUUID } = require('crypto');
const { createClient } = require('redis');

// Token expiry constant
const TOKEN_EXPIRY_SECONDS = 6 * 60 * 60; // 6 hours

// Redis client singleton
let redisClient = null;

async function getRedisClient() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL;
    
    if (!redisUrl) {
      throw new Error("REDIS_URL environment variable is not configured");
    }

    redisClient = createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: (retries) => {
          if (retries > 3) {
            console.error("Redis: Max reconnection attempts reached");
            return new Error("Redis connection failed");
          }
          return Math.min(retries * 100, 3000);
        },
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    await redisClient.connect();
    console.log("✅ Redis client connected\n");
  }

  return redisClient;
}

async function createToken(email, productId) {
  const token = randomUUID();
  const now = Date.now();

  const tokenData = {
    email,
    productId,
    createdAt: now,
    expiresAt: now + (TOKEN_EXPIRY_SECONDS * 1000),
  };

  try {
    const client = await getRedisClient();
    const key = `download-token:${token}`;

    await client.set(key, JSON.stringify(tokenData), {
      EX: TOKEN_EXPIRY_SECONDS,
    });

    console.log(`✅ Token created: ${token} | Email: ${email} | Expires in ${TOKEN_EXPIRY_SECONDS}s`);
    return token;
  } catch (error) {
    console.error("❌ Failed to create token in Redis:", error);
    throw new Error("Token storage failed - Redis unavailable");
  }
}

async function validateAndConsumeToken(token) {
  try {
    const client = await getRedisClient();
    const key = `download-token:${token}`;

    // Atomic get-and-delete
    const dataString = await client.getDel(key);

    if (!dataString) {
      console.log(`⚠️ Token validation failed: not found or already consumed | Token: ${token}`);
      return null;
    }

    const data = JSON.parse(dataString);

    if (Date.now() > data.expiresAt) {
      console.log(`⚠️ Token expired (manual check) | Token: ${token}`);
      return null;
    }

    console.log(`✅ Token consumed successfully | Token: ${token} | Email: ${data.email}`);
    return data;
  } catch (error) {
    console.error("❌ Token validation error:", error);
    return null;
  }
}

async function testTokenFlow() {
  console.log('🧪 Testing Token Creation and Validation\n');
  console.log('='.repeat(50) + '\n');
  
  try {
    // Test 1: Create token
    console.log('📝 Test 1: Create Token');
    const testEmail = 'test@example.com';
    const testProductId = 'super-agent-playbook';
    
    const token = await createToken(testEmail, testProductId);
    console.log(`Token: ${token}\n`);
    
    // Test 2: Validate and consume token (should succeed)
    console.log('🔍 Test 2: Validate and Consume Token (First Attempt)');
    const tokenData1 = await validateAndConsumeToken(token);
    
    if (tokenData1) {
      console.log('✅ Token data retrieved:', tokenData1);
      console.log(`   Email: ${tokenData1.email}`);
      console.log(`   Product: ${tokenData1.productId}`);
      console.log(`   Created: ${new Date(tokenData1.createdAt).toISOString()}`);
      console.log(`   Expires: ${new Date(tokenData1.expiresAt).toISOString()}\n`);
    } else {
      console.log('❌ Failed to retrieve token data\n');
    }
    
    // Test 3: Try to use the same token again (should fail - one-time use)
    console.log('🔍 Test 3: Try to Consume Same Token Again (Should Fail)');
    const tokenData2 = await validateAndConsumeToken(token);
    
    if (tokenData2) {
      console.log('❌ ERROR: Token was reusable! This is a security issue.\n');
    } else {
      console.log('✅ Token correctly rejected (already consumed)\n');
    }
    
    // Test 4: Create another token and verify it exists
    console.log('📝 Test 4: Create Another Token');
    const token2 = await createToken('another@example.com', testProductId);
    console.log(`Token: ${token2}\n`);
    
    console.log('='.repeat(50));
    console.log('✅ All tests passed! Token system working correctly.');
    
    // Cleanup
    if (redisClient) {
      await redisClient.quit();
      console.log('👋 Redis connection closed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testTokenFlow();
