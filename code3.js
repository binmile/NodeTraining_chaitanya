const fs = require("fs");
const https = require("https");

app.get("/video2", (req, response) => {
  const videourl = req.body.url;
  const filePath = "video5.mp4";
  const fileStream = fs.createWriteStream(filePath);
  console.log(fileStream);
  https
    .get(videourl, (videoResponse) => {
      if (videoResponse.statusCode === 200) {
        videoResponse.pipe(fileStream);
        fileStream.on(
          "finish".then(
            fileStream.close.then(response.send("Video download complete."))
          )
        );
      } else {
        console.error(
          `Failed to download the video. Status code: ${videoResponse.statusCode}`
        );
        response.status(videoResponse.statusCode).end();
      }
    })
    .on("error", (err) => {
      console.error("Error downloading the video:", err);
      response.status(500).end();
    });
});
