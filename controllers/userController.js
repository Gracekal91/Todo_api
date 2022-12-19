const db = require('../models');

//create models
const User = db.users;
const Todo = db.todos
const bcrypt = require('bcrypt');
//Add user

const signup = async(req, res) =>{
    try {
        const hashedPw = await bcrypt.hash(req.body.password, 10)
        let userInfo = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPw
        }

        const user = await User.create(userInfo);
        res.status(200).send(user);
    }catch(err){
        console.error(err)
    }
}

const getUser =async (req, res) =>{
    const {email} = req.body;
    try{
        const user = await User.findAll({where: {email}})
        res.send(user);
    }catch(err){
        console.log(err)
    }
}


module.exports = {signup, getUser}