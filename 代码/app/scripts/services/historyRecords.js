'use strict';
/**
 * 存储历史记录
 * */


var historyRecords = function ($localStorage) {
    return {
        set: function (storeKey, storeValue, maxlength) {
            maxlength = maxlength ? maxlength : 5;
            if (!angular.isString(storeKey)) {
                console.warn('key mast be a string')
            }
            var historyRecords = $localStorage[storeKey];
            if (historyRecords) {
                if (angular.toJson(historyRecords).indexOf(  angular.toJson(storeValue) ) == -1) {
                    if (historyRecords.length >= maxlength) {
                        historyRecords.splice(historyRecords.length - 1, 1);
                    }
                    historyRecords.unshift(storeValue);
                    $localStorage[storeKey] = historyRecords;
                }
            } else {
                $localStorage[storeKey] = [storeValue];
            }
        },
        get: function (storeKey) {
            return $localStorage[storeKey];
        },
        remove: function (storeKey) {
            delete $localStorage[storeKey];
        }
    }
};

module.exports = ['$localStorage', historyRecords ];