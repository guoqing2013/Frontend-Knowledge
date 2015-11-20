'use strict';




var app = angular.module('app', [
    require('angular-route'),
    require('angular-touch'),

    require('./libs/mobile-nav').name,
    require('./libs/ngStorage.min').name,

    require('./provider').name,
    require('./directives').name,
    require('./services').name,
    require('./filters').name,
    require('./controllers').name
])
.constant('version', '0.1')
.config(require('./on_config'))
.run(require('./on_run'))




