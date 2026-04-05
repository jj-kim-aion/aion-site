import { randomUUID } from "crypto";

interface TokenData {
  email: string;
  productId: string;
  createdAt: number;
  expiresAt: number;
}

/**
 * In-memory token store for email-gated downloads.
 * 
 * TRADE-OFFS:
 * - ✅ Simple, no external DB needed
 * - ✅ Fast lookups (Map structure)
 * - ❌ Tokens lost on server restart
 * - ❌ Not suitable for multi-instance deployments (use Redis/DB for that)
 * 
 * For production scale, migrate to:
 * - Redis for distributed deployment
 * - PostgreSQL for audit trail
 * - Vercel KV for serverless edge
 */
const tokenStore = new Map<string, TokenData>();

const TOKEN_EXPIRY_MS = 6 * 60 * 60 * 1000; // 6 hours

/**
 * Generate a secure download token with 6-hour expiry
 */
export function createToken(email: string, productId: string): string {
  const token = randomUUID();
  const now = Date.now();

  tokenStore.set(token, {
    email,
    productId,
    createdAt: now,
    expiresAt: now + TOKEN_EXPIRY_MS,
  });

  // Auto-cleanup expired tokens every hour
  scheduleCleanup();

  return token;
}

/**
 * Validate and consume a download token (one-time use)
 */
export function validateAndConsumeToken(token: string): TokenData | null {
  const data = tokenStore.get(token);

  if (!data) {
    return null; // Token doesn't exist
  }

  if (Date.now() > data.expiresAt) {
    tokenStore.delete(token); // Clean up expired token
    return null; // Token expired
  }

  // Consume token (delete after validation)
  tokenStore.delete(token);

  return data;
}

/**
 * Check if token is valid without consuming it (for testing)
 */
export function isTokenValid(token: string): boolean {
  const data = tokenStore.get(token);
  if (!data) return false;
  if (Date.now() > data.expiresAt) {
    tokenStore.delete(token);
    return false;
  }
  return true;
}

/**
 * Cleanup expired tokens periodically
 */
let cleanupScheduled = false;
function scheduleCleanup() {
  if (cleanupScheduled) return;
  
  cleanupScheduled = true;
  setInterval(() => {
    const now = Date.now();
    for (const [token, data] of tokenStore.entries()) {
      if (now > data.expiresAt) {
        tokenStore.delete(token);
      }
    }
  }, 60 * 60 * 1000); // Clean up every hour
}

/**
 * Get token store stats (for monitoring)
 */
export function getTokenStats() {
  const now = Date.now();
  let active = 0;
  let expired = 0;

  for (const data of tokenStore.values()) {
    if (now > data.expiresAt) {
      expired++;
    } else {
      active++;
    }
  }

  return { active, expired, total: tokenStore.size };
}
