var controllers = angular.module('app.controllers', []);

controllers
    .controller('mainCtrl', require('./mainCtrl'))
    .controller('homeCtrl', require('./homeCtrl'))
    .controller('integralMallCtrl', require('./integralMallCtrl'))
    .controller('couponCtrl', require('./couponCtrl'))
    .controller('couponDetailCtrl', require('./couponDetailCtrl'))
;
module.exports = controllers;