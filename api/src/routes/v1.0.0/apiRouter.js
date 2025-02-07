const apiRouter = require("express").Router();

const { checkToken } = require("./../../middleware/checkToken");

const CassetteRouter = require("./routerCassette");
const Imagerouter =  require("./routerImagen");
const muestraRouter =  require("./routerMuestra");
const Usuariorouter = require("./routerUsuario");

apiRouter.use("/cassette" , checkToken, CassetteRouter);
// apiRouter.use("/imagen" , checkToken, Imagerouter);
apiRouter.use("/muestra" , checkToken, muestraRouter);
apiRouter.use("/usuario" , Usuariorouter);


module.exports = apiRouter;