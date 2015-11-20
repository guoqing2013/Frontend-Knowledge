var filters = angular.module('app.filters', []);


filters
    .filter('toTimeDivision', require('./toTimeDivision'))  //将 2014-08-28 17:00:00 转换为 17:00
    .filter('changeDate', require('./changeDate'))  //日期加1或减1
    .filter('toWeek', require('./toWeek'))  //通过日期获得星期
    .filter('deleteBlank', require('./deleteBlank'))  //删除空格
    .filter('multiFilter', require('./multiFilter'))


module.exports = filters;