"use server";
import { env } from "./config";
import { cookies } from "next/headers";
import crypto from "crypto";

// AES encryption settings
const ALGORITHM = "aes-256-ctr";
const passphrase = env.encryption_key!;
// const ENCRYPTION_KEY = Buffer.from(env.encryption_key!, "utf-8"); // Secure key for AES
const ENCRYPTION_KEY = crypto.pbkdf2Sync(
  passphrase,
  "someSalt",
  100000,
  32,
  "sha256"
);
const IV_LENGTH = 16; // AES block size

// Rate limit settings
const RATE_LIMIT = 3;
const BLOCK_DURATION = 5 * 60 * 60 * 1000; // 5 minutes

const attemptsStore: Record<string, { attempts: number; lastAttempt: number }> =
  {};

export const validateUser = async (value: string) => {
  const userKey = env.user_key!;
  const cookieStore = await cookies();
  const now = Date.now();

  // Track user attempts
  const userAttempts = attemptsStore[userKey] || {
    attempts: 0,
    lastAttempt: 0,
  };

  // Check if user is blocked
  if (
    userAttempts.attempts >= RATE_LIMIT &&
    now - userAttempts.lastAttempt < BLOCK_DURATION
  ) {
    const waitTime = Math.ceil(
      (BLOCK_DURATION - (now - userAttempts.lastAttempt)) / (60 * 1000)
    );
    return { success: false, message: `Try again in ${waitTime} minutes` };
  }

  const storedPasscode = Buffer.from(env.passcode!, "utf-8");
  const providedPasscode = Buffer.from(value, "utf-8");

  if (
    value.length === 6 &&
    crypto.timingSafeEqual(storedPasscode, providedPasscode)
  ) {
    // Clear attempts on success
    delete attemptsStore[userKey];

    // Encrypt the passcode before storing it in the cookie
    const encryptedToken = encryptToken(value);

    // Set cookie with the encrypted token
    cookieStore.set({
      name: "token",
      value: encryptedToken,
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return { success: true, message: "Validation successful" };
  } else {
    // Increment failed attempts
    attemptsStore[userKey] = {
      attempts: userAttempts.attempts + 1,
      lastAttempt: now,
    };
    return { success: false, message: "Invalid passcode" };
  }
};

// Encrypt the token using AES
const encryptToken = (text: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf-8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

export const isValid = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || !token.value) return false; // Ensure the token has a value

    const decryptedToken = await decryptToken(token.value); // Decrypt the token

    // Check if the decrypted token matches the stored passcode
    if (decryptedToken === env.passcode) {
      return true; // Valid token
    } else {
      return false; // Invalid token
    }
  } catch (error) {
    console.error("Error checking token:", error);
    return false; // If there is an error, return false
  }
};

// Decrypt the token using AES
const decryptToken = async (encryptedToken: string) => {
  const [ivHex, encryptedHex] = encryptedToken.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString("utf-8");
};
