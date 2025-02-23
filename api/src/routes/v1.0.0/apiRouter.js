const apiRouter = require("express").Router();

const { checkToken } = require("./../../middleware/checkToken");

const cassetteRouter = require("./routerCassette");
const imageRouter =  require("./routerImagen");
const muestraRouter =  require("./routerMuestra");
const usuarioRouter = require("./routerUsuario");

apiRouter.use("/cassette" , checkToken, cassetteRouter);
apiRouter.use("/imagen" , checkToken, imageRouter);
apiRouter.use("/muestra" , checkToken, muestraRouter);
apiRouter.use("/usuario" , usuarioRouter);


module.exports = apiRouter;