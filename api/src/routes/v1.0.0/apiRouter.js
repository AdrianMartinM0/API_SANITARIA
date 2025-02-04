const apiRouter = require("express").Router();

const Casseterouter = require("./routerCassette");
const Imagerouter =  require("./routerImagen");
const Muestrarouter =  require("./routerMuestra");
const Usuariorouter = require("./routerUsuario");

// apiRouter.use("/cassette" , Casseterouter)
// apiRouter.use("/imagen" , Imagerouter)
// apiRouter.use("/muestra" , Muestrarouter )
apiRouter.use("/usuarios" , Usuariorouter)


module.exports = apiRouter;