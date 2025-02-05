const usuRouter = require('express').Router();
const Usuario = require('../../database/models/Usuario');


// ENDPOINT NECESARIOS PARA EL FUNCIONAMIENTO DE LA WEB 
// USUARIO
// GETS:
//      1
//          BUSCAR UN USUARIO POR EMAIL, ||| PARA PODER BUSCAR Y COMPROBAR SU CONTRASEÑA, 
//          PARA COMPROBAR QUE EL CORREO ESTA REGISTRADO AL SOLICITAR UNA NUEVA CONTRASEÑA
//          DESPUES HABRIA QUE HACER UN UPDATE CON LA NEUVA CONTRASEÑA Y DESPUES MANDAR EL CORREO
//POST:
//      1
//          USAR FIND OR CREATE , BUSCAR CON FIND POR EL EMAIL


// IMPORTANTEEEEEE!!!!! FALTA POR DEVIDIR ESTOAS TAREAS ENTRE EL ROUTER, EL CONTROLLER Y EL SERVICE
// EL ROUTER LLAMA AL CONTROLADOR, EL CONTROLADOR LLAMA AL MIDLEWARE(DE MOMENTO NO SE PONE) Y AL SERVICE
// EL SERVICE HACE LAS CONSULTAS INSERCIONES ... CON SEQUELIZE
// MUCHO MAS IMPORTANTEEEEEEEEEEEEE!!!!!!!!!!!!
// FALTA POR MEJORAR LA RESPUESTA AL USUARIO, ABRIA QUE AGREGAR AL MENOS FALLOS AL CONTENIDO DEL USUARIO CON ERRORES 400
// Y SI SE PUEDE AGREGAR LOS FALLOS CON EL SERVER COMO FALLO 500



usuRouter.get('/:email', async ( req, res ) => {
    const usu = await Usuario.findOne({
        where:{
            email: req.params.email,
        }
    });
    res.status(200).send(usu);
})

usuRouter.post('/', async ( req, res ) => {
    const usu = await Usuario.findOrCreate({
        where:{
            email: req.body.email,
        },
        defaults: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            password: req.body.password,
            centro: req.body.centro,
        }
    });
    res.status(200).send(usu);
});

usuRouter.put('/:email', async (req, res) => {
    const usu = await Usuario.update(
        {
            password: req.body.password 
        },
        { 
            where: { 
                email: req.params.email 
            } 
        }
    );
    res.status(200).send(usu);
});


module.exports = usuRouter;