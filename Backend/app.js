const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");
global.app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
