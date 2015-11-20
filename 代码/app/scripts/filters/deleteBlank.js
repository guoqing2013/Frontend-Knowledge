/**
 * 删除空格
 * */
'use strict';

module.exports = [ function () {
    return function (str) {
        if(typeof(str) == 'string') {
            return str.replace(' ', '');
        }
    };
}];