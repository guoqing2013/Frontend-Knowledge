'use strict';
/**
 * 存储请求数据
 * */


var httpCacheData = function ($cacheFactory) {
    return $cacheFactory('httpCacheData');
};

module.exports = ['$cacheFactory', httpCacheData];