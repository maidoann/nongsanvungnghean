const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
require('dotenv').config()
const database = require("./config/database.js");

// const routeAdmin = require('./routers/admin/index.js');

const routeApiAdmin = require('./api/v1/routers/admin/index.js');

const app = express()
const port = process.env.PORT
console.log(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("LHNASDASDAD"))
database.connect();

// routeAdmin(app);
routeApiAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})