const withPlugins = require('next-compose-plugins');
// const withTM = require('next-transpile-modules')(['recoil', 'set-cookie-parser']);
const withTM = require('next-transpile-modules')(['recoil']);
const withImages = require('next-images');

module.exports = withPlugins([
  withTM,
  withImages
])

// module.exports = withImages({
//   target: 'serverless',
// })
