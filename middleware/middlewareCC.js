const jwt = require('jsonwebtoken');


const middlewareCC = async (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
      return next();
    }

    const token = authorizationHeader.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired, please log in again' });
        } else {
          return res.status(401).json({ message: 'Token invalid, please log in again' });
        }
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = middlewareCC;
