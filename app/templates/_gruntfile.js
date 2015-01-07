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
                    "assets/css/<%= theme_name %>.css": "assets/less/main.less"
                }
            }
        },
        // running `grunt watch` will watch for changes
        watch: {
          less: {
            files: 'assets/less/**/*.less',
            tasks: ['less'],
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
        replace: {
          bootstrap: {
            src: ['assets/less/bootstrap/bootstrap.less'],
            overwrite: true,
            replacements: [{
              from: '@import "',
              to: '@import "assets/vendors/bootstrap/less/'
            }]
          },
          angular: {
            src: ['layout/layout.phtml'],
            overwrite: true,
            replacements: [{
              from: '<body',
              to: '<body ng-app="<%= site_name %>App"'
            }]
          }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('build', ['copy', 'replace', 'less']);
};
