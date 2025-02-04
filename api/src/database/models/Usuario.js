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
                notNull:{
                    msg:"El campo nombre es obligatorio",
                },
                len:{
                    args: [1, 40],
                    msg: "El nombre debe tener entre 1 y 40 caracteres",
                },
                isAlpha:{
                    args:true,
                    msg:"El campo solo permite valores alfabeticos",
                },
            },
        },
        apellidos:{
            type: DataTypes.STRING(90),
            allowNull: false,
            validate:{
                notNull:{
                    msg:"El campo apellido es obligatorio",
                },
                len:{
                    args: [1, 90],
                    msg: "El apellido debe tener entre 1 y 90 caracteres",
                },
                isAlpha:{
                    args:true,
                    msg:"El campo solo permite valores alfabeticos",
                },
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg:"El campo es email obligatorio",
                },
                min:{
                    args: 3,
                    msg: "El email debe tener al menos 3 caracteres",
                },
                isEmail:{
                    args: true,
                    msg: "Debe ser un email válido",
                },
            }
        },
        password:{
            type: DataTypes.STRING(36),
            allowNull: false,
            validate:{
                notNull:{
                    msg:"El campo password es obligatorio",
                },
                len:{
                    args: [8, 36],
                    msg: "El password debe tener entre 8 y 36 caracteres",
                },
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,36}$/,
                    msg: "El password debe tener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial",
                },
            },
        },

        // no se si vamos a seguir manteniendo el centro

    },
    {
        sequelize,
        modelName: "Usuarios",
        freezeTableName: true,
        timestamps:false,
    }
);

module.exports = Usuario;