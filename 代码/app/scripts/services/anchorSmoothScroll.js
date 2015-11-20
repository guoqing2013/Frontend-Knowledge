'use strict';


var anchorSmoothScroll = function ($timeout) {

    this.scrollTo = function (eID, scrollArea) {

        var startY = scrollArea.scrollTop,
              stopY = document.getElementById(eID).offsetTop - 46,
              maxStopY = scrollArea.scrollHeight - getHeight(scrollArea),
              distance = 0;

        if (stopY > maxStopY) stopY = maxStopY;
        if (stopY < 0) stopY = 0;
        distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance == 0) return;

        var s = 80, ss = 20;
        if (distance < 200) {
            s = 5;
            ss = 20;
        }
        var speed = Math.round(distance / s);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / ss);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                (function (closureY) {
                    $timeout(function () {
                        scrollArea.scrollTop = closureY;
                    }, timer * speed);
                }(leapY));

                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            (function (closureY) {
                $timeout(function () {
                    scrollArea.scrollTop = closureY;
                }, timer * speed);
            }(leapY));

            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        function getHeight(ele){
            return parseInt(ele.currentStyle? ele.currentStyle : window.getComputedStyle(ele, null).height) || 0;
        }

    }
}

module.exports = ['$timeout', anchorSmoothScroll];