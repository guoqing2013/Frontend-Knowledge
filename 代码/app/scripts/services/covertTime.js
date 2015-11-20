/**
 *  @brief 转换字符换2014-08-28 17:00:00成日期或时间戳
 *  @description
 *  @method isValidTime 是否为字符串日期
 *  @method toDate 转换为时间
 *  @method toUnix 转换为时间戳
 *  @author 郭清
 */
'use strict';


function isValidTime(time) {
    if(typeof(time) == 'string' && time)return true;
}


//返回日期
function toDate(time) { //time 2014-08-28 17:00:00
    if(isValidTime(time)) {
        return new Date(time.replace(/-/g, '/')); //2014/08/28 17:00:00
    }
}

//返回时间戳
function toUnix(time) {
    if(isValidTime(time)) {
        return toDate(time).getTime(); //195658741000
    }
}

module.exports = [function() {
    return {
        toDate: toDate,
        toUnix: toUnix
    }
}];



