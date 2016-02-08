//jest.dontMock('jasmine-reporters');
var reporters = require('jasmine-reporters');

var junitReporter = new reporters.JUnitXmlReporter({
    savePath: 'build/reports/js',
    consolidateAll: false,
    filePrefix: 'TEST-'
});

jasmine.VERBOSE = true;

jasmine.getEnv().addReporter(junitReporter);
