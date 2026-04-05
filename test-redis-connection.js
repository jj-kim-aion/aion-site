// Quick Redis connection test
const { createClient } = require('redis');
require('dotenv').config({ path: '.env.local' });

async function testRedisConnection() {
  console.log('🔍 Testing Redis connection...\n');
  
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    console.error('❌ REDIS_URL not found in environment');
    process.exit(1);
  }
  
  console.log(`📍 REDIS_URL: ${redisUrl.replace(/:[^:@]+@/, ':****@')}\n`);
  
  const client = createClient({
    url: redisUrl,
    socket: {
      connectTimeout: 5000,
    },
  });
  
  client.on('error', (err) => {
    console.error('❌ Redis Client Error:', err.message);
  });
  
  try {
    console.log('🔌 Connecting to Redis...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    // Test SET operation
    console.log('📝 Testing SET operation...');
    const testKey = 'test-key-' + Date.now();
    await client.set(testKey, 'Hello Redis!', { EX: 60 });
    console.log(`✅ SET ${testKey} = "Hello Redis!" (60s TTL)\n`);
    
    // Test GET operation
    console.log('📖 Testing GET operation...');
    const value = await client.get(testKey);
    console.log(`✅ GET ${testKey} = "${value}"\n`);
    
    // Test DEL operation
    console.log('🗑️  Testing DEL operation...');
    await client.del(testKey);
    console.log(`✅ Deleted ${testKey}\n`);
    
    // Verify deletion
    console.log('🔍 Verifying deletion...');
    const deletedValue = await client.get(testKey);
    console.log(`✅ GET ${testKey} = ${deletedValue === null ? 'null (deleted)' : deletedValue}\n`);
    
    console.log('🎉 All Redis operations successful!');
    
    await client.quit();
    console.log('👋 Connection closed');
    
  } catch (error) {
    console.error('❌ Redis test failed:', error.message);
    process.exit(1);
  }
}

testRedisConnection();
