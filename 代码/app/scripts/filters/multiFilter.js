/**
 *  多条件查询列车车次
 */

'use strict';

module.exports = [function() {
        return function (totalArray, filterObj, filterFunction) {
            var out = [];
            angular.isFunction(filterFunction) && angular.isObject(filterObj)?(
                angular.forEach(totalArray, function (item) {
                    var s = {};
                    for (var attr in filterObj) {
                        s[attr] = item[attr];
                    }
                    filterFunction(s, filterObj) && out.push(item);
                })
            ): (out = totalArray);
            return out;
        }
}]