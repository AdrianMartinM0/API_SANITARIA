const imagenRouter = require('express').Router();
const { getAllImagenByMuestraController, createImagenController,  deleteImagenController } = require('./../../controllers/controllerImagen');
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage });

imagenRouter.get('/', getAllImagenByMuestraController);

imagenRouter.post('/', upload.single('imagen'), createImagenController);

imagenRouter.delete('/', deleteImagenController);

module.exports = imagenRouter;