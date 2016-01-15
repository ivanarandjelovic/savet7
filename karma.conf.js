// Karma configuration
// Generated on Sat Jan 16 2016 00:05:25 GMT+0100 (CET)

module.exports = function(config) {
    config
            .set({

                // base path that will be used to resolve all patterns (eg.
                // files, exclude)
                basePath : '',

                // frameworks to use
                // available frameworks:
                // https://npmjs.org/browse/keyword/karma-adapter
                frameworks : [ 'jasmine' ],

                // list of files / patterns to load in the browser
                files : [
                        'src/main/resources/public/js/lib/jquery-2.1.4.js',
                        'src/main/resources/public/js/lib/bootstrap.js',
                        'src/main/resources/public/js/lib/angular.js',
                        'src/main/resources/public/js/lib/angular-route.js',
                        'src/main/resources/public/js/lib/ui-bootstrap-tpls-0.14.3.js',
                        'src/main/resources/public/js/lib/toastr.js',
                        'src/main/resources/public/js/lib/angular-spinners.min.js',
                        'src/main/resources/public/js/lib/angular-translate.js',
                        'src/main/resources/public/js/lib/angular-translate-loader-static-files.js',
                        'src/main/resources/public/js/lib/angular-sanitize.js',
                        'src/main/resources/public/js/lib/angular-cookies.js',
                        'src/main/resources/public/js/lib/angular-translate-storage-cookie.js',
                        'src/main/resources/public/js/lib/angular-translate-storage-local.js',
                        'src/main/resources/public/js/savet7App.js',
                        'src/main/resources/public/js/services/*.js',
                        'src/main/resources/public/js/controllers/*.js',
                        'src/main/resources/public/js/directives/*.js',
                        'src/main/resources/public/js/lib/**.js',
                        'src/test/js/angular/angular-mocks.js',
                        'src/test/js/**/*Test.js', 'src/test/js/*Test.js' ],

                // list of files to exclude
                exclude : [],

                // preprocess matching files before serving them to the browser
                // available preprocessors:
                // https://npmjs.org/browse/keyword/karma-preprocessor
                preprocessors : {},

                // test results reporter to use
                // possible values: 'dots', 'progress'
                // available reporters:
                // https://npmjs.org/browse/keyword/karma-reporter
                singleRun : true,

                reporters : [ 'progress', 'junit' ],

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
                singleRun : false,

                // Concurrency level
                // how many browser should be started simultaneous
                concurrency : Infinity
            })
}
