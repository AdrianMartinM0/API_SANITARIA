const Cassette = require('../database/models/Cassette');



const newCassete = async (fecha_param, observaciones_param, descripcion_param, caracteristicas_param, organo_param , id_param ) => {

    const cassette = await Cassette.create({
        fecha: fecha_param,
        observaciones: observaciones_param,
        descripcion: descripcion_param,
        caracteristicas: caracteristicas_param,
        organo: organo_param,
        UsuarioId : id_param
        
    })

    return cassette;
};

const getAllCassette = async () => {
    const cassette = await Cassette.findAll();
    return cassette;

};

const updateCassette = async (idCassette_param, fecha_param, observaciones_param, descripcion_param, caracteristicas_param, organo_param) => {
  
  
   const  cassettetoupdate  =    await Cassette.update({
            fecha: fecha_param,
            observaciones: observaciones_param,
            descripcion: descripcion_param,
            caracteristicas: caracteristicas_param,
            organo: organo_param,
        },{
            where : {
                id: idCassette_param
            }
        }
    );

        return cassettetoupdate;
  
};

const deleteCassete = async (idCassette) => {
    const cassette = await Cassette.destroy({
        where: {
             id:idCassette
        }
    });
    return cassette;
}

const getoneCassetteById = async (id) => {
    const cassette = await Cassette.findOne({
        where:{
            id: id,
        }
    });
    return cassette;
}

module.exports = {
    deleteCassete,
    updateCassette,
    getAllCassette,
    newCassete,
    getoneCassetteById


}