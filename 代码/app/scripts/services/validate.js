/**
 *  验证脚本
 */

'use strict';

module.exports = [function() {
    return {
        isMobile: function(e) {  //是否是手机号码
            var t = /^(1[3-8][0-9])\d{8}$/;
//            /([+]?86)?(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}/
            return t.test(e);
        },
        isEmpty: function(value) { //是否为 NaN, undefined, null , 0 , '', false
            if(value){
                return false;
            }
            return true;
        },
        isEmptyObject: function (e) {  //是否为空对象，包括空数组
            for (var t in e) return!1;
            return!0
        }
    }
}];


