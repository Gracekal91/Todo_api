const db = require("../models");
const authController = require('../controllers/authController');

//create models
const User = db.users;
const Todo = db.todos

//Create todo task
const createTodo = async (req, res) =>{
    let userId = req.session.userId;

    if(userId) {

        let data = {
            title: req.body.title,
            isCompleted: req.body.isCompleted,
            user_id: userId
        }
        const todo = await Todo.create(data);
        res.status(200).send(todo);
    }else{
     console.log('You need to login first')
    }

}

//get todos

const getTodos = async (req, res) =>{
    const todos = await Todo.findAll({where:{user_id: 1}});
    res.status(200).send(todos);

}
//delete todos

//toggle completed

module.exports = {createTodo, getTodos}