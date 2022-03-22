
const express = require('express');
const router = express.Router();
const loginSignup = require('../controllers/login_signup')
const index = require('../controllers/index')
const authenticate = require('../middlewares/authenticate');

router.get('/login',loginSignup.get_login);

router.post('/login',loginSignup.checkLoginData);

router.get('/register',loginSignup.get_register);

router.post('/register',loginSignup.save_register);

router.get('/logout',authenticate,loginSignup.logout);
module.exports = router;