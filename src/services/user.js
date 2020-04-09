const User = require('../models/user');

async function getUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getUserByEmail
};
