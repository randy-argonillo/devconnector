const jwt = require('jsonwebtoken');
const util = require('util');
const fs = require('fs');

const userService = require('./user');
const { compare } = require('../utils/crypto');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);
const pubKey = fs.readFileSync('rsa_key.pub', 'utf8');
const privateKey = fs.readFileSync('rsa_key', 'utf8');

async function generateToken(userId) {
  const payload = {
    userId
  };

  const token = await sign(payload, privateKey, {
    expiresIn: '7d',
    algorithm: 'RS256'
  });
  return token;
}

async function authenticate(token) {
  try {
    const decoded = await verify(token, pubKey, { algorithm: 'RS256' });
    return decoded.userId;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function validateUser(email, password) {
  try {
    const user = await userService.getUserByEmail(email);
   
    if (!user) {
      return [false, 'User does not exist.', user];
    }

    const isValid = await compare(password, user.password);
    const message = !isValid ? 'Incorrect username/password' : null;
    return [isValid, message, user];

  } catch (e) {
    throw e;
  }
}

module.exports = {
  generateToken,
  authenticate,
  validateUser
};
