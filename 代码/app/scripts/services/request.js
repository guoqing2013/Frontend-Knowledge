'use strict';

module.exports = ['api', 'AJAX', 'loading',
    function (api, AJAX, loading) {
        var request = {
            getBusDepartures: function (success, error) {
                loading.show();
                
                AJAX({
                    url: api.query,
                    serviceName: 'getbusdepartures',
                    serviceParams: {
                        queryType: "all"
                    },
                    success: function (data) {
                        angular.isFunction(success) && success(data, true);
                    },
                    error: function (data) {
                        angular.isFunction(error) && error(data);
                    },
                    complete: function (data) {
                        loading.hide();
                    }
                });
            },
            getBusArrivalCitys: function (city, success, error, hideLoading) {
                !hideLoading && loading.show();
                AJAX({
                    url: api.query,
                    serviceName: 'getbusdestinations',
                    serviceParams: {
                        city: city
                    },
                    success: function (data, status, headers, config) {
                        angular.isFunction(success) && success(data);
                    },
                    error: function (data) {
                        angular.isFunction(error) && error(data);
                    },
                    complete: function () {
                        loading.hide();
                    }
                });
            }
        };
        return request;
    }
];