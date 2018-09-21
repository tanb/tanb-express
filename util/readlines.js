const readline = require('readline');
const fs = require('fs');

const readlines = async function(file) {
  const lines = [];
  const reader = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
  });

  return new Promise((resolve, reject) => {
    reader.on('line', (line) => {
      lines.push(line);
    });

    reader.on('close', () => {
      return resolve(lines);
    })
  });
}

module.exports = readlines;
