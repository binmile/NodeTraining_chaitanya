const fs = require("fs");

const mergeVideos = (req, res) => {
  const videoFile1 = "output.mp4";
  const videoFile2 = "video5.mp4";
  const mergedVideoFile = "merged-video.mp4";

  const videoContent1 = fs.readFileSync(videoFile1);
  const videoContent2 = fs.readFileSync(videoFile2);

  const mergedVideoContent = Buffer.concat([videoContent1, videoContent2]);

  fs.writeFileSync(mergedVideoFile, mergedVideoContent);

  res.send("Videos merged successfully.");
};

module.exports = mergeVideos;
