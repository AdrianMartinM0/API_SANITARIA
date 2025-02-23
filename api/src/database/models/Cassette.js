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
                    msg: 'El campo fecha es requerido'
                } , 
                isDate: {
                    msg: 'Este campo debe ser una fecha valida'
                }
            },
          },
          observaciones: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'El campo observaciones es requerido'
                } ,
              
            },
          },
          descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'El campo descripcion es requerido'
                } ,
              
            },
          },
          caracteristicas: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'El campo caracteristicas es requerido'
                } ,
              
            },
          },
          organo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: 'El campo órgano es requerido'
                } ,
              
            },
          },

          qr_cassette: {
            type: DataTypes.STRING,
            
          },
          identificador_cassette: {
            type: DataTypes.STRING,
            allowNull: false,
             validate:{
                notNull: {
                    msg: 'El campo identificador_cassette es requerido'
                }, 
           },
          },


    },{
        sequelize, 
        modelName: "Cassettes", 
        freezeTableName: true,
        timestamps: false,
        hooks: {
            afterCreate: async (cassette) => {
                cassette.qr_cassette = `C_${cassette.id}`;
                await cassette.save();
            }
        }
    }
 );
 module.exports = Cassette;