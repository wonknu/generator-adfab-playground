'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var AdfabPlaygroundGenerator = yeoman.generators.Base.extend({
  promptUser: function() {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    var prompts = [
      {
        name: 'appName',
        message: 'What is your app\'s name ?'
      }
      // ,{
      //   type: 'confirm',
      //   name: 'addDemoSection',
      //   message: 'Would you like to generate a demo section ?',
      //   default: true
      // }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      // this.addDemoSection = props.addDemoSection;

      done();
    }.bind(this));
  },
  scaffoldFolders: function(){
    this.mkdir("assets");
    this.mkdir("assets/less");
    this.mkdir("assets/less/common");
    this.mkdir("assets/less/layouts");
    this.mkdir("assets/less/componants");
    this.mkdir("assets/less/bootstrap");
    // this.mkdir("build");
  },
  copyMainFiles: function(){
    this.copy("less/common/_vars.less",   "assets/less/common/vars.less");
    this.copy("less/common/_mixins.less", "assets/less/common/mixins.less");
    this.copy("less/common/_fonts.less",  "assets/less/common/fonts.less");
    this.copy("less/common/_common.less", "assets/less/common/common.less");
    this.copy("less/common/_header.less", "assets/less/common/header.less");
    this.copy("less/common/_footer.less", "assets/less/common/footer.less");
    this.copy("less/layouts/_page.less", "assets/less/layouts/page.less");
    this.copy("less/_main.less",          "assets/less/main.less");

    this.copy("_gruntfile.js", "Gruntfile.js");
    // this.copy("_bower.json", "bower.json");
    this.copy("._bowerrc", ".bowerrc");
    // this.copy("_package.json", "package.json");

    var context = {
      site_name: this.appName
    };

    this.template("_package.json", "package.json", context);
    this.template("_bower.json", "bower.json", context);
  },
  runNpm: function(){
    this.installDependencies({
      bower: true,
      npm: true,
      callback: function () {
        this.spawnCommand('grunt', ['first-build']);
        console.log("All done baby !!!");
      }.bind(this) // bind the callback to the parent scope
    });
  }
});

module.exports = AdfabPlaygroundGenerator;
