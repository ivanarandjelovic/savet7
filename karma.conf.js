// Karma configuration
// Generated on Sat Jan 16 2016 00:05:25 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg.
    // files, exclude)
    basePath : '',

    // frameworks to use
    // available frameworks:
    // https://npmjs.org/browse/keyword/karma-adapter
    frameworks : [ 'jasmine', 'jasmine-matchers' ],

    // list of files / patterns to load in the browser
    files : [ 'src/main/resources/public/js/lib/jquery-2.1.4.js', 'src/main/resources/public/js/lib/bootstrap.js',
        'src/main/resources/public/js/lib/angular.js', 'src/main/resources/public/js/lib/angular-route.js',
        'src/main/resources/public/js/lib/ui-bootstrap-tpls-0.14.3.js', 'src/main/resources/public/js/lib/toastr.js',
        'src/main/resources/public/js/lib/angular-spinners.js',
        'src/main/resources/public/js/lib/angular-translate.js',
        'src/main/resources/public/js/lib/angular-translate-loader-static-files.js',
        'src/main/resources/public/js/lib/angular-sanitize.js', 'src/main/resources/public/js/lib/angular-cookies.js',
        'src/main/resources/public/js/lib/angular-translate-storage-cookie.js',
        'src/main/resources/public/js/lib/angular-translate-storage-local.js',
        'src/main/resources/public/js/lib/underscore-min.js', 'src/main/resources/public/js/savet7App.js',
        'src/main/resources/public/js/services/*.js', 'src/main/resources/public/js/controllers/*.js',
        'src/main/resources/public/js/directives/*.js', 'src/main/resources/public/js/lib/**.js', '**/*.html',
        'src/test/js/angular/angular-mocks.js', 'src/test/js/**/*Mock.js', 'src/test/js/**/*.json',
        'src/test/js/**/*Test.js', 'src/test/js/*Test.js' ],

    // list of files to exclude
    exclude : [],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors : {
      'src/main/resources/public/js/savet7App.js' : [ 'coverage' ],
      'src/main/resources/public/js/services/*.js' : [ 'coverage' ],
      'src/main/resources/public/js/controllers/*.js' : [ 'coverage' ],
      'src/main/resources/public/js/directives/*.js' : [ 'coverage' ],
      '**/*.html' : [ 'ng-html2js' ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters:
    // https://npmjs.org/browse/keyword/karma-reporter

    reporters : [ 'progress', 'junit', 'coverage' ],

    // the default configuration
    junitReporter : {
      // results will be saved as $outputDir/$browserName.xml
      outputDir : 'build/test-results/js',
      // if included, results will be saved as
      // $outputDir/$browserName/$outputFile
      outputFile : undefined,
      // suite will become the package name attribute in xml
      // testsuite element
      suite : '',
      // add browser name to report and classes names
      useBrowserName : true
    },
    // reporters : [ 'progress' ],

    // optionally, configure the reporter
    coverageReporter : {
      // specify a common output directory
      dir : 'build/reports/js_coverage',
      reporters : [
      // reporters not supporting the `file` property
      {
        type : 'html',
        subdir : 'report-html'
      }, {
        type : 'lcov',
        subdir : 'report-lcov'
      }, {
        type : 'cobertura',
        subdir : '.',
        file : 'cobertura.xml'
      } ]
    },

    // web server port
    port : 9876,

    // enable / disable colors in the output (reporters and logs)
    colors : true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel : config.LOG_INFO,

    // enable / disable watching file and executing tests whenever
    // any file changes
    autoWatch : false,

    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers : [ 'Chrome' ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun : true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency : Infinity,

    ngHtml2JsPreprocessor : {
      // strip this from the file path
      stripPrefix : 'src/main/resources/public'

    // - setting this option will create only a single module that contains
    // templates
    // from all the files, so you can load them all with module('foo')
    // - you may provide a function(htmlPath, originalPath) instead of a
    // string
    // if you'd like to generate modules dynamically
    // htmlPath is a originalPath stripped and/or prepended
    // with all provided suffixes and prefixes
    // moduleName : 'savet7templates'
    }

  })
};
