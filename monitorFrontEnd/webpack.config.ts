import webpack from 'webpack';

module.exports = {
  entry: {
    main: './index.web.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
};
