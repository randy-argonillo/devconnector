const auth = require('../services/auth');

module.exports = async function(req, res, next) {
  const authorization = req.header('Authorization');
  
  if (!authorization) {
    return res.status(403).json({ errors: ['User token is missing. Access is denied'] });
  }

  if (!_hasBearer(authorization)) {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  const [_, token] = authorization.split(' ');

  try {
    const userId = await auth.authenticate(token);
    req.userId = userId;
    next();
  } catch(e) {
    res.status(401).json({ error: 'Access is denied' });
  }

}

function _hasBearer(authString='') {
  return authString.includes('Bearer');
}