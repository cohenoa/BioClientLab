// // craco.config.js
// const path = require('path');

// module.exports = {
//   webpack: {
//     configure: (webpackConfig) => {
//       webpackConfig.resolve.fallback = {
//         os: require.resolve('os-browserify/browser'),
//         path: require.resolve('path-browserify'),
//         crypto: require.resolve('crypto-browserify'),
//         stream: require.resolve('readable-stream'),
//         buffer: require.resolve('buffer'),
//         util: require.resolve('util'),
//         assert: require.resolve('assert'),
//         url: require.resolve('url'),
//         zlib: require.resolve('browserify-zlib'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         vm: require.resolve('vm-browserify'),
//         fs: false,
//         process: require.resolve('process/browser'),
//       };
//       return webpackConfig;
//     },
//   },
// };
