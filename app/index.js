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
    },
    {
      name:     'dbName',
      message:  'What is your database name ?'
    },
    {
      name:     'userName',
      message:  'What is your database username ?',
      default:  'root'
    },
    {
      name:     'pwd',
      message:  'What is your database password ?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.themeName = props.themeName;
      this.dbName = props.dbName;
      this.userName = props.userName;
      this.pwd = props.pwd;
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
      "assets/scripts",
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
          theme_name: this.themeName,
          db_name: this.dbName,
          db_user: this.userName,
          db_pwd: this.pwd
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
    this.copy("._bowerrc", ".bowerrc");
    this.template("_gruntfile.js", "Gruntfile.js", context);

    // copy & fill with the right appName npm & bower json file
    this.template("_package.json", "package.json", context);
    this.template("_bower.json", "bower.json", context);

    // assetic config
    this.template("_assets.php", "assets.php", context);

    // database config
    this.template("_local.php", "../../../../config/autoload/local.php", context);

    // Javascript assets
    this.template("scripts/_app.js", "assets/scripts/app.js", context);
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
