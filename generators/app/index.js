'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var askName = require('inquirer-npm-name');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Your project name'
        }, function (answers) {
            this.props = this.props || {};
            this.props.name = answers.name;
            done();
        }.bind(this));
        // Have Yeoman greet the user.
        //this.log(yosay(
        //  'Welcome to the incredible ' + chalk.red('generator-amap-web-cms') + ' generator!'
        //));
        //
        //var prompts = [{
        //  type: 'confirm',
        //  name: 'someOption',
        //  message: 'Would you like to enable this option?',
        //  default: true
        //}];
        //
        //this.prompt(prompts, function (props) {
        //  this.props = props;
        //  // To access props later use this.props.someOption;
        //
        //  done();
        //}.bind(this));
    },
    default: function () {
        if (path.basename(this.destinationPath()) !== this.props.name) {
            this.log(
                'Your application must be inside a folder named ' + this.props.name + '\n' +
                'I\'ll automatically create this folder.'
            );
            mkdirp(this.props.name);
            this.destinationRoot(this.destinationPath(this.props.name));
        }
    },
    writing: function () {
        this.fs.copy(
            this.templatePath('./**/.*'),
            this.destinationPath('./')
        );
        this.fs.copy(
            this.templatePath('./**/*'),
            this.destinationPath('./')
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            {name: this.props.name}
        );
    },

    install: function () {
        //this.installDependencies();
    }
});
