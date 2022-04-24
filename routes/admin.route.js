const router = require('express').Router();
const admin =require('../controllers/admin')


router.get('/users', admin.getUsers);

router.get('/user/:id', admin.getUserById);

router.post('/update-role', admin.postUpdateRole);

module.exports = router;
