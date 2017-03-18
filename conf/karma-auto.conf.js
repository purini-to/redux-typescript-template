const conf = require('./gulp.conf');

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: false,
    autoWatch: true,
    logLevel: 'INFO',
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
      conf.path.src('app/**/*.spec.tsx')
    ],
    preprocessors: {
      [conf.path.src('*/**/*.spec.tsx')]: [
        'webpack'
      ]
    },
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true
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
      require('karma-source-map-support'),
      require('karma-remap-istanbul')
    ]
  };

  config.set(configuration);
};
