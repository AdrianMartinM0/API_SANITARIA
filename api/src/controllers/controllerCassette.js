const { newCassete, getAllCassetteByUser, updateCassette, deleteCassete , getOneCassetteById} = require('../services/serviceCassette');


const newCasseteController  = async(req , res , next)=>{
    try {
        const data = {
            fecha: req.body.fecha,
            observaciones: req.body.observaciones,
            descripcion: req.body.descripcion,
            caracteristicas: req.body.caracteristicas,
            organo: req.body.organo,
            identificador_cassette: req.body.identificador_cassette,
        }
        if (!data.fecha ||!data.observaciones || !data.descripcion || !data.caracteristicas || !data.organo || !data.identificador_cassette ){
            const error = new Error('Todos los campos son obligatorios');                       
            error.status=400;
            throw error;
        }
        let cassette = await newCassete(data, req.id);
        res.status(200).send(cassette);

    }catch(error){
        next(error); 
    }
}

const getAllCassetteByUserController = async(req , res , next)=>{
    try {
        const cassette = await getAllCassetteByUser(req.id);
        res.status(200).send(cassette);
    }catch(error){
        next(error); 
    }
}

const updateCassetteController = async(req , res , next)=>{
    try {

        let idcassette = await getOneCassetteById(req.params.id);
        if (!idcassette) {
            const error = new Error('El Cassete no existe');
            error.status=400;
            throw error;
        }

        const data = {
            fecha: req.body.fecha,
            observaciones: req.body.observaciones,
            descripcion: req.body.descripcion,
            caracteristicas: req.body.caracteristicas,
            organo: req.body.organo,
            identificador_cassete: req.body.identificador_cassete,
        }

        if (!data.fecha ||!data.observaciones || !data.descripcion || !data.caracteristicas || !data.organo || !data.identificador_cassete ){
            const error = new Error('Todos los campos son obligatorios');                       
            error.status=400;
            throw error;
        }

        let cassette = await updateCassette(data, req.params.id);
        res.status(200).send(cassette);
        
    }catch(error){
        next(error); 
    }
}

const deleteCasseteController = async (req , res , next)=>{
    try {
        let idcassette = await getoneCassetteById(req.params.id);
        if (!idcassette) {
            const error = new Error('El Cassete no existe');
            error.status=400;
            throw error; 
        }
        await deleteCassete(req.params.id);
        res.status(200).send('Cassette eliminado con existo');  
    }catch(error){
        next(error); 
    }
}

const getOneCassetteController = async(req , res , next)=>{
    try {
        let cassette = await getOneCassetteById(req.params.id);
        if (!cassette) {
            const error = new Error('El Cassete no existe');
            error.status=400;
            throw error;
        }   
        res.status(200).send(cassette);
    } catch (error) {
        next(error); 
    }
}


module.exports={
    deleteCasseteController,
    updateCassetteController,
    getAllCassetteByUserController,
    newCasseteController,
    getOneCassetteController
}