var services = angular.module('app.services', []);



services
    //.factory('api', require('./api'))                             //后台接口地址
    .factory('authService', require('./authService'))             //判断用户是否登陆
    .factory('authService', require('./authService'))             //判断用户是否登陆
    .factory('nav', require('./nav'))                             //页面导航
    .service('historyRecords', require('./historyRecords'))       //历史记录
    .factory('nexus', require('./nexus'))                         //存储scope中的数据
    .service('loading', require('./loading'))                     //正在加载提示框
    .service('dateRange', require('./dateRange'))                 //汽车票日期表格的日期范围
    .service('validate', require('./validate'))                   //手机号等验证
   .service('anchorSmoothScroll', require('./anchorSmoothScroll'))
    .factory('AJAX', require('./AJAX'))                           //AJAX
    //.factory('SERVERDATE', require('./SERVERDATE'))              //获取服务器时间
    .factory('covertTime', require('./covertTime'))              //转换时间
    .factory('checkTime', require('./checkTime'))              //转换时间
    //.factory('request', require('./request'))
    .factory('httpCacheData', require('./httpCacheData'))
    .factory('selectChecked', require('./selectChecked'));


module.exports = services;