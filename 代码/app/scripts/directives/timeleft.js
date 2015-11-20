'use strict';
module.exports = [ '$timeout', 'checkTime',
    function($timeout, checkTime) {
        return {
            restrict: 'E',
            template: '<span class="color-golden-yellow">{{timeleft.minute}}</span>分<span class="color-golden-yellow">{{timeleft.second}}</span>秒',
            scope: {
                millisecond: "="
            },
            link: function(scope, element) {
                var timeoutId, minute, second, newLeftMillisecond;
                var millisecond = parseInt(scope.millisecond);
                millisecond = (millisecond < 0 ? 0 : millisecond);
                function updateLater(leftMillisecond) {
                    minute = parseInt(leftMillisecond / 1000 / 60 % 60, 10); //计算剩余的分钟数
                    second = parseInt(leftMillisecond / 1000 % 60, 10);//计算剩余的秒数
                    scope.timeleft = {
                        minute: checkTime(minute),
                        second: checkTime(second)
                    };
                    if(leftMillisecond <= 0) {
                        $timeout.cancel(timeoutId);
                        scope.millisecond = 0;
                        return;
                    }
                    // save the timeoutId for canceling
                    timeoutId = $timeout(function() {
                        newLeftMillisecond = leftMillisecond - 1000;
                        updateLater(newLeftMillisecond);
                    }, 1000);
                }

                element.bind('$destroy', function() {
                    $timeout.cancel(timeoutId);
                });

                updateLater(millisecond);

            }
        }
    }
];

/*
module.exports = [ '$timeout', 'checkTime',
    function($timeout, checkTime) {
        return {
            restrict: 'E',
            template: '<span class="color-golden-yellow">{{timeleft.day}}</span>天<span class="color-golden-yellow">{{timeleft.hour}}</span>时<span class="color-golden-yellow">{{timeleft.minute}}</span>分<span class="color-golden-yellow">{{timeleft.second}}</span>秒',
            scope: {
                millisecond: "="
            },
            link: function(scope, element) {
                var timeoutId, minute, second, newLeftMillisecond;
                var millisecond = parseInt(scope.millisecond);
                millisecond = (millisecond < 0 ? 0 : millisecond);

                var day, hour;

                function updateLater(leftMillisecond) {

                    day = parseInt(leftMillisecond / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
                    hour = parseInt(leftMillisecond / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数


                    minute = parseInt(leftMillisecond / 1000 / 60 % 60, 10); //计算剩余的分钟数
                    second = parseInt(leftMillisecond / 1000 % 60, 10);//计算剩余的秒数
                    scope.timeleft = {
                        minute: checkTime(minute),
                        second: checkTime(second),
                        day: day,
                        hour: hour
                    };
                    if(leftMillisecond <= 0) {
                        $timeout.cancel(timeoutId);
                        scope.millisecond = 0;
                        return;
                    }
                    // save the timeoutId for canceling
                    timeoutId = $timeout(function() {
                        newLeftMillisecond = leftMillisecond - 1000;
                        updateLater(newLeftMillisecond);
                    }, 1000);
                }

                element.bind('$destroy', function() {
                    $timeout.cancel(timeoutId);
                });

                updateLater(millisecond);

            }
        }
    }
];
 */
