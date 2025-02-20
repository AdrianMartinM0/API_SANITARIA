const { getAllImagenByMuestra, getOneImagen, createImagen, deleteImagen, deleteAllImages } = require('./../services/serviceImagen');

const getAllImagenByMuestraController = async ( req, res, next ) => {
    try {
        const imagen = await getAllImagenByMuestra(req.params.id);
        res.status(200).send(imagen);
    } catch (error) {
        next(error);
    }
}


const createImagenController = async ( req, res, next ) => {
    try {
        if(!req.body.MuestraId){
            const error = new Error('El id de la muestra es obligatorio');
            error.status=400;
            throw error;
        }
        if(!req.file){
            const error = new Error('No se ha recibido ninguna Imagen');
            error.status=400;
            throw error;
        }
        const imagen = await createImagen(req.file.buffer, req.body.MuestraId);
        res.status(200).send(imagen);
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

const deleteAllImagesController = async(req , res , next)=>{
    try{
        if(!req.admin){
            const error = new Error('No tienes permisos de administrador');
            error.status=400;
            throw error;
        }
        await deleteAllImages();
        res.status(200).send({menssage: "Imagenes eliminados con exito"});
    }catch(error){
        next(error);
    }
}

module.exports={
    getAllImagenByMuestraController,
    createImagenController,
    deleteImagenController,
    deleteAllImagesController,
}