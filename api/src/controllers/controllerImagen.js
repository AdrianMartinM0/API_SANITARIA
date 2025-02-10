const { getAllImagenByMuestra, getOneImagen, createImagen, deleteImagen } = require('./../services/serviceImagen');


const getAllImagenByMuestraController = async ( req, res, next ) => {
    try {
        const imagen = await getAllImagenByMuestra(req.id);
        res.status(200).send(imagen);
    } catch (error) {
        next(error);
    }
}


const createImagenController = async ( req, res, next ) => {
    try {
        if(!req.body.imagen){
            const error = new Error('No se ha recibido ninguna Imagen');
            error.status=400;
            throw error;
        }
        const imagen = await createImagen(req.body.imagen);
        res.status(200).send(usu);
    } catch (error) {
        next(error);
    }
}

const deleteImagenController = async ( req, res, next ) => {
    try {
        const imagen = await getOneImagen(req.body.id);
        if(!imagen){
            const error = new Error('La imagen no existe');
            error.status=400;
            throw error;
        }
        await deleteImagen(req.body.id);
        res.status(200).send('La imagen a sido eliminada con exito');
    } catch (error) {
        next(error);
    }
}


module.exports={
    getAllImagenByMuestraController,
    createImagenController,
    deleteImagenController
}