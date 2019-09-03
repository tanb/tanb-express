'use strict';
/**
 * Lambda@Edge: Viewer Request trigger
 *
 * Add x-need-dynamic-render header.
 *
 * bot and suffix samples
 * https://gist.github.com/thoop/8165802
 */

const crawlers = [
  'Googlebot',
  'facebookexternalhit',
  'Twitterbot',
  'bingbot',
  'msnbot'
];

const excludeSuffixes = [
  'xml',
  'jpg',
  'png',
  'gif',
  'jpeg',
  'svg',
  'css',
  'js',
  'json',
  'txt',
  'ico'
];

const HTTP_HEAD_NEED_DR = 'x-need-dynamic-render';

module.exports.vrFixer = async (event, context, callback) => {
  // https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#lambda-event-structure-request
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  const suffix =
    request.uri == null || request.uri == '/'
      ? ''
      : request.uri
          .split('?')
          .shift()
          .split('.')
          .pop()
          .toLowerCase();
  const maybeHtml = !excludeSuffixes.some(es => es === suffix);

  const isCrawler = crawlers.some(c => {
    return headers['user-agent'][0].value.includes(c);
  });

  if (isCrawler && maybeHtml) {
    request.headers[HTTP_HEAD_NEED_DR] = [
      {
        key: 'X-Need-Dynamic-Render',
        value: 'true'
      }
    ];
  }

  console.log(
    `isCrawler '${isCrawler}', maybeHtml '${maybeHtml}', uri '${request.uri}'`
  );

  callback(null, request);
};
