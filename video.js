const express = require("express");
const cors = require("cors");

global.app = express();
app.use(cors());
const bodyParser = require("body-parser");
const downloadVideo = require("./code");

const ffmpeg = require('fluent-ffmpeg');
const merge = require("./merge");
const mergeVideos = require("./merge");
const mailer = require("./nodemailer");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

app.listen(8000, () => {
  console.log("server is live");
});
require("./code");
require("./code2");
require("./code3");
require("./merge");
app.get("/link", downloadVideo);
app.get("/merge", mergeVideos);

app.get("/mail", mailer)

