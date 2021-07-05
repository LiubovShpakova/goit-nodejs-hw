const passport = require('passport');
require('../config/passport');
const guard = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user) => {
    let token = null;
    const getAuth = req.get('Authorization');
    if (getAuth) {
      token = getAuth.split(' ')[1];
    }
    if (!user || err || token !== user?.token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized🚀',
      });
    }
    req.user = user;
    // console.log("guard -> user", user);
    // res.locals.user = user переменная на текущем запросе
    // req.app.locals.vars - глобальная переменная
    return next();
  })(req, res, next);
};
module.exports = guard;
