const Muestra = require('../database/models/Muestra');



const newMuestra  = async (fecha_param , observaciones_param ,descripcion_param , tincion_param , qr_muestra_param = null) =>{

    const muestra = await Muestra.create({
        fecha: fecha_param,
        observaciones: observaciones_param,
        descripcion: descripcion_param,
        tincion: tincion_param,
        qr_muestra: qr_muestra_param,
    })
    
    return muestra;
};

const getAllMuestra = async ()=>{
    const muestra = await Muestra.findAll();
    return muestra;

};

const updateMuestra = async (idmuestra_param , fecha_param , observaciones_param ,descripcion_param , tincion_param , qr_muestra_param = null  )=>{
const muestraupdate  =   await Muestra.update({
        fecha: fecha_param,
        observaciones: observaciones_param,
        descripcion: descripcion_param,
        tincion : tincion_param ,
        qr_muestra : qr_muestra_param
    },{
        where :{
            id : idmuestra_param
        }
    });
    return muestraupdate;

};

const deleteMuestra = async (idmuestra)=>{
    const muestra = await Muestra.destroy({
where :{
    id : idmuestra
}
    });
    return muestra;
}

const getoneMuestra = async (idmuestra)=>{
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
    getAllMuestra,
    getoneMuestra
   
  
}