/**
 *  @brief 获取服务器时间
 *  @description
 *  @method request 获取服务器时间请求
 *  @method getDate 获取当前时间
 *  @method getUnix 获取当前时间戳
 *  @author 郭清
 */

'use strict';

function getServerDate(AJAX, api) {
    var SERVERDATE;
    var request = function () {
        AJAX({
            url: api.order,
            serviceName: 'getserverdate',
            success: function (data) {
                var rspCode = data.response.header.rspCode;
                if (rspCode == '0000') {
                    var serverTimeStr = data.response.body.serverTime;
                    SERVERDATE = {server:new Date(Date.parse(serverTimeStr.replace(/-/g,'/'))),local: new Date()};
                }
            }
        });
    };
    var isExist = function() {
        if (typeof SERVERDATE == "undefined" || !SERVERDATE.server) {
            return false;
        }
        return true;
    };
    var getDate = function() {
        var currentTime;
        if (isExist()) {
            currentTime = new Date(new Date().getTime() + (SERVERDATE.server - SERVERDATE.local)); //服务器时间
        } else {
            currentTime = new Date(); //当前时间
        }
        return currentTime;
    };

    var getUnix = function () {
        return getDate().getTime();
    };

    return {
        request: request,
        isExist: isExist,
        getDate: getDate,
        getUnix: getUnix
    };
}

module.exports = ['AJAX', 'api', getServerDate];


