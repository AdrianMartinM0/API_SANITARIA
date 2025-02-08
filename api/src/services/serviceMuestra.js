const Muestra = require('../database/models/Muestra');



const newMuestra  = async (data) =>{

    const muestra = await Muestra.create({
        fecha: data.fecha,
        observaciones: data.observaciones,
        descripcion: data.descripcion,
        tincion: data.tincion,
        qr_muestra: data.qr_muestra,
        CassetteId: data.CassetteId
    })
    
    return muestra;
};

const getAllMuestraByCassette = async (id)=>{
    const muestra = await Muestra.findAll({
        where:{
            CassetteId: id,
        }
    });
    return muestra;
};

const updateMuestra = async (data)=>{
    const muestraUpdate = await Muestra.update({
        fecha: data.fecha,
        observaciones: data.observaciones,
        descripcion: data.descripcion,
        tincion : data.tincion,
        qr_muestra : data.qr_muestra
    },{
        where :{
            id : data.id,
        }
    });
    return muestraUpdate;
};

const deleteMuestra = async (id)=>{
    await Muestra.destroy({
        where :{
            id : id,
        }
    });
}

const getOneMuestra = async (idmuestra)=>{
    const muestra = await Muestra.findOne({
        where:{
            id: idmuestra,
        }
    });
    return muestra;
}


module.exports = {
    updateMuestra,
    deleteMuestra,
    newMuestra,
    getAllMuestraByCassette,
    getOneMuestra
}