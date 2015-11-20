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
                    //$location.path('/').search({'departureCity': '����', arrivalCity: '����'}).replace();
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

        //��ȡ�û���Ϣ
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


        //Ԥ�Ȼ���ģ��
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }
        });

//                $rootScope.$on('$viewContentLoaded', function() { //���ģ�建��
//                    console.log($templateCache.info());
//                    $templateCache.removeAll();
//                });


        //��ת����½ҳ��
        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            if (rejection && rejection.needsAuthentication === true) {
                $location.path('/').replace();
            }

            if (rejection && rejection.needInApp === true) {
                $location.path('/error').replace();
                (function () {
                    var _log = console.log;
                    _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color: red;')
                })('Copyright 2002-2014��Ȩ����ͬ������Ƽ��ɷ����޹�˾ \n\nFront-End Web Developer: ���� gq6574@LY.com  ���� hr09288@LY.com');

            }
        });


        //ҳ���л��ɹ���Ĳ���
        $rootScope.$on("$pageNaved", function (event, next, last) {
            //����ҳ�����
            //var navbar = next.$$route['navbar'],
            //if (angular.isObject(navbar)) {
            //  nativePlugin.setNavibar(navbar.func, navbar.title, navbar.canClose, navbar.subtitle, navbar.hasMenu, navbar.rightmenuTitle, navbar.callbackEvent);
            //}


            try {
               /* var controller = next.$$route.controller;
                //����ҳʱ�����ʷ��¼
                if (controller === 'homeCtrl') {
                    $navigate.eraseHistory();
                }


                //����ҳ����ת
                switch (controller) {
                    case 'orderPayCtrl':
                        $navigate.modifyHistory(['busTrainListCtrl', 'fillInOrderCtrl', 'busOrderDetailCtrl', 'payFailCtrl', 'orderPayCtrl']);   //���붩��֧��ҳ�����ʷ��¼���Ƴ�����Ҫ��ҳ��
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