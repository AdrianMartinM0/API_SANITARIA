const { Sequelize } = require('sequelize');
const sequelize = require('./db');

const Cassette = require("./models/Cassette");
const Imagen = require("./models/Imagen");
const Muestra = require("./models/Muestra");
const Usuario = require("./models/Usuario");

Cassette.hasMany(Muestra, { onDelete: 'CASCADE' });
Muestra.belongsTo(Cassette);

Muestra.hasMany(Imagen, { onDelete: 'CASCADE' });
Imagen.belongsTo(Muestra);

Usuario.hasMany(Cassette, { onDelete: 'CASCADE' });
Cassette.belongsTo(Usuario);

module.exports = { sequelize, Cassette, Imagen, Muestra, Usuario };