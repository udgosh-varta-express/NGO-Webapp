const router = require('express').Router();
const { ensureLoggedIn } = require('connect-ensure-login/lib');
const index= require('../controllers/index')

router.get('/',index.getIndex );
router.get('/book',ensureLoggedIn({ redirectTo: '/auth/login' }),index.getBook);
router.get('/shelter',ensureLoggedIn({redirectTo:'/auth/login'}),index.getShelter);
router.get('/food',ensureLoggedIn({ redirectTo: '/auth/login' }),index.getFood);
router.get('/clothes',ensureLoggedIn({ redirectTo: '/auth/login' }),index.getClothes);
router.get('/joinus',ensureLoggedIn({ redirectTo: '/auth/login' }),index.getJoinus);


module.exports = router;
