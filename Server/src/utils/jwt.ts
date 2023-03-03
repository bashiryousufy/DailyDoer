const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

function generateAccessToken(user: any) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '24h',
  });
}


function generateRefreshToken(user: any, jti: any) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '8h',
  });
}

function generateTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

function revokeTokens(userId: any) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  revokeTokens
};