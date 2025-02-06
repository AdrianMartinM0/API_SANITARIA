const Cassette = require('../database/models/Cassette');



const newCassete  = async ({fecha_param , observaciones_param ,descripcion_param , caracteristicas_param , organo_param }) =>{

    const cassette = await Cassette.create({
        fecha: fecha_param,
        observaciones: observaciones_param,
        descripcion: descripcion_param,
        caracteristicas: caracteristicas_param,
        organo: organo_param,
    })
    
    return cassette;
};

const getAllCassette = async ()=>{
    const cassette = await Cassette.findAll();
    return cassette;

};

const updateCassette = async (idCassette_param , fecha_param , observaciones_param ,descripcion_param , caracteristicas_param , organo_param )=>{
const cassettetoupdate = await Cassette.findByPk(idCassette_param);
if (cassettetoupdate) {
    await cassettetoupdate.update({
        fecha: fecha_param,
        observaciones: observaciones_param,
        descripcion: descripcion_param,
        caracteristicas: caracteristicas_param,
        organo: organo_param,
    });
    return cassettetoupdate;
}else{
    return null;
}
};

const deleteCassete = async (idCassette)=>{
    const cassette = await Cassette.destroy({
where :{
    idCassette : id
}
    });
    return cassette;
}


module.exports = {
    deleteCassete,
    updateCassette,
    getAllCassette,
    newCassete,
   
  
}