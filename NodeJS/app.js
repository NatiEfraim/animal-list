const express = require("express");
const http = require("http");
const path = require("path");
const cors=require("cors");

const {routesInit} = require("./routes/configRoutes");
const { required } = require("joi");
// connceted to the mongo db
require("./db/mongoConnect")
const app = express();
app.use(cors());

// use json former for app express
app.use(express.json());
// diffine pupblic file
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);

// diffine server and the port
const server = http.createServer(app);
const port = process.env.PORT || 3005;
server.listen(port);


// last update!