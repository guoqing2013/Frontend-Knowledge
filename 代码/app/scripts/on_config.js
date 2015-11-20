'use strict';




module.exports = ['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        /**
         * ·������
         * */
        $routeProvider
            .when('/home', {
                templateUrl: 'partials/home.html',  //��ҳ
                controller: 'homeCtrl'
                //resolve: {isInApp: 'isInApp'},
                //navbar: {
                //    func: 'home',
                //    title: '����',
                //    canClose: 1
                //}
            })
            .when('/integralMall', {
                templateUrl: 'partials/integralMall.html',      //�����̳�
                controller: 'integralMallCtrl'
            })
            .when('/coupon', {
                templateUrl: 'partials/coupon.html',      //�Ż�ȯ
                controller: 'couponCtrl'
            })
            .when('/couponDetail', {
                templateUrl: 'partials/couponDetail.html',      //�Ż�ȯ����
                controller: 'couponDetailCtrl'
            })
            //.when('/register', {
            //    templateUrl: 'partials/register.html',      //ע��
            //    controller: 'registerCtrl'
            //})
            //.when('/personalCenter', {
            //    templateUrl: 'partials/personalCenter.html',      //�������ģ���Ա��
            //    controller: 'personalCenterCtrl'
            //})

            .otherwise({
                redirectTo: "/home"
            })
        ;






        /*
        * http����
        * */
        //By default, jQuery transmits data using Content-Type: x-www-form-urlencoded and the familiar foo=bar&baz=moe serialization. AngularJS, however, transmits data using Content-Type: application/json and { "foo": "bar", "baz": "moe" } JSON serialization, which unfortunately some Web server languages��notably PHP��do not unserialize natively
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for(name in obj) {
                value = obj[name];
                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];




    }
];
 
