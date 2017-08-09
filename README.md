# mastoriApp

Uses theme (added in drive): http://themeforest.net/item/material-design-admin-with-angularjs/13582227?utm_campaign=sysemail&utm_content=712366&utm_keyword=sysemail&utm_medium=email&utm_source=item_update&utm_term=sysemail


## Requirements
* Install [Node.js] (https://nodejs.org/)

## Installation

Install gulp globally
   `npm install gulp -g`

Install node & bower packages

    `npm install`
    `bower install`

## Build & development

Update your config/development.json
Run `gulp build` for building and `gulp serve` for preview.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Testing

Running `gulp test` will run the unit tests with karma.

## Problematic package versions

  "angular-google-maps": "2.3.2", resolve [angular-google-maps issue #1853](https://github.com/angular-ui/angular-google-maps/issues/1853)

  "lodash":"3.X" resolve [angular-google-maps issue #1822](https://github.com/angular-ui/angular-google-maps/issues/1822)