const sequelize = require("./../db");
const { Model, DataTypes } = require("sequelize");
 class Cassette extends Model {}
 Cassette.init (
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
                    msg: 'la fecha campo  es requerido'
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
                    msg: 'la observacion  es requerida'
                } ,
              
            },
          },
          descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'La descripcion   es requerida'
                } ,
              
            },
          },
          caracteristicas: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'la caracteriustica  es requerida'
                } ,
              
            },
          },
          organo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'El organo   es requerida'
                } ,
              
            },
          },

          qr_cassette: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
               notNull: {
                     msg: 'El cassete  es requerida'
                 } ,
              
             },
          },
          identificador_cassete: {
            type: DataTypes.STRING,
            allowNull: false,
             validate:{
                notNull: {
                    msg: 'El identificador   es requerida'
            } ,
              
           },
          },


    },{
         sequelize, 
            modelName: "Cassettes", 
            freezeTableName: true,
             timestamps: false 
    }
 );
 module.exports = Cassette;