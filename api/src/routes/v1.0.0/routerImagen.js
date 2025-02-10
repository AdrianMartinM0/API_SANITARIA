const imagenRouter = require('express').Router();
const { getAllImagenByMuestraController, createImagenController,  deleteImagenController } = require('./../../controllers/controllerImagen');

imagenRouter.get('/', getAllImagenByMuestraController);

imagenRouter.post('/', createImagenController);

imagenRouter.delete('/', deleteImagenController);

module.exports = imagenRouter;