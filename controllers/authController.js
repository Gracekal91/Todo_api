const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create models
const User = db.users;

//Handle login

const handleLogin = async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({'message': 'username and password are required'});

    //find user in the database
    const foundUser = await User.findOne({where: {email}});
    if(!foundUser) return res.sendStatus(401);

    //else - validate the password
    const match = await bcrypt.compare(password, foundUser.password);
    if(match){
        //create the token and sign the user in
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    email: foundUser.email
                }
            },
            process.env.JWT_SECRET,
            { expiresIn: '5m'}
        );
        //refresh token
        foundUser.accessToken = accessToken;
        const result = await foundUser.save();
        req.session.userId = foundUser.id;
        console.log('this is the result', foundUser);

        //create cookies
        //res.cookie('jwt', accessToken, {httpOnly: true, secure: true, maxAge:24 * 60 * 60 * 1000});

        //send authorization access token
        res.json({accessToken})
        return foundUser
    }else{
        res.sendStatus(401);
    }
}

//logout

const handleLogout = async (req, res) =>{
    req.session.destroy((error) =>{
        if(error){
            console.error(error);
            res.send(error)
        }else{
           console.log('You are logged out')
            res.redirect('/login');
        }
    });
}

module.exports = {handleLogin, handleLogout}