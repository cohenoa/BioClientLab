const webpack = require('webpack'); // Import webpack using CommonJS syntax
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin

require('dotenv').config({ path: './.env' });
module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
    fallback: {
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
      assert: require.resolve('assert'),
      url: require.resolve('url'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      vm: require.resolve('vm-browserify'),
      fs: false,
      process: require.resolve('process/browser'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Presets for ES6+ and React
          },
        },
      },
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', 
    }),
    // new Dotenv({
    //   path: './.env', // Path to .env file (this is the default)
    //   // safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    // }),
    // new webpack.DefinePlugin({
    //   'MINIO_API_URL': JSON.stringify(process.env.MINIO_API_URL),
    //   'MINIO_ACCESS_ID': JSON.stringify(process.env.MINIO_ACCESS_ID),
    //   'MINIO_ACCESS_PASS': JSON.stringify(process.env.MINIO_ACCESS_PASS)
    // }),
    new HtmlWebpackPlugin({
      baseUrl: '/',
      template: '/public/index.html',
      templateParameters(compilation, assets, options) {
        return {
          compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options,
          },
          process,
        }
      },
      chunksSortMode: 'auto',
      minify: {
        collapseWhitespace: false,
      },
      cache: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Directory to serve
    },
    compress: true,
    port: 3000, // Dev server port
    historyApiFallback: true, // Serve index.html for all 404 routes (useful for SPA)
  },
};
