'use strict';

module.exports = ['$rootScope', '$window', '$route', '$http', '$templateCache', '$location', '$navigate', '$timeout', '$localStorage',
    function ($rootScope, $window, $route, $http, $templateCache, $location, $navigate, $timeout, $localStorage) {
       /* loadPage();
        function loadPage() {
            var page;
            try {
                page = JSON.parse(H5NaviPlugin.getCurrentPage());
            } catch (e) {
                page = {currentPage: 0};
            }

            switch (page.currentPage) {
                case 0:
                    //$location.path('/').search({'departureCity': '苏州', arrivalCity: '杭州'}).replace();
                    $location.path('/').replace();
                    break;
                case 1:
                    $location.path('/busOrderList').replace();
                    break;
                default:
            }
        }*/

        $rootScope.isLoggedIn = 0;
        $window.notifyLoginStatus = function (isLoggedIn) {
            $rootScope.isLoggedIn = parseInt(isLoggedIn);
        };

        //获取用户信息
        (function () {
            try {
                var userInfoStr = H5UserPlugin.getUserInfo();
                var params = JSON.parse(userInfoStr);
                if (params.state == 1) {
                    $rootScope.isLoggedIn = 1;
                    $localStorage.userInfo = {
                        memberId: params.memberId,
                        username: params.username,
                        truename: params.truename,
                        usermobile: params.usermobile
                    };
                } else {
                    $rootScope.isLoggedIn = 0;
                }
            } catch (e) {
            }
        })();


        //预先缓存模版
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }
        });

//                $rootScope.$on('$viewContentLoaded', function() { //清除模板缓存
//                    console.log($templateCache.info());
//                    $templateCache.removeAll();
//                });


        //跳转到登陆页面
        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            if (rejection && rejection.needsAuthentication === true) {
                $location.path('/').replace();
            }

            if (rejection && rejection.needInApp === true) {
                $location.path('/error').replace();
                (function () {
                    var _log = console.log;
                    _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color: red;')
                })('Copyright 2002-2014版权所有同程网络科技股份有限公司 \n\nFront-End Web Developer: 郭清 gq6574@LY.com  黄仁 hr09288@LY.com');

            }
        });


        //页面切换成功后的操作
        $rootScope.$on("$pageNaved", function (event, next, last) {
            //控制页面标题
            //var navbar = next.$$route['navbar'],
            //if (angular.isObject(navbar)) {
            //  nativePlugin.setNavibar(navbar.func, navbar.title, navbar.canClose, navbar.subtitle, navbar.hasMenu, navbar.rightmenuTitle, navbar.callbackEvent);
            //}


            try {
               /* var controller = next.$$route.controller;
                //回首页时清空历史记录
                if (controller === 'homeCtrl') {
                    $navigate.eraseHistory();
                }


                //控制页面跳转
                switch (controller) {
                    case 'orderPayCtrl':
                        $navigate.modifyHistory(['busTrainListCtrl', 'fillInOrderCtrl', 'busOrderDetailCtrl', 'payFailCtrl', 'orderPayCtrl']);   //进入订单支付页面从历史记录中移除不需要的页面
                        break;
                }*/
            } catch(e) {}
        });



        ////Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
        ////bind in induvidual controllers.
        //$rootScope.$on('$locationChangeSuccess', function() {
        //    $rootScope.actualLocation = $location.path();
        //});
        //
        //$rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        //    if($rootScope.actualLocation === newLocation) {
        //        alert('Why did you use history back?');
        //    }
        //});

    }
];