const sequelize = require("./../db");
const { Model, DataTypes } = require("sequelize");
 class Muestra extends Model {}
 Muestra.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          }, 
          fecha: {
            type: DataTypes.DATE,
            allowNull: false,   
            validate:{
                notNull: {
                    msg: 'Este campo fecha es requerido'
                } , 
                isDate: {
                    msg: 'Este campo debe ser una fecha valida'
                }
            },
          },
          observaciones: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Este campo observaciones es requerido'
                } ,
              
            },
          },
          descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Este campo descripcion es requerido'
                } ,
              
            },
          },
          tincion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Este campo tincion es requerido'
                } ,
              
            },
          },
        

          qr_muestra: {
            type: DataTypes.STRING,
          },


    },{
        sequelize, 
        modelName: "Muestras", 
        freezeTableName: true,
        timestamps: false,
        hooks: {
            afterCreate: async (muestra) => {
                muestra.qr_muestra = `M_${muestra.id}`;
                await muestra.save();
            }
        }
    }
 );
 module.exports = Muestra;