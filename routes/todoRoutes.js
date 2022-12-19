const todoControllers = require('../controllers/todoControllers');
const router = require('express').Router();

//Product router
router.route('/')
    .post(todoControllers.createTodo)
    .get(todoControllers.getTodos)
    .patch(todoControllers.toggleCompleted)
    .delete(todoControllers.deleteTodo)

module.exports = router;