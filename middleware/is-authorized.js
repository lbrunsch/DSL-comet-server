//========================================================
//================  is-authorized  =======================
//========================================================

module.exports = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    // authorize based on user role
    (req, res, next) => {
      if (!req.session.isLoggedIn) {
          return res.redirect('/signin');
      }
      if (roles.length && !roles.includes(req.session.userRole)) {
          // user's role is not authorized
          console.log('roles ' +roles);
          console.log('role from user '+ req.user.role);
          return res.redirect('/login');
      }

      // authentication and authorization successful
      next();
    }
  ];
}
