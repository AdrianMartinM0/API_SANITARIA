const Imagen = require('./../database/models/Imagen');

const getAllImagenByMuestra = async (id) => {
    const imagen = await Imagen.findAll({
        where: {
            MuestraId: id,
        }
    });
    return imagen;
}

const getOneImagen = async (id) => {
    const imagen = await Imagen.findOne({
        where:{
            id:id
        }
    });
}

const createImagen = async (img, id) => {
    const imagen = await Imagen.create({
        imagen: img,
        MuestraId: id
    });
    return imagen;
}


const deleteImagen = async (id) => {
    await Imagen.destroy({
        where:{
            id:id,
        }
    })
}

const deleteAllImages = async () => {
    await Muestra.destroy({
        where: {}
    });
}

module.exports = {
    getAllImagenByMuestra,
    getOneImagen,
    createImagen,
    deleteImagen,
    deleteAllImages
} 