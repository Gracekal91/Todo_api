require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const verification = require('./middleware/verification');
const credentials = require('./middleware/credentials');
const app = express();
const session = require('express-session');

app.use(credentials);

app.use(cors());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true
}));



app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));

//Routers

app.use("/register", require("./routes/userRouter"));
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/auth'));
app.use('/todos', require('./routes/todoRoutes'));

app.use(verification);
app.use('/createTodo', require('./routes/todoRoutes'));
app.get('/', (req, res) =>{
    res.json({message: 'Hello api'})
})

//Handle relationship


const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`server is running on port : ${PORT}`)
})