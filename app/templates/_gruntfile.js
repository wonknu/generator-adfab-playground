module.exports = function(grunt) {

    var localConfig = grunt.file.readJSON('package.json').localConfig;

    require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    paths: ["./css"],
                    yuicompress: false,
                    cleancss: false,
                    sourceMap: true,
                    sourceMapFilename: 'assets/css/main.css.map',
                    sourceMapRootpath: '',
                    spawn: false
                },
                files: {
                    "assets/css/main.css": "assets/less/main.less"
                }
            }
        },
        // running `grunt watch` will watch for changes
        watch: {
          less: {
            files: 'src/**/*.less',
            tasks: ['less' /*, "lesslint"*/],
            options: {
              livereload: true,
            }
          },
        },
        copy: {
          main: {
            files: [
              // includes files within path
              {
                expand: true,
                cwd: 'assets/vendors/bootstrap/less/',
                src: [
                  'bootstrap.less',
                  'variables.less'
                ],
                dest: 'assets/less/bootstrap',
                filter: 'isFile'
              },
            ],
          },
        },
        'string-replace': {
          inline: {
            files: {
              'assets/less/bootstrap/': 'assets/less/bootstrap/bootstrap.less',
            },
            options: {
              replacements: [
                // place files inline example
                {
                  pattern: '@import "',
                  replacement: '@import "../vendors/bootstrap/less/'
                }
              ]
            }
          }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('first-build', ['copy', 'string-replace', 'less']);
};
