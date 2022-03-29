const express = require('express');
const router = express.Router();
const index = require('../controllers/index')

const authenticate = require('../middlewares/authenticate');

router.get('/index',authenticate,index.get_index);
router.get('/book',authenticate,index.get_book);
router.get('/shelter',authenticate,index.get_shelter);
router.get('/food',authenticate,index.get_food);
router.get('/clothes',authenticate,index.get_clothes);

module.exports = router;