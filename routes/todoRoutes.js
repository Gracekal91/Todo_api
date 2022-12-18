const todoControllers = require('../controllers/todoControllers');
const router = require('express').Router();

//Product router
router.route('/')
    .post(todoControllers.createTodo)
    .get(todoControllers.getTodos)


module.exports = router;