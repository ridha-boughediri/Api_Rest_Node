/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

/*******************************/
/*** Définition du modèle User */
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
       
            id: {
                type: DataTypes.INTEGER(10),
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                validate:{
                    isEmail:true //une validation des données
                },
                allowNull: false
            },
    
            password: {
                type: DataTypes.STRING(64),
                is: /^[0-9a-f]{64}$/i, //ici une contraine
                allowNull: false
            },
    
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
    
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            }
    }, { paranoid: true })           // Ici pour faire du softDelete
    
    User.beforeCreate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash
    })
    
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel)
    }

    return User
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
//User.sync()
//User.sync({force: true})
//User.sync({alter: true})
