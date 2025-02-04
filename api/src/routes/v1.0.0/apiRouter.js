const apiRouter = require("express").Router();

const Casseterouter = require("./apiCassette");
const Imagerouter =  require("./apiImagen");
const Muestrarouter =  require("./apiMuestra");
const Usuariorouter = require("./apiUsuario");

// apiRouter.use("/cassette" , Casseterouter)
// apiRouter.use("/imagen" , Imagerouter)
// apiRouter.use("/muestra" , Muestrarouter )
// apiRouter.use("/usuario" , Usuariorouter)


module.exports = apiRouter;