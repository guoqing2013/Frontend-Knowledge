module.exports = [ function () {
        return {
            link: function (scope, element, attrs) {
                var startY = 0,
                    endY  = 0;
                element.bind('touchstart', function (evt) {
                    if (evt.targetTouches.length == 1) startY = evt.targetTouches[0].pageY;
                });

                element.bind('touchmove', function (evt) {
                    if (evt.targetTouches.length == 1) { endY = evt.targetTouches[0].pageY;}
                    var move = Math.round(endY - startY);  //移动的距离
                    if(move > 0) {
                        scope.$apply(function() {
                            scope.animatedBottom = 'show-bottom';
                        });
                    } else {
                        scope.$apply(function() {
                            scope.animatedBottom = 'hide-bottom';
                        });
                    }
                });

                element.bind('touchend', function () {
                     startY = 0;
                     endY  = 0;
                });

                scope.$on('$destroy', function () {
                    element.unbind('touchstart');
                    element.unbind('touchmove');
                    element.unbind('touchend');
                });
            }
        };
    }];