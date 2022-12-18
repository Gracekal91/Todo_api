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


module.exports = {signup}