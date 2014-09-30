var trimHtml = require('../index.js'),
    fs = require('fs'),
    path = require('path'),
    fixtures = path.resolve('tests/fixtures');

exports.testFixtures = function(test) {

    fs.readdir(fixtures + '/inputs/', function(err, files) {

        files.forEach(function(file) {

            var input = fs.readFileSync(fixtures + '/inputs/' + file, {
                    encoding: 'utf-8'
                }),
                output = fs.readFileSync(fixtures + '/outputs/' + file, {
                    encoding: 'utf-8'
                });

            test.equal(trimHtml(input, {
                limit: 500
            }).html, output, "Fixture " + file + " not match..");
        });

        test.expect(files.length);

        test.done();
    });
};
