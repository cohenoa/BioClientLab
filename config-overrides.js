const webpack = require('webpack');

module.exports = function override(config) {
  config.target = "browserslist";

  // Configure fallbacks for Node.js core modules
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("readable-stream"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "buffer": require.resolve("buffer"),
    "timers": require.resolve("timers-browserify"),
    "path": require.resolve("path-browserify"),
    "fs": require.resolve("browserify-fs"),
    "process": require.resolve("process/browser"),
    "vm": require.resolve("vm-browserify"), // Add this line for vm polyfill
  });
  config.resolve.fallback = fallback;

  // Use ProvidePlugin to inject Buffer and process globally
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  // Ensure .mjs files are handled correctly
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
