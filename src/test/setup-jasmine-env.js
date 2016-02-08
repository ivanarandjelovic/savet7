//jest.dontMock('jasmine-reporters');
var reporters = require('jasmine-reporters');

var junitReporter = new reporters.JUnitXmlReporter({
    savePath: 'build/reports/js',
    consolidateAll: false
});

jasmine.VERBOSE = true;

jasmine.getEnv().addReporter(junitReporter);
