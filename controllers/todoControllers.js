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

const getTodos = async (req, res) => {
    let userId = req.session.userId;
    if(userId) {
        const todos = await Todo.findAll({where: {user_id: userId}});
        res.status(200).send(todos);
    }else{
        res.send('Please login')
    }

}
//delete todos

const deleteTodo = async (req, res) =>{
    const id = req.baseUrl.split('/').slice(-1)[0];
    try{
        const todo = await Todo.findByPk(id);
        if(todo){
            todo.destroy().then(() =>{
                console.log('User deleted');
                res.sendStatus(200);
            })
        }else{
            console.log(`User with the ${id} does not exist`)
        }

    }catch(err){
        console.error(err)
    }
}


//toggle completed

const toggleCompleted = async (req, res) =>{
    const id = req.baseUrl.split('/').slice(-1)[0]
    try{
        const task = await Todo.findByPk(id);
        if(task) {
            task.isCompleted = !task.isCompleted;
            await task.save();
            res.json(task);
        }else{
            console.log(`could not find task with id ${id}`)
        }
    }catch(err){
        console.error(err);
    }
}

module.exports = {createTodo, getTodos, toggleCompleted, deleteTodo}