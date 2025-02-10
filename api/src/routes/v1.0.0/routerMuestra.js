const muestraRouter = require('express').Router();
const {  newMuestraController , getAllMuestraByCassetteController , updateMuestraController , deleteMuestraController} = require('./../../controllers/controllerMuestra');

muestraRouter.post('/',  newMuestraController);

muestraRouter.get('/:id', getAllMuestraByCassetteController );

muestraRouter.put('/:id', updateMuestraController);

muestraRouter.delete('/:id', deleteMuestraController );

module.exports = muestraRouter;