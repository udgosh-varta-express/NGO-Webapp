const router = require('express').Router();
const csrf = require('csurf')
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator, loginValidator } = require('../utils/validators');
const auth = require('../controllers/auth')
const csrfProtect = csrf({cookie:true})


router.get(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),csrfProtect,
  auth.getLogin
);

router.post(
  '/login',ensureLoggedOut({ redirectTo: '/' }),csrfProtect,loginValidator, auth.postLogin
);

router.get(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),csrfProtect,
  auth.getRegister
);

router.post(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),csrfProtect,
  registerValidator,
  auth.postRegister
);

router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }),
 auth.getLogout
);

module.exports = router;

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }
// }

// function ensureNOTAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.redirect('back');
//   } else {
//     next();
//   }
// }


