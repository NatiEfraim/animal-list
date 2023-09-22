// diffine router of api
const indexR = require("./index");
const usersR = require("./users");
const animalR = require("./animal");



exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/animal",animalR);


}