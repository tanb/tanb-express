const fs = require('fs');
const path = require('path');

const walk = async function(filter, start) {
  let dirPathStack = [];
  let dirs = [];
  let files = [];

  if (!fs.lstatSync(start).isDirectory()) {
    return Promise.reject(new Error("path: " + start + " is not a directory"));
  }
  dirPathStack.push(start);
  dirs.push(start);
  while(dirPathStack.length > 0) {
    let _dirPath = dirPathStack.pop();
    if (!_dirPath) {
      return Promise.reject(new Error(`_dirPath is ${_dirPath}`));
    }
    const dirPath = _dirPath;
    let readFiles = fs.readdirSync(dirPath);
    readFiles.forEach(file => {
      let filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        dirPathStack.push(filePath);
        dirs.push(filePath);
      } else {
        files.push(filePath);
      }
    });
  };
  if (filter) {
    files = files.filter(file => filter.includes(path.extname(file).toLowerCase()));
  }
  const result = {
    start: start,
    dirs: dirs,
    files: files
  }
  return Promise.resolve(result);
}

module.exports = walk;
