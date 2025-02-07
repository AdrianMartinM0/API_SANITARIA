const { newCassete, getAllCassette, updateCassette, deleteCassete , getoneCassetteById} = require('../services/serviceCassette');


const newCassetecontroller  = async(req , res , next)=>{
    try {
if (req.body.fecha ||req.body.observaciones || req.body.descripcion || req.body.caracteristicas || req.body.organo ){
let cassette = await newCassete(req.body.fecha, req.body.observaciones, req.body.descripcion, req.body.caracteristicas, req.body.organo , req.id);
res.status(200).send(cassette);
}else{
    const error = new Error('Todos los campos son obligatorios');
    error.status=400;
    throw error;
}
    }catch(error){
        next(error); 
    }

}

const getAllCassettecontroller = async(req , res , next)=>{
try {
const cassette = await getAllCassette();
res.status(200).send(cassette);

}catch(error){
    next(error); 
}
}

const updateCassettecontroller = async(req , res , next)=>{
    try {
if (req.params.id || req.body.fecha || req.body.observaciones || req.body.descripcion || req.body.caracteristicas || req.body.organo) {
    let idcassette = await getoneCassetteById(req.params.id);
    if (!idcassette) {
        const error = new Error('El Cassete no existe');
        error.status=400;
        throw error;
    }else{
        let cassette = await updateCassette(req.params.id ,req.body.fecha  ,req.body.observaciones , req.body.descripcion ,req.body.caracteristicas  , req.body.organo);
        res.status(200).send(cassette);
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

const deleteCassetecontroller = async (req , res , next)=>{
    try {
        let idcassette = await getoneCassetteById(req.params.id);
if (idcassette) {
   let cassette = await deleteCassete(req.params.id);
    res.status(200).send(cassette);
    
}else{
    const error = new Error('El Cassete no existe');
    error.status=400;
    throw error;
}       
    }catch(error){
        next(error); 
    }
}

const getonecassettecontroller = async(req , res , next)=>{
try {
    
    let cassette = await getoneCassetteById(req.params.id);
    if (cassette) {
        res.status(200).send(cassette);
    }else{
        const error = new Error('El Cassete no existe');
    error.status=400;
    throw error;
    }
  
} catch (error) {
    next(error); 
}

}


module.exports={
    deleteCassetecontroller,
    updateCassettecontroller,
    getAllCassettecontroller,
    newCassetecontroller,
    getonecassettecontroller
  
}