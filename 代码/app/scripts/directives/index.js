var directives = angular.module('app.directives', []);


directives
    .directive('dateTable', require('./dateTable'))
    .directive('inputClear', require('./inputClear'))
    .directive('uiLoading', require('./uiLoading'))
    .directive('uiModal', require('./uiModal'))
    .directive('infiniteScroll', require('./infiniteScroll'))
    .directive('animatedBottom', require('./animatedBottom'))
    .directive('makeCall', require('./makeCall'))
    .directive('timeleft', require('./timeleft'))                    //剩余时间倒计时

module.exports = directives;