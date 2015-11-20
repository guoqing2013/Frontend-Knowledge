var providers = angular.module('app.provider', []);

//Configuration blocks - get executed during the provider registrations and configuration phase. Only providers and constants can be injected into configuration blocks. This is to prevent accidental instantiation of services before they have been fully configured.

providers
    .provider('isInApp', function () {
        this.$get = ['$q', function ($q) {
            var deferred = $q.defer();
            //if (internal.isInApp) {
                deferred.resolve();
            //} else {
            //    deferred.reject({ needInApp: true });
            //}
            return deferred.promise;
        }];
    }
)
    .provider('isLoggedIn', function () {  //是否登陆
        this.$get = ['$q', 'authService', function ($q, authService) {
            var deferred = $q.defer();
            if (authService.isAuthenticated()) {
                deferred.resolve();
            } else {
                deferred.reject({ needsAuthentication: true });
            }
            return deferred.promise;
        }];
    }
);


module.exports = providers;