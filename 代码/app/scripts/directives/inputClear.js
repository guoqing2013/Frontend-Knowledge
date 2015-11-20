'use strict';

module.exports = [ '$timeout',
    function($timeout) {
        return {
            restrict: 'E',
            template: '<div class="searchbar"> \n\
                        <input data-ng-disabled="disabledInput" type="{{input.type}}" class="long-input" placeholder="{{input.placeholder}}" data-ng-model="search" maxlength="{{input.maxlength}}" />\n\
                        <a href="javascript:;" class="searchbar-clear" data-ng-click="clear()"></a>\n\
                      </div>',
            replace: true,
            scope: {
                input: "=",
                search: "=",
                clear :"&"
            },
            link: function(scope, element) {
                scope.disabledInput = true;
                $timeout(function() {
                    scope.disabledInput = false;
                }, 700);
                var $searchbarClear = element.find('a');
                scope.$watch('search', function (newValue, oldValue) {
                    if( newValue == undefined) return;
                    if((!oldValue  && newValue.length>0) || (newValue.length == oldValue.length)) {
                        $searchbarClear.addClass('searchbar-not-empty');
                    }
                    if(!newValue) {
                        $searchbarClear.removeClass('searchbar-not-empty');
                    }
                });

            }
        }
    }
];
