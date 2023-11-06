const ytdl = require('ytdl-core');
const fs = require('fs'); 

const downloadVideo = async (req,res) => {
    try {
        const info = await ytdl.getInfo(req.body.url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    
        if (format) {
          const video = ytdl(req.body.url, { format });
          const filePath = 'output.mp4';
    
          video.pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
              res.download(filePath, 'output.mp4');
            });
        } else {
          res.status(400).send('No suitable format found');
        }
      } catch (error) {
        res.status(500).send('Error: ' + error);
      }
    ;
    
};

module.exports = downloadVideo


