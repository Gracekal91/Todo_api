const userController = require('../controllers/userController');
const router = require('express').Router();

//Product router
router.route('/')
    .post(userController.signup)
    .post(userController.getUser);


module.exports = router;