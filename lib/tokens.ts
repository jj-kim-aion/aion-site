import { randomUUID } from "crypto";
import { createClient } from "redis";

interface TokenData {
  email: string;
  productId: string;
  createdAt: number;
  expiresAt: number;
}

const TOKEN_EXPIRY_SECONDS = 6 * 60 * 60; // 6 hours

/**
 * Redis client singleton with lazy connection
 */
let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL;
    
    if (!redisUrl) {
      throw new Error("REDIS_URL environment variable is not configured");
    }

    redisClient = createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 5000, // 5 second timeout
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

    redisClient.on("connect", () => {
      console.log("Redis: Connected successfully");
    });

    redisClient.on("reconnecting", () => {
      console.log("Redis: Reconnecting...");
    });

    try {
      await redisClient.connect();
      console.log("Redis: Client initialized and connected");
    } catch (error) {
      console.error("Redis: Failed to connect:", error);
      redisClient = null;
      throw error;
    }
  }

  // Verify connection is alive
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
    } catch (error) {
      console.error("Redis: Reconnection failed:", error);
      throw new Error("Redis connection unavailable");
    }
  }

  return redisClient;
}

/**
 * Generate a secure download token with 6-hour expiry using Redis.
 * 
 * PRODUCTION ARCHITECTURE:
 * - ✅ Persists across serverless function invocations
 * - ✅ Works in multi-instance deployments
 * - ✅ Automatic expiry via Redis TTL
 * - ✅ One-time use enforcement via atomic delete
 * - ✅ Fast lookups with Redis
 * - ✅ Compatible with Upstash Redis and standard Redis
 * 
 * REQUIRES:
 * - REDIS_URL environment variable (standard Redis connection string)
 *   Format: redis://username:password@host:port
 */

/**
 * Generate a secure download token with 6-hour expiry
 */
export async function createToken(email: string, productId: string): Promise<string> {
  const token = randomUUID();
  const now = Date.now();

  const tokenData: TokenData = {
    email,
    productId,
    createdAt: now,
    expiresAt: now + (TOKEN_EXPIRY_SECONDS * 1000),
  };

  try {
    const client = await getRedisClient();
    const key = `download-token:${token}`;

    // Store in Redis with automatic expiry (EX = seconds)
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

/**
 * Validate and consume a download token (one-time use)
 * 
 * Uses atomic GET + DEL to prevent race conditions
 */
export async function validateAndConsumeToken(token: string): Promise<TokenData | null> {
  try {
    const client = await getRedisClient();
    const key = `download-token:${token}`;

    // Atomic get-and-delete using multi/exec transaction
    const dataString = await client.getDel(key);

    if (!dataString) {
      console.log(`⚠️ Token validation failed: not found or already consumed | Token: ${token}`);
      return null; // Token doesn't exist or already consumed
    }

    const data: TokenData = JSON.parse(dataString);

    // Double-check expiry (should be handled by Redis TTL, but safety check)
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

/**
 * Check if token is valid without consuming it (for testing/debugging)
 */
export async function isTokenValid(token: string): Promise<boolean> {
  try {
    const client = await getRedisClient();
    const key = `download-token:${token}`;
    
    const dataString = await client.get(key);

    if (!dataString) {
      return false;
    }

    const data: TokenData = JSON.parse(dataString);
    
    if (Date.now() > data.expiresAt) {
      // Clean up expired token
      await client.del(key);
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ Token validation check error:", error);
    return false;
  }
}

/**
 * Get token store stats (for monitoring)
 * 
 * Note: This scans Redis keys - use sparingly in production
 */
export async function getTokenStats(): Promise<{ active: number; total: number }> {
  try {
    const client = await getRedisClient();
    
    // Scan for all download tokens
    const keys: string[] = [];
    for await (const key of client.scanIterator({
      MATCH: "download-token:*",
      COUNT: 100,
    }) as AsyncIterable<string>) {
      keys.push(key as string);
    }
    
    const total = keys.length;
    
    // All keys are active since Redis auto-expires
    return { active: total, total };
  } catch (error) {
    console.error("❌ Token stats error:", error);
    return { active: 0, total: 0 };
  }
}

/**
 * Cleanup function for graceful shutdown (optional)
 */
export async function closeRedisConnection(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    try {
      await redisClient.quit();
      console.log("Redis: Connection closed gracefully");
      redisClient = null;
    } catch (error) {
      console.error("Redis: Error closing connection:", error);
    }
  }
}
