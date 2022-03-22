const express = require('express');
const router = express.Router();
const home = require('../controllers/home')
const index = require('../controllers/index')
const authenticate = require('../middlewares/authenticate');
// console.log(authenticate);
router.get('/',authenticate,index.get_index);
module.exports = router;