const crypto = require('crypto');

const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex'); // 32 byte → 64 ký tự hex
};

module.exports = generateToken;