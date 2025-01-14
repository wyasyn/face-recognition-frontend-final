export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  passcode: process.env.PASSCODE,
  user_key: process.env.USER_KEY,
  encryption_key: process.env.SECURE_KEY,
};
