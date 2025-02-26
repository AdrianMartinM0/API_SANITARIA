const sequelize = require("./../db");
const bcrypt = require('bcryptjs');

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
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
                    msg: 'El apellido solo puede contener letras y espacios',
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
                is: {
                    args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
                    msg: 'El apellido solo puede contener letras y espacios',
                },
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg:"El campo password es obligatorio",
                },
                is: {
                    args: /^[A-Za-z\d@$!%*?&]{8,36}$/,
                    msg: "El password debe tener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial. Su tamaño debe ser entre 8 y 36 caracteres",
                },
            },
        },
        centro:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'El campo del centro es obligatorio',
                },
            },
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate:{
                notNull:{
                    msg: 'El campo del admin es obligatorio',
                }

            }
        }
    },
    {
        sequelize,
        modelName: "Usuarios",
        freezeTableName: true,
        timestamps:false,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 14);
            },
            beforeUpdate: async (user, options) => {
                options.validate = false;
                user.password = await bcrypt.hash(user.password, 14);
            },
        }
    },
);

module.exports = Usuario;