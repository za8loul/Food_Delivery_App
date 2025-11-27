import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

/**
 * Generates an access token.
 * @param {object} payload - The payload to sign.
 * @returns {string} The generated JWT.
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: "15m" });
};

/**
 * Generates a refresh token.
 * @param {object} payload - The payload to sign.
 * @returns {string} The generated JWT.
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: "7d" });
};

/**
 * Verifies an access token.
 * @param {string} token - The token to verify.
 * @returns {object} The decoded payload.
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenSecret);
};

/**
 * Verifies a refresh token.
 * @param {string} token - The token to verify.
 * @returns {object} The decoded payload.
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecret);
};
