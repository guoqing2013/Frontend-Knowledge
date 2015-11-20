'use strict';

module.exports = [ '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'partials/loading.html',
            scope: {
                loadingText: "=",
                showLoading: '='
            },
            link: function(scope) {
                scope.closeLoading =  function() {
                    $rootScope.showLoading = false;
                };
            }
        }
    }
];
