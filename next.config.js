const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['recoil', 'set-cookie-parser']);
const withImages = require('next-images');

module.exports = withPlugins([
  withTM,
  withImages
])

// module.exports = withImages({
//   target: 'serverless',
// })
