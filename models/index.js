require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,{
        host:process.env.HOST,
        dialect: process.env.DIALECT,
        operatorsAlias: false,
        /*pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }*/
    }
)

sequelize.authenticate()
    .then(() =>{
        console.log('connected to db')
    })
    .catch(err =>{
        console.log('Error' + err)
    })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./User.js')(sequelize, Sequelize);
db.todos = require('./Todo.js')(sequelize, Sequelize);

//it won't create the table over and over
db.sequelize.sync({force: false})
    .then(()=>{
        console.log('yes re-sync done!')
    }).catch(e =>console.log("can't sync", e))

//implement One-to-Many relationship

db.users.hasMany(db.todos,{
    foreignKey: 'user_id',
    as: 'todo',
})

db.todos.belongsTo(db.users,{
    foreignKey: 'user_id',
    as: 'user'
})

module.exports = db