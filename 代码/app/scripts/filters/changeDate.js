/**
 * 汽车票日期表格的日期范围
 * */
'use strict';

module.exports = ['dateRange', 'checkTime', function (dateRange, checkTime) {



    return function (dateStr, action) {
//        date = '2014-10-02';
        var date = new Date(dateStr.replace(/-/g, '/'));
        var num = 1;
        if(action == 'minus') {
            num = -1;
        } else if(action == 'plus') {
            num = 1;
        }
        var finallyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + num);
        var finallyDateStr = finallyDate.getFullYear() + '-' + checkTime(finallyDate.getMonth() + 1) + '-' + checkTime(finallyDate.getDate());
        if(finallyDate.getTime() >= dateRange.startDateUnix && finallyDate.getTime() <= dateRange.endDateUnix) {
            return finallyDateStr;
        } else {
            return dateStr;
        }
    };
}];