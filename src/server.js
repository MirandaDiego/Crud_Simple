const express = require("express");
const connect = require('./db/index');
const routes = require("./routes");


connect();
const app = express();
app.use(express.json())
app.use(routes);


const PORT = 3333;

app.listen(PORT, () => `server is running on PORT ${PORT}`);