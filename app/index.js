'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var AdfabPlaygroundGenerator = yeoman.generators.Base.extend({

  /**
   * Say Hello then ask for app & theme name
   */
  promptUser: function() {
    var done = this.async();
    console.log(this.yeoman); // have Yeoman greet the user

    var prompts = [{
      name:     'appName',
      message:  'What is your app\'s name ?'
    },
    {
      name:     'themeName',
      message:  'What is your playground theme\'s name ?',
      default:  'starter'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.themeName = props.themeName;
      done();
    }.bind(this));
  },

  /**
   * create app folders structure
   */
  scaffoldFolders: function(){
    var dirs = [
      "assets",
      "assets/images",
      "assets/css",
      "assets/css/fonts",
      "assets/js",
      "assets/less",
      "assets/less/common",
      "assets/less/layouts",
      "assets/less/componants",
      "assets/less/bootstrap"
    ];

    dirs.forEach(function(dirName) {
      this.mkdir(dirName);
    }.bind(this));
  },

  /**
   * move assets files
   */
  copyMainFiles: function(){
    var context = {
          site_name: this.appName,
          theme_name: this.themeName
        },
        lessFiles = [
          "common/_vars",
          "common/_mixins",
          "common/_fonts",
          "common/_common",
          "common/_header",
          "common/_footer",
          "layouts/_page",
          "_main"
        ];

    lessFiles.forEach(function(fileName) {
      this.copy(
        "less/" + fileName + ".less", // source file
        "assets/less/" + fileName.replace("_", "") + ".less" // destination, without underscore in the name
      );
    }.bind(this));

    // copy grunt & bower file
    this.copy("_gruntfile.js", "Gruntfile.js");
    this.copy("._bowerrc", ".bowerrc");

    // copy & fill with the right appName npm & bower json file
    this.template("_package.json", "package.json", context);
    this.template("_bower.json", "bower.json", context);

    // assetic config
    this.template("_assets.php", "assets.php", context);
  },

  /**
   * Load & build dependencies
   */
  runNpm: function(){
    this.installDependencies({
      bower: true,
      npm: true,
      callback: function () {
        this.spawnCommand('grunt', ['build']);
        console.log("All done baby !!!");
      }.bind(this)
    });
  }
});

module.exports = AdfabPlaygroundGenerator;
