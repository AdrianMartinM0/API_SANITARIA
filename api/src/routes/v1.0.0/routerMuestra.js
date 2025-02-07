const muestraRouter = require('express').Router();
const Muestra = require('../../database/models/Muestra');
const {  newMuestracontroller , getAllMuestracontroller , updateMuestracontroller , deleteMuestracontroller} = require('../../controllers/controllerMuestra');


muestraRouter.post('/',  newMuestracontroller);

muestraRouter.get('/', getAllMuestracontroller );

muestraRouter.put('/:id', updateMuestracontroller);

muestraRouter.delete('/:id', deleteMuestracontroller );
module.exports = muestraRouter;