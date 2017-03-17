const path = require('path');
const conf = require('./gulp.conf');

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: true,
    autoWatch: false,
    logLevel: 'INFO',
    captureTimeout: 600000,
    browserDisconnectTimeout: 100000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 600000,
    junitReporter: {
      outputDir: 'test-reports'
    },
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'jasmine',
      'es6-shim',
      'source-map-support'
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      conf.path.src('**/*.spec.tsx')
    ],
    preprocessors: {
      [conf.path.src('**/*spec.tsx')]: [
        'webpack'
      ]
    },
    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],
    remapIstanbulReporter: {
      reports: {
        'text-summary': null, // to display summary results on console
      }
    },
    webpack: require('./webpack-test.conf'),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
      require('karma-webpack'),
      require('karma-es6-shim'),
      require('karma-mocha-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-source-map-support'),
      require('karma-remap-istanbul')
    ]
  };

  config.set(configuration);
};
