const fs = require("fs");
const https = require("https");

app.get("/video", (req, response) => {
  const videourl =
    "https://media.istockphoto.com/id/1407324483/video/abstract-digital-grids-wire-frame-dots-blue-loop-background.mp4?s=mp4-640x640-is&k=20&c=26GOwfuXX9wUccr0Rm1QqDLA08RiDYF-fyVA2_U1m28=";
  const filePath = "video5.mp4";
  const fileStream = fs.createWriteStream(filePath);
  console.log(fileStream);
  https
    .get(videourl, (videoResponse) => {
      if (videoResponse.statusCode === 200) {
        videoResponse.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close(() => {
            response.send("Video download complete.");
          });
        });
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
