const express = require('express');
const router = express.Router();
const index = require('../controllers/index')

const authenticate = require('../middlewares/authenticate');

router.get('/index',authenticate,index.get_index);

module.exports = router;