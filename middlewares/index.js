exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

exports.isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.checkRoles = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  } else {
    res.redirect("/");
  }
};

exports.setLocalUser = (app) => (req, res, next) => {
  if (req.user) app.locals.user = req.user;
  else app.locals.user = null;
  next();
};
