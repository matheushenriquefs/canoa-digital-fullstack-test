const CONTROLLER = require("../controllers/controller.js");

module.exports = app => {
  app
    .route("/veiculos")
    .get(CONTROLLER.readAll)
    .post(CONTROLLER.create);

  app
    .route("/veiculos/:veiculoId")
    .get(CONTROLLER.read)
    .put(CONTROLLER.update)
    .delete(CONTROLLER.delete);
};