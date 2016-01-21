var jasmineReporters = require('jasmine-reporters');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  seleniumAddress : 'http://localhost:4444/wd/hub',
  specs : [ 'src/test/e2e/main-spec.js' ],
  framework : "jasmine2",
  onPrepare : function() {
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath : 'build/test-results/e2e',
      consolidateAll : true
    }));
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath : 'build/reports/e2e/',
      takeScreenshots: true,
      screenshotsFolder: 'images'
    }));
  }
};