const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

// Import the terra-toolkit configuration.
const defaultWebpackConfig = require('terra-toolkit/config/webpack/webpack.config');

// Create the app-level configuration
const appWebpackConfig = () => ({
  entry: {
    index: path.resolve(path.join(__dirname, 'lib', 'site', 'Index')),
  },
  plugins: [
      new HtmlWebpackPlugin({
        title: 'My App',
        template: path.join(__dirname, 'lib', 'index.html'),
      }),
    ],
});

// combine the configurations using webpack-merge
const mergedConfig = (env, argv) => (
  merge(defaultWebpackConfig(env, argv), appWebpackConfig(env, argv))
);

module.exports = mergedConfig;