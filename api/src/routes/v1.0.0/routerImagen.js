const imagenRouter = require('express').Router();
const { getAllImagenByMuestraController, createImagenController,  deleteImagenController, deleteAllImagesController } = require('./../../controllers/controllerImagen');
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage });

imagenRouter.get('/:id', getAllImagenByMuestraController);

imagenRouter.post('/', upload.single('imagen'), createImagenController);

imagenRouter.delete('/', deleteImagenController);

imagenRouter.delete('/all', deleteAllImagesController);

module.exports = imagenRouter;