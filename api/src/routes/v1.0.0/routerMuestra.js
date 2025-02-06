const usuRouter = require('express').Router();
const Muestra = require('../../database/models/Muestra');


usuRouter.post('/', async ( req, res ) => {
    
        try {

            if (!req.body.fecha || !req.body.descripcion || !req.body.observaciones || !req.body.tincion ) {
                return res.status(404).send({ error: 'Falta algun campo requerido ' });
            }

    const newmuestra = await Muestra.create({
        
       
        fecha: req.body.fecha,
        observaciones: req.body.observaciones,
        descripcion: req.body.descripcion,
        tincion: req.body.tincion,
      
        
        
    });
    res.status(200).send(newmuestra);
} catch (error) {
    res.status(500).send({ error: 'Error al crear la muestra ' });
}
});



usuRouter.get('/', async (req, res) => {
    try {
        const muestra = await Muestra.findAll();
        res.status(200).send(muestra);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener las muestras ' });
    }
});



usuRouter.put('/:id', async (req, res) => {
    try {
        const muestraupdate   = await Muestra.findByPk(req.params.id);
        if (muestraupdate) {
            await muestraupdate.update({
                   
        fecha: req.body.fecha,
        observaciones: req.body.observaciones,
        descripcion: req.body.descripcion,
        tincion: req.body.tincion,
      
            });
            res.status(200).send(muestraupdate);
        } else {
            res.status(404).send({ error: 'muestra  no encontrada' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar la muestra ' });
    }
});

module.exports = usuRouter;