const gravatar = require('gravatar');

const User = require('../models/user');
const { encrypt } = require('../utils');

const signup = async (req, res) => {
  try {
    const { body } = req;
    const userExist = await User.exists({ email: body.email });

    if (userExist) {
      return res.status(400).json({ errors: ['User already exist'] });
    }

    const password = await encrypt(body.password);
    const avatar = gravatar.url(body.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    const user = {
      ...body,
      password,
      avatar,
    };

    const newUser = await User.create(user);

    res.json({
      user: newUser,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  signup,
};
