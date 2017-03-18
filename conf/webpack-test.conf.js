const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const toolboxVariables = require('./toolbox-variables');

const valiables = require('./variables');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.tsx?$/i,
        exclude: /(node_modules|spec\.tsx?$|configureStore.tsx?$|wrappers.tsx?$)/i,
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post'
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loaders: [
          'ts-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [
          require('postcss-import')(),
          require('postcss-mixins')(),
          require('postcss-each')(),
          cssnext({
            features: {
              customProperties: {
                variables: toolboxVariables,
              },
            },
          }),
          autoprefixer,
          require('postcss-reporter')({ clearMessages: true })
        ],
        resolve: {},
        ts: {
          configFileName: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        }
      },
      debug: true
    }),
    new webpack.EnvironmentPlugin(
      Object.assign({
        NODE_ENV: 'test',
      }, valiables)
    )
  ],
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window',
    fs: '{}'
  }
};
