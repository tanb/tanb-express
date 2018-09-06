const fs = require('fs');
const path = require('path');

const lockfile = require('@yarnpkg/lockfile');
const versionsFilePath = path.join(__dirname + '/src/versions.ts');
let file = fs.readFileSync('yarn.lock', 'utf8');
let json = lockfile.parse(file);
if (json['type'] !== 'success') {
  console.log('yarn.lock parse error.');
  return;
}
const object = json['object'];
let packages = {};
let data = 'export const versions = ';
// Warning: duplicated package name will be overwritten.
Object.keys(object).forEach((key, idx, keys) => {
  const info = object[key];
  const version = info['version'];
  let arr = key.split('@');
  arr.pop()
  key = arr.join('@');
  packages[key] = version;
});
data = data + JSON.stringify(packages, null, 2);
fs.writeFileSync(versionsFilePath, data, { flat: 'w+' });
