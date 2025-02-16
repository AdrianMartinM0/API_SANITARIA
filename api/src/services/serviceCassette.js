const Cassette = require('../database/models/Cassette');

const newCassete = async (data, id) => {
    const cassette = await Cassette.create({
        fecha: data.fecha,
        observaciones: data.observaciones,
        descripcion: data.descripcion,
        caracteristicas: data.caracteristicas,
        organo: data.organo,
        identificador_cassette : data.identificador_cassette, 
        UsuarioId : id
    });
    return cassette;
};

const getAllCassetteByUser = async (id) => {
    const cassette = await Cassette.findAll({
        where:{
            UsuarioId: id,
        }
    });
    return cassette;
};

const updateCassette = async (data, id) => {
   const cassette = await Cassette.update({
        fecha: data.fecha,
        observaciones: data.observaciones,
        descripcion: data.descripcion,
        caracteristicas: deleteCassete.caracteristicas,
        organo: data.organo,
        identificador_cassette: data.identificador_cassete,
    },{
        where : {
            id: id,
        }
    }
    );
    return cassette;
};

const deleteCassete = async (id) => {
    await Cassette.destroy({
        where: {
             id:id,
        }
    });
}

const getOneCassetteById = async (id) => {
    const cassette = await Cassette.findOne({
        where:{
            id: id,
        },
        include: ['Muestras']
    });
    return cassette;
}

module.exports = {
    deleteCassete,
    updateCassette,
    getAllCassetteByUser,
    newCassete,
    getOneCassetteById
}