(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';




var app = angular.module('app', [
    require('angular-route'),
    require('angular-touch'),

    require('./libs/mobile-nav').name,
    require('./libs/ngStorage.min').name,

    require('./provider').name,
    require('./directives').name,
    require('./services').name,
    require('./filters').name,
    require('./controllers').name
])
.constant('version', '0.1')
.config(require('./on_config'))
.run(require('./on_run'))





},{"./controllers":5,"./directives":10,"./filters":19,"./libs/mobile-nav":23,"./libs/ngStorage.min":24,"./on_config":26,"./on_run":27,"./provider":28,"./services":37,"angular-route":44,"angular-touch":46}],2:[function(require,module,exports){
'use strict';
module.exports = ['$scope', '$timeout', '$sessionStorage', 'nexus', 'nav', 'loading', 'AJAX', 'dateRange', 'authService', 'selectChecked',
    function ($scope, $timeout, $sessionStorage, nexus, nav, loading, AJAX, dateRange, authService,  selectChecked) {

    }
];

},{}],3:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],4:[function(require,module,exports){
'use strict';
module.exports = ['$scope',
    function ($scope) {

        
        var $this = this;


        function slideBanner2() {
            var TouchSlide = require('../modules/TouchSlide.1.1');
            TouchSlide({
                slideCell: "#slideBox",
                titCell: "#btnContainer ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell: "#picContainer ul",
                effect:"leftLoop",
                delayTime: 1000,  //毫秒；切换效果持续时间（执行一次效果用多少毫秒）。
                interTime: 5000, //毫秒；自动运行间隔（隔多少毫秒后执行下一个效果）
                autoPlay:true,//自动播放
                autoPage:true //自动分页
            });

        }






        var showBanner = function (advs) {
            var htmlStr = '';
            for (var i = 0, len = advs.length; i < len; i++) {
                htmlStr +=
                    (
                        '<li><a class="pic"><img class="advPic" src="{{imageUrl}}"  onerror=\"this.src=\'\'\"  /></a></li>'
                            .replace('{{imageName}}', advs[i].imageName).replace('{{redirectUrl}}', advs[i].redirectUrl).replace('{{imageUrl}}', advs[i].imageUrl)
                    );
            }
            document.getElementById('advBox').innerHTML = htmlStr;
            if (advs.length > 1) {
                var TouchSlide = require('../modules/TouchSlide.1.1');
                TouchSlide({
                    slideCell: "#slideBox",
                    titCell: "#btnContainer ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                    mainCell: "#picContainer ul",
                    effect: "leftLoop",
                    interTime: 3000,
                    autoPage: true,//自动分页
                    autoPlay: true //自动播放
                });
            }
        };





        var advRequest;
        function slideBanner() {
            var picContainer = document.getElementById('picContainer');
            //if (!$this.advs) {
            getBusadvpicture();
            //} else {
            //    picContainer.style.height = $this.bannerHeight;
            //    showBanner($this.advs)
            //}

            function getBusadvpicture() {
                var data = {
                    "response": {
                        "header": {
                            "rspType": "0",
                            "rspCode": "0000",
                            "rspDesc": "查询成功"
                        },
                        "body": {
                            "advertismentList": [{
                                "noticeUrlType": "1",
                                "redirectUrl": "http://img1.40017.cn/touch/newproject/traffic/html/nationalDay_2.html",
                                "imageName": "租车立减66元活动",
                                "imageUrl": "http://img1.40017.cn/touch/newproject/traffic/img/i6_66banner_large_ios.png",
                                "tag": "v761v770v"
                            },
                                {
                                    "noticeUrlType": "1",
                                    "redirectUrl": "http://img1.40017.cn/touch/newproject/traffic/html/zuche.html",
                                    "imageName": "自驾租车11元疯秒",
                                    "imageUrl": "http://guoqing2013.free3v.net/markdown/a_700_16_0_141107102832_large.png",
                                    "tag": "v751v1716v"
                                }
                                ,
                                {
                                    "noticeUrlType": "1",
                                    "redirectUrl": "http://img1.40017.cn/touch/newproject/traffic/html/BanJia.html",
                                    "imageName": "同程接送机 11.11半价疯抢",
                                    "imageUrl": "http://guoqing2013.free3v.net/markdown/a_700_16_0_141107181416_large.png",
                                    "tag": "v751v1788v"
                                }

                            ]
                        }
                    }
                }
                var rspCode = data.response.header.rspCode;
                if (rspCode == '0000') {
                    $this.advs = data.response.body.advertismentList;
                    var newImg = new Image();
                    newImg.src = $this.advs[0].imageUrl;
                    newImg.onload = function () {
                        var actualHeight = Math.round(picContainer.offsetWidth * newImg.height / newImg.width);
                        picContainer.classList.add('ani-banner');
                        $this.bannerHeight = picContainer.style.height = actualHeight + 'px';
                        showBanner($this.advs)
                    };
                    newImg.onerror = function () {
                        $this.bannerHeight = picContainer.style.height = 'inherit';
                        showBanner($this.advs)
                    };
                }


            }
        }



        //the ready event of the DOM is triggered after Angular loads the view
        $scope.$on('$viewContentLoaded', function () {
            slideBanner2();
        });



        //resolve the promise when scope destroy
        $scope.$on('$destroy', function () {
            if(angular.isObject(advRequest)) {
                advRequest.abort();
            }

            //delete $location.$$search.departureCity;
            //delete $location.$$search.arrivalCity;
            //删除url的params
            //$location.$$search = {};
        });





        return $scope.homeCtrl = $this;














    }
];

},{"../modules/TouchSlide.1.1":25}],5:[function(require,module,exports){
var controllers = angular.module('app.controllers', []);

controllers
    .controller('mainCtrl', require('./mainCtrl'))
    .controller('homeCtrl', require('./homeCtrl'))
    .controller('integralMallCtrl', require('./integralMallCtrl'))
    .controller('couponCtrl', require('./couponCtrl'))
    .controller('couponDetailCtrl', require('./couponDetailCtrl'))
;
module.exports = controllers;
},{"./couponCtrl":2,"./couponDetailCtrl":3,"./homeCtrl":4,"./integralMallCtrl":6,"./mainCtrl":7}],6:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],7:[function(require,module,exports){
'use strict';


module.exports = ['$rootScope', '$scope', '$window', '$timeout', '$localStorage', 'nav', '$navigate',
    function ($rootScope, $scope, $window, $timeout, $localStorage, nav, $navigate) {

        // 切换页面
        $scope.slidePage = function (path, animate, reverse) {
            nav.slidePage(path, animate, reverse);
        };

        //后退
        $scope.back = function () {
            nav.back();
        };




    }
];
},{}],8:[function(require,module,exports){
module.exports = [ function () {
        return {
            link: function (scope, element, attrs) {
                var startY = 0,
                    endY  = 0;
                element.bind('touchstart', function (evt) {
                    if (evt.targetTouches.length == 1) startY = evt.targetTouches[0].pageY;
                });

                element.bind('touchmove', function (evt) {
                    if (evt.targetTouches.length == 1) { endY = evt.targetTouches[0].pageY;}
                    var move = Math.round(endY - startY);  //移动的距离
                    if(move > 0) {
                        scope.$apply(function() {
                            scope.animatedBottom = 'show-bottom';
                        });
                    } else {
                        scope.$apply(function() {
                            scope.animatedBottom = 'hide-bottom';
                        });
                    }
                });

                element.bind('touchend', function () {
                     startY = 0;
                     endY  = 0;
                });

                scope.$on('$destroy', function () {
                    element.unbind('touchstart');
                    element.unbind('touchmove');
                    element.unbind('touchend');
                });
            }
        };
    }];
},{}],9:[function(require,module,exports){
'use strict';

module.exports = [
    function() {
        return {
            restrict: 'E',
            scope: {
                calendar: "="
            },
            link: function (scope, element, attrs, controller) {
                var daySpan = attrs.daySpan, DATE = attrs.date, ngClick = attrs.ngClick, ele = element[0];
                daySpan && (daySpan = parseInt(daySpan));
                (scope.calendar = new Calendar(ele)).setSelected(DATE);
                //init date for box wrap
                function Calendar(wrap) {
                    this.setSelected = function (date) {
                        if (!date) return false;
                        var ele = angular.element(document.querySelector('td[data-value="' + date + '"]'));
                        if (!ele.hasClass('abled')) return false;
                        ele.hasClass('abled') && angular.element(document.querySelector('td.selected')).removeClass('selected') && ele.addClass('selected')
                        && (wrap.dataset.dateLabel = date) && (wrap.dataset.dateLabel = (ele.hasClass('day-label') ? ele.children()[0].innerHTML : false) || ('周' + dayInWeek[new Date(date).getDay()]));
                        return true;
                    }
                    //初始化
                    var now = new Date(), today = [now.getFullYear(), now.getMonth() + 1, now.getDate()],
                          calendarTmp = '<div  data-year-month = "{{year}}-{{month}}" class="text-center color-black"><p class="em1d2">{{year}}年{{showMonth}}月</p><table><thead><tr>{{titleArr}}</tr></thead><tbody>{{dataArr}}</tbody></table>',
                          dayInWeek = ["日", "一", "二", "三", "四", "五", "六"]

                    fillMonthDataHtml(today[0], today[1] - 1);


                    //获取当前月份所在天数
                    function getDaysInMonth(year, month) {
                        return new Date(year, month + 1, 0).getDate();
                    }

                    function isToday(value) {
                        var valueAttr = value.split('-');
                        return today[0] == valueAttr[0] && today[1] == valueAttr[1] && today[2] == valueAttr[2];
                    }
                    //初始化日历控件表格  @@month  @@year  start
                    function fillMonthDataHtml(year, month) {
                        var date = new Date(year, month),
                              year = date.getFullYear(),
                              month = date.getMonth(),
                              firstDate = new Date(year, month), 			//月份第一天
                              firstDateDay = firstDate.getDay(),	  		//起始礼拜 0-6
                              monthDays = getDaysInMonth(year, month),	//月份天数
                              //yearMonthValue = year + '-' + (month + 1) + '-',
                              yearMonthValue = year + '-' + ((month + 1) < 10 ? '0' + (month + 1) : (month + 1)) + '-',
                              value = '',
                              showValue = '',
                              disabled = true,
                              firstAableDay = today[2];

                        //如果是下个月
                        (month >= today[1] || year > today[0]) && (firstAableDay = 1) && (disabled = false);
                        //填充数据格
                        var dataHtml = "", itemCount = Math.ceil((firstDateDay + monthDays) / 7) * 7, todayI = -1, nextMonthCount = daySpan, className = '';
                        for (var i = 0; i < itemCount; i++) {

                            var isRowCell0 = (i % 6 == 0), //行起始
                                 isRowCell6 = (i % 7 == 6); //行结束
                             (i % 7 == 0) && (dataHtml += '<tr>');
                             


                            if (i < firstDateDay || i >= (monthDays + firstDateDay)) {
                                dataHtml += '<td></td>';
                            } else {
                                //value = yearMonthValue + (i - firstDateDay + 1), showValue = i - firstDateDay + 1, className = '';
                                value = yearMonthValue + ((i - firstDateDay + 1) < 10 ? '0' + (i - firstDateDay + 1) : (i - firstDateDay + 1)), showValue = i - firstDateDay + 1, className = '';
                                //如果是当月
                                if ( (month + 1) == today[1] ) {
                                    //如果是今天， 显示今天， 不禁止
                                    if (disabled && todayI == -1 && isToday(value)) {
                                        todayI = i;
                                        showValue = '今天';
                                        disabled = false;
                                        className = 'today day-label'
                                    }
                                    //如果是明后天
                                    if (todayI && i <= (todayI + 2)) {
                                        i == (todayI + 1) && (showValue = '明天') && (className = 'tomorrow day-label');
                                        i == (todayI + 2) && (showValue = '后天') && (className = 'day-after-tomorrow day-label');
                                    }
                                    //如果存在有效天数
                                    daySpan && !disabled && (i - todayI) >= daySpan && (disabled = true);

                                }
                                //如果是下月
                                else {
                                    (--nextMonthCount < 0) && (disabled = true);
                                }

                                className += disabled ? ' disabled' : ' abled';
                                value == DATE && !disabled && (className += ' selected');

                                dataHtml +=
                                    ('<td data-value ="{{data-date}}" class="' + className + '"><span class = "box">{{date}}</span></td>')
                                        .replace(/{{data-date}}/, value)
                                        .replace(/{{date}}/, showValue);
                            }
                            (i % 7 == 6) && (dataHtml += '</tr>')

                        }

                        wrap.innerHTML += calendarTmp
                                            .replace(/{{year}}/g, year)
                                           .replace(/{{month}}/g, month)
                                           .replace(/{{showMonth}}/g, month + 1)
                                           .replace(/{{titleArr}}/g, dayInWeek.map(function (day) { return '<th>' + day + '</th>'; }).join(''))
                                           .replace(/{{dataArr}}/g, dataHtml);

                        //如果存在在有效天数
                        if (daySpan && (firstAableDay + daySpan - 1) > monthDays) {
                            daySpan -= (monthDays - firstAableDay + 1);
                            fillMonthDataHtml(year, month + 1);
                        }

                    }
                    //初始化日历控件表格  @@month  @@year  end
                }

            }
        }
    }
];
},{}],10:[function(require,module,exports){
var directives = angular.module('app.directives', []);


directives
    .directive('dateTable', require('./dateTable'))
    .directive('inputClear', require('./inputClear'))
    .directive('uiLoading', require('./uiLoading'))
    .directive('uiModal', require('./uiModal'))
    .directive('infiniteScroll', require('./infiniteScroll'))
    .directive('animatedBottom', require('./animatedBottom'))
    .directive('makeCall', require('./makeCall'))
    .directive('timeleft', require('./timeleft'))                    //剩余时间倒计时

module.exports = directives;
},{"./animatedBottom":8,"./dateTable":9,"./infiniteScroll":11,"./inputClear":12,"./makeCall":13,"./timeleft":14,"./uiLoading":15,"./uiModal":16}],11:[function(require,module,exports){
module.exports = [function () {
        return {
            link: function (scope, element, attrs) {
                var offset = parseInt(attrs.threshold) || 0;
                var e = element[0];
                element.bind('scroll', function () {
                    if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
                        scope.$apply(attrs.infiniteScroll);
                    }
                });
            }
        };
    }];
},{}],12:[function(require,module,exports){
'use strict';

module.exports = [ '$timeout',
    function($timeout) {
        return {
            restrict: 'E',
            template: '<div class="searchbar"> \n\
                        <input data-ng-disabled="disabledInput" type="{{input.type}}" class="long-input" placeholder="{{input.placeholder}}" data-ng-model="search" maxlength="{{input.maxlength}}" />\n\
                        <a href="javascript:;" class="searchbar-clear" data-ng-click="clear()"></a>\n\
                      </div>',
            replace: true,
            scope: {
                input: "=",
                search: "=",
                clear :"&"
            },
            link: function(scope, element) {
                scope.disabledInput = true;
                $timeout(function() {
                    scope.disabledInput = false;
                }, 700);
                var $searchbarClear = element.find('a');
                scope.$watch('search', function (newValue, oldValue) {
                    if( newValue == undefined) return;
                    if((!oldValue  && newValue.length>0) || (newValue.length == oldValue.length)) {
                        $searchbarClear.addClass('searchbar-not-empty');
                    }
                    if(!newValue) {
                        $searchbarClear.removeClass('searchbar-not-empty');
                    }
                });

            }
        }
    }
];

},{}],13:[function(require,module,exports){
'use strict';

module.exports = [
    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var phoneNumber = parseInt(attrs.makeCall.replace('-', ''));
                    if(typeof phoneNumber == 'number') {
                        nativePlugin.makeCall("makeCallForCallTel", phoneNumber);
                    }
                });
            }
        }
    }
];

},{}],14:[function(require,module,exports){
'use strict';
module.exports = [ '$timeout', 'checkTime',
    function($timeout, checkTime) {
        return {
            restrict: 'E',
            template: '<span class="color-golden-yellow">{{timeleft.minute}}</span>分<span class="color-golden-yellow">{{timeleft.second}}</span>秒',
            scope: {
                millisecond: "="
            },
            link: function(scope, element) {
                var timeoutId, minute, second, newLeftMillisecond;
                var millisecond = parseInt(scope.millisecond);
                millisecond = (millisecond < 0 ? 0 : millisecond);
                function updateLater(leftMillisecond) {
                    minute = parseInt(leftMillisecond / 1000 / 60 % 60, 10); //计算剩余的分钟数
                    second = parseInt(leftMillisecond / 1000 % 60, 10);//计算剩余的秒数
                    scope.timeleft = {
                        minute: checkTime(minute),
                        second: checkTime(second)
                    };
                    if(leftMillisecond <= 0) {
                        $timeout.cancel(timeoutId);
                        scope.millisecond = 0;
                        return;
                    }
                    // save the timeoutId for canceling
                    timeoutId = $timeout(function() {
                        newLeftMillisecond = leftMillisecond - 1000;
                        updateLater(newLeftMillisecond);
                    }, 1000);
                }

                element.bind('$destroy', function() {
                    $timeout.cancel(timeoutId);
                });

                updateLater(millisecond);

            }
        }
    }
];

/*
module.exports = [ '$timeout', 'checkTime',
    function($timeout, checkTime) {
        return {
            restrict: 'E',
            template: '<span class="color-golden-yellow">{{timeleft.day}}</span>天<span class="color-golden-yellow">{{timeleft.hour}}</span>时<span class="color-golden-yellow">{{timeleft.minute}}</span>分<span class="color-golden-yellow">{{timeleft.second}}</span>秒',
            scope: {
                millisecond: "="
            },
            link: function(scope, element) {
                var timeoutId, minute, second, newLeftMillisecond;
                var millisecond = parseInt(scope.millisecond);
                millisecond = (millisecond < 0 ? 0 : millisecond);

                var day, hour;

                function updateLater(leftMillisecond) {

                    day = parseInt(leftMillisecond / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
                    hour = parseInt(leftMillisecond / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数


                    minute = parseInt(leftMillisecond / 1000 / 60 % 60, 10); //计算剩余的分钟数
                    second = parseInt(leftMillisecond / 1000 % 60, 10);//计算剩余的秒数
                    scope.timeleft = {
                        minute: checkTime(minute),
                        second: checkTime(second),
                        day: day,
                        hour: hour
                    };
                    if(leftMillisecond <= 0) {
                        $timeout.cancel(timeoutId);
                        scope.millisecond = 0;
                        return;
                    }
                    // save the timeoutId for canceling
                    timeoutId = $timeout(function() {
                        newLeftMillisecond = leftMillisecond - 1000;
                        updateLater(newLeftMillisecond);
                    }, 1000);
                }

                element.bind('$destroy', function() {
                    $timeout.cancel(timeoutId);
                });

                updateLater(millisecond);

            }
        }
    }
];
 */

},{}],15:[function(require,module,exports){
'use strict';

module.exports = [ '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'partials/loading.html',
            scope: {
                loadingText: "=",
                showLoading: '='
            },
            link: function(scope) {
                scope.closeLoading =  function() {
                    $rootScope.showLoading = false;
                };
            }
        }
    }
];

},{}],16:[function(require,module,exports){
'use strict';

module.exports = [
    function () {
        return {
            restrict: 'E',
            scope: {
                modal: '='
            },
            template: '\
                <div class="modal" data-ng-class="{\'modal-in\': modal.showModal}"> \n\
                    <div class="modal-inner"> \n\
                        <div class="modal-title">{{modal.title}}</div> \n\
                        <div class="modal-text">{{modal.text}}</div> \n\
                    </div> \n\
                    <div class="modal-line"></div> \n\
                    <div class="modal-buttons"> \n\
                        <span class="modal-button" data-ng-show="modal.cancleBtn">{{modal.cancleBtn}}</span> \n\
                        <span class="modal-button modal-button-bold" data-ng-click="modal.confirm()">{{modal.confirmBtn}}</span> \n\
                    </div> \n\
                </div> \n\
                <div class="modal-overlay" data-ng-class="{\'modal-overlay-visible\': modal.showModal}"></div>',
            link: function (scope, element) {
                var modalButton = element.find('span');
                modalButton.bind('click', function () {
                    scope.$apply(function () {
                        scope.modal.showModal = false;
                    });
                });
            }
        }
    }
];

},{}],17:[function(require,module,exports){
/**
 * 汽车票日期表格的日期范围
 * */
'use strict';

module.exports = ['dateRange', 'checkTime', function (dateRange, checkTime) {



    return function (dateStr, action) {
//        date = '2014-10-02';
        var date = new Date(dateStr.replace(/-/g, '/'));
        var num = 1;
        if(action == 'minus') {
            num = -1;
        } else if(action == 'plus') {
            num = 1;
        }
        var finallyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + num);
        var finallyDateStr = finallyDate.getFullYear() + '-' + checkTime(finallyDate.getMonth() + 1) + '-' + checkTime(finallyDate.getDate());
        if(finallyDate.getTime() >= dateRange.startDateUnix && finallyDate.getTime() <= dateRange.endDateUnix) {
            return finallyDateStr;
        } else {
            return dateStr;
        }
    };
}];
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
var filters = angular.module('app.filters', []);


filters
    .filter('toTimeDivision', require('./toTimeDivision'))  //将 2014-08-28 17:00:00 转换为 17:00
    .filter('changeDate', require('./changeDate'))  //日期加1或减1
    .filter('toWeek', require('./toWeek'))  //通过日期获得星期
    .filter('deleteBlank', require('./deleteBlank'))  //删除空格
    .filter('multiFilter', require('./multiFilter'))


module.exports = filters;
},{"./changeDate":17,"./deleteBlank":18,"./multiFilter":20,"./toTimeDivision":21,"./toWeek":22}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
'use strict';

module.exports = [function () {
    return function (time) {
        if(time && time.length > 0) {
//            var date = new Date(time.replace(/-/g, '/'));
            var timeArr = time.split(':')
            return timeArr[1] + ":" + timeArr[2];
        }
    };
}];
},{}],22:[function(require,module,exports){
/**
 * 通过日期获取星期
 */

'use strict';

module.exports = [function () {
    return function (weekStr, dateStr) {
        if(!dateStr) return;
        var dd = new Date(),
            selectedDd = new Date(dateStr.replace(/-/g, '/'));
        var getDateDiff = function () {
            var today = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate()),
                selectedDay = new Date(selectedDd.getFullYear(), selectedDd.getMonth(), selectedDd.getDate());
            var num = (selectedDay - today)/86400000;
            switch (num) {
                case 0:
                    return '今天';
                case 1:
                    return '明天';
                case 2:
                    return '后天';
                default:
                    return false;
            }
        };

        //转换为星期
        var convertDay = function (num) {
            var weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            return weekList[num] || "";
        };
        var week = (getDateDiff() || convertDay(selectedDd.getDay()));
        return week;
    };
}];
},{}],23:[function(require,module,exports){
/*
 * angular-mobile-nav by Andy Joslin && regou
 * https://github.com/regou/angular-mobile-nav
 * @license MIT License http://goo.gl/Z8Nlo
 *
 * add navigateing list route-info support by regou
 * Adjust back Action strategy by regou
 */


var mobileNavMod = angular.module('ajoslin.mobile-navigate', [
//    require('../node_modules/angular-bsfy/animate').name,
//    require('../node_modules/angular-bsfy/route').name
    ]);
//    .run(['$navigate', '$rootScope', function($navigate, $rootScope) {
//        //Android back button functionality for phonegap
//        document.addEventListener("deviceready", function() {
//            document.addEventListener("backbutton", function() {
//                $rootScope.$apply(function() {
//                    var backSuccess = $navigate.back();
//                    if (!backSuccess) {
//                        navigator.app.exitApp();
//                    }
//                });
//            });
//        });
//    }]);
    /*
     * $change
     * Service to transition between two elements
     */
//angular.module('ajoslin.mobile-navigate')

    mobileNavMod.provider('$change', function() {
        var transitionPresets = {  //[nextClass, prevClass]
            //Modal: new page pops up, old page sits there until new page is over it
            'ionicslide': ['ionicslide', 'ionicslide-prev'],
            'modal': ['modal', ''],
            'none': ['', '']
        };
        var defaultOptions = {
            'prefix': 'mb-'
        };
        var IN_CLASS = "in";
        var OUT_CLASS = "out";
        var REVERSE_CLASS = "reverse";
        var DONE_CLASS = "done";
        var ANIMATION_END = "webkitAnimationName" in document.documentElement.style ? "webkitAnimationEnd" : "animationend";

        this.setTransitionPreset = function(transitionName, inClass, outClass) {
            inClass = inClass || '';
            outClass = outClass || inClass; //Default to outClass same as inClass
            transitionPresets[transitionName] = [inClass, outClass];
        };
        this.options = function(opts) {
            defaultOptions = angular.extend(defaultOptions, opts || {});
        };

        this.$get = ['$q', '$rootScope', function($q, $rootScope) {

            return function change(next, prev, transType, reverse, options) {
                options = angular.extend(options || {}, defaultOptions);
                var deferred = $q.defer(),
                    nextTransClass, prevTransClass;

                //buildClassString
                //Transforms array of classes into prefixed class string
                //(better for performance than multiple .addClass()
                //@param classes: Array{string}
                //@return string classNames
                function buildClassString(classes) {
                    return classes.reduce(function(accumulator, cls) {
                        return accumulator + (cls ? (' ' + options.prefix + cls) : '');
                    }, '');
                }

                //Convert a preset (eg 'modal') to its array of preset classes if it exists
                //else, just convert eg 'slide' to ['slide', 'slide'], so both elements get it
                //The array layout is [nextinationClass, prevClass]
                var transition = transitionPresets[transType] ?
                    transitionPresets[transType] :
                    [transType, ''];

                //Hack for white flash: z-index stops flash, offsetWidth thing forces z-index to apply
                next.css('z-index','-100');
                next[0].offsetWidth += 0;

                var nextClasses = buildClassString([
                    reverse ? OUT_CLASS : IN_CLASS,
                    (nextTransClass = transition[reverse ? 1 : 0]),
                    reverse && REVERSE_CLASS || ''
                ]);
                next.addClass(nextClasses);

                var prevClasses;
                if (prev) {
                    prevClasses = buildClassString([
                        reverse ? IN_CLASS : OUT_CLASS,
                        (prevTransClass = transition[reverse ? 0 : 1]),
                        reverse && REVERSE_CLASS || ''
                    ]);
                    prev.addClass(prevClasses);
                }
                //console.log(nextClasses, '               ' + prevClasses)

                next.css('z-index', '');
                next[0].offsetWidth += 0;

                function done() {
                    $rootScope.$apply(function() {
                        deferred.resolve();
                    });
                }

                //Find which element (sometimes none) to bind for ending
                var boundElement;
                if (nextTransClass && nextTransClass.length) {
                    (boundElement = next).bind(ANIMATION_END, done);
                } else if (prev && prevTransClass && prevTransClass.length) {
                    (boundElement = prev).bind(ANIMATION_END, done);
                } else {
                    deferred.resolve();
                }

                deferred.promise.then(function() {
                    boundElement && boundElement.unbind(ANIMATION_END, done);
                    next.removeClass(nextClasses);
                    prev && prev.removeClass(prevClasses);
                });

                //Let the user of change 'cancel' to finish transition early if they wish
                deferred.promise.cancel = function() {
                    deferred.resolve();
                };
                return deferred.promise;
            };
        }];
    })
//angular.module('ajoslin.mobile-navigate')

    .provider('$navigate', function() {
        this.$get = ['$rootScope', '$location', '$route', function($rootScope, $location) {
            var nav = {},
                navHistory = []; //we keep our own version of history and ignore window.history
            var pageTransitioning = false;

            function Page(path, transition, isReverse) {
                var _path = path,
                    _transition = transition || 'slide',
                    _isReverse = isReverse,
                    _onceTransition;

                this.transition = function() {
                    var trans;
                    if (_onceTransition) {
                        trans = _onceTransition;
                        _onceTransition = null;
                    } else {
                        trans = _transition;
                    }
                    return trans;
                };
                this.path = function() { return _path; };
                this.reverse = function() { return _isReverse; };

                //For setting a transition on a page - but only one time
                //Eg say on startup, we want to transition in with 'none',
                //but want to be 'slide' after that
                this.transitionOnce = function(trans) {
                    _onceTransition = trans;
                };
            }

            function navigate(destination, source, isReverse,isBack) {




                //console.log('isReverse', isReverse)
                $rootScope.$broadcast('$pageTransitionStart', destination, source, isReverse,isBack);
                nav.current = nav.next;
            }

            /*
             * Will listen for a route change success and call the selected callback
             * Only one listen is ever active, so if you press for example
             * /link1 then press back before /link1 is done, it will go listen for the back
             */
            //console.log(nav.onRouteSuccess)
            nav.onRouteSuccess = null;
            //Add a default onroutesuccess for the very first page
            function defaultRouteSuccess($event, next, last) {
                nav.current && navHistory.push([nav.current, '']);


                nav.next = new Page($location.path());
                nav.next.transitionOnce('none');
                navigate(nav.next);
                nav.onRouteSuccess = null;
            }
            $rootScope.$on('$routeChangeSuccess', function($event, next, last) {
                // Only navigate if it's a valid route and it's not gonna just redirect immediately
                if (!next.$$route || !next.$$route.redirectTo) {
                    (nav.onRouteSuccess || defaultRouteSuccess)($event, next, last);
                }
                //Make route history accessible by regou
                $rootScope.$broadcast('$pageNaved', next, last);


                //TODO 历史记录回退
                $rootScope.actualLocation = $location.path();
            });

            $rootScope.$on('$pageTransitionSuccess', function(desc, source) {
                pageTransitioning = false;

            });

            /*
             * go -transitions to new page
             * @param path - new path
             * @param {optional} String transition
             * @param {optional} boolean isReverse, default false
             */
            nav.go = function go(path, transition, isReverse) {
                if(pageTransitioning) return;
                pageTransitioning = true;


                if (typeof transition == 'boolean') {
                    isReverse = transition;
                    transition = null;
                }
                //console.log(path);
                
                $location.path(path);
                //Wait for successful route change before actually doing stuff
                nav.onRouteSuccess = function($event, next, last) {
                    //console.log($rootScope.actualLocation);
                    //console.log(path);


                    //TODO 历史记录回退
                    console.log($rootScope.actualLocation);
                    console.log(path);

                    if($rootScope.actualLocation == path) {
                        var previous = navHistory[navHistory.length-1][0];
                        $location.path(previous.path());
                        //nav.back()
                        navHistory.pop();
                        nav.next = previous;
                        navigate(nav.next, nav.current, true);
                        return;
                    }

                    nav.current && navHistory.push([nav.current, last.$$route.controller]);
                    nav.next = new Page(path, transition || (next.$$route && next.$$route.transition), isReverse);
                    navigate(nav.next, nav.current, false);
                };
            };
            //modify history
            nav.modifyHistory = function(needlessHistory) {
                angular.forEach(needlessHistory, function(value) {
                    for(var i = 0, len = navHistory.length; i < len; i++){
                        try {
                            if(navHistory[i][1] == value) {
                                navHistory.splice(i, 1);
                            }
                        }catch(e) {}
                    }
                });
            };
            //Sometimes you want to erase history
            nav.eraseHistory = function() {
                navHistory=[];
            };
            nav.getHistory=function(){
                return navHistory;
            };
            nav.back = function() {
                if(pageTransitioning) return;
                pageTransitioning = true;
                if (navHistory.length > 0) {
                    var previous = navHistory[navHistory.length-1][0];
                    $location.path(previous.path());
                    nav.onRouteSuccess = function() {
                        navHistory.pop();
                        nav.next = previous;
                        navigate(nav.next, nav.current, true);
                    };
                    return true;
                }
                return false;
            };
            return nav;
        }];
    })
//angular.module('ajoslin.mobile-navigate')
    mobileNavMod.directive('mobileView', ['$rootScope', '$compile', '$controller', '$route', '$change', '$q',
        function($rootScope, $compile, $controller, $route, $change, $q) {

            function link(scope, viewElement, attrs) {
                //Insert page into dom
                function insertPage(page) {
                    var current = $route.current,
                        locals = current && current.locals;

                    page.element = angular.element(document.createElement("div"));
                    page.element.html(locals.$template);
                    page.element.addClass('mb-page'); //always has to have page class
                    page.scope = scope.$new();
                    if (current.controller) {
                        locals.$scope = page.scope;
                        page.controller = $controller(current.controller, locals);
                        page.element.contents().data('$ngControllerController', page.controller);
                    }
                    $compile(page.element.contents())(page.scope);
                    if (locals && locals.$template) {
                        // only append page element if a template exists
                        viewElement.append(page.element);
                    }
                    page.scope.$emit('$viewContentLoaded');
                    page.scope.$eval(attrs.onLoad);
                    return page;
                }


                var currentTrans;
                scope.$on('$pageTransitionStart', function ($event, dest, source, reverse,isBack) {
                    function changePage() {
                        var current = $route.current && $route.current.$$route || {};
                        if(isBack){reverse=true;}
                        var transition = reverse ? source.transition() : dest.transition();

                        insertPage(dest);
                        //If the page is marked as reverse, reverse the direction
                        //But,if it's a nav.back Action, keep reverse==true  regou@2013.9.9
                        if (dest.reverse() || current.reverse) {
                            if(!isBack){reverse = !reverse;}
                        }
                        function doTransition() {

                            var promise = $change(dest.element, (source ? source.element : null),
                                transition, reverse);

                            promise.then(function() {
                                if (source) {
                                    $rootScope.$broadcast('$pageTransitionSuccess', dest, source);
                                    source.scope.$destroy();
                                    source.element.remove();
                                    source = undefined;
                                }
                            });

                            return promise;
                        }

                        //Set next element to display: none, then wait until transition is
                        //ready, then show it again.
                        dest.element.css('display', 'none');

                        //Allow a deferTransition expression, which is allowed to return a promise.
                        //The next page will be inserted, but not transitioned in until the promise
                        //is fulfilled.
                        var deferTransitionPromise = scope.$eval(attrs.deferTransition) || $q.when();
                        deferTransitionPromise.cancel = function() {
                            cancelled = true;
                            //Undo display none from waiting for transition
                            dest.element.css('display', '');
                        };

                        var cancelled = false;
                        deferTransitionPromise.then(function() {
                            if (!cancelled) {
                                //Undo display none from waiting for transition
                                dest.element.css('display', '');
                                return doTransition();
                            }
                        });

                        return deferTransitionPromise;
                    }
                    currentTrans && currentTrans.cancel();
                    currentTrans = changePage(dest, source, reverse);
                });
            }
            return {
                restrict: 'EA',
                link: link
            };
        }])

    //.directive('scrollable', ['$route', '$timeout', function($route, $timeout) {
    //    var scrollCache = {};
    //    return {
    //        restrict: 'EA',
    //        link: function(scope, elm, attrs) {
    //            console.log(scrollCache);
    //
    //            var route = $route.current ? $route.current.$$route : {};
    //            var template = route.templateUrl || route.template;
    //            var rawElm = elm[0];
    //
    //            console.log($route);
    //            console.log(template);
    //            console.log(rawElm);
    //
    //
    //            //On scope creation, see if we remembered any scroll for this templateUrl
    //            //If we did, set it
    //            if (template) {
    //                //Set oldScroll after a timeout so the page has time to fully load
    //                $timeout(function() {
    //                    var oldScroll = scrollCache[template];
    //                    console.log(oldScroll);
    //
    //                    if (oldScroll) {
    //                        rawElm.scrollTop = oldScroll;
    //                    }
    //                });
    //
    //                scope.$on('$destroy', function() {
    //                    scrollCache[template] = rawElm.scrollTop;
    //                });
    //            }
    //        }
    //    };
    //}]);


module.exports = mobileNavMod;

},{}],24:[function(require,module,exports){
"use strict";(function(){var a=angular.module("ngStorage",[]).factory("$localStorage",b("localStorage")).factory("$sessionStorage",b("sessionStorage"));function b(c){return["$rootScope","$window",function(d,m){var l=m[c]||(console.warn("This browser does not support Web Storage!"),{}),h={$default:function(n){for(var i in n){angular.isDefined(h[i])||(h[i]=n[i])}return h},$reset:function(n){for(var i in h){"$"===i[0]||delete h[i]}return h.$default(n)}},j,f;for(var g=0,e;g<l.length;g++){(e=l.key(g))&&"ngStorage-"===e.slice(0,10)&&(h[e.slice(10)]=angular.fromJson(l.getItem(e)))}j=angular.copy(h);d.$watch(function(){f||(f=setTimeout(function(){f=null;if(!angular.equals(h,j)){angular.forEach(h,function(o,n){angular.isDefined(o)&&"$"!==n[0]&&l.setItem("ngStorage-"+n,angular.toJson(o));delete j[n]});for(var i in j){l.removeItem("ngStorage-"+i)}j=angular.copy(h)}},100))});"localStorage"===c&&m.addEventListener&&m.addEventListener("storage",function(i){if("ngStorage-"===i.key.slice(0,10)){i.newValue?h[i.key.slice(10)]=angular.fromJson(i.newValue):delete h[i.key.slice(10)];j=angular.copy(h);d.$apply()}});return h}]}module.exports=a})();
},{}],25:[function(require,module,exports){
var TouchSlide=function(a){a=a||{};var b={slideCell:a.slideCell||"#touchSlide",titCell:a.titCell||".hd li",mainCell:a.mainCell||".bd",effect:a.effect||"left",autoPlay:a.autoPlay||!1,delayTime:a.delayTime||200,interTime:a.interTime||2500,defaultIndex:a.defaultIndex||0,titOnClassName:a.titOnClassName||"on",autoPage:a.autoPage||!1,prevCell:a.prevCell||".prev",nextCell:a.nextCell||".next",pageStateCell:a.pageStateCell||".pageState",pnLoop:"undefined "==a.pnLoop?!0:a.pnLoop,startFun:a.startFun||null,endFun:a.endFun||null,switchLoad:a.switchLoad||null},c=document.getElementById(b.slideCell.replace("#",""));if(!c)return!1;var d=function(a,b){a=a.split(" ");var c=[];b=b||document;var d=[b];for(var e in a)0!=a[e].length&&c.push(a[e]);for(var e in c){if(0==d.length)return!1;var f=[];for(var g in d)if("#"==c[e][0])f.push(document.getElementById(c[e].replace("#","")));else if("."==c[e][0])for(var h=d[g].getElementsByTagName("*"),i=0;i<h.length;i++){var j=h[i].className;j&&-1!=j.search(new RegExp("\\b"+c[e].replace(".","")+"\\b"))&&f.push(h[i])}else for(var h=d[g].getElementsByTagName(c[e]),i=0;i<h.length;i++)f.push(h[i]);d=f}return 0==d.length||d[0]==b?!1:d},e=function(a,b){var c=document.createElement("div");c.innerHTML=b,c=c.children[0];var d=a.cloneNode(!0);return c.appendChild(d),a.parentNode.replaceChild(c,a),m=d,c},g=function(a,b){!a||!b||a.className&&-1!=a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className+=(a.className?" ":"")+b)},h=function(a,b){!a||!b||a.className&&-1==a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className=a.className.replace(new RegExp("\\s*\\b"+b+"\\b","g"),""))},i=b.effect,j=d(b.prevCell,c)[0],k=d(b.nextCell,c)[0],l=d(b.pageStateCell)[0],m=d(b.mainCell,c)[0];if(!m)return!1;var N,O,n=m.children.length,o=d(b.titCell,c),p=o?o.length:n,q=b.switchLoad,r=parseInt(b.defaultIndex),s=parseInt(b.delayTime),t=parseInt(b.interTime),u="false"==b.autoPlay||0==b.autoPlay?!1:!0,v="false"==b.autoPage||0==b.autoPage?!1:!0,w="false"==b.pnLoop||0==b.pnLoop?!1:!0,x=r,y=null,z=null,A=null,B=0,C=0,D=0,E=0,G=/hp-tablet/gi.test(navigator.appVersion),H="ontouchstart"in window&&!G,I=H?"touchstart":"mousedown",J=H?"touchmove":"",K=H?"touchend":"mouseup",M=m.parentNode.clientWidth,P=n;if(0==p&&(p=n),v){p=n,o=o[0],o.innerHTML="";var Q="";if(1==b.autoPage||"true"==b.autoPage)for(var R=0;p>R;R++)Q+="<li>"+(R+1)+"</li>";else for(var R=0;p>R;R++)Q+=b.autoPage.replace("$",R+1);o.innerHTML=Q,o=o.children}"leftLoop"==i&&(P+=2,m.appendChild(m.children[0].cloneNode(!0)),m.insertBefore(m.children[n-1].cloneNode(!0),m.children[0])),N=e(m,'<div class="tempWrap" style="overflow:hidden;position:relative;"></div>'),m.style.cssText="width:"+P*M+"px;position:relative;overflow:hidden;padding:0;margin:0;";for(var R=0;P>R;R++)m.children[R].style.cssText="display:table-cell;vertical-align:top;width:"+M+"px";var S=function(){"function"==typeof b.startFun&&b.startFun(r,p)},T=function(){"function"==typeof b.endFun&&b.endFun(r,p)},U=function(a){var b=("leftLoop"==i?r+1:r)+a,c=function(a){for(var b=m.children[a].getElementsByTagName("img"),c=0;c<b.length;c++)b[c].getAttribute(q)&&(b[c].setAttribute("src",b[c].getAttribute(q)),b[c].removeAttribute(q))};if(c(b),"leftLoop"==i)switch(b){case 0:c(n);break;case 1:c(n+1);break;case n:c(0);break;case n+1:c(1)}},V=function(){M=N.clientWidth,m.style.width=P*M+"px";for(var a=0;P>a;a++)m.children[a].style.width=M+"px";var b="leftLoop"==i?r+1:r;W(-b*M,0)};window.addEventListener("resize",V,!1);var W=function(a,b,c){c=c?c.style:m.style,c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms",c.webkitTransform="translate("+a+"px,0)translateZ(0)",c.msTransform=c.MozTransform=c.OTransform="translateX("+a+"px)"},X=function(a){switch(i){case"left":r>=p?r=a?r-1:0:0>r&&(r=a?0:p-1),null!=q&&U(0),W(-r*M,s),x=r;break;case"leftLoop":null!=q&&U(0),W(-(r+1)*M,s),-1==r?(z=setTimeout(function(){W(-p*M,0)},s),r=p-1):r==p&&(z=setTimeout(function(){W(-M,0)},s),r=0),x=r}S(),A=setTimeout(function(){T()},s);for(var c=0;p>c;c++)h(o[c],b.titOnClassName),c==r&&g(o[c],b.titOnClassName);0==w&&(h(k,"nextStop"),h(j,"prevStop"),0==r?g(j,"prevStop"):r==p-1&&g(k,"nextStop")),l&&(l.innerHTML="<span>"+(r+1)+"</span>/"+p)};if(X(),u&&(y=setInterval(function(){r++,X()},t)),o)for(var R=0;p>R;R++)!function(){var a=R;o[a].addEventListener("click",function(){clearTimeout(z),clearTimeout(A),r=a,X()})}();k&&k.addEventListener("click",function(){(1==w||r!=p-1)&&(clearTimeout(z),clearTimeout(A),r++,X())}),j&&j.addEventListener("click",function(){(1==w||0!=r)&&(clearTimeout(z),clearTimeout(A),r--,X())});var Y=function(a){clearTimeout(z),clearTimeout(A),O=void 0,D=0;var b=H?a.touches[0]:a;B=b.pageX,C=b.pageY,m.addEventListener(J,Z,!1),m.addEventListener(K,$,!1)},Z=function(a){if(!H||!(a.touches.length>1||a.scale&&1!==a.scale)){var b=H?a.touches[0]:a;if(D=b.pageX-B,E=b.pageY-C,"undefined"==typeof O&&(O=!!(O||Math.abs(D)<Math.abs(E))),!O){switch(a.preventDefault(),u&&clearInterval(y),i){case"left":(0==r&&D>0||r>=p-1&&0>D)&&(D=.4*D),W(-r*M+D,0);break;case"leftLoop":W(-(r+1)*M+D,0)}null!=q&&Math.abs(D)>M/3&&U(D>-0?-1:1)}}},$=function(a){0!=D&&(a.preventDefault(),O||(Math.abs(D)>M/10&&(D>0?r--:r++),X(!0),u&&(y=setInterval(function(){r++,X()},t))),m.removeEventListener(J,Z,!1),m.removeEventListener(K,$,!1))};m.addEventListener(I,Y,!1)};module.exports=TouchSlide;
},{}],26:[function(require,module,exports){
'use strict';




module.exports = ['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        /**
         * ·������
         * */
        $routeProvider
            .when('/home', {
                templateUrl: 'partials/home.html',  //��ҳ
                controller: 'homeCtrl'
                //resolve: {isInApp: 'isInApp'},
                //navbar: {
                //    func: 'home',
                //    title: '����',
                //    canClose: 1
                //}
            })
            .when('/integralMall', {
                templateUrl: 'partials/integralMall.html',      //�����̳�
                controller: 'integralMallCtrl'
            })
            .when('/coupon', {
                templateUrl: 'partials/coupon.html',      //�Ż�ȯ
                controller: 'couponCtrl'
            })
            .when('/couponDetail', {
                templateUrl: 'partials/couponDetail.html',      //�Ż�ȯ����
                controller: 'couponDetailCtrl'
            })
            //.when('/register', {
            //    templateUrl: 'partials/register.html',      //ע��
            //    controller: 'registerCtrl'
            //})
            //.when('/personalCenter', {
            //    templateUrl: 'partials/personalCenter.html',      //�������ģ���Ա��
            //    controller: 'personalCenterCtrl'
            //})

            .otherwise({
                redirectTo: "/home"
            })
        ;






        /*
        * http����
        * */
        //By default, jQuery transmits data using Content-Type: x-www-form-urlencoded and the familiar foo=bar&baz=moe serialization. AngularJS, however, transmits data using Content-Type: application/json and { "foo": "bar", "baz": "moe" } JSON serialization, which unfortunately some Web server languages��notably PHP��do not unserialize natively
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for(name in obj) {
                value = obj[name];
                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];




    }
];
 

},{}],27:[function(require,module,exports){
'use strict';

module.exports = ['$rootScope', '$window', '$route', '$http', '$templateCache', '$location', '$navigate', '$timeout', '$localStorage',
    function ($rootScope, $window, $route, $http, $templateCache, $location, $navigate, $timeout, $localStorage) {
       /* loadPage();
        function loadPage() {
            var page;
            try {
                page = JSON.parse(H5NaviPlugin.getCurrentPage());
            } catch (e) {
                page = {currentPage: 0};
            }

            switch (page.currentPage) {
                case 0:
                    //$location.path('/').search({'departureCity': '����', arrivalCity: '����'}).replace();
                    $location.path('/').replace();
                    break;
                case 1:
                    $location.path('/busOrderList').replace();
                    break;
                default:
                    $location.path('/').replace();
            }
        }*/

        $rootScope.isLoggedIn = 0;
        $window.notifyLoginStatus = function (isLoggedIn) {
            $rootScope.isLoggedIn = parseInt(isLoggedIn);
        };

        //��ȡ�û���Ϣ
        (function () {
            try {
                var userInfoStr = H5UserPlugin.getUserInfo();
                var params = JSON.parse(userInfoStr);
                if (params.state == 1) {
                    $rootScope.isLoggedIn = 1;
                    $localStorage.userInfo = {
                        memberId: params.memberId,
                        username: params.username,
                        truename: params.truename,
                        usermobile: params.usermobile
                    };
                } else {
                    $rootScope.isLoggedIn = 0;
                }
            } catch (e) {
            }
        })();


        //Ԥ�Ȼ���ģ��
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }
        });

//                $rootScope.$on('$viewContentLoaded', function() { //����ģ�建��
//                    console.log($templateCache.info());
//                    $templateCache.removeAll();
//                });


        //��ת����½ҳ��
        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            if (rejection && rejection.needsAuthentication === true) {
                $location.path('/').replace();
            }

            if (rejection && rejection.needInApp === true) {
                $location.path('/error').replace();
                (function () {
                    var _log = console.log;
                    _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color: red;')
                })('Copyright 2002-2014��Ȩ����ͬ�������Ƽ��ɷ����޹�˾ \n\nFront-End Web Developer: ���� gq6574@LY.com  ���� hr09288@LY.com');

            }
        });


        //ҳ���л��ɹ����Ĳ���
        $rootScope.$on("$pageNaved", function (event, next, last) {
            //����ҳ������
            //var navbar = next.$$route['navbar'],
            //if (angular.isObject(navbar)) {
            //  nativePlugin.setNavibar(navbar.func, navbar.title, navbar.canClose, navbar.subtitle, navbar.hasMenu, navbar.rightmenuTitle, navbar.callbackEvent);
            //}


            try {
               /* var controller = next.$$route.controller;
                //����ҳʱ������ʷ��¼
                if (controller === 'homeCtrl') {
                    $navigate.eraseHistory();
                }


                //����ҳ����ת
                switch (controller) {
                    case 'orderPayCtrl':
                        $navigate.modifyHistory(['busTrainListCtrl', 'fillInOrderCtrl', 'busOrderDetailCtrl', 'payFailCtrl', 'orderPayCtrl']);   //���붩��֧��ҳ������ʷ��¼���Ƴ�����Ҫ��ҳ��
                        break;
                }*/
            } catch(e) {}
        });



        ////Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
        ////bind in induvidual controllers.
        //$rootScope.$on('$locationChangeSuccess', function() {
        //    $rootScope.actualLocation = $location.path();
        //});
        //
        //$rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        //    if($rootScope.actualLocation === newLocation) {
        //        alert('Why did you use history back?');
        //    }
        //});

    }
];
},{}],28:[function(require,module,exports){
var providers = angular.module('app.provider', []);

//Configuration blocks - get executed during the provider registrations and configuration phase. Only providers and constants can be injected into configuration blocks. This is to prevent accidental instantiation of services before they have been fully configured.

providers
    .provider('isInApp', function () {
        this.$get = ['$q', function ($q) {
            var deferred = $q.defer();
            //if (internal.isInApp) {
                deferred.resolve();
            //} else {
            //    deferred.reject({ needInApp: true });
            //}
            return deferred.promise;
        }];
    }
)
    .provider('isLoggedIn', function () {  //是否登陆
        this.$get = ['$q', 'authService', function ($q, authService) {
            var deferred = $q.defer();
            if (authService.isAuthenticated()) {
                deferred.resolve();
            } else {
                deferred.reject({ needsAuthentication: true });
            }
            return deferred.promise;
        }];
    }
);


module.exports = providers;
},{}],29:[function(require,module,exports){
'use strict';

module.exports = ['$q', '$http',
    function ($q, $http) {

        var getData = function (httpParams) {
            var data, headerReqdata;
            try{
                data = nativePlugin.getServiceRequest(httpParams.serviceName, httpParams.serviceParams);
                headerReqdata = nativePlugin.encodeRequest(data);
            }catch(e){}


            var defer = $q.defer();

            var newHttpParams = {
                method: 'POST',
                url: httpParams.url,
                cache:  httpParams.cache || false,
                timeout: httpParams.timeout || defer.promise || 15000 ,
                success: httpParams.success || angular.noop,
                error: httpParams.error || angular.noop,
                complete: httpParams.complete || angular.noop,
                data: data,
                headers: {
                    reqdata: headerReqdata
                }
            };




            var request = $http(newHttpParams);  //requrest为一个defer.promise
            var promise = request.success(
                httpParams.success
            ).error(
                httpParams.error
            );

            promise.abort = function () {
                defer.resolve();
            };

            promise.
                finally(
                    httpParams.complete
                )
                .finally(
                    function () {
                        promise.abort = angular.noop;
                        defer = request = promise = null;
//                        loading.hide();
                    }
                );
            return promise;
        };

        return getData;
    }
];



},{}],30:[function(require,module,exports){
'use strict';


var anchorSmoothScroll = function ($timeout) {

    this.scrollTo = function (eID, scrollArea) {

        var startY = scrollArea.scrollTop,
              stopY = document.getElementById(eID).offsetTop - 46,
              maxStopY = scrollArea.scrollHeight - getHeight(scrollArea),
              distance = 0;

        if (stopY > maxStopY) stopY = maxStopY;
        if (stopY < 0) stopY = 0;
        distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance == 0) return;

        var s = 80, ss = 20;
        if (distance < 200) {
            s = 5;
            ss = 20;
        }
        var speed = Math.round(distance / s);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / ss);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                (function (closureY) {
                    $timeout(function () {
                        scrollArea.scrollTop = closureY;
                    }, timer * speed);
                }(leapY));

                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            (function (closureY) {
                $timeout(function () {
                    scrollArea.scrollTop = closureY;
                }, timer * speed);
            }(leapY));

            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        function getHeight(ele){
            return parseInt(ele.currentStyle? ele.currentStyle : window.getComputedStyle(ele, null).height) || 0;
        }

    }
}

module.exports = ['$timeout', anchorSmoothScroll];
},{}],31:[function(require,module,exports){
'use strict';


var validateLogin =  function($rootScope) {
    return {
        isAuthenticated: function() {
            // Check that the user is logged in.
            return $rootScope.isLoggedIn;
        }
    };
};

module.exports = ['$rootScope', validateLogin];
},{}],32:[function(require,module,exports){
/**
 *  @brief  日期或时间小于0的前面加0
 */

module.exports = [function() {
    return function (i) {
        if (i < 10 && i >= 0) {
            i = '0' + i;
        }
        return i;
    };
}];


},{}],33:[function(require,module,exports){
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




},{}],34:[function(require,module,exports){
/**
 * 汽车票日期表格的日期范围
 *  @return {Object}
 *  start 开始日期
 *  end 结束日期
 */

'use strict';

module.exports = [function() {
    var tempDate = new Date(),
        startDateUnix = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime(),
        endDateUnix = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 9).getTime();  //表示可选范围为10天之内的车票
    return {
        startDateUnix: startDateUnix,
        endDateUnix: endDateUnix
    }
}];



},{}],35:[function(require,module,exports){
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
},{}],36:[function(require,module,exports){
'use strict';
/**
 * 存储请求数据
 * */


var httpCacheData = function ($cacheFactory) {
    return $cacheFactory('httpCacheData');
};

module.exports = ['$cacheFactory', httpCacheData];
},{}],37:[function(require,module,exports){
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
},{"./AJAX":29,"./anchorSmoothScroll":30,"./authService":31,"./checkTime":32,"./covertTime":33,"./dateRange":34,"./historyRecords":35,"./httpCacheData":36,"./loading":38,"./nav":39,"./nexus":40,"./selectChecked":41,"./validate":42}],38:[function(require,module,exports){
/**
 * 显示和隐藏正在加载提示框
 *  @return {Object}
 *  show 显示加载
 *  hide 隐藏加载
 */

'use strict';


function loading($rootScope) {
    var show = function(loadingText) {
        if(!loadingText) {
            $rootScope.loadingText = '正在加载';
        } else {
            $rootScope.loadingText = loadingText;
        }
        $rootScope.showLoading = true;
    };

    var hide = function() {
        $rootScope.showLoading = false;
    };

    return {
        show: show,
        hide: hide
    }
}

module.exports = ['$rootScope', loading];



},{}],39:[function(require,module,exports){
'use strict';

module.exports =  ['$navigate',
    function($navigate) {
        return {
            slidePage: function (path, animate, reverse) {
                if(reverse) {
                    $navigate.go(path, animate, true);
                } else {
                    $navigate.go(path, animate);
                }
            },
            back: function () {
                $navigate.back();
            }
        }
    }
];

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
/**
 *  @brief  click事件后添加样式
 */

module.exports = [function() {
    return function (index, styleArr, className) {
        for(var i = 0, len = styleArr.length; i < len; i++) {
            if(i == index) {
                styleArr[i] = className;
            } else {
                styleArr[i] = '';
            }
        }
    };
}];


},{}],42:[function(require,module,exports){
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



},{}],43:[function(require,module,exports){
/**
 * @license AngularJS v1.4.7
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngRoute
 * @description
 *
 * # ngRoute
 *
 * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 *
 * <div doc-module-components="ngRoute"></div>
 */
 /* global -ngRouteModule */
var ngRouteModule = angular.module('ngRoute', ['ng']).
                        provider('$route', $RouteProvider),
    $routeMinErr = angular.$$minErr('ngRoute');

/**
 * @ngdoc provider
 * @name $routeProvider
 *
 * @description
 *
 * Used for configuring routes.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 * ## Dependencies
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 */
function $RouteProvider() {
  function inherit(parent, extra) {
    return angular.extend(Object.create(parent), extra);
  }

  var routes = {};

  /**
   * @ngdoc method
   * @name $routeProvider#when
   *
   * @param {string} path Route path (matched against `$location.path`). If `$location.path`
   *    contains redundant trailing slash or is missing one, the route will still match and the
   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the
   *    route definition.
   *
   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up
   *        to the next slash are matched and stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain named groups starting with a colon and ending with a star:
   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.
   *
   *    For example, routes like `/color/:color/largecode/:largecode*\/edit` will match
   *    `/color/brown/largecode/code/with/slashes/edit` and extract:
   *
   *    * `color: brown`
   *    * `largecode: code/with/slashes`.
   *
   *
   * @param {Object} route Mapping information to be assigned to `$route.current` on route
   *    match.
   *
   *    Object properties:
   *
   *    - `controller` – `{(string|function()=}` – Controller fn that should be associated with
   *      newly created scope or the name of a {@link angular.Module#controller registered
   *      controller} if passed as a string.
   *    - `controllerAs` – `{string=}` – An identifier name for a reference to the controller.
   *      If present, the controller will be published to scope under the `controllerAs` name.
   *    - `template` – `{string=|function()=}` – html template as a string or a function that
   *      returns an html template as a string which should be used by {@link
   *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.
   *      This property takes precedence over `templateUrl`.
   *
   *      If `template` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `templateUrl` – `{string=|function()=}` – path or function that returns a path to an html
   *      template that should be used by {@link ngRoute.directive:ngView ngView}.
   *
   *      If `templateUrl` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
   *      be injected into the controller. If any of these dependencies are promises, the router
   *      will wait for them all to be resolved or one to be rejected before the controller is
   *      instantiated.
   *      If all the promises are resolved successfully, the values of the resolved promises are
   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is
   *      fired. If any of the promises are rejected the
   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired. The map object
   *      is:
   *
   *      - `key` – `{string}`: a name of a dependency to be injected into the controller.
   *      - `factory` - `{string|function}`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is {@link auto.$injector#invoke injected}
   *        and the return value is treated as the dependency. If the result is a promise, it is
   *        resolved before its value is injected into the controller. Be aware that
   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve
   *        functions.  Use `$route.current.params` to access the new route parameters, instead.
   *
   *    - `redirectTo` – {(string|function())=} – value to update
   *      {@link ng.$location $location} path with and trigger route redirection.
   *
   *      If `redirectTo` is a function, it will be called with the following parameters:
   *
   *      - `{Object.<string>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route templateUrl.
   *      - `{string}` - current `$location.path()`
   *      - `{Object}` - current `$location.search()`
   *
   *      The custom `redirectTo` function is expected to return a string which will be used
   *      to update `$location.path()` and `$location.search()`.
   *
   *    - `[reloadOnSearch=true]` - {boolean=} - reload route when only `$location.search()`
   *      or `$location.hash()` changes.
   *
   *      If the option is set to `false` and url in the browser changes, then
   *      `$routeUpdate` event is broadcasted on the root scope.
   *
   *    - `[caseInsensitiveMatch=false]` - {boolean=} - match routes without being case sensitive
   *
   *      If the option is set to `true`, then the particular route can be matched without being
   *      case sensitive
   *
   * @returns {Object} self
   *
   * @description
   * Adds a new route definition to the `$route` service.
   */
  this.when = function(path, route) {
    //copy original route object to preserve params inherited from proto chain
    var routeCopy = angular.copy(route);
    if (angular.isUndefined(routeCopy.reloadOnSearch)) {
      routeCopy.reloadOnSearch = true;
    }
    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {
      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;
    }
    routes[path] = angular.extend(
      routeCopy,
      path && pathRegExp(path, routeCopy)
    );

    // create redirection for trailing slashes
    if (path) {
      var redirectPath = (path[path.length - 1] == '/')
            ? path.substr(0, path.length - 1)
            : path + '/';

      routes[redirectPath] = angular.extend(
        {redirectTo: path},
        pathRegExp(redirectPath, routeCopy)
      );
    }

    return this;
  };

  /**
   * @ngdoc property
   * @name $routeProvider#caseInsensitiveMatch
   * @description
   *
   * A boolean property indicating if routes defined
   * using this provider should be matched using a case insensitive
   * algorithm. Defaults to `false`.
   */
  this.caseInsensitiveMatch = false;

   /**
    * @param path {string} path
    * @param opts {Object} options
    * @return {?Object}
    *
    * @description
    * Normalizes the given path, returning a regular expression
    * and the original path.
    *
    * Inspired by pathRexp in visionmedia/express/lib/utils.js.
    */
  function pathRegExp(path, opts) {
    var insensitive = opts.caseInsensitiveMatch,
        ret = {
          originalPath: path,
          regexp: path
        },
        keys = ret.keys = [];

    path = path
      .replace(/([().])/g, '\\$1')
      .replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
        keys.push({ name: key, optional: !!optional });
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (star && '(.+?)' || '([^/]+)')
          + (optional || '')
          + ')'
          + (optional || '');
      })
      .replace(/([\/$\*])/g, '\\$1');

    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
    return ret;
  }

  /**
   * @ngdoc method
   * @name $routeProvider#otherwise
   *
   * @description
   * Sets route definition that will be used on route change when no other route definition
   * is matched.
   *
   * @param {Object|string} params Mapping information to be assigned to `$route.current`.
   * If called with a string, the value maps to `redirectTo`.
   * @returns {Object} self
   */
  this.otherwise = function(params) {
    if (typeof params === 'string') {
      params = {redirectTo: params};
    }
    this.when(null, params);
    return this;
  };


  this.$get = ['$rootScope',
               '$location',
               '$routeParams',
               '$q',
               '$injector',
               '$templateRequest',
               '$sce',
      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {

    /**
     * @ngdoc service
     * @name $route
     * @requires $location
     * @requires $routeParams
     *
     * @property {Object} current Reference to the current route definition.
     * The route definition contains:
     *
     *   - `controller`: The controller constructor as define in route definition.
     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for
     *     controller instantiation. The `locals` contain
     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:
     *
     *     - `$scope` - The current route scope.
     *     - `$template` - The current route template HTML.
     *
     * @property {Object} routes Object with all route configuration Objects as its properties.
     *
     * @description
     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).
     * It watches `$location.url()` and tries to map the path to an existing route definition.
     *
     * Requires the {@link ngRoute `ngRoute`} module to be installed.
     *
     * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.
     *
     * The `$route` service is typically used in conjunction with the
     * {@link ngRoute.directive:ngView `ngView`} directive and the
     * {@link ngRoute.$routeParams `$routeParams`} service.
     *
     * @example
     * This example shows how changing the URL hash causes the `$route` to match a route against the
     * URL, and the `ngView` pulls in the partial.
     *
     * <example name="$route-service" module="ngRouteExample"
     *          deps="angular-route.js" fixBase="true">
     *   <file name="index.html">
     *     <div ng-controller="MainController">
     *       Choose:
     *       <a href="Book/Moby">Moby</a> |
     *       <a href="Book/Moby/ch/1">Moby: Ch1</a> |
     *       <a href="Book/Gatsby">Gatsby</a> |
     *       <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
     *       <a href="Book/Scarlet">Scarlet Letter</a><br/>
     *
     *       <div ng-view></div>
     *
     *       <hr />
     *
     *       <pre>$location.path() = {{$location.path()}}</pre>
     *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>
     *       <pre>$route.current.params = {{$route.current.params}}</pre>
     *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>
     *       <pre>$routeParams = {{$routeParams}}</pre>
     *     </div>
     *   </file>
     *
     *   <file name="book.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *   </file>
     *
     *   <file name="chapter.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *     Chapter Id: {{params.chapterId}}
     *   </file>
     *
     *   <file name="script.js">
     *     angular.module('ngRouteExample', ['ngRoute'])
     *
     *      .controller('MainController', function($scope, $route, $routeParams, $location) {
     *          $scope.$route = $route;
     *          $scope.$location = $location;
     *          $scope.$routeParams = $routeParams;
     *      })
     *
     *      .controller('BookController', function($scope, $routeParams) {
     *          $scope.name = "BookController";
     *          $scope.params = $routeParams;
     *      })
     *
     *      .controller('ChapterController', function($scope, $routeParams) {
     *          $scope.name = "ChapterController";
     *          $scope.params = $routeParams;
     *      })
     *
     *     .config(function($routeProvider, $locationProvider) {
     *       $routeProvider
     *        .when('/Book/:bookId', {
     *         templateUrl: 'book.html',
     *         controller: 'BookController',
     *         resolve: {
     *           // I will cause a 1 second delay
     *           delay: function($q, $timeout) {
     *             var delay = $q.defer();
     *             $timeout(delay.resolve, 1000);
     *             return delay.promise;
     *           }
     *         }
     *       })
     *       .when('/Book/:bookId/ch/:chapterId', {
     *         templateUrl: 'chapter.html',
     *         controller: 'ChapterController'
     *       });
     *
     *       // configure html5 to get links working on jsfiddle
     *       $locationProvider.html5Mode(true);
     *     });
     *
     *   </file>
     *
     *   <file name="protractor.js" type="protractor">
     *     it('should load and compile correct template', function() {
     *       element(by.linkText('Moby: Ch1')).click();
     *       var content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: ChapterController/);
     *       expect(content).toMatch(/Book Id\: Moby/);
     *       expect(content).toMatch(/Chapter Id\: 1/);
     *
     *       element(by.partialLinkText('Scarlet')).click();
     *
     *       content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: BookController/);
     *       expect(content).toMatch(/Book Id\: Scarlet/);
     *     });
     *   </file>
     * </example>
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeStart
     * @eventType broadcast on root scope
     * @description
     * Broadcasted before a route change. At this  point the route services starts
     * resolving all of the dependencies needed for the route change to occur.
     * Typically this involves fetching the view template as well as any dependencies
     * defined in `resolve` route property. Once  all of the dependencies are resolved
     * `$routeChangeSuccess` is fired.
     *
     * The route change (and the `$location` change that triggered it) can be prevented
     * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on}
     * for more details about event object.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} next Future route information.
     * @param {Route} current Current route information.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeSuccess
     * @eventType broadcast on root scope
     * @description
     * Broadcasted after a route change has happened successfully.
     * The `resolve` dependencies are now available in the `current.locals` property.
     *
     * {@link ngRoute.directive:ngView ngView} listens for the directive
     * to instantiate the controller and render the view.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} current Current route information.
     * @param {Route|Undefined} previous Previous route information, or undefined if current is
     * first route entered.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeError
     * @eventType broadcast on root scope
     * @description
     * Broadcasted if any of the resolve promises are rejected.
     *
     * @param {Object} angularEvent Synthetic event object
     * @param {Route} current Current route information.
     * @param {Route} previous Previous route information.
     * @param {Route} rejection Rejection of the promise. Usually the error of the failed promise.
     */

    /**
     * @ngdoc event
     * @name $route#$routeUpdate
     * @eventType broadcast on root scope
     * @description
     * The `reloadOnSearch` property has been set to false, and we are reusing the same
     * instance of the Controller.
     *
     * @param {Object} angularEvent Synthetic event object
     * @param {Route} current Current/previous route information.
     */

    var forceReload = false,
        preparedRoute,
        preparedRouteIsUpdateOnly,
        $route = {
          routes: routes,

          /**
           * @ngdoc method
           * @name $route#reload
           *
           * @description
           * Causes `$route` service to reload the current route even if
           * {@link ng.$location $location} hasn't changed.
           *
           * As a result of that, {@link ngRoute.directive:ngView ngView}
           * creates new scope and reinstantiates the controller.
           */
          reload: function() {
            forceReload = true;
            $rootScope.$evalAsync(function() {
              // Don't support cancellation of a reload for now...
              prepareRoute();
              commitRoute();
            });
          },

          /**
           * @ngdoc method
           * @name $route#updateParams
           *
           * @description
           * Causes `$route` service to update the current URL, replacing
           * current route parameters with those specified in `newParams`.
           * Provided property names that match the route's path segment
           * definitions will be interpolated into the location's path, while
           * remaining properties will be treated as query params.
           *
           * @param {!Object<string, string>} newParams mapping of URL parameter names to values
           */
          updateParams: function(newParams) {
            if (this.current && this.current.$$route) {
              newParams = angular.extend({}, this.current.params, newParams);
              $location.path(interpolate(this.current.$$route.originalPath, newParams));
              // interpolate modifies newParams, only query params are left
              $location.search(newParams);
            } else {
              throw $routeMinErr('norout', 'Tried updating route when with no current route');
            }
          }
        };

    $rootScope.$on('$locationChangeStart', prepareRoute);
    $rootScope.$on('$locationChangeSuccess', commitRoute);

    return $route;

    /////////////////////////////////////////////////////

    /**
     * @param on {string} current url
     * @param route {Object} route regexp to match the url against
     * @return {?Object}
     *
     * @description
     * Check if the route matches the current url.
     *
     * Inspired by match in
     * visionmedia/express/lib/router/router.js.
     */
    function switchRouteMatcher(on, route) {
      var keys = route.keys,
          params = {};

      if (!route.regexp) return null;

      var m = route.regexp.exec(on);
      if (!m) return null;

      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        var val = m[i];

        if (key && val) {
          params[key.name] = val;
        }
      }
      return params;
    }

    function prepareRoute($locationEvent) {
      var lastRoute = $route.current;

      preparedRoute = parseRoute();
      preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route
          && angular.equals(preparedRoute.pathParams, lastRoute.pathParams)
          && !preparedRoute.reloadOnSearch && !forceReload;

      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {
        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {
          if ($locationEvent) {
            $locationEvent.preventDefault();
          }
        }
      }
    }

    function commitRoute() {
      var lastRoute = $route.current;
      var nextRoute = preparedRoute;

      if (preparedRouteIsUpdateOnly) {
        lastRoute.params = nextRoute.params;
        angular.copy(lastRoute.params, $routeParams);
        $rootScope.$broadcast('$routeUpdate', lastRoute);
      } else if (nextRoute || lastRoute) {
        forceReload = false;
        $route.current = nextRoute;
        if (nextRoute) {
          if (nextRoute.redirectTo) {
            if (angular.isString(nextRoute.redirectTo)) {
              $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params)
                       .replace();
            } else {
              $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search()))
                       .replace();
            }
          }
        }

        $q.when(nextRoute).
          then(function() {
            if (nextRoute) {
              var locals = angular.extend({}, nextRoute.resolve),
                  template, templateUrl;

              angular.forEach(locals, function(value, key) {
                locals[key] = angular.isString(value) ?
                    $injector.get(value) : $injector.invoke(value, null, null, key);
              });

              if (angular.isDefined(template = nextRoute.template)) {
                if (angular.isFunction(template)) {
                  template = template(nextRoute.params);
                }
              } else if (angular.isDefined(templateUrl = nextRoute.templateUrl)) {
                if (angular.isFunction(templateUrl)) {
                  templateUrl = templateUrl(nextRoute.params);
                }
                if (angular.isDefined(templateUrl)) {
                  nextRoute.loadedTemplateUrl = $sce.valueOf(templateUrl);
                  template = $templateRequest(templateUrl);
                }
              }
              if (angular.isDefined(template)) {
                locals['$template'] = template;
              }
              return $q.all(locals);
            }
          }).
          then(function(locals) {
            // after route change
            if (nextRoute == $route.current) {
              if (nextRoute) {
                nextRoute.locals = locals;
                angular.copy(nextRoute.params, $routeParams);
              }
              $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);
            }
          }, function(error) {
            if (nextRoute == $route.current) {
              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);
            }
          });
      }
    }


    /**
     * @returns {Object} the current active route, by matching it against the URL
     */
    function parseRoute() {
      // Match a route
      var params, match;
      angular.forEach(routes, function(route, path) {
        if (!match && (params = switchRouteMatcher($location.path(), route))) {
          match = inherit(route, {
            params: angular.extend({}, $location.search(), params),
            pathParams: params});
          match.$$route = route;
        }
      });
      // No route matched; fallback to "otherwise" route
      return match || routes[null] && inherit(routes[null], {params: {}, pathParams:{}});
    }

    /**
     * @returns {string} interpolation of the redirect path with the parameters
     */
    function interpolate(string, params) {
      var result = [];
      angular.forEach((string || '').split(':'), function(segment, i) {
        if (i === 0) {
          result.push(segment);
        } else {
          var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/);
          var key = segmentMatch[1];
          result.push(params[key]);
          result.push(segmentMatch[2] || '');
          delete params[key];
        }
      });
      return result.join('');
    }
  }];
}

ngRouteModule.provider('$routeParams', $RouteParamsProvider);


/**
 * @ngdoc service
 * @name $routeParams
 * @requires $route
 *
 * @description
 * The `$routeParams` service allows you to retrieve the current set of route parameters.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * The route parameters are a combination of {@link ng.$location `$location`}'s
 * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.
 * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.
 *
 * In case of parameter name collision, `path` params take precedence over `search` params.
 *
 * The service guarantees that the identity of the `$routeParams` object will remain unchanged
 * (but its properties will likely change) even when a route change occurs.
 *
 * Note that the `$routeParams` are only updated *after* a route change completes successfully.
 * This means that you cannot rely on `$routeParams` being correct in route resolve functions.
 * Instead you can use `$route.current.params` to access the new route's parameters.
 *
 * @example
 * ```js
 *  // Given:
 *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
 *  // Route: /Chapter/:chapterId/Section/:sectionId
 *  //
 *  // Then
 *  $routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}
 * ```
 */
function $RouteParamsProvider() {
  this.$get = function() { return {}; };
}

ngRouteModule.directive('ngView', ngViewFactory);
ngRouteModule.directive('ngView', ngViewFillContentFactory);


/**
 * @ngdoc directive
 * @name ngView
 * @restrict ECA
 *
 * @description
 * # Overview
 * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by
 * including the rendered template of the current route into the main layout (`index.html`) file.
 * Every time the current route changes, the included view changes with it according to the
 * configuration of the `$route` service.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * @animations
 * enter - animation is used to bring new content into the browser.
 * leave - animation is used to animate existing content away.
 *
 * The enter and leave animation occur concurrently.
 *
 * @scope
 * @priority 400
 * @param {string=} onload Expression to evaluate whenever the view updates.
 *
 * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll
 *                  $anchorScroll} to scroll the viewport after the view is updated.
 *
 *                  - If the attribute is not set, disable scrolling.
 *                  - If the attribute is set without value, enable scrolling.
 *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated
 *                    as an expression yields a truthy value.
 * @example
    <example name="ngView-directive" module="ngViewExample"
             deps="angular-route.js;angular-animate.js"
             animations="true" fixBase="true">
      <file name="index.html">
        <div ng-controller="MainCtrl as main">
          Choose:
          <a href="Book/Moby">Moby</a> |
          <a href="Book/Moby/ch/1">Moby: Ch1</a> |
          <a href="Book/Gatsby">Gatsby</a> |
          <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
          <a href="Book/Scarlet">Scarlet Letter</a><br/>

          <div class="view-animate-container">
            <div ng-view class="view-animate"></div>
          </div>
          <hr />

          <pre>$location.path() = {{main.$location.path()}}</pre>
          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>
          <pre>$route.current.params = {{main.$route.current.params}}</pre>
          <pre>$routeParams = {{main.$routeParams}}</pre>
        </div>
      </file>

      <file name="book.html">
        <div>
          controller: {{book.name}}<br />
          Book Id: {{book.params.bookId}}<br />
        </div>
      </file>

      <file name="chapter.html">
        <div>
          controller: {{chapter.name}}<br />
          Book Id: {{chapter.params.bookId}}<br />
          Chapter Id: {{chapter.params.chapterId}}
        </div>
      </file>

      <file name="animations.css">
        .view-animate-container {
          position:relative;
          height:100px!important;
          background:white;
          border:1px solid black;
          height:40px;
          overflow:hidden;
        }

        .view-animate {
          padding:10px;
        }

        .view-animate.ng-enter, .view-animate.ng-leave {
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;

          display:block;
          width:100%;
          border-left:1px solid black;

          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          padding:10px;
        }

        .view-animate.ng-enter {
          left:100%;
        }
        .view-animate.ng-enter.ng-enter-active {
          left:0;
        }
        .view-animate.ng-leave.ng-leave-active {
          left:-100%;
        }
      </file>

      <file name="script.js">
        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
          .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
              $routeProvider
                .when('/Book/:bookId', {
                  templateUrl: 'book.html',
                  controller: 'BookCtrl',
                  controllerAs: 'book'
                })
                .when('/Book/:bookId/ch/:chapterId', {
                  templateUrl: 'chapter.html',
                  controller: 'ChapterCtrl',
                  controllerAs: 'chapter'
                });

              $locationProvider.html5Mode(true);
          }])
          .controller('MainCtrl', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
              this.$route = $route;
              this.$location = $location;
              this.$routeParams = $routeParams;
          }])
          .controller('BookCtrl', ['$routeParams', function($routeParams) {
            this.name = "BookCtrl";
            this.params = $routeParams;
          }])
          .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
            this.name = "ChapterCtrl";
            this.params = $routeParams;
          }]);

      </file>

      <file name="protractor.js" type="protractor">
        it('should load and compile correct template', function() {
          element(by.linkText('Moby: Ch1')).click();
          var content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: ChapterCtrl/);
          expect(content).toMatch(/Book Id\: Moby/);
          expect(content).toMatch(/Chapter Id\: 1/);

          element(by.partialLinkText('Scarlet')).click();

          content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: BookCtrl/);
          expect(content).toMatch(/Book Id\: Scarlet/);
        });
      </file>
    </example>
 */


/**
 * @ngdoc event
 * @name ngView#$viewContentLoaded
 * @eventType emit on the current ngView scope
 * @description
 * Emitted every time the ngView content is reloaded.
 */
ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];
function ngViewFactory($route, $anchorScroll, $animate) {
  return {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    link: function(scope, $element, attr, ctrl, $transclude) {
        var currentScope,
            currentElement,
            previousLeaveAnimation,
            autoScrollExp = attr.autoscroll,
            onloadExp = attr.onload || '';

        scope.$on('$routeChangeSuccess', update);
        update();

        function cleanupLastView() {
          if (previousLeaveAnimation) {
            $animate.cancel(previousLeaveAnimation);
            previousLeaveAnimation = null;
          }

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }
          if (currentElement) {
            previousLeaveAnimation = $animate.leave(currentElement);
            previousLeaveAnimation.then(function() {
              previousLeaveAnimation = null;
            });
            currentElement = null;
          }
        }

        function update() {
          var locals = $route.current && $route.current.locals,
              template = locals && locals.$template;

          if (angular.isDefined(template)) {
            var newScope = scope.$new();
            var current = $route.current;

            // Note: This will also link all children of ng-view that were contained in the original
            // html. If that content contains controllers, ... they could pollute/change the scope.
            // However, using ng-view on an element with additional content does not make sense...
            // Note: We can't remove them in the cloneAttchFn of $transclude as that
            // function is called before linking the content, which would apply child
            // directives to non existing elements.
            var clone = $transclude(newScope, function(clone) {
              $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
                if (angular.isDefined(autoScrollExp)
                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                  $anchorScroll();
                }
              });
              cleanupLastView();
            });

            currentElement = clone;
            currentScope = current.scope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          } else {
            cleanupLastView();
          }
        }
    }
  };
}

// This directive is called during the $transclude call of the first `ngView` directive.
// It will replace and compile the content of the element with the loaded template.
// We need this directive so that the element content is already filled when
// the link function of another directive on the same element as ngView
// is called.
ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];
function ngViewFillContentFactory($compile, $controller, $route) {
  return {
    restrict: 'ECA',
    priority: -400,
    link: function(scope, $element) {
      var current = $route.current,
          locals = current.locals;

      $element.html(locals.$template);

      var link = $compile($element.contents());

      if (current.controller) {
        locals.$scope = scope;
        var controller = $controller(current.controller, locals);
        if (current.controllerAs) {
          scope[current.controllerAs] = controller;
        }
        $element.data('$ngControllerController', controller);
        $element.children().data('$ngControllerController', controller);
      }

      link(scope);
    }
  };
}


})(window, window.angular);

},{}],44:[function(require,module,exports){
require('./angular-route');
module.exports = 'ngRoute';

},{"./angular-route":43}],45:[function(require,module,exports){
/**
 * @license AngularJS v1.4.7
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngTouch
 * @description
 *
 * # ngTouch
 *
 * The `ngTouch` module provides touch events and other helpers for touch-enabled devices.
 * The implementation is based on jQuery Mobile touch event handling
 * ([jquerymobile.com](http://jquerymobile.com/)).
 *
 *
 * See {@link ngTouch.$swipe `$swipe`} for usage.
 *
 * <div doc-module-components="ngTouch"></div>
 *
 */

// define ngTouch module
/* global -ngTouch */
var ngTouch = angular.module('ngTouch', []);

function nodeName_(element) {
  return angular.lowercase(element.nodeName || (element[0] && element[0].nodeName));
}

/* global ngTouch: false */

    /**
     * @ngdoc service
     * @name $swipe
     *
     * @description
     * The `$swipe` service is a service that abstracts the messier details of hold-and-drag swipe
     * behavior, to make implementing swipe-related directives more convenient.
     *
     * Requires the {@link ngTouch `ngTouch`} module to be installed.
     *
     * `$swipe` is used by the `ngSwipeLeft` and `ngSwipeRight` directives in `ngTouch`, and by
     * `ngCarousel` in a separate component.
     *
     * # Usage
     * The `$swipe` service is an object with a single method: `bind`. `bind` takes an element
     * which is to be watched for swipes, and an object with four handler functions. See the
     * documentation for `bind` below.
     */

ngTouch.factory('$swipe', [function() {
  // The total distance in any direction before we make the call on swipe vs. scroll.
  var MOVE_BUFFER_RADIUS = 10;

  var POINTER_EVENTS = {
    'mouse': {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    },
    'touch': {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      cancel: 'touchcancel'
    }
  };

  function getCoordinates(event) {
    var originalEvent = event.originalEvent || event;
    var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
    var e = (originalEvent.changedTouches && originalEvent.changedTouches[0]) || touches[0];

    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  function getEvents(pointerTypes, eventType) {
    var res = [];
    angular.forEach(pointerTypes, function(pointerType) {
      var eventName = POINTER_EVENTS[pointerType][eventType];
      if (eventName) {
        res.push(eventName);
      }
    });
    return res.join(' ');
  }

  return {
    /**
     * @ngdoc method
     * @name $swipe#bind
     *
     * @description
     * The main method of `$swipe`. It takes an element to be watched for swipe motions, and an
     * object containing event handlers.
     * The pointer types that should be used can be specified via the optional
     * third argument, which is an array of strings `'mouse'` and `'touch'`. By default,
     * `$swipe` will listen for `mouse` and `touch` events.
     *
     * The four events are `start`, `move`, `end`, and `cancel`. `start`, `move`, and `end`
     * receive as a parameter a coordinates object of the form `{ x: 150, y: 310 }` and the raw
     * `event`. `cancel` receives the raw `event` as its single parameter.
     *
     * `start` is called on either `mousedown` or `touchstart`. After this event, `$swipe` is
     * watching for `touchmove` or `mousemove` events. These events are ignored until the total
     * distance moved in either dimension exceeds a small threshold.
     *
     * Once this threshold is exceeded, either the horizontal or vertical delta is greater.
     * - If the horizontal distance is greater, this is a swipe and `move` and `end` events follow.
     * - If the vertical distance is greater, this is a scroll, and we let the browser take over.
     *   A `cancel` event is sent.
     *
     * `move` is called on `mousemove` and `touchmove` after the above logic has determined that
     * a swipe is in progress.
     *
     * `end` is called when a swipe is successfully completed with a `touchend` or `mouseup`.
     *
     * `cancel` is called either on a `touchcancel` from the browser, or when we begin scrolling
     * as described above.
     *
     */
    bind: function(element, eventHandlers, pointerTypes) {
      // Absolute total movement, used to control swipe vs. scroll.
      var totalX, totalY;
      // Coordinates of the start position.
      var startCoords;
      // Last event's position.
      var lastPos;
      // Whether a swipe is active.
      var active = false;

      pointerTypes = pointerTypes || ['mouse', 'touch'];
      element.on(getEvents(pointerTypes, 'start'), function(event) {
        startCoords = getCoordinates(event);
        active = true;
        totalX = 0;
        totalY = 0;
        lastPos = startCoords;
        eventHandlers['start'] && eventHandlers['start'](startCoords, event);
      });
      var events = getEvents(pointerTypes, 'cancel');
      if (events) {
        element.on(events, function(event) {
          active = false;
          eventHandlers['cancel'] && eventHandlers['cancel'](event);
        });
      }

      element.on(getEvents(pointerTypes, 'move'), function(event) {
        if (!active) return;

        // Android will send a touchcancel if it thinks we're starting to scroll.
        // So when the total distance (+ or - or both) exceeds 10px in either direction,
        // we either:
        // - On totalX > totalY, we send preventDefault() and treat this as a swipe.
        // - On totalY > totalX, we let the browser handle it as a scroll.

        if (!startCoords) return;
        var coords = getCoordinates(event);

        totalX += Math.abs(coords.x - lastPos.x);
        totalY += Math.abs(coords.y - lastPos.y);

        lastPos = coords;

        if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
          return;
        }

        // One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
        if (totalY > totalX) {
          // Allow native scrolling to take over.
          active = false;
          eventHandlers['cancel'] && eventHandlers['cancel'](event);
          return;
        } else {
          // Prevent the browser from scrolling.
          event.preventDefault();
          eventHandlers['move'] && eventHandlers['move'](coords, event);
        }
      });

      element.on(getEvents(pointerTypes, 'end'), function(event) {
        if (!active) return;
        active = false;
        eventHandlers['end'] && eventHandlers['end'](getCoordinates(event), event);
      });
    }
  };
}]);

/* global ngTouch: false,
  nodeName_: false
*/

/**
 * @ngdoc directive
 * @name ngClick
 *
 * @description
 * A more powerful replacement for the default ngClick designed to be used on touchscreen
 * devices. Most mobile browsers wait about 300ms after a tap-and-release before sending
 * the click event. This version handles them immediately, and then prevents the
 * following click event from propagating.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * This directive can fall back to using an ordinary click event, and so works on desktop
 * browsers as well as mobile.
 *
 * This directive also sets the CSS class `ng-click-active` while the element is being held
 * down (by a mouse click or touch) so you can restyle the depressed element if you wish.
 *
 * @element ANY
 * @param {expression} ngClick {@link guide/expression Expression} to evaluate
 * upon tap. (Event object is available as `$event`)
 *
 * @example
    <example module="ngClickExample" deps="angular-touch.js">
      <file name="index.html">
        <button ng-click="count = count + 1" ng-init="count=0">
          Increment
        </button>
        count: {{ count }}
      </file>
      <file name="script.js">
        angular.module('ngClickExample', ['ngTouch']);
      </file>
    </example>
 */

ngTouch.config(['$provide', function($provide) {
  $provide.decorator('ngClickDirective', ['$delegate', function($delegate) {
    // drop the default ngClick directive
    $delegate.shift();
    return $delegate;
  }]);
}]);

ngTouch.directive('ngClick', ['$parse', '$timeout', '$rootElement',
    function($parse, $timeout, $rootElement) {
  var TAP_DURATION = 750; // Shorter than 750ms is a tap, longer is a taphold or drag.
  var MOVE_TOLERANCE = 12; // 12px seems to work in most mobile browsers.
  var PREVENT_DURATION = 2500; // 2.5 seconds maximum from preventGhostClick call to click
  var CLICKBUSTER_THRESHOLD = 25; // 25 pixels in any dimension is the limit for busting clicks.

  var ACTIVE_CLASS_NAME = 'ng-click-active';
  var lastPreventedTime;
  var touchCoordinates;
  var lastLabelClickCoordinates;


  // TAP EVENTS AND GHOST CLICKS
  //
  // Why tap events?
  // Mobile browsers detect a tap, then wait a moment (usually ~300ms) to see if you're
  // double-tapping, and then fire a click event.
  //
  // This delay sucks and makes mobile apps feel unresponsive.
  // So we detect touchstart, touchcancel and touchend ourselves and determine when
  // the user has tapped on something.
  //
  // What happens when the browser then generates a click event?
  // The browser, of course, also detects the tap and fires a click after a delay. This results in
  // tapping/clicking twice. We do "clickbusting" to prevent it.
  //
  // How does it work?
  // We attach global touchstart and click handlers, that run during the capture (early) phase.
  // So the sequence for a tap is:
  // - global touchstart: Sets an "allowable region" at the point touched.
  // - element's touchstart: Starts a touch
  // (- touchcancel ends the touch, no click follows)
  // - element's touchend: Determines if the tap is valid (didn't move too far away, didn't hold
  //   too long) and fires the user's tap handler. The touchend also calls preventGhostClick().
  // - preventGhostClick() removes the allowable region the global touchstart created.
  // - The browser generates a click event.
  // - The global click handler catches the click, and checks whether it was in an allowable region.
  //     - If preventGhostClick was called, the region will have been removed, the click is busted.
  //     - If the region is still there, the click proceeds normally. Therefore clicks on links and
  //       other elements without ngTap on them work normally.
  //
  // This is an ugly, terrible hack!
  // Yeah, tell me about it. The alternatives are using the slow click events, or making our users
  // deal with the ghost clicks, so I consider this the least of evils. Fortunately Angular
  // encapsulates this ugly logic away from the user.
  //
  // Why not just put click handlers on the element?
  // We do that too, just to be sure. If the tap event caused the DOM to change,
  // it is possible another element is now in that position. To take account for these possibly
  // distinct elements, the handlers are global and care only about coordinates.

  // Checks if the coordinates are close enough to be within the region.
  function hit(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) < CLICKBUSTER_THRESHOLD && Math.abs(y1 - y2) < CLICKBUSTER_THRESHOLD;
  }

  // Checks a list of allowable regions against a click location.
  // Returns true if the click should be allowed.
  // Splices out the allowable region from the list after it has been used.
  function checkAllowableRegions(touchCoordinates, x, y) {
    for (var i = 0; i < touchCoordinates.length; i += 2) {
      if (hit(touchCoordinates[i], touchCoordinates[i + 1], x, y)) {
        touchCoordinates.splice(i, i + 2);
        return true; // allowable region
      }
    }
    return false; // No allowable region; bust it.
  }

  // Global click handler that prevents the click if it's in a bustable zone and preventGhostClick
  // was called recently.
  function onClick(event) {
    if (Date.now() - lastPreventedTime > PREVENT_DURATION) {
      return; // Too old.
    }

    var touches = event.touches && event.touches.length ? event.touches : [event];
    var x = touches[0].clientX;
    var y = touches[0].clientY;
    // Work around desktop Webkit quirk where clicking a label will fire two clicks (on the label
    // and on the input element). Depending on the exact browser, this second click we don't want
    // to bust has either (0,0), negative coordinates, or coordinates equal to triggering label
    // click event
    if (x < 1 && y < 1) {
      return; // offscreen
    }
    if (lastLabelClickCoordinates &&
        lastLabelClickCoordinates[0] === x && lastLabelClickCoordinates[1] === y) {
      return; // input click triggered by label click
    }
    // reset label click coordinates on first subsequent click
    if (lastLabelClickCoordinates) {
      lastLabelClickCoordinates = null;
    }
    // remember label click coordinates to prevent click busting of trigger click event on input
    if (nodeName_(event.target) === 'label') {
      lastLabelClickCoordinates = [x, y];
    }

    // Look for an allowable region containing this click.
    // If we find one, that means it was created by touchstart and not removed by
    // preventGhostClick, so we don't bust it.
    if (checkAllowableRegions(touchCoordinates, x, y)) {
      return;
    }

    // If we didn't find an allowable region, bust the click.
    event.stopPropagation();
    event.preventDefault();

    // Blur focused form elements
    event.target && event.target.blur && event.target.blur();
  }


  // Global touchstart handler that creates an allowable region for a click event.
  // This allowable region can be removed by preventGhostClick if we want to bust it.
  function onTouchStart(event) {
    var touches = event.touches && event.touches.length ? event.touches : [event];
    var x = touches[0].clientX;
    var y = touches[0].clientY;
    touchCoordinates.push(x, y);

    $timeout(function() {
      // Remove the allowable region.
      for (var i = 0; i < touchCoordinates.length; i += 2) {
        if (touchCoordinates[i] == x && touchCoordinates[i + 1] == y) {
          touchCoordinates.splice(i, i + 2);
          return;
        }
      }
    }, PREVENT_DURATION, false);
  }

  // On the first call, attaches some event handlers. Then whenever it gets called, it creates a
  // zone around the touchstart where clicks will get busted.
  function preventGhostClick(x, y) {
    if (!touchCoordinates) {
      $rootElement[0].addEventListener('click', onClick, true);
      $rootElement[0].addEventListener('touchstart', onTouchStart, true);
      touchCoordinates = [];
    }

    lastPreventedTime = Date.now();

    checkAllowableRegions(touchCoordinates, x, y);
  }

  // Actual linking function.
  return function(scope, element, attr) {
    var clickHandler = $parse(attr.ngClick),
        tapping = false,
        tapElement,  // Used to blur the element after a tap.
        startTime,   // Used to check if the tap was held too long.
        touchStartX,
        touchStartY;

    function resetState() {
      tapping = false;
      element.removeClass(ACTIVE_CLASS_NAME);
    }

    element.on('touchstart', function(event) {
      tapping = true;
      tapElement = event.target ? event.target : event.srcElement; // IE uses srcElement.
      // Hack for Safari, which can target text nodes instead of containers.
      if (tapElement.nodeType == 3) {
        tapElement = tapElement.parentNode;
      }

      element.addClass(ACTIVE_CLASS_NAME);

      startTime = Date.now();

      // Use jQuery originalEvent
      var originalEvent = event.originalEvent || event;
      var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
      var e = touches[0];
      touchStartX = e.clientX;
      touchStartY = e.clientY;
    });

    element.on('touchcancel', function(event) {
      resetState();
    });

    element.on('touchend', function(event) {
      var diff = Date.now() - startTime;

      // Use jQuery originalEvent
      var originalEvent = event.originalEvent || event;
      var touches = (originalEvent.changedTouches && originalEvent.changedTouches.length) ?
          originalEvent.changedTouches :
          ((originalEvent.touches && originalEvent.touches.length) ? originalEvent.touches : [originalEvent]);
      var e = touches[0];
      var x = e.clientX;
      var y = e.clientY;
      var dist = Math.sqrt(Math.pow(x - touchStartX, 2) + Math.pow(y - touchStartY, 2));

      if (tapping && diff < TAP_DURATION && dist < MOVE_TOLERANCE) {
        // Call preventGhostClick so the clickbuster will catch the corresponding click.
        preventGhostClick(x, y);

        // Blur the focused element (the button, probably) before firing the callback.
        // This doesn't work perfectly on Android Chrome, but seems to work elsewhere.
        // I couldn't get anything to work reliably on Android Chrome.
        if (tapElement) {
          tapElement.blur();
        }

        if (!angular.isDefined(attr.disabled) || attr.disabled === false) {
          element.triggerHandler('click', [event]);
        }
      }

      resetState();
    });

    // Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
    // something else nearby.
    element.onclick = function(event) { };

    // Actual click handler.
    // There are three different kinds of clicks, only two of which reach this point.
    // - On desktop browsers without touch events, their clicks will always come here.
    // - On mobile browsers, the simulated "fast" click will call this.
    // - But the browser's follow-up slow click will be "busted" before it reaches this handler.
    // Therefore it's safe to use this directive on both mobile and desktop.
    element.on('click', function(event, touchend) {
      scope.$apply(function() {
        clickHandler(scope, {$event: (touchend || event)});
      });
    });

    element.on('mousedown', function(event) {
      element.addClass(ACTIVE_CLASS_NAME);
    });

    element.on('mousemove mouseup', function(event) {
      element.removeClass(ACTIVE_CLASS_NAME);
    });

  };
}]);

/* global ngTouch: false */

/**
 * @ngdoc directive
 * @name ngSwipeLeft
 *
 * @description
 * Specify custom behavior when an element is swiped to the left on a touchscreen device.
 * A leftward swipe is a quick, right-to-left slide of the finger.
 * Though ngSwipeLeft is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * To disable the mouse click and drag functionality, add `ng-swipe-disable-mouse` to
 * the `ng-swipe-left` or `ng-swipe-right` DOM Element.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeLeft {@link guide/expression Expression} to evaluate
 * upon left swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeLeftExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeLeftExample', ['ngTouch']);
      </file>
    </example>
 */

/**
 * @ngdoc directive
 * @name ngSwipeRight
 *
 * @description
 * Specify custom behavior when an element is swiped to the right on a touchscreen device.
 * A rightward swipe is a quick, left-to-right slide of the finger.
 * Though ngSwipeRight is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeRight {@link guide/expression Expression} to evaluate
 * upon right swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeRightExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeRightExample', ['ngTouch']);
      </file>
    </example>
 */

function makeSwipeDirective(directiveName, direction, eventName) {
  ngTouch.directive(directiveName, ['$parse', '$swipe', function($parse, $swipe) {
    // The maximum vertical delta for a swipe should be less than 75px.
    var MAX_VERTICAL_DISTANCE = 75;
    // Vertical distance should not be more than a fraction of the horizontal distance.
    var MAX_VERTICAL_RATIO = 0.3;
    // At least a 30px lateral motion is necessary for a swipe.
    var MIN_HORIZONTAL_DISTANCE = 30;

    return function(scope, element, attr) {
      var swipeHandler = $parse(attr[directiveName]);

      var startCoords, valid;

      function validSwipe(coords) {
        // Check that it's within the coordinates.
        // Absolute vertical distance must be within tolerances.
        // Horizontal distance, we take the current X - the starting X.
        // This is negative for leftward swipes and positive for rightward swipes.
        // After multiplying by the direction (-1 for left, +1 for right), legal swipes
        // (ie. same direction as the directive wants) will have a positive delta and
        // illegal ones a negative delta.
        // Therefore this delta must be positive, and larger than the minimum.
        if (!startCoords) return false;
        var deltaY = Math.abs(coords.y - startCoords.y);
        var deltaX = (coords.x - startCoords.x) * direction;
        return valid && // Short circuit for already-invalidated swipes.
            deltaY < MAX_VERTICAL_DISTANCE &&
            deltaX > 0 &&
            deltaX > MIN_HORIZONTAL_DISTANCE &&
            deltaY / deltaX < MAX_VERTICAL_RATIO;
      }

      var pointerTypes = ['touch'];
      if (!angular.isDefined(attr['ngSwipeDisableMouse'])) {
        pointerTypes.push('mouse');
      }
      $swipe.bind(element, {
        'start': function(coords, event) {
          startCoords = coords;
          valid = true;
        },
        'cancel': function(event) {
          valid = false;
        },
        'end': function(coords, event) {
          if (validSwipe(coords)) {
            scope.$apply(function() {
              element.triggerHandler(eventName);
              swipeHandler(scope, {$event: event});
            });
          }
        }
      }, pointerTypes);
    };
  }]);
}

// Left is negative X-coordinate, right is positive.
makeSwipeDirective('ngSwipeLeft', -1, 'swipeleft');
makeSwipeDirective('ngSwipeRight', 1, 'swiperight');



})(window, window.angular);

},{}],46:[function(require,module,exports){
require('./angular-touch');
module.exports = 'ngTouch';

},{"./angular-touch":45}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0FkbWluaXN0cmF0b3IvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC5qcyIsImNvbnRyb2xsZXJzL2NvdXBvbkN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2luZGV4LmpzIiwiY29udHJvbGxlcnMvbWFpbkN0cmwuanMiLCJkaXJlY3RpdmVzL2FuaW1hdGVkQm90dG9tLmpzIiwiZGlyZWN0aXZlcy9kYXRlVGFibGUuanMiLCJkaXJlY3RpdmVzL2luZGV4LmpzIiwiZGlyZWN0aXZlcy9pbmZpbml0ZVNjcm9sbC5qcyIsImRpcmVjdGl2ZXMvaW5wdXRDbGVhci5qcyIsImRpcmVjdGl2ZXMvbWFrZUNhbGwuanMiLCJkaXJlY3RpdmVzL3RpbWVsZWZ0LmpzIiwiZGlyZWN0aXZlcy91aUxvYWRpbmcuanMiLCJkaXJlY3RpdmVzL3VpTW9kYWwuanMiLCJmaWx0ZXJzL2NoYW5nZURhdGUuanMiLCJmaWx0ZXJzL2RlbGV0ZUJsYW5rLmpzIiwiZmlsdGVycy9pbmRleC5qcyIsImZpbHRlcnMvbXVsdGlGaWx0ZXIuanMiLCJmaWx0ZXJzL3RvVGltZURpdmlzaW9uLmpzIiwiZmlsdGVycy90b1dlZWsuanMiLCJsaWJzL21vYmlsZS1uYXYuanMiLCJsaWJzL25nU3RvcmFnZS5taW4uanMiLCJtb2R1bGVzL1RvdWNoU2xpZGUuMS4xLmpzIiwib25fY29uZmlnLmpzIiwib25fcnVuLmpzIiwicHJvdmlkZXIvaW5kZXguanMiLCJzZXJ2aWNlcy9BSkFYLmpzIiwic2VydmljZXMvYW5jaG9yU21vb3RoU2Nyb2xsLmpzIiwic2VydmljZXMvYXV0aFNlcnZpY2UuanMiLCJzZXJ2aWNlcy9jaGVja1RpbWUuanMiLCJzZXJ2aWNlcy9jb3ZlcnRUaW1lLmpzIiwic2VydmljZXMvZGF0ZVJhbmdlLmpzIiwic2VydmljZXMvaGlzdG9yeVJlY29yZHMuanMiLCJzZXJ2aWNlcy9odHRwQ2FjaGVEYXRhLmpzIiwic2VydmljZXMvaW5kZXguanMiLCJzZXJ2aWNlcy9sb2FkaW5nLmpzIiwic2VydmljZXMvbmF2LmpzIiwic2VydmljZXMvbmV4dXMuanMiLCJzZXJ2aWNlcy9zZWxlY3RDaGVja2VkLmpzIiwic2VydmljZXMvdmFsaWRhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZS9hbmd1bGFyLXJvdXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGUvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci10b3VjaC9hbmd1bGFyLXRvdWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItdG91Y2gvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hiQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvOUJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BuQkE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuXG5cblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgcmVxdWlyZSgnYW5ndWxhci1yb3V0ZScpLFxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItdG91Y2gnKSxcblxuICAgIHJlcXVpcmUoJy4vbGlicy9tb2JpbGUtbmF2JykubmFtZSxcbiAgICByZXF1aXJlKCcuL2xpYnMvbmdTdG9yYWdlLm1pbicpLm5hbWUsXG5cbiAgICByZXF1aXJlKCcuL3Byb3ZpZGVyJykubmFtZSxcbiAgICByZXF1aXJlKCcuL2RpcmVjdGl2ZXMnKS5uYW1lLFxuICAgIHJlcXVpcmUoJy4vc2VydmljZXMnKS5uYW1lLFxuICAgIHJlcXVpcmUoJy4vZmlsdGVycycpLm5hbWUsXG4gICAgcmVxdWlyZSgnLi9jb250cm9sbGVycycpLm5hbWVcbl0pXG4uY29uc3RhbnQoJ3ZlcnNpb24nLCAnMC4xJylcbi5jb25maWcocmVxdWlyZSgnLi9vbl9jb25maWcnKSlcbi5ydW4ocmVxdWlyZSgnLi9vbl9ydW4nKSlcblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBbJyRzY29wZScsICckdGltZW91dCcsICckc2Vzc2lvblN0b3JhZ2UnLCAnbmV4dXMnLCAnbmF2JywgJ2xvYWRpbmcnLCAnQUpBWCcsICdkYXRlUmFuZ2UnLCAnYXV0aFNlcnZpY2UnLCAnc2VsZWN0Q2hlY2tlZCcsXG4gICAgZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRzZXNzaW9uU3RvcmFnZSwgbmV4dXMsIG5hdiwgbG9hZGluZywgQUpBWCwgZGF0ZVJhbmdlLCBhdXRoU2VydmljZSwgIHNlbGVjdENoZWNrZWQpIHtcblxuICAgIH1cbl07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJyxcbiAgICBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cbiAgICAgICAgXG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG5cblxuICAgICAgICBmdW5jdGlvbiBzbGlkZUJhbm5lcjIoKSB7XG4gICAgICAgICAgICB2YXIgVG91Y2hTbGlkZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvVG91Y2hTbGlkZS4xLjEnKTtcbiAgICAgICAgICAgIFRvdWNoU2xpZGUoe1xuICAgICAgICAgICAgICAgIHNsaWRlQ2VsbDogXCIjc2xpZGVCb3hcIixcbiAgICAgICAgICAgICAgICB0aXRDZWxsOiBcIiNidG5Db250YWluZXIgdWxcIiwgLy/lvIDlkK/oh6rliqjliIbpobUgYXV0b1BhZ2U6dHJ1ZSDvvIzmraTml7borr7nva4gdGl0Q2VsbCDkuLrlr7zoiKrlhYPntKDljIXoo7nlsYJcbiAgICAgICAgICAgICAgICBtYWluQ2VsbDogXCIjcGljQ29udGFpbmVyIHVsXCIsXG4gICAgICAgICAgICAgICAgZWZmZWN0OlwibGVmdExvb3BcIixcbiAgICAgICAgICAgICAgICBkZWxheVRpbWU6IDEwMDAsICAvL+avq+enku+8m+WIh+aNouaViOaenOaMgee7reaXtumXtO+8iOaJp+ihjOS4gOasoeaViOaenOeUqOWkmuWwkeavq+enku+8ieOAglxuICAgICAgICAgICAgICAgIGludGVyVGltZTogNTAwMCwgLy/mr6vnp5LvvJvoh6rliqjov5DooYzpl7TpmpTvvIjpmpTlpJrlsJHmr6vnp5LlkI7miafooYzkuIvkuIDkuKrmlYjmnpzvvIlcbiAgICAgICAgICAgICAgICBhdXRvUGxheTp0cnVlLC8v6Ieq5Yqo5pKt5pS+XG4gICAgICAgICAgICAgICAgYXV0b1BhZ2U6dHJ1ZSAvL+iHquWKqOWIhumhtVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuXG5cblxuICAgICAgICB2YXIgc2hvd0Jhbm5lciA9IGZ1bmN0aW9uIChhZHZzKSB7XG4gICAgICAgICAgICB2YXIgaHRtbFN0ciA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFkdnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sU3RyICs9XG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8bGk+PGEgY2xhc3M9XCJwaWNcIj48aW1nIGNsYXNzPVwiYWR2UGljXCIgc3JjPVwie3tpbWFnZVVybH19XCIgIG9uZXJyb3I9XFxcInRoaXMuc3JjPVxcJ1xcJ1xcXCIgIC8+PC9hPjwvbGk+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2ltYWdlTmFtZX19JywgYWR2c1tpXS5pbWFnZU5hbWUpLnJlcGxhY2UoJ3t7cmVkaXJlY3RVcmx9fScsIGFkdnNbaV0ucmVkaXJlY3RVcmwpLnJlcGxhY2UoJ3t7aW1hZ2VVcmx9fScsIGFkdnNbaV0uaW1hZ2VVcmwpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWR2Qm94JykuaW5uZXJIVE1MID0gaHRtbFN0cjtcbiAgICAgICAgICAgIGlmIChhZHZzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgVG91Y2hTbGlkZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvVG91Y2hTbGlkZS4xLjEnKTtcbiAgICAgICAgICAgICAgICBUb3VjaFNsaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDZWxsOiBcIiNzbGlkZUJveFwiLFxuICAgICAgICAgICAgICAgICAgICB0aXRDZWxsOiBcIiNidG5Db250YWluZXIgdWxcIiwgLy/lvIDlkK/oh6rliqjliIbpobUgYXV0b1BhZ2U6dHJ1ZSDvvIzmraTml7borr7nva4gdGl0Q2VsbCDkuLrlr7zoiKrlhYPntKDljIXoo7nlsYJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkNlbGw6IFwiI3BpY0NvbnRhaW5lciB1bFwiLFxuICAgICAgICAgICAgICAgICAgICBlZmZlY3Q6IFwibGVmdExvb3BcIixcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJUaW1lOiAzMDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvUGFnZTogdHJ1ZSwvL+iHquWKqOWIhumhtVxuICAgICAgICAgICAgICAgICAgICBhdXRvUGxheTogdHJ1ZSAvL+iHquWKqOaSreaUvlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG5cblxuXG5cbiAgICAgICAgdmFyIGFkdlJlcXVlc3Q7XG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlQmFubmVyKCkge1xuICAgICAgICAgICAgdmFyIHBpY0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaWNDb250YWluZXInKTtcbiAgICAgICAgICAgIC8vaWYgKCEkdGhpcy5hZHZzKSB7XG4gICAgICAgICAgICBnZXRCdXNhZHZwaWN0dXJlKCk7XG4gICAgICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICBwaWNDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJHRoaXMuYmFubmVySGVpZ2h0O1xuICAgICAgICAgICAgLy8gICAgc2hvd0Jhbm5lcigkdGhpcy5hZHZzKVxuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJ1c2FkdnBpY3R1cmUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwicmVzcG9uc2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWFkZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicnNwVHlwZVwiOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJzcENvZGVcIjogXCIwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyc3BEZXNjXCI6IFwi5p+l6K+i5oiQ5YqfXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvZHlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWR2ZXJ0aXNtZW50TGlzdFwiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGljZVVybFR5cGVcIjogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkaXJlY3RVcmxcIjogXCJodHRwOi8vaW1nMS40MDAxNy5jbi90b3VjaC9uZXdwcm9qZWN0L3RyYWZmaWMvaHRtbC9uYXRpb25hbERheV8yLmh0bWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbWFnZU5hbWVcIjogXCLnp5/ovabnq4vlh482NuWFg+a0u+WKqFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImltYWdlVXJsXCI6IFwiaHR0cDovL2ltZzEuNDAwMTcuY24vdG91Y2gvbmV3cHJvamVjdC90cmFmZmljL2ltZy9pNl82NmJhbm5lcl9sYXJnZV9pb3MucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnXCI6IFwidjc2MXY3NzB2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGljZVVybFR5cGVcIjogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZGlyZWN0VXJsXCI6IFwiaHR0cDovL2ltZzEuNDAwMTcuY24vdG91Y2gvbmV3cHJvamVjdC90cmFmZmljL2h0bWwvenVjaGUuaHRtbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbWFnZU5hbWVcIjogXCLoh6rpqb7np5/ovaYxMeWFg+eWr+enklwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbWFnZVVybFwiOiBcImh0dHA6Ly9ndW9xaW5nMjAxMy5mcmVlM3YubmV0L21hcmtkb3duL2FfNzAwXzE2XzBfMTQxMTA3MTAyODMyX2xhcmdlLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdcIjogXCJ2NzUxdjE3MTZ2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWNlVXJsVHlwZVwiOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkaXJlY3RVcmxcIjogXCJodHRwOi8vaW1nMS40MDAxNy5jbi90b3VjaC9uZXdwcm9qZWN0L3RyYWZmaWMvaHRtbC9CYW5KaWEuaHRtbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbWFnZU5hbWVcIjogXCLlkIznqIvmjqXpgIHmnLogMTEuMTHljYrku7fnlq/miqJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1hZ2VVcmxcIjogXCJodHRwOi8vZ3VvcWluZzIwMTMuZnJlZTN2Lm5ldC9tYXJrZG93bi9hXzcwMF8xNl8wXzE0MTEwNzE4MTQxNl9sYXJnZS5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnXCI6IFwidjc1MXYxNzg4dlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcnNwQ29kZSA9IGRhdGEucmVzcG9uc2UuaGVhZGVyLnJzcENvZGU7XG4gICAgICAgICAgICAgICAgaWYgKHJzcENvZGUgPT0gJzAwMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmFkdnMgPSBkYXRhLnJlc3BvbnNlLmJvZHkuYWR2ZXJ0aXNtZW50TGlzdDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0ltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBuZXdJbWcuc3JjID0gJHRoaXMuYWR2c1swXS5pbWFnZVVybDtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3R1YWxIZWlnaHQgPSBNYXRoLnJvdW5kKHBpY0NvbnRhaW5lci5vZmZzZXRXaWR0aCAqIG5ld0ltZy5oZWlnaHQgLyBuZXdJbWcud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGljQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FuaS1iYW5uZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmJhbm5lckhlaWdodCA9IHBpY0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBhY3R1YWxIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Jhbm5lcigkdGhpcy5hZHZzKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBuZXdJbWcub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmJhbm5lckhlaWdodCA9IHBpY0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnaW5oZXJpdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93QmFubmVyKCR0aGlzLmFkdnMpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvL3RoZSByZWFkeSBldmVudCBvZiB0aGUgRE9NIGlzIHRyaWdnZXJlZCBhZnRlciBBbmd1bGFyIGxvYWRzIHRoZSB2aWV3XG4gICAgICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNsaWRlQmFubmVyMigpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgLy9yZXNvbHZlIHRoZSBwcm9taXNlIHdoZW4gc2NvcGUgZGVzdHJveVxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuaXNPYmplY3QoYWR2UmVxdWVzdCkpIHtcbiAgICAgICAgICAgICAgICBhZHZSZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZGVsZXRlICRsb2NhdGlvbi4kJHNlYXJjaC5kZXBhcnR1cmVDaXR5O1xuICAgICAgICAgICAgLy9kZWxldGUgJGxvY2F0aW9uLiQkc2VhcmNoLmFycml2YWxDaXR5O1xuICAgICAgICAgICAgLy/liKDpmaR1cmznmoRwYXJhbXNcbiAgICAgICAgICAgIC8vJGxvY2F0aW9uLiQkc2VhcmNoID0ge307XG4gICAgICAgIH0pO1xuXG5cblxuXG5cbiAgICAgICAgcmV0dXJuICRzY29wZS5ob21lQ3RybCA9ICR0aGlzO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgICB9XG5dO1xuIiwidmFyIGNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFtdKTtcblxuY29udHJvbGxlcnNcbiAgICAuY29udHJvbGxlcignbWFpbkN0cmwnLCByZXF1aXJlKCcuL21haW5DdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ2hvbWVDdHJsJywgcmVxdWlyZSgnLi9ob21lQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdpbnRlZ3JhbE1hbGxDdHJsJywgcmVxdWlyZSgnLi9pbnRlZ3JhbE1hbGxDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ2NvdXBvbkN0cmwnLCByZXF1aXJlKCcuL2NvdXBvbkN0cmwnKSlcbiAgICAuY29udHJvbGxlcignY291cG9uRGV0YWlsQ3RybCcsIHJlcXVpcmUoJy4vY291cG9uRGV0YWlsQ3RybCcpKVxuO1xubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyczsiLCIndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBbJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJyR3aW5kb3cnLCAnJHRpbWVvdXQnLCAnJGxvY2FsU3RvcmFnZScsICduYXYnLCAnJG5hdmlnYXRlJyxcbiAgICBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkd2luZG93LCAkdGltZW91dCwgJGxvY2FsU3RvcmFnZSwgbmF2LCAkbmF2aWdhdGUpIHtcblxuICAgICAgICAvLyDliIfmjaLpobXpnaJcbiAgICAgICAgJHNjb3BlLnNsaWRlUGFnZSA9IGZ1bmN0aW9uIChwYXRoLCBhbmltYXRlLCByZXZlcnNlKSB7XG4gICAgICAgICAgICBuYXYuc2xpZGVQYWdlKHBhdGgsIGFuaW1hdGUsIHJldmVyc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8v5ZCO6YCAXG4gICAgICAgICRzY29wZS5iYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbmF2LmJhY2soKTtcbiAgICAgICAgfTtcblxuXG5cblxuICAgIH1cbl07IiwibW9kdWxlLmV4cG9ydHMgPSBbIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRZID0gMCxcbiAgICAgICAgICAgICAgICAgICAgZW5kWSAgPSAwO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAxKSBzdGFydFkgPSBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDEpIHsgZW5kWSA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO31cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmUgPSBNYXRoLnJvdW5kKGVuZFkgLSBzdGFydFkpOyAgLy/np7vliqjnmoTot53nprtcbiAgICAgICAgICAgICAgICAgICAgaWYobW92ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5hbmltYXRlZEJvdHRvbSA9ICdzaG93LWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5hbmltYXRlZEJvdHRvbSA9ICdoaWRlLWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICBlbmRZICA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnVuYmluZCgndG91Y2hzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnVuYmluZCgndG91Y2htb3ZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudW5iaW5kKCd0b3VjaGVuZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gW1xyXG4gICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyOiBcIj1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5U3BhbiA9IGF0dHJzLmRheVNwYW4sIERBVEUgPSBhdHRycy5kYXRlLCBuZ0NsaWNrID0gYXR0cnMubmdDbGljaywgZWxlID0gZWxlbWVudFswXTtcclxuICAgICAgICAgICAgICAgIGRheVNwYW4gJiYgKGRheVNwYW4gPSBwYXJzZUludChkYXlTcGFuKSk7XHJcbiAgICAgICAgICAgICAgICAoc2NvcGUuY2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoZWxlKSkuc2V0U2VsZWN0ZWQoREFURSk7XHJcbiAgICAgICAgICAgICAgICAvL2luaXQgZGF0ZSBmb3IgYm94IHdyYXBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIENhbGVuZGFyKHdyYXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkID0gZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGUgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGRbZGF0YS12YWx1ZT1cIicgKyBkYXRlICsgJ1wiXScpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGUuaGFzQ2xhc3MoJ2FibGVkJykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmhhc0NsYXNzKCdhYmxlZCcpICYmIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZC5zZWxlY3RlZCcpKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKSAmJiBlbGUuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKHdyYXAuZGF0YXNldC5kYXRlTGFiZWwgPSBkYXRlKSAmJiAod3JhcC5kYXRhc2V0LmRhdGVMYWJlbCA9IChlbGUuaGFzQ2xhc3MoJ2RheS1sYWJlbCcpID8gZWxlLmNoaWxkcmVuKClbMF0uaW5uZXJIVE1MIDogZmFsc2UpIHx8ICgn5ZGoJyArIGRheUluV2Vla1tuZXcgRGF0ZShkYXRlKS5nZXREYXkoKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksIHRvZGF5ID0gW25vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSArIDEsIG5vdy5nZXREYXRlKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyVG1wID0gJzxkaXYgIGRhdGEteWVhci1tb250aCA9IFwie3t5ZWFyfX0te3ttb250aH19XCIgY2xhc3M9XCJ0ZXh0LWNlbnRlciBjb2xvci1ibGFja1wiPjxwIGNsYXNzPVwiZW0xZDJcIj57e3llYXJ9feW5tHt7c2hvd01vbnRofX3mnIg8L3A+PHRhYmxlPjx0aGVhZD48dHI+e3t0aXRsZUFycn19PC90cj48L3RoZWFkPjx0Ym9keT57e2RhdGFBcnJ9fTwvdGJvZHk+PC90YWJsZT4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRheUluV2VlayA9IFtcIuaXpVwiLCBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWxsTW9udGhEYXRhSHRtbCh0b2RheVswXSwgdG9kYXlbMV0gLSAxKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN5pyI5Lu95omA5Zyo5aSp5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNUb2RheSh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVBdHRyID0gdmFsdWUuc3BsaXQoJy0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvZGF5WzBdID09IHZhbHVlQXR0clswXSAmJiB0b2RheVsxXSA9PSB2YWx1ZUF0dHJbMV0gJiYgdG9kYXlbMl0gPT0gdmFsdWVBdHRyWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WIneWni+WMluaXpeWOhuaOp+S7tuihqOagvCAgQEBtb250aCAgQEB5ZWFyICBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpbGxNb250aERhdGFIdG1sKHllYXIsIG1vbnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgpLCBcdFx0XHQvL+aciOS7veesrOS4gOWkqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERhdGVEYXkgPSBmaXJzdERhdGUuZ2V0RGF5KCksXHQgIFx0XHQvL+i1t+Wni+ekvOaLnCAwLTZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhEYXlzID0gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpLFx0Ly/mnIjku73lpKnmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy95ZWFyTW9udGhWYWx1ZSA9IHllYXIgKyAnLScgKyAobW9udGggKyAxKSArICctJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhck1vbnRoVmFsdWUgPSB5ZWFyICsgJy0nICsgKChtb250aCArIDEpIDwgMTAgPyAnMCcgKyAobW9udGggKyAxKSA6IChtb250aCArIDEpKSArICctJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1ZhbHVlID0gJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RBYWJsZURheSA9IHRvZGF5WzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/kuIvkuKrmnIhcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vbnRoID49IHRvZGF5WzFdIHx8IHllYXIgPiB0b2RheVswXSkgJiYgKGZpcnN0QWFibGVEYXkgPSAxKSAmJiAoZGlzYWJsZWQgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aGr5YWF5pWw5o2u5qC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhSHRtbCA9IFwiXCIsIGl0ZW1Db3VudCA9IE1hdGguY2VpbCgoZmlyc3REYXRlRGF5ICsgbW9udGhEYXlzKSAvIDcpICogNywgdG9kYXlJID0gLTEsIG5leHRNb250aENvdW50ID0gZGF5U3BhbiwgY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbUNvdW50OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNSb3dDZWxsMCA9IChpICUgNiA9PSAwKSwgLy/ooYzotbflp4tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3dDZWxsNiA9IChpICUgNyA9PSA2KTsgLy/ooYznu5PmnZ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSAlIDcgPT0gMCkgJiYgKGRhdGFIdG1sICs9ICc8dHI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgZmlyc3REYXRlRGF5IHx8IGkgPj0gKG1vbnRoRGF5cyArIGZpcnN0RGF0ZURheSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSHRtbCArPSAnPHRkPjwvdGQ+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YWx1ZSA9IHllYXJNb250aFZhbHVlICsgKGkgLSBmaXJzdERhdGVEYXkgKyAxKSwgc2hvd1ZhbHVlID0gaSAtIGZpcnN0RGF0ZURheSArIDEsIGNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0geWVhck1vbnRoVmFsdWUgKyAoKGkgLSBmaXJzdERhdGVEYXkgKyAxKSA8IDEwID8gJzAnICsgKGkgLSBmaXJzdERhdGVEYXkgKyAxKSA6IChpIC0gZmlyc3REYXRlRGF5ICsgMSkpLCBzaG93VmFsdWUgPSBpIC0gZmlyc3REYXRlRGF5ICsgMSwgY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/lvZPmnIhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChtb250aCArIDEpID09IHRvZGF5WzFdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaYr+S7iuWkqe+8jCDmmL7npLrku4rlpKnvvIwg5LiN56aB5q2iXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCAmJiB0b2RheUkgPT0gLTEgJiYgaXNUb2RheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5SSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VmFsdWUgPSAn5LuK5aSpJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAndG9kYXkgZGF5LWxhYmVsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv5piO5ZCO5aSpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2RheUkgJiYgaSA8PSAodG9kYXlJICsgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPT0gKHRvZGF5SSArIDEpICYmIChzaG93VmFsdWUgPSAn5piO5aSpJykgJiYgKGNsYXNzTmFtZSA9ICd0b21vcnJvdyBkYXktbGFiZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPT0gKHRvZGF5SSArIDIpICYmIChzaG93VmFsdWUgPSAn5ZCO5aSpJykgJiYgKGNsYXNzTmFtZSA9ICdkYXktYWZ0ZXItdG9tb3Jyb3cgZGF5LWxhYmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlrZjlnKjmnInmlYjlpKnmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5U3BhbiAmJiAhZGlzYWJsZWQgJiYgKGkgLSB0b2RheUkpID49IGRheVNwYW4gJiYgKGRpc2FibGVkID0gdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaYr+S4i+aciFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoLS1uZXh0TW9udGhDb3VudCA8IDApICYmIChkaXNhYmxlZCA9IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9IGRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnIGFibGVkJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PSBEQVRFICYmICFkaXNhYmxlZCAmJiAoY2xhc3NOYW1lICs9ICcgc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUh0bWwgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCc8dGQgZGF0YS12YWx1ZSA9XCJ7e2RhdGEtZGF0ZX19XCIgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiPjxzcGFuIGNsYXNzID0gXCJib3hcIj57e2RhdGV9fTwvc3Bhbj48L3RkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3tkYXRhLWRhdGV9fS8sIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7ZGF0ZX19Lywgc2hvd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpICUgNyA9PSA2KSAmJiAoZGF0YUh0bWwgKz0gJzwvdHI+JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXAuaW5uZXJIVE1MICs9IGNhbGVuZGFyVG1wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7eWVhcn19L2csIHllYXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3ttb250aH19L2csIG1vbnRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7c2hvd01vbnRofX0vZywgbW9udGggKyAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7dGl0bGVBcnJ9fS9nLCBkYXlJbldlZWsubWFwKGZ1bmN0aW9uIChkYXkpIHsgcmV0dXJuICc8dGg+JyArIGRheSArICc8L3RoPic7IH0pLmpvaW4oJycpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7ZGF0YUFycn19L2csIGRhdGFIdG1sKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5a2Y5Zyo5Zyo5pyJ5pWI5aSp5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXlTcGFuICYmIChmaXJzdEFhYmxlRGF5ICsgZGF5U3BhbiAtIDEpID4gbW9udGhEYXlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlTcGFuIC09IChtb250aERheXMgLSBmaXJzdEFhYmxlRGF5ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsTW9udGhEYXRhSHRtbCh5ZWFyLCBtb250aCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WIneWni+WMluaXpeWOhuaOp+S7tuihqOagvCAgQEBtb250aCAgQEB5ZWFyICBlbmRcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbl07IiwidmFyIGRpcmVjdGl2ZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG5cblxuZGlyZWN0aXZlc1xuICAgIC5kaXJlY3RpdmUoJ2RhdGVUYWJsZScsIHJlcXVpcmUoJy4vZGF0ZVRhYmxlJykpXG4gICAgLmRpcmVjdGl2ZSgnaW5wdXRDbGVhcicsIHJlcXVpcmUoJy4vaW5wdXRDbGVhcicpKVxuICAgIC5kaXJlY3RpdmUoJ3VpTG9hZGluZycsIHJlcXVpcmUoJy4vdWlMb2FkaW5nJykpXG4gICAgLmRpcmVjdGl2ZSgndWlNb2RhbCcsIHJlcXVpcmUoJy4vdWlNb2RhbCcpKVxuICAgIC5kaXJlY3RpdmUoJ2luZmluaXRlU2Nyb2xsJywgcmVxdWlyZSgnLi9pbmZpbml0ZVNjcm9sbCcpKVxuICAgIC5kaXJlY3RpdmUoJ2FuaW1hdGVkQm90dG9tJywgcmVxdWlyZSgnLi9hbmltYXRlZEJvdHRvbScpKVxuICAgIC5kaXJlY3RpdmUoJ21ha2VDYWxsJywgcmVxdWlyZSgnLi9tYWtlQ2FsbCcpKVxuICAgIC5kaXJlY3RpdmUoJ3RpbWVsZWZ0JywgcmVxdWlyZSgnLi90aW1lbGVmdCcpKSAgICAgICAgICAgICAgICAgICAgLy/liankvZnml7bpl7TlgJLorqHml7ZcblxubW9kdWxlLmV4cG9ydHMgPSBkaXJlY3RpdmVzOyIsIm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQoYXR0cnMudGhyZXNob2xkKSB8fCAwO1xuICAgICAgICAgICAgICAgIHZhciBlID0gZWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLiRldmFsKGF0dHJzLmNhbkxvYWQpICYmIGUuc2Nyb2xsVG9wICsgZS5vZmZzZXRIZWlnaHQgPj0gZS5zY3JvbGxIZWlnaHQgLSBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShhdHRycy5pbmZpbml0ZVNjcm9sbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gWyAnJHRpbWVvdXQnLFxuICAgIGZ1bmN0aW9uKCR0aW1lb3V0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwic2VhcmNoYmFyXCI+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1uZy1kaXNhYmxlZD1cImRpc2FibGVkSW5wdXRcIiB0eXBlPVwie3tpbnB1dC50eXBlfX1cIiBjbGFzcz1cImxvbmctaW5wdXRcIiBwbGFjZWhvbGRlcj1cInt7aW5wdXQucGxhY2Vob2xkZXJ9fVwiIGRhdGEtbmctbW9kZWw9XCJzZWFyY2hcIiBtYXhsZW5ndGg9XCJ7e2lucHV0Lm1heGxlbmd0aH19XCIgLz5cXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGNsYXNzPVwic2VhcmNoYmFyLWNsZWFyXCIgZGF0YS1uZy1jbGljaz1cImNsZWFyKClcIj48L2E+XFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IFwiPVwiLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogXCI9XCIsXG4gICAgICAgICAgICAgICAgY2xlYXIgOlwiJlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5kaXNhYmxlZElucHV0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWRJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDcwMCk7XG4gICAgICAgICAgICAgICAgdmFyICRzZWFyY2hiYXJDbGVhciA9IGVsZW1lbnQuZmluZCgnYScpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnc2VhcmNoJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiggbmV3VmFsdWUgPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmKCghb2xkVmFsdWUgICYmIG5ld1ZhbHVlLmxlbmd0aD4wKSB8fCAobmV3VmFsdWUubGVuZ3RoID09IG9sZFZhbHVlLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWFyY2hiYXJDbGVhci5hZGRDbGFzcygnc2VhcmNoYmFyLW5vdC1lbXB0eScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNlYXJjaGJhckNsZWFyLnJlbW92ZUNsYXNzKCdzZWFyY2hiYXItbm90LWVtcHR5Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSBwYXJzZUludChhdHRycy5tYWtlQ2FsbC5yZXBsYWNlKCctJywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHBob25lTnVtYmVyID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVQbHVnaW4ubWFrZUNhbGwoXCJtYWtlQ2FsbEZvckNhbGxUZWxcIiwgcGhvbmVOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBbICckdGltZW91dCcsICdjaGVja1RpbWUnLFxuICAgIGZ1bmN0aW9uKCR0aW1lb3V0LCBjaGVja1RpbWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwiY29sb3ItZ29sZGVuLXllbGxvd1wiPnt7dGltZWxlZnQubWludXRlfX08L3NwYW4+5YiGPHNwYW4gY2xhc3M9XCJjb2xvci1nb2xkZW4teWVsbG93XCI+e3t0aW1lbGVmdC5zZWNvbmR9fTwvc3Bhbj7np5InLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtaWxsaXNlY29uZDogXCI9XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0SWQsIG1pbnV0ZSwgc2Vjb25kLCBuZXdMZWZ0TWlsbGlzZWNvbmQ7XG4gICAgICAgICAgICAgICAgdmFyIG1pbGxpc2Vjb25kID0gcGFyc2VJbnQoc2NvcGUubWlsbGlzZWNvbmQpO1xuICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kID0gKG1pbGxpc2Vjb25kIDwgMCA/IDAgOiBtaWxsaXNlY29uZCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlTGF0ZXIobGVmdE1pbGxpc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KGxlZnRNaWxsaXNlY29uZCAvIDEwMDAgLyA2MCAlIDYwLCAxMCk7IC8v6K6h566X5Ymp5L2Z55qE5YiG6ZKf5pWwXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZCA9IHBhcnNlSW50KGxlZnRNaWxsaXNlY29uZCAvIDEwMDAgJSA2MCwgMTApOy8v6K6h566X5Ymp5L2Z55qE56eS5pWwXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnRpbWVsZWZ0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlOiBjaGVja1RpbWUobWludXRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZDogY2hlY2tUaW1lKHNlY29uZClcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYobGVmdE1pbGxpc2Vjb25kIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWlsbGlzZWNvbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhlIHRpbWVvdXRJZCBmb3IgY2FuY2VsaW5nXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXRJZCA9ICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TGVmdE1pbGxpc2Vjb25kID0gbGVmdE1pbGxpc2Vjb25kIC0gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUxhdGVyKG5ld0xlZnRNaWxsaXNlY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgnJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVMYXRlcihtaWxsaXNlY29uZCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbl07XG5cbi8qXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyR0aW1lb3V0JywgJ2NoZWNrVGltZScsXG4gICAgZnVuY3Rpb24oJHRpbWVvdXQsIGNoZWNrVGltZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJjb2xvci1nb2xkZW4teWVsbG93XCI+e3t0aW1lbGVmdC5kYXl9fTwvc3Bhbj7lpKk8c3BhbiBjbGFzcz1cImNvbG9yLWdvbGRlbi15ZWxsb3dcIj57e3RpbWVsZWZ0LmhvdXJ9fTwvc3Bhbj7ml7Y8c3BhbiBjbGFzcz1cImNvbG9yLWdvbGRlbi15ZWxsb3dcIj57e3RpbWVsZWZ0Lm1pbnV0ZX19PC9zcGFuPuWIhjxzcGFuIGNsYXNzPVwiY29sb3ItZ29sZGVuLXllbGxvd1wiPnt7dGltZWxlZnQuc2Vjb25kfX08L3NwYW4+56eSJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbWlsbGlzZWNvbmQ6IFwiPVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dElkLCBtaW51dGUsIHNlY29uZCwgbmV3TGVmdE1pbGxpc2Vjb25kO1xuICAgICAgICAgICAgICAgIHZhciBtaWxsaXNlY29uZCA9IHBhcnNlSW50KHNjb3BlLm1pbGxpc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBtaWxsaXNlY29uZCA9IChtaWxsaXNlY29uZCA8IDAgPyAwIDogbWlsbGlzZWNvbmQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRheSwgaG91cjtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUxhdGVyKGxlZnRNaWxsaXNlY29uZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGRheSA9IHBhcnNlSW50KGxlZnRNaWxsaXNlY29uZCAvIDEwMDAgLyA2MCAvIDYwIC8gMjQsIDEwKTsvL+iuoeeul+WJqeS9meeahOWkqeaVsFxuICAgICAgICAgICAgICAgICAgICBob3VyID0gcGFyc2VJbnQobGVmdE1pbGxpc2Vjb25kIC8gMTAwMCAvIDYwIC8gNjAgJSAyNCwgMTApOy8v6K6h566X5Ymp5L2Z55qE5bCP5pe25pWwXG5cblxuICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChsZWZ0TWlsbGlzZWNvbmQgLyAxMDAwIC8gNjAgJSA2MCwgMTApOyAvL+iuoeeul+WJqeS9meeahOWIhumSn+aVsFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBwYXJzZUludChsZWZ0TWlsbGlzZWNvbmQgLyAxMDAwICUgNjAsIDEwKTsvL+iuoeeul+WJqeS9meeahOenkuaVsFxuICAgICAgICAgICAgICAgICAgICBzY29wZS50aW1lbGVmdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZTogY2hlY2tUaW1lKG1pbnV0ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmQ6IGNoZWNrVGltZShzZWNvbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiBkYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VyOiBob3VyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmKGxlZnRNaWxsaXNlY29uZCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwodGltZW91dElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1pbGxpc2Vjb25kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIHRoZSB0aW1lb3V0SWQgZm9yIGNhbmNlbGluZ1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0xlZnRNaWxsaXNlY29uZCA9IGxlZnRNaWxsaXNlY29uZCAtIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMYXRlcihuZXdMZWZ0TWlsbGlzZWNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlTGF0ZXIobWlsbGlzZWNvbmQpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5dO1xuICovXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsXG4gICAgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbG9hZGluZy5odG1sJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZ1RleHQ6IFwiPVwiLFxuICAgICAgICAgICAgICAgIHNob3dMb2FkaW5nOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNsb3NlTG9hZGluZyA9ICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RhbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiIGRhdGEtbmctY2xhc3M9XCJ7XFwnbW9kYWwtaW5cXCc6IG1vZGFsLnNob3dNb2RhbH1cIj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWlubmVyXCI+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtdGl0bGVcIj57e21vZGFsLnRpdGxlfX08L2Rpdj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC10ZXh0XCI+e3ttb2RhbC50ZXh0fX08L2Rpdj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1saW5lXCI+PC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1idXR0b25zXCI+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vZGFsLWJ1dHRvblwiIGRhdGEtbmctc2hvdz1cIm1vZGFsLmNhbmNsZUJ0blwiPnt7bW9kYWwuY2FuY2xlQnRufX08L3NwYW4+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vZGFsLWJ1dHRvbiBtb2RhbC1idXR0b24tYm9sZFwiIGRhdGEtbmctY2xpY2s9XCJtb2RhbC5jb25maXJtKClcIj57e21vZGFsLmNvbmZpcm1CdG59fTwvc3Bhbj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgPC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLW92ZXJsYXlcIiBkYXRhLW5nLWNsYXNzPVwie1xcJ21vZGFsLW92ZXJsYXktdmlzaWJsZVxcJzogbW9kYWwuc2hvd01vZGFsfVwiPjwvZGl2PicsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kYWxCdXR0b24gPSBlbGVtZW50LmZpbmQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBtb2RhbEJ1dHRvbi5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1vZGFsLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbl07XG4iLCIvKipcclxuICog5rG96L2m56Wo5pel5pyf6KGo5qC855qE5pel5pyf6IyD5Zu0XHJcbiAqICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWydkYXRlUmFuZ2UnLCAnY2hlY2tUaW1lJywgZnVuY3Rpb24gKGRhdGVSYW5nZSwgY2hlY2tUaW1lKSB7XHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGVTdHIsIGFjdGlvbikge1xyXG4vLyAgICAgICAgZGF0ZSA9ICcyMDE0LTEwLTAyJztcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHIucmVwbGFjZSgvLS9nLCAnLycpKTtcclxuICAgICAgICB2YXIgbnVtID0gMTtcclxuICAgICAgICBpZihhY3Rpb24gPT0gJ21pbnVzJykge1xyXG4gICAgICAgICAgICBudW0gPSAtMTtcclxuICAgICAgICB9IGVsc2UgaWYoYWN0aW9uID09ICdwbHVzJykge1xyXG4gICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmluYWxseURhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkgKyBudW0pO1xyXG4gICAgICAgIHZhciBmaW5hbGx5RGF0ZVN0ciA9IGZpbmFsbHlEYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyBjaGVja1RpbWUoZmluYWxseURhdGUuZ2V0TW9udGgoKSArIDEpICsgJy0nICsgY2hlY2tUaW1lKGZpbmFsbHlEYXRlLmdldERhdGUoKSk7XHJcbiAgICAgICAgaWYoZmluYWxseURhdGUuZ2V0VGltZSgpID49IGRhdGVSYW5nZS5zdGFydERhdGVVbml4ICYmIGZpbmFsbHlEYXRlLmdldFRpbWUoKSA8PSBkYXRlUmFuZ2UuZW5kRGF0ZVVuaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbmFsbHlEYXRlU3RyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlU3RyO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dOyIsIi8qKlxuICog5Yig6Zmk56m65qC8XG4gKiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFsgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmKHR5cGVvZihzdHIpID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoJyAnLCAnJyk7XG4gICAgICAgIH1cbiAgICB9O1xufV07IiwidmFyIGZpbHRlcnMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG5cblxuZmlsdGVyc1xuICAgIC5maWx0ZXIoJ3RvVGltZURpdmlzaW9uJywgcmVxdWlyZSgnLi90b1RpbWVEaXZpc2lvbicpKSAgLy/lsIYgMjAxNC0wOC0yOCAxNzowMDowMCDovazmjaLkuLogMTc6MDBcbiAgICAuZmlsdGVyKCdjaGFuZ2VEYXRlJywgcmVxdWlyZSgnLi9jaGFuZ2VEYXRlJykpICAvL+aXpeacn+WKoDHmiJblh48xXG4gICAgLmZpbHRlcigndG9XZWVrJywgcmVxdWlyZSgnLi90b1dlZWsnKSkgIC8v6YCa6L+H5pel5pyf6I635b6X5pif5pyfXG4gICAgLmZpbHRlcignZGVsZXRlQmxhbmsnLCByZXF1aXJlKCcuL2RlbGV0ZUJsYW5rJykpICAvL+WIoOmZpOepuuagvFxuICAgIC5maWx0ZXIoJ211bHRpRmlsdGVyJywgcmVxdWlyZSgnLi9tdWx0aUZpbHRlcicpKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyczsiLCIvKipcbiAqICDlpJrmnaHku7bmn6Xor6LliJfovabovabmrKFcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRvdGFsQXJyYXksIGZpbHRlck9iaiwgZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGFuZ3VsYXIuaXNGdW5jdGlvbihmaWx0ZXJGdW5jdGlvbikgJiYgYW5ndWxhci5pc09iamVjdChmaWx0ZXJPYmopPyhcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godG90YWxBcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYXR0ciBpbiBmaWx0ZXJPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNbYXR0cl0gPSBpdGVtW2F0dHJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckZ1bmN0aW9uKHMsIGZpbHRlck9iaikgJiYgb3V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk6IChvdXQgPSB0b3RhbEFycmF5KTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbn1dIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIGlmKHRpbWUgJiYgdGltZS5sZW5ndGggPiAwKSB7XG4vLyAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodGltZS5yZXBsYWNlKC8tL2csICcvJykpO1xuICAgICAgICAgICAgdmFyIHRpbWVBcnIgPSB0aW1lLnNwbGl0KCc6JylcbiAgICAgICAgICAgIHJldHVybiB0aW1lQXJyWzFdICsgXCI6XCIgKyB0aW1lQXJyWzJdO1xuICAgICAgICB9XG4gICAgfTtcbn1dOyIsIi8qKlxuICog6YCa6L+H5pel5pyf6I635Y+W5pif5pyfXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3ZWVrU3RyLCBkYXRlU3RyKSB7XG4gICAgICAgIGlmKCFkYXRlU3RyKSByZXR1cm47XG4gICAgICAgIHZhciBkZCA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBzZWxlY3RlZERkID0gbmV3IERhdGUoZGF0ZVN0ci5yZXBsYWNlKC8tL2csICcvJykpO1xuICAgICAgICB2YXIgZ2V0RGF0ZURpZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZShkZC5nZXRGdWxsWWVhcigpLCBkZC5nZXRNb250aCgpLCBkZC5nZXREYXRlKCkpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF5ID0gbmV3IERhdGUoc2VsZWN0ZWREZC5nZXRGdWxsWWVhcigpLCBzZWxlY3RlZERkLmdldE1vbnRoKCksIHNlbGVjdGVkRGQuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgIHZhciBudW0gPSAoc2VsZWN0ZWREYXkgLSB0b2RheSkvODY0MDAwMDA7XG4gICAgICAgICAgICBzd2l0Y2ggKG51bSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfku4rlpKknO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfmmI7lpKknO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICflkI7lpKknO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvL+i9rOaNouS4uuaYn+acn1xuICAgICAgICB2YXIgY29udmVydERheSA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgICAgIHZhciB3ZWVrTGlzdCA9IFtcIuWRqOaXpVwiLCBcIuWRqOS4gFwiLCBcIuWRqOS6jFwiLCBcIuWRqOS4iVwiLCBcIuWRqOWbm1wiLCBcIuWRqOS6lFwiLCBcIuWRqOWFrVwiXTtcbiAgICAgICAgICAgIHJldHVybiB3ZWVrTGlzdFtudW1dIHx8IFwiXCI7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB3ZWVrID0gKGdldERhdGVEaWZmKCkgfHwgY29udmVydERheShzZWxlY3RlZERkLmdldERheSgpKSk7XG4gICAgICAgIHJldHVybiB3ZWVrO1xuICAgIH07XG59XTsiLCIvKlxuICogYW5ndWxhci1tb2JpbGUtbmF2IGJ5IEFuZHkgSm9zbGluICYmIHJlZ291XG4gKiBodHRwczovL2dpdGh1Yi5jb20vcmVnb3UvYW5ndWxhci1tb2JpbGUtbmF2XG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZSBodHRwOi8vZ29vLmdsL1o4TmxvXG4gKlxuICogYWRkIG5hdmlnYXRlaW5nIGxpc3Qgcm91dGUtaW5mbyBzdXBwb3J0IGJ5IHJlZ291XG4gKiBBZGp1c3QgYmFjayBBY3Rpb24gc3RyYXRlZ3kgYnkgcmVnb3VcbiAqL1xuXG5cbnZhciBtb2JpbGVOYXZNb2QgPSBhbmd1bGFyLm1vZHVsZSgnYWpvc2xpbi5tb2JpbGUtbmF2aWdhdGUnLCBbXG4vLyAgICByZXF1aXJlKCcuLi9ub2RlX21vZHVsZXMvYW5ndWxhci1ic2Z5L2FuaW1hdGUnKS5uYW1lLFxuLy8gICAgcmVxdWlyZSgnLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItYnNmeS9yb3V0ZScpLm5hbWVcbiAgICBdKTtcbi8vICAgIC5ydW4oWyckbmF2aWdhdGUnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCRuYXZpZ2F0ZSwgJHJvb3RTY29wZSkge1xuLy8gICAgICAgIC8vQW5kcm9pZCBiYWNrIGJ1dHRvbiBmdW5jdGlvbmFsaXR5IGZvciBwaG9uZWdhcFxuLy8gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJhY2tidXR0b25cIiwgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgYmFja1N1Y2Nlc3MgPSAkbmF2aWdhdGUuYmFjaygpO1xuLy8gICAgICAgICAgICAgICAgICAgIGlmICghYmFja1N1Y2Nlc3MpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLmFwcC5leGl0QXBwKCk7XG4vLyAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgIH0pO1xuLy8gICAgICAgIH0pO1xuLy8gICAgfV0pO1xuICAgIC8qXG4gICAgICogJGNoYW5nZVxuICAgICAqIFNlcnZpY2UgdG8gdHJhbnNpdGlvbiBiZXR3ZWVuIHR3byBlbGVtZW50c1xuICAgICAqL1xuLy9hbmd1bGFyLm1vZHVsZSgnYWpvc2xpbi5tb2JpbGUtbmF2aWdhdGUnKVxuXG4gICAgbW9iaWxlTmF2TW9kLnByb3ZpZGVyKCckY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uUHJlc2V0cyA9IHsgIC8vW25leHRDbGFzcywgcHJldkNsYXNzXVxuICAgICAgICAgICAgLy9Nb2RhbDogbmV3IHBhZ2UgcG9wcyB1cCwgb2xkIHBhZ2Ugc2l0cyB0aGVyZSB1bnRpbCBuZXcgcGFnZSBpcyBvdmVyIGl0XG4gICAgICAgICAgICAnaW9uaWNzbGlkZSc6IFsnaW9uaWNzbGlkZScsICdpb25pY3NsaWRlLXByZXYnXSxcbiAgICAgICAgICAgICdtb2RhbCc6IFsnbW9kYWwnLCAnJ10sXG4gICAgICAgICAgICAnbm9uZSc6IFsnJywgJyddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICdwcmVmaXgnOiAnbWItJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgSU5fQ0xBU1MgPSBcImluXCI7XG4gICAgICAgIHZhciBPVVRfQ0xBU1MgPSBcIm91dFwiO1xuICAgICAgICB2YXIgUkVWRVJTRV9DTEFTUyA9IFwicmV2ZXJzZVwiO1xuICAgICAgICB2YXIgRE9ORV9DTEFTUyA9IFwiZG9uZVwiO1xuICAgICAgICB2YXIgQU5JTUFUSU9OX0VORCA9IFwid2Via2l0QW5pbWF0aW9uTmFtZVwiIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA/IFwid2Via2l0QW5pbWF0aW9uRW5kXCIgOiBcImFuaW1hdGlvbmVuZFwiO1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvblByZXNldCA9IGZ1bmN0aW9uKHRyYW5zaXRpb25OYW1lLCBpbkNsYXNzLCBvdXRDbGFzcykge1xuICAgICAgICAgICAgaW5DbGFzcyA9IGluQ2xhc3MgfHwgJyc7XG4gICAgICAgICAgICBvdXRDbGFzcyA9IG91dENsYXNzIHx8IGluQ2xhc3M7IC8vRGVmYXVsdCB0byBvdXRDbGFzcyBzYW1lIGFzIGluQ2xhc3NcbiAgICAgICAgICAgIHRyYW5zaXRpb25QcmVzZXRzW3RyYW5zaXRpb25OYW1lXSA9IFtpbkNsYXNzLCBvdXRDbGFzc107XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zID0gYW5ndWxhci5leHRlbmQoZGVmYXVsdE9wdGlvbnMsIG9wdHMgfHwge30pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGdldCA9IFsnJHEnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCRxLCAkcm9vdFNjb3BlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBjaGFuZ2UobmV4dCwgcHJldiwgdHJhbnNUeXBlLCByZXZlcnNlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMgfHwge30sIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXh0VHJhbnNDbGFzcywgcHJldlRyYW5zQ2xhc3M7XG5cbiAgICAgICAgICAgICAgICAvL2J1aWxkQ2xhc3NTdHJpbmdcbiAgICAgICAgICAgICAgICAvL1RyYW5zZm9ybXMgYXJyYXkgb2YgY2xhc3NlcyBpbnRvIHByZWZpeGVkIGNsYXNzIHN0cmluZ1xuICAgICAgICAgICAgICAgIC8vKGJldHRlciBmb3IgcGVyZm9ybWFuY2UgdGhhbiBtdWx0aXBsZSAuYWRkQ2xhc3MoKVxuICAgICAgICAgICAgICAgIC8vQHBhcmFtIGNsYXNzZXM6IEFycmF5e3N0cmluZ31cbiAgICAgICAgICAgICAgICAvL0ByZXR1cm4gc3RyaW5nIGNsYXNzTmFtZXNcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBidWlsZENsYXNzU3RyaW5nKGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXMucmVkdWNlKGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCBjbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvciArIChjbHMgPyAoJyAnICsgb3B0aW9ucy5wcmVmaXggKyBjbHMpIDogJycpO1xuICAgICAgICAgICAgICAgICAgICB9LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9Db252ZXJ0IGEgcHJlc2V0IChlZyAnbW9kYWwnKSB0byBpdHMgYXJyYXkgb2YgcHJlc2V0IGNsYXNzZXMgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgLy9lbHNlLCBqdXN0IGNvbnZlcnQgZWcgJ3NsaWRlJyB0byBbJ3NsaWRlJywgJ3NsaWRlJ10sIHNvIGJvdGggZWxlbWVudHMgZ2V0IGl0XG4gICAgICAgICAgICAgICAgLy9UaGUgYXJyYXkgbGF5b3V0IGlzIFtuZXh0aW5hdGlvbkNsYXNzLCBwcmV2Q2xhc3NdXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uUHJlc2V0c1t0cmFuc1R5cGVdID9cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblByZXNldHNbdHJhbnNUeXBlXSA6XG4gICAgICAgICAgICAgICAgICAgIFt0cmFuc1R5cGUsICcnXTtcblxuICAgICAgICAgICAgICAgIC8vSGFjayBmb3Igd2hpdGUgZmxhc2g6IHotaW5kZXggc3RvcHMgZmxhc2gsIG9mZnNldFdpZHRoIHRoaW5nIGZvcmNlcyB6LWluZGV4IHRvIGFwcGx5XG4gICAgICAgICAgICAgICAgbmV4dC5jc3MoJ3otaW5kZXgnLCctMTAwJyk7XG4gICAgICAgICAgICAgICAgbmV4dFswXS5vZmZzZXRXaWR0aCArPSAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5leHRDbGFzc2VzID0gYnVpbGRDbGFzc1N0cmluZyhbXG4gICAgICAgICAgICAgICAgICAgIHJldmVyc2UgPyBPVVRfQ0xBU1MgOiBJTl9DTEFTUyxcbiAgICAgICAgICAgICAgICAgICAgKG5leHRUcmFuc0NsYXNzID0gdHJhbnNpdGlvbltyZXZlcnNlID8gMSA6IDBdKSxcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZSAmJiBSRVZFUlNFX0NMQVNTIHx8ICcnXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgbmV4dC5hZGRDbGFzcyhuZXh0Q2xhc3Nlcyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJldkNsYXNzZXM7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkNsYXNzZXMgPSBidWlsZENsYXNzU3RyaW5nKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmVyc2UgPyBJTl9DTEFTUyA6IE9VVF9DTEFTUyxcbiAgICAgICAgICAgICAgICAgICAgICAgIChwcmV2VHJhbnNDbGFzcyA9IHRyYW5zaXRpb25bcmV2ZXJzZSA/IDAgOiAxXSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlICYmIFJFVkVSU0VfQ0xBU1MgfHwgJydcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIHByZXYuYWRkQ2xhc3MocHJldkNsYXNzZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG5leHRDbGFzc2VzLCAnICAgICAgICAgICAgICAgJyArIHByZXZDbGFzc2VzKVxuXG4gICAgICAgICAgICAgICAgbmV4dC5jc3MoJ3otaW5kZXgnLCAnJyk7XG4gICAgICAgICAgICAgICAgbmV4dFswXS5vZmZzZXRXaWR0aCArPSAwO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vRmluZCB3aGljaCBlbGVtZW50IChzb21ldGltZXMgbm9uZSkgdG8gYmluZCBmb3IgZW5kaW5nXG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kRWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFRyYW5zQ2xhc3MgJiYgbmV4dFRyYW5zQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIChib3VuZEVsZW1lbnQgPSBuZXh0KS5iaW5kKEFOSU1BVElPTl9FTkQsIGRvbmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldiAmJiBwcmV2VHJhbnNDbGFzcyAmJiBwcmV2VHJhbnNDbGFzcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgKGJvdW5kRWxlbWVudCA9IHByZXYpLmJpbmQoQU5JTUFUSU9OX0VORCwgZG9uZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYm91bmRFbGVtZW50ICYmIGJvdW5kRWxlbWVudC51bmJpbmQoQU5JTUFUSU9OX0VORCwgZG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIG5leHQucmVtb3ZlQ2xhc3MobmV4dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2ICYmIHByZXYucmVtb3ZlQ2xhc3MocHJldkNsYXNzZXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy9MZXQgdGhlIHVzZXIgb2YgY2hhbmdlICdjYW5jZWwnIHRvIGZpbmlzaCB0cmFuc2l0aW9uIGVhcmx5IGlmIHRoZXkgd2lzaFxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfV07XG4gICAgfSlcbi8vYW5ndWxhci5tb2R1bGUoJ2Fqb3NsaW4ubW9iaWxlLW5hdmlnYXRlJylcblxuICAgIC5wcm92aWRlcignJG5hdmlnYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGdldCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnJHJvdXRlJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbmF2ID0ge30sXG4gICAgICAgICAgICAgICAgbmF2SGlzdG9yeSA9IFtdOyAvL3dlIGtlZXAgb3VyIG93biB2ZXJzaW9uIG9mIGhpc3RvcnkgYW5kIGlnbm9yZSB3aW5kb3cuaGlzdG9yeVxuICAgICAgICAgICAgdmFyIHBhZ2VUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIFBhZ2UocGF0aCwgdHJhbnNpdGlvbiwgaXNSZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9wYXRoID0gcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgX3RyYW5zaXRpb24gPSB0cmFuc2l0aW9uIHx8ICdzbGlkZScsXG4gICAgICAgICAgICAgICAgICAgIF9pc1JldmVyc2UgPSBpc1JldmVyc2UsXG4gICAgICAgICAgICAgICAgICAgIF9vbmNlVHJhbnNpdGlvbjtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfb25jZVRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zID0gX29uY2VUcmFuc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgX29uY2VUcmFuc2l0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zID0gX3RyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoID0gZnVuY3Rpb24oKSB7IHJldHVybiBfcGF0aDsgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2UgPSBmdW5jdGlvbigpIHsgcmV0dXJuIF9pc1JldmVyc2U7IH07XG5cbiAgICAgICAgICAgICAgICAvL0ZvciBzZXR0aW5nIGEgdHJhbnNpdGlvbiBvbiBhIHBhZ2UgLSBidXQgb25seSBvbmUgdGltZVxuICAgICAgICAgICAgICAgIC8vRWcgc2F5IG9uIHN0YXJ0dXAsIHdlIHdhbnQgdG8gdHJhbnNpdGlvbiBpbiB3aXRoICdub25lJyxcbiAgICAgICAgICAgICAgICAvL2J1dCB3YW50IHRvIGJlICdzbGlkZScgYWZ0ZXIgdGhhdFxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbk9uY2UgPSBmdW5jdGlvbih0cmFucykge1xuICAgICAgICAgICAgICAgICAgICBfb25jZVRyYW5zaXRpb24gPSB0cmFucztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZShkZXN0aW5hdGlvbiwgc291cmNlLCBpc1JldmVyc2UsaXNCYWNrKSB7XG5cblxuXG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdpc1JldmVyc2UnLCBpc1JldmVyc2UpXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcGFnZVRyYW5zaXRpb25TdGFydCcsIGRlc3RpbmF0aW9uLCBzb3VyY2UsIGlzUmV2ZXJzZSxpc0JhY2spO1xuICAgICAgICAgICAgICAgIG5hdi5jdXJyZW50ID0gbmF2Lm5leHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBXaWxsIGxpc3RlbiBmb3IgYSByb3V0ZSBjaGFuZ2Ugc3VjY2VzcyBhbmQgY2FsbCB0aGUgc2VsZWN0ZWQgY2FsbGJhY2tcbiAgICAgICAgICAgICAqIE9ubHkgb25lIGxpc3RlbiBpcyBldmVyIGFjdGl2ZSwgc28gaWYgeW91IHByZXNzIGZvciBleGFtcGxlXG4gICAgICAgICAgICAgKiAvbGluazEgdGhlbiBwcmVzcyBiYWNrIGJlZm9yZSAvbGluazEgaXMgZG9uZSwgaXQgd2lsbCBnbyBsaXN0ZW4gZm9yIHRoZSBiYWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmF2Lm9uUm91dGVTdWNjZXNzKVxuICAgICAgICAgICAgbmF2Lm9uUm91dGVTdWNjZXNzID0gbnVsbDtcbiAgICAgICAgICAgIC8vQWRkIGEgZGVmYXVsdCBvbnJvdXRlc3VjY2VzcyBmb3IgdGhlIHZlcnkgZmlyc3QgcGFnZVxuICAgICAgICAgICAgZnVuY3Rpb24gZGVmYXVsdFJvdXRlU3VjY2VzcygkZXZlbnQsIG5leHQsIGxhc3QpIHtcbiAgICAgICAgICAgICAgICBuYXYuY3VycmVudCAmJiBuYXZIaXN0b3J5LnB1c2goW25hdi5jdXJyZW50LCAnJ10pO1xuXG5cbiAgICAgICAgICAgICAgICBuYXYubmV4dCA9IG5ldyBQYWdlKCRsb2NhdGlvbi5wYXRoKCkpO1xuICAgICAgICAgICAgICAgIG5hdi5uZXh0LnRyYW5zaXRpb25PbmNlKCdub25lJyk7XG4gICAgICAgICAgICAgICAgbmF2aWdhdGUobmF2Lm5leHQpO1xuICAgICAgICAgICAgICAgIG5hdi5vblJvdXRlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCRldmVudCwgbmV4dCwgbGFzdCkge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgbmF2aWdhdGUgaWYgaXQncyBhIHZhbGlkIHJvdXRlIGFuZCBpdCdzIG5vdCBnb25uYSBqdXN0IHJlZGlyZWN0IGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0LiQkcm91dGUgfHwgIW5leHQuJCRyb3V0ZS5yZWRpcmVjdFRvKSB7XG4gICAgICAgICAgICAgICAgICAgIChuYXYub25Sb3V0ZVN1Y2Nlc3MgfHwgZGVmYXVsdFJvdXRlU3VjY2VzcykoJGV2ZW50LCBuZXh0LCBsYXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9NYWtlIHJvdXRlIGhpc3RvcnkgYWNjZXNzaWJsZSBieSByZWdvdVxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHBhZ2VOYXZlZCcsIG5leHQsIGxhc3QpO1xuXG5cbiAgICAgICAgICAgICAgICAvL1RPRE8g5Y6G5Y+y6K6w5b2V5Zue6YCAXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3R1YWxMb2NhdGlvbiA9ICRsb2NhdGlvbi5wYXRoKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRwYWdlVHJhbnNpdGlvblN1Y2Nlc3MnLCBmdW5jdGlvbihkZXNjLCBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBwYWdlVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGdvIC10cmFuc2l0aW9ucyB0byBuZXcgcGFnZVxuICAgICAgICAgICAgICogQHBhcmFtIHBhdGggLSBuZXcgcGF0aFxuICAgICAgICAgICAgICogQHBhcmFtIHtvcHRpb25hbH0gU3RyaW5nIHRyYW5zaXRpb25cbiAgICAgICAgICAgICAqIEBwYXJhbSB7b3B0aW9uYWx9IGJvb2xlYW4gaXNSZXZlcnNlLCBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5hdi5nbyA9IGZ1bmN0aW9uIGdvKHBhdGgsIHRyYW5zaXRpb24sIGlzUmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgIGlmKHBhZ2VUcmFuc2l0aW9uaW5nKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcGFnZVRyYW5zaXRpb25pbmcgPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRyYW5zaXRpb24gPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUmV2ZXJzZSA9IHRyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhdGgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKHBhdGgpO1xuICAgICAgICAgICAgICAgIC8vV2FpdCBmb3Igc3VjY2Vzc2Z1bCByb3V0ZSBjaGFuZ2UgYmVmb3JlIGFjdHVhbGx5IGRvaW5nIHN0dWZmXG4gICAgICAgICAgICAgICAgbmF2Lm9uUm91dGVTdWNjZXNzID0gZnVuY3Rpb24oJGV2ZW50LCBuZXh0LCBsYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHJvb3RTY29wZS5hY3R1YWxMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocGF0aCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL1RPRE8g5Y6G5Y+y6K6w5b2V5Zue6YCAXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRyb290U2NvcGUuYWN0dWFsTG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZigkcm9vdFNjb3BlLmFjdHVhbExvY2F0aW9uID09IHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IG5hdkhpc3RvcnlbbmF2SGlzdG9yeS5sZW5ndGgtMV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChwcmV2aW91cy5wYXRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9uYXYuYmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZIaXN0b3J5LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF2Lm5leHQgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKG5hdi5uZXh0LCBuYXYuY3VycmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBuYXYuY3VycmVudCAmJiBuYXZIaXN0b3J5LnB1c2goW25hdi5jdXJyZW50LCBsYXN0LiQkcm91dGUuY29udHJvbGxlcl0pO1xuICAgICAgICAgICAgICAgICAgICBuYXYubmV4dCA9IG5ldyBQYWdlKHBhdGgsIHRyYW5zaXRpb24gfHwgKG5leHQuJCRyb3V0ZSAmJiBuZXh0LiQkcm91dGUudHJhbnNpdGlvbiksIGlzUmV2ZXJzZSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKG5hdi5uZXh0LCBuYXYuY3VycmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9tb2RpZnkgaGlzdG9yeVxuICAgICAgICAgICAgbmF2Lm1vZGlmeUhpc3RvcnkgPSBmdW5jdGlvbihuZWVkbGVzc0hpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobmVlZGxlc3NIaXN0b3J5LCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBuYXZIaXN0b3J5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmF2SGlzdG9yeVtpXVsxXSA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZIaXN0b3J5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZSkge31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vU29tZXRpbWVzIHlvdSB3YW50IHRvIGVyYXNlIGhpc3RvcnlcbiAgICAgICAgICAgIG5hdi5lcmFzZUhpc3RvcnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuYXZIaXN0b3J5PVtdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5hdi5nZXRIaXN0b3J5PWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdkhpc3Rvcnk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmF2LmJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihwYWdlVHJhbnNpdGlvbmluZykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHBhZ2VUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAobmF2SGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IG5hdkhpc3RvcnlbbmF2SGlzdG9yeS5sZW5ndGgtMV1bMF07XG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKHByZXZpb3VzLnBhdGgoKSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdi5vblJvdXRlU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF2SGlzdG9yeS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShuYXYubmV4dCwgbmF2LmN1cnJlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBuYXY7XG4gICAgICAgIH1dO1xuICAgIH0pXG4vL2FuZ3VsYXIubW9kdWxlKCdham9zbGluLm1vYmlsZS1uYXZpZ2F0ZScpXG4gICAgbW9iaWxlTmF2TW9kLmRpcmVjdGl2ZSgnbW9iaWxlVmlldycsIFsnJHJvb3RTY29wZScsICckY29tcGlsZScsICckY29udHJvbGxlcicsICckcm91dGUnLCAnJGNoYW5nZScsICckcScsXG4gICAgICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRjb21waWxlLCAkY29udHJvbGxlciwgJHJvdXRlLCAkY2hhbmdlLCAkcSkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCB2aWV3RWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAvL0luc2VydCBwYWdlIGludG8gZG9tXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5zZXJ0UGFnZShwYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gJHJvdXRlLmN1cnJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbHMgPSBjdXJyZW50ICYmIGN1cnJlbnQubG9jYWxzO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UuZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgcGFnZS5lbGVtZW50Lmh0bWwobG9jYWxzLiR0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UuZWxlbWVudC5hZGRDbGFzcygnbWItcGFnZScpOyAvL2Fsd2F5cyBoYXMgdG8gaGF2ZSBwYWdlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIHBhZ2Uuc2NvcGUgPSBzY29wZS4kbmV3KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2Fscy4kc2NvcGUgPSBwYWdlLnNjb3BlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZS5jb250cm9sbGVyID0gJGNvbnRyb2xsZXIoY3VycmVudC5jb250cm9sbGVyLCBsb2NhbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZS5lbGVtZW50LmNvbnRlbnRzKCkuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBwYWdlLmNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKHBhZ2UuZWxlbWVudC5jb250ZW50cygpKShwYWdlLnNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2FscyAmJiBsb2NhbHMuJHRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFwcGVuZCBwYWdlIGVsZW1lbnQgaWYgYSB0ZW1wbGF0ZSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdFbGVtZW50LmFwcGVuZChwYWdlLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhZ2Uuc2NvcGUuJGVtaXQoJyR2aWV3Q29udGVudExvYWRlZCcpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlLnNjb3BlLiRldmFsKGF0dHJzLm9uTG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUcmFucztcbiAgICAgICAgICAgICAgICBzY29wZS4kb24oJyRwYWdlVHJhbnNpdGlvblN0YXJ0JywgZnVuY3Rpb24gKCRldmVudCwgZGVzdCwgc291cmNlLCByZXZlcnNlLGlzQmFjaykge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGFuZ2VQYWdlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudCAmJiAkcm91dGUuY3VycmVudC4kJHJvdXRlIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNCYWNrKXtyZXZlcnNlPXRydWU7fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSByZXZlcnNlID8gc291cmNlLnRyYW5zaXRpb24oKSA6IGRlc3QudHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRQYWdlKGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgcGFnZSBpcyBtYXJrZWQgYXMgcmV2ZXJzZSwgcmV2ZXJzZSB0aGUgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0J1dCxpZiBpdCdzIGEgbmF2LmJhY2sgQWN0aW9uLCBrZWVwIHJldmVyc2U9PXRydWUgIHJlZ291QDIwMTMuOS45XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdC5yZXZlcnNlKCkgfHwgY3VycmVudC5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWlzQmFjayl7cmV2ZXJzZSA9ICFyZXZlcnNlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvVHJhbnNpdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJGNoYW5nZShkZXN0LmVsZW1lbnQsIChzb3VyY2UgPyBzb3VyY2UuZWxlbWVudCA6IG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLCByZXZlcnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcGFnZVRyYW5zaXRpb25TdWNjZXNzJywgZGVzdCwgc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5zY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLmVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBuZXh0IGVsZW1lbnQgdG8gZGlzcGxheTogbm9uZSwgdGhlbiB3YWl0IHVudGlsIHRyYW5zaXRpb24gaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVhZHksIHRoZW4gc2hvdyBpdCBhZ2Fpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QuZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FsbG93IGEgZGVmZXJUcmFuc2l0aW9uIGV4cHJlc3Npb24sIHdoaWNoIGlzIGFsbG93ZWQgdG8gcmV0dXJuIGEgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVGhlIG5leHQgcGFnZSB3aWxsIGJlIGluc2VydGVkLCBidXQgbm90IHRyYW5zaXRpb25lZCBpbiB1bnRpbCB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pcyBmdWxmaWxsZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmZXJUcmFuc2l0aW9uUHJvbWlzZSA9IHNjb3BlLiRldmFsKGF0dHJzLmRlZmVyVHJhbnNpdGlvbikgfHwgJHEud2hlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJUcmFuc2l0aW9uUHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVW5kbyBkaXNwbGF5IG5vbmUgZnJvbSB3YWl0aW5nIGZvciB0cmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdC5lbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyVHJhbnNpdGlvblByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1VuZG8gZGlzcGxheSBub25lIGZyb20gd2FpdGluZyBmb3IgdHJhbnNpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LmVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9UcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlclRyYW5zaXRpb25Qcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmFucyAmJiBjdXJyZW50VHJhbnMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmFucyA9IGNoYW5nZVBhZ2UoZGVzdCwgc291cmNlLCByZXZlcnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICAgICAgICAgICAgbGluazogbGlua1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfV0pXG5cbiAgICAvLy5kaXJlY3RpdmUoJ3Njcm9sbGFibGUnLCBbJyRyb3V0ZScsICckdGltZW91dCcsIGZ1bmN0aW9uKCRyb3V0ZSwgJHRpbWVvdXQpIHtcbiAgICAvLyAgICB2YXIgc2Nyb2xsQ2FjaGUgPSB7fTtcbiAgICAvLyAgICByZXR1cm4ge1xuICAgIC8vICAgICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAvLyAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsbSwgYXR0cnMpIHtcbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjcm9sbENhY2hlKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgdmFyIHJvdXRlID0gJHJvdXRlLmN1cnJlbnQgPyAkcm91dGUuY3VycmVudC4kJHJvdXRlIDoge307XG4gICAgLy8gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSByb3V0ZS50ZW1wbGF0ZVVybCB8fCByb3V0ZS50ZW1wbGF0ZTtcbiAgICAvLyAgICAgICAgICAgIHZhciByYXdFbG0gPSBlbG1bMF07XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCRyb3V0ZSk7XG4gICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wbGF0ZSk7XG4gICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhyYXdFbG0pO1xuICAgIC8vXG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgIC8vT24gc2NvcGUgY3JlYXRpb24sIHNlZSBpZiB3ZSByZW1lbWJlcmVkIGFueSBzY3JvbGwgZm9yIHRoaXMgdGVtcGxhdGVVcmxcbiAgICAvLyAgICAgICAgICAgIC8vSWYgd2UgZGlkLCBzZXQgaXRcbiAgICAvLyAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgIC8vICAgICAgICAgICAgICAgIC8vU2V0IG9sZFNjcm9sbCBhZnRlciBhIHRpbWVvdXQgc28gdGhlIHBhZ2UgaGFzIHRpbWUgdG8gZnVsbHkgbG9hZFxuICAgIC8vICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgb2xkU2Nyb2xsID0gc2Nyb2xsQ2FjaGVbdGVtcGxhdGVdO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvbGRTY3JvbGwpO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChvbGRTY3JvbGwpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJhd0VsbS5zY3JvbGxUb3AgPSBvbGRTY3JvbGw7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgICB9KTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQ2FjaGVbdGVtcGxhdGVdID0gcmF3RWxtLnNjcm9sbFRvcDtcbiAgICAvLyAgICAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgfVxuICAgIC8vICAgIH07XG4gICAgLy99XSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBtb2JpbGVOYXZNb2Q7XG4iLCJcInVzZSBzdHJpY3RcIjsoZnVuY3Rpb24oKXt2YXIgYT1hbmd1bGFyLm1vZHVsZShcIm5nU3RvcmFnZVwiLFtdKS5mYWN0b3J5KFwiJGxvY2FsU3RvcmFnZVwiLGIoXCJsb2NhbFN0b3JhZ2VcIikpLmZhY3RvcnkoXCIkc2Vzc2lvblN0b3JhZ2VcIixiKFwic2Vzc2lvblN0b3JhZ2VcIikpO2Z1bmN0aW9uIGIoYyl7cmV0dXJuW1wiJHJvb3RTY29wZVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGQsbSl7dmFyIGw9bVtjXXx8KGNvbnNvbGUud2FybihcIlRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYiBTdG9yYWdlIVwiKSx7fSksaD17JGRlZmF1bHQ6ZnVuY3Rpb24obil7Zm9yKHZhciBpIGluIG4pe2FuZ3VsYXIuaXNEZWZpbmVkKGhbaV0pfHwoaFtpXT1uW2ldKX1yZXR1cm4gaH0sJHJlc2V0OmZ1bmN0aW9uKG4pe2Zvcih2YXIgaSBpbiBoKXtcIiRcIj09PWlbMF18fGRlbGV0ZSBoW2ldfXJldHVybiBoLiRkZWZhdWx0KG4pfX0saixmO2Zvcih2YXIgZz0wLGU7ZzxsLmxlbmd0aDtnKyspeyhlPWwua2V5KGcpKSYmXCJuZ1N0b3JhZ2UtXCI9PT1lLnNsaWNlKDAsMTApJiYoaFtlLnNsaWNlKDEwKV09YW5ndWxhci5mcm9tSnNvbihsLmdldEl0ZW0oZSkpKX1qPWFuZ3VsYXIuY29weShoKTtkLiR3YXRjaChmdW5jdGlvbigpe2Z8fChmPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtmPW51bGw7aWYoIWFuZ3VsYXIuZXF1YWxzKGgsaikpe2FuZ3VsYXIuZm9yRWFjaChoLGZ1bmN0aW9uKG8sbil7YW5ndWxhci5pc0RlZmluZWQobykmJlwiJFwiIT09blswXSYmbC5zZXRJdGVtKFwibmdTdG9yYWdlLVwiK24sYW5ndWxhci50b0pzb24obykpO2RlbGV0ZSBqW25dfSk7Zm9yKHZhciBpIGluIGope2wucmVtb3ZlSXRlbShcIm5nU3RvcmFnZS1cIitpKX1qPWFuZ3VsYXIuY29weShoKX19LDEwMCkpfSk7XCJsb2NhbFN0b3JhZ2VcIj09PWMmJm0uYWRkRXZlbnRMaXN0ZW5lciYmbS5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLGZ1bmN0aW9uKGkpe2lmKFwibmdTdG9yYWdlLVwiPT09aS5rZXkuc2xpY2UoMCwxMCkpe2kubmV3VmFsdWU/aFtpLmtleS5zbGljZSgxMCldPWFuZ3VsYXIuZnJvbUpzb24oaS5uZXdWYWx1ZSk6ZGVsZXRlIGhbaS5rZXkuc2xpY2UoMTApXTtqPWFuZ3VsYXIuY29weShoKTtkLiRhcHBseSgpfX0pO3JldHVybiBofV19bW9kdWxlLmV4cG9ydHM9YX0pKCk7IiwidmFyIFRvdWNoU2xpZGU9ZnVuY3Rpb24oYSl7YT1hfHx7fTt2YXIgYj17c2xpZGVDZWxsOmEuc2xpZGVDZWxsfHxcIiN0b3VjaFNsaWRlXCIsdGl0Q2VsbDphLnRpdENlbGx8fFwiLmhkIGxpXCIsbWFpbkNlbGw6YS5tYWluQ2VsbHx8XCIuYmRcIixlZmZlY3Q6YS5lZmZlY3R8fFwibGVmdFwiLGF1dG9QbGF5OmEuYXV0b1BsYXl8fCExLGRlbGF5VGltZTphLmRlbGF5VGltZXx8MjAwLGludGVyVGltZTphLmludGVyVGltZXx8MjUwMCxkZWZhdWx0SW5kZXg6YS5kZWZhdWx0SW5kZXh8fDAsdGl0T25DbGFzc05hbWU6YS50aXRPbkNsYXNzTmFtZXx8XCJvblwiLGF1dG9QYWdlOmEuYXV0b1BhZ2V8fCExLHByZXZDZWxsOmEucHJldkNlbGx8fFwiLnByZXZcIixuZXh0Q2VsbDphLm5leHRDZWxsfHxcIi5uZXh0XCIscGFnZVN0YXRlQ2VsbDphLnBhZ2VTdGF0ZUNlbGx8fFwiLnBhZ2VTdGF0ZVwiLHBuTG9vcDpcInVuZGVmaW5lZCBcIj09YS5wbkxvb3A/ITA6YS5wbkxvb3Asc3RhcnRGdW46YS5zdGFydEZ1bnx8bnVsbCxlbmRGdW46YS5lbmRGdW58fG51bGwsc3dpdGNoTG9hZDphLnN3aXRjaExvYWR8fG51bGx9LGM9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYi5zbGlkZUNlbGwucmVwbGFjZShcIiNcIixcIlwiKSk7aWYoIWMpcmV0dXJuITE7dmFyIGQ9ZnVuY3Rpb24oYSxiKXthPWEuc3BsaXQoXCIgXCIpO3ZhciBjPVtdO2I9Ynx8ZG9jdW1lbnQ7dmFyIGQ9W2JdO2Zvcih2YXIgZSBpbiBhKTAhPWFbZV0ubGVuZ3RoJiZjLnB1c2goYVtlXSk7Zm9yKHZhciBlIGluIGMpe2lmKDA9PWQubGVuZ3RoKXJldHVybiExO3ZhciBmPVtdO2Zvcih2YXIgZyBpbiBkKWlmKFwiI1wiPT1jW2VdWzBdKWYucHVzaChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjW2VdLnJlcGxhY2UoXCIjXCIsXCJcIikpKTtlbHNlIGlmKFwiLlwiPT1jW2VdWzBdKWZvcih2YXIgaD1kW2ddLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSxpPTA7aTxoLmxlbmd0aDtpKyspe3ZhciBqPWhbaV0uY2xhc3NOYW1lO2omJi0xIT1qLnNlYXJjaChuZXcgUmVnRXhwKFwiXFxcXGJcIitjW2VdLnJlcGxhY2UoXCIuXCIsXCJcIikrXCJcXFxcYlwiKSkmJmYucHVzaChoW2ldKX1lbHNlIGZvcih2YXIgaD1kW2ddLmdldEVsZW1lbnRzQnlUYWdOYW1lKGNbZV0pLGk9MDtpPGgubGVuZ3RoO2krKylmLnB1c2goaFtpXSk7ZD1mfXJldHVybiAwPT1kLmxlbmd0aHx8ZFswXT09Yj8hMTpkfSxlPWZ1bmN0aW9uKGEsYil7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLmlubmVySFRNTD1iLGM9Yy5jaGlsZHJlblswXTt2YXIgZD1hLmNsb25lTm9kZSghMCk7cmV0dXJuIGMuYXBwZW5kQ2hpbGQoZCksYS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjLGEpLG09ZCxjfSxnPWZ1bmN0aW9uKGEsYil7IWF8fCFifHxhLmNsYXNzTmFtZSYmLTEhPWEuY2xhc3NOYW1lLnNlYXJjaChuZXcgUmVnRXhwKFwiXFxcXGJcIitiK1wiXFxcXGJcIikpfHwoYS5jbGFzc05hbWUrPShhLmNsYXNzTmFtZT9cIiBcIjpcIlwiKStiKX0saD1mdW5jdGlvbihhLGIpeyFhfHwhYnx8YS5jbGFzc05hbWUmJi0xPT1hLmNsYXNzTmFtZS5zZWFyY2gobmV3IFJlZ0V4cChcIlxcXFxiXCIrYitcIlxcXFxiXCIpKXx8KGEuY2xhc3NOYW1lPWEuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFxzKlxcXFxiXCIrYitcIlxcXFxiXCIsXCJnXCIpLFwiXCIpKX0saT1iLmVmZmVjdCxqPWQoYi5wcmV2Q2VsbCxjKVswXSxrPWQoYi5uZXh0Q2VsbCxjKVswXSxsPWQoYi5wYWdlU3RhdGVDZWxsKVswXSxtPWQoYi5tYWluQ2VsbCxjKVswXTtpZighbSlyZXR1cm4hMTt2YXIgTixPLG49bS5jaGlsZHJlbi5sZW5ndGgsbz1kKGIudGl0Q2VsbCxjKSxwPW8/by5sZW5ndGg6bixxPWIuc3dpdGNoTG9hZCxyPXBhcnNlSW50KGIuZGVmYXVsdEluZGV4KSxzPXBhcnNlSW50KGIuZGVsYXlUaW1lKSx0PXBhcnNlSW50KGIuaW50ZXJUaW1lKSx1PVwiZmFsc2VcIj09Yi5hdXRvUGxheXx8MD09Yi5hdXRvUGxheT8hMTohMCx2PVwiZmFsc2VcIj09Yi5hdXRvUGFnZXx8MD09Yi5hdXRvUGFnZT8hMTohMCx3PVwiZmFsc2VcIj09Yi5wbkxvb3B8fDA9PWIucG5Mb29wPyExOiEwLHg9cix5PW51bGwsej1udWxsLEE9bnVsbCxCPTAsQz0wLEQ9MCxFPTAsRz0vaHAtdGFibGV0L2dpLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pLEg9XCJvbnRvdWNoc3RhcnRcImluIHdpbmRvdyYmIUcsST1IP1widG91Y2hzdGFydFwiOlwibW91c2Vkb3duXCIsSj1IP1widG91Y2htb3ZlXCI6XCJcIixLPUg/XCJ0b3VjaGVuZFwiOlwibW91c2V1cFwiLE09bS5wYXJlbnROb2RlLmNsaWVudFdpZHRoLFA9bjtpZigwPT1wJiYocD1uKSx2KXtwPW4sbz1vWzBdLG8uaW5uZXJIVE1MPVwiXCI7dmFyIFE9XCJcIjtpZigxPT1iLmF1dG9QYWdlfHxcInRydWVcIj09Yi5hdXRvUGFnZSlmb3IodmFyIFI9MDtwPlI7UisrKVErPVwiPGxpPlwiKyhSKzEpK1wiPC9saT5cIjtlbHNlIGZvcih2YXIgUj0wO3A+UjtSKyspUSs9Yi5hdXRvUGFnZS5yZXBsYWNlKFwiJFwiLFIrMSk7by5pbm5lckhUTUw9USxvPW8uY2hpbGRyZW59XCJsZWZ0TG9vcFwiPT1pJiYoUCs9MixtLmFwcGVuZENoaWxkKG0uY2hpbGRyZW5bMF0uY2xvbmVOb2RlKCEwKSksbS5pbnNlcnRCZWZvcmUobS5jaGlsZHJlbltuLTFdLmNsb25lTm9kZSghMCksbS5jaGlsZHJlblswXSkpLE49ZShtLCc8ZGl2IGNsYXNzPVwidGVtcFdyYXBcIiBzdHlsZT1cIm92ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZTtcIj48L2Rpdj4nKSxtLnN0eWxlLmNzc1RleHQ9XCJ3aWR0aDpcIitQKk0rXCJweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO21hcmdpbjowO1wiO2Zvcih2YXIgUj0wO1A+UjtSKyspbS5jaGlsZHJlbltSXS5zdHlsZS5jc3NUZXh0PVwiZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOnRvcDt3aWR0aDpcIitNK1wicHhcIjt2YXIgUz1mdW5jdGlvbigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGIuc3RhcnRGdW4mJmIuc3RhcnRGdW4ocixwKX0sVD1mdW5jdGlvbigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGIuZW5kRnVuJiZiLmVuZEZ1bihyLHApfSxVPWZ1bmN0aW9uKGEpe3ZhciBiPShcImxlZnRMb29wXCI9PWk/cisxOnIpK2EsYz1mdW5jdGlvbihhKXtmb3IodmFyIGI9bS5jaGlsZHJlblthXS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKSxjPTA7YzxiLmxlbmd0aDtjKyspYltjXS5nZXRBdHRyaWJ1dGUocSkmJihiW2NdLnNldEF0dHJpYnV0ZShcInNyY1wiLGJbY10uZ2V0QXR0cmlidXRlKHEpKSxiW2NdLnJlbW92ZUF0dHJpYnV0ZShxKSl9O2lmKGMoYiksXCJsZWZ0TG9vcFwiPT1pKXN3aXRjaChiKXtjYXNlIDA6YyhuKTticmVhaztjYXNlIDE6YyhuKzEpO2JyZWFrO2Nhc2UgbjpjKDApO2JyZWFrO2Nhc2UgbisxOmMoMSl9fSxWPWZ1bmN0aW9uKCl7TT1OLmNsaWVudFdpZHRoLG0uc3R5bGUud2lkdGg9UCpNK1wicHhcIjtmb3IodmFyIGE9MDtQPmE7YSsrKW0uY2hpbGRyZW5bYV0uc3R5bGUud2lkdGg9TStcInB4XCI7dmFyIGI9XCJsZWZ0TG9vcFwiPT1pP3IrMTpyO1coLWIqTSwwKX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixWLCExKTt2YXIgVz1mdW5jdGlvbihhLGIsYyl7Yz1jP2Muc3R5bGU6bS5zdHlsZSxjLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbj1jLk1velRyYW5zaXRpb25EdXJhdGlvbj1jLm1zVHJhbnNpdGlvbkR1cmF0aW9uPWMuT1RyYW5zaXRpb25EdXJhdGlvbj1jLnRyYW5zaXRpb25EdXJhdGlvbj1iK1wibXNcIixjLndlYmtpdFRyYW5zZm9ybT1cInRyYW5zbGF0ZShcIithK1wicHgsMCl0cmFuc2xhdGVaKDApXCIsYy5tc1RyYW5zZm9ybT1jLk1velRyYW5zZm9ybT1jLk9UcmFuc2Zvcm09XCJ0cmFuc2xhdGVYKFwiK2ErXCJweClcIn0sWD1mdW5jdGlvbihhKXtzd2l0Y2goaSl7Y2FzZVwibGVmdFwiOnI+PXA/cj1hP3ItMTowOjA+ciYmKHI9YT8wOnAtMSksbnVsbCE9cSYmVSgwKSxXKC1yKk0scykseD1yO2JyZWFrO2Nhc2VcImxlZnRMb29wXCI6bnVsbCE9cSYmVSgwKSxXKC0ocisxKSpNLHMpLC0xPT1yPyh6PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtXKC1wKk0sMCl9LHMpLHI9cC0xKTpyPT1wJiYoej1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7VygtTSwwKX0scykscj0wKSx4PXJ9UygpLEE9c2V0VGltZW91dChmdW5jdGlvbigpe1QoKX0scyk7Zm9yKHZhciBjPTA7cD5jO2MrKyloKG9bY10sYi50aXRPbkNsYXNzTmFtZSksYz09ciYmZyhvW2NdLGIudGl0T25DbGFzc05hbWUpOzA9PXcmJihoKGssXCJuZXh0U3RvcFwiKSxoKGosXCJwcmV2U3RvcFwiKSwwPT1yP2coaixcInByZXZTdG9wXCIpOnI9PXAtMSYmZyhrLFwibmV4dFN0b3BcIikpLGwmJihsLmlubmVySFRNTD1cIjxzcGFuPlwiKyhyKzEpK1wiPC9zcGFuPi9cIitwKX07aWYoWCgpLHUmJih5PXNldEludGVydmFsKGZ1bmN0aW9uKCl7cisrLFgoKX0sdCkpLG8pZm9yKHZhciBSPTA7cD5SO1IrKykhZnVuY3Rpb24oKXt2YXIgYT1SO29bYV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoeiksY2xlYXJUaW1lb3V0KEEpLHI9YSxYKCl9KX0oKTtrJiZrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7KDE9PXd8fHIhPXAtMSkmJihjbGVhclRpbWVvdXQoeiksY2xlYXJUaW1lb3V0KEEpLHIrKyxYKCkpfSksaiYmai5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpeygxPT13fHwwIT1yKSYmKGNsZWFyVGltZW91dCh6KSxjbGVhclRpbWVvdXQoQSksci0tLFgoKSl9KTt2YXIgWT1mdW5jdGlvbihhKXtjbGVhclRpbWVvdXQoeiksY2xlYXJUaW1lb3V0KEEpLE89dm9pZCAwLEQ9MDt2YXIgYj1IP2EudG91Y2hlc1swXTphO0I9Yi5wYWdlWCxDPWIucGFnZVksbS5hZGRFdmVudExpc3RlbmVyKEosWiwhMSksbS5hZGRFdmVudExpc3RlbmVyKEssJCwhMSl9LFo9ZnVuY3Rpb24oYSl7aWYoIUh8fCEoYS50b3VjaGVzLmxlbmd0aD4xfHxhLnNjYWxlJiYxIT09YS5zY2FsZSkpe3ZhciBiPUg/YS50b3VjaGVzWzBdOmE7aWYoRD1iLnBhZ2VYLUIsRT1iLnBhZ2VZLUMsXCJ1bmRlZmluZWRcIj09dHlwZW9mIE8mJihPPSEhKE98fE1hdGguYWJzKEQpPE1hdGguYWJzKEUpKSksIU8pe3N3aXRjaChhLnByZXZlbnREZWZhdWx0KCksdSYmY2xlYXJJbnRlcnZhbCh5KSxpKXtjYXNlXCJsZWZ0XCI6KDA9PXImJkQ+MHx8cj49cC0xJiYwPkQpJiYoRD0uNCpEKSxXKC1yKk0rRCwwKTticmVhaztjYXNlXCJsZWZ0TG9vcFwiOlcoLShyKzEpKk0rRCwwKX1udWxsIT1xJiZNYXRoLmFicyhEKT5NLzMmJlUoRD4tMD8tMToxKX19fSwkPWZ1bmN0aW9uKGEpezAhPUQmJihhLnByZXZlbnREZWZhdWx0KCksT3x8KE1hdGguYWJzKEQpPk0vMTAmJihEPjA/ci0tOnIrKyksWCghMCksdSYmKHk9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtyKyssWCgpfSx0KSkpLG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihKLFosITEpLG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihLLCQsITEpKX07bS5hZGRFdmVudExpc3RlbmVyKEksWSwhMSl9O21vZHVsZS5leHBvcnRzPVRvdWNoU2xpZGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGh0dHBQcm92aWRlcicsXG4gICAgZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIMK377+977+977+977+977+977+9XG4gICAgICAgICAqICovXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgICAud2hlbignL2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9ob21lLmh0bWwnLCAgLy/vv73vv73Ss1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcbiAgICAgICAgICAgICAgICAvL3Jlc29sdmU6IHtpc0luQXBwOiAnaXNJbkFwcCd9LFxuICAgICAgICAgICAgICAgIC8vbmF2YmFyOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgZnVuYzogJ2hvbWUnLFxuICAgICAgICAgICAgICAgIC8vICAgIHRpdGxlOiAn77+977+977+977+9JyxcbiAgICAgICAgICAgICAgICAvLyAgICBjYW5DbG9zZTogMVxuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aGVuKCcvaW50ZWdyYWxNYWxsJywge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvaW50ZWdyYWxNYWxsLmh0bWwnLCAgICAgIC8v77+977+977+977+977+9zLPvv71cbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaW50ZWdyYWxNYWxsQ3RybCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAud2hlbignL2NvdXBvbicsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2NvdXBvbi5odG1sJywgICAgICAvL++/vcW777+9yK9cbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY291cG9uQ3RybCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAud2hlbignL2NvdXBvbkRldGFpbCcsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2NvdXBvbkRldGFpbC5odG1sJywgICAgICAvL++/vcW777+9yK/vv73vv73vv73vv71cbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY291cG9uRGV0YWlsQ3RybCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLy53aGVuKCcvcmVnaXN0ZXInLCB7XG4gICAgICAgICAgICAvLyAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3JlZ2lzdGVyLmh0bWwnLCAgICAgIC8v16Lvv73vv71cbiAgICAgICAgICAgIC8vICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckN0cmwnXG4gICAgICAgICAgICAvL30pXG4gICAgICAgICAgICAvLy53aGVuKCcvcGVyc29uYWxDZW50ZXInLCB7XG4gICAgICAgICAgICAvLyAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3BlcnNvbmFsQ2VudGVyLmh0bWwnLCAgICAgIC8v77+977+977+977+977+977+977+9xKPvv73vv73vv73Use+/ve+/vVxuICAgICAgICAgICAgLy8gICAgY29udHJvbGxlcjogJ3BlcnNvbmFsQ2VudGVyQ3RybCdcbiAgICAgICAgICAgIC8vfSlcblxuICAgICAgICAgICAgLm90aGVyd2lzZSh7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogXCIvaG9tZVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICA7XG5cblxuXG5cblxuXG4gICAgICAgIC8qXG4gICAgICAgICogaHR0cO+/ve+/ve+/ve+/vVxuICAgICAgICAqICovXG4gICAgICAgIC8vQnkgZGVmYXVsdCwgalF1ZXJ5IHRyYW5zbWl0cyBkYXRhIHVzaW5nIENvbnRlbnQtVHlwZTogeC13d3ctZm9ybS11cmxlbmNvZGVkIGFuZCB0aGUgZmFtaWxpYXIgZm9vPWJhciZiYXo9bW9lIHNlcmlhbGl6YXRpb24uIEFuZ3VsYXJKUywgaG93ZXZlciwgdHJhbnNtaXRzIGRhdGEgdXNpbmcgQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uIGFuZCB7IFwiZm9vXCI6IFwiYmFyXCIsIFwiYmF6XCI6IFwibW9lXCIgfSBKU09OIHNlcmlhbGl6YXRpb24sIHdoaWNoIHVuZm9ydHVuYXRlbHkgc29tZSBXZWIgc2VydmVyIGxhbmd1YWdlc++/ve+/vW5vdGFibHkgUEhQ77+977+9ZG8gbm90IHVuc2VyaWFsaXplIG5hdGl2ZWx5XG4gICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wb3N0WydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgd29ya2hvcnNlOyBjb252ZXJ0cyBhbiBvYmplY3QgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkIHNlcmlhbGl6YXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHBhcmFtID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSAnJywgbmFtZSwgdmFsdWUsIGZ1bGxTdWJOYW1lLCBzdWJOYW1lLCBzdWJWYWx1ZSwgaW5uZXJPYmosIGk7XG4gICAgICAgICAgICBmb3IobmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9ialtuYW1lXTtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihpPTA7IGk8dmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlZhbHVlID0gdmFsdWVbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsU3ViTmFtZSA9IG5hbWUgKyAnWycgKyBpICsgJ10nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJPYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyT2JqW2Z1bGxTdWJOYW1lXSA9IHN1YlZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkgKz0gcGFyYW0oaW5uZXJPYmopICsgJyYnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHN1Yk5hbWUgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlZhbHVlID0gdmFsdWVbc3ViTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsU3ViTmFtZSA9IG5hbWUgKyAnWycgKyBzdWJOYW1lICsgJ10nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJPYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyT2JqW2Z1bGxTdWJOYW1lXSA9IHN1YlZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkgKz0gcGFyYW0oaW5uZXJPYmopICsgJyYnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSArICcmJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWVyeS5sZW5ndGggPyBxdWVyeS5zdWJzdHIoMCwgcXVlcnkubGVuZ3RoIC0gMSkgOiBxdWVyeTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBPdmVycmlkZSAkaHR0cCBzZXJ2aWNlJ3MgZGVmYXVsdCB0cmFuc2Zvcm1SZXF1ZXN0XG4gICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMudHJhbnNmb3JtUmVxdWVzdCA9IFtmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc09iamVjdChkYXRhKSAmJiBTdHJpbmcoZGF0YSkgIT09ICdbb2JqZWN0IEZpbGVdJyA/IHBhcmFtKGRhdGEpIDogZGF0YTtcbiAgICAgICAgfV07XG5cblxuXG5cbiAgICB9XG5dO1xuIFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJHJvb3RTY29wZScsICckd2luZG93JywgJyRyb3V0ZScsICckaHR0cCcsICckdGVtcGxhdGVDYWNoZScsICckbG9jYXRpb24nLCAnJG5hdmlnYXRlJywgJyR0aW1lb3V0JywgJyRsb2NhbFN0b3JhZ2UnLFxuICAgIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkd2luZG93LCAkcm91dGUsICRodHRwLCAkdGVtcGxhdGVDYWNoZSwgJGxvY2F0aW9uLCAkbmF2aWdhdGUsICR0aW1lb3V0LCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgICAgLyogbG9hZFBhZ2UoKTtcbiAgICAgICAgZnVuY3Rpb24gbG9hZFBhZ2UoKSB7XG4gICAgICAgICAgICB2YXIgcGFnZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFnZSA9IEpTT04ucGFyc2UoSDVOYXZpUGx1Z2luLmdldEN1cnJlbnRQYWdlKCkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHBhZ2UgPSB7Y3VycmVudFBhZ2U6IDB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKHBhZ2UuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIC8vJGxvY2F0aW9uLnBhdGgoJy8nKS5zZWFyY2goeydkZXBhcnR1cmVDaXR5JzogJ++/ve+/ve+/ve+/vScsIGFycml2YWxDaXR5OiAn77+977+977+977+9J30pLnJlcGxhY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9idXNPcmRlckxpc3QnKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJykucmVwbGFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ki9cblxuICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkSW4gPSAwO1xuICAgICAgICAkd2luZG93Lm5vdGlmeUxvZ2luU3RhdHVzID0gZnVuY3Rpb24gKGlzTG9nZ2VkSW4pIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNMb2dnZWRJbiA9IHBhcnNlSW50KGlzTG9nZ2VkSW4pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8v77+977+9yKHvv73Du++/ve+/ve+/vc+iXG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciB1c2VySW5mb1N0ciA9IEg1VXNlclBsdWdpbi5nZXRVc2VySW5mbygpO1xuICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBKU09OLnBhcnNlKHVzZXJJbmZvU3RyKTtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnN0YXRlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pc0xvZ2dlZEluID0gMTtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcklkOiBwYXJhbXMubWVtYmVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogcGFyYW1zLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZW5hbWU6IHBhcmFtcy50cnVlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJtb2JpbGU6IHBhcmFtcy51c2VybW9iaWxlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pc0xvZ2dlZEluID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG5cblxuICAgICAgICAvL9Sk77+9yLvvv73vv73vv73Eo++/ve+/vVxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHJvdXRlLnJvdXRlcywgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIGlmIChyLnRlbXBsYXRlVXJsKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KHIudGVtcGxhdGVVcmwsIHtjYWNoZTogJHRlbXBsYXRlQ2FjaGV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbi8vICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHsgLy/vv73vv73vv73vv73Eo++/veW7uu+/ve+/vVxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCR0ZW1wbGF0ZUNhY2hlLmluZm8oKSk7XG4vLyAgICAgICAgICAgICAgICAgICAgJHRlbXBsYXRlQ2FjaGUucmVtb3ZlQWxsKCk7XG4vLyAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIC8v77+977+916rvv73vv73vv73vv73CvdKz77+977+9XG4gICAgICAgICRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24gKGV2ZW50LCBjdXJyZW50LCBwcmV2aW91cywgcmVqZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uICYmIHJlamVjdGlvbi5uZWVkc0F1dGhlbnRpY2F0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLm5lZWRJbkFwcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvZXJyb3InKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgICAgICAgICAgICAgX2xvZy5jYWxsKGNvbnNvbGUsICclYycgKyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbignICcpLCAnY29sb3I6IHJlZDsnKVxuICAgICAgICAgICAgICAgIH0pKCdDb3B5cmlnaHQgMjAwMi0yMDE077+977+9yKjvv73vv73vv73vv73NrO+/ve+/ve+/ve+/ve+/ve+/ve+/vca877+977+9ybfvv73vv73vv73vv73eue+/vcu+IFxcblxcbkZyb250LUVuZCBXZWIgRGV2ZWxvcGVyOiDvv73vv73vv73vv70gZ3E2NTc0QExZLmNvbSAg77+977+977+977+9IGhyMDkyODhATFkuY29tJyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvL9Kz77+977+977+90Lvvv73vv73Jue+/ve+/ve+/ve+/vcSy77+977+977+9XG4gICAgICAgICRyb290U2NvcGUuJG9uKFwiJHBhZ2VOYXZlZFwiLCBmdW5jdGlvbiAoZXZlbnQsIG5leHQsIGxhc3QpIHtcbiAgICAgICAgICAgIC8v77+977+977+977+90rPvv73vv73vv73vv73vv73vv71cbiAgICAgICAgICAgIC8vdmFyIG5hdmJhciA9IG5leHQuJCRyb3V0ZVsnbmF2YmFyJ10sXG4gICAgICAgICAgICAvL2lmIChhbmd1bGFyLmlzT2JqZWN0KG5hdmJhcikpIHtcbiAgICAgICAgICAgIC8vICBuYXRpdmVQbHVnaW4uc2V0TmF2aWJhcihuYXZiYXIuZnVuYywgbmF2YmFyLnRpdGxlLCBuYXZiYXIuY2FuQ2xvc2UsIG5hdmJhci5zdWJ0aXRsZSwgbmF2YmFyLmhhc01lbnUsIG5hdmJhci5yaWdodG1lbnVUaXRsZSwgbmF2YmFyLmNhbGxiYWNrRXZlbnQpO1xuICAgICAgICAgICAgLy99XG5cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgIC8qIHZhciBjb250cm9sbGVyID0gbmV4dC4kJHJvdXRlLmNvbnRyb2xsZXI7XG4gICAgICAgICAgICAgICAgLy/vv73vv73vv73vv73Ss8qx77+977+977+977+977+977+9yrfvv73vv73CvFxuICAgICAgICAgICAgICAgIGlmIChjb250cm9sbGVyID09PSAnaG9tZUN0cmwnKSB7XG4gICAgICAgICAgICAgICAgICAgICRuYXZpZ2F0ZS5lcmFzZUhpc3RvcnkoKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8v77+977+977+977+90rPvv73vv73vv73vv73XqlxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvcmRlclBheUN0cmwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgJG5hdmlnYXRlLm1vZGlmeUhpc3RvcnkoWydidXNUcmFpbkxpc3RDdHJsJywgJ2ZpbGxJbk9yZGVyQ3RybCcsICdidXNPcmRlckRldGFpbEN0cmwnLCAncGF5RmFpbEN0cmwnLCAnb3JkZXJQYXlDdHJsJ10pOyAgIC8v77+977+977+967ap77+977+91qfvv73vv73Ss++/ve+/ve+/ve+/ve+/ve+/vcq377+977+9wrzvv73vv73vv73Gs++/ve+/ve+/ve+/ve+/vdKq77+977+90rPvv73vv71cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgLy8vL0JpbmQgdGhlIGAkbG9jYXRpb25DaGFuZ2VTdWNjZXNzYCBldmVudCBvbiB0aGUgcm9vdFNjb3BlLCBzbyB0aGF0IHdlIGRvbnQgbmVlZCB0b1xuICAgICAgICAvLy8vYmluZCBpbiBpbmR1dmlkdWFsIGNvbnRyb2xsZXJzLlxuICAgICAgICAvLyRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICRyb290U2NvcGUuYWN0dWFsTG9jYXRpb24gPSAkbG9jYXRpb24ucGF0aCgpO1xuICAgICAgICAvL30pO1xuICAgICAgICAvL1xuICAgICAgICAvLyRyb290U2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtyZXR1cm4gJGxvY2F0aW9uLnBhdGgoKX0sIGZ1bmN0aW9uIChuZXdMb2NhdGlvbiwgb2xkTG9jYXRpb24pIHtcbiAgICAgICAgLy8gICAgaWYoJHJvb3RTY29wZS5hY3R1YWxMb2NhdGlvbiA9PT0gbmV3TG9jYXRpb24pIHtcbiAgICAgICAgLy8gICAgICAgIGFsZXJ0KCdXaHkgZGlkIHlvdSB1c2UgaGlzdG9yeSBiYWNrPycpO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfSk7XG5cbiAgICB9XG5dOyIsInZhciBwcm92aWRlcnMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLnByb3ZpZGVyJywgW10pO1xuXG4vL0NvbmZpZ3VyYXRpb24gYmxvY2tzIC0gZ2V0IGV4ZWN1dGVkIGR1cmluZyB0aGUgcHJvdmlkZXIgcmVnaXN0cmF0aW9ucyBhbmQgY29uZmlndXJhdGlvbiBwaGFzZS4gT25seSBwcm92aWRlcnMgYW5kIGNvbnN0YW50cyBjYW4gYmUgaW5qZWN0ZWQgaW50byBjb25maWd1cmF0aW9uIGJsb2Nrcy4gVGhpcyBpcyB0byBwcmV2ZW50IGFjY2lkZW50YWwgaW5zdGFudGlhdGlvbiBvZiBzZXJ2aWNlcyBiZWZvcmUgdGhleSBoYXZlIGJlZW4gZnVsbHkgY29uZmlndXJlZC5cblxucHJvdmlkZXJzXG4gICAgLnByb3ZpZGVyKCdpc0luQXBwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRnZXQgPSBbJyRxJywgZnVuY3Rpb24gKCRxKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgLy9pZiAoaW50ZXJuYWwuaXNJbkFwcCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgIGRlZmVycmVkLnJlamVjdCh7IG5lZWRJbkFwcDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1dO1xuICAgIH1cbilcbiAgICAucHJvdmlkZXIoJ2lzTG9nZ2VkSW4nLCBmdW5jdGlvbiAoKSB7ICAvL+aYr+WQpueZu+mZhlxuICAgICAgICB0aGlzLiRnZXQgPSBbJyRxJywgJ2F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRxLCBhdXRoU2VydmljZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIGlmIChhdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHsgbmVlZHNBdXRoZW50aWNhdGlvbjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XTtcbiAgICB9XG4pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gcHJvdmlkZXJzOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBbJyRxJywgJyRodHRwJyxcbiAgICBmdW5jdGlvbiAoJHEsICRodHRwKSB7XG5cbiAgICAgICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbiAoaHR0cFBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGRhdGEsIGhlYWRlclJlcWRhdGE7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgZGF0YSA9IG5hdGl2ZVBsdWdpbi5nZXRTZXJ2aWNlUmVxdWVzdChodHRwUGFyYW1zLnNlcnZpY2VOYW1lLCBodHRwUGFyYW1zLnNlcnZpY2VQYXJhbXMpO1xuICAgICAgICAgICAgICAgIGhlYWRlclJlcWRhdGEgPSBuYXRpdmVQbHVnaW4uZW5jb2RlUmVxdWVzdChkYXRhKTtcbiAgICAgICAgICAgIH1jYXRjaChlKXt9XG5cblxuICAgICAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIG5ld0h0dHBQYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBodHRwUGFyYW1zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogIGh0dHBQYXJhbXMuY2FjaGUgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZW91dDogaHR0cFBhcmFtcy50aW1lb3V0IHx8IGRlZmVyLnByb21pc2UgfHwgMTUwMDAgLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGh0dHBQYXJhbXMuc3VjY2VzcyB8fCBhbmd1bGFyLm5vb3AsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGh0dHBQYXJhbXMuZXJyb3IgfHwgYW5ndWxhci5ub29wLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBodHRwUGFyYW1zLmNvbXBsZXRlIHx8IGFuZ3VsYXIubm9vcCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxZGF0YTogaGVhZGVyUmVxZGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cblxuXG5cbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gJGh0dHAobmV3SHR0cFBhcmFtcyk7ICAvL3JlcXVyZXN05Li65LiA5LiqZGVmZXIucHJvbWlzZVxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSByZXF1ZXN0LnN1Y2Nlc3MoXG4gICAgICAgICAgICAgICAgaHR0cFBhcmFtcy5zdWNjZXNzXG4gICAgICAgICAgICApLmVycm9yKFxuICAgICAgICAgICAgICAgIGh0dHBQYXJhbXMuZXJyb3JcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHByb21pc2UuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICBmaW5hbGx5KFxuICAgICAgICAgICAgICAgICAgICBodHRwUGFyYW1zLmNvbXBsZXRlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmFib3J0ID0gYW5ndWxhci5ub29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIgPSByZXF1ZXN0ID0gcHJvbWlzZSA9IG51bGw7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBnZXREYXRhO1xuICAgIH1cbl07XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBhbmNob3JTbW9vdGhTY3JvbGwgPSBmdW5jdGlvbiAoJHRpbWVvdXQpIHtcblxuICAgIHRoaXMuc2Nyb2xsVG8gPSBmdW5jdGlvbiAoZUlELCBzY3JvbGxBcmVhKSB7XG5cbiAgICAgICAgdmFyIHN0YXJ0WSA9IHNjcm9sbEFyZWEuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICBzdG9wWSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVJRCkub2Zmc2V0VG9wIC0gNDYsXG4gICAgICAgICAgICAgIG1heFN0b3BZID0gc2Nyb2xsQXJlYS5zY3JvbGxIZWlnaHQgLSBnZXRIZWlnaHQoc2Nyb2xsQXJlYSksXG4gICAgICAgICAgICAgIGRpc3RhbmNlID0gMDtcblxuICAgICAgICBpZiAoc3RvcFkgPiBtYXhTdG9wWSkgc3RvcFkgPSBtYXhTdG9wWTtcbiAgICAgICAgaWYgKHN0b3BZIDwgMCkgc3RvcFkgPSAwO1xuICAgICAgICBkaXN0YW5jZSA9IHN0b3BZID4gc3RhcnRZID8gc3RvcFkgLSBzdGFydFkgOiBzdGFydFkgLSBzdG9wWTtcbiAgICAgICAgaWYgKGRpc3RhbmNlID09IDApIHJldHVybjtcblxuICAgICAgICB2YXIgcyA9IDgwLCBzcyA9IDIwO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCAyMDApIHtcbiAgICAgICAgICAgIHMgPSA1O1xuICAgICAgICAgICAgc3MgPSAyMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3BlZWQgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gcyk7XG4gICAgICAgIGlmIChzcGVlZCA+PSAyMCkgc3BlZWQgPSAyMDtcbiAgICAgICAgdmFyIHN0ZXAgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gc3MpO1xuICAgICAgICB2YXIgbGVhcFkgPSBzdG9wWSA+IHN0YXJ0WSA/IHN0YXJ0WSArIHN0ZXAgOiBzdGFydFkgLSBzdGVwO1xuICAgICAgICB2YXIgdGltZXIgPSAwO1xuICAgICAgICBpZiAoc3RvcFkgPiBzdGFydFkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydFk7IGkgPCBzdG9wWTsgaSArPSBzdGVwKSB7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChjbG9zdXJlWSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxBcmVhLnNjcm9sbFRvcCA9IGNsb3N1cmVZO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aW1lciAqIHNwZWVkKTtcbiAgICAgICAgICAgICAgICB9KGxlYXBZKSk7XG5cbiAgICAgICAgICAgICAgICBsZWFwWSArPSBzdGVwOyBpZiAobGVhcFkgPiBzdG9wWSkgbGVhcFkgPSBzdG9wWTsgdGltZXIrKztcbiAgICAgICAgICAgIH0gcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydFk7IGkgPiBzdG9wWTsgaSAtPSBzdGVwKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKGNsb3N1cmVZKSB7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxBcmVhLnNjcm9sbFRvcCA9IGNsb3N1cmVZO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVyICogc3BlZWQpO1xuICAgICAgICAgICAgfShsZWFwWSkpO1xuXG4gICAgICAgICAgICBsZWFwWSAtPSBzdGVwOyBpZiAobGVhcFkgPCBzdG9wWSkgbGVhcFkgPSBzdG9wWTsgdGltZXIrKztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRIZWlnaHQoZWxlKXtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChlbGUuY3VycmVudFN0eWxlPyBlbGUuY3VycmVudFN0eWxlIDogd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlLCBudWxsKS5oZWlnaHQpIHx8IDA7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBbJyR0aW1lb3V0JywgYW5jaG9yU21vb3RoU2Nyb2xsXTsiLCIndXNlIHN0cmljdCc7XG5cblxudmFyIHZhbGlkYXRlTG9naW4gPSAgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlzQXV0aGVudGljYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSB1c2VyIGlzIGxvZ2dlZCBpbi5cbiAgICAgICAgICAgIHJldHVybiAkcm9vdFNjb3BlLmlzTG9nZ2VkSW47XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBbJyRyb290U2NvcGUnLCB2YWxpZGF0ZUxvZ2luXTsiLCIvKipcbiAqICBAYnJpZWYgIOaXpeacn+aIluaXtumXtOWwj+S6jjDnmoTliY3pnaLliqAwXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBbZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIGlmIChpIDwgMTAgJiYgaSA+PSAwKSB7XG4gICAgICAgICAgICBpID0gJzAnICsgaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTtcbiAgICB9O1xufV07XG5cbiIsIi8qKlxuICogIEBicmllZiDovazmjaLlrZfnrKbmjaIyMDE0LTA4LTI4IDE3OjAwOjAw5oiQ5pel5pyf5oiW5pe26Ze05oizXG4gKiAgQGRlc2NyaXB0aW9uXG4gKiAgQG1ldGhvZCBpc1ZhbGlkVGltZSDmmK/lkKbkuLrlrZfnrKbkuLLml6XmnJ9cbiAqICBAbWV0aG9kIHRvRGF0ZSDovazmjaLkuLrml7bpl7RcbiAqICBAbWV0aG9kIHRvVW5peCDovazmjaLkuLrml7bpl7TmiLNcbiAqICBAYXV0aG9yIOmDrea4hVxuICovXG4ndXNlIHN0cmljdCc7XG5cblxuZnVuY3Rpb24gaXNWYWxpZFRpbWUodGltZSkge1xuICAgIGlmKHR5cGVvZih0aW1lKSA9PSAnc3RyaW5nJyAmJiB0aW1lKXJldHVybiB0cnVlO1xufVxuXG5cbi8v6L+U5Zue5pel5pyfXG5mdW5jdGlvbiB0b0RhdGUodGltZSkgeyAvL3RpbWUgMjAxNC0wOC0yOCAxNzowMDowMFxuICAgIGlmKGlzVmFsaWRUaW1lKHRpbWUpKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lLnJlcGxhY2UoLy0vZywgJy8nKSk7IC8vMjAxNC8wOC8yOCAxNzowMDowMFxuICAgIH1cbn1cblxuLy/ov5Tlm57ml7bpl7TmiLNcbmZ1bmN0aW9uIHRvVW5peCh0aW1lKSB7XG4gICAgaWYoaXNWYWxpZFRpbWUodGltZSkpIHtcbiAgICAgICAgcmV0dXJuIHRvRGF0ZSh0aW1lKS5nZXRUaW1lKCk7IC8vMTk1NjU4NzQxMDAwXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b0RhdGU6IHRvRGF0ZSxcbiAgICAgICAgdG9Vbml4OiB0b1VuaXhcbiAgICB9XG59XTtcblxuXG5cbiIsIi8qKlxuICog5rG96L2m56Wo5pel5pyf6KGo5qC855qE5pel5pyf6IyD5Zu0XG4gKiAgQHJldHVybiB7T2JqZWN0fVxuICogIHN0YXJ0IOW8gOWni+aXpeacn1xuICogIGVuZCDnu5PmnZ/ml6XmnJ9cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uKCkge1xuICAgIHZhciB0ZW1wRGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgIHN0YXJ0RGF0ZVVuaXggPSBuZXcgRGF0ZSh0ZW1wRGF0ZS5nZXRGdWxsWWVhcigpLCB0ZW1wRGF0ZS5nZXRNb250aCgpLCB0ZW1wRGF0ZS5nZXREYXRlKCkpLmdldFRpbWUoKSxcbiAgICAgICAgZW5kRGF0ZVVuaXggPSBuZXcgRGF0ZSh0ZW1wRGF0ZS5nZXRGdWxsWWVhcigpLCB0ZW1wRGF0ZS5nZXRNb250aCgpLCB0ZW1wRGF0ZS5nZXREYXRlKCkgKyA5KS5nZXRUaW1lKCk7ICAvL+ihqOekuuWPr+mAieiMg+WbtOS4ujEw5aSp5LmL5YaF55qE6L2m56WoXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnREYXRlVW5peDogc3RhcnREYXRlVW5peCxcbiAgICAgICAgZW5kRGF0ZVVuaXg6IGVuZERhdGVVbml4XG4gICAgfVxufV07XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiDlrZjlgqjljoblj7LorrDlvZVcbiAqICovXG5cblxudmFyIGhpc3RvcnlSZWNvcmRzID0gZnVuY3Rpb24gKCRsb2NhbFN0b3JhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzdG9yZUtleSwgc3RvcmVWYWx1ZSwgbWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICBtYXhsZW5ndGggPSBtYXhsZW5ndGggPyBtYXhsZW5ndGggOiA1O1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzU3RyaW5nKHN0b3JlS2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybigna2V5IG1hc3QgYmUgYSBzdHJpbmcnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhpc3RvcnlSZWNvcmRzID0gJGxvY2FsU3RvcmFnZVtzdG9yZUtleV07XG4gICAgICAgICAgICBpZiAoaGlzdG9yeVJlY29yZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci50b0pzb24oaGlzdG9yeVJlY29yZHMpLmluZGV4T2YoICBhbmd1bGFyLnRvSnNvbihzdG9yZVZhbHVlKSApID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoaXN0b3J5UmVjb3Jkcy5sZW5ndGggPj0gbWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5UmVjb3Jkcy5zcGxpY2UoaGlzdG9yeVJlY29yZHMubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeVJlY29yZHMudW5zaGlmdChzdG9yZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2FsU3RvcmFnZVtzdG9yZUtleV0gPSBoaXN0b3J5UmVjb3JkcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRsb2NhbFN0b3JhZ2Vbc3RvcmVLZXldID0gW3N0b3JlVmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIChzdG9yZUtleSkge1xuICAgICAgICAgICAgcmV0dXJuICRsb2NhbFN0b3JhZ2Vbc3RvcmVLZXldO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIChzdG9yZUtleSkge1xuICAgICAgICAgICAgZGVsZXRlICRsb2NhbFN0b3JhZ2Vbc3RvcmVLZXldO1xuICAgICAgICB9XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBbJyRsb2NhbFN0b3JhZ2UnLCBoaXN0b3J5UmVjb3JkcyBdOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICog5a2Y5YKo6K+35rGC5pWw5o2uXG4gKiAqL1xuXG5cbnZhciBodHRwQ2FjaGVEYXRhID0gZnVuY3Rpb24gKCRjYWNoZUZhY3RvcnkpIHtcbiAgICByZXR1cm4gJGNhY2hlRmFjdG9yeSgnaHR0cENhY2hlRGF0YScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBbJyRjYWNoZUZhY3RvcnknLCBodHRwQ2FjaGVEYXRhXTsiLCJ2YXIgc2VydmljZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuXG5cblxuc2VydmljZXNcbiAgICAvLy5mYWN0b3J5KCdhcGknLCByZXF1aXJlKCcuL2FwaScpKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lkI7lj7DmjqXlj6PlnLDlnYBcbiAgICAuZmFjdG9yeSgnYXV0aFNlcnZpY2UnLCByZXF1aXJlKCcuL2F1dGhTZXJ2aWNlJykpICAgICAgICAgICAgIC8v5Yik5pat55So5oi35piv5ZCm55m76ZmGXG4gICAgLmZhY3RvcnkoJ2F1dGhTZXJ2aWNlJywgcmVxdWlyZSgnLi9hdXRoU2VydmljZScpKSAgICAgICAgICAgICAvL+WIpOaWreeUqOaIt+aYr+WQpueZu+mZhlxuICAgIC5mYWN0b3J5KCduYXYnLCByZXF1aXJlKCcuL25hdicpKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pobXpnaLlr7zoiKpcbiAgICAuc2VydmljZSgnaGlzdG9yeVJlY29yZHMnLCByZXF1aXJlKCcuL2hpc3RvcnlSZWNvcmRzJykpICAgICAgIC8v5Y6G5Y+y6K6w5b2VXG4gICAgLmZhY3RvcnkoJ25leHVzJywgcmVxdWlyZSgnLi9uZXh1cycpKSAgICAgICAgICAgICAgICAgICAgICAgICAvL+WtmOWCqHNjb3Bl5Lit55qE5pWw5o2uXG4gICAgLnNlcnZpY2UoJ2xvYWRpbmcnLCByZXF1aXJlKCcuL2xvYWRpbmcnKSkgICAgICAgICAgICAgICAgICAgICAvL+ato+WcqOWKoOi9veaPkOekuuahhlxuICAgIC5zZXJ2aWNlKCdkYXRlUmFuZ2UnLCByZXF1aXJlKCcuL2RhdGVSYW5nZScpKSAgICAgICAgICAgICAgICAgLy/msb3ovabnpajml6XmnJ/ooajmoLznmoTml6XmnJ/ojIPlm7RcbiAgICAuc2VydmljZSgndmFsaWRhdGUnLCByZXF1aXJlKCcuL3ZhbGlkYXRlJykpICAgICAgICAgICAgICAgICAgIC8v5omL5py65Y+3562J6aqM6K+BXG4gICAuc2VydmljZSgnYW5jaG9yU21vb3RoU2Nyb2xsJywgcmVxdWlyZSgnLi9hbmNob3JTbW9vdGhTY3JvbGwnKSlcbiAgICAuZmFjdG9yeSgnQUpBWCcsIHJlcXVpcmUoJy4vQUpBWCcpKSAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQUpBWFxuICAgIC8vLmZhY3RvcnkoJ1NFUlZFUkRBVEUnLCByZXF1aXJlKCcuL1NFUlZFUkRBVEUnKSkgICAgICAgICAgICAgIC8v6I635Y+W5pyN5Yqh5Zmo5pe26Ze0XG4gICAgLmZhY3RvcnkoJ2NvdmVydFRpbWUnLCByZXF1aXJlKCcuL2NvdmVydFRpbWUnKSkgICAgICAgICAgICAgIC8v6L2s5o2i5pe26Ze0XG4gICAgLmZhY3RvcnkoJ2NoZWNrVGltZScsIHJlcXVpcmUoJy4vY2hlY2tUaW1lJykpICAgICAgICAgICAgICAvL+i9rOaNouaXtumXtFxuICAgIC8vLmZhY3RvcnkoJ3JlcXVlc3QnLCByZXF1aXJlKCcuL3JlcXVlc3QnKSlcbiAgICAuZmFjdG9yeSgnaHR0cENhY2hlRGF0YScsIHJlcXVpcmUoJy4vaHR0cENhY2hlRGF0YScpKVxuICAgIC5mYWN0b3J5KCdzZWxlY3RDaGVja2VkJywgcmVxdWlyZSgnLi9zZWxlY3RDaGVja2VkJykpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmljZXM7IiwiLyoqXG4gKiDmmL7npLrlkozpmpDol4/mraPlnKjliqDovb3mj5DnpLrmoYZcbiAqICBAcmV0dXJuIHtPYmplY3R9XG4gKiAgc2hvdyDmmL7npLrliqDovb1cbiAqICBoaWRlIOmakOiXj+WKoOi9vVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBsb2FkaW5nKCRyb290U2NvcGUpIHtcbiAgICB2YXIgc2hvdyA9IGZ1bmN0aW9uKGxvYWRpbmdUZXh0KSB7XG4gICAgICAgIGlmKCFsb2FkaW5nVGV4dCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5sb2FkaW5nVGV4dCA9ICfmraPlnKjliqDovb0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5sb2FkaW5nVGV4dCA9IGxvYWRpbmdUZXh0O1xuICAgICAgICB9XG4gICAgICAgICRyb290U2NvcGUuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIH07XG5cbiAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcm9vdFNjb3BlLnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNob3c6IHNob3csXG4gICAgICAgIGhpZGU6IGhpZGVcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gWyckcm9vdFNjb3BlJywgbG9hZGluZ107XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICBbJyRuYXZpZ2F0ZScsXG4gICAgZnVuY3Rpb24oJG5hdmlnYXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzbGlkZVBhZ2U6IGZ1bmN0aW9uIChwYXRoLCBhbmltYXRlLCByZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgaWYocmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAkbmF2aWdhdGUuZ28ocGF0aCwgYW5pbWF0ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJG5hdmlnYXRlLmdvKHBhdGgsIGFuaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJG5hdmlnYXRlLmJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbl07XG4iLCIvKipcbiAqIOaVsOaNruaeoue6vSznlKjkuo7kv53mjIHlkozkuqTmjaLmlbDmja5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGVyc2lzdGVudERhdGEgPSB7fTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oa2V5LCBuZWVkQ2xvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHBlcnNpc3RlbnREYXRhW2tleV07XG4vLyAgICAgICAgICAgICAgICBpZiAobmVlZENsb25lKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShkYXRhKTtcbi8vICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbi8vICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnREYXRhW2tleV0gPSBkYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50RGF0YVtrZXldID0gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50RGF0YSA9IHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbl07XG4iLCIvKipcbiAqICBAYnJpZWYgIGNsaWNr5LqL5Lu25ZCO5re75Yqg5qC35byPXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBbZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgc3R5bGVBcnIsIGNsYXNzTmFtZSkge1xuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBzdHlsZUFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYoaSA9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHN0eWxlQXJyW2ldID0gY2xhc3NOYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHlsZUFycltpXSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1dO1xuXG4iLCIvKipcbiAqICDpqozor4HohJrmnKxcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlzTW9iaWxlOiBmdW5jdGlvbihlKSB7ICAvL+aYr+WQpuaYr+aJi+acuuWPt+eggVxuICAgICAgICAgICAgdmFyIHQgPSAvXigxWzMtOF1bMC05XSlcXGR7OH0kLztcbi8vICAgICAgICAgICAgLyhbK10/ODYpPygxM1swLTldfDE0WzV8N118MTVbMHwxfDJ8M3w1fDZ8N3w4fDldfDE4WzB8MXwyfDN8NXw2fDd8OHw5XSlcXGR7OH0vXG4gICAgICAgICAgICByZXR1cm4gdC50ZXN0KGUpO1xuICAgICAgICB9LFxuICAgICAgICBpc0VtcHR5OiBmdW5jdGlvbih2YWx1ZSkgeyAvL+aYr+WQpuS4uiBOYU4sIHVuZGVmaW5lZCwgbnVsbCAsIDAgLCAnJywgZmFsc2VcbiAgICAgICAgICAgIGlmKHZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbXB0eU9iamVjdDogZnVuY3Rpb24gKGUpIHsgIC8v5piv5ZCm5Li656m65a+56LGh77yM5YyF5ous56m65pWw57uEXG4gICAgICAgICAgICBmb3IgKHZhciB0IGluIGUpIHJldHVybiExO1xuICAgICAgICAgICAgcmV0dXJuITBcbiAgICAgICAgfVxuICAgIH1cbn1dO1xuXG5cbiIsIi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhckpTIHYxLjQuN1xuICogKGMpIDIwMTAtMjAxNSBHb29nbGUsIEluYy4gaHR0cDovL2FuZ3VsYXJqcy5vcmdcbiAqIExpY2Vuc2U6IE1JVFxuICovXG4oZnVuY3Rpb24od2luZG93LCBhbmd1bGFyLCB1bmRlZmluZWQpIHsndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nZG9jIG1vZHVsZVxuICogQG5hbWUgbmdSb3V0ZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogIyBuZ1JvdXRlXG4gKlxuICogVGhlIGBuZ1JvdXRlYCBtb2R1bGUgcHJvdmlkZXMgcm91dGluZyBhbmQgZGVlcGxpbmtpbmcgc2VydmljZXMgYW5kIGRpcmVjdGl2ZXMgZm9yIGFuZ3VsYXIgYXBwcy5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBTZWUge0BsaW5rIG5nUm91dGUuJHJvdXRlI2V4YW1wbGUgJHJvdXRlfSBmb3IgYW4gZXhhbXBsZSBvZiBjb25maWd1cmluZyBhbmQgdXNpbmcgYG5nUm91dGVgLlxuICpcbiAqXG4gKiA8ZGl2IGRvYy1tb2R1bGUtY29tcG9uZW50cz1cIm5nUm91dGVcIj48L2Rpdj5cbiAqL1xuIC8qIGdsb2JhbCAtbmdSb3V0ZU1vZHVsZSAqL1xudmFyIG5nUm91dGVNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdSb3V0ZScsIFsnbmcnXSkuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcignJHJvdXRlJywgJFJvdXRlUHJvdmlkZXIpLFxuICAgICRyb3V0ZU1pbkVyciA9IGFuZ3VsYXIuJCRtaW5FcnIoJ25nUm91dGUnKTtcblxuLyoqXG4gKiBAbmdkb2MgcHJvdmlkZXJcbiAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVXNlZCBmb3IgY29uZmlndXJpbmcgcm91dGVzLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIFNlZSB7QGxpbmsgbmdSb3V0ZS4kcm91dGUjZXhhbXBsZSAkcm91dGV9IGZvciBhbiBleGFtcGxlIG9mIGNvbmZpZ3VyaW5nIGFuZCB1c2luZyBgbmdSb3V0ZWAuXG4gKlxuICogIyMgRGVwZW5kZW5jaWVzXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUm91dGUgYG5nUm91dGVgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICovXG5mdW5jdGlvbiAkUm91dGVQcm92aWRlcigpIHtcbiAgZnVuY3Rpb24gaW5oZXJpdChwYXJlbnQsIGV4dHJhKSB7XG4gICAgcmV0dXJuIGFuZ3VsYXIuZXh0ZW5kKE9iamVjdC5jcmVhdGUocGFyZW50KSwgZXh0cmEpO1xuICB9XG5cbiAgdmFyIHJvdXRlcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBAbmdkb2MgbWV0aG9kXG4gICAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyI3doZW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUm91dGUgcGF0aCAobWF0Y2hlZCBhZ2FpbnN0IGAkbG9jYXRpb24ucGF0aGApLiBJZiBgJGxvY2F0aW9uLnBhdGhgXG4gICAqICAgIGNvbnRhaW5zIHJlZHVuZGFudCB0cmFpbGluZyBzbGFzaCBvciBpcyBtaXNzaW5nIG9uZSwgdGhlIHJvdXRlIHdpbGwgc3RpbGwgbWF0Y2ggYW5kIHRoZVxuICAgKiAgICBgJGxvY2F0aW9uLnBhdGhgIHdpbGwgYmUgdXBkYXRlZCB0byBhZGQgb3IgZHJvcCB0aGUgdHJhaWxpbmcgc2xhc2ggdG8gZXhhY3RseSBtYXRjaCB0aGVcbiAgICogICAgcm91dGUgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogICAgKiBgcGF0aGAgY2FuIGNvbnRhaW4gbmFtZWQgZ3JvdXBzIHN0YXJ0aW5nIHdpdGggYSBjb2xvbjogZS5nLiBgOm5hbWVgLiBBbGwgY2hhcmFjdGVycyB1cFxuICAgKiAgICAgICAgdG8gdGhlIG5leHQgc2xhc2ggYXJlIG1hdGNoZWQgYW5kIHN0b3JlZCBpbiBgJHJvdXRlUGFyYW1zYCB1bmRlciB0aGUgZ2l2ZW4gYG5hbWVgXG4gICAqICAgICAgICB3aGVuIHRoZSByb3V0ZSBtYXRjaGVzLlxuICAgKiAgICAqIGBwYXRoYCBjYW4gY29udGFpbiBuYW1lZCBncm91cHMgc3RhcnRpbmcgd2l0aCBhIGNvbG9uIGFuZCBlbmRpbmcgd2l0aCBhIHN0YXI6XG4gICAqICAgICAgICBlLmcuYDpuYW1lKmAuIEFsbCBjaGFyYWN0ZXJzIGFyZSBlYWdlcmx5IHN0b3JlZCBpbiBgJHJvdXRlUGFyYW1zYCB1bmRlciB0aGUgZ2l2ZW4gYG5hbWVgXG4gICAqICAgICAgICB3aGVuIHRoZSByb3V0ZSBtYXRjaGVzLlxuICAgKiAgICAqIGBwYXRoYCBjYW4gY29udGFpbiBvcHRpb25hbCBuYW1lZCBncm91cHMgd2l0aCBhIHF1ZXN0aW9uIG1hcms6IGUuZy5gOm5hbWU/YC5cbiAgICpcbiAgICogICAgRm9yIGV4YW1wbGUsIHJvdXRlcyBsaWtlIGAvY29sb3IvOmNvbG9yL2xhcmdlY29kZS86bGFyZ2Vjb2RlKlxcL2VkaXRgIHdpbGwgbWF0Y2hcbiAgICogICAgYC9jb2xvci9icm93bi9sYXJnZWNvZGUvY29kZS93aXRoL3NsYXNoZXMvZWRpdGAgYW5kIGV4dHJhY3Q6XG4gICAqXG4gICAqICAgICogYGNvbG9yOiBicm93bmBcbiAgICogICAgKiBgbGFyZ2Vjb2RlOiBjb2RlL3dpdGgvc2xhc2hlc2AuXG4gICAqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZSBNYXBwaW5nIGluZm9ybWF0aW9uIHRvIGJlIGFzc2lnbmVkIHRvIGAkcm91dGUuY3VycmVudGAgb24gcm91dGVcbiAgICogICAgbWF0Y2guXG4gICAqXG4gICAqICAgIE9iamVjdCBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgICAtIGBjb250cm9sbGVyYCDigJMgYHsoc3RyaW5nfGZ1bmN0aW9uKCk9fWAg4oCTIENvbnRyb2xsZXIgZm4gdGhhdCBzaG91bGQgYmUgYXNzb2NpYXRlZCB3aXRoXG4gICAqICAgICAgbmV3bHkgY3JlYXRlZCBzY29wZSBvciB0aGUgbmFtZSBvZiBhIHtAbGluayBhbmd1bGFyLk1vZHVsZSNjb250cm9sbGVyIHJlZ2lzdGVyZWRcbiAgICogICAgICBjb250cm9sbGVyfSBpZiBwYXNzZWQgYXMgYSBzdHJpbmcuXG4gICAqICAgIC0gYGNvbnRyb2xsZXJBc2Ag4oCTIGB7c3RyaW5nPX1gIOKAkyBBbiBpZGVudGlmaWVyIG5hbWUgZm9yIGEgcmVmZXJlbmNlIHRvIHRoZSBjb250cm9sbGVyLlxuICAgKiAgICAgIElmIHByZXNlbnQsIHRoZSBjb250cm9sbGVyIHdpbGwgYmUgcHVibGlzaGVkIHRvIHNjb3BlIHVuZGVyIHRoZSBgY29udHJvbGxlckFzYCBuYW1lLlxuICAgKiAgICAtIGB0ZW1wbGF0ZWAg4oCTIGB7c3RyaW5nPXxmdW5jdGlvbigpPX1gIOKAkyBodG1sIHRlbXBsYXRlIGFzIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgKiAgICAgIHJldHVybnMgYW4gaHRtbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyB3aGljaCBzaG91bGQgYmUgdXNlZCBieSB7QGxpbmtcbiAgICogICAgICBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgbmdWaWV3fSBvciB7QGxpbmsgbmcuZGlyZWN0aXZlOm5nSW5jbHVkZSBuZ0luY2x1ZGV9IGRpcmVjdGl2ZXMuXG4gICAqICAgICAgVGhpcyBwcm9wZXJ0eSB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYHRlbXBsYXRlVXJsYC5cbiAgICpcbiAgICogICAgICBJZiBgdGVtcGxhdGVgIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICAgKlxuICAgKiAgICAgIC0gYHtBcnJheS48T2JqZWN0Pn1gIC0gcm91dGUgcGFyYW1ldGVycyBleHRyYWN0ZWQgZnJvbSB0aGUgY3VycmVudFxuICAgKiAgICAgICAgYCRsb2NhdGlvbi5wYXRoKClgIGJ5IGFwcGx5aW5nIHRoZSBjdXJyZW50IHJvdXRlXG4gICAqXG4gICAqICAgIC0gYHRlbXBsYXRlVXJsYCDigJMgYHtzdHJpbmc9fGZ1bmN0aW9uKCk9fWAg4oCTIHBhdGggb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcGF0aCB0byBhbiBodG1sXG4gICAqICAgICAgdGVtcGxhdGUgdGhhdCBzaG91bGQgYmUgdXNlZCBieSB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld30uXG4gICAqXG4gICAqICAgICAgSWYgYHRlbXBsYXRlVXJsYCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAgICpcbiAgICogICAgICAtIGB7QXJyYXkuPE9iamVjdD59YCAtIHJvdXRlIHBhcmFtZXRlcnMgZXh0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnRcbiAgICogICAgICAgIGAkbG9jYXRpb24ucGF0aCgpYCBieSBhcHBseWluZyB0aGUgY3VycmVudCByb3V0ZVxuICAgKlxuICAgKiAgICAtIGByZXNvbHZlYCAtIGB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uPj19YCAtIEFuIG9wdGlvbmFsIG1hcCBvZiBkZXBlbmRlbmNpZXMgd2hpY2ggc2hvdWxkXG4gICAqICAgICAgYmUgaW5qZWN0ZWQgaW50byB0aGUgY29udHJvbGxlci4gSWYgYW55IG9mIHRoZXNlIGRlcGVuZGVuY2llcyBhcmUgcHJvbWlzZXMsIHRoZSByb3V0ZXJcbiAgICogICAgICB3aWxsIHdhaXQgZm9yIHRoZW0gYWxsIHRvIGJlIHJlc29sdmVkIG9yIG9uZSB0byBiZSByZWplY3RlZCBiZWZvcmUgdGhlIGNvbnRyb2xsZXIgaXNcbiAgICogICAgICBpbnN0YW50aWF0ZWQuXG4gICAqICAgICAgSWYgYWxsIHRoZSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgc3VjY2Vzc2Z1bGx5LCB0aGUgdmFsdWVzIG9mIHRoZSByZXNvbHZlZCBwcm9taXNlcyBhcmVcbiAgICogICAgICBpbmplY3RlZCBhbmQge0BsaW5rIG5nUm91dGUuJHJvdXRlIyRyb3V0ZUNoYW5nZVN1Y2Nlc3MgJHJvdXRlQ2hhbmdlU3VjY2Vzc30gZXZlbnQgaXNcbiAgICogICAgICBmaXJlZC4gSWYgYW55IG9mIHRoZSBwcm9taXNlcyBhcmUgcmVqZWN0ZWQgdGhlXG4gICAqICAgICAge0BsaW5rIG5nUm91dGUuJHJvdXRlIyRyb3V0ZUNoYW5nZUVycm9yICRyb3V0ZUNoYW5nZUVycm9yfSBldmVudCBpcyBmaXJlZC4gVGhlIG1hcCBvYmplY3RcbiAgICogICAgICBpczpcbiAgICpcbiAgICogICAgICAtIGBrZXlgIOKAkyBge3N0cmluZ31gOiBhIG5hbWUgb2YgYSBkZXBlbmRlbmN5IHRvIGJlIGluamVjdGVkIGludG8gdGhlIGNvbnRyb2xsZXIuXG4gICAqICAgICAgLSBgZmFjdG9yeWAgLSBge3N0cmluZ3xmdW5jdGlvbn1gOiBJZiBgc3RyaW5nYCB0aGVuIGl0IGlzIGFuIGFsaWFzIGZvciBhIHNlcnZpY2UuXG4gICAqICAgICAgICBPdGhlcndpc2UgaWYgZnVuY3Rpb24sIHRoZW4gaXQgaXMge0BsaW5rIGF1dG8uJGluamVjdG9yI2ludm9rZSBpbmplY3RlZH1cbiAgICogICAgICAgIGFuZCB0aGUgcmV0dXJuIHZhbHVlIGlzIHRyZWF0ZWQgYXMgdGhlIGRlcGVuZGVuY3kuIElmIHRoZSByZXN1bHQgaXMgYSBwcm9taXNlLCBpdCBpc1xuICAgKiAgICAgICAgcmVzb2x2ZWQgYmVmb3JlIGl0cyB2YWx1ZSBpcyBpbmplY3RlZCBpbnRvIHRoZSBjb250cm9sbGVyLiBCZSBhd2FyZSB0aGF0XG4gICAqICAgICAgICBgbmdSb3V0ZS4kcm91dGVQYXJhbXNgIHdpbGwgc3RpbGwgcmVmZXIgdG8gdGhlIHByZXZpb3VzIHJvdXRlIHdpdGhpbiB0aGVzZSByZXNvbHZlXG4gICAqICAgICAgICBmdW5jdGlvbnMuICBVc2UgYCRyb3V0ZS5jdXJyZW50LnBhcmFtc2AgdG8gYWNjZXNzIHRoZSBuZXcgcm91dGUgcGFyYW1ldGVycywgaW5zdGVhZC5cbiAgICpcbiAgICogICAgLSBgcmVkaXJlY3RUb2Ag4oCTIHsoc3RyaW5nfGZ1bmN0aW9uKCkpPX0g4oCTIHZhbHVlIHRvIHVwZGF0ZVxuICAgKiAgICAgIHtAbGluayBuZy4kbG9jYXRpb24gJGxvY2F0aW9ufSBwYXRoIHdpdGggYW5kIHRyaWdnZXIgcm91dGUgcmVkaXJlY3Rpb24uXG4gICAqXG4gICAqICAgICAgSWYgYHJlZGlyZWN0VG9gIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICAgKlxuICAgKiAgICAgIC0gYHtPYmplY3QuPHN0cmluZz59YCAtIHJvdXRlIHBhcmFtZXRlcnMgZXh0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnRcbiAgICogICAgICAgIGAkbG9jYXRpb24ucGF0aCgpYCBieSBhcHBseWluZyB0aGUgY3VycmVudCByb3V0ZSB0ZW1wbGF0ZVVybC5cbiAgICogICAgICAtIGB7c3RyaW5nfWAgLSBjdXJyZW50IGAkbG9jYXRpb24ucGF0aCgpYFxuICAgKiAgICAgIC0gYHtPYmplY3R9YCAtIGN1cnJlbnQgYCRsb2NhdGlvbi5zZWFyY2goKWBcbiAgICpcbiAgICogICAgICBUaGUgY3VzdG9tIGByZWRpcmVjdFRvYCBmdW5jdGlvbiBpcyBleHBlY3RlZCB0byByZXR1cm4gYSBzdHJpbmcgd2hpY2ggd2lsbCBiZSB1c2VkXG4gICAqICAgICAgdG8gdXBkYXRlIGAkbG9jYXRpb24ucGF0aCgpYCBhbmQgYCRsb2NhdGlvbi5zZWFyY2goKWAuXG4gICAqXG4gICAqICAgIC0gYFtyZWxvYWRPblNlYXJjaD10cnVlXWAgLSB7Ym9vbGVhbj19IC0gcmVsb2FkIHJvdXRlIHdoZW4gb25seSBgJGxvY2F0aW9uLnNlYXJjaCgpYFxuICAgKiAgICAgIG9yIGAkbG9jYXRpb24uaGFzaCgpYCBjaGFuZ2VzLlxuICAgKlxuICAgKiAgICAgIElmIHRoZSBvcHRpb24gaXMgc2V0IHRvIGBmYWxzZWAgYW5kIHVybCBpbiB0aGUgYnJvd3NlciBjaGFuZ2VzLCB0aGVuXG4gICAqICAgICAgYCRyb3V0ZVVwZGF0ZWAgZXZlbnQgaXMgYnJvYWRjYXN0ZWQgb24gdGhlIHJvb3Qgc2NvcGUuXG4gICAqXG4gICAqICAgIC0gYFtjYXNlSW5zZW5zaXRpdmVNYXRjaD1mYWxzZV1gIC0ge2Jvb2xlYW49fSAtIG1hdGNoIHJvdXRlcyB3aXRob3V0IGJlaW5nIGNhc2Ugc2Vuc2l0aXZlXG4gICAqXG4gICAqICAgICAgSWYgdGhlIG9wdGlvbiBpcyBzZXQgdG8gYHRydWVgLCB0aGVuIHRoZSBwYXJ0aWN1bGFyIHJvdXRlIGNhbiBiZSBtYXRjaGVkIHdpdGhvdXQgYmVpbmdcbiAgICogICAgICBjYXNlIHNlbnNpdGl2ZVxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZWxmXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBZGRzIGEgbmV3IHJvdXRlIGRlZmluaXRpb24gdG8gdGhlIGAkcm91dGVgIHNlcnZpY2UuXG4gICAqL1xuICB0aGlzLndoZW4gPSBmdW5jdGlvbihwYXRoLCByb3V0ZSkge1xuICAgIC8vY29weSBvcmlnaW5hbCByb3V0ZSBvYmplY3QgdG8gcHJlc2VydmUgcGFyYW1zIGluaGVyaXRlZCBmcm9tIHByb3RvIGNoYWluXG4gICAgdmFyIHJvdXRlQ29weSA9IGFuZ3VsYXIuY29weShyb3V0ZSk7XG4gICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQocm91dGVDb3B5LnJlbG9hZE9uU2VhcmNoKSkge1xuICAgICAgcm91dGVDb3B5LnJlbG9hZE9uU2VhcmNoID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQocm91dGVDb3B5LmNhc2VJbnNlbnNpdGl2ZU1hdGNoKSkge1xuICAgICAgcm91dGVDb3B5LmNhc2VJbnNlbnNpdGl2ZU1hdGNoID0gdGhpcy5jYXNlSW5zZW5zaXRpdmVNYXRjaDtcbiAgICB9XG4gICAgcm91dGVzW3BhdGhdID0gYW5ndWxhci5leHRlbmQoXG4gICAgICByb3V0ZUNvcHksXG4gICAgICBwYXRoICYmIHBhdGhSZWdFeHAocGF0aCwgcm91dGVDb3B5KVxuICAgICk7XG5cbiAgICAvLyBjcmVhdGUgcmVkaXJlY3Rpb24gZm9yIHRyYWlsaW5nIHNsYXNoZXNcbiAgICBpZiAocGF0aCkge1xuICAgICAgdmFyIHJlZGlyZWN0UGF0aCA9IChwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT0gJy8nKVxuICAgICAgICAgICAgPyBwYXRoLnN1YnN0cigwLCBwYXRoLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICA6IHBhdGggKyAnLyc7XG5cbiAgICAgIHJvdXRlc1tyZWRpcmVjdFBhdGhdID0gYW5ndWxhci5leHRlbmQoXG4gICAgICAgIHtyZWRpcmVjdFRvOiBwYXRofSxcbiAgICAgICAgcGF0aFJlZ0V4cChyZWRpcmVjdFBhdGgsIHJvdXRlQ29weSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBwcm9wZXJ0eVxuICAgKiBAbmFtZSAkcm91dGVQcm92aWRlciNjYXNlSW5zZW5zaXRpdmVNYXRjaFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICpcbiAgICogQSBib29sZWFuIHByb3BlcnR5IGluZGljYXRpbmcgaWYgcm91dGVzIGRlZmluZWRcbiAgICogdXNpbmcgdGhpcyBwcm92aWRlciBzaG91bGQgYmUgbWF0Y2hlZCB1c2luZyBhIGNhc2UgaW5zZW5zaXRpdmVcbiAgICogYWxnb3JpdGhtLiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICAgKi9cbiAgdGhpcy5jYXNlSW5zZW5zaXRpdmVNYXRjaCA9IGZhbHNlO1xuXG4gICAvKipcbiAgICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9IHBhdGhcbiAgICAqIEBwYXJhbSBvcHRzIHtPYmplY3R9IG9wdGlvbnNcbiAgICAqIEByZXR1cm4gez9PYmplY3R9XG4gICAgKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBwYXRoLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAqIGFuZCB0aGUgb3JpZ2luYWwgcGF0aC5cbiAgICAqXG4gICAgKiBJbnNwaXJlZCBieSBwYXRoUmV4cCBpbiB2aXNpb25tZWRpYS9leHByZXNzL2xpYi91dGlscy5qcy5cbiAgICAqL1xuICBmdW5jdGlvbiBwYXRoUmVnRXhwKHBhdGgsIG9wdHMpIHtcbiAgICB2YXIgaW5zZW5zaXRpdmUgPSBvcHRzLmNhc2VJbnNlbnNpdGl2ZU1hdGNoLFxuICAgICAgICByZXQgPSB7XG4gICAgICAgICAgb3JpZ2luYWxQYXRoOiBwYXRoLFxuICAgICAgICAgIHJlZ2V4cDogcGF0aFxuICAgICAgICB9LFxuICAgICAgICBrZXlzID0gcmV0LmtleXMgPSBbXTtcblxuICAgIHBhdGggPSBwYXRoXG4gICAgICAucmVwbGFjZSgvKFsoKS5dKS9nLCAnXFxcXCQxJylcbiAgICAgIC5yZXBsYWNlKC8oXFwvKT86KFxcdyspKFtcXD9cXCpdKT8vZywgZnVuY3Rpb24oXywgc2xhc2gsIGtleSwgb3B0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25hbCA9IG9wdGlvbiA9PT0gJz8nID8gb3B0aW9uIDogbnVsbDtcbiAgICAgICAgdmFyIHN0YXIgPSBvcHRpb24gPT09ICcqJyA/IG9wdGlvbiA6IG51bGw7XG4gICAgICAgIGtleXMucHVzaCh7IG5hbWU6IGtleSwgb3B0aW9uYWw6ICEhb3B0aW9uYWwgfSk7XG4gICAgICAgIHNsYXNoID0gc2xhc2ggfHwgJyc7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICsgKG9wdGlvbmFsID8gJycgOiBzbGFzaClcbiAgICAgICAgICArICcoPzonXG4gICAgICAgICAgKyAob3B0aW9uYWwgPyBzbGFzaCA6ICcnKVxuICAgICAgICAgICsgKHN0YXIgJiYgJyguKz8pJyB8fCAnKFteL10rKScpXG4gICAgICAgICAgKyAob3B0aW9uYWwgfHwgJycpXG4gICAgICAgICAgKyAnKSdcbiAgICAgICAgICArIChvcHRpb25hbCB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLnJlcGxhY2UoLyhbXFwvJFxcKl0pL2csICdcXFxcJDEnKTtcblxuICAgIHJldC5yZWdleHAgPSBuZXcgUmVnRXhwKCdeJyArIHBhdGggKyAnJCcsIGluc2Vuc2l0aXZlID8gJ2knIDogJycpO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogQG5nZG9jIG1ldGhvZFxuICAgKiBAbmFtZSAkcm91dGVQcm92aWRlciNvdGhlcndpc2VcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFNldHMgcm91dGUgZGVmaW5pdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCBvbiByb3V0ZSBjaGFuZ2Ugd2hlbiBubyBvdGhlciByb3V0ZSBkZWZpbml0aW9uXG4gICAqIGlzIG1hdGNoZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30gcGFyYW1zIE1hcHBpbmcgaW5mb3JtYXRpb24gdG8gYmUgYXNzaWduZWQgdG8gYCRyb3V0ZS5jdXJyZW50YC5cbiAgICogSWYgY2FsbGVkIHdpdGggYSBzdHJpbmcsIHRoZSB2YWx1ZSBtYXBzIHRvIGByZWRpcmVjdFRvYC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VsZlxuICAgKi9cbiAgdGhpcy5vdGhlcndpc2UgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBhcmFtcyA9IHtyZWRpcmVjdFRvOiBwYXJhbXN9O1xuICAgIH1cbiAgICB0aGlzLndoZW4obnVsbCwgcGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuXG4gIHRoaXMuJGdldCA9IFsnJHJvb3RTY29wZScsXG4gICAgICAgICAgICAgICAnJGxvY2F0aW9uJyxcbiAgICAgICAgICAgICAgICckcm91dGVQYXJhbXMnLFxuICAgICAgICAgICAgICAgJyRxJyxcbiAgICAgICAgICAgICAgICckaW5qZWN0b3InLFxuICAgICAgICAgICAgICAgJyR0ZW1wbGF0ZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgJyRzY2UnLFxuICAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsICRxLCAkaW5qZWN0b3IsICR0ZW1wbGF0ZVJlcXVlc3QsICRzY2UpIHtcblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBzZXJ2aWNlXG4gICAgICogQG5hbWUgJHJvdXRlXG4gICAgICogQHJlcXVpcmVzICRsb2NhdGlvblxuICAgICAqIEByZXF1aXJlcyAkcm91dGVQYXJhbXNcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjdXJyZW50IFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCByb3V0ZSBkZWZpbml0aW9uLlxuICAgICAqIFRoZSByb3V0ZSBkZWZpbml0aW9uIGNvbnRhaW5zOlxuICAgICAqXG4gICAgICogICAtIGBjb250cm9sbGVyYDogVGhlIGNvbnRyb2xsZXIgY29uc3RydWN0b3IgYXMgZGVmaW5lIGluIHJvdXRlIGRlZmluaXRpb24uXG4gICAgICogICAtIGBsb2NhbHNgOiBBIG1hcCBvZiBsb2NhbHMgd2hpY2ggaXMgdXNlZCBieSB7QGxpbmsgbmcuJGNvbnRyb2xsZXIgJGNvbnRyb2xsZXJ9IHNlcnZpY2UgZm9yXG4gICAgICogICAgIGNvbnRyb2xsZXIgaW5zdGFudGlhdGlvbi4gVGhlIGBsb2NhbHNgIGNvbnRhaW5cbiAgICAgKiAgICAgdGhlIHJlc29sdmVkIHZhbHVlcyBvZiB0aGUgYHJlc29sdmVgIG1hcC4gQWRkaXRpb25hbGx5IHRoZSBgbG9jYWxzYCBhbHNvIGNvbnRhaW46XG4gICAgICpcbiAgICAgKiAgICAgLSBgJHNjb3BlYCAtIFRoZSBjdXJyZW50IHJvdXRlIHNjb3BlLlxuICAgICAqICAgICAtIGAkdGVtcGxhdGVgIC0gVGhlIGN1cnJlbnQgcm91dGUgdGVtcGxhdGUgSFRNTC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSByb3V0ZXMgT2JqZWN0IHdpdGggYWxsIHJvdXRlIGNvbmZpZ3VyYXRpb24gT2JqZWN0cyBhcyBpdHMgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIGAkcm91dGVgIGlzIHVzZWQgZm9yIGRlZXAtbGlua2luZyBVUkxzIHRvIGNvbnRyb2xsZXJzIGFuZCB2aWV3cyAoSFRNTCBwYXJ0aWFscykuXG4gICAgICogSXQgd2F0Y2hlcyBgJGxvY2F0aW9uLnVybCgpYCBhbmQgdHJpZXMgdG8gbWFwIHRoZSBwYXRoIHRvIGFuIGV4aXN0aW5nIHJvdXRlIGRlZmluaXRpb24uXG4gICAgICpcbiAgICAgKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUm91dGUgYG5nUm91dGVgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICAgICAqXG4gICAgICogWW91IGNhbiBkZWZpbmUgcm91dGVzIHRocm91Z2gge0BsaW5rIG5nUm91dGUuJHJvdXRlUHJvdmlkZXIgJHJvdXRlUHJvdmlkZXJ9J3MgQVBJLlxuICAgICAqXG4gICAgICogVGhlIGAkcm91dGVgIHNlcnZpY2UgaXMgdHlwaWNhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcbiAgICAgKiB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IGBuZ1ZpZXdgfSBkaXJlY3RpdmUgYW5kIHRoZVxuICAgICAqIHtAbGluayBuZ1JvdXRlLiRyb3V0ZVBhcmFtcyBgJHJvdXRlUGFyYW1zYH0gc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogVGhpcyBleGFtcGxlIHNob3dzIGhvdyBjaGFuZ2luZyB0aGUgVVJMIGhhc2ggY2F1c2VzIHRoZSBgJHJvdXRlYCB0byBtYXRjaCBhIHJvdXRlIGFnYWluc3QgdGhlXG4gICAgICogVVJMLCBhbmQgdGhlIGBuZ1ZpZXdgIHB1bGxzIGluIHRoZSBwYXJ0aWFsLlxuICAgICAqXG4gICAgICogPGV4YW1wbGUgbmFtZT1cIiRyb3V0ZS1zZXJ2aWNlXCIgbW9kdWxlPVwibmdSb3V0ZUV4YW1wbGVcIlxuICAgICAqICAgICAgICAgIGRlcHM9XCJhbmd1bGFyLXJvdXRlLmpzXCIgZml4QmFzZT1cInRydWVcIj5cbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XG4gICAgICogICAgIDxkaXYgbmctY29udHJvbGxlcj1cIk1haW5Db250cm9sbGVyXCI+XG4gICAgICogICAgICAgQ2hvb3NlOlxuICAgICAqICAgICAgIDxhIGhyZWY9XCJCb29rL01vYnlcIj5Nb2J5PC9hPiB8XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svTW9ieS9jaC8xXCI+TW9ieTogQ2gxPC9hPiB8XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svR2F0c2J5XCI+R2F0c2J5PC9hPiB8XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svR2F0c2J5L2NoLzQ/a2V5PXZhbHVlXCI+R2F0c2J5OiBDaDQ8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9TY2FybGV0XCI+U2NhcmxldCBMZXR0ZXI8L2E+PGJyLz5cbiAgICAgKlxuICAgICAqICAgICAgIDxkaXYgbmctdmlldz48L2Rpdj5cbiAgICAgKlxuICAgICAqICAgICAgIDxociAvPlxuICAgICAqXG4gICAgICogICAgICAgPHByZT4kbG9jYXRpb24ucGF0aCgpID0ge3skbG9jYXRpb24ucGF0aCgpfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnRlbXBsYXRlVXJsID0ge3skcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybH19PC9wcmU+XG4gICAgICogICAgICAgPHByZT4kcm91dGUuY3VycmVudC5wYXJhbXMgPSB7eyRyb3V0ZS5jdXJyZW50LnBhcmFtc319PC9wcmU+XG4gICAgICogICAgICAgPHByZT4kcm91dGUuY3VycmVudC5zY29wZS5uYW1lID0ge3skcm91dGUuY3VycmVudC5zY29wZS5uYW1lfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZVBhcmFtcyA9IHt7JHJvdXRlUGFyYW1zfX08L3ByZT5cbiAgICAgKiAgICAgPC9kaXY+XG4gICAgICogICA8L2ZpbGU+XG4gICAgICpcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJib29rLmh0bWxcIj5cbiAgICAgKiAgICAgY29udHJvbGxlcjoge3tuYW1lfX08YnIgLz5cbiAgICAgKiAgICAgQm9vayBJZDoge3twYXJhbXMuYm9va0lkfX08YnIgLz5cbiAgICAgKiAgIDwvZmlsZT5cbiAgICAgKlxuICAgICAqICAgPGZpbGUgbmFtZT1cImNoYXB0ZXIuaHRtbFwiPlxuICAgICAqICAgICBjb250cm9sbGVyOiB7e25hbWV9fTxiciAvPlxuICAgICAqICAgICBCb29rIElkOiB7e3BhcmFtcy5ib29rSWR9fTxiciAvPlxuICAgICAqICAgICBDaGFwdGVyIElkOiB7e3BhcmFtcy5jaGFwdGVySWR9fVxuICAgICAqICAgPC9maWxlPlxuICAgICAqXG4gICAgICogICA8ZmlsZSBuYW1lPVwic2NyaXB0LmpzXCI+XG4gICAgICogICAgIGFuZ3VsYXIubW9kdWxlKCduZ1JvdXRlRXhhbXBsZScsIFsnbmdSb3V0ZSddKVxuICAgICAqXG4gICAgICogICAgICAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRyb3V0ZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24pIHtcbiAgICAgKiAgICAgICAgICAkc2NvcGUuJHJvdXRlID0gJHJvdXRlO1xuICAgICAqICAgICAgICAgICRzY29wZS4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICogICAgICAgICAgJHNjb3BlLiRyb3V0ZVBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgKiAgICAgIH0pXG4gICAgICpcbiAgICAgKiAgICAgIC5jb250cm9sbGVyKCdCb29rQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlUGFyYW1zKSB7XG4gICAgICogICAgICAgICAgJHNjb3BlLm5hbWUgPSBcIkJvb2tDb250cm9sbGVyXCI7XG4gICAgICogICAgICAgICAgJHNjb3BlLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgKiAgICAgIH0pXG4gICAgICpcbiAgICAgKiAgICAgIC5jb250cm9sbGVyKCdDaGFwdGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlUGFyYW1zKSB7XG4gICAgICogICAgICAgICAgJHNjb3BlLm5hbWUgPSBcIkNoYXB0ZXJDb250cm9sbGVyXCI7XG4gICAgICogICAgICAgICAgJHNjb3BlLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgKiAgICAgIH0pXG4gICAgICpcbiAgICAgKiAgICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgKiAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAqICAgICAgICAud2hlbignL0Jvb2svOmJvb2tJZCcsIHtcbiAgICAgKiAgICAgICAgIHRlbXBsYXRlVXJsOiAnYm9vay5odG1sJyxcbiAgICAgKiAgICAgICAgIGNvbnRyb2xsZXI6ICdCb29rQ29udHJvbGxlcicsXG4gICAgICogICAgICAgICByZXNvbHZlOiB7XG4gICAgICogICAgICAgICAgIC8vIEkgd2lsbCBjYXVzZSBhIDEgc2Vjb25kIGRlbGF5XG4gICAgICogICAgICAgICAgIGRlbGF5OiBmdW5jdGlvbigkcSwgJHRpbWVvdXQpIHtcbiAgICAgKiAgICAgICAgICAgICB2YXIgZGVsYXkgPSAkcS5kZWZlcigpO1xuICAgICAqICAgICAgICAgICAgICR0aW1lb3V0KGRlbGF5LnJlc29sdmUsIDEwMDApO1xuICAgICAqICAgICAgICAgICAgIHJldHVybiBkZWxheS5wcm9taXNlO1xuICAgICAqICAgICAgICAgICB9XG4gICAgICogICAgICAgICB9XG4gICAgICogICAgICAgfSlcbiAgICAgKiAgICAgICAud2hlbignL0Jvb2svOmJvb2tJZC9jaC86Y2hhcHRlcklkJywge1xuICAgICAqICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGFwdGVyLmh0bWwnLFxuICAgICAqICAgICAgICAgY29udHJvbGxlcjogJ0NoYXB0ZXJDb250cm9sbGVyJ1xuICAgICAqICAgICAgIH0pO1xuICAgICAqXG4gICAgICogICAgICAgLy8gY29uZmlndXJlIGh0bWw1IHRvIGdldCBsaW5rcyB3b3JraW5nIG9uIGpzZmlkZGxlXG4gICAgICogICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICAqICAgICB9KTtcbiAgICAgKlxuICAgICAqICAgPC9maWxlPlxuICAgICAqXG4gICAgICogICA8ZmlsZSBuYW1lPVwicHJvdHJhY3Rvci5qc1wiIHR5cGU9XCJwcm90cmFjdG9yXCI+XG4gICAgICogICAgIGl0KCdzaG91bGQgbG9hZCBhbmQgY29tcGlsZSBjb3JyZWN0IHRlbXBsYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgZWxlbWVudChieS5saW5rVGV4dCgnTW9ieTogQ2gxJykpLmNsaWNrKCk7XG4gICAgICogICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50KGJ5LmNzcygnW25nLXZpZXddJykpLmdldFRleHQoKTtcbiAgICAgKiAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvY29udHJvbGxlclxcOiBDaGFwdGVyQ29udHJvbGxlci8pO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9Cb29rIElkXFw6IE1vYnkvKTtcbiAgICAgKiAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQ2hhcHRlciBJZFxcOiAxLyk7XG4gICAgICpcbiAgICAgKiAgICAgICBlbGVtZW50KGJ5LnBhcnRpYWxMaW5rVGV4dCgnU2NhcmxldCcpKS5jbGljaygpO1xuICAgICAqXG4gICAgICogICAgICAgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IEJvb2tDb250cm9sbGVyLyk7XG4gICAgICogICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0Jvb2sgSWRcXDogU2NhcmxldC8pO1xuICAgICAqICAgICB9KTtcbiAgICAgKiAgIDwvZmlsZT5cbiAgICAgKiA8L2V4YW1wbGU+XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlQ2hhbmdlU3RhcnRcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogQnJvYWRjYXN0ZWQgYmVmb3JlIGEgcm91dGUgY2hhbmdlLiBBdCB0aGlzICBwb2ludCB0aGUgcm91dGUgc2VydmljZXMgc3RhcnRzXG4gICAgICogcmVzb2x2aW5nIGFsbCBvZiB0aGUgZGVwZW5kZW5jaWVzIG5lZWRlZCBmb3IgdGhlIHJvdXRlIGNoYW5nZSB0byBvY2N1ci5cbiAgICAgKiBUeXBpY2FsbHkgdGhpcyBpbnZvbHZlcyBmZXRjaGluZyB0aGUgdmlldyB0ZW1wbGF0ZSBhcyB3ZWxsIGFzIGFueSBkZXBlbmRlbmNpZXNcbiAgICAgKiBkZWZpbmVkIGluIGByZXNvbHZlYCByb3V0ZSBwcm9wZXJ0eS4gT25jZSAgYWxsIG9mIHRoZSBkZXBlbmRlbmNpZXMgYXJlIHJlc29sdmVkXG4gICAgICogYCRyb3V0ZUNoYW5nZVN1Y2Nlc3NgIGlzIGZpcmVkLlxuICAgICAqXG4gICAgICogVGhlIHJvdXRlIGNoYW5nZSAoYW5kIHRoZSBgJGxvY2F0aW9uYCBjaGFuZ2UgdGhhdCB0cmlnZ2VyZWQgaXQpIGNhbiBiZSBwcmV2ZW50ZWRcbiAgICAgKiBieSBjYWxsaW5nIGBwcmV2ZW50RGVmYXVsdGAgbWV0aG9kIG9mIHRoZSBldmVudC4gU2VlIHtAbGluayBuZy4kcm9vdFNjb3BlLlNjb3BlIyRvbn1cbiAgICAgKiBmb3IgbW9yZSBkZXRhaWxzIGFib3V0IGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbmd1bGFyRXZlbnQgU3ludGhldGljIGV2ZW50IG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBuZXh0IEZ1dHVyZSByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBjdXJyZW50IEN1cnJlbnQgcm91dGUgaW5mb3JtYXRpb24uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlQ2hhbmdlU3VjY2Vzc1xuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBCcm9hZGNhc3RlZCBhZnRlciBhIHJvdXRlIGNoYW5nZSBoYXMgaGFwcGVuZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAqIFRoZSBgcmVzb2x2ZWAgZGVwZW5kZW5jaWVzIGFyZSBub3cgYXZhaWxhYmxlIGluIHRoZSBgY3VycmVudC5sb2NhbHNgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICoge0BsaW5rIG5nUm91dGUuZGlyZWN0aXZlOm5nVmlldyBuZ1ZpZXd9IGxpc3RlbnMgZm9yIHRoZSBkaXJlY3RpdmVcbiAgICAgKiB0byBpbnN0YW50aWF0ZSB0aGUgY29udHJvbGxlciBhbmQgcmVuZGVyIHRoZSB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudCByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfFVuZGVmaW5lZH0gcHJldmlvdXMgUHJldmlvdXMgcm91dGUgaW5mb3JtYXRpb24sIG9yIHVuZGVmaW5lZCBpZiBjdXJyZW50IGlzXG4gICAgICogZmlyc3Qgcm91dGUgZW50ZXJlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBldmVudFxuICAgICAqIEBuYW1lICRyb3V0ZSMkcm91dGVDaGFuZ2VFcnJvclxuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBCcm9hZGNhc3RlZCBpZiBhbnkgb2YgdGhlIHJlc29sdmUgcHJvbWlzZXMgYXJlIHJlamVjdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0XG4gICAgICogQHBhcmFtIHtSb3V0ZX0gY3VycmVudCBDdXJyZW50IHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7Um91dGV9IHByZXZpb3VzIFByZXZpb3VzIHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7Um91dGV9IHJlamVjdGlvbiBSZWplY3Rpb24gb2YgdGhlIHByb21pc2UuIFVzdWFsbHkgdGhlIGVycm9yIG9mIHRoZSBmYWlsZWQgcHJvbWlzZS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBldmVudFxuICAgICAqIEBuYW1lICRyb3V0ZSMkcm91dGVVcGRhdGVcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogVGhlIGByZWxvYWRPblNlYXJjaGAgcHJvcGVydHkgaGFzIGJlZW4gc2V0IHRvIGZhbHNlLCBhbmQgd2UgYXJlIHJldXNpbmcgdGhlIHNhbWVcbiAgICAgKiBpbnN0YW5jZSBvZiB0aGUgQ29udHJvbGxlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbmd1bGFyRXZlbnQgU3ludGhldGljIGV2ZW50IG9iamVjdFxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudC9wcmV2aW91cyByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cblxuICAgIHZhciBmb3JjZVJlbG9hZCA9IGZhbHNlLFxuICAgICAgICBwcmVwYXJlZFJvdXRlLFxuICAgICAgICBwcmVwYXJlZFJvdXRlSXNVcGRhdGVPbmx5LFxuICAgICAgICAkcm91dGUgPSB7XG4gICAgICAgICAgcm91dGVzOiByb3V0ZXMsXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICogQG5hbWUgJHJvdXRlI3JlbG9hZFxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICogQ2F1c2VzIGAkcm91dGVgIHNlcnZpY2UgdG8gcmVsb2FkIHRoZSBjdXJyZW50IHJvdXRlIGV2ZW4gaWZcbiAgICAgICAgICAgKiB7QGxpbmsgbmcuJGxvY2F0aW9uICRsb2NhdGlvbn0gaGFzbid0IGNoYW5nZWQuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBBcyBhIHJlc3VsdCBvZiB0aGF0LCB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld31cbiAgICAgICAgICAgKiBjcmVhdGVzIG5ldyBzY29wZSBhbmQgcmVpbnN0YW50aWF0ZXMgdGhlIGNvbnRyb2xsZXIuXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmVsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcmNlUmVsb2FkID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgLy8gRG9uJ3Qgc3VwcG9ydCBjYW5jZWxsYXRpb24gb2YgYSByZWxvYWQgZm9yIG5vdy4uLlxuICAgICAgICAgICAgICBwcmVwYXJlUm91dGUoKTtcbiAgICAgICAgICAgICAgY29tbWl0Um91dGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICogQG5hbWUgJHJvdXRlI3VwZGF0ZVBhcmFtc1xuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICogQ2F1c2VzIGAkcm91dGVgIHNlcnZpY2UgdG8gdXBkYXRlIHRoZSBjdXJyZW50IFVSTCwgcmVwbGFjaW5nXG4gICAgICAgICAgICogY3VycmVudCByb3V0ZSBwYXJhbWV0ZXJzIHdpdGggdGhvc2Ugc3BlY2lmaWVkIGluIGBuZXdQYXJhbXNgLlxuICAgICAgICAgICAqIFByb3ZpZGVkIHByb3BlcnR5IG5hbWVzIHRoYXQgbWF0Y2ggdGhlIHJvdXRlJ3MgcGF0aCBzZWdtZW50XG4gICAgICAgICAgICogZGVmaW5pdGlvbnMgd2lsbCBiZSBpbnRlcnBvbGF0ZWQgaW50byB0aGUgbG9jYXRpb24ncyBwYXRoLCB3aGlsZVxuICAgICAgICAgICAqIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHdpbGwgYmUgdHJlYXRlZCBhcyBxdWVyeSBwYXJhbXMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBuZXdQYXJhbXMgbWFwcGluZyBvZiBVUkwgcGFyYW1ldGVyIG5hbWVzIHRvIHZhbHVlc1xuICAgICAgICAgICAqL1xuICAgICAgICAgIHVwZGF0ZVBhcmFtczogZnVuY3Rpb24obmV3UGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50ICYmIHRoaXMuY3VycmVudC4kJHJvdXRlKSB7XG4gICAgICAgICAgICAgIG5ld1BhcmFtcyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCB0aGlzLmN1cnJlbnQucGFyYW1zLCBuZXdQYXJhbXMpO1xuICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChpbnRlcnBvbGF0ZSh0aGlzLmN1cnJlbnQuJCRyb3V0ZS5vcmlnaW5hbFBhdGgsIG5ld1BhcmFtcykpO1xuICAgICAgICAgICAgICAvLyBpbnRlcnBvbGF0ZSBtb2RpZmllcyBuZXdQYXJhbXMsIG9ubHkgcXVlcnkgcGFyYW1zIGFyZSBsZWZ0XG4gICAgICAgICAgICAgICRsb2NhdGlvbi5zZWFyY2gobmV3UGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93ICRyb3V0ZU1pbkVycignbm9yb3V0JywgJ1RyaWVkIHVwZGF0aW5nIHJvdXRlIHdoZW4gd2l0aCBubyBjdXJyZW50IHJvdXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN0YXJ0JywgcHJlcGFyZVJvdXRlKTtcbiAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGNvbW1pdFJvdXRlKTtcblxuICAgIHJldHVybiAkcm91dGU7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9uIHtzdHJpbmd9IGN1cnJlbnQgdXJsXG4gICAgICogQHBhcmFtIHJvdXRlIHtPYmplY3R9IHJvdXRlIHJlZ2V4cCB0byBtYXRjaCB0aGUgdXJsIGFnYWluc3RcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0fVxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogQ2hlY2sgaWYgdGhlIHJvdXRlIG1hdGNoZXMgdGhlIGN1cnJlbnQgdXJsLlxuICAgICAqXG4gICAgICogSW5zcGlyZWQgYnkgbWF0Y2ggaW5cbiAgICAgKiB2aXNpb25tZWRpYS9leHByZXNzL2xpYi9yb3V0ZXIvcm91dGVyLmpzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN3aXRjaFJvdXRlTWF0Y2hlcihvbiwgcm91dGUpIHtcbiAgICAgIHZhciBrZXlzID0gcm91dGUua2V5cyxcbiAgICAgICAgICBwYXJhbXMgPSB7fTtcblxuICAgICAgaWYgKCFyb3V0ZS5yZWdleHApIHJldHVybiBudWxsO1xuXG4gICAgICB2YXIgbSA9IHJvdXRlLnJlZ2V4cC5leGVjKG9uKTtcbiAgICAgIGlmICghbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBtLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2kgLSAxXTtcblxuICAgICAgICB2YXIgdmFsID0gbVtpXTtcblxuICAgICAgICBpZiAoa2V5ICYmIHZhbCkge1xuICAgICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVJvdXRlKCRsb2NhdGlvbkV2ZW50KSB7XG4gICAgICB2YXIgbGFzdFJvdXRlID0gJHJvdXRlLmN1cnJlbnQ7XG5cbiAgICAgIHByZXBhcmVkUm91dGUgPSBwYXJzZVJvdXRlKCk7XG4gICAgICBwcmVwYXJlZFJvdXRlSXNVcGRhdGVPbmx5ID0gcHJlcGFyZWRSb3V0ZSAmJiBsYXN0Um91dGUgJiYgcHJlcGFyZWRSb3V0ZS4kJHJvdXRlID09PSBsYXN0Um91dGUuJCRyb3V0ZVxuICAgICAgICAgICYmIGFuZ3VsYXIuZXF1YWxzKHByZXBhcmVkUm91dGUucGF0aFBhcmFtcywgbGFzdFJvdXRlLnBhdGhQYXJhbXMpXG4gICAgICAgICAgJiYgIXByZXBhcmVkUm91dGUucmVsb2FkT25TZWFyY2ggJiYgIWZvcmNlUmVsb2FkO1xuXG4gICAgICBpZiAoIXByZXBhcmVkUm91dGVJc1VwZGF0ZU9ubHkgJiYgKGxhc3RSb3V0ZSB8fCBwcmVwYXJlZFJvdXRlKSkge1xuICAgICAgICBpZiAoJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VTdGFydCcsIHByZXBhcmVkUm91dGUsIGxhc3RSb3V0ZSkuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgIGlmICgkbG9jYXRpb25FdmVudCkge1xuICAgICAgICAgICAgJGxvY2F0aW9uRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21taXRSb3V0ZSgpIHtcbiAgICAgIHZhciBsYXN0Um91dGUgPSAkcm91dGUuY3VycmVudDtcbiAgICAgIHZhciBuZXh0Um91dGUgPSBwcmVwYXJlZFJvdXRlO1xuXG4gICAgICBpZiAocHJlcGFyZWRSb3V0ZUlzVXBkYXRlT25seSkge1xuICAgICAgICBsYXN0Um91dGUucGFyYW1zID0gbmV4dFJvdXRlLnBhcmFtcztcbiAgICAgICAgYW5ndWxhci5jb3B5KGxhc3RSb3V0ZS5wYXJhbXMsICRyb3V0ZVBhcmFtcyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHJvdXRlVXBkYXRlJywgbGFzdFJvdXRlKTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFJvdXRlIHx8IGxhc3RSb3V0ZSkge1xuICAgICAgICBmb3JjZVJlbG9hZCA9IGZhbHNlO1xuICAgICAgICAkcm91dGUuY3VycmVudCA9IG5leHRSb3V0ZTtcbiAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xuICAgICAgICAgIGlmIChuZXh0Um91dGUucmVkaXJlY3RUbykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobmV4dFJvdXRlLnJlZGlyZWN0VG8pKSB7XG4gICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKGludGVycG9sYXRlKG5leHRSb3V0ZS5yZWRpcmVjdFRvLCBuZXh0Um91dGUucGFyYW1zKSkuc2VhcmNoKG5leHRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkbG9jYXRpb24udXJsKG5leHRSb3V0ZS5yZWRpcmVjdFRvKG5leHRSb3V0ZS5wYXRoUGFyYW1zLCAkbG9jYXRpb24ucGF0aCgpLCAkbG9jYXRpb24uc2VhcmNoKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRxLndoZW4obmV4dFJvdXRlKS5cbiAgICAgICAgICB0aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xuICAgICAgICAgICAgICB2YXIgbG9jYWxzID0gYW5ndWxhci5leHRlbmQoe30sIG5leHRSb3V0ZS5yZXNvbHZlKSxcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLCB0ZW1wbGF0ZVVybDtcblxuICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobG9jYWxzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgbG9jYWxzW2tleV0gPSBhbmd1bGFyLmlzU3RyaW5nKHZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICRpbmplY3Rvci5nZXQodmFsdWUpIDogJGluamVjdG9yLmludm9rZSh2YWx1ZSwgbnVsbCwgbnVsbCwga2V5KTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlID0gbmV4dFJvdXRlLnRlbXBsYXRlKSkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGVtcGxhdGUpKSB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlKG5leHRSb3V0ZS5wYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZVVybCA9IG5leHRSb3V0ZS50ZW1wbGF0ZVVybCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRlbXBsYXRlVXJsKSkge1xuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZVVybChuZXh0Um91dGUucGFyYW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlVXJsKSkge1xuICAgICAgICAgICAgICAgICAgbmV4dFJvdXRlLmxvYWRlZFRlbXBsYXRlVXJsID0gJHNjZS52YWx1ZU9mKHRlbXBsYXRlVXJsKTtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gJHRlbXBsYXRlUmVxdWVzdCh0ZW1wbGF0ZVVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBsb2NhbHNbJyR0ZW1wbGF0ZSddID0gdGVtcGxhdGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICRxLmFsbChsb2NhbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLlxuICAgICAgICAgIHRoZW4oZnVuY3Rpb24obG9jYWxzKSB7XG4gICAgICAgICAgICAvLyBhZnRlciByb3V0ZSBjaGFuZ2VcbiAgICAgICAgICAgIGlmIChuZXh0Um91dGUgPT0gJHJvdXRlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xuICAgICAgICAgICAgICAgIG5leHRSb3V0ZS5sb2NhbHMgPSBsb2NhbHM7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5jb3B5KG5leHRSb3V0ZS5wYXJhbXMsICRyb3V0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VTdWNjZXNzJywgbmV4dFJvdXRlLCBsYXN0Um91dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAobmV4dFJvdXRlID09ICRyb3V0ZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHJvdXRlQ2hhbmdlRXJyb3InLCBuZXh0Um91dGUsIGxhc3RSb3V0ZSwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH0gdGhlIGN1cnJlbnQgYWN0aXZlIHJvdXRlLCBieSBtYXRjaGluZyBpdCBhZ2FpbnN0IHRoZSBVUkxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwYXJzZVJvdXRlKCkge1xuICAgICAgLy8gTWF0Y2ggYSByb3V0ZVxuICAgICAgdmFyIHBhcmFtcywgbWF0Y2g7XG4gICAgICBhbmd1bGFyLmZvckVhY2gocm91dGVzLCBmdW5jdGlvbihyb3V0ZSwgcGF0aCkge1xuICAgICAgICBpZiAoIW1hdGNoICYmIChwYXJhbXMgPSBzd2l0Y2hSb3V0ZU1hdGNoZXIoJGxvY2F0aW9uLnBhdGgoKSwgcm91dGUpKSkge1xuICAgICAgICAgIG1hdGNoID0gaW5oZXJpdChyb3V0ZSwge1xuICAgICAgICAgICAgcGFyYW1zOiBhbmd1bGFyLmV4dGVuZCh7fSwgJGxvY2F0aW9uLnNlYXJjaCgpLCBwYXJhbXMpLFxuICAgICAgICAgICAgcGF0aFBhcmFtczogcGFyYW1zfSk7XG4gICAgICAgICAgbWF0Y2guJCRyb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIE5vIHJvdXRlIG1hdGNoZWQ7IGZhbGxiYWNrIHRvIFwib3RoZXJ3aXNlXCIgcm91dGVcbiAgICAgIHJldHVybiBtYXRjaCB8fCByb3V0ZXNbbnVsbF0gJiYgaW5oZXJpdChyb3V0ZXNbbnVsbF0sIHtwYXJhbXM6IHt9LCBwYXRoUGFyYW1zOnt9fSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaW50ZXJwb2xhdGlvbiBvZiB0aGUgcmVkaXJlY3QgcGF0aCB3aXRoIHRoZSBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RyaW5nLCBwYXJhbXMpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCgoc3RyaW5nIHx8ICcnKS5zcGxpdCgnOicpLCBmdW5jdGlvbihzZWdtZW50LCBpKSB7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goc2VnbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNlZ21lbnRNYXRjaCA9IHNlZ21lbnQubWF0Y2goLyhcXHcrKSg/Ols/Kl0pPyguKikvKTtcbiAgICAgICAgICB2YXIga2V5ID0gc2VnbWVudE1hdGNoWzFdO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcmFtc1trZXldKTtcbiAgICAgICAgICByZXN1bHQucHVzaChzZWdtZW50TWF0Y2hbMl0gfHwgJycpO1xuICAgICAgICAgIGRlbGV0ZSBwYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgIH1cbiAgfV07XG59XG5cbm5nUm91dGVNb2R1bGUucHJvdmlkZXIoJyRyb3V0ZVBhcmFtcycsICRSb3V0ZVBhcmFtc1Byb3ZpZGVyKTtcblxuXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSAkcm91dGVQYXJhbXNcbiAqIEByZXF1aXJlcyAkcm91dGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBgJHJvdXRlUGFyYW1zYCBzZXJ2aWNlIGFsbG93cyB5b3UgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgc2V0IG9mIHJvdXRlIHBhcmFtZXRlcnMuXG4gKlxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1JvdXRlIGBuZ1JvdXRlYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKiBUaGUgcm91dGUgcGFyYW1ldGVycyBhcmUgYSBjb21iaW5hdGlvbiBvZiB7QGxpbmsgbmcuJGxvY2F0aW9uIGAkbG9jYXRpb25gfSdzXG4gKiB7QGxpbmsgbmcuJGxvY2F0aW9uI3NlYXJjaCBgc2VhcmNoKClgfSBhbmQge0BsaW5rIG5nLiRsb2NhdGlvbiNwYXRoIGBwYXRoKClgfS5cbiAqIFRoZSBgcGF0aGAgcGFyYW1ldGVycyBhcmUgZXh0cmFjdGVkIHdoZW4gdGhlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSBgJHJvdXRlYH0gcGF0aCBpcyBtYXRjaGVkLlxuICpcbiAqIEluIGNhc2Ugb2YgcGFyYW1ldGVyIG5hbWUgY29sbGlzaW9uLCBgcGF0aGAgcGFyYW1zIHRha2UgcHJlY2VkZW5jZSBvdmVyIGBzZWFyY2hgIHBhcmFtcy5cbiAqXG4gKiBUaGUgc2VydmljZSBndWFyYW50ZWVzIHRoYXQgdGhlIGlkZW50aXR5IG9mIHRoZSBgJHJvdXRlUGFyYW1zYCBvYmplY3Qgd2lsbCByZW1haW4gdW5jaGFuZ2VkXG4gKiAoYnV0IGl0cyBwcm9wZXJ0aWVzIHdpbGwgbGlrZWx5IGNoYW5nZSkgZXZlbiB3aGVuIGEgcm91dGUgY2hhbmdlIG9jY3Vycy5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIGAkcm91dGVQYXJhbXNgIGFyZSBvbmx5IHVwZGF0ZWQgKmFmdGVyKiBhIHJvdXRlIGNoYW5nZSBjb21wbGV0ZXMgc3VjY2Vzc2Z1bGx5LlxuICogVGhpcyBtZWFucyB0aGF0IHlvdSBjYW5ub3QgcmVseSBvbiBgJHJvdXRlUGFyYW1zYCBiZWluZyBjb3JyZWN0IGluIHJvdXRlIHJlc29sdmUgZnVuY3Rpb25zLlxuICogSW5zdGVhZCB5b3UgY2FuIHVzZSBgJHJvdXRlLmN1cnJlbnQucGFyYW1zYCB0byBhY2Nlc3MgdGhlIG5ldyByb3V0ZSdzIHBhcmFtZXRlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiAgLy8gR2l2ZW46XG4gKiAgLy8gVVJMOiBodHRwOi8vc2VydmVyLmNvbS9pbmRleC5odG1sIy9DaGFwdGVyLzEvU2VjdGlvbi8yP3NlYXJjaD1tb2J5XG4gKiAgLy8gUm91dGU6IC9DaGFwdGVyLzpjaGFwdGVySWQvU2VjdGlvbi86c2VjdGlvbklkXG4gKiAgLy9cbiAqICAvLyBUaGVuXG4gKiAgJHJvdXRlUGFyYW1zID09PiB7Y2hhcHRlcklkOicxJywgc2VjdGlvbklkOicyJywgc2VhcmNoOidtb2J5J31cbiAqIGBgYFxuICovXG5mdW5jdGlvbiAkUm91dGVQYXJhbXNQcm92aWRlcigpIHtcbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTsgfTtcbn1cblxubmdSb3V0ZU1vZHVsZS5kaXJlY3RpdmUoJ25nVmlldycsIG5nVmlld0ZhY3RvcnkpO1xubmdSb3V0ZU1vZHVsZS5kaXJlY3RpdmUoJ25nVmlldycsIG5nVmlld0ZpbGxDb250ZW50RmFjdG9yeSk7XG5cblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1ZpZXdcbiAqIEByZXN0cmljdCBFQ0FcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqICMgT3ZlcnZpZXdcbiAqIGBuZ1ZpZXdgIGlzIGEgZGlyZWN0aXZlIHRoYXQgY29tcGxlbWVudHMgdGhlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSAkcm91dGV9IHNlcnZpY2UgYnlcbiAqIGluY2x1ZGluZyB0aGUgcmVuZGVyZWQgdGVtcGxhdGUgb2YgdGhlIGN1cnJlbnQgcm91dGUgaW50byB0aGUgbWFpbiBsYXlvdXQgKGBpbmRleC5odG1sYCkgZmlsZS5cbiAqIEV2ZXJ5IHRpbWUgdGhlIGN1cnJlbnQgcm91dGUgY2hhbmdlcywgdGhlIGluY2x1ZGVkIHZpZXcgY2hhbmdlcyB3aXRoIGl0IGFjY29yZGluZyB0byB0aGVcbiAqIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGAkcm91dGVgIHNlcnZpY2UuXG4gKlxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1JvdXRlIGBuZ1JvdXRlYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKiBAYW5pbWF0aW9uc1xuICogZW50ZXIgLSBhbmltYXRpb24gaXMgdXNlZCB0byBicmluZyBuZXcgY29udGVudCBpbnRvIHRoZSBicm93c2VyLlxuICogbGVhdmUgLSBhbmltYXRpb24gaXMgdXNlZCB0byBhbmltYXRlIGV4aXN0aW5nIGNvbnRlbnQgYXdheS5cbiAqXG4gKiBUaGUgZW50ZXIgYW5kIGxlYXZlIGFuaW1hdGlvbiBvY2N1ciBjb25jdXJyZW50bHkuXG4gKlxuICogQHNjb3BlXG4gKiBAcHJpb3JpdHkgNDAwXG4gKiBAcGFyYW0ge3N0cmluZz19IG9ubG9hZCBFeHByZXNzaW9uIHRvIGV2YWx1YXRlIHdoZW5ldmVyIHRoZSB2aWV3IHVwZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBhdXRvc2Nyb2xsIFdoZXRoZXIgYG5nVmlld2Agc2hvdWxkIGNhbGwge0BsaW5rIG5nLiRhbmNob3JTY3JvbGxcbiAqICAgICAgICAgICAgICAgICAgJGFuY2hvclNjcm9sbH0gdG8gc2Nyb2xsIHRoZSB2aWV3cG9ydCBhZnRlciB0aGUgdmlldyBpcyB1cGRhdGVkLlxuICpcbiAqICAgICAgICAgICAgICAgICAgLSBJZiB0aGUgYXR0cmlidXRlIGlzIG5vdCBzZXQsIGRpc2FibGUgc2Nyb2xsaW5nLlxuICogICAgICAgICAgICAgICAgICAtIElmIHRoZSBhdHRyaWJ1dGUgaXMgc2V0IHdpdGhvdXQgdmFsdWUsIGVuYWJsZSBzY3JvbGxpbmcuXG4gKiAgICAgICAgICAgICAgICAgIC0gT3RoZXJ3aXNlIGVuYWJsZSBzY3JvbGxpbmcgb25seSBpZiB0aGUgYGF1dG9zY3JvbGxgIGF0dHJpYnV0ZSB2YWx1ZSBldmFsdWF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICBhcyBhbiBleHByZXNzaW9uIHlpZWxkcyBhIHRydXRoeSB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gICAgPGV4YW1wbGUgbmFtZT1cIm5nVmlldy1kaXJlY3RpdmVcIiBtb2R1bGU9XCJuZ1ZpZXdFeGFtcGxlXCJcbiAgICAgICAgICAgICBkZXBzPVwiYW5ndWxhci1yb3V0ZS5qczthbmd1bGFyLWFuaW1hdGUuanNcIlxuICAgICAgICAgICAgIGFuaW1hdGlvbnM9XCJ0cnVlXCIgZml4QmFzZT1cInRydWVcIj5cbiAgICAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XG4gICAgICAgIDxkaXYgbmctY29udHJvbGxlcj1cIk1haW5DdHJsIGFzIG1haW5cIj5cbiAgICAgICAgICBDaG9vc2U6XG4gICAgICAgICAgPGEgaHJlZj1cIkJvb2svTW9ieVwiPk1vYnk8L2E+IHxcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5L2NoLzFcIj5Nb2J5OiBDaDE8L2E+IHxcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnlcIj5HYXRzYnk8L2E+IHxcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnkvY2gvND9rZXk9dmFsdWVcIj5HYXRzYnk6IENoNDwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL1NjYXJsZXRcIj5TY2FybGV0IExldHRlcjwvYT48YnIvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXctYW5pbWF0ZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgbmctdmlldyBjbGFzcz1cInZpZXctYW5pbWF0ZVwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxociAvPlxuXG4gICAgICAgICAgPHByZT4kbG9jYXRpb24ucGF0aCgpID0ge3ttYWluLiRsb2NhdGlvbi5wYXRoKCl9fTwvcHJlPlxuICAgICAgICAgIDxwcmU+JHJvdXRlLmN1cnJlbnQudGVtcGxhdGVVcmwgPSB7e21haW4uJHJvdXRlLmN1cnJlbnQudGVtcGxhdGVVcmx9fTwvcHJlPlxuICAgICAgICAgIDxwcmU+JHJvdXRlLmN1cnJlbnQucGFyYW1zID0ge3ttYWluLiRyb3V0ZS5jdXJyZW50LnBhcmFtc319PC9wcmU+XG4gICAgICAgICAgPHByZT4kcm91dGVQYXJhbXMgPSB7e21haW4uJHJvdXRlUGFyYW1zfX08L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpbGU+XG5cbiAgICAgIDxmaWxlIG5hbWU9XCJib29rLmh0bWxcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBjb250cm9sbGVyOiB7e2Jvb2submFtZX19PGJyIC8+XG4gICAgICAgICAgQm9vayBJZDoge3tib29rLnBhcmFtcy5ib29rSWR9fTxiciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cImNoYXB0ZXIuaHRtbFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIGNvbnRyb2xsZXI6IHt7Y2hhcHRlci5uYW1lfX08YnIgLz5cbiAgICAgICAgICBCb29rIElkOiB7e2NoYXB0ZXIucGFyYW1zLmJvb2tJZH19PGJyIC8+XG4gICAgICAgICAgQ2hhcHRlciBJZDoge3tjaGFwdGVyLnBhcmFtcy5jaGFwdGVySWR9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cImFuaW1hdGlvbnMuY3NzXCI+XG4gICAgICAgIC52aWV3LWFuaW1hdGUtY29udGFpbmVyIHtcbiAgICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgICBoZWlnaHQ6MTAwcHghaW1wb3J0YW50O1xuICAgICAgICAgIGJhY2tncm91bmQ6d2hpdGU7XG4gICAgICAgICAgYm9yZGVyOjFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICBoZWlnaHQ6NDBweDtcbiAgICAgICAgICBvdmVyZmxvdzpoaWRkZW47XG4gICAgICAgIH1cblxuICAgICAgICAudmlldy1hbmltYXRlIHtcbiAgICAgICAgICBwYWRkaW5nOjEwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWVudGVyLCAudmlldy1hbmltYXRlLm5nLWxlYXZlIHtcbiAgICAgICAgICB0cmFuc2l0aW9uOmFsbCBjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApIDEuNXM7XG5cbiAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICAgIHdpZHRoOjEwMCU7XG4gICAgICAgICAgYm9yZGVyLWxlZnQ6MXB4IHNvbGlkIGJsYWNrO1xuXG4gICAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XG4gICAgICAgICAgdG9wOjA7XG4gICAgICAgICAgbGVmdDowO1xuICAgICAgICAgIHJpZ2h0OjA7XG4gICAgICAgICAgYm90dG9tOjA7XG4gICAgICAgICAgcGFkZGluZzoxMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1lbnRlciB7XG4gICAgICAgICAgbGVmdDoxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC52aWV3LWFuaW1hdGUubmctZW50ZXIubmctZW50ZXItYWN0aXZlIHtcbiAgICAgICAgICBsZWZ0OjA7XG4gICAgICAgIH1cbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1sZWF2ZS5uZy1sZWF2ZS1hY3RpdmUge1xuICAgICAgICAgIGxlZnQ6LTEwMCU7XG4gICAgICAgIH1cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cInNjcmlwdC5qc1wiPlxuICAgICAgICBhbmd1bGFyLm1vZHVsZSgnbmdWaWV3RXhhbXBsZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSlcbiAgICAgICAgICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLFxuICAgICAgICAgICAgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgICAgICAgLndoZW4oJy9Cb29rLzpib29rSWQnLCB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Jvb2suaHRtbCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQm9va0N0cmwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnYm9vaydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkL2NoLzpjaGFwdGVySWQnLCB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NoYXB0ZXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhcHRlckN0cmwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY2hhcHRlcidcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICAgfV0pXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ01haW5DdHJsJywgWyckcm91dGUnLCAnJHJvdXRlUGFyYW1zJywgJyRsb2NhdGlvbicsXG4gICAgICAgICAgICBmdW5jdGlvbigkcm91dGUsICRyb3V0ZVBhcmFtcywgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMuJHJvdXRlID0gJHJvdXRlO1xuICAgICAgICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy4kcm91dGVQYXJhbXMgPSAkcm91dGVQYXJhbXM7XG4gICAgICAgICAgfV0pXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ0Jvb2tDdHJsJywgWyckcm91dGVQYXJhbXMnLCBmdW5jdGlvbigkcm91dGVQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IFwiQm9va0N0cmxcIjtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAgICAgIH1dKVxuICAgICAgICAgIC5jb250cm9sbGVyKCdDaGFwdGVyQ3RybCcsIFsnJHJvdXRlUGFyYW1zJywgZnVuY3Rpb24oJHJvdXRlUGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBcIkNoYXB0ZXJDdHJsXCI7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgICAgICB9XSk7XG5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cInByb3RyYWN0b3IuanNcIiB0eXBlPVwicHJvdHJhY3RvclwiPlxuICAgICAgICBpdCgnc2hvdWxkIGxvYWQgYW5kIGNvbXBpbGUgY29ycmVjdCB0ZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQoYnkubGlua1RleHQoJ01vYnk6IENoMScpKS5jbGljaygpO1xuICAgICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudChieS5jc3MoJ1tuZy12aWV3XScpKS5nZXRUZXh0KCk7XG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL2NvbnRyb2xsZXJcXDogQ2hhcHRlckN0cmwvKTtcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQm9vayBJZFxcOiBNb2J5Lyk7XG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0NoYXB0ZXIgSWRcXDogMS8pO1xuXG4gICAgICAgICAgZWxlbWVudChieS5wYXJ0aWFsTGlua1RleHQoJ1NjYXJsZXQnKSkuY2xpY2soKTtcblxuICAgICAgICAgIGNvbnRlbnQgPSBlbGVtZW50KGJ5LmNzcygnW25nLXZpZXddJykpLmdldFRleHQoKTtcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvY29udHJvbGxlclxcOiBCb29rQ3RybC8pO1xuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9Cb29rIElkXFw6IFNjYXJsZXQvKTtcbiAgICAgICAgfSk7XG4gICAgICA8L2ZpbGU+XG4gICAgPC9leGFtcGxlPlxuICovXG5cblxuLyoqXG4gKiBAbmdkb2MgZXZlbnRcbiAqIEBuYW1lIG5nVmlldyMkdmlld0NvbnRlbnRMb2FkZWRcbiAqIEBldmVudFR5cGUgZW1pdCBvbiB0aGUgY3VycmVudCBuZ1ZpZXcgc2NvcGVcbiAqIEBkZXNjcmlwdGlvblxuICogRW1pdHRlZCBldmVyeSB0aW1lIHRoZSBuZ1ZpZXcgY29udGVudCBpcyByZWxvYWRlZC5cbiAqL1xubmdWaWV3RmFjdG9yeS4kaW5qZWN0ID0gWyckcm91dGUnLCAnJGFuY2hvclNjcm9sbCcsICckYW5pbWF0ZSddO1xuZnVuY3Rpb24gbmdWaWV3RmFjdG9yeSgkcm91dGUsICRhbmNob3JTY3JvbGwsICRhbmltYXRlKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQ0EnLFxuICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAsXG4gICAgdHJhbnNjbHVkZTogJ2VsZW1lbnQnLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCAkZWxlbWVudCwgYXR0ciwgY3RybCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRTY29wZSxcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LFxuICAgICAgICAgICAgcHJldmlvdXNMZWF2ZUFuaW1hdGlvbixcbiAgICAgICAgICAgIGF1dG9TY3JvbGxFeHAgPSBhdHRyLmF1dG9zY3JvbGwsXG4gICAgICAgICAgICBvbmxvYWRFeHAgPSBhdHRyLm9ubG9hZCB8fCAnJztcblxuICAgICAgICBzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB1cGRhdGUpO1xuICAgICAgICB1cGRhdGUoKTtcblxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwTGFzdFZpZXcoKSB7XG4gICAgICAgICAgaWYgKHByZXZpb3VzTGVhdmVBbmltYXRpb24pIHtcbiAgICAgICAgICAgICRhbmltYXRlLmNhbmNlbChwcmV2aW91c0xlYXZlQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHByZXZpb3VzTGVhdmVBbmltYXRpb24gPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJyZW50U2NvcGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2aW91c0xlYXZlQW5pbWF0aW9uID0gJGFuaW1hdGUubGVhdmUoY3VycmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgcHJldmlvdXNMZWF2ZUFuaW1hdGlvbi50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwcmV2aW91c0xlYXZlQW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICB2YXIgbG9jYWxzID0gJHJvdXRlLmN1cnJlbnQgJiYgJHJvdXRlLmN1cnJlbnQubG9jYWxzLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGxvY2FscyAmJiBsb2NhbHMuJHRlbXBsYXRlO1xuXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlKSkge1xuICAgICAgICAgICAgdmFyIG5ld1Njb3BlID0gc2NvcGUuJG5ldygpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudDtcblxuICAgICAgICAgICAgLy8gTm90ZTogVGhpcyB3aWxsIGFsc28gbGluayBhbGwgY2hpbGRyZW4gb2YgbmctdmlldyB0aGF0IHdlcmUgY29udGFpbmVkIGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgLy8gaHRtbC4gSWYgdGhhdCBjb250ZW50IGNvbnRhaW5zIGNvbnRyb2xsZXJzLCAuLi4gdGhleSBjb3VsZCBwb2xsdXRlL2NoYW5nZSB0aGUgc2NvcGUuXG4gICAgICAgICAgICAvLyBIb3dldmVyLCB1c2luZyBuZy12aWV3IG9uIGFuIGVsZW1lbnQgd2l0aCBhZGRpdGlvbmFsIGNvbnRlbnQgZG9lcyBub3QgbWFrZSBzZW5zZS4uLlxuICAgICAgICAgICAgLy8gTm90ZTogV2UgY2FuJ3QgcmVtb3ZlIHRoZW0gaW4gdGhlIGNsb25lQXR0Y2hGbiBvZiAkdHJhbnNjbHVkZSBhcyB0aGF0XG4gICAgICAgICAgICAvLyBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIGxpbmtpbmcgdGhlIGNvbnRlbnQsIHdoaWNoIHdvdWxkIGFwcGx5IGNoaWxkXG4gICAgICAgICAgICAvLyBkaXJlY3RpdmVzIHRvIG5vbiBleGlzdGluZyBlbGVtZW50cy5cbiAgICAgICAgICAgIHZhciBjbG9uZSA9ICR0cmFuc2NsdWRlKG5ld1Njb3BlLCBmdW5jdGlvbihjbG9uZSkge1xuICAgICAgICAgICAgICAkYW5pbWF0ZS5lbnRlcihjbG9uZSwgbnVsbCwgY3VycmVudEVsZW1lbnQgfHwgJGVsZW1lbnQpLnRoZW4oZnVuY3Rpb24gb25OZ1ZpZXdFbnRlcigpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXV0b1Njcm9sbEV4cClcbiAgICAgICAgICAgICAgICAgICYmICghYXV0b1Njcm9sbEV4cCB8fCBzY29wZS4kZXZhbChhdXRvU2Nyb2xsRXhwKSkpIHtcbiAgICAgICAgICAgICAgICAgICRhbmNob3JTY3JvbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjbGVhbnVwTGFzdFZpZXcoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGNsb25lO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlID0gY3VycmVudC5zY29wZSA9IG5ld1Njb3BlO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRlbWl0KCckdmlld0NvbnRlbnRMb2FkZWQnKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZS4kZXZhbChvbmxvYWRFeHApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhbnVwTGFzdFZpZXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8vIFRoaXMgZGlyZWN0aXZlIGlzIGNhbGxlZCBkdXJpbmcgdGhlICR0cmFuc2NsdWRlIGNhbGwgb2YgdGhlIGZpcnN0IGBuZ1ZpZXdgIGRpcmVjdGl2ZS5cbi8vIEl0IHdpbGwgcmVwbGFjZSBhbmQgY29tcGlsZSB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudCB3aXRoIHRoZSBsb2FkZWQgdGVtcGxhdGUuXG4vLyBXZSBuZWVkIHRoaXMgZGlyZWN0aXZlIHNvIHRoYXQgdGhlIGVsZW1lbnQgY29udGVudCBpcyBhbHJlYWR5IGZpbGxlZCB3aGVuXG4vLyB0aGUgbGluayBmdW5jdGlvbiBvZiBhbm90aGVyIGRpcmVjdGl2ZSBvbiB0aGUgc2FtZSBlbGVtZW50IGFzIG5nVmlld1xuLy8gaXMgY2FsbGVkLlxubmdWaWV3RmlsbENvbnRlbnRGYWN0b3J5LiRpbmplY3QgPSBbJyRjb21waWxlJywgJyRjb250cm9sbGVyJywgJyRyb3V0ZSddO1xuZnVuY3Rpb24gbmdWaWV3RmlsbENvbnRlbnRGYWN0b3J5KCRjb21waWxlLCAkY29udHJvbGxlciwgJHJvdXRlKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQ0EnLFxuICAgIHByaW9yaXR5OiAtNDAwLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudCxcbiAgICAgICAgICBsb2NhbHMgPSBjdXJyZW50LmxvY2FscztcblxuICAgICAgJGVsZW1lbnQuaHRtbChsb2NhbHMuJHRlbXBsYXRlKTtcblxuICAgICAgdmFyIGxpbmsgPSAkY29tcGlsZSgkZWxlbWVudC5jb250ZW50cygpKTtcblxuICAgICAgaWYgKGN1cnJlbnQuY29udHJvbGxlcikge1xuICAgICAgICBsb2NhbHMuJHNjb3BlID0gc2NvcGU7XG4gICAgICAgIHZhciBjb250cm9sbGVyID0gJGNvbnRyb2xsZXIoY3VycmVudC5jb250cm9sbGVyLCBsb2NhbHMpO1xuICAgICAgICBpZiAoY3VycmVudC5jb250cm9sbGVyQXMpIHtcbiAgICAgICAgICBzY29wZVtjdXJyZW50LmNvbnRyb2xsZXJBc10gPSBjb250cm9sbGVyO1xuICAgICAgICB9XG4gICAgICAgICRlbGVtZW50LmRhdGEoJyRuZ0NvbnRyb2xsZXJDb250cm9sbGVyJywgY29udHJvbGxlcik7XG4gICAgICAgICRlbGVtZW50LmNoaWxkcmVuKCkuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBjb250cm9sbGVyKTtcbiAgICAgIH1cblxuICAgICAgbGluayhzY29wZSk7XG4gICAgfVxuICB9O1xufVxuXG5cbn0pKHdpbmRvdywgd2luZG93LmFuZ3VsYXIpO1xuIiwicmVxdWlyZSgnLi9hbmd1bGFyLXJvdXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9ICduZ1JvdXRlJztcbiIsIi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhckpTIHYxLjQuN1xuICogKGMpIDIwMTAtMjAxNSBHb29nbGUsIEluYy4gaHR0cDovL2FuZ3VsYXJqcy5vcmdcbiAqIExpY2Vuc2U6IE1JVFxuICovXG4oZnVuY3Rpb24od2luZG93LCBhbmd1bGFyLCB1bmRlZmluZWQpIHsndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nZG9jIG1vZHVsZVxuICogQG5hbWUgbmdUb3VjaFxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogIyBuZ1RvdWNoXG4gKlxuICogVGhlIGBuZ1RvdWNoYCBtb2R1bGUgcHJvdmlkZXMgdG91Y2ggZXZlbnRzIGFuZCBvdGhlciBoZWxwZXJzIGZvciB0b3VjaC1lbmFibGVkIGRldmljZXMuXG4gKiBUaGUgaW1wbGVtZW50YXRpb24gaXMgYmFzZWQgb24galF1ZXJ5IE1vYmlsZSB0b3VjaCBldmVudCBoYW5kbGluZ1xuICogKFtqcXVlcnltb2JpbGUuY29tXShodHRwOi8vanF1ZXJ5bW9iaWxlLmNvbS8pKS5cbiAqXG4gKlxuICogU2VlIHtAbGluayBuZ1RvdWNoLiRzd2lwZSBgJHN3aXBlYH0gZm9yIHVzYWdlLlxuICpcbiAqIDxkaXYgZG9jLW1vZHVsZS1jb21wb25lbnRzPVwibmdUb3VjaFwiPjwvZGl2PlxuICpcbiAqL1xuXG4vLyBkZWZpbmUgbmdUb3VjaCBtb2R1bGVcbi8qIGdsb2JhbCAtbmdUb3VjaCAqL1xudmFyIG5nVG91Y2ggPSBhbmd1bGFyLm1vZHVsZSgnbmdUb3VjaCcsIFtdKTtcblxuZnVuY3Rpb24gbm9kZU5hbWVfKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGFuZ3VsYXIubG93ZXJjYXNlKGVsZW1lbnQubm9kZU5hbWUgfHwgKGVsZW1lbnRbMF0gJiYgZWxlbWVudFswXS5ub2RlTmFtZSkpO1xufVxuXG4vKiBnbG9iYWwgbmdUb3VjaDogZmFsc2UgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBzZXJ2aWNlXG4gICAgICogQG5hbWUgJHN3aXBlXG4gICAgICpcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBUaGUgYCRzd2lwZWAgc2VydmljZSBpcyBhIHNlcnZpY2UgdGhhdCBhYnN0cmFjdHMgdGhlIG1lc3NpZXIgZGV0YWlscyBvZiBob2xkLWFuZC1kcmFnIHN3aXBlXG4gICAgICogYmVoYXZpb3IsIHRvIG1ha2UgaW1wbGVtZW50aW5nIHN3aXBlLXJlbGF0ZWQgZGlyZWN0aXZlcyBtb3JlIGNvbnZlbmllbnQuXG4gICAgICpcbiAgICAgKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nVG91Y2ggYG5nVG91Y2hgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICAgICAqXG4gICAgICogYCRzd2lwZWAgaXMgdXNlZCBieSB0aGUgYG5nU3dpcGVMZWZ0YCBhbmQgYG5nU3dpcGVSaWdodGAgZGlyZWN0aXZlcyBpbiBgbmdUb3VjaGAsIGFuZCBieVxuICAgICAqIGBuZ0Nhcm91c2VsYCBpbiBhIHNlcGFyYXRlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqICMgVXNhZ2VcbiAgICAgKiBUaGUgYCRzd2lwZWAgc2VydmljZSBpcyBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBtZXRob2Q6IGBiaW5kYC4gYGJpbmRgIHRha2VzIGFuIGVsZW1lbnRcbiAgICAgKiB3aGljaCBpcyB0byBiZSB3YXRjaGVkIGZvciBzd2lwZXMsIGFuZCBhbiBvYmplY3Qgd2l0aCBmb3VyIGhhbmRsZXIgZnVuY3Rpb25zLiBTZWUgdGhlXG4gICAgICogZG9jdW1lbnRhdGlvbiBmb3IgYGJpbmRgIGJlbG93LlxuICAgICAqL1xuXG5uZ1RvdWNoLmZhY3RvcnkoJyRzd2lwZScsIFtmdW5jdGlvbigpIHtcbiAgLy8gVGhlIHRvdGFsIGRpc3RhbmNlIGluIGFueSBkaXJlY3Rpb24gYmVmb3JlIHdlIG1ha2UgdGhlIGNhbGwgb24gc3dpcGUgdnMuIHNjcm9sbC5cbiAgdmFyIE1PVkVfQlVGRkVSX1JBRElVUyA9IDEwO1xuXG4gIHZhciBQT0lOVEVSX0VWRU5UUyA9IHtcbiAgICAnbW91c2UnOiB7XG4gICAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICAgIGVuZDogJ21vdXNldXAnXG4gICAgfSxcbiAgICAndG91Y2gnOiB7XG4gICAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgICBlbmQ6ICd0b3VjaGVuZCcsXG4gICAgICBjYW5jZWw6ICd0b3VjaGNhbmNlbCdcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXMoZXZlbnQpIHtcbiAgICB2YXIgb3JpZ2luYWxFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgdmFyIHRvdWNoZXMgPSBvcmlnaW5hbEV2ZW50LnRvdWNoZXMgJiYgb3JpZ2luYWxFdmVudC50b3VjaGVzLmxlbmd0aCA/IG9yaWdpbmFsRXZlbnQudG91Y2hlcyA6IFtvcmlnaW5hbEV2ZW50XTtcbiAgICB2YXIgZSA9IChvcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0pIHx8IHRvdWNoZXNbMF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgeTogZS5jbGllbnRZXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEV2ZW50cyhwb2ludGVyVHlwZXMsIGV2ZW50VHlwZSkge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBhbmd1bGFyLmZvckVhY2gocG9pbnRlclR5cGVzLCBmdW5jdGlvbihwb2ludGVyVHlwZSkge1xuICAgICAgdmFyIGV2ZW50TmFtZSA9IFBPSU5URVJfRVZFTlRTW3BvaW50ZXJUeXBlXVtldmVudFR5cGVdO1xuICAgICAgaWYgKGV2ZW50TmFtZSkge1xuICAgICAgICByZXMucHVzaChldmVudE5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXMuam9pbignICcpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBAbmdkb2MgbWV0aG9kXG4gICAgICogQG5hbWUgJHN3aXBlI2JpbmRcbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFRoZSBtYWluIG1ldGhvZCBvZiBgJHN3aXBlYC4gSXQgdGFrZXMgYW4gZWxlbWVudCB0byBiZSB3YXRjaGVkIGZvciBzd2lwZSBtb3Rpb25zLCBhbmQgYW5cbiAgICAgKiBvYmplY3QgY29udGFpbmluZyBldmVudCBoYW5kbGVycy5cbiAgICAgKiBUaGUgcG9pbnRlciB0eXBlcyB0aGF0IHNob3VsZCBiZSB1c2VkIGNhbiBiZSBzcGVjaWZpZWQgdmlhIHRoZSBvcHRpb25hbFxuICAgICAqIHRoaXJkIGFyZ3VtZW50LCB3aGljaCBpcyBhbiBhcnJheSBvZiBzdHJpbmdzIGAnbW91c2UnYCBhbmQgYCd0b3VjaCdgLiBCeSBkZWZhdWx0LFxuICAgICAqIGAkc3dpcGVgIHdpbGwgbGlzdGVuIGZvciBgbW91c2VgIGFuZCBgdG91Y2hgIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIFRoZSBmb3VyIGV2ZW50cyBhcmUgYHN0YXJ0YCwgYG1vdmVgLCBgZW5kYCwgYW5kIGBjYW5jZWxgLiBgc3RhcnRgLCBgbW92ZWAsIGFuZCBgZW5kYFxuICAgICAqIHJlY2VpdmUgYXMgYSBwYXJhbWV0ZXIgYSBjb29yZGluYXRlcyBvYmplY3Qgb2YgdGhlIGZvcm0gYHsgeDogMTUwLCB5OiAzMTAgfWAgYW5kIHRoZSByYXdcbiAgICAgKiBgZXZlbnRgLiBgY2FuY2VsYCByZWNlaXZlcyB0aGUgcmF3IGBldmVudGAgYXMgaXRzIHNpbmdsZSBwYXJhbWV0ZXIuXG4gICAgICpcbiAgICAgKiBgc3RhcnRgIGlzIGNhbGxlZCBvbiBlaXRoZXIgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgLiBBZnRlciB0aGlzIGV2ZW50LCBgJHN3aXBlYCBpc1xuICAgICAqIHdhdGNoaW5nIGZvciBgdG91Y2htb3ZlYCBvciBgbW91c2Vtb3ZlYCBldmVudHMuIFRoZXNlIGV2ZW50cyBhcmUgaWdub3JlZCB1bnRpbCB0aGUgdG90YWxcbiAgICAgKiBkaXN0YW5jZSBtb3ZlZCBpbiBlaXRoZXIgZGltZW5zaW9uIGV4Y2VlZHMgYSBzbWFsbCB0aHJlc2hvbGQuXG4gICAgICpcbiAgICAgKiBPbmNlIHRoaXMgdGhyZXNob2xkIGlzIGV4Y2VlZGVkLCBlaXRoZXIgdGhlIGhvcml6b250YWwgb3IgdmVydGljYWwgZGVsdGEgaXMgZ3JlYXRlci5cbiAgICAgKiAtIElmIHRoZSBob3Jpem9udGFsIGRpc3RhbmNlIGlzIGdyZWF0ZXIsIHRoaXMgaXMgYSBzd2lwZSBhbmQgYG1vdmVgIGFuZCBgZW5kYCBldmVudHMgZm9sbG93LlxuICAgICAqIC0gSWYgdGhlIHZlcnRpY2FsIGRpc3RhbmNlIGlzIGdyZWF0ZXIsIHRoaXMgaXMgYSBzY3JvbGwsIGFuZCB3ZSBsZXQgdGhlIGJyb3dzZXIgdGFrZSBvdmVyLlxuICAgICAqICAgQSBgY2FuY2VsYCBldmVudCBpcyBzZW50LlxuICAgICAqXG4gICAgICogYG1vdmVgIGlzIGNhbGxlZCBvbiBgbW91c2Vtb3ZlYCBhbmQgYHRvdWNobW92ZWAgYWZ0ZXIgdGhlIGFib3ZlIGxvZ2ljIGhhcyBkZXRlcm1pbmVkIHRoYXRcbiAgICAgKiBhIHN3aXBlIGlzIGluIHByb2dyZXNzLlxuICAgICAqXG4gICAgICogYGVuZGAgaXMgY2FsbGVkIHdoZW4gYSBzd2lwZSBpcyBzdWNjZXNzZnVsbHkgY29tcGxldGVkIHdpdGggYSBgdG91Y2hlbmRgIG9yIGBtb3VzZXVwYC5cbiAgICAgKlxuICAgICAqIGBjYW5jZWxgIGlzIGNhbGxlZCBlaXRoZXIgb24gYSBgdG91Y2hjYW5jZWxgIGZyb20gdGhlIGJyb3dzZXIsIG9yIHdoZW4gd2UgYmVnaW4gc2Nyb2xsaW5nXG4gICAgICogYXMgZGVzY3JpYmVkIGFib3ZlLlxuICAgICAqXG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24oZWxlbWVudCwgZXZlbnRIYW5kbGVycywgcG9pbnRlclR5cGVzKSB7XG4gICAgICAvLyBBYnNvbHV0ZSB0b3RhbCBtb3ZlbWVudCwgdXNlZCB0byBjb250cm9sIHN3aXBlIHZzLiBzY3JvbGwuXG4gICAgICB2YXIgdG90YWxYLCB0b3RhbFk7XG4gICAgICAvLyBDb29yZGluYXRlcyBvZiB0aGUgc3RhcnQgcG9zaXRpb24uXG4gICAgICB2YXIgc3RhcnRDb29yZHM7XG4gICAgICAvLyBMYXN0IGV2ZW50J3MgcG9zaXRpb24uXG4gICAgICB2YXIgbGFzdFBvcztcbiAgICAgIC8vIFdoZXRoZXIgYSBzd2lwZSBpcyBhY3RpdmUuXG4gICAgICB2YXIgYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgIHBvaW50ZXJUeXBlcyA9IHBvaW50ZXJUeXBlcyB8fCBbJ21vdXNlJywgJ3RvdWNoJ107XG4gICAgICBlbGVtZW50Lm9uKGdldEV2ZW50cyhwb2ludGVyVHlwZXMsICdzdGFydCcpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBzdGFydENvb3JkcyA9IGdldENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdG90YWxYID0gMDtcbiAgICAgICAgdG90YWxZID0gMDtcbiAgICAgICAgbGFzdFBvcyA9IHN0YXJ0Q29vcmRzO1xuICAgICAgICBldmVudEhhbmRsZXJzWydzdGFydCddICYmIGV2ZW50SGFuZGxlcnNbJ3N0YXJ0J10oc3RhcnRDb29yZHMsIGV2ZW50KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGV2ZW50cyA9IGdldEV2ZW50cyhwb2ludGVyVHlwZXMsICdjYW5jZWwnKTtcbiAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgZWxlbWVudC5vbihldmVudHMsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgZXZlbnRIYW5kbGVyc1snY2FuY2VsJ10gJiYgZXZlbnRIYW5kbGVyc1snY2FuY2VsJ10oZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5vbihnZXRFdmVudHMocG9pbnRlclR5cGVzLCAnbW92ZScpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIEFuZHJvaWQgd2lsbCBzZW5kIGEgdG91Y2hjYW5jZWwgaWYgaXQgdGhpbmtzIHdlJ3JlIHN0YXJ0aW5nIHRvIHNjcm9sbC5cbiAgICAgICAgLy8gU28gd2hlbiB0aGUgdG90YWwgZGlzdGFuY2UgKCsgb3IgLSBvciBib3RoKSBleGNlZWRzIDEwcHggaW4gZWl0aGVyIGRpcmVjdGlvbixcbiAgICAgICAgLy8gd2UgZWl0aGVyOlxuICAgICAgICAvLyAtIE9uIHRvdGFsWCA+IHRvdGFsWSwgd2Ugc2VuZCBwcmV2ZW50RGVmYXVsdCgpIGFuZCB0cmVhdCB0aGlzIGFzIGEgc3dpcGUuXG4gICAgICAgIC8vIC0gT24gdG90YWxZID4gdG90YWxYLCB3ZSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0IGFzIGEgc2Nyb2xsLlxuXG4gICAgICAgIGlmICghc3RhcnRDb29yZHMpIHJldHVybjtcbiAgICAgICAgdmFyIGNvb3JkcyA9IGdldENvb3JkaW5hdGVzKGV2ZW50KTtcblxuICAgICAgICB0b3RhbFggKz0gTWF0aC5hYnMoY29vcmRzLnggLSBsYXN0UG9zLngpO1xuICAgICAgICB0b3RhbFkgKz0gTWF0aC5hYnMoY29vcmRzLnkgLSBsYXN0UG9zLnkpO1xuXG4gICAgICAgIGxhc3RQb3MgPSBjb29yZHM7XG5cbiAgICAgICAgaWYgKHRvdGFsWCA8IE1PVkVfQlVGRkVSX1JBRElVUyAmJiB0b3RhbFkgPCBNT1ZFX0JVRkZFUl9SQURJVVMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPbmUgb2YgdG90YWxYIG9yIHRvdGFsWSBoYXMgZXhjZWVkZWQgdGhlIGJ1ZmZlciwgc28gZGVjaWRlIG9uIHN3aXBlIHZzLiBzY3JvbGwuXG4gICAgICAgIGlmICh0b3RhbFkgPiB0b3RhbFgpIHtcbiAgICAgICAgICAvLyBBbGxvdyBuYXRpdmUgc2Nyb2xsaW5nIHRvIHRha2Ugb3Zlci5cbiAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBldmVudEhhbmRsZXJzWydjYW5jZWwnXSAmJiBldmVudEhhbmRsZXJzWydjYW5jZWwnXShldmVudCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmcuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudEhhbmRsZXJzWydtb3ZlJ10gJiYgZXZlbnRIYW5kbGVyc1snbW92ZSddKGNvb3JkcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZWxlbWVudC5vbihnZXRFdmVudHMocG9pbnRlclR5cGVzLCAnZW5kJyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghYWN0aXZlKSByZXR1cm47XG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBldmVudEhhbmRsZXJzWydlbmQnXSAmJiBldmVudEhhbmRsZXJzWydlbmQnXShnZXRDb29yZGluYXRlcyhldmVudCksIGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1dKTtcblxuLyogZ2xvYmFsIG5nVG91Y2g6IGZhbHNlLFxuICBub2RlTmFtZV86IGZhbHNlXG4qL1xuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIG5nQ2xpY2tcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgbW9yZSBwb3dlcmZ1bCByZXBsYWNlbWVudCBmb3IgdGhlIGRlZmF1bHQgbmdDbGljayBkZXNpZ25lZCB0byBiZSB1c2VkIG9uIHRvdWNoc2NyZWVuXG4gKiBkZXZpY2VzLiBNb3N0IG1vYmlsZSBicm93c2VycyB3YWl0IGFib3V0IDMwMG1zIGFmdGVyIGEgdGFwLWFuZC1yZWxlYXNlIGJlZm9yZSBzZW5kaW5nXG4gKiB0aGUgY2xpY2sgZXZlbnQuIFRoaXMgdmVyc2lvbiBoYW5kbGVzIHRoZW0gaW1tZWRpYXRlbHksIGFuZCB0aGVuIHByZXZlbnRzIHRoZVxuICogZm9sbG93aW5nIGNsaWNrIGV2ZW50IGZyb20gcHJvcGFnYXRpbmcuXG4gKlxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1RvdWNoIGBuZ1RvdWNoYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBjYW4gZmFsbCBiYWNrIHRvIHVzaW5nIGFuIG9yZGluYXJ5IGNsaWNrIGV2ZW50LCBhbmQgc28gd29ya3Mgb24gZGVza3RvcFxuICogYnJvd3NlcnMgYXMgd2VsbCBhcyBtb2JpbGUuXG4gKlxuICogVGhpcyBkaXJlY3RpdmUgYWxzbyBzZXRzIHRoZSBDU1MgY2xhc3MgYG5nLWNsaWNrLWFjdGl2ZWAgd2hpbGUgdGhlIGVsZW1lbnQgaXMgYmVpbmcgaGVsZFxuICogZG93biAoYnkgYSBtb3VzZSBjbGljayBvciB0b3VjaCkgc28geW91IGNhbiByZXN0eWxlIHRoZSBkZXByZXNzZWQgZWxlbWVudCBpZiB5b3Ugd2lzaC5cbiAqXG4gKiBAZWxlbWVudCBBTllcbiAqIEBwYXJhbSB7ZXhwcmVzc2lvbn0gbmdDbGljayB7QGxpbmsgZ3VpZGUvZXhwcmVzc2lvbiBFeHByZXNzaW9ufSB0byBldmFsdWF0ZVxuICogdXBvbiB0YXAuIChFdmVudCBvYmplY3QgaXMgYXZhaWxhYmxlIGFzIGAkZXZlbnRgKVxuICpcbiAqIEBleGFtcGxlXG4gICAgPGV4YW1wbGUgbW9kdWxlPVwibmdDbGlja0V4YW1wbGVcIiBkZXBzPVwiYW5ndWxhci10b3VjaC5qc1wiPlxuICAgICAgPGZpbGUgbmFtZT1cImluZGV4Lmh0bWxcIj5cbiAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cImNvdW50ID0gY291bnQgKyAxXCIgbmctaW5pdD1cImNvdW50PTBcIj5cbiAgICAgICAgICBJbmNyZW1lbnRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGNvdW50OiB7eyBjb3VudCB9fVxuICAgICAgPC9maWxlPlxuICAgICAgPGZpbGUgbmFtZT1cInNjcmlwdC5qc1wiPlxuICAgICAgICBhbmd1bGFyLm1vZHVsZSgnbmdDbGlja0V4YW1wbGUnLCBbJ25nVG91Y2gnXSk7XG4gICAgICA8L2ZpbGU+XG4gICAgPC9leGFtcGxlPlxuICovXG5cbm5nVG91Y2guY29uZmlnKFsnJHByb3ZpZGUnLCBmdW5jdGlvbigkcHJvdmlkZSkge1xuICAkcHJvdmlkZS5kZWNvcmF0b3IoJ25nQ2xpY2tEaXJlY3RpdmUnLCBbJyRkZWxlZ2F0ZScsIGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgIC8vIGRyb3AgdGhlIGRlZmF1bHQgbmdDbGljayBkaXJlY3RpdmVcbiAgICAkZGVsZWdhdGUuc2hpZnQoKTtcbiAgICByZXR1cm4gJGRlbGVnYXRlO1xuICB9XSk7XG59XSk7XG5cbm5nVG91Y2guZGlyZWN0aXZlKCduZ0NsaWNrJywgWyckcGFyc2UnLCAnJHRpbWVvdXQnLCAnJHJvb3RFbGVtZW50JyxcbiAgICBmdW5jdGlvbigkcGFyc2UsICR0aW1lb3V0LCAkcm9vdEVsZW1lbnQpIHtcbiAgdmFyIFRBUF9EVVJBVElPTiA9IDc1MDsgLy8gU2hvcnRlciB0aGFuIDc1MG1zIGlzIGEgdGFwLCBsb25nZXIgaXMgYSB0YXBob2xkIG9yIGRyYWcuXG4gIHZhciBNT1ZFX1RPTEVSQU5DRSA9IDEyOyAvLyAxMnB4IHNlZW1zIHRvIHdvcmsgaW4gbW9zdCBtb2JpbGUgYnJvd3NlcnMuXG4gIHZhciBQUkVWRU5UX0RVUkFUSU9OID0gMjUwMDsgLy8gMi41IHNlY29uZHMgbWF4aW11bSBmcm9tIHByZXZlbnRHaG9zdENsaWNrIGNhbGwgdG8gY2xpY2tcbiAgdmFyIENMSUNLQlVTVEVSX1RIUkVTSE9MRCA9IDI1OyAvLyAyNSBwaXhlbHMgaW4gYW55IGRpbWVuc2lvbiBpcyB0aGUgbGltaXQgZm9yIGJ1c3RpbmcgY2xpY2tzLlxuXG4gIHZhciBBQ1RJVkVfQ0xBU1NfTkFNRSA9ICduZy1jbGljay1hY3RpdmUnO1xuICB2YXIgbGFzdFByZXZlbnRlZFRpbWU7XG4gIHZhciB0b3VjaENvb3JkaW5hdGVzO1xuICB2YXIgbGFzdExhYmVsQ2xpY2tDb29yZGluYXRlcztcblxuXG4gIC8vIFRBUCBFVkVOVFMgQU5EIEdIT1NUIENMSUNLU1xuICAvL1xuICAvLyBXaHkgdGFwIGV2ZW50cz9cbiAgLy8gTW9iaWxlIGJyb3dzZXJzIGRldGVjdCBhIHRhcCwgdGhlbiB3YWl0IGEgbW9tZW50ICh1c3VhbGx5IH4zMDBtcykgdG8gc2VlIGlmIHlvdSdyZVxuICAvLyBkb3VibGUtdGFwcGluZywgYW5kIHRoZW4gZmlyZSBhIGNsaWNrIGV2ZW50LlxuICAvL1xuICAvLyBUaGlzIGRlbGF5IHN1Y2tzIGFuZCBtYWtlcyBtb2JpbGUgYXBwcyBmZWVsIHVucmVzcG9uc2l2ZS5cbiAgLy8gU28gd2UgZGV0ZWN0IHRvdWNoc3RhcnQsIHRvdWNoY2FuY2VsIGFuZCB0b3VjaGVuZCBvdXJzZWx2ZXMgYW5kIGRldGVybWluZSB3aGVuXG4gIC8vIHRoZSB1c2VyIGhhcyB0YXBwZWQgb24gc29tZXRoaW5nLlxuICAvL1xuICAvLyBXaGF0IGhhcHBlbnMgd2hlbiB0aGUgYnJvd3NlciB0aGVuIGdlbmVyYXRlcyBhIGNsaWNrIGV2ZW50P1xuICAvLyBUaGUgYnJvd3Nlciwgb2YgY291cnNlLCBhbHNvIGRldGVjdHMgdGhlIHRhcCBhbmQgZmlyZXMgYSBjbGljayBhZnRlciBhIGRlbGF5LiBUaGlzIHJlc3VsdHMgaW5cbiAgLy8gdGFwcGluZy9jbGlja2luZyB0d2ljZS4gV2UgZG8gXCJjbGlja2J1c3RpbmdcIiB0byBwcmV2ZW50IGl0LlxuICAvL1xuICAvLyBIb3cgZG9lcyBpdCB3b3JrP1xuICAvLyBXZSBhdHRhY2ggZ2xvYmFsIHRvdWNoc3RhcnQgYW5kIGNsaWNrIGhhbmRsZXJzLCB0aGF0IHJ1biBkdXJpbmcgdGhlIGNhcHR1cmUgKGVhcmx5KSBwaGFzZS5cbiAgLy8gU28gdGhlIHNlcXVlbmNlIGZvciBhIHRhcCBpczpcbiAgLy8gLSBnbG9iYWwgdG91Y2hzdGFydDogU2V0cyBhbiBcImFsbG93YWJsZSByZWdpb25cIiBhdCB0aGUgcG9pbnQgdG91Y2hlZC5cbiAgLy8gLSBlbGVtZW50J3MgdG91Y2hzdGFydDogU3RhcnRzIGEgdG91Y2hcbiAgLy8gKC0gdG91Y2hjYW5jZWwgZW5kcyB0aGUgdG91Y2gsIG5vIGNsaWNrIGZvbGxvd3MpXG4gIC8vIC0gZWxlbWVudCdzIHRvdWNoZW5kOiBEZXRlcm1pbmVzIGlmIHRoZSB0YXAgaXMgdmFsaWQgKGRpZG4ndCBtb3ZlIHRvbyBmYXIgYXdheSwgZGlkbid0IGhvbGRcbiAgLy8gICB0b28gbG9uZykgYW5kIGZpcmVzIHRoZSB1c2VyJ3MgdGFwIGhhbmRsZXIuIFRoZSB0b3VjaGVuZCBhbHNvIGNhbGxzIHByZXZlbnRHaG9zdENsaWNrKCkuXG4gIC8vIC0gcHJldmVudEdob3N0Q2xpY2soKSByZW1vdmVzIHRoZSBhbGxvd2FibGUgcmVnaW9uIHRoZSBnbG9iYWwgdG91Y2hzdGFydCBjcmVhdGVkLlxuICAvLyAtIFRoZSBicm93c2VyIGdlbmVyYXRlcyBhIGNsaWNrIGV2ZW50LlxuICAvLyAtIFRoZSBnbG9iYWwgY2xpY2sgaGFuZGxlciBjYXRjaGVzIHRoZSBjbGljaywgYW5kIGNoZWNrcyB3aGV0aGVyIGl0IHdhcyBpbiBhbiBhbGxvd2FibGUgcmVnaW9uLlxuICAvLyAgICAgLSBJZiBwcmV2ZW50R2hvc3RDbGljayB3YXMgY2FsbGVkLCB0aGUgcmVnaW9uIHdpbGwgaGF2ZSBiZWVuIHJlbW92ZWQsIHRoZSBjbGljayBpcyBidXN0ZWQuXG4gIC8vICAgICAtIElmIHRoZSByZWdpb24gaXMgc3RpbGwgdGhlcmUsIHRoZSBjbGljayBwcm9jZWVkcyBub3JtYWxseS4gVGhlcmVmb3JlIGNsaWNrcyBvbiBsaW5rcyBhbmRcbiAgLy8gICAgICAgb3RoZXIgZWxlbWVudHMgd2l0aG91dCBuZ1RhcCBvbiB0aGVtIHdvcmsgbm9ybWFsbHkuXG4gIC8vXG4gIC8vIFRoaXMgaXMgYW4gdWdseSwgdGVycmlibGUgaGFjayFcbiAgLy8gWWVhaCwgdGVsbCBtZSBhYm91dCBpdC4gVGhlIGFsdGVybmF0aXZlcyBhcmUgdXNpbmcgdGhlIHNsb3cgY2xpY2sgZXZlbnRzLCBvciBtYWtpbmcgb3VyIHVzZXJzXG4gIC8vIGRlYWwgd2l0aCB0aGUgZ2hvc3QgY2xpY2tzLCBzbyBJIGNvbnNpZGVyIHRoaXMgdGhlIGxlYXN0IG9mIGV2aWxzLiBGb3J0dW5hdGVseSBBbmd1bGFyXG4gIC8vIGVuY2Fwc3VsYXRlcyB0aGlzIHVnbHkgbG9naWMgYXdheSBmcm9tIHRoZSB1c2VyLlxuICAvL1xuICAvLyBXaHkgbm90IGp1c3QgcHV0IGNsaWNrIGhhbmRsZXJzIG9uIHRoZSBlbGVtZW50P1xuICAvLyBXZSBkbyB0aGF0IHRvbywganVzdCB0byBiZSBzdXJlLiBJZiB0aGUgdGFwIGV2ZW50IGNhdXNlZCB0aGUgRE9NIHRvIGNoYW5nZSxcbiAgLy8gaXQgaXMgcG9zc2libGUgYW5vdGhlciBlbGVtZW50IGlzIG5vdyBpbiB0aGF0IHBvc2l0aW9uLiBUbyB0YWtlIGFjY291bnQgZm9yIHRoZXNlIHBvc3NpYmx5XG4gIC8vIGRpc3RpbmN0IGVsZW1lbnRzLCB0aGUgaGFuZGxlcnMgYXJlIGdsb2JhbCBhbmQgY2FyZSBvbmx5IGFib3V0IGNvb3JkaW5hdGVzLlxuXG4gIC8vIENoZWNrcyBpZiB0aGUgY29vcmRpbmF0ZXMgYXJlIGNsb3NlIGVub3VnaCB0byBiZSB3aXRoaW4gdGhlIHJlZ2lvbi5cbiAgZnVuY3Rpb24gaGl0KHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHgxIC0geDIpIDwgQ0xJQ0tCVVNURVJfVEhSRVNIT0xEICYmIE1hdGguYWJzKHkxIC0geTIpIDwgQ0xJQ0tCVVNURVJfVEhSRVNIT0xEO1xuICB9XG5cbiAgLy8gQ2hlY2tzIGEgbGlzdCBvZiBhbGxvd2FibGUgcmVnaW9ucyBhZ2FpbnN0IGEgY2xpY2sgbG9jYXRpb24uXG4gIC8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgY2xpY2sgc2hvdWxkIGJlIGFsbG93ZWQuXG4gIC8vIFNwbGljZXMgb3V0IHRoZSBhbGxvd2FibGUgcmVnaW9uIGZyb20gdGhlIGxpc3QgYWZ0ZXIgaXQgaGFzIGJlZW4gdXNlZC5cbiAgZnVuY3Rpb24gY2hlY2tBbGxvd2FibGVSZWdpb25zKHRvdWNoQ29vcmRpbmF0ZXMsIHgsIHkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdWNoQ29vcmRpbmF0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGlmIChoaXQodG91Y2hDb29yZGluYXRlc1tpXSwgdG91Y2hDb29yZGluYXRlc1tpICsgMV0sIHgsIHkpKSB7XG4gICAgICAgIHRvdWNoQ29vcmRpbmF0ZXMuc3BsaWNlKGksIGkgKyAyKTtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIGFsbG93YWJsZSByZWdpb25cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBObyBhbGxvd2FibGUgcmVnaW9uOyBidXN0IGl0LlxuICB9XG5cbiAgLy8gR2xvYmFsIGNsaWNrIGhhbmRsZXIgdGhhdCBwcmV2ZW50cyB0aGUgY2xpY2sgaWYgaXQncyBpbiBhIGJ1c3RhYmxlIHpvbmUgYW5kIHByZXZlbnRHaG9zdENsaWNrXG4gIC8vIHdhcyBjYWxsZWQgcmVjZW50bHkuXG4gIGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoRGF0ZS5ub3coKSAtIGxhc3RQcmV2ZW50ZWRUaW1lID4gUFJFVkVOVF9EVVJBVElPTikge1xuICAgICAgcmV0dXJuOyAvLyBUb28gb2xkLlxuICAgIH1cblxuICAgIHZhciB0b3VjaGVzID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA/IGV2ZW50LnRvdWNoZXMgOiBbZXZlbnRdO1xuICAgIHZhciB4ID0gdG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHZhciB5ID0gdG91Y2hlc1swXS5jbGllbnRZO1xuICAgIC8vIFdvcmsgYXJvdW5kIGRlc2t0b3AgV2Via2l0IHF1aXJrIHdoZXJlIGNsaWNraW5nIGEgbGFiZWwgd2lsbCBmaXJlIHR3byBjbGlja3MgKG9uIHRoZSBsYWJlbFxuICAgIC8vIGFuZCBvbiB0aGUgaW5wdXQgZWxlbWVudCkuIERlcGVuZGluZyBvbiB0aGUgZXhhY3QgYnJvd3NlciwgdGhpcyBzZWNvbmQgY2xpY2sgd2UgZG9uJ3Qgd2FudFxuICAgIC8vIHRvIGJ1c3QgaGFzIGVpdGhlciAoMCwwKSwgbmVnYXRpdmUgY29vcmRpbmF0ZXMsIG9yIGNvb3JkaW5hdGVzIGVxdWFsIHRvIHRyaWdnZXJpbmcgbGFiZWxcbiAgICAvLyBjbGljayBldmVudFxuICAgIGlmICh4IDwgMSAmJiB5IDwgMSkge1xuICAgICAgcmV0dXJuOyAvLyBvZmZzY3JlZW5cbiAgICB9XG4gICAgaWYgKGxhc3RMYWJlbENsaWNrQ29vcmRpbmF0ZXMgJiZcbiAgICAgICAgbGFzdExhYmVsQ2xpY2tDb29yZGluYXRlc1swXSA9PT0geCAmJiBsYXN0TGFiZWxDbGlja0Nvb3JkaW5hdGVzWzFdID09PSB5KSB7XG4gICAgICByZXR1cm47IC8vIGlucHV0IGNsaWNrIHRyaWdnZXJlZCBieSBsYWJlbCBjbGlja1xuICAgIH1cbiAgICAvLyByZXNldCBsYWJlbCBjbGljayBjb29yZGluYXRlcyBvbiBmaXJzdCBzdWJzZXF1ZW50IGNsaWNrXG4gICAgaWYgKGxhc3RMYWJlbENsaWNrQ29vcmRpbmF0ZXMpIHtcbiAgICAgIGxhc3RMYWJlbENsaWNrQ29vcmRpbmF0ZXMgPSBudWxsO1xuICAgIH1cbiAgICAvLyByZW1lbWJlciBsYWJlbCBjbGljayBjb29yZGluYXRlcyB0byBwcmV2ZW50IGNsaWNrIGJ1c3Rpbmcgb2YgdHJpZ2dlciBjbGljayBldmVudCBvbiBpbnB1dFxuICAgIGlmIChub2RlTmFtZV8oZXZlbnQudGFyZ2V0KSA9PT0gJ2xhYmVsJykge1xuICAgICAgbGFzdExhYmVsQ2xpY2tDb29yZGluYXRlcyA9IFt4LCB5XTtcbiAgICB9XG5cbiAgICAvLyBMb29rIGZvciBhbiBhbGxvd2FibGUgcmVnaW9uIGNvbnRhaW5pbmcgdGhpcyBjbGljay5cbiAgICAvLyBJZiB3ZSBmaW5kIG9uZSwgdGhhdCBtZWFucyBpdCB3YXMgY3JlYXRlZCBieSB0b3VjaHN0YXJ0IGFuZCBub3QgcmVtb3ZlZCBieVxuICAgIC8vIHByZXZlbnRHaG9zdENsaWNrLCBzbyB3ZSBkb24ndCBidXN0IGl0LlxuICAgIGlmIChjaGVja0FsbG93YWJsZVJlZ2lvbnModG91Y2hDb29yZGluYXRlcywgeCwgeSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBkaWRuJ3QgZmluZCBhbiBhbGxvd2FibGUgcmVnaW9uLCBidXN0IHRoZSBjbGljay5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gQmx1ciBmb2N1c2VkIGZvcm0gZWxlbWVudHNcbiAgICBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmJsdXIgJiYgZXZlbnQudGFyZ2V0LmJsdXIoKTtcbiAgfVxuXG5cbiAgLy8gR2xvYmFsIHRvdWNoc3RhcnQgaGFuZGxlciB0aGF0IGNyZWF0ZXMgYW4gYWxsb3dhYmxlIHJlZ2lvbiBmb3IgYSBjbGljayBldmVudC5cbiAgLy8gVGhpcyBhbGxvd2FibGUgcmVnaW9uIGNhbiBiZSByZW1vdmVkIGJ5IHByZXZlbnRHaG9zdENsaWNrIGlmIHdlIHdhbnQgdG8gYnVzdCBpdC5cbiAgZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgdmFyIHRvdWNoZXMgPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID8gZXZlbnQudG91Y2hlcyA6IFtldmVudF07XG4gICAgdmFyIHggPSB0b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdmFyIHkgPSB0b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgdG91Y2hDb29yZGluYXRlcy5wdXNoKHgsIHkpO1xuXG4gICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGFsbG93YWJsZSByZWdpb24uXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdWNoQ29vcmRpbmF0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgaWYgKHRvdWNoQ29vcmRpbmF0ZXNbaV0gPT0geCAmJiB0b3VjaENvb3JkaW5hdGVzW2kgKyAxXSA9PSB5KSB7XG4gICAgICAgICAgdG91Y2hDb29yZGluYXRlcy5zcGxpY2UoaSwgaSArIDIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIFBSRVZFTlRfRFVSQVRJT04sIGZhbHNlKTtcbiAgfVxuXG4gIC8vIE9uIHRoZSBmaXJzdCBjYWxsLCBhdHRhY2hlcyBzb21lIGV2ZW50IGhhbmRsZXJzLiBUaGVuIHdoZW5ldmVyIGl0IGdldHMgY2FsbGVkLCBpdCBjcmVhdGVzIGFcbiAgLy8gem9uZSBhcm91bmQgdGhlIHRvdWNoc3RhcnQgd2hlcmUgY2xpY2tzIHdpbGwgZ2V0IGJ1c3RlZC5cbiAgZnVuY3Rpb24gcHJldmVudEdob3N0Q2xpY2soeCwgeSkge1xuICAgIGlmICghdG91Y2hDb29yZGluYXRlcykge1xuICAgICAgJHJvb3RFbGVtZW50WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljaywgdHJ1ZSk7XG4gICAgICAkcm9vdEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgdHJ1ZSk7XG4gICAgICB0b3VjaENvb3JkaW5hdGVzID0gW107XG4gICAgfVxuXG4gICAgbGFzdFByZXZlbnRlZFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgY2hlY2tBbGxvd2FibGVSZWdpb25zKHRvdWNoQ29vcmRpbmF0ZXMsIHgsIHkpO1xuICB9XG5cbiAgLy8gQWN0dWFsIGxpbmtpbmcgZnVuY3Rpb24uXG4gIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgIHZhciBjbGlja0hhbmRsZXIgPSAkcGFyc2UoYXR0ci5uZ0NsaWNrKSxcbiAgICAgICAgdGFwcGluZyA9IGZhbHNlLFxuICAgICAgICB0YXBFbGVtZW50LCAgLy8gVXNlZCB0byBibHVyIHRoZSBlbGVtZW50IGFmdGVyIGEgdGFwLlxuICAgICAgICBzdGFydFRpbWUsICAgLy8gVXNlZCB0byBjaGVjayBpZiB0aGUgdGFwIHdhcyBoZWxkIHRvbyBsb25nLlxuICAgICAgICB0b3VjaFN0YXJ0WCxcbiAgICAgICAgdG91Y2hTdGFydFk7XG5cbiAgICBmdW5jdGlvbiByZXNldFN0YXRlKCkge1xuICAgICAgdGFwcGluZyA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhBQ1RJVkVfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB0YXBwaW5nID0gdHJ1ZTtcbiAgICAgIHRhcEVsZW1lbnQgPSBldmVudC50YXJnZXQgPyBldmVudC50YXJnZXQgOiBldmVudC5zcmNFbGVtZW50OyAvLyBJRSB1c2VzIHNyY0VsZW1lbnQuXG4gICAgICAvLyBIYWNrIGZvciBTYWZhcmksIHdoaWNoIGNhbiB0YXJnZXQgdGV4dCBub2RlcyBpbnN0ZWFkIG9mIGNvbnRhaW5lcnMuXG4gICAgICBpZiAodGFwRWxlbWVudC5ub2RlVHlwZSA9PSAzKSB7XG4gICAgICAgIHRhcEVsZW1lbnQgPSB0YXBFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoQUNUSVZFX0NMQVNTX05BTUUpO1xuXG4gICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAvLyBVc2UgalF1ZXJ5IG9yaWdpbmFsRXZlbnRcbiAgICAgIHZhciBvcmlnaW5hbEV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICAgIHZhciB0b3VjaGVzID0gb3JpZ2luYWxFdmVudC50b3VjaGVzICYmIG9yaWdpbmFsRXZlbnQudG91Y2hlcy5sZW5ndGggPyBvcmlnaW5hbEV2ZW50LnRvdWNoZXMgOiBbb3JpZ2luYWxFdmVudF07XG4gICAgICB2YXIgZSA9IHRvdWNoZXNbMF07XG4gICAgICB0b3VjaFN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICAgIHRvdWNoU3RhcnRZID0gZS5jbGllbnRZO1xuICAgIH0pO1xuXG4gICAgZWxlbWVudC5vbigndG91Y2hjYW5jZWwnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgcmVzZXRTdGF0ZSgpO1xuICAgIH0pO1xuXG4gICAgZWxlbWVudC5vbigndG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIGRpZmYgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuXG4gICAgICAvLyBVc2UgalF1ZXJ5IG9yaWdpbmFsRXZlbnRcbiAgICAgIHZhciBvcmlnaW5hbEV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICAgIHZhciB0b3VjaGVzID0gKG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgb3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGgpID9cbiAgICAgICAgICBvcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzIDpcbiAgICAgICAgICAoKG9yaWdpbmFsRXZlbnQudG91Y2hlcyAmJiBvcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoKSA/IG9yaWdpbmFsRXZlbnQudG91Y2hlcyA6IFtvcmlnaW5hbEV2ZW50XSk7XG4gICAgICB2YXIgZSA9IHRvdWNoZXNbMF07XG4gICAgICB2YXIgeCA9IGUuY2xpZW50WDtcbiAgICAgIHZhciB5ID0gZS5jbGllbnRZO1xuICAgICAgdmFyIGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3coeCAtIHRvdWNoU3RhcnRYLCAyKSArIE1hdGgucG93KHkgLSB0b3VjaFN0YXJ0WSwgMikpO1xuXG4gICAgICBpZiAodGFwcGluZyAmJiBkaWZmIDwgVEFQX0RVUkFUSU9OICYmIGRpc3QgPCBNT1ZFX1RPTEVSQU5DRSkge1xuICAgICAgICAvLyBDYWxsIHByZXZlbnRHaG9zdENsaWNrIHNvIHRoZSBjbGlja2J1c3RlciB3aWxsIGNhdGNoIHRoZSBjb3JyZXNwb25kaW5nIGNsaWNrLlxuICAgICAgICBwcmV2ZW50R2hvc3RDbGljayh4LCB5KTtcblxuICAgICAgICAvLyBCbHVyIHRoZSBmb2N1c2VkIGVsZW1lbnQgKHRoZSBidXR0b24sIHByb2JhYmx5KSBiZWZvcmUgZmlyaW5nIHRoZSBjYWxsYmFjay5cbiAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHdvcmsgcGVyZmVjdGx5IG9uIEFuZHJvaWQgQ2hyb21lLCBidXQgc2VlbXMgdG8gd29yayBlbHNld2hlcmUuXG4gICAgICAgIC8vIEkgY291bGRuJ3QgZ2V0IGFueXRoaW5nIHRvIHdvcmsgcmVsaWFibHkgb24gQW5kcm9pZCBDaHJvbWUuXG4gICAgICAgIGlmICh0YXBFbGVtZW50KSB7XG4gICAgICAgICAgdGFwRWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGF0dHIuZGlzYWJsZWQpIHx8IGF0dHIuZGlzYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZWxlbWVudC50cmlnZ2VySGFuZGxlcignY2xpY2snLCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXNldFN0YXRlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBIYWNrIGZvciBpT1MgU2FmYXJpJ3MgYmVuZWZpdC4gSXQgZ29lcyBzZWFyY2hpbmcgZm9yIG9uY2xpY2sgaGFuZGxlcnMgYW5kIGlzIGxpYWJsZSB0byBjbGlja1xuICAgIC8vIHNvbWV0aGluZyBlbHNlIG5lYXJieS5cbiAgICBlbGVtZW50Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkgeyB9O1xuXG4gICAgLy8gQWN0dWFsIGNsaWNrIGhhbmRsZXIuXG4gICAgLy8gVGhlcmUgYXJlIHRocmVlIGRpZmZlcmVudCBraW5kcyBvZiBjbGlja3MsIG9ubHkgdHdvIG9mIHdoaWNoIHJlYWNoIHRoaXMgcG9pbnQuXG4gICAgLy8gLSBPbiBkZXNrdG9wIGJyb3dzZXJzIHdpdGhvdXQgdG91Y2ggZXZlbnRzLCB0aGVpciBjbGlja3Mgd2lsbCBhbHdheXMgY29tZSBoZXJlLlxuICAgIC8vIC0gT24gbW9iaWxlIGJyb3dzZXJzLCB0aGUgc2ltdWxhdGVkIFwiZmFzdFwiIGNsaWNrIHdpbGwgY2FsbCB0aGlzLlxuICAgIC8vIC0gQnV0IHRoZSBicm93c2VyJ3MgZm9sbG93LXVwIHNsb3cgY2xpY2sgd2lsbCBiZSBcImJ1c3RlZFwiIGJlZm9yZSBpdCByZWFjaGVzIHRoaXMgaGFuZGxlci5cbiAgICAvLyBUaGVyZWZvcmUgaXQncyBzYWZlIHRvIHVzZSB0aGlzIGRpcmVjdGl2ZSBvbiBib3RoIG1vYmlsZSBhbmQgZGVza3RvcC5cbiAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50LCB0b3VjaGVuZCkge1xuICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGlja0hhbmRsZXIoc2NvcGUsIHskZXZlbnQ6ICh0b3VjaGVuZCB8fCBldmVudCl9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZWxlbWVudC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoQUNUSVZFX0NMQVNTX05BTUUpO1xuICAgIH0pO1xuXG4gICAgZWxlbWVudC5vbignbW91c2Vtb3ZlIG1vdXNldXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhBQ1RJVkVfQ0xBU1NfTkFNRSk7XG4gICAgfSk7XG5cbiAgfTtcbn1dKTtcblxuLyogZ2xvYmFsIG5nVG91Y2g6IGZhbHNlICovXG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgbmdTd2lwZUxlZnRcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYW4gZWxlbWVudCBpcyBzd2lwZWQgdG8gdGhlIGxlZnQgb24gYSB0b3VjaHNjcmVlbiBkZXZpY2UuXG4gKiBBIGxlZnR3YXJkIHN3aXBlIGlzIGEgcXVpY2ssIHJpZ2h0LXRvLWxlZnQgc2xpZGUgb2YgdGhlIGZpbmdlci5cbiAqIFRob3VnaCBuZ1N3aXBlTGVmdCBpcyBkZXNpZ25lZCBmb3IgdG91Y2gtYmFzZWQgZGV2aWNlcywgaXQgd2lsbCB3b3JrIHdpdGggYSBtb3VzZSBjbGljayBhbmQgZHJhZ1xuICogdG9vLlxuICpcbiAqIFRvIGRpc2FibGUgdGhlIG1vdXNlIGNsaWNrIGFuZCBkcmFnIGZ1bmN0aW9uYWxpdHksIGFkZCBgbmctc3dpcGUtZGlzYWJsZS1tb3VzZWAgdG9cbiAqIHRoZSBgbmctc3dpcGUtbGVmdGAgb3IgYG5nLXN3aXBlLXJpZ2h0YCBET00gRWxlbWVudC5cbiAqXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nVG91Y2ggYG5nVG91Y2hgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqIEBlbGVtZW50IEFOWVxuICogQHBhcmFtIHtleHByZXNzaW9ufSBuZ1N3aXBlTGVmdCB7QGxpbmsgZ3VpZGUvZXhwcmVzc2lvbiBFeHByZXNzaW9ufSB0byBldmFsdWF0ZVxuICogdXBvbiBsZWZ0IHN3aXBlLiAoRXZlbnQgb2JqZWN0IGlzIGF2YWlsYWJsZSBhcyBgJGV2ZW50YClcbiAqXG4gKiBAZXhhbXBsZVxuICAgIDxleGFtcGxlIG1vZHVsZT1cIm5nU3dpcGVMZWZ0RXhhbXBsZVwiIGRlcHM9XCJhbmd1bGFyLXRvdWNoLmpzXCI+XG4gICAgICA8ZmlsZSBuYW1lPVwiaW5kZXguaHRtbFwiPlxuICAgICAgICA8ZGl2IG5nLXNob3c9XCIhc2hvd0FjdGlvbnNcIiBuZy1zd2lwZS1sZWZ0PVwic2hvd0FjdGlvbnMgPSB0cnVlXCI+XG4gICAgICAgICAgU29tZSBsaXN0IGNvbnRlbnQsIGxpa2UgYW4gZW1haWwgaW4gdGhlIGluYm94XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IG5nLXNob3c9XCJzaG93QWN0aW9uc1wiIG5nLXN3aXBlLXJpZ2h0PVwic2hvd0FjdGlvbnMgPSBmYWxzZVwiPlxuICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XCJyZXBseSgpXCI+UmVwbHk8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiZGVsZXRlKClcIj5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpbGU+XG4gICAgICA8ZmlsZSBuYW1lPVwic2NyaXB0LmpzXCI+XG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCduZ1N3aXBlTGVmdEV4YW1wbGUnLCBbJ25nVG91Y2gnXSk7XG4gICAgICA8L2ZpbGU+XG4gICAgPC9leGFtcGxlPlxuICovXG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgbmdTd2lwZVJpZ2h0XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGFuIGVsZW1lbnQgaXMgc3dpcGVkIHRvIHRoZSByaWdodCBvbiBhIHRvdWNoc2NyZWVuIGRldmljZS5cbiAqIEEgcmlnaHR3YXJkIHN3aXBlIGlzIGEgcXVpY2ssIGxlZnQtdG8tcmlnaHQgc2xpZGUgb2YgdGhlIGZpbmdlci5cbiAqIFRob3VnaCBuZ1N3aXBlUmlnaHQgaXMgZGVzaWduZWQgZm9yIHRvdWNoLWJhc2VkIGRldmljZXMsIGl0IHdpbGwgd29yayB3aXRoIGEgbW91c2UgY2xpY2sgYW5kIGRyYWdcbiAqIHRvby5cbiAqXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nVG91Y2ggYG5nVG91Y2hgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqIEBlbGVtZW50IEFOWVxuICogQHBhcmFtIHtleHByZXNzaW9ufSBuZ1N3aXBlUmlnaHQge0BsaW5rIGd1aWRlL2V4cHJlc3Npb24gRXhwcmVzc2lvbn0gdG8gZXZhbHVhdGVcbiAqIHVwb24gcmlnaHQgc3dpcGUuIChFdmVudCBvYmplY3QgaXMgYXZhaWxhYmxlIGFzIGAkZXZlbnRgKVxuICpcbiAqIEBleGFtcGxlXG4gICAgPGV4YW1wbGUgbW9kdWxlPVwibmdTd2lwZVJpZ2h0RXhhbXBsZVwiIGRlcHM9XCJhbmd1bGFyLXRvdWNoLmpzXCI+XG4gICAgICA8ZmlsZSBuYW1lPVwiaW5kZXguaHRtbFwiPlxuICAgICAgICA8ZGl2IG5nLXNob3c9XCIhc2hvd0FjdGlvbnNcIiBuZy1zd2lwZS1sZWZ0PVwic2hvd0FjdGlvbnMgPSB0cnVlXCI+XG4gICAgICAgICAgU29tZSBsaXN0IGNvbnRlbnQsIGxpa2UgYW4gZW1haWwgaW4gdGhlIGluYm94XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IG5nLXNob3c9XCJzaG93QWN0aW9uc1wiIG5nLXN3aXBlLXJpZ2h0PVwic2hvd0FjdGlvbnMgPSBmYWxzZVwiPlxuICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XCJyZXBseSgpXCI+UmVwbHk8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiZGVsZXRlKClcIj5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpbGU+XG4gICAgICA8ZmlsZSBuYW1lPVwic2NyaXB0LmpzXCI+XG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCduZ1N3aXBlUmlnaHRFeGFtcGxlJywgWyduZ1RvdWNoJ10pO1xuICAgICAgPC9maWxlPlxuICAgIDwvZXhhbXBsZT5cbiAqL1xuXG5mdW5jdGlvbiBtYWtlU3dpcGVEaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgZGlyZWN0aW9uLCBldmVudE5hbWUpIHtcbiAgbmdUb3VjaC5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgWyckcGFyc2UnLCAnJHN3aXBlJywgZnVuY3Rpb24oJHBhcnNlLCAkc3dpcGUpIHtcbiAgICAvLyBUaGUgbWF4aW11bSB2ZXJ0aWNhbCBkZWx0YSBmb3IgYSBzd2lwZSBzaG91bGQgYmUgbGVzcyB0aGFuIDc1cHguXG4gICAgdmFyIE1BWF9WRVJUSUNBTF9ESVNUQU5DRSA9IDc1O1xuICAgIC8vIFZlcnRpY2FsIGRpc3RhbmNlIHNob3VsZCBub3QgYmUgbW9yZSB0aGFuIGEgZnJhY3Rpb24gb2YgdGhlIGhvcml6b250YWwgZGlzdGFuY2UuXG4gICAgdmFyIE1BWF9WRVJUSUNBTF9SQVRJTyA9IDAuMztcbiAgICAvLyBBdCBsZWFzdCBhIDMwcHggbGF0ZXJhbCBtb3Rpb24gaXMgbmVjZXNzYXJ5IGZvciBhIHN3aXBlLlxuICAgIHZhciBNSU5fSE9SSVpPTlRBTF9ESVNUQU5DRSA9IDMwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICB2YXIgc3dpcGVIYW5kbGVyID0gJHBhcnNlKGF0dHJbZGlyZWN0aXZlTmFtZV0pO1xuXG4gICAgICB2YXIgc3RhcnRDb29yZHMsIHZhbGlkO1xuXG4gICAgICBmdW5jdGlvbiB2YWxpZFN3aXBlKGNvb3Jkcykge1xuICAgICAgICAvLyBDaGVjayB0aGF0IGl0J3Mgd2l0aGluIHRoZSBjb29yZGluYXRlcy5cbiAgICAgICAgLy8gQWJzb2x1dGUgdmVydGljYWwgZGlzdGFuY2UgbXVzdCBiZSB3aXRoaW4gdG9sZXJhbmNlcy5cbiAgICAgICAgLy8gSG9yaXpvbnRhbCBkaXN0YW5jZSwgd2UgdGFrZSB0aGUgY3VycmVudCBYIC0gdGhlIHN0YXJ0aW5nIFguXG4gICAgICAgIC8vIFRoaXMgaXMgbmVnYXRpdmUgZm9yIGxlZnR3YXJkIHN3aXBlcyBhbmQgcG9zaXRpdmUgZm9yIHJpZ2h0d2FyZCBzd2lwZXMuXG4gICAgICAgIC8vIEFmdGVyIG11bHRpcGx5aW5nIGJ5IHRoZSBkaXJlY3Rpb24gKC0xIGZvciBsZWZ0LCArMSBmb3IgcmlnaHQpLCBsZWdhbCBzd2lwZXNcbiAgICAgICAgLy8gKGllLiBzYW1lIGRpcmVjdGlvbiBhcyB0aGUgZGlyZWN0aXZlIHdhbnRzKSB3aWxsIGhhdmUgYSBwb3NpdGl2ZSBkZWx0YSBhbmRcbiAgICAgICAgLy8gaWxsZWdhbCBvbmVzIGEgbmVnYXRpdmUgZGVsdGEuXG4gICAgICAgIC8vIFRoZXJlZm9yZSB0aGlzIGRlbHRhIG11c3QgYmUgcG9zaXRpdmUsIGFuZCBsYXJnZXIgdGhhbiB0aGUgbWluaW11bS5cbiAgICAgICAgaWYgKCFzdGFydENvb3JkcykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGVsdGFZID0gTWF0aC5hYnMoY29vcmRzLnkgLSBzdGFydENvb3Jkcy55KTtcbiAgICAgICAgdmFyIGRlbHRhWCA9IChjb29yZHMueCAtIHN0YXJ0Q29vcmRzLngpICogZGlyZWN0aW9uO1xuICAgICAgICByZXR1cm4gdmFsaWQgJiYgLy8gU2hvcnQgY2lyY3VpdCBmb3IgYWxyZWFkeS1pbnZhbGlkYXRlZCBzd2lwZXMuXG4gICAgICAgICAgICBkZWx0YVkgPCBNQVhfVkVSVElDQUxfRElTVEFOQ0UgJiZcbiAgICAgICAgICAgIGRlbHRhWCA+IDAgJiZcbiAgICAgICAgICAgIGRlbHRhWCA+IE1JTl9IT1JJWk9OVEFMX0RJU1RBTkNFICYmXG4gICAgICAgICAgICBkZWx0YVkgLyBkZWx0YVggPCBNQVhfVkVSVElDQUxfUkFUSU87XG4gICAgICB9XG5cbiAgICAgIHZhciBwb2ludGVyVHlwZXMgPSBbJ3RvdWNoJ107XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJbJ25nU3dpcGVEaXNhYmxlTW91c2UnXSkpIHtcbiAgICAgICAgcG9pbnRlclR5cGVzLnB1c2goJ21vdXNlJyk7XG4gICAgICB9XG4gICAgICAkc3dpcGUuYmluZChlbGVtZW50LCB7XG4gICAgICAgICdzdGFydCc6IGZ1bmN0aW9uKGNvb3JkcywgZXZlbnQpIHtcbiAgICAgICAgICBzdGFydENvb3JkcyA9IGNvb3JkcztcbiAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgICdjYW5jZWwnOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgICdlbmQnOiBmdW5jdGlvbihjb29yZHMsIGV2ZW50KSB7XG4gICAgICAgICAgaWYgKHZhbGlkU3dpcGUoY29vcmRzKSkge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBlbGVtZW50LnRyaWdnZXJIYW5kbGVyKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgIHN3aXBlSGFuZGxlcihzY29wZSwgeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9pbnRlclR5cGVzKTtcbiAgICB9O1xuICB9XSk7XG59XG5cbi8vIExlZnQgaXMgbmVnYXRpdmUgWC1jb29yZGluYXRlLCByaWdodCBpcyBwb3NpdGl2ZS5cbm1ha2VTd2lwZURpcmVjdGl2ZSgnbmdTd2lwZUxlZnQnLCAtMSwgJ3N3aXBlbGVmdCcpO1xubWFrZVN3aXBlRGlyZWN0aXZlKCduZ1N3aXBlUmlnaHQnLCAxLCAnc3dpcGVyaWdodCcpO1xuXG5cblxufSkod2luZG93LCB3aW5kb3cuYW5ndWxhcik7XG4iLCJyZXF1aXJlKCcuL2FuZ3VsYXItdG91Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gJ25nVG91Y2gnO1xuIl19
