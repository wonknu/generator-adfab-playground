# generator-adfab-playground

> [Yeoman](http://yeoman.io) generator

## Dependencies

- [bower](http://bower.io/)
- [grunt](http://gruntjs.com/)
- [composer](https://getcomposer.org/)

## What this generator do ?

This generator will install default frontend assets for you inside a [playground](https://github.com/gregorybesson/playground) project.

Inside your theme in the assets folder you will have:

- some less files
```bash
// your main file to bbe compiled that import other less file
less/main.less
// your file to do stylesheet
less/common/vars.less
less/common/mixins.less
less/common/fonts.less
less/common/common.less
less/common/header.less
less/common/footer.less
less/layouts/page.less
// bootstrap override file
bootstrap/bootstrap.less
bootstrap/variables.less
```

- some js files
```bash
// main js file with angular module and a default controller
scripts/app.js
```
Also the body tag will have ng-app attribut on it

the generator will had bower to add:
- AngularJS (~1.2.21) & angular-bootstrap (~0.11.0) & angular-touch (~1.2.21)
- jQuery (1.*)
- bootstrap (3.*) & respond.js (for IE8 support)

a .bowerrc file will put those assets in the vendors folder

a GruntFile will help you to compile less file (as a package.json is executed with npm), just run:
```bash
grunt less
or
grunt (will watch for file change & compile)
```

Your local playground config file will be setup for your local environement
```bash
/config/autoload/local.php
```

The assets file used by assetic will include your compiled css file & angular (but your free to comment angular and use jQuery if you want to)
```bash
assets.php
```

a .gitignore file will hide node & bower dependencies

## Getting Started

```bash
npm install -g yo
```

### Adfab Yeoman Generators

clone https://github.com/wonknu/generator-adfab-playground.git

go to the clone folder and then

run:

```bash
npm link
```

it is just as adding an npm package globally (npm "blabla" -g), but this repo is on your computer

this wouldn't work yet :

```bash
npm install -g generator-adfab-playground
```

### Setup playground project

clone https://github.com/gregorybesson/playground

go to the clone folder and then inside /design/frontend/default/starter/ and initiate the generator:

```bash
yo adfab-playground
```
Yeoman will ask you some questions to setup your project:

```bash
? What is your app's name ? 
? What is your playground theme's name ? (starter)
? What is your database name ? 
? What is your database username ? 
? What is your database password ?
```
after it end you can then:

- create your mysql database
- go to the root folder of your playground
- run composer install
- run install.sh
- create your vhost and update your hosts file

More :

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).
