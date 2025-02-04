const sequelize = require("../db");
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
            primaryKey: true,
            allowNull: false,   
            validate:{
                notNull: {
                    msg: 'Este campo  es requerido'
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
                    msg: 'Este campo  es requerido'
                } ,
              
            },
          },
          descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Este campo  es requerido'
                } ,
              
            },
          },
          caracteristicas: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Este campo  es requerido'
                } ,
              
            },
          },
          organo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Este campo  es requerido'
                } ,
              
            },
          },

          qr_muestra: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'Este campo  es requerido'
                } ,
              
            },
          },


    },{
         sequelize, 
            modelName: "Muestras", 
            freezeTableName: true,
             timestamps: false 
    }
 );
 module.exports = Muestra;