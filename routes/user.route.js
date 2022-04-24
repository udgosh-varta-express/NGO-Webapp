const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login/lib');
const user = require('../controllers/user')


router.get('/profile', ensureLoggedIn({redirectTo:'/auth/login'}),user.getUserProfile);

module.exports = router;
