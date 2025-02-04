const sequelize = require("./../db");

const { Model, DataTypes } = require('sequelize');

class Usuario extends Model{}

Usuario.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: DataTypes.STRING(40),
            allowNull: false, 
            validate:{

            }
        },
        apellidos:{
            type: DataTypes.STRING(90),
            allowNull: false,
            validate:{

            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{

            }
        },
        password:{
            type: DataTypes.STRING(36),
            allowNull: false,
            validate:{

            }
        }

        // no se si vamos a seguir manteniendo el centro

    }
);

module.exports = Usuario;