var jasmineReporters = require('jasmine-reporters');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  // seleniumAddress : 'http://localhost:4444/wd/hub',
  specs : [ 'arc/test/e2e/util/**.js', 'src/test/e2e/*-spec.js' ],
  framework : "jasmine2",
  onPrepare : function() {
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath : 'build/test-results/e2e',
      consolidateAll : true
    }));
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath : 'build/reports/e2e/',
      takeScreenshots : true,
      screenshotsFolder : 'images'
    }));
  },
  params : {
    baseUrl : "http://localhost:8080/"
  },
  capabilities: {
    browserName: 'chrome',
    // Share tests and run 5 browsers at the most
    shardTestFiles: true,
    maxInstances: 5
  }
};