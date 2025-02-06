const usuRouter = require('express').Router();
const Muestra = require('../../database/models/Muestra');
const {  putMuestracontroller , getAllMuestracontroller , updateMuestracontroller , deleteMuestracontroller} = require('../../controllers/controllerMuestra');


usuRouter.post('/',  putMuestracontroller);

usuRouter.get('/', getAllMuestracontroller );

usuRouter.put('/:id', updateMuestra);

usuRouter.delete('/:id', deleteMuestra );
module.exports = usuRouter;