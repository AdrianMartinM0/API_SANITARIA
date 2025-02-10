const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = ( req, res, next ) => {
    if(!req.headers['user-token'])
        return  res.status(400).send('No se encuentra el token de usuario');
    const userToken = req.headers['user-token'];

    let payload = {};
    try{
        payload = jwt.decode(userToken, process.env.FRASE_TOKEN);
    }catch(err){
        return  res.status(400).send('El token no es valido');
    }

    if(payload.expiredAt < moment().unix())
        return  res.status(400).send('El token ha expirado');

    req.id = payload.id;
    req.admin = payload.admin;

    next();
}

module.exports = {
    checkToken,
}