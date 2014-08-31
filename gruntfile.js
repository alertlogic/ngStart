/*global module: true */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
              '* Copyright (c) <%= grunt.template.today("yyyy") %> */'
        },
        clean: {
            all: ['<%=pkg.folders.build %>'],
            css: {
                src: ['<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/*.css',
                      '!<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css']
            }
        },
        /*
         * Run hinting only on internal code
         */
        jshint: {
            src: ['<%=pkg.folders.jsSource %>' + '**/*.js',
                  '!<%=pkg.folders.jsSource %>' + '**/*.test.js',
                  '!src/main/vendor/**',
                  '!src/main/coverage/**',
                  '!target/**',
                  '!src/main/doc/**'],
            grunt: ['gruntfile.js'],
            options: {
                jshintrc: '.jshintrc',
                globals: {
                }
            }
        },
        /*
         * Run documentation / build against internal code
         */
        jsdoc : {
          dist : {
            src: ['<%=pkg.folders.jsSource %>' + '**/*.js',
                  '!src/main/**/*.test.js',
                  '!src/main/vendor/**',
                  '!src/main/coverage/**',
                  '!target/**',
                  '!src/main/doc/**'],
            options: {
                destination: 'src/main/doc'
            }
          }
        },
        /*
         * Compile application CSS from LESS
         */
        less: {
          production: {
              options: {
              },
              files: {
                  'src/main/css/app.css': 'src/main/css/production.less'
              }
          },
          development: {
            options: {
            },
            files: {
                'src/main/css/app.css': 'src/main/css/development.less'
            }
          }
        },
        /*
         * Watch tasks for automation
         */
        watch: {
          /*
           * Transpile LESS to CSS
           */
          less: {
              files: ['<%=pkg.folders.wwwRoot %>' + '**/*.less'],
              tasks: ['less:production']
          },
          /*
           * Automate i18n translation file creation
           */
          html: {
            files: ['<%=pkg.folders.wwwRoot %>' + '**/*.html',
                    '!src/main/doc/**',
                    '!src/main/coverage/**',
                    '!src/main/vendor/**'],
            tasks: ['nggettext_extract', 'nggettext_compile'],
            options: {
            }
          },
          /*
           * Run hinting/doc/tests on any internal JS file change
           */
          distributable_javascript: {
            files: ['<%=pkg.folders.jsSource %>' + '**/*.js',
                    '!<%=pkg.folders.jsSource %>' + '**/*.test.js',
                    '!src/main/doc/**',
                    '!src/main/coverage/**',
                    '!src/main/vendor/**'],
            tasks: ['jshint', 'jsdoc', 'karma:development:run'],
            options: {
            }
          },
          /*
           * Run hinting/tests on any internal test file change
           */
          test_javascript: {
            files: ['!<%=pkg.folders.jsSource %>' + '**/*.js',
                    '<%=pkg.folders.jsSource %>' + '**/*.test.js',
                    '!src/main/doc/**',
                    '!src/main/coverage/**',
                    '!src/main/vendor/**'],
            tasks: ['jshint', 'karma:development:run'],
            options: {
            }
          },
          karma_test_configurations: {
            files: ['<%=pkg.folders.testRoot + "**/*.js" %>'],
            tasks: ['karma:development:run']
          },
          translations: {
            files: ['<%=pkg.folders.translations + "**/*.po" %>'],
            tasks: ['nggettext_compile']
          },
        },
        copy: {
          /*
           * This task copies distributable CSS files
           */
          css: {
            files: [{
              expand: true,
              dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/',
              src: ['**/*.css',
                    '!doc/**',
                    '!coverage/**'],
              cwd: '<%= pkg.folders.wwwRoot%>/'
            }]
          },
          /*
           * This task copies distributable HTML files
           */
          html: {
            files: [{
              expand: true,
              dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/',
              src: ['**/*.html',
                    '!vendor/**',
                    '!doc/**',
                    '!coverage/**'],
              cwd: '<%= pkg.folders.wwwRoot%>/'
            }]
          },
          /*
           * This task copies distributable Image & Font files
           */
          images: {
            files: [{
              expand: true,
              dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/',
              src: ['**/*.ai',
                    '**/*.eot',
                    '**/*.ico',
                    '**/*.gif',
                    '**/*.jpg',
                    '**/*.otf',
                    '**/*.png',
                    '**/*.ttf',
                    '**/*.svg',
                    '**/*.woff',
                    '!doc/**',
                    '!coverage/**'],
              cwd: '<%= pkg.folders.wwwRoot%>/'
            }]
          },
          /*
           * This task copies distributable vendor JS & HTML files
           */
          vendor: {
            files: [{
              expand: true,
              dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/',
              src: ['**/*.css',
                    '!doc/**',
                    '!**/Makefile',
                    '!**/*.less',
                    '!**/*.js',
                    '!vendor/**',
                    '!coverage/**',
                    'vendor/**/*.min.js',
                    'vendor/**/*.min.js.map',
                    'vendor/almond/almond.js',
                    'vendor/angular/angular.js',
                    'vendor/angular-animate/angular-animate.js',
                    'vendor/angular-resource/angular-resource.js',
                    'vendor/angular-route/angular-route.js',
                    'vendor/angular-sanitize/angular-sanitize.js',
                    'vendor/bootstrap/fonts/**',
                    'vendor/font-awesome/fonts/**',
                    'vendor/requirejs/require.js',
                    'vendor/angular-ui-select/dist/select.js'],
              cwd: '<%= pkg.folders.wwwRoot%>/'
            }]
          },
          /*
           * This is our main distributable task
           */
          deploy: {
            files: [{
              expand: true,
              dest: '<%= deployOrdner %>',
              src: ['<%= pkg.name + "-" + pkg.version + ".tar.gz"%>'],
              cwd: '<%= pkg.folders.build%>'
            }]
          },
          /*
           * Copy any required .htaccess files
           */
          htaccess: {
            files: [{
              expand: true,
              dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/',
              src: ['.htaccess'],
              cwd: '<%= pkg.folders.wwwRoot%>'
            }]
          }
        },
        /*
         * This task minifies and copies all in house module JS files
         */
        uglify: {
          options: {
            mangle: true
          },
          min: {
            files: grunt.file.expandMapping(['src/main/**/*.js',
                                             '!src/main/**/*.test.js', 
                                             '!src/main/vendor/**',
                                             '!src/main/doc/**',
                                             '!src/main/coverage/**'], 
                                             '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/', {
                rename: function(destBase, destPath) {
                    return destBase+destPath.replace('src/main/', '');
                }
            })
          }
        },
        /*
         * TODO
         */
        cssmin: {
          css: {
            files: {
              '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css': [
                '/src/main/css/app.css'
              ]
            }
          }
        },
        karma: {
          options: {
            configFile: 'karma.conf.js'
          },
          development: {
            options: {
                background: true
            }
          },
          build: {
            options: {
                singleRun: true
            }
          }
        },
        /*
         * Builds the UI distributable zip-file at the end of the install task
         */
        compress: {
          tgz: {
            options: {
                mode: 'tgz',
                archive: '<%= pkg.folders.build + pkg.name + "-" + pkg.version + ".tar.gz"%>'
            },
            expand: true,
            src:  ['**/*', '**/.*'],
            dest: '<%= pkg.name + "-" + pkg.version %>/',
            cwd: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/'
          }
        },
        /*
         * Runs the web server
         */
        connect: {
          server: {
            options:  {
                port: 8888,
                base: '<%=pkg.folders.wwwRoot%>',
                hostname: '*'
            }
          }
        },
        /*
         * Builds the distributable manifest
         */
        manifest: {
          generate: {
            options: {
              basePath: '<%=pkg.folders.build + pkg.name + "-" + pkg.version%>',
              network: ["*"],
              fallback: [],
              exclude: [],
              preferOnline: false,
              timestamp: true
            },
            src: ['**/*', 
                  '!main.js.map', 
                  '!main.js.src',
                  '!js', 
                  '!css', 
                  '!images'],
            dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version + "/" + pkg.name %>.manifest'
          }
      },
      /*
       * Attaches license files
       */
      license: {
        options: {
          unknown: true,
          start: '.',
          depth: null,
          output: 'file'
        }
      },
      /*
       * Handle i18n
       */
      nggettext_extract: {
        pot: {
          files: {
            'po/template.pot': ['<%=pkg.folders.jsSource %>' + '**/*.html']
          }
        },
      },
      nggettext_compile: {
        all: {
          options: {
            module: 'app'
          },
          files: {
            'src/main/translations.js': ['po/*.po']
          }
        },
      },
      /*
       * NPM release options
       */
      release: {
          options: {
              npm: false
          }
      },
      /*
       * Allows querystring versioning (for AWS CloudFront)
       */
      'string-replace': {
        dist: {
          files: {
            '<%=pkg.folders.build + pkg.name + "-" + pkg.version%>/': '<%=pkg.folders.build + pkg.name + "-" + pkg.version%>/**/main.js'
          },
          options: {
            replacements: [{
                pattern: 'release.version',
                replacement: '<%= pkg.version %>'
            }]
          }
        }
      }
    });

    /*
     * Grunt tasks
     */
    grunt.registerTask("install", "Create a deployable artifact for production servers",
      function (system) {
        grunt.task.run("jshint");
        grunt.task.run("clean:all");

        if (system) {
          grunt.config('configuration', "configuration_" + system);
        } else {
          grunt.config('configuration', "configuration");
        }

        grunt.task.run("clean:css");
        grunt.task.run("less:production");

        grunt.task.run("karma:build");

        grunt.task.run("copy:css");

        grunt.task.run("copy:htaccess");
        grunt.task.run("copy:html");

        grunt.task.run("nggettext_extract");
        grunt.task.run("nggettext_compile");

        grunt.task.run("copy:images");

        grunt.task.run("copy:vendor");

        grunt.task.run("uglify:min");

        grunt.task.run("string-replace");

        grunt.task.run("manifest");

        grunt.task.run("compress");
      }
    );

    grunt.registerTask('license', 'List all packages (and their sub-packages) that this project depends on with license information', function() {
      function convertToCsv(data) {
        var ret = "", module, licenses, repository;
        for (module in data) {
          if (data.hasOwnProperty(module)) {
            licenses = data[module].licenses || "";
            repository = data[module].repository || "";
            ret = ret + module + ";" + licenses + ";" + repository + "\r\n";
          }
        }
        return ret;
      }
      var checker = require('license-checker'),
        fs = require('fs'),
        done = this.async(),
        defaults = {
          start: '.',
          unknown: false,
          depth: 1,
          include: 'all',
          output: 'console', //console or file
          filename: 'LICENSES',
          format: 'json' //json or csv
        },
        options = grunt.util._.extend(defaults, this.options());

        checker.init(options, function(data){
          if (options.format === 'csv') {
              data = convertToCsv(data);
          } else {
              data = JSON.stringify(data, null, 4);
          }

          if (options.output === 'file') {
            fs.writeFile(options.filename, data, function() {
              console.log('Successfully written '.green + options.filename.grey);
              done();
            });
          } else if (options.output === 'console') {
              grunt.log.writeln(data);
          } else {
              grunt.log.writeln("Unknown output channel: " + options.output);
          }
      });
    });

    grunt.registerTask('default', ['jshint', 'nggettext_extract', 'jsdoc']);
    grunt.registerTask('web', ['connect', 'karma:development', 'watch']);

    //call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
    require('load-grunt-tasks')(grunt);
};
