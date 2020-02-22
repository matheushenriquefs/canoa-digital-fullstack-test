const EXPRESS = require("express");
const MONGOOSE = require("mongoose");
const BODY_PARSER = require("body-parser");
const CORS = require("cors");

global.Veiculo = require("./models/model.js");
const ROUTES = require("./routes/routes.js");

MONGOOSE.set("useFindAndModify", false);
MONGOOSE.connect(
  "mongodb://localhost:27017/canoa-digital-fullstack-test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const PORT = process.env.PORT || 49152;
const APP = EXPRESS();

APP.use(CORS());

APP.use(BODY_PARSER.urlencoded({extended: true}));
APP.use(BODY_PARSER.json());

ROUTES(APP);
APP.listen(PORT);

APP.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found`});
});

console.log(`Server started on port ${PORT}`);