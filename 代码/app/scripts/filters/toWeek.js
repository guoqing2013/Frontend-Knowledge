/**
 * 通过日期获取星期
 */

'use strict';

module.exports = [function () {
    return function (weekStr, dateStr) {
        if(!dateStr) return;
        var dd = new Date(),
            selectedDd = new Date(dateStr.replace(/-/g, '/'));
        var getDateDiff = function () {
            var today = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate()),
                selectedDay = new Date(selectedDd.getFullYear(), selectedDd.getMonth(), selectedDd.getDate());
            var num = (selectedDay - today)/86400000;
            switch (num) {
                case 0:
                    return '今天';
                case 1:
                    return '明天';
                case 2:
                    return '后天';
                default:
                    return false;
            }
        };

        //转换为星期
        var convertDay = function (num) {
            var weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            return weekList[num] || "";
        };
        var week = (getDateDiff() || convertDay(selectedDd.getDay()));
        return week;
    };
}];