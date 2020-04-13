const User = require('../models/user');

async function getUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (e) {
    throw e;
  }
}

async function getUserById(userId) {
  try {
    return User.findById(userId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  getUserById
};
