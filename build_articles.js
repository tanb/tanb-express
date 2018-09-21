const fs = require('fs');
const path = require('path');
const walk = require('./util/walk');
const readlines = require('./util/readlines');
const lodash = require('lodash');

const articleDir = path.resolve(__dirname, 'src/assets/article');
const articlesFilePath = path.join(__dirname + '/src/articles.ts');

const buildArticles = async function(result) {
  const files = result['files'];
  const articles = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileInfo = path.parse(file);
    const articleId = fileInfo['name'];
    const lines = await readlines(file);
    let articleTitle = 'No title';
    if (lines.length > 0) {
      articleTitle = lines[0];
      articleTitle = lodash.trim(articleTitle, '# ');
    }
    articles.push({id: articleId, title: articleTitle});
  }
  return Promise.resolve(articles);
}

walk(['.md'], articleDir)
  .then(buildArticles)
  .then(articles => {
    let data = 'export const articles = ';
    data = data + JSON.stringify(articles, null, 2).split('"').join("'") + ';\n';
    fs.writeFileSync(articlesFilePath, data, { flat: 'w+' });
  }).catch(e => {
    console.error(e);
  });
