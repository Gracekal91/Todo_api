const db = require('../models');

const User = db.users;

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("todo", {
        title: {
            type: Sequelize.STRING,
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        user_id:{
            type: Sequelize.INTEGER,
            references:{
                model: User,
                key: 'id'
            }
        }
    });
}