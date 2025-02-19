const muestraRouter = require('express').Router();
const {  newMuestraController , getAllMuestraByCassetteController , updateMuestraController , deleteMuestraController, getOneMuestraController} = require('./../../controllers/controllerMuestra');

muestraRouter.post('/',  newMuestraController);

muestraRouter.get('/:id', getAllMuestraByCassetteController );

muestraRouter.put('/:id', updateMuestraController);

muestraRouter.delete('/:id', deleteMuestraController );

muestraRouter.get('/one/:id', getOneMuestraController);

module.exports = muestraRouter;