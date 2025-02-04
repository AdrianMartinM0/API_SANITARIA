const usuRouter = require('express').Router();
const Usuario = require('../../database/models/Usuario');

usuRouter.get('/', async ( req, res ) => {
    const usu = await Usuario.findAll();
    res.status(200).send(usu);
})

module.exports = usuRouter;