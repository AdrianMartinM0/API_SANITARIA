const usuRouter = require('express').Router();
const Cassette = require('../../database/models/Cassette');


usuRouter.post('/', async ( req, res ) => {
    
        try {
    const newcassette = await Cassette.create({
        
       
        fecha: req.body.fecha,
        observaciones: req.body.observaciones,
        descripcion: req.body.descripcion,
        caracteristicas: req.body.caracteristicas,
        organo: req.body.organo,
        
        
    });
    res.status(200).send(newcassette);
} catch (error) {
    res.status(500).send({ error: 'Error al crear el cassette' });
}
});



usuRouter.get('/', async (req, res) => {
    try {
        const cassettes = await Cassette.findAll();
        res.status(200).send(cassettes);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los cassettes' });
    }
});