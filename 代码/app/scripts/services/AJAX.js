'use strict';

module.exports = ['$q', '$http',
    function ($q, $http) {

        var getData = function (httpParams) {
            var data, headerReqdata;
            try{
                data = nativePlugin.getServiceRequest(httpParams.serviceName, httpParams.serviceParams);
                headerReqdata = nativePlugin.encodeRequest(data);
            }catch(e){}


            var defer = $q.defer();

            var newHttpParams = {
                method: 'POST',
                url: httpParams.url,
                cache:  httpParams.cache || false,
                timeout: httpParams.timeout || defer.promise || 15000 ,
                success: httpParams.success || angular.noop,
                error: httpParams.error || angular.noop,
                complete: httpParams.complete || angular.noop,
                data: data,
                headers: {
                    reqdata: headerReqdata
                }
            };




            var request = $http(newHttpParams);  //requrest为一个defer.promise
            var promise = request.success(
                httpParams.success
            ).error(
                httpParams.error
            );

            promise.abort = function () {
                defer.resolve();
            };

            promise.
                finally(
                    httpParams.complete
                )
                .finally(
                    function () {
                        promise.abort = angular.noop;
                        defer = request = promise = null;
//                        loading.hide();
                    }
                );
            return promise;
        };

        return getData;
    }
];


