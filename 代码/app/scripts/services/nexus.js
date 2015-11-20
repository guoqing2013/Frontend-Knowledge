/**
 * 数据枢纽,用于保持和交换数据
 */

'use strict';

module.exports = [
    function() {
        var persistentData = {};
        return {
            get: function(key, needClone) {
                var data = persistentData[key];
//                if (needClone) {
//                    return angular.copy(data);
//                } else {
//                   return data;
//                }
                return data;
            },
            set: function(key, data) {
                persistentData[key] = data;
            },
            reset: function(key) {
                persistentData[key] = null;
            },
            init: function() {
                persistentData = {}
            }

        }
    }
];
