const util = require('util');
const bcrypt = require('bcryptjs');

const genSalt = util.promisify(bcrypt.genSalt);
const hash = util.promisify(bcrypt.hash);

const encrypt = async str => {
  const salt = await genSalt(10);
  return hash(str, salt);
};

module.exports = {
  encrypt
};
