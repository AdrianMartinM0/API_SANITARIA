require('dotenv').config();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { errores } = require("./middleware/middlewareErrores");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require("./routes/v1.0.0/apiRouter");

const sequelize = require("./database/db");
require("./database/associations")

app.use("/v1", apiRoutes);

// Middleware de errores
app.use(errores);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor eschando en http://localhost:${PORT}`);

  sequelize.sync({force:false}).then(() => console.log("Conectado Correctamente"))

});
