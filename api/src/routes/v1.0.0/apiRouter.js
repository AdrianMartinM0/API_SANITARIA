const apiRouter = require("express").Router();

const { checkToken } = require("./../../middleware/checkToken");

const Casseterouter = require("./routerCassette");
const Imagerouter =  require("./routerImagen");
const Muestrarouter =  require("./routerMuestra");
const Usuariorouter = require("./routerUsuario");

apiRouter.use("/cassette" , checkToken, Casseterouter);
// apiRouter.use("/imagen" , checkToken, Imagerouter);
apiRouter.use("/muestra" , checkToken, Muestrarouter);
apiRouter.use("/usuario" , Usuariorouter);


module.exports = apiRouter;