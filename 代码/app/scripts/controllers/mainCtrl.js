'use strict';


module.exports = ['$rootScope', '$scope', '$window', '$timeout', '$localStorage', 'nav', '$navigate',
    function ($rootScope, $scope, $window, $timeout, $localStorage, nav, $navigate) {

        // 切换页面
        $scope.slidePage = function (path, animate, reverse) {
            nav.slidePage(path, animate, reverse);
        };

        //后退
        $scope.back = function () {
            nav.back();
        };




    }
];