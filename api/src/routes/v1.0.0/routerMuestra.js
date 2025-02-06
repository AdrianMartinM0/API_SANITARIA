const muestraRouter = require('express').Router();
const Muestra = require('../../database/models/Muestra');
const {  putMuestracontroller , getAllMuestracontroller , updateMuestracontroller , deleteMuestracontroller} = require('../../controllers/controllerMuestra');


muestraRouter.post('/',  putMuestracontroller);

muestraRouter.get('/', getAllMuestracontroller );

muestraRouter.put('/:id', updateMuestra);

muestraRouter.delete('/:id', deleteMuestra );
module.exports = muestraRouter;