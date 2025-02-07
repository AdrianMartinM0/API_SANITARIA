const { newMuestra, getAllMuestra, updateMuestra, deleteMuestra , getoneMuestra} = require('../services/serviceMuestra');


const newMuestracontroller = async(req , res , next)=>{
    try {
        if (req.body.fecha ||req.body.observaciones || req.body.descripcion || req.body.tincion || req.CassetteId  ){
        let muestra = await newMuestra(req.body.fecha, req.body.observaciones, req.body.descripcion, req.body.tincion , req.CassetteId);
        res.status(200).send(muestra);
        }else{
            const error = new Error('Todos los campos son obligatorios');
            error.status=400;
            throw error;
        }
            }catch(error){
                next(error); 
            }
        
}

const getAllMuestracontroller = async(req , res , next)=>{
    try {
        const muestra = await getAllMuestra();
        res.status(200).send(muestra);
        
        }catch(error){
            next(error); 
        }
}

const updateMuestracontroller = async(req , res , next)=>{
    try {
        idmuestra_param , fecha_param , observaciones_param ,descripcion_param , tincion_param 
        if (req.params.id || req.body.fecha || req.body.observaciones || req.body.descripcion || req.body.tincion ) {
            let idmuestra = await getoneMuestra(req.params.id);
            if (!idmuestra) {
                const error = new Error('La muestra  no existe');
                error.status=400;
                throw error;
            }else{
                let muestraupdate = await updateMuestra(req.params.id , req.body.fecha , req.body.observaciones , req.body.descripcion , req.body.tincion );
                res.status(200).send(muestraupdate);
            }
        }else{
            const error = new Error('Todos los campos son obligatorios');
            error.status=400;
            throw error;
        }
        
        }catch(error){
            next(error); 
        }
}

const deleteMuestracontroller = async(req , res , next)=>{
    try {
        const muestra = await getoneMuestra(req.params.id);
     if (muestra) {
        let deletemuestra = await deleteMuestra(req.params.id);
        res.status(200).send(deletemuestra);
     }else{
        const error = new Error('El Cassete no existe');
        error.status=400;
        throw error;
     }
        
        }catch(error){
            next(error); 
        }
}



module.exports={
    newMuestracontroller,
    getAllMuestracontroller,
    updateMuestracontroller,
    deleteMuestracontroller,
  
}