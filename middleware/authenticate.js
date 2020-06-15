const Session = require('../models/session');

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log('cookie: '+ res.cookies);
    if (!token || typeof token !== 'string') {
      console.log('Request cookie is invalid.');
    } else {
      const session = await Session.findOne({ token, status: 'valid' });
      if(!session) {
        res.clearCookie('token');
        console.log('Your session has expired. You need to log in.');
      }
      req.session = session;
    }
    next();
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Authentication credentials invalid',
          errorMessage: err.message,
        },
      ],
    });
  }
};

module.exports = { authenticate };
