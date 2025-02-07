const CassetteRouter = require('express').Router();
const Cassette = require('../../database/models/Cassette');
const { getonecassettecontroller , deleteCassetecontroller ,  updateCassettecontroller , getAllCassettecontroller , newCassetecontroller } = require('../../controllers/controllerCassette');


CassetteRouter.post('/', newCassetecontroller);

CassetteRouter.get('/', getAllCassettecontroller);

CassetteRouter.put('/:id',  updateCassettecontroller);

CassetteRouter.delete('/:id', deleteCassetecontroller );
CassetteRouter.get('/:id', getonecassettecontroller);

module.exports = CassetteRouter;