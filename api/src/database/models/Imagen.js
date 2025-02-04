const sequelize = require("./../db");

const { Model, DataTypes } = require('sequelize');

class Imagen extends Model{}

Imagen.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagen: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El campo imagen no puede ser nulo'
                }
            },
        }
    },{
        sequelize,
        modelName: "Imagenes",
        freezeTableName: true,
        timestamps:false,
    }
);


module.exports = Imagen;