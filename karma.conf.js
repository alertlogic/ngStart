/*global module: true */
module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '.',
        files: ['src/main/vendor/jquery/dist/jquery.min.js',
                'src/main/vendor/angular/angular.js',
                'JASMINE',
                'JASMINE_ADAPTER',
                'REQUIRE',
                'REQUIRE_ADAPTER',
                'src/test/main-test.js',
                {pattern: 'src/main/**/*.js', included: false}],
        autoWatch: false,
        colors: true,
        logLevel: config.LOG_DEBUG,
        frameworks: ['jasmine', 'requirejs'],
        browsers: ['PhantomJS'],
        reporters: ['progress', 'coverage'],
        preprocessors: {
            //  Add directories to pre-process to obtain code coverage reporting.
            // EXAMPLE: 'src/main/common/**/*.js': 'coverage'
        },
        coverageReporter: {
            reporters: [{type: 'html', dir: 'src/main/coverage'},
                        {type: 'cobertura', dir: 'coverage'}]
        },
        plugins: ['karma-requirejs',
                  'karma-jasmine',
                  'karma-phantomjs-launcher',
                  'karma-coverage']
    });
};