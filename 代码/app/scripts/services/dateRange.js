/**
 * 汽车票日期表格的日期范围
 *  @return {Object}
 *  start 开始日期
 *  end 结束日期
 */

'use strict';

module.exports = [function() {
    var tempDate = new Date(),
        startDateUnix = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime(),
        endDateUnix = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 9).getTime();  //表示可选范围为10天之内的车票
    return {
        startDateUnix: startDateUnix,
        endDateUnix: endDateUnix
    }
}];


