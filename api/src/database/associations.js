const { Sequelize } = require('sequelize');
const sequelize = require('./db');

const Cassette = require("./models/Cassette");
const Imagen = require("./models/Imagen");
const Muestra = require("./models/Muestra");
const Usuario = require("./models/Usuario");

Cassette.hasMany(Muestra);
Muestra.belongsTo(Cassette);

Muestra.hasMany(Imagen);
Imagen.belongsTo(Muestra);

Usuario.hasMany(Cassette);
Cassette.belongsTo(Usuario);

module.exports = { sequelize, Cassette, Imagen, Muestra, Usuario };