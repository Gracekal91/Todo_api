module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    })
}