/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Cocktail */
module.exports = (sequelize) => {
    return Groupe = sequelize.define('Groupe', {
        Id:{

            type: DataTypes.INTEGER(10),
            primaryKey:true,
            allowNull: true

        },
       
        nom: {
            type: DataTypes.STRING(100),
            defaultValue:'',
            allowNull: false
        }
    }, {paranoid:true}
    
    
    
    ); // ici pr faire du soft delete

   


}
