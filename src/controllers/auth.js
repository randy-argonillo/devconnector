
const authService = require('../services/auth');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [isValid, message, user] = await authService.validateUser(email, password);

    if (!isValid) {
      return res.status(401).json({ error: message });
    }

    const token = await authService.generateToken(user.id);

    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  login
};
