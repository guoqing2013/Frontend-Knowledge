'use strict';

module.exports = [function () {
    return function (time) {
        if(time && time.length > 0) {
//            var date = new Date(time.replace(/-/g, '/'));
            var timeArr = time.split(':')
            return timeArr[1] + ":" + timeArr[2];
        }
    };
}];