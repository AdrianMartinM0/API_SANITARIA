const { newMuestra, getAllMuestraByCassette, updateMuestra, deleteMuestra , getOneMuestra} = require('../services/serviceMuestra');


const newMuestraController = async(req , res , next)=>{
    try {
        const data = {
            fecha: req.body.fecha,
            observaciones: req.body.observaciones,
            descripcion: req.body.descripcion,
            tincion: req.body.tincion,
            qr_muestra: req.body.qr_muestra,
            CassetteId: req.body.CassetteId  
        }
        if (!data.fecha ||!data.observaciones || !data.descripcion || !data.tincion || !data.CassetteId  ){
            const error = new Error('Todos los campos son obligatorios');
            error.status=400;
            throw error;
        }
        let muestra = await newMuestra(data);
        res.status(200).send(muestra);
    }catch(error){
        next(error); 
    }  
}

const getAllMuestraByCassetteController = async(req , res , next)=>{
    try {
        const muestra = await getAllMuestraByCassette(req.params.id);
        res.status(200).send(muestra);  
    }catch(error){
        next(error); 
    }
}

const updateMuestraController = async(req , res , next)=>{
    try {
        if (!req.params.id || !req.body.fecha || !req.body.observaciones || !req.body.descripcion || !req.body.tincion || !req.body.qr_muestra || !req.body.CassetteId ) {
            const error = new Error('Todos los campos son obligatorios');
            error.status=400;
            throw error;
        }
        const data = {
            id: req.params.id,
            fecha: req.body.fecha,
            observaciones: req.body.observaciones,
            descripcion: req.body.descripcion,
            tincion: req.body.tincion,
            qr_muestra: req.body.qr_muestra,
            CassetteId: req.body.CassetteId  
        }
        let idmuestra = await getOneMuestra(req.params.id);
        if (!idmuestra) {
            const error = new Error('La muestra  no existe');
            error.status=400;
            throw error;
        }
        let muestraupdate = await updateMuestra(data);
        res.status(200).send(muestraupdate);
    }catch(error){
        next(error); 
    }
}

const deleteMuestraController = async(req , res , next)=>{
    try {
        const muestra = await getOneMuestra(req.params.id);
        if (!muestra) {
            const error = new Error('El Cassete no existe');
            error.status=400;
            throw error;
        }
        let deletemuestra = await deleteMuestra(req.params.id);
        res.status(200).send(deletemuestra);      
    }catch(error){
        next(error); 
    }
}

module.exports={
    newMuestraController,
    getAllMuestraByCassetteController,
    updateMuestraController,
    deleteMuestraController,
  
}