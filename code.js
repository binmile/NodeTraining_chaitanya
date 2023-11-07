const ytdl = require("ytdl-core");
const fs = require("fs");

const downloadVideo = async (req, res) => {
  // try {
  //   const info = await ytdl.getInfo(req.body.url);
  //   const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

  //   if (format) {
  //     const video = ytdl(req.body.url, { format });
  //     const filePath = "output.mp4";

  //     video.pipe(fs.createWriteStream(filePath)).on("finish", () => {
  //       res.download(filePath, "output.mp4");
  //     });
  //   } else {
  //     res.status(400).send("No suitable format found");
  //   }
  // } catch (error) {
  //   res.status(500).send("Error: " + error);
  // }

  try {
    const videoUrls = req.body.videoUrls;

    console.log(videoUrls);
    if (videoUrls.length !== 2) {
      return res
        .status(400)
        .send("Please provide exactly two video URLs for merging.");
    }

    const downloadedVideos = [];

    for (const url in videoUrls) {
      const info = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

      if (format) {
        const filePath = `${url}.mp4`;
        const video = ytdl(url, { format });
        const writeStream = fs.createWriteStream(filePath);

        await new Promise((resolve, reject) => {
          video
            .pipe(writeStream)
            .on("finish", () => {
              downloadedVideos.push(filePath);
              resolve();
            })
            .on("error", (err) => reject(err));
        });
      } else {
        return res
          .status(400)
          .send("No suitable format found for one of the videos.");
      }
    }

    const mergedFilePath = "merged.mp4";

    ffmpeg()
      .input(downloadedVideos[0])
      .input(downloadedVideos[1])
      .on("end", () => {
        res.download(mergedFilePath, "merged.mp4");
      })
      .on("error", (err) => {
        return res.status(500).send("Error during video merging: " + err);
      })
      .mergeToFile(mergedFilePath, "./tmp");
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

module.exports = downloadVideo;
