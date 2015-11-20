'use strict';

module.exports = [
    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var phoneNumber = parseInt(attrs.makeCall.replace('-', ''));
                    if(typeof phoneNumber == 'number') {
                        nativePlugin.makeCall("makeCallForCallTel", phoneNumber);
                    }
                });
            }
        }
    }
];
