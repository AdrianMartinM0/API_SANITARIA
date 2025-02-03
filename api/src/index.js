const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiroutes = require("./src/routes/apiRouter");

const sequelize = require("./src/database/db");
// require("./src/database/associations");


app.use("/concesionario", apiroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor eschando en http://localhost:${PORT}`);

  sequelize.sync({force:false}).then(() => console.log("Conectado Correctamente"))

});
