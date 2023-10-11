const fs = require('fs');
const pdfparse = require('pdf-parse');

module.exports = function pdfPurse(pdf) {
  try {
    const data = fs.readFileSync(pdf)
    pdfparse(data)
      .then(function (data) {
          const words = data.text.split(' ');
        let countOf = 0;

        words.forEach((word) => {
          if (word === 'not') {
            countOf++;
          }
        });
        console.log(countOf);
        fs.appendFileSync('./output/count.txt', `${countOf}`);
        const watchFile = require('./watchFile.js')
        watchFile()
      })
      .catch(function (error) {
        console.error('PDF parsing error:', error);
      });
  } catch (error) {
    console.error('Error in pdfPurse function:', error);
  }
};
