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





},{"./controllers":4,"./directives":9,"./filters":18,"./libs/mobile-nav":22,"./libs/ngStorage.min":23,"./on_config":25,"./on_run":26,"./provider":27,"./services":36,"angular-route":43,"angular-touch":45}],2:[function(require,module,exports){
'use strict';
module.exports = ['$scope', '$timeout', '$sessionStorage', 'nexus', 'nav', 'loading', 'AJAX', 'dateRange', 'authService', 'selectChecked',
    function ($scope, $timeout, $sessionStorage, nexus, nav, loading, AJAX, dateRange, authService,  selectChecked) {

    }
];

},{}],3:[function(require,module,exports){
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

},{"../modules/TouchSlide.1.1":24}],4:[function(require,module,exports){
var controllers = angular.module('app.controllers', []);

controllers
    .controller('mainCtrl', require('./mainCtrl'))
    .controller('homeCtrl', require('./homeCtrl'))
    .controller('integralMallCtrl', require('./integralMallCtrl'))
    .controller('couponCtrl', require('./couponCtrl'))
;
module.exports = controllers;
},{"./couponCtrl":2,"./homeCtrl":3,"./integralMallCtrl":5,"./mainCtrl":6}],5:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{"./animatedBottom":7,"./dateTable":8,"./infiniteScroll":10,"./inputClear":11,"./makeCall":12,"./timeleft":13,"./uiLoading":14,"./uiModal":15}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
var filters = angular.module('app.filters', []);


filters
    .filter('toTimeDivision', require('./toTimeDivision'))  //将 2014-08-28 17:00:00 转换为 17:00
    .filter('changeDate', require('./changeDate'))  //日期加1或减1
    .filter('toWeek', require('./toWeek'))  //通过日期获得星期
    .filter('deleteBlank', require('./deleteBlank'))  //删除空格
    .filter('multiFilter', require('./multiFilter'))


module.exports = filters;
},{"./changeDate":16,"./deleteBlank":17,"./multiFilter":19,"./toTimeDivision":20,"./toWeek":21}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
"use strict";(function(){var a=angular.module("ngStorage",[]).factory("$localStorage",b("localStorage")).factory("$sessionStorage",b("sessionStorage"));function b(c){return["$rootScope","$window",function(d,m){var l=m[c]||(console.warn("This browser does not support Web Storage!"),{}),h={$default:function(n){for(var i in n){angular.isDefined(h[i])||(h[i]=n[i])}return h},$reset:function(n){for(var i in h){"$"===i[0]||delete h[i]}return h.$default(n)}},j,f;for(var g=0,e;g<l.length;g++){(e=l.key(g))&&"ngStorage-"===e.slice(0,10)&&(h[e.slice(10)]=angular.fromJson(l.getItem(e)))}j=angular.copy(h);d.$watch(function(){f||(f=setTimeout(function(){f=null;if(!angular.equals(h,j)){angular.forEach(h,function(o,n){angular.isDefined(o)&&"$"!==n[0]&&l.setItem("ngStorage-"+n,angular.toJson(o));delete j[n]});for(var i in j){l.removeItem("ngStorage-"+i)}j=angular.copy(h)}},100))});"localStorage"===c&&m.addEventListener&&m.addEventListener("storage",function(i){if("ngStorage-"===i.key.slice(0,10)){i.newValue?h[i.key.slice(10)]=angular.fromJson(i.newValue):delete h[i.key.slice(10)];j=angular.copy(h);d.$apply()}});return h}]}module.exports=a})();
},{}],24:[function(require,module,exports){
var TouchSlide=function(a){a=a||{};var b={slideCell:a.slideCell||"#touchSlide",titCell:a.titCell||".hd li",mainCell:a.mainCell||".bd",effect:a.effect||"left",autoPlay:a.autoPlay||!1,delayTime:a.delayTime||200,interTime:a.interTime||2500,defaultIndex:a.defaultIndex||0,titOnClassName:a.titOnClassName||"on",autoPage:a.autoPage||!1,prevCell:a.prevCell||".prev",nextCell:a.nextCell||".next",pageStateCell:a.pageStateCell||".pageState",pnLoop:"undefined "==a.pnLoop?!0:a.pnLoop,startFun:a.startFun||null,endFun:a.endFun||null,switchLoad:a.switchLoad||null},c=document.getElementById(b.slideCell.replace("#",""));if(!c)return!1;var d=function(a,b){a=a.split(" ");var c=[];b=b||document;var d=[b];for(var e in a)0!=a[e].length&&c.push(a[e]);for(var e in c){if(0==d.length)return!1;var f=[];for(var g in d)if("#"==c[e][0])f.push(document.getElementById(c[e].replace("#","")));else if("."==c[e][0])for(var h=d[g].getElementsByTagName("*"),i=0;i<h.length;i++){var j=h[i].className;j&&-1!=j.search(new RegExp("\\b"+c[e].replace(".","")+"\\b"))&&f.push(h[i])}else for(var h=d[g].getElementsByTagName(c[e]),i=0;i<h.length;i++)f.push(h[i]);d=f}return 0==d.length||d[0]==b?!1:d},e=function(a,b){var c=document.createElement("div");c.innerHTML=b,c=c.children[0];var d=a.cloneNode(!0);return c.appendChild(d),a.parentNode.replaceChild(c,a),m=d,c},g=function(a,b){!a||!b||a.className&&-1!=a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className+=(a.className?" ":"")+b)},h=function(a,b){!a||!b||a.className&&-1==a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className=a.className.replace(new RegExp("\\s*\\b"+b+"\\b","g"),""))},i=b.effect,j=d(b.prevCell,c)[0],k=d(b.nextCell,c)[0],l=d(b.pageStateCell)[0],m=d(b.mainCell,c)[0];if(!m)return!1;var N,O,n=m.children.length,o=d(b.titCell,c),p=o?o.length:n,q=b.switchLoad,r=parseInt(b.defaultIndex),s=parseInt(b.delayTime),t=parseInt(b.interTime),u="false"==b.autoPlay||0==b.autoPlay?!1:!0,v="false"==b.autoPage||0==b.autoPage?!1:!0,w="false"==b.pnLoop||0==b.pnLoop?!1:!0,x=r,y=null,z=null,A=null,B=0,C=0,D=0,E=0,G=/hp-tablet/gi.test(navigator.appVersion),H="ontouchstart"in window&&!G,I=H?"touchstart":"mousedown",J=H?"touchmove":"",K=H?"touchend":"mouseup",M=m.parentNode.clientWidth,P=n;if(0==p&&(p=n),v){p=n,o=o[0],o.innerHTML="";var Q="";if(1==b.autoPage||"true"==b.autoPage)for(var R=0;p>R;R++)Q+="<li>"+(R+1)+"</li>";else for(var R=0;p>R;R++)Q+=b.autoPage.replace("$",R+1);o.innerHTML=Q,o=o.children}"leftLoop"==i&&(P+=2,m.appendChild(m.children[0].cloneNode(!0)),m.insertBefore(m.children[n-1].cloneNode(!0),m.children[0])),N=e(m,'<div class="tempWrap" style="overflow:hidden;position:relative;"></div>'),m.style.cssText="width:"+P*M+"px;position:relative;overflow:hidden;padding:0;margin:0;";for(var R=0;P>R;R++)m.children[R].style.cssText="display:table-cell;vertical-align:top;width:"+M+"px";var S=function(){"function"==typeof b.startFun&&b.startFun(r,p)},T=function(){"function"==typeof b.endFun&&b.endFun(r,p)},U=function(a){var b=("leftLoop"==i?r+1:r)+a,c=function(a){for(var b=m.children[a].getElementsByTagName("img"),c=0;c<b.length;c++)b[c].getAttribute(q)&&(b[c].setAttribute("src",b[c].getAttribute(q)),b[c].removeAttribute(q))};if(c(b),"leftLoop"==i)switch(b){case 0:c(n);break;case 1:c(n+1);break;case n:c(0);break;case n+1:c(1)}},V=function(){M=N.clientWidth,m.style.width=P*M+"px";for(var a=0;P>a;a++)m.children[a].style.width=M+"px";var b="leftLoop"==i?r+1:r;W(-b*M,0)};window.addEventListener("resize",V,!1);var W=function(a,b,c){c=c?c.style:m.style,c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms",c.webkitTransform="translate("+a+"px,0)translateZ(0)",c.msTransform=c.MozTransform=c.OTransform="translateX("+a+"px)"},X=function(a){switch(i){case"left":r>=p?r=a?r-1:0:0>r&&(r=a?0:p-1),null!=q&&U(0),W(-r*M,s),x=r;break;case"leftLoop":null!=q&&U(0),W(-(r+1)*M,s),-1==r?(z=setTimeout(function(){W(-p*M,0)},s),r=p-1):r==p&&(z=setTimeout(function(){W(-M,0)},s),r=0),x=r}S(),A=setTimeout(function(){T()},s);for(var c=0;p>c;c++)h(o[c],b.titOnClassName),c==r&&g(o[c],b.titOnClassName);0==w&&(h(k,"nextStop"),h(j,"prevStop"),0==r?g(j,"prevStop"):r==p-1&&g(k,"nextStop")),l&&(l.innerHTML="<span>"+(r+1)+"</span>/"+p)};if(X(),u&&(y=setInterval(function(){r++,X()},t)),o)for(var R=0;p>R;R++)!function(){var a=R;o[a].addEventListener("click",function(){clearTimeout(z),clearTimeout(A),r=a,X()})}();k&&k.addEventListener("click",function(){(1==w||r!=p-1)&&(clearTimeout(z),clearTimeout(A),r++,X())}),j&&j.addEventListener("click",function(){(1==w||0!=r)&&(clearTimeout(z),clearTimeout(A),r--,X())});var Y=function(a){clearTimeout(z),clearTimeout(A),O=void 0,D=0;var b=H?a.touches[0]:a;B=b.pageX,C=b.pageY,m.addEventListener(J,Z,!1),m.addEventListener(K,$,!1)},Z=function(a){if(!H||!(a.touches.length>1||a.scale&&1!==a.scale)){var b=H?a.touches[0]:a;if(D=b.pageX-B,E=b.pageY-C,"undefined"==typeof O&&(O=!!(O||Math.abs(D)<Math.abs(E))),!O){switch(a.preventDefault(),u&&clearInterval(y),i){case"left":(0==r&&D>0||r>=p-1&&0>D)&&(D=.4*D),W(-r*M+D,0);break;case"leftLoop":W(-(r+1)*M+D,0)}null!=q&&Math.abs(D)>M/3&&U(D>-0?-1:1)}}},$=function(a){0!=D&&(a.preventDefault(),O||(Math.abs(D)>M/10&&(D>0?r--:r++),X(!0),u&&(y=setInterval(function(){r++,X()},t))),m.removeEventListener(J,Z,!1),m.removeEventListener(K,$,!1))};m.addEventListener(I,Y,!1)};module.exports=TouchSlide;
},{}],25:[function(require,module,exports){
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
            //.when('/couponDetail', {
            //    templateUrl: 'partials/couponDetail.html',      //�Ż�ȯ����
            //    controller: 'couponDetailCtrl'
            //})
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
 

},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
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



},{}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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


},{}],32:[function(require,module,exports){
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




},{}],33:[function(require,module,exports){
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



},{}],34:[function(require,module,exports){
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
},{}],35:[function(require,module,exports){
'use strict';
/**
 * 存储请求数据
 * */


var httpCacheData = function ($cacheFactory) {
    return $cacheFactory('httpCacheData');
};

module.exports = ['$cacheFactory', httpCacheData];
},{}],36:[function(require,module,exports){
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
},{"./AJAX":28,"./anchorSmoothScroll":29,"./authService":30,"./checkTime":31,"./covertTime":32,"./dateRange":33,"./historyRecords":34,"./httpCacheData":35,"./loading":37,"./nav":38,"./nexus":39,"./selectChecked":40,"./validate":41}],37:[function(require,module,exports){
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



},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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


},{}],41:[function(require,module,exports){
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



},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
require('./angular-route');
module.exports = 'ngRoute';

},{"./angular-route":42}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
require('./angular-touch');
module.exports = 'ngTouch';

},{"./angular-touch":44}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0FkbWluaXN0cmF0b3IvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC5qcyIsImNvbnRyb2xsZXJzL2NvdXBvbkN0cmwuanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL2luZGV4LmpzIiwiY29udHJvbGxlcnMvbWFpbkN0cmwuanMiLCJkaXJlY3RpdmVzL2FuaW1hdGVkQm90dG9tLmpzIiwiZGlyZWN0aXZlcy9kYXRlVGFibGUuanMiLCJkaXJlY3RpdmVzL2luZGV4LmpzIiwiZGlyZWN0aXZlcy9pbmZpbml0ZVNjcm9sbC5qcyIsImRpcmVjdGl2ZXMvaW5wdXRDbGVhci5qcyIsImRpcmVjdGl2ZXMvbWFrZUNhbGwuanMiLCJkaXJlY3RpdmVzL3RpbWVsZWZ0LmpzIiwiZGlyZWN0aXZlcy91aUxvYWRpbmcuanMiLCJkaXJlY3RpdmVzL3VpTW9kYWwuanMiLCJmaWx0ZXJzL2NoYW5nZURhdGUuanMiLCJmaWx0ZXJzL2RlbGV0ZUJsYW5rLmpzIiwiZmlsdGVycy9pbmRleC5qcyIsImZpbHRlcnMvbXVsdGlGaWx0ZXIuanMiLCJmaWx0ZXJzL3RvVGltZURpdmlzaW9uLmpzIiwiZmlsdGVycy90b1dlZWsuanMiLCJsaWJzL21vYmlsZS1uYXYuanMiLCJsaWJzL25nU3RvcmFnZS5taW4uanMiLCJtb2R1bGVzL1RvdWNoU2xpZGUuMS4xLmpzIiwib25fY29uZmlnLmpzIiwib25fcnVuLmpzIiwicHJvdmlkZXIvaW5kZXguanMiLCJzZXJ2aWNlcy9BSkFYLmpzIiwic2VydmljZXMvYW5jaG9yU21vb3RoU2Nyb2xsLmpzIiwic2VydmljZXMvYXV0aFNlcnZpY2UuanMiLCJzZXJ2aWNlcy9jaGVja1RpbWUuanMiLCJzZXJ2aWNlcy9jb3ZlcnRUaW1lLmpzIiwic2VydmljZXMvZGF0ZVJhbmdlLmpzIiwic2VydmljZXMvaGlzdG9yeVJlY29yZHMuanMiLCJzZXJ2aWNlcy9odHRwQ2FjaGVEYXRhLmpzIiwic2VydmljZXMvaW5kZXguanMiLCJzZXJ2aWNlcy9sb2FkaW5nLmpzIiwic2VydmljZXMvbmF2LmpzIiwic2VydmljZXMvbmV4dXMuanMiLCJzZXJ2aWNlcy9zZWxlY3RDaGVja2VkLmpzIiwic2VydmljZXMvdmFsaWRhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZS9hbmd1bGFyLXJvdXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGUvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci10b3VjaC9hbmd1bGFyLXRvdWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItdG91Y2gvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGJBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy85QkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcG5CQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICByZXF1aXJlKCdhbmd1bGFyLXJvdXRlJyksXG4gICAgcmVxdWlyZSgnYW5ndWxhci10b3VjaCcpLFxuXG4gICAgcmVxdWlyZSgnLi9saWJzL21vYmlsZS1uYXYnKS5uYW1lLFxuICAgIHJlcXVpcmUoJy4vbGlicy9uZ1N0b3JhZ2UubWluJykubmFtZSxcblxuICAgIHJlcXVpcmUoJy4vcHJvdmlkZXInKS5uYW1lLFxuICAgIHJlcXVpcmUoJy4vZGlyZWN0aXZlcycpLm5hbWUsXG4gICAgcmVxdWlyZSgnLi9zZXJ2aWNlcycpLm5hbWUsXG4gICAgcmVxdWlyZSgnLi9maWx0ZXJzJykubmFtZSxcbiAgICByZXF1aXJlKCcuL2NvbnRyb2xsZXJzJykubmFtZVxuXSlcbi5jb25zdGFudCgndmVyc2lvbicsICcwLjEnKVxuLmNvbmZpZyhyZXF1aXJlKCcuL29uX2NvbmZpZycpKVxuLnJ1bihyZXF1aXJlKCcuL29uX3J1bicpKVxuXG5cblxuXG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJyRzZXNzaW9uU3RvcmFnZScsICduZXh1cycsICduYXYnLCAnbG9hZGluZycsICdBSkFYJywgJ2RhdGVSYW5nZScsICdhdXRoU2VydmljZScsICdzZWxlY3RDaGVja2VkJyxcbiAgICBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJHNlc3Npb25TdG9yYWdlLCBuZXh1cywgbmF2LCBsb2FkaW5nLCBBSkFYLCBkYXRlUmFuZ2UsIGF1dGhTZXJ2aWNlLCAgc2VsZWN0Q2hlY2tlZCkge1xuXG4gICAgfVxuXTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gWyckc2NvcGUnLFxuICAgIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuICAgICAgICBcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcblxuXG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlQmFubmVyMigpIHtcbiAgICAgICAgICAgIHZhciBUb3VjaFNsaWRlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9Ub3VjaFNsaWRlLjEuMScpO1xuICAgICAgICAgICAgVG91Y2hTbGlkZSh7XG4gICAgICAgICAgICAgICAgc2xpZGVDZWxsOiBcIiNzbGlkZUJveFwiLFxuICAgICAgICAgICAgICAgIHRpdENlbGw6IFwiI2J0bkNvbnRhaW5lciB1bFwiLCAvL+W8gOWQr+iHquWKqOWIhumhtSBhdXRvUGFnZTp0cnVlIO+8jOatpOaXtuiuvue9riB0aXRDZWxsIOS4uuWvvOiIquWFg+e0oOWMheijueWxglxuICAgICAgICAgICAgICAgIG1haW5DZWxsOiBcIiNwaWNDb250YWluZXIgdWxcIixcbiAgICAgICAgICAgICAgICBlZmZlY3Q6XCJsZWZ0TG9vcFwiLFxuICAgICAgICAgICAgICAgIGRlbGF5VGltZTogMTAwMCwgIC8v5q+r56eS77yb5YiH5o2i5pWI5p6c5oyB57ut5pe26Ze077yI5omn6KGM5LiA5qyh5pWI5p6c55So5aSa5bCR5q+r56eS77yJ44CCXG4gICAgICAgICAgICAgICAgaW50ZXJUaW1lOiA1MDAwLCAvL+avq+enku+8m+iHquWKqOi/kOihjOmXtOmalO+8iOmalOWkmuWwkeavq+enkuWQjuaJp+ihjOS4i+S4gOS4quaViOaenO+8iVxuICAgICAgICAgICAgICAgIGF1dG9QbGF5OnRydWUsLy/oh6rliqjmkq3mlL5cbiAgICAgICAgICAgICAgICBhdXRvUGFnZTp0cnVlIC8v6Ieq5Yqo5YiG6aG1XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG5cblxuXG4gICAgICAgIHZhciBzaG93QmFubmVyID0gZnVuY3Rpb24gKGFkdnMpIHtcbiAgICAgICAgICAgIHZhciBodG1sU3RyID0gJyc7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYWR2cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWxTdHIgKz1cbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBjbGFzcz1cInBpY1wiPjxpbWcgY2xhc3M9XCJhZHZQaWNcIiBzcmM9XCJ7e2ltYWdlVXJsfX1cIiAgb25lcnJvcj1cXFwidGhpcy5zcmM9XFwnXFwnXFxcIiAgLz48L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7aW1hZ2VOYW1lfX0nLCBhZHZzW2ldLmltYWdlTmFtZSkucmVwbGFjZSgne3tyZWRpcmVjdFVybH19JywgYWR2c1tpXS5yZWRpcmVjdFVybCkucmVwbGFjZSgne3tpbWFnZVVybH19JywgYWR2c1tpXS5pbWFnZVVybClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZHZCb3gnKS5pbm5lckhUTUwgPSBodG1sU3RyO1xuICAgICAgICAgICAgaWYgKGFkdnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBUb3VjaFNsaWRlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9Ub3VjaFNsaWRlLjEuMScpO1xuICAgICAgICAgICAgICAgIFRvdWNoU2xpZGUoe1xuICAgICAgICAgICAgICAgICAgICBzbGlkZUNlbGw6IFwiI3NsaWRlQm94XCIsXG4gICAgICAgICAgICAgICAgICAgIHRpdENlbGw6IFwiI2J0bkNvbnRhaW5lciB1bFwiLCAvL+W8gOWQr+iHquWKqOWIhumhtSBhdXRvUGFnZTp0cnVlIO+8jOatpOaXtuiuvue9riB0aXRDZWxsIOS4uuWvvOiIquWFg+e0oOWMheijueWxglxuICAgICAgICAgICAgICAgICAgICBtYWluQ2VsbDogXCIjcGljQ29udGFpbmVyIHVsXCIsXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdDogXCJsZWZ0TG9vcFwiLFxuICAgICAgICAgICAgICAgICAgICBpbnRlclRpbWU6IDMwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9QYWdlOiB0cnVlLC8v6Ieq5Yqo5YiG6aG1XG4gICAgICAgICAgICAgICAgICAgIGF1dG9QbGF5OiB0cnVlIC8v6Ieq5Yqo5pKt5pS+XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cblxuXG5cblxuICAgICAgICB2YXIgYWR2UmVxdWVzdDtcbiAgICAgICAgZnVuY3Rpb24gc2xpZGVCYW5uZXIoKSB7XG4gICAgICAgICAgICB2YXIgcGljQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpY0NvbnRhaW5lcicpO1xuICAgICAgICAgICAgLy9pZiAoISR0aGlzLmFkdnMpIHtcbiAgICAgICAgICAgIGdldEJ1c2FkdnBpY3R1cmUoKTtcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgIHBpY0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAkdGhpcy5iYW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAvLyAgICBzaG93QmFubmVyKCR0aGlzLmFkdnMpXG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QnVzYWR2cGljdHVyZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJyZXNwb25zZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlYWRlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyc3BUeXBlXCI6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicnNwQ29kZVwiOiBcIjAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJzcERlc2NcIjogXCLmn6Xor6LmiJDlip9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZHZlcnRpc21lbnRMaXN0XCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWNlVXJsVHlwZVwiOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRpcmVjdFVybFwiOiBcImh0dHA6Ly9pbWcxLjQwMDE3LmNuL3RvdWNoL25ld3Byb2plY3QvdHJhZmZpYy9odG1sL25hdGlvbmFsRGF5XzIuaHRtbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImltYWdlTmFtZVwiOiBcIuenn+i9pueri+WHjzY25YWD5rS75YqoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1hZ2VVcmxcIjogXCJodHRwOi8vaW1nMS40MDAxNy5jbi90b3VjaC9uZXdwcm9qZWN0L3RyYWZmaWMvaW1nL2k2XzY2YmFubmVyX2xhcmdlX2lvcy5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdcIjogXCJ2NzYxdjc3MHZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWNlVXJsVHlwZVwiOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkaXJlY3RVcmxcIjogXCJodHRwOi8vaW1nMS40MDAxNy5jbi90b3VjaC9uZXdwcm9qZWN0L3RyYWZmaWMvaHRtbC96dWNoZS5odG1sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImltYWdlTmFtZVwiOiBcIuiHqumpvuenn+i9pjEx5YWD55av56eSXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImltYWdlVXJsXCI6IFwiaHR0cDovL2d1b3FpbmcyMDEzLmZyZWUzdi5uZXQvbWFya2Rvd24vYV83MDBfMTZfMF8xNDExMDcxMDI4MzJfbGFyZ2UucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ1wiOiBcInY3NTF2MTcxNnZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RpY2VVcmxUeXBlXCI6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRpcmVjdFVybFwiOiBcImh0dHA6Ly9pbWcxLjQwMDE3LmNuL3RvdWNoL25ld3Byb2plY3QvdHJhZmZpYy9odG1sL0JhbkppYS5odG1sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImltYWdlTmFtZVwiOiBcIuWQjOeoi+aOpemAgeacuiAxMS4xMeWNiuS7t+eWr+aKolwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbWFnZVVybFwiOiBcImh0dHA6Ly9ndW9xaW5nMjAxMy5mcmVlM3YubmV0L21hcmtkb3duL2FfNzAwXzE2XzBfMTQxMTA3MTgxNDE2X2xhcmdlLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdcIjogXCJ2NzUxdjE3ODh2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciByc3BDb2RlID0gZGF0YS5yZXNwb25zZS5oZWFkZXIucnNwQ29kZTtcbiAgICAgICAgICAgICAgICBpZiAocnNwQ29kZSA9PSAnMDAwMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuYWR2cyA9IGRhdGEucmVzcG9uc2UuYm9keS5hZHZlcnRpc21lbnRMaXN0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSAkdGhpcy5hZHZzWzBdLmltYWdlVXJsO1xuICAgICAgICAgICAgICAgICAgICBuZXdJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdHVhbEhlaWdodCA9IE1hdGgucm91bmQocGljQ29udGFpbmVyLm9mZnNldFdpZHRoICogbmV3SW1nLmhlaWdodCAvIG5ld0ltZy53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaWNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYW5pLWJhbm5lcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYmFubmVySGVpZ2h0ID0gcGljQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGFjdHVhbEhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93QmFubmVyKCR0aGlzLmFkdnMpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIG5ld0ltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYmFubmVySGVpZ2h0ID0gcGljQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICdpbmhlcml0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCYW5uZXIoJHRoaXMuYWR2cylcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vdGhlIHJlYWR5IGV2ZW50IG9mIHRoZSBET00gaXMgdHJpZ2dlcmVkIGFmdGVyIEFuZ3VsYXIgbG9hZHMgdGhlIHZpZXdcbiAgICAgICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2xpZGVCYW5uZXIyKCk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICAvL3Jlc29sdmUgdGhlIHByb21pc2Ugd2hlbiBzY29wZSBkZXN0cm95XG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYoYW5ndWxhci5pc09iamVjdChhZHZSZXF1ZXN0KSkge1xuICAgICAgICAgICAgICAgIGFkdlJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9kZWxldGUgJGxvY2F0aW9uLiQkc2VhcmNoLmRlcGFydHVyZUNpdHk7XG4gICAgICAgICAgICAvL2RlbGV0ZSAkbG9jYXRpb24uJCRzZWFyY2guYXJyaXZhbENpdHk7XG4gICAgICAgICAgICAvL+WIoOmZpHVybOeahHBhcmFtc1xuICAgICAgICAgICAgLy8kbG9jYXRpb24uJCRzZWFyY2ggPSB7fTtcbiAgICAgICAgfSk7XG5cblxuXG5cblxuICAgICAgICByZXR1cm4gJHNjb3BlLmhvbWVDdHJsID0gJHRoaXM7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgIH1cbl07XG4iLCJ2YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgW10pO1xuXG5jb250cm9sbGVyc1xuICAgIC5jb250cm9sbGVyKCdtYWluQ3RybCcsIHJlcXVpcmUoJy4vbWFpbkN0cmwnKSlcbiAgICAuY29udHJvbGxlcignaG9tZUN0cmwnLCByZXF1aXJlKCcuL2hvbWVDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ2ludGVncmFsTWFsbEN0cmwnLCByZXF1aXJlKCcuL2ludGVncmFsTWFsbEN0cmwnKSlcbiAgICAuY29udHJvbGxlcignY291cG9uQ3RybCcsIHJlcXVpcmUoJy4vY291cG9uQ3RybCcpKVxuO1xubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyczsiLCIndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBbJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJyR3aW5kb3cnLCAnJHRpbWVvdXQnLCAnJGxvY2FsU3RvcmFnZScsICduYXYnLCAnJG5hdmlnYXRlJyxcbiAgICBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHNjb3BlLCAkd2luZG93LCAkdGltZW91dCwgJGxvY2FsU3RvcmFnZSwgbmF2LCAkbmF2aWdhdGUpIHtcblxuICAgICAgICAvLyDliIfmjaLpobXpnaJcbiAgICAgICAgJHNjb3BlLnNsaWRlUGFnZSA9IGZ1bmN0aW9uIChwYXRoLCBhbmltYXRlLCByZXZlcnNlKSB7XG4gICAgICAgICAgICBuYXYuc2xpZGVQYWdlKHBhdGgsIGFuaW1hdGUsIHJldmVyc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8v5ZCO6YCAXG4gICAgICAgICRzY29wZS5iYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbmF2LmJhY2soKTtcbiAgICAgICAgfTtcblxuXG5cblxuICAgIH1cbl07IiwibW9kdWxlLmV4cG9ydHMgPSBbIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRZID0gMCxcbiAgICAgICAgICAgICAgICAgICAgZW5kWSAgPSAwO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAxKSBzdGFydFkgPSBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDEpIHsgZW5kWSA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO31cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmUgPSBNYXRoLnJvdW5kKGVuZFkgLSBzdGFydFkpOyAgLy/np7vliqjnmoTot53nprtcbiAgICAgICAgICAgICAgICAgICAgaWYobW92ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5hbmltYXRlZEJvdHRvbSA9ICdzaG93LWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5hbmltYXRlZEJvdHRvbSA9ICdoaWRlLWJvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICBlbmRZICA9IDA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnVuYmluZCgndG91Y2hzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnVuYmluZCgndG91Y2htb3ZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudW5iaW5kKCd0b3VjaGVuZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gW1xyXG4gICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyOiBcIj1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5U3BhbiA9IGF0dHJzLmRheVNwYW4sIERBVEUgPSBhdHRycy5kYXRlLCBuZ0NsaWNrID0gYXR0cnMubmdDbGljaywgZWxlID0gZWxlbWVudFswXTtcclxuICAgICAgICAgICAgICAgIGRheVNwYW4gJiYgKGRheVNwYW4gPSBwYXJzZUludChkYXlTcGFuKSk7XHJcbiAgICAgICAgICAgICAgICAoc2NvcGUuY2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoZWxlKSkuc2V0U2VsZWN0ZWQoREFURSk7XHJcbiAgICAgICAgICAgICAgICAvL2luaXQgZGF0ZSBmb3IgYm94IHdyYXBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIENhbGVuZGFyKHdyYXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkID0gZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGUgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGRbZGF0YS12YWx1ZT1cIicgKyBkYXRlICsgJ1wiXScpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGUuaGFzQ2xhc3MoJ2FibGVkJykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmhhc0NsYXNzKCdhYmxlZCcpICYmIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZC5zZWxlY3RlZCcpKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKSAmJiBlbGUuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKHdyYXAuZGF0YXNldC5kYXRlTGFiZWwgPSBkYXRlKSAmJiAod3JhcC5kYXRhc2V0LmRhdGVMYWJlbCA9IChlbGUuaGFzQ2xhc3MoJ2RheS1sYWJlbCcpID8gZWxlLmNoaWxkcmVuKClbMF0uaW5uZXJIVE1MIDogZmFsc2UpIHx8ICgn5ZGoJyArIGRheUluV2Vla1tuZXcgRGF0ZShkYXRlKS5nZXREYXkoKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksIHRvZGF5ID0gW25vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSArIDEsIG5vdy5nZXREYXRlKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyVG1wID0gJzxkaXYgIGRhdGEteWVhci1tb250aCA9IFwie3t5ZWFyfX0te3ttb250aH19XCIgY2xhc3M9XCJ0ZXh0LWNlbnRlciBjb2xvci1ibGFja1wiPjxwIGNsYXNzPVwiZW0xZDJcIj57e3llYXJ9feW5tHt7c2hvd01vbnRofX3mnIg8L3A+PHRhYmxlPjx0aGVhZD48dHI+e3t0aXRsZUFycn19PC90cj48L3RoZWFkPjx0Ym9keT57e2RhdGFBcnJ9fTwvdGJvZHk+PC90YWJsZT4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRheUluV2VlayA9IFtcIuaXpVwiLCBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWxsTW9udGhEYXRhSHRtbCh0b2RheVswXSwgdG9kYXlbMV0gLSAxKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN5pyI5Lu95omA5Zyo5aSp5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNUb2RheSh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVBdHRyID0gdmFsdWUuc3BsaXQoJy0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvZGF5WzBdID09IHZhbHVlQXR0clswXSAmJiB0b2RheVsxXSA9PSB2YWx1ZUF0dHJbMV0gJiYgdG9kYXlbMl0gPT0gdmFsdWVBdHRyWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WIneWni+WMluaXpeWOhuaOp+S7tuihqOagvCAgQEBtb250aCAgQEB5ZWFyICBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpbGxNb250aERhdGFIdG1sKHllYXIsIG1vbnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgpLCBcdFx0XHQvL+aciOS7veesrOS4gOWkqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERhdGVEYXkgPSBmaXJzdERhdGUuZ2V0RGF5KCksXHQgIFx0XHQvL+i1t+Wni+ekvOaLnCAwLTZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhEYXlzID0gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpLFx0Ly/mnIjku73lpKnmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy95ZWFyTW9udGhWYWx1ZSA9IHllYXIgKyAnLScgKyAobW9udGggKyAxKSArICctJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhck1vbnRoVmFsdWUgPSB5ZWFyICsgJy0nICsgKChtb250aCArIDEpIDwgMTAgPyAnMCcgKyAobW9udGggKyAxKSA6IChtb250aCArIDEpKSArICctJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1ZhbHVlID0gJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RBYWJsZURheSA9IHRvZGF5WzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/kuIvkuKrmnIhcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vbnRoID49IHRvZGF5WzFdIHx8IHllYXIgPiB0b2RheVswXSkgJiYgKGZpcnN0QWFibGVEYXkgPSAxKSAmJiAoZGlzYWJsZWQgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aGr5YWF5pWw5o2u5qC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhSHRtbCA9IFwiXCIsIGl0ZW1Db3VudCA9IE1hdGguY2VpbCgoZmlyc3REYXRlRGF5ICsgbW9udGhEYXlzKSAvIDcpICogNywgdG9kYXlJID0gLTEsIG5leHRNb250aENvdW50ID0gZGF5U3BhbiwgY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbUNvdW50OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNSb3dDZWxsMCA9IChpICUgNiA9PSAwKSwgLy/ooYzotbflp4tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3dDZWxsNiA9IChpICUgNyA9PSA2KTsgLy/ooYznu5PmnZ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSAlIDcgPT0gMCkgJiYgKGRhdGFIdG1sICs9ICc8dHI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgZmlyc3REYXRlRGF5IHx8IGkgPj0gKG1vbnRoRGF5cyArIGZpcnN0RGF0ZURheSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSHRtbCArPSAnPHRkPjwvdGQ+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YWx1ZSA9IHllYXJNb250aFZhbHVlICsgKGkgLSBmaXJzdERhdGVEYXkgKyAxKSwgc2hvd1ZhbHVlID0gaSAtIGZpcnN0RGF0ZURheSArIDEsIGNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0geWVhck1vbnRoVmFsdWUgKyAoKGkgLSBmaXJzdERhdGVEYXkgKyAxKSA8IDEwID8gJzAnICsgKGkgLSBmaXJzdERhdGVEYXkgKyAxKSA6IChpIC0gZmlyc3REYXRlRGF5ICsgMSkpLCBzaG93VmFsdWUgPSBpIC0gZmlyc3REYXRlRGF5ICsgMSwgY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/lvZPmnIhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChtb250aCArIDEpID09IHRvZGF5WzFdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaYr+S7iuWkqe+8jCDmmL7npLrku4rlpKnvvIwg5LiN56aB5q2iXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCAmJiB0b2RheUkgPT0gLTEgJiYgaXNUb2RheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5SSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VmFsdWUgPSAn5LuK5aSpJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAndG9kYXkgZGF5LWxhYmVsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv5piO5ZCO5aSpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2RheUkgJiYgaSA8PSAodG9kYXlJICsgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPT0gKHRvZGF5SSArIDEpICYmIChzaG93VmFsdWUgPSAn5piO5aSpJykgJiYgKGNsYXNzTmFtZSA9ICd0b21vcnJvdyBkYXktbGFiZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPT0gKHRvZGF5SSArIDIpICYmIChzaG93VmFsdWUgPSAn5ZCO5aSpJykgJiYgKGNsYXNzTmFtZSA9ICdkYXktYWZ0ZXItdG9tb3Jyb3cgZGF5LWxhYmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlrZjlnKjmnInmlYjlpKnmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5U3BhbiAmJiAhZGlzYWJsZWQgJiYgKGkgLSB0b2RheUkpID49IGRheVNwYW4gJiYgKGRpc2FibGVkID0gdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaYr+S4i+aciFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoLS1uZXh0TW9udGhDb3VudCA8IDApICYmIChkaXNhYmxlZCA9IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9IGRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnIGFibGVkJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PSBEQVRFICYmICFkaXNhYmxlZCAmJiAoY2xhc3NOYW1lICs9ICcgc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUh0bWwgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCc8dGQgZGF0YS12YWx1ZSA9XCJ7e2RhdGEtZGF0ZX19XCIgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiPjxzcGFuIGNsYXNzID0gXCJib3hcIj57e2RhdGV9fTwvc3Bhbj48L3RkPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3tkYXRhLWRhdGV9fS8sIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7ZGF0ZX19Lywgc2hvd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpICUgNyA9PSA2KSAmJiAoZGF0YUh0bWwgKz0gJzwvdHI+JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXAuaW5uZXJIVE1MICs9IGNhbGVuZGFyVG1wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7eWVhcn19L2csIHllYXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3ttb250aH19L2csIG1vbnRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7c2hvd01vbnRofX0vZywgbW9udGggKyAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7dGl0bGVBcnJ9fS9nLCBkYXlJbldlZWsubWFwKGZ1bmN0aW9uIChkYXkpIHsgcmV0dXJuICc8dGg+JyArIGRheSArICc8L3RoPic7IH0pLmpvaW4oJycpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7ZGF0YUFycn19L2csIGRhdGFIdG1sKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5a2Y5Zyo5Zyo5pyJ5pWI5aSp5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXlTcGFuICYmIChmaXJzdEFhYmxlRGF5ICsgZGF5U3BhbiAtIDEpID4gbW9udGhEYXlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlTcGFuIC09IChtb250aERheXMgLSBmaXJzdEFhYmxlRGF5ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsTW9udGhEYXRhSHRtbCh5ZWFyLCBtb250aCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WIneWni+WMluaXpeWOhuaOp+S7tuihqOagvCAgQEBtb250aCAgQEB5ZWFyICBlbmRcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbl07IiwidmFyIGRpcmVjdGl2ZXMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG5cblxuZGlyZWN0aXZlc1xuICAgIC5kaXJlY3RpdmUoJ2RhdGVUYWJsZScsIHJlcXVpcmUoJy4vZGF0ZVRhYmxlJykpXG4gICAgLmRpcmVjdGl2ZSgnaW5wdXRDbGVhcicsIHJlcXVpcmUoJy4vaW5wdXRDbGVhcicpKVxuICAgIC5kaXJlY3RpdmUoJ3VpTG9hZGluZycsIHJlcXVpcmUoJy4vdWlMb2FkaW5nJykpXG4gICAgLmRpcmVjdGl2ZSgndWlNb2RhbCcsIHJlcXVpcmUoJy4vdWlNb2RhbCcpKVxuICAgIC5kaXJlY3RpdmUoJ2luZmluaXRlU2Nyb2xsJywgcmVxdWlyZSgnLi9pbmZpbml0ZVNjcm9sbCcpKVxuICAgIC5kaXJlY3RpdmUoJ2FuaW1hdGVkQm90dG9tJywgcmVxdWlyZSgnLi9hbmltYXRlZEJvdHRvbScpKVxuICAgIC5kaXJlY3RpdmUoJ21ha2VDYWxsJywgcmVxdWlyZSgnLi9tYWtlQ2FsbCcpKVxuICAgIC5kaXJlY3RpdmUoJ3RpbWVsZWZ0JywgcmVxdWlyZSgnLi90aW1lbGVmdCcpKSAgICAgICAgICAgICAgICAgICAgLy/liankvZnml7bpl7TlgJLorqHml7ZcblxubW9kdWxlLmV4cG9ydHMgPSBkaXJlY3RpdmVzOyIsIm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQoYXR0cnMudGhyZXNob2xkKSB8fCAwO1xuICAgICAgICAgICAgICAgIHZhciBlID0gZWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLiRldmFsKGF0dHJzLmNhbkxvYWQpICYmIGUuc2Nyb2xsVG9wICsgZS5vZmZzZXRIZWlnaHQgPj0gZS5zY3JvbGxIZWlnaHQgLSBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShhdHRycy5pbmZpbml0ZVNjcm9sbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gWyAnJHRpbWVvdXQnLFxuICAgIGZ1bmN0aW9uKCR0aW1lb3V0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwic2VhcmNoYmFyXCI+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1uZy1kaXNhYmxlZD1cImRpc2FibGVkSW5wdXRcIiB0eXBlPVwie3tpbnB1dC50eXBlfX1cIiBjbGFzcz1cImxvbmctaW5wdXRcIiBwbGFjZWhvbGRlcj1cInt7aW5wdXQucGxhY2Vob2xkZXJ9fVwiIGRhdGEtbmctbW9kZWw9XCJzZWFyY2hcIiBtYXhsZW5ndGg9XCJ7e2lucHV0Lm1heGxlbmd0aH19XCIgLz5cXG5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGNsYXNzPVwic2VhcmNoYmFyLWNsZWFyXCIgZGF0YS1uZy1jbGljaz1cImNsZWFyKClcIj48L2E+XFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IFwiPVwiLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogXCI9XCIsXG4gICAgICAgICAgICAgICAgY2xlYXIgOlwiJlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5kaXNhYmxlZElucHV0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuZGlzYWJsZWRJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDcwMCk7XG4gICAgICAgICAgICAgICAgdmFyICRzZWFyY2hiYXJDbGVhciA9IGVsZW1lbnQuZmluZCgnYScpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnc2VhcmNoJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiggbmV3VmFsdWUgPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmKCghb2xkVmFsdWUgICYmIG5ld1ZhbHVlLmxlbmd0aD4wKSB8fCAobmV3VmFsdWUubGVuZ3RoID09IG9sZFZhbHVlLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWFyY2hiYXJDbGVhci5hZGRDbGFzcygnc2VhcmNoYmFyLW5vdC1lbXB0eScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNlYXJjaGJhckNsZWFyLnJlbW92ZUNsYXNzKCdzZWFyY2hiYXItbm90LWVtcHR5Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSBwYXJzZUludChhdHRycy5tYWtlQ2FsbC5yZXBsYWNlKCctJywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHBob25lTnVtYmVyID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVQbHVnaW4ubWFrZUNhbGwoXCJtYWtlQ2FsbEZvckNhbGxUZWxcIiwgcGhvbmVOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBbICckdGltZW91dCcsICdjaGVja1RpbWUnLFxuICAgIGZ1bmN0aW9uKCR0aW1lb3V0LCBjaGVja1RpbWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwiY29sb3ItZ29sZGVuLXllbGxvd1wiPnt7dGltZWxlZnQubWludXRlfX08L3NwYW4+5YiGPHNwYW4gY2xhc3M9XCJjb2xvci1nb2xkZW4teWVsbG93XCI+e3t0aW1lbGVmdC5zZWNvbmR9fTwvc3Bhbj7np5InLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtaWxsaXNlY29uZDogXCI9XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0SWQsIG1pbnV0ZSwgc2Vjb25kLCBuZXdMZWZ0TWlsbGlzZWNvbmQ7XG4gICAgICAgICAgICAgICAgdmFyIG1pbGxpc2Vjb25kID0gcGFyc2VJbnQoc2NvcGUubWlsbGlzZWNvbmQpO1xuICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kID0gKG1pbGxpc2Vjb25kIDwgMCA/IDAgOiBtaWxsaXNlY29uZCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlTGF0ZXIobGVmdE1pbGxpc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KGxlZnRNaWxsaXNlY29uZCAvIDEwMDAgLyA2MCAlIDYwLCAxMCk7IC8v6K6h566X5Ymp5L2Z55qE5YiG6ZKf5pWwXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZCA9IHBhcnNlSW50KGxlZnRNaWxsaXNlY29uZCAvIDEwMDAgJSA2MCwgMTApOy8v6K6h566X5Ymp5L2Z55qE56eS5pWwXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnRpbWVsZWZ0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlOiBjaGVja1RpbWUobWludXRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZDogY2hlY2tUaW1lKHNlY29uZClcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYobGVmdE1pbGxpc2Vjb25kIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWlsbGlzZWNvbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhlIHRpbWVvdXRJZCBmb3IgY2FuY2VsaW5nXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXRJZCA9ICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TGVmdE1pbGxpc2Vjb25kID0gbGVmdE1pbGxpc2Vjb25kIC0gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUxhdGVyKG5ld0xlZnRNaWxsaXNlY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgnJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVMYXRlcihtaWxsaXNlY29uZCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbl07XG5cbi8qXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyR0aW1lb3V0JywgJ2NoZWNrVGltZScsXG4gICAgZnVuY3Rpb24oJHRpbWVvdXQsIGNoZWNrVGltZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJjb2xvci1nb2xkZW4teWVsbG93XCI+e3t0aW1lbGVmdC5kYXl9fTwvc3Bhbj7lpKk8c3BhbiBjbGFzcz1cImNvbG9yLWdvbGRlbi15ZWxsb3dcIj57e3RpbWVsZWZ0LmhvdXJ9fTwvc3Bhbj7ml7Y8c3BhbiBjbGFzcz1cImNvbG9yLWdvbGRlbi15ZWxsb3dcIj57e3RpbWVsZWZ0Lm1pbnV0ZX19PC9zcGFuPuWIhjxzcGFuIGNsYXNzPVwiY29sb3ItZ29sZGVuLXllbGxvd1wiPnt7dGltZWxlZnQuc2Vjb25kfX08L3NwYW4+56eSJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbWlsbGlzZWNvbmQ6IFwiPVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dElkLCBtaW51dGUsIHNlY29uZCwgbmV3TGVmdE1pbGxpc2Vjb25kO1xuICAgICAgICAgICAgICAgIHZhciBtaWxsaXNlY29uZCA9IHBhcnNlSW50KHNjb3BlLm1pbGxpc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBtaWxsaXNlY29uZCA9IChtaWxsaXNlY29uZCA8IDAgPyAwIDogbWlsbGlzZWNvbmQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRheSwgaG91cjtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUxhdGVyKGxlZnRNaWxsaXNlY29uZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGRheSA9IHBhcnNlSW50KGxlZnRNaWxsaXNlY29uZCAvIDEwMDAgLyA2MCAvIDYwIC8gMjQsIDEwKTsvL+iuoeeul+WJqeS9meeahOWkqeaVsFxuICAgICAgICAgICAgICAgICAgICBob3VyID0gcGFyc2VJbnQobGVmdE1pbGxpc2Vjb25kIC8gMTAwMCAvIDYwIC8gNjAgJSAyNCwgMTApOy8v6K6h566X5Ymp5L2Z55qE5bCP5pe25pWwXG5cblxuICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChsZWZ0TWlsbGlzZWNvbmQgLyAxMDAwIC8gNjAgJSA2MCwgMTApOyAvL+iuoeeul+WJqeS9meeahOWIhumSn+aVsFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBwYXJzZUludChsZWZ0TWlsbGlzZWNvbmQgLyAxMDAwICUgNjAsIDEwKTsvL+iuoeeul+WJqeS9meeahOenkuaVsFxuICAgICAgICAgICAgICAgICAgICBzY29wZS50aW1lbGVmdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZTogY2hlY2tUaW1lKG1pbnV0ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmQ6IGNoZWNrVGltZShzZWNvbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiBkYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VyOiBob3VyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmKGxlZnRNaWxsaXNlY29uZCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwodGltZW91dElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1pbGxpc2Vjb25kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIHRoZSB0aW1lb3V0SWQgZm9yIGNhbmNlbGluZ1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0xlZnRNaWxsaXNlY29uZCA9IGxlZnRNaWxsaXNlY29uZCAtIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMYXRlcihuZXdMZWZ0TWlsbGlzZWNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlTGF0ZXIobWlsbGlzZWNvbmQpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5dO1xuICovXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsXG4gICAgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbG9hZGluZy5odG1sJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZ1RleHQ6IFwiPVwiLFxuICAgICAgICAgICAgICAgIHNob3dMb2FkaW5nOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNsb3NlTG9hZGluZyA9ICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RhbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiIGRhdGEtbmctY2xhc3M9XCJ7XFwnbW9kYWwtaW5cXCc6IG1vZGFsLnNob3dNb2RhbH1cIj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWlubmVyXCI+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtdGl0bGVcIj57e21vZGFsLnRpdGxlfX08L2Rpdj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC10ZXh0XCI+e3ttb2RhbC50ZXh0fX08L2Rpdj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1saW5lXCI+PC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1idXR0b25zXCI+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vZGFsLWJ1dHRvblwiIGRhdGEtbmctc2hvdz1cIm1vZGFsLmNhbmNsZUJ0blwiPnt7bW9kYWwuY2FuY2xlQnRufX08L3NwYW4+IFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vZGFsLWJ1dHRvbiBtb2RhbC1idXR0b24tYm9sZFwiIGRhdGEtbmctY2xpY2s9XCJtb2RhbC5jb25maXJtKClcIj57e21vZGFsLmNvbmZpcm1CdG59fTwvc3Bhbj4gXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgPC9kaXY+IFxcblxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLW92ZXJsYXlcIiBkYXRhLW5nLWNsYXNzPVwie1xcJ21vZGFsLW92ZXJsYXktdmlzaWJsZVxcJzogbW9kYWwuc2hvd01vZGFsfVwiPjwvZGl2PicsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kYWxCdXR0b24gPSBlbGVtZW50LmZpbmQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBtb2RhbEJ1dHRvbi5iaW5kKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1vZGFsLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbl07XG4iLCIvKipcclxuICog5rG96L2m56Wo5pel5pyf6KGo5qC855qE5pel5pyf6IyD5Zu0XHJcbiAqICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWydkYXRlUmFuZ2UnLCAnY2hlY2tUaW1lJywgZnVuY3Rpb24gKGRhdGVSYW5nZSwgY2hlY2tUaW1lKSB7XHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGVTdHIsIGFjdGlvbikge1xyXG4vLyAgICAgICAgZGF0ZSA9ICcyMDE0LTEwLTAyJztcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHIucmVwbGFjZSgvLS9nLCAnLycpKTtcclxuICAgICAgICB2YXIgbnVtID0gMTtcclxuICAgICAgICBpZihhY3Rpb24gPT0gJ21pbnVzJykge1xyXG4gICAgICAgICAgICBudW0gPSAtMTtcclxuICAgICAgICB9IGVsc2UgaWYoYWN0aW9uID09ICdwbHVzJykge1xyXG4gICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmluYWxseURhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkgKyBudW0pO1xyXG4gICAgICAgIHZhciBmaW5hbGx5RGF0ZVN0ciA9IGZpbmFsbHlEYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyBjaGVja1RpbWUoZmluYWxseURhdGUuZ2V0TW9udGgoKSArIDEpICsgJy0nICsgY2hlY2tUaW1lKGZpbmFsbHlEYXRlLmdldERhdGUoKSk7XHJcbiAgICAgICAgaWYoZmluYWxseURhdGUuZ2V0VGltZSgpID49IGRhdGVSYW5nZS5zdGFydERhdGVVbml4ICYmIGZpbmFsbHlEYXRlLmdldFRpbWUoKSA8PSBkYXRlUmFuZ2UuZW5kRGF0ZVVuaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbmFsbHlEYXRlU3RyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlU3RyO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dOyIsIi8qKlxuICog5Yig6Zmk56m65qC8XG4gKiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFsgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmKHR5cGVvZihzdHIpID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoJyAnLCAnJyk7XG4gICAgICAgIH1cbiAgICB9O1xufV07IiwidmFyIGZpbHRlcnMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG5cblxuZmlsdGVyc1xuICAgIC5maWx0ZXIoJ3RvVGltZURpdmlzaW9uJywgcmVxdWlyZSgnLi90b1RpbWVEaXZpc2lvbicpKSAgLy/lsIYgMjAxNC0wOC0yOCAxNzowMDowMCDovazmjaLkuLogMTc6MDBcbiAgICAuZmlsdGVyKCdjaGFuZ2VEYXRlJywgcmVxdWlyZSgnLi9jaGFuZ2VEYXRlJykpICAvL+aXpeacn+WKoDHmiJblh48xXG4gICAgLmZpbHRlcigndG9XZWVrJywgcmVxdWlyZSgnLi90b1dlZWsnKSkgIC8v6YCa6L+H5pel5pyf6I635b6X5pif5pyfXG4gICAgLmZpbHRlcignZGVsZXRlQmxhbmsnLCByZXF1aXJlKCcuL2RlbGV0ZUJsYW5rJykpICAvL+WIoOmZpOepuuagvFxuICAgIC5maWx0ZXIoJ211bHRpRmlsdGVyJywgcmVxdWlyZSgnLi9tdWx0aUZpbHRlcicpKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyczsiLCIvKipcbiAqICDlpJrmnaHku7bmn6Xor6LliJfovabovabmrKFcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRvdGFsQXJyYXksIGZpbHRlck9iaiwgZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGFuZ3VsYXIuaXNGdW5jdGlvbihmaWx0ZXJGdW5jdGlvbikgJiYgYW5ndWxhci5pc09iamVjdChmaWx0ZXJPYmopPyhcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godG90YWxBcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYXR0ciBpbiBmaWx0ZXJPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNbYXR0cl0gPSBpdGVtW2F0dHJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckZ1bmN0aW9uKHMsIGZpbHRlck9iaikgJiYgb3V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk6IChvdXQgPSB0b3RhbEFycmF5KTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbn1dIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIGlmKHRpbWUgJiYgdGltZS5sZW5ndGggPiAwKSB7XG4vLyAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodGltZS5yZXBsYWNlKC8tL2csICcvJykpO1xuICAgICAgICAgICAgdmFyIHRpbWVBcnIgPSB0aW1lLnNwbGl0KCc6JylcbiAgICAgICAgICAgIHJldHVybiB0aW1lQXJyWzFdICsgXCI6XCIgKyB0aW1lQXJyWzJdO1xuICAgICAgICB9XG4gICAgfTtcbn1dOyIsIi8qKlxuICog6YCa6L+H5pel5pyf6I635Y+W5pif5pyfXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3ZWVrU3RyLCBkYXRlU3RyKSB7XG4gICAgICAgIGlmKCFkYXRlU3RyKSByZXR1cm47XG4gICAgICAgIHZhciBkZCA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBzZWxlY3RlZERkID0gbmV3IERhdGUoZGF0ZVN0ci5yZXBsYWNlKC8tL2csICcvJykpO1xuICAgICAgICB2YXIgZ2V0RGF0ZURpZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZShkZC5nZXRGdWxsWWVhcigpLCBkZC5nZXRNb250aCgpLCBkZC5nZXREYXRlKCkpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF5ID0gbmV3IERhdGUoc2VsZWN0ZWREZC5nZXRGdWxsWWVhcigpLCBzZWxlY3RlZERkLmdldE1vbnRoKCksIHNlbGVjdGVkRGQuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgIHZhciBudW0gPSAoc2VsZWN0ZWREYXkgLSB0b2RheSkvODY0MDAwMDA7XG4gICAgICAgICAgICBzd2l0Y2ggKG51bSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfku4rlpKknO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfmmI7lpKknO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICflkI7lpKknO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvL+i9rOaNouS4uuaYn+acn1xuICAgICAgICB2YXIgY29udmVydERheSA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgICAgIHZhciB3ZWVrTGlzdCA9IFtcIuWRqOaXpVwiLCBcIuWRqOS4gFwiLCBcIuWRqOS6jFwiLCBcIuWRqOS4iVwiLCBcIuWRqOWbm1wiLCBcIuWRqOS6lFwiLCBcIuWRqOWFrVwiXTtcbiAgICAgICAgICAgIHJldHVybiB3ZWVrTGlzdFtudW1dIHx8IFwiXCI7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB3ZWVrID0gKGdldERhdGVEaWZmKCkgfHwgY29udmVydERheShzZWxlY3RlZERkLmdldERheSgpKSk7XG4gICAgICAgIHJldHVybiB3ZWVrO1xuICAgIH07XG59XTsiLCIvKlxuICogYW5ndWxhci1tb2JpbGUtbmF2IGJ5IEFuZHkgSm9zbGluICYmIHJlZ291XG4gKiBodHRwczovL2dpdGh1Yi5jb20vcmVnb3UvYW5ndWxhci1tb2JpbGUtbmF2XG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZSBodHRwOi8vZ29vLmdsL1o4TmxvXG4gKlxuICogYWRkIG5hdmlnYXRlaW5nIGxpc3Qgcm91dGUtaW5mbyBzdXBwb3J0IGJ5IHJlZ291XG4gKiBBZGp1c3QgYmFjayBBY3Rpb24gc3RyYXRlZ3kgYnkgcmVnb3VcbiAqL1xuXG5cbnZhciBtb2JpbGVOYXZNb2QgPSBhbmd1bGFyLm1vZHVsZSgnYWpvc2xpbi5tb2JpbGUtbmF2aWdhdGUnLCBbXG4vLyAgICByZXF1aXJlKCcuLi9ub2RlX21vZHVsZXMvYW5ndWxhci1ic2Z5L2FuaW1hdGUnKS5uYW1lLFxuLy8gICAgcmVxdWlyZSgnLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItYnNmeS9yb3V0ZScpLm5hbWVcbiAgICBdKTtcbi8vICAgIC5ydW4oWyckbmF2aWdhdGUnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCRuYXZpZ2F0ZSwgJHJvb3RTY29wZSkge1xuLy8gICAgICAgIC8vQW5kcm9pZCBiYWNrIGJ1dHRvbiBmdW5jdGlvbmFsaXR5IGZvciBwaG9uZWdhcFxuLy8gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VyZWFkeVwiLCBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJhY2tidXR0b25cIiwgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgYmFja1N1Y2Nlc3MgPSAkbmF2aWdhdGUuYmFjaygpO1xuLy8gICAgICAgICAgICAgICAgICAgIGlmICghYmFja1N1Y2Nlc3MpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLmFwcC5leGl0QXBwKCk7XG4vLyAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgIH0pO1xuLy8gICAgICAgIH0pO1xuLy8gICAgfV0pO1xuICAgIC8qXG4gICAgICogJGNoYW5nZVxuICAgICAqIFNlcnZpY2UgdG8gdHJhbnNpdGlvbiBiZXR3ZWVuIHR3byBlbGVtZW50c1xuICAgICAqL1xuLy9hbmd1bGFyLm1vZHVsZSgnYWpvc2xpbi5tb2JpbGUtbmF2aWdhdGUnKVxuXG4gICAgbW9iaWxlTmF2TW9kLnByb3ZpZGVyKCckY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uUHJlc2V0cyA9IHsgIC8vW25leHRDbGFzcywgcHJldkNsYXNzXVxuICAgICAgICAgICAgLy9Nb2RhbDogbmV3IHBhZ2UgcG9wcyB1cCwgb2xkIHBhZ2Ugc2l0cyB0aGVyZSB1bnRpbCBuZXcgcGFnZSBpcyBvdmVyIGl0XG4gICAgICAgICAgICAnaW9uaWNzbGlkZSc6IFsnaW9uaWNzbGlkZScsICdpb25pY3NsaWRlLXByZXYnXSxcbiAgICAgICAgICAgICdtb2RhbCc6IFsnbW9kYWwnLCAnJ10sXG4gICAgICAgICAgICAnbm9uZSc6IFsnJywgJyddXG4gICAgICAgIH07XG4gICAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICdwcmVmaXgnOiAnbWItJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgSU5fQ0xBU1MgPSBcImluXCI7XG4gICAgICAgIHZhciBPVVRfQ0xBU1MgPSBcIm91dFwiO1xuICAgICAgICB2YXIgUkVWRVJTRV9DTEFTUyA9IFwicmV2ZXJzZVwiO1xuICAgICAgICB2YXIgRE9ORV9DTEFTUyA9IFwiZG9uZVwiO1xuICAgICAgICB2YXIgQU5JTUFUSU9OX0VORCA9IFwid2Via2l0QW5pbWF0aW9uTmFtZVwiIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA/IFwid2Via2l0QW5pbWF0aW9uRW5kXCIgOiBcImFuaW1hdGlvbmVuZFwiO1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvblByZXNldCA9IGZ1bmN0aW9uKHRyYW5zaXRpb25OYW1lLCBpbkNsYXNzLCBvdXRDbGFzcykge1xuICAgICAgICAgICAgaW5DbGFzcyA9IGluQ2xhc3MgfHwgJyc7XG4gICAgICAgICAgICBvdXRDbGFzcyA9IG91dENsYXNzIHx8IGluQ2xhc3M7IC8vRGVmYXVsdCB0byBvdXRDbGFzcyBzYW1lIGFzIGluQ2xhc3NcbiAgICAgICAgICAgIHRyYW5zaXRpb25QcmVzZXRzW3RyYW5zaXRpb25OYW1lXSA9IFtpbkNsYXNzLCBvdXRDbGFzc107XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zID0gYW5ndWxhci5leHRlbmQoZGVmYXVsdE9wdGlvbnMsIG9wdHMgfHwge30pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGdldCA9IFsnJHEnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCRxLCAkcm9vdFNjb3BlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBjaGFuZ2UobmV4dCwgcHJldiwgdHJhbnNUeXBlLCByZXZlcnNlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMgfHwge30sIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXh0VHJhbnNDbGFzcywgcHJldlRyYW5zQ2xhc3M7XG5cbiAgICAgICAgICAgICAgICAvL2J1aWxkQ2xhc3NTdHJpbmdcbiAgICAgICAgICAgICAgICAvL1RyYW5zZm9ybXMgYXJyYXkgb2YgY2xhc3NlcyBpbnRvIHByZWZpeGVkIGNsYXNzIHN0cmluZ1xuICAgICAgICAgICAgICAgIC8vKGJldHRlciBmb3IgcGVyZm9ybWFuY2UgdGhhbiBtdWx0aXBsZSAuYWRkQ2xhc3MoKVxuICAgICAgICAgICAgICAgIC8vQHBhcmFtIGNsYXNzZXM6IEFycmF5e3N0cmluZ31cbiAgICAgICAgICAgICAgICAvL0ByZXR1cm4gc3RyaW5nIGNsYXNzTmFtZXNcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBidWlsZENsYXNzU3RyaW5nKGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXMucmVkdWNlKGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCBjbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvciArIChjbHMgPyAoJyAnICsgb3B0aW9ucy5wcmVmaXggKyBjbHMpIDogJycpO1xuICAgICAgICAgICAgICAgICAgICB9LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9Db252ZXJ0IGEgcHJlc2V0IChlZyAnbW9kYWwnKSB0byBpdHMgYXJyYXkgb2YgcHJlc2V0IGNsYXNzZXMgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgLy9lbHNlLCBqdXN0IGNvbnZlcnQgZWcgJ3NsaWRlJyB0byBbJ3NsaWRlJywgJ3NsaWRlJ10sIHNvIGJvdGggZWxlbWVudHMgZ2V0IGl0XG4gICAgICAgICAgICAgICAgLy9UaGUgYXJyYXkgbGF5b3V0IGlzIFtuZXh0aW5hdGlvbkNsYXNzLCBwcmV2Q2xhc3NdXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uUHJlc2V0c1t0cmFuc1R5cGVdID9cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblByZXNldHNbdHJhbnNUeXBlXSA6XG4gICAgICAgICAgICAgICAgICAgIFt0cmFuc1R5cGUsICcnXTtcblxuICAgICAgICAgICAgICAgIC8vSGFjayBmb3Igd2hpdGUgZmxhc2g6IHotaW5kZXggc3RvcHMgZmxhc2gsIG9mZnNldFdpZHRoIHRoaW5nIGZvcmNlcyB6LWluZGV4IHRvIGFwcGx5XG4gICAgICAgICAgICAgICAgbmV4dC5jc3MoJ3otaW5kZXgnLCctMTAwJyk7XG4gICAgICAgICAgICAgICAgbmV4dFswXS5vZmZzZXRXaWR0aCArPSAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5leHRDbGFzc2VzID0gYnVpbGRDbGFzc1N0cmluZyhbXG4gICAgICAgICAgICAgICAgICAgIHJldmVyc2UgPyBPVVRfQ0xBU1MgOiBJTl9DTEFTUyxcbiAgICAgICAgICAgICAgICAgICAgKG5leHRUcmFuc0NsYXNzID0gdHJhbnNpdGlvbltyZXZlcnNlID8gMSA6IDBdKSxcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZSAmJiBSRVZFUlNFX0NMQVNTIHx8ICcnXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgbmV4dC5hZGRDbGFzcyhuZXh0Q2xhc3Nlcyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJldkNsYXNzZXM7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkNsYXNzZXMgPSBidWlsZENsYXNzU3RyaW5nKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmVyc2UgPyBJTl9DTEFTUyA6IE9VVF9DTEFTUyxcbiAgICAgICAgICAgICAgICAgICAgICAgIChwcmV2VHJhbnNDbGFzcyA9IHRyYW5zaXRpb25bcmV2ZXJzZSA/IDAgOiAxXSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlICYmIFJFVkVSU0VfQ0xBU1MgfHwgJydcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIHByZXYuYWRkQ2xhc3MocHJldkNsYXNzZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG5leHRDbGFzc2VzLCAnICAgICAgICAgICAgICAgJyArIHByZXZDbGFzc2VzKVxuXG4gICAgICAgICAgICAgICAgbmV4dC5jc3MoJ3otaW5kZXgnLCAnJyk7XG4gICAgICAgICAgICAgICAgbmV4dFswXS5vZmZzZXRXaWR0aCArPSAwO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vRmluZCB3aGljaCBlbGVtZW50IChzb21ldGltZXMgbm9uZSkgdG8gYmluZCBmb3IgZW5kaW5nXG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kRWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFRyYW5zQ2xhc3MgJiYgbmV4dFRyYW5zQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIChib3VuZEVsZW1lbnQgPSBuZXh0KS5iaW5kKEFOSU1BVElPTl9FTkQsIGRvbmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldiAmJiBwcmV2VHJhbnNDbGFzcyAmJiBwcmV2VHJhbnNDbGFzcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgKGJvdW5kRWxlbWVudCA9IHByZXYpLmJpbmQoQU5JTUFUSU9OX0VORCwgZG9uZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYm91bmRFbGVtZW50ICYmIGJvdW5kRWxlbWVudC51bmJpbmQoQU5JTUFUSU9OX0VORCwgZG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIG5leHQucmVtb3ZlQ2xhc3MobmV4dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2ICYmIHByZXYucmVtb3ZlQ2xhc3MocHJldkNsYXNzZXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy9MZXQgdGhlIHVzZXIgb2YgY2hhbmdlICdjYW5jZWwnIHRvIGZpbmlzaCB0cmFuc2l0aW9uIGVhcmx5IGlmIHRoZXkgd2lzaFxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfV07XG4gICAgfSlcbi8vYW5ndWxhci5tb2R1bGUoJ2Fqb3NsaW4ubW9iaWxlLW5hdmlnYXRlJylcblxuICAgIC5wcm92aWRlcignJG5hdmlnYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGdldCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnJHJvdXRlJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbmF2ID0ge30sXG4gICAgICAgICAgICAgICAgbmF2SGlzdG9yeSA9IFtdOyAvL3dlIGtlZXAgb3VyIG93biB2ZXJzaW9uIG9mIGhpc3RvcnkgYW5kIGlnbm9yZSB3aW5kb3cuaGlzdG9yeVxuICAgICAgICAgICAgdmFyIHBhZ2VUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIFBhZ2UocGF0aCwgdHJhbnNpdGlvbiwgaXNSZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9wYXRoID0gcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgX3RyYW5zaXRpb24gPSB0cmFuc2l0aW9uIHx8ICdzbGlkZScsXG4gICAgICAgICAgICAgICAgICAgIF9pc1JldmVyc2UgPSBpc1JldmVyc2UsXG4gICAgICAgICAgICAgICAgICAgIF9vbmNlVHJhbnNpdGlvbjtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfb25jZVRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zID0gX29uY2VUcmFuc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgX29uY2VUcmFuc2l0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zID0gX3RyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoID0gZnVuY3Rpb24oKSB7IHJldHVybiBfcGF0aDsgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2UgPSBmdW5jdGlvbigpIHsgcmV0dXJuIF9pc1JldmVyc2U7IH07XG5cbiAgICAgICAgICAgICAgICAvL0ZvciBzZXR0aW5nIGEgdHJhbnNpdGlvbiBvbiBhIHBhZ2UgLSBidXQgb25seSBvbmUgdGltZVxuICAgICAgICAgICAgICAgIC8vRWcgc2F5IG9uIHN0YXJ0dXAsIHdlIHdhbnQgdG8gdHJhbnNpdGlvbiBpbiB3aXRoICdub25lJyxcbiAgICAgICAgICAgICAgICAvL2J1dCB3YW50IHRvIGJlICdzbGlkZScgYWZ0ZXIgdGhhdFxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbk9uY2UgPSBmdW5jdGlvbih0cmFucykge1xuICAgICAgICAgICAgICAgICAgICBfb25jZVRyYW5zaXRpb24gPSB0cmFucztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZShkZXN0aW5hdGlvbiwgc291cmNlLCBpc1JldmVyc2UsaXNCYWNrKSB7XG5cblxuXG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdpc1JldmVyc2UnLCBpc1JldmVyc2UpXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcGFnZVRyYW5zaXRpb25TdGFydCcsIGRlc3RpbmF0aW9uLCBzb3VyY2UsIGlzUmV2ZXJzZSxpc0JhY2spO1xuICAgICAgICAgICAgICAgIG5hdi5jdXJyZW50ID0gbmF2Lm5leHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBXaWxsIGxpc3RlbiBmb3IgYSByb3V0ZSBjaGFuZ2Ugc3VjY2VzcyBhbmQgY2FsbCB0aGUgc2VsZWN0ZWQgY2FsbGJhY2tcbiAgICAgICAgICAgICAqIE9ubHkgb25lIGxpc3RlbiBpcyBldmVyIGFjdGl2ZSwgc28gaWYgeW91IHByZXNzIGZvciBleGFtcGxlXG4gICAgICAgICAgICAgKiAvbGluazEgdGhlbiBwcmVzcyBiYWNrIGJlZm9yZSAvbGluazEgaXMgZG9uZSwgaXQgd2lsbCBnbyBsaXN0ZW4gZm9yIHRoZSBiYWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmF2Lm9uUm91dGVTdWNjZXNzKVxuICAgICAgICAgICAgbmF2Lm9uUm91dGVTdWNjZXNzID0gbnVsbDtcbiAgICAgICAgICAgIC8vQWRkIGEgZGVmYXVsdCBvbnJvdXRlc3VjY2VzcyBmb3IgdGhlIHZlcnkgZmlyc3QgcGFnZVxuICAgICAgICAgICAgZnVuY3Rpb24gZGVmYXVsdFJvdXRlU3VjY2VzcygkZXZlbnQsIG5leHQsIGxhc3QpIHtcbiAgICAgICAgICAgICAgICBuYXYuY3VycmVudCAmJiBuYXZIaXN0b3J5LnB1c2goW25hdi5jdXJyZW50LCAnJ10pO1xuXG5cbiAgICAgICAgICAgICAgICBuYXYubmV4dCA9IG5ldyBQYWdlKCRsb2NhdGlvbi5wYXRoKCkpO1xuICAgICAgICAgICAgICAgIG5hdi5uZXh0LnRyYW5zaXRpb25PbmNlKCdub25lJyk7XG4gICAgICAgICAgICAgICAgbmF2aWdhdGUobmF2Lm5leHQpO1xuICAgICAgICAgICAgICAgIG5hdi5vblJvdXRlU3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCRldmVudCwgbmV4dCwgbGFzdCkge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgbmF2aWdhdGUgaWYgaXQncyBhIHZhbGlkIHJvdXRlIGFuZCBpdCdzIG5vdCBnb25uYSBqdXN0IHJlZGlyZWN0IGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0LiQkcm91dGUgfHwgIW5leHQuJCRyb3V0ZS5yZWRpcmVjdFRvKSB7XG4gICAgICAgICAgICAgICAgICAgIChuYXYub25Sb3V0ZVN1Y2Nlc3MgfHwgZGVmYXVsdFJvdXRlU3VjY2VzcykoJGV2ZW50LCBuZXh0LCBsYXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9NYWtlIHJvdXRlIGhpc3RvcnkgYWNjZXNzaWJsZSBieSByZWdvdVxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHBhZ2VOYXZlZCcsIG5leHQsIGxhc3QpO1xuXG5cbiAgICAgICAgICAgICAgICAvL1RPRE8g5Y6G5Y+y6K6w5b2V5Zue6YCAXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hY3R1YWxMb2NhdGlvbiA9ICRsb2NhdGlvbi5wYXRoKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRwYWdlVHJhbnNpdGlvblN1Y2Nlc3MnLCBmdW5jdGlvbihkZXNjLCBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBwYWdlVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGdvIC10cmFuc2l0aW9ucyB0byBuZXcgcGFnZVxuICAgICAgICAgICAgICogQHBhcmFtIHBhdGggLSBuZXcgcGF0aFxuICAgICAgICAgICAgICogQHBhcmFtIHtvcHRpb25hbH0gU3RyaW5nIHRyYW5zaXRpb25cbiAgICAgICAgICAgICAqIEBwYXJhbSB7b3B0aW9uYWx9IGJvb2xlYW4gaXNSZXZlcnNlLCBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5hdi5nbyA9IGZ1bmN0aW9uIGdvKHBhdGgsIHRyYW5zaXRpb24sIGlzUmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgIGlmKHBhZ2VUcmFuc2l0aW9uaW5nKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcGFnZVRyYW5zaXRpb25pbmcgPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRyYW5zaXRpb24gPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUmV2ZXJzZSA9IHRyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhdGgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKHBhdGgpO1xuICAgICAgICAgICAgICAgIC8vV2FpdCBmb3Igc3VjY2Vzc2Z1bCByb3V0ZSBjaGFuZ2UgYmVmb3JlIGFjdHVhbGx5IGRvaW5nIHN0dWZmXG4gICAgICAgICAgICAgICAgbmF2Lm9uUm91dGVTdWNjZXNzID0gZnVuY3Rpb24oJGV2ZW50LCBuZXh0LCBsYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHJvb3RTY29wZS5hY3R1YWxMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocGF0aCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL1RPRE8g5Y6G5Y+y6K6w5b2V5Zue6YCAXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRyb290U2NvcGUuYWN0dWFsTG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZigkcm9vdFNjb3BlLmFjdHVhbExvY2F0aW9uID09IHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IG5hdkhpc3RvcnlbbmF2SGlzdG9yeS5sZW5ndGgtMV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChwcmV2aW91cy5wYXRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9uYXYuYmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZIaXN0b3J5LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF2Lm5leHQgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKG5hdi5uZXh0LCBuYXYuY3VycmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBuYXYuY3VycmVudCAmJiBuYXZIaXN0b3J5LnB1c2goW25hdi5jdXJyZW50LCBsYXN0LiQkcm91dGUuY29udHJvbGxlcl0pO1xuICAgICAgICAgICAgICAgICAgICBuYXYubmV4dCA9IG5ldyBQYWdlKHBhdGgsIHRyYW5zaXRpb24gfHwgKG5leHQuJCRyb3V0ZSAmJiBuZXh0LiQkcm91dGUudHJhbnNpdGlvbiksIGlzUmV2ZXJzZSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKG5hdi5uZXh0LCBuYXYuY3VycmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9tb2RpZnkgaGlzdG9yeVxuICAgICAgICAgICAgbmF2Lm1vZGlmeUhpc3RvcnkgPSBmdW5jdGlvbihuZWVkbGVzc0hpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobmVlZGxlc3NIaXN0b3J5LCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBuYXZIaXN0b3J5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmF2SGlzdG9yeVtpXVsxXSA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZIaXN0b3J5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZSkge31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vU29tZXRpbWVzIHlvdSB3YW50IHRvIGVyYXNlIGhpc3RvcnlcbiAgICAgICAgICAgIG5hdi5lcmFzZUhpc3RvcnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuYXZIaXN0b3J5PVtdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5hdi5nZXRIaXN0b3J5PWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdkhpc3Rvcnk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmF2LmJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihwYWdlVHJhbnNpdGlvbmluZykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHBhZ2VUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAobmF2SGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IG5hdkhpc3RvcnlbbmF2SGlzdG9yeS5sZW5ndGgtMV1bMF07XG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKHByZXZpb3VzLnBhdGgoKSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdi5vblJvdXRlU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF2SGlzdG9yeS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZShuYXYubmV4dCwgbmF2LmN1cnJlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBuYXY7XG4gICAgICAgIH1dO1xuICAgIH0pXG4vL2FuZ3VsYXIubW9kdWxlKCdham9zbGluLm1vYmlsZS1uYXZpZ2F0ZScpXG4gICAgbW9iaWxlTmF2TW9kLmRpcmVjdGl2ZSgnbW9iaWxlVmlldycsIFsnJHJvb3RTY29wZScsICckY29tcGlsZScsICckY29udHJvbGxlcicsICckcm91dGUnLCAnJGNoYW5nZScsICckcScsXG4gICAgICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRjb21waWxlLCAkY29udHJvbGxlciwgJHJvdXRlLCAkY2hhbmdlLCAkcSkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCB2aWV3RWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAvL0luc2VydCBwYWdlIGludG8gZG9tXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5zZXJ0UGFnZShwYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gJHJvdXRlLmN1cnJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbHMgPSBjdXJyZW50ICYmIGN1cnJlbnQubG9jYWxzO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UuZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgcGFnZS5lbGVtZW50Lmh0bWwobG9jYWxzLiR0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UuZWxlbWVudC5hZGRDbGFzcygnbWItcGFnZScpOyAvL2Fsd2F5cyBoYXMgdG8gaGF2ZSBwYWdlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIHBhZ2Uuc2NvcGUgPSBzY29wZS4kbmV3KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2Fscy4kc2NvcGUgPSBwYWdlLnNjb3BlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZS5jb250cm9sbGVyID0gJGNvbnRyb2xsZXIoY3VycmVudC5jb250cm9sbGVyLCBsb2NhbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZS5lbGVtZW50LmNvbnRlbnRzKCkuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBwYWdlLmNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKHBhZ2UuZWxlbWVudC5jb250ZW50cygpKShwYWdlLnNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2FscyAmJiBsb2NhbHMuJHRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFwcGVuZCBwYWdlIGVsZW1lbnQgaWYgYSB0ZW1wbGF0ZSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdFbGVtZW50LmFwcGVuZChwYWdlLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhZ2Uuc2NvcGUuJGVtaXQoJyR2aWV3Q29udGVudExvYWRlZCcpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlLnNjb3BlLiRldmFsKGF0dHJzLm9uTG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUcmFucztcbiAgICAgICAgICAgICAgICBzY29wZS4kb24oJyRwYWdlVHJhbnNpdGlvblN0YXJ0JywgZnVuY3Rpb24gKCRldmVudCwgZGVzdCwgc291cmNlLCByZXZlcnNlLGlzQmFjaykge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGFuZ2VQYWdlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudCAmJiAkcm91dGUuY3VycmVudC4kJHJvdXRlIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNCYWNrKXtyZXZlcnNlPXRydWU7fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSByZXZlcnNlID8gc291cmNlLnRyYW5zaXRpb24oKSA6IGRlc3QudHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRQYWdlKGRlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgcGFnZSBpcyBtYXJrZWQgYXMgcmV2ZXJzZSwgcmV2ZXJzZSB0aGUgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0J1dCxpZiBpdCdzIGEgbmF2LmJhY2sgQWN0aW9uLCBrZWVwIHJldmVyc2U9PXRydWUgIHJlZ291QDIwMTMuOS45XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdC5yZXZlcnNlKCkgfHwgY3VycmVudC5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWlzQmFjayl7cmV2ZXJzZSA9ICFyZXZlcnNlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvVHJhbnNpdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJGNoYW5nZShkZXN0LmVsZW1lbnQsIChzb3VyY2UgPyBzb3VyY2UuZWxlbWVudCA6IG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLCByZXZlcnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcGFnZVRyYW5zaXRpb25TdWNjZXNzJywgZGVzdCwgc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5zY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLmVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBuZXh0IGVsZW1lbnQgdG8gZGlzcGxheTogbm9uZSwgdGhlbiB3YWl0IHVudGlsIHRyYW5zaXRpb24gaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVhZHksIHRoZW4gc2hvdyBpdCBhZ2Fpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QuZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FsbG93IGEgZGVmZXJUcmFuc2l0aW9uIGV4cHJlc3Npb24sIHdoaWNoIGlzIGFsbG93ZWQgdG8gcmV0dXJuIGEgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVGhlIG5leHQgcGFnZSB3aWxsIGJlIGluc2VydGVkLCBidXQgbm90IHRyYW5zaXRpb25lZCBpbiB1bnRpbCB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pcyBmdWxmaWxsZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmZXJUcmFuc2l0aW9uUHJvbWlzZSA9IHNjb3BlLiRldmFsKGF0dHJzLmRlZmVyVHJhbnNpdGlvbikgfHwgJHEud2hlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJUcmFuc2l0aW9uUHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVW5kbyBkaXNwbGF5IG5vbmUgZnJvbSB3YWl0aW5nIGZvciB0cmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdC5lbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyVHJhbnNpdGlvblByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1VuZG8gZGlzcGxheSBub25lIGZyb20gd2FpdGluZyBmb3IgdHJhbnNpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0LmVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9UcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlclRyYW5zaXRpb25Qcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmFucyAmJiBjdXJyZW50VHJhbnMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmFucyA9IGNoYW5nZVBhZ2UoZGVzdCwgc291cmNlLCByZXZlcnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICAgICAgICAgICAgbGluazogbGlua1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfV0pXG5cbiAgICAvLy5kaXJlY3RpdmUoJ3Njcm9sbGFibGUnLCBbJyRyb3V0ZScsICckdGltZW91dCcsIGZ1bmN0aW9uKCRyb3V0ZSwgJHRpbWVvdXQpIHtcbiAgICAvLyAgICB2YXIgc2Nyb2xsQ2FjaGUgPSB7fTtcbiAgICAvLyAgICByZXR1cm4ge1xuICAgIC8vICAgICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAvLyAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsbSwgYXR0cnMpIHtcbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjcm9sbENhY2hlKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgdmFyIHJvdXRlID0gJHJvdXRlLmN1cnJlbnQgPyAkcm91dGUuY3VycmVudC4kJHJvdXRlIDoge307XG4gICAgLy8gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSByb3V0ZS50ZW1wbGF0ZVVybCB8fCByb3V0ZS50ZW1wbGF0ZTtcbiAgICAvLyAgICAgICAgICAgIHZhciByYXdFbG0gPSBlbG1bMF07XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCRyb3V0ZSk7XG4gICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wbGF0ZSk7XG4gICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhyYXdFbG0pO1xuICAgIC8vXG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgIC8vT24gc2NvcGUgY3JlYXRpb24sIHNlZSBpZiB3ZSByZW1lbWJlcmVkIGFueSBzY3JvbGwgZm9yIHRoaXMgdGVtcGxhdGVVcmxcbiAgICAvLyAgICAgICAgICAgIC8vSWYgd2UgZGlkLCBzZXQgaXRcbiAgICAvLyAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgIC8vICAgICAgICAgICAgICAgIC8vU2V0IG9sZFNjcm9sbCBhZnRlciBhIHRpbWVvdXQgc28gdGhlIHBhZ2UgaGFzIHRpbWUgdG8gZnVsbHkgbG9hZFxuICAgIC8vICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgb2xkU2Nyb2xsID0gc2Nyb2xsQ2FjaGVbdGVtcGxhdGVdO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvbGRTY3JvbGwpO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChvbGRTY3JvbGwpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJhd0VsbS5zY3JvbGxUb3AgPSBvbGRTY3JvbGw7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgICB9KTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQ2FjaGVbdGVtcGxhdGVdID0gcmF3RWxtLnNjcm9sbFRvcDtcbiAgICAvLyAgICAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgfVxuICAgIC8vICAgIH07XG4gICAgLy99XSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBtb2JpbGVOYXZNb2Q7XG4iLCJcInVzZSBzdHJpY3RcIjsoZnVuY3Rpb24oKXt2YXIgYT1hbmd1bGFyLm1vZHVsZShcIm5nU3RvcmFnZVwiLFtdKS5mYWN0b3J5KFwiJGxvY2FsU3RvcmFnZVwiLGIoXCJsb2NhbFN0b3JhZ2VcIikpLmZhY3RvcnkoXCIkc2Vzc2lvblN0b3JhZ2VcIixiKFwic2Vzc2lvblN0b3JhZ2VcIikpO2Z1bmN0aW9uIGIoYyl7cmV0dXJuW1wiJHJvb3RTY29wZVwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGQsbSl7dmFyIGw9bVtjXXx8KGNvbnNvbGUud2FybihcIlRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYiBTdG9yYWdlIVwiKSx7fSksaD17JGRlZmF1bHQ6ZnVuY3Rpb24obil7Zm9yKHZhciBpIGluIG4pe2FuZ3VsYXIuaXNEZWZpbmVkKGhbaV0pfHwoaFtpXT1uW2ldKX1yZXR1cm4gaH0sJHJlc2V0OmZ1bmN0aW9uKG4pe2Zvcih2YXIgaSBpbiBoKXtcIiRcIj09PWlbMF18fGRlbGV0ZSBoW2ldfXJldHVybiBoLiRkZWZhdWx0KG4pfX0saixmO2Zvcih2YXIgZz0wLGU7ZzxsLmxlbmd0aDtnKyspeyhlPWwua2V5KGcpKSYmXCJuZ1N0b3JhZ2UtXCI9PT1lLnNsaWNlKDAsMTApJiYoaFtlLnNsaWNlKDEwKV09YW5ndWxhci5mcm9tSnNvbihsLmdldEl0ZW0oZSkpKX1qPWFuZ3VsYXIuY29weShoKTtkLiR3YXRjaChmdW5jdGlvbigpe2Z8fChmPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtmPW51bGw7aWYoIWFuZ3VsYXIuZXF1YWxzKGgsaikpe2FuZ3VsYXIuZm9yRWFjaChoLGZ1bmN0aW9uKG8sbil7YW5ndWxhci5pc0RlZmluZWQobykmJlwiJFwiIT09blswXSYmbC5zZXRJdGVtKFwibmdTdG9yYWdlLVwiK24sYW5ndWxhci50b0pzb24obykpO2RlbGV0ZSBqW25dfSk7Zm9yKHZhciBpIGluIGope2wucmVtb3ZlSXRlbShcIm5nU3RvcmFnZS1cIitpKX1qPWFuZ3VsYXIuY29weShoKX19LDEwMCkpfSk7XCJsb2NhbFN0b3JhZ2VcIj09PWMmJm0uYWRkRXZlbnRMaXN0ZW5lciYmbS5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLGZ1bmN0aW9uKGkpe2lmKFwibmdTdG9yYWdlLVwiPT09aS5rZXkuc2xpY2UoMCwxMCkpe2kubmV3VmFsdWU/aFtpLmtleS5zbGljZSgxMCldPWFuZ3VsYXIuZnJvbUpzb24oaS5uZXdWYWx1ZSk6ZGVsZXRlIGhbaS5rZXkuc2xpY2UoMTApXTtqPWFuZ3VsYXIuY29weShoKTtkLiRhcHBseSgpfX0pO3JldHVybiBofV19bW9kdWxlLmV4cG9ydHM9YX0pKCk7IiwidmFyIFRvdWNoU2xpZGU9ZnVuY3Rpb24oYSl7YT1hfHx7fTt2YXIgYj17c2xpZGVDZWxsOmEuc2xpZGVDZWxsfHxcIiN0b3VjaFNsaWRlXCIsdGl0Q2VsbDphLnRpdENlbGx8fFwiLmhkIGxpXCIsbWFpbkNlbGw6YS5tYWluQ2VsbHx8XCIuYmRcIixlZmZlY3Q6YS5lZmZlY3R8fFwibGVmdFwiLGF1dG9QbGF5OmEuYXV0b1BsYXl8fCExLGRlbGF5VGltZTphLmRlbGF5VGltZXx8MjAwLGludGVyVGltZTphLmludGVyVGltZXx8MjUwMCxkZWZhdWx0SW5kZXg6YS5kZWZhdWx0SW5kZXh8fDAsdGl0T25DbGFzc05hbWU6YS50aXRPbkNsYXNzTmFtZXx8XCJvblwiLGF1dG9QYWdlOmEuYXV0b1BhZ2V8fCExLHByZXZDZWxsOmEucHJldkNlbGx8fFwiLnByZXZcIixuZXh0Q2VsbDphLm5leHRDZWxsfHxcIi5uZXh0XCIscGFnZVN0YXRlQ2VsbDphLnBhZ2VTdGF0ZUNlbGx8fFwiLnBhZ2VTdGF0ZVwiLHBuTG9vcDpcInVuZGVmaW5lZCBcIj09YS5wbkxvb3A/ITA6YS5wbkxvb3Asc3RhcnRGdW46YS5zdGFydEZ1bnx8bnVsbCxlbmRGdW46YS5lbmRGdW58fG51bGwsc3dpdGNoTG9hZDphLnN3aXRjaExvYWR8fG51bGx9LGM9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYi5zbGlkZUNlbGwucmVwbGFjZShcIiNcIixcIlwiKSk7aWYoIWMpcmV0dXJuITE7dmFyIGQ9ZnVuY3Rpb24oYSxiKXthPWEuc3BsaXQoXCIgXCIpO3ZhciBjPVtdO2I9Ynx8ZG9jdW1lbnQ7dmFyIGQ9W2JdO2Zvcih2YXIgZSBpbiBhKTAhPWFbZV0ubGVuZ3RoJiZjLnB1c2goYVtlXSk7Zm9yKHZhciBlIGluIGMpe2lmKDA9PWQubGVuZ3RoKXJldHVybiExO3ZhciBmPVtdO2Zvcih2YXIgZyBpbiBkKWlmKFwiI1wiPT1jW2VdWzBdKWYucHVzaChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjW2VdLnJlcGxhY2UoXCIjXCIsXCJcIikpKTtlbHNlIGlmKFwiLlwiPT1jW2VdWzBdKWZvcih2YXIgaD1kW2ddLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSxpPTA7aTxoLmxlbmd0aDtpKyspe3ZhciBqPWhbaV0uY2xhc3NOYW1lO2omJi0xIT1qLnNlYXJjaChuZXcgUmVnRXhwKFwiXFxcXGJcIitjW2VdLnJlcGxhY2UoXCIuXCIsXCJcIikrXCJcXFxcYlwiKSkmJmYucHVzaChoW2ldKX1lbHNlIGZvcih2YXIgaD1kW2ddLmdldEVsZW1lbnRzQnlUYWdOYW1lKGNbZV0pLGk9MDtpPGgubGVuZ3RoO2krKylmLnB1c2goaFtpXSk7ZD1mfXJldHVybiAwPT1kLmxlbmd0aHx8ZFswXT09Yj8hMTpkfSxlPWZ1bmN0aW9uKGEsYil7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLmlubmVySFRNTD1iLGM9Yy5jaGlsZHJlblswXTt2YXIgZD1hLmNsb25lTm9kZSghMCk7cmV0dXJuIGMuYXBwZW5kQ2hpbGQoZCksYS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjLGEpLG09ZCxjfSxnPWZ1bmN0aW9uKGEsYil7IWF8fCFifHxhLmNsYXNzTmFtZSYmLTEhPWEuY2xhc3NOYW1lLnNlYXJjaChuZXcgUmVnRXhwKFwiXFxcXGJcIitiK1wiXFxcXGJcIikpfHwoYS5jbGFzc05hbWUrPShhLmNsYXNzTmFtZT9cIiBcIjpcIlwiKStiKX0saD1mdW5jdGlvbihhLGIpeyFhfHwhYnx8YS5jbGFzc05hbWUmJi0xPT1hLmNsYXNzTmFtZS5zZWFyY2gobmV3IFJlZ0V4cChcIlxcXFxiXCIrYitcIlxcXFxiXCIpKXx8KGEuY2xhc3NOYW1lPWEuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFxzKlxcXFxiXCIrYitcIlxcXFxiXCIsXCJnXCIpLFwiXCIpKX0saT1iLmVmZmVjdCxqPWQoYi5wcmV2Q2VsbCxjKVswXSxrPWQoYi5uZXh0Q2VsbCxjKVswXSxsPWQoYi5wYWdlU3RhdGVDZWxsKVswXSxtPWQoYi5tYWluQ2VsbCxjKVswXTtpZighbSlyZXR1cm4hMTt2YXIgTixPLG49bS5jaGlsZHJlbi5sZW5ndGgsbz1kKGIudGl0Q2VsbCxjKSxwPW8/by5sZW5ndGg6bixxPWIuc3dpdGNoTG9hZCxyPXBhcnNlSW50KGIuZGVmYXVsdEluZGV4KSxzPXBhcnNlSW50KGIuZGVsYXlUaW1lKSx0PXBhcnNlSW50KGIuaW50ZXJUaW1lKSx1PVwiZmFsc2VcIj09Yi5hdXRvUGxheXx8MD09Yi5hdXRvUGxheT8hMTohMCx2PVwiZmFsc2VcIj09Yi5hdXRvUGFnZXx8MD09Yi5hdXRvUGFnZT8hMTohMCx3PVwiZmFsc2VcIj09Yi5wbkxvb3B8fDA9PWIucG5Mb29wPyExOiEwLHg9cix5PW51bGwsej1udWxsLEE9bnVsbCxCPTAsQz0wLEQ9MCxFPTAsRz0vaHAtdGFibGV0L2dpLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pLEg9XCJvbnRvdWNoc3RhcnRcImluIHdpbmRvdyYmIUcsST1IP1widG91Y2hzdGFydFwiOlwibW91c2Vkb3duXCIsSj1IP1widG91Y2htb3ZlXCI6XCJcIixLPUg/XCJ0b3VjaGVuZFwiOlwibW91c2V1cFwiLE09bS5wYXJlbnROb2RlLmNsaWVudFdpZHRoLFA9bjtpZigwPT1wJiYocD1uKSx2KXtwPW4sbz1vWzBdLG8uaW5uZXJIVE1MPVwiXCI7dmFyIFE9XCJcIjtpZigxPT1iLmF1dG9QYWdlfHxcInRydWVcIj09Yi5hdXRvUGFnZSlmb3IodmFyIFI9MDtwPlI7UisrKVErPVwiPGxpPlwiKyhSKzEpK1wiPC9saT5cIjtlbHNlIGZvcih2YXIgUj0wO3A+UjtSKyspUSs9Yi5hdXRvUGFnZS5yZXBsYWNlKFwiJFwiLFIrMSk7by5pbm5lckhUTUw9USxvPW8uY2hpbGRyZW59XCJsZWZ0TG9vcFwiPT1pJiYoUCs9MixtLmFwcGVuZENoaWxkKG0uY2hpbGRyZW5bMF0uY2xvbmVOb2RlKCEwKSksbS5pbnNlcnRCZWZvcmUobS5jaGlsZHJlbltuLTFdLmNsb25lTm9kZSghMCksbS5jaGlsZHJlblswXSkpLE49ZShtLCc8ZGl2IGNsYXNzPVwidGVtcFdyYXBcIiBzdHlsZT1cIm92ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZTtcIj48L2Rpdj4nKSxtLnN0eWxlLmNzc1RleHQ9XCJ3aWR0aDpcIitQKk0rXCJweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO21hcmdpbjowO1wiO2Zvcih2YXIgUj0wO1A+UjtSKyspbS5jaGlsZHJlbltSXS5zdHlsZS5jc3NUZXh0PVwiZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOnRvcDt3aWR0aDpcIitNK1wicHhcIjt2YXIgUz1mdW5jdGlvbigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGIuc3RhcnRGdW4mJmIuc3RhcnRGdW4ocixwKX0sVD1mdW5jdGlvbigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGIuZW5kRnVuJiZiLmVuZEZ1bihyLHApfSxVPWZ1bmN0aW9uKGEpe3ZhciBiPShcImxlZnRMb29wXCI9PWk/cisxOnIpK2EsYz1mdW5jdGlvbihhKXtmb3IodmFyIGI9bS5jaGlsZHJlblthXS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKSxjPTA7YzxiLmxlbmd0aDtjKyspYltjXS5nZXRBdHRyaWJ1dGUocSkmJihiW2NdLnNldEF0dHJpYnV0ZShcInNyY1wiLGJbY10uZ2V0QXR0cmlidXRlKHEpKSxiW2NdLnJlbW92ZUF0dHJpYnV0ZShxKSl9O2lmKGMoYiksXCJsZWZ0TG9vcFwiPT1pKXN3aXRjaChiKXtjYXNlIDA6YyhuKTticmVhaztjYXNlIDE6YyhuKzEpO2JyZWFrO2Nhc2UgbjpjKDApO2JyZWFrO2Nhc2UgbisxOmMoMSl9fSxWPWZ1bmN0aW9uKCl7TT1OLmNsaWVudFdpZHRoLG0uc3R5bGUud2lkdGg9UCpNK1wicHhcIjtmb3IodmFyIGE9MDtQPmE7YSsrKW0uY2hpbGRyZW5bYV0uc3R5bGUud2lkdGg9TStcInB4XCI7dmFyIGI9XCJsZWZ0TG9vcFwiPT1pP3IrMTpyO1coLWIqTSwwKX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixWLCExKTt2YXIgVz1mdW5jdGlvbihhLGIsYyl7Yz1jP2Muc3R5bGU6bS5zdHlsZSxjLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbj1jLk1velRyYW5zaXRpb25EdXJhdGlvbj1jLm1zVHJhbnNpdGlvbkR1cmF0aW9uPWMuT1RyYW5zaXRpb25EdXJhdGlvbj1jLnRyYW5zaXRpb25EdXJhdGlvbj1iK1wibXNcIixjLndlYmtpdFRyYW5zZm9ybT1cInRyYW5zbGF0ZShcIithK1wicHgsMCl0cmFuc2xhdGVaKDApXCIsYy5tc1RyYW5zZm9ybT1jLk1velRyYW5zZm9ybT1jLk9UcmFuc2Zvcm09XCJ0cmFuc2xhdGVYKFwiK2ErXCJweClcIn0sWD1mdW5jdGlvbihhKXtzd2l0Y2goaSl7Y2FzZVwibGVmdFwiOnI+PXA/cj1hP3ItMTowOjA+ciYmKHI9YT8wOnAtMSksbnVsbCE9cSYmVSgwKSxXKC1yKk0scykseD1yO2JyZWFrO2Nhc2VcImxlZnRMb29wXCI6bnVsbCE9cSYmVSgwKSxXKC0ocisxKSpNLHMpLC0xPT1yPyh6PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtXKC1wKk0sMCl9LHMpLHI9cC0xKTpyPT1wJiYoej1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7VygtTSwwKX0scykscj0wKSx4PXJ9UygpLEE9c2V0VGltZW91dChmdW5jdGlvbigpe1QoKX0scyk7Zm9yKHZhciBjPTA7cD5jO2MrKyloKG9bY10sYi50aXRPbkNsYXNzTmFtZSksYz09ciYmZyhvW2NdLGIudGl0T25DbGFzc05hbWUpOzA9PXcmJihoKGssXCJuZXh0U3RvcFwiKSxoKGosXCJwcmV2U3RvcFwiKSwwPT1yP2coaixcInByZXZTdG9wXCIpOnI9PXAtMSYmZyhrLFwibmV4dFN0b3BcIikpLGwmJihsLmlubmVySFRNTD1cIjxzcGFuPlwiKyhyKzEpK1wiPC9zcGFuPi9cIitwKX07aWYoWCgpLHUmJih5PXNldEludGVydmFsKGZ1bmN0aW9uKCl7cisrLFgoKX0sdCkpLG8pZm9yKHZhciBSPTA7cD5SO1IrKykhZnVuY3Rpb24oKXt2YXIgYT1SO29bYV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoeiksY2xlYXJUaW1lb3V0KEEpLHI9YSxYKCl9KX0oKTtrJiZrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7KDE9PXd8fHIhPXAtMSkmJihjbGVhclRpbWVvdXQoeiksY2xlYXJUaW1lb3V0KEEpLHIrKyxYKCkpfSksaiYmai5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpeygxPT13fHwwIT1yKSYmKGNsZWFyVGltZW91dCh6KSxjbGVhclRpbWVvdXQoQSksci0tLFgoKSl9KTt2YXIgWT1mdW5jdGlvbihhKXtjbGVhclRpbWVvdXQoeiksY2xlYXJUaW1lb3V0KEEpLE89dm9pZCAwLEQ9MDt2YXIgYj1IP2EudG91Y2hlc1swXTphO0I9Yi5wYWdlWCxDPWIucGFnZVksbS5hZGRFdmVudExpc3RlbmVyKEosWiwhMSksbS5hZGRFdmVudExpc3RlbmVyKEssJCwhMSl9LFo9ZnVuY3Rpb24oYSl7aWYoIUh8fCEoYS50b3VjaGVzLmxlbmd0aD4xfHxhLnNjYWxlJiYxIT09YS5zY2FsZSkpe3ZhciBiPUg/YS50b3VjaGVzWzBdOmE7aWYoRD1iLnBhZ2VYLUIsRT1iLnBhZ2VZLUMsXCJ1bmRlZmluZWRcIj09dHlwZW9mIE8mJihPPSEhKE98fE1hdGguYWJzKEQpPE1hdGguYWJzKEUpKSksIU8pe3N3aXRjaChhLnByZXZlbnREZWZhdWx0KCksdSYmY2xlYXJJbnRlcnZhbCh5KSxpKXtjYXNlXCJsZWZ0XCI6KDA9PXImJkQ+MHx8cj49cC0xJiYwPkQpJiYoRD0uNCpEKSxXKC1yKk0rRCwwKTticmVhaztjYXNlXCJsZWZ0TG9vcFwiOlcoLShyKzEpKk0rRCwwKX1udWxsIT1xJiZNYXRoLmFicyhEKT5NLzMmJlUoRD4tMD8tMToxKX19fSwkPWZ1bmN0aW9uKGEpezAhPUQmJihhLnByZXZlbnREZWZhdWx0KCksT3x8KE1hdGguYWJzKEQpPk0vMTAmJihEPjA/ci0tOnIrKyksWCghMCksdSYmKHk9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtyKyssWCgpfSx0KSkpLG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihKLFosITEpLG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihLLCQsITEpKX07bS5hZGRFdmVudExpc3RlbmVyKEksWSwhMSl9O21vZHVsZS5leHBvcnRzPVRvdWNoU2xpZGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGh0dHBQcm92aWRlcicsXG4gICAgZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIMK377+977+977+977+977+977+9XG4gICAgICAgICAqICovXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgICAud2hlbignL2hvbWUnLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9ob21lLmh0bWwnLCAgLy/vv73vv73Ss1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcbiAgICAgICAgICAgICAgICAvL3Jlc29sdmU6IHtpc0luQXBwOiAnaXNJbkFwcCd9LFxuICAgICAgICAgICAgICAgIC8vbmF2YmFyOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgZnVuYzogJ2hvbWUnLFxuICAgICAgICAgICAgICAgIC8vICAgIHRpdGxlOiAn77+977+977+977+9JyxcbiAgICAgICAgICAgICAgICAvLyAgICBjYW5DbG9zZTogMVxuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aGVuKCcvaW50ZWdyYWxNYWxsJywge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvaW50ZWdyYWxNYWxsLmh0bWwnLCAgICAgIC8v77+977+977+977+977+9zLPvv71cbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaW50ZWdyYWxNYWxsQ3RybCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAud2hlbignL2NvdXBvbicsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2NvdXBvbi5odG1sJywgICAgICAvL++/vcW777+9yK9cbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY291cG9uQ3RybCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLy53aGVuKCcvY291cG9uRGV0YWlsJywge1xuICAgICAgICAgICAgLy8gICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9jb3Vwb25EZXRhaWwuaHRtbCcsICAgICAgLy/vv73Fu++/vciv77+977+977+977+9XG4gICAgICAgICAgICAvLyAgICBjb250cm9sbGVyOiAnY291cG9uRGV0YWlsQ3RybCdcbiAgICAgICAgICAgIC8vfSlcbiAgICAgICAgICAgIC8vLndoZW4oJy9yZWdpc3RlcicsIHtcbiAgICAgICAgICAgIC8vICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcmVnaXN0ZXIuaHRtbCcsICAgICAgLy/Xou+/ve+/vVxuICAgICAgICAgICAgLy8gICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgIC8vfSlcbiAgICAgICAgICAgIC8vLndoZW4oJy9wZXJzb25hbENlbnRlcicsIHtcbiAgICAgICAgICAgIC8vICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcGVyc29uYWxDZW50ZXIuaHRtbCcsICAgICAgLy/vv73vv73vv73vv73vv73vv73vv73Eo++/ve+/ve+/vdSx77+977+9XG4gICAgICAgICAgICAvLyAgICBjb250cm9sbGVyOiAncGVyc29uYWxDZW50ZXJDdHJsJ1xuICAgICAgICAgICAgLy99KVxuXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBcIi9ob21lXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIDtcblxuXG5cblxuXG5cbiAgICAgICAgLypcbiAgICAgICAgKiBodHRw77+977+977+977+9XG4gICAgICAgICogKi9cbiAgICAgICAgLy9CeSBkZWZhdWx0LCBqUXVlcnkgdHJhbnNtaXRzIGRhdGEgdXNpbmcgQ29udGVudC1UeXBlOiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYW5kIHRoZSBmYW1pbGlhciBmb289YmFyJmJhej1tb2Ugc2VyaWFsaXphdGlvbi4gQW5ndWxhckpTLCBob3dldmVyLCB0cmFuc21pdHMgZGF0YSB1c2luZyBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb24gYW5kIHsgXCJmb29cIjogXCJiYXJcIiwgXCJiYXpcIjogXCJtb2VcIiB9IEpTT04gc2VyaWFsaXphdGlvbiwgd2hpY2ggdW5mb3J0dW5hdGVseSBzb21lIFdlYiBzZXJ2ZXIgbGFuZ3VhZ2Vz77+977+9bm90YWJseSBQSFDvv73vv71kbyBub3QgdW5zZXJpYWxpemUgbmF0aXZlbHlcbiAgICAgICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLnBvc3RbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB3b3JraG9yc2U7IGNvbnZlcnRzIGFuIG9iamVjdCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWQgc2VyaWFsaXphdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgcGFyYW0gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9ICcnLCBuYW1lLCB2YWx1ZSwgZnVsbFN1Yk5hbWUsIHN1Yk5hbWUsIHN1YlZhbHVlLCBpbm5lck9iaiwgaTtcbiAgICAgICAgICAgIGZvcihuYW1lIGluIG9iaikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb2JqW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGk9MDsgaTx2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViVmFsdWUgPSB2YWx1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxTdWJOYW1lID0gbmFtZSArICdbJyArIGkgKyAnXSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lck9iaiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJPYmpbZnVsbFN1Yk5hbWVdID0gc3ViVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSArPSBwYXJhbShpbm5lck9iaikgKyAnJic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3Ioc3ViTmFtZSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViVmFsdWUgPSB2YWx1ZVtzdWJOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxTdWJOYW1lID0gbmFtZSArICdbJyArIHN1Yk5hbWUgKyAnXSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lck9iaiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJPYmpbZnVsbFN1Yk5hbWVdID0gc3ViVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSArPSBwYXJhbShpbm5lck9iaikgKyAnJic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBxdWVyeSArPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpICsgJyYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA/IHF1ZXJ5LnN1YnN0cigwLCBxdWVyeS5sZW5ndGggLSAxKSA6IHF1ZXJ5O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIE92ZXJyaWRlICRodHRwIHNlcnZpY2UncyBkZWZhdWx0IHRyYW5zZm9ybVJlcXVlc3RcbiAgICAgICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy50cmFuc2Zvcm1SZXF1ZXN0ID0gW2Z1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KGRhdGEpICYmIFN0cmluZyhkYXRhKSAhPT0gJ1tvYmplY3QgRmlsZV0nID8gcGFyYW0oZGF0YSkgOiBkYXRhO1xuICAgICAgICB9XTtcblxuXG5cblxuICAgIH1cbl07XG4gXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gWyckcm9vdFNjb3BlJywgJyR3aW5kb3cnLCAnJHJvdXRlJywgJyRodHRwJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRsb2NhdGlvbicsICckbmF2aWdhdGUnLCAnJHRpbWVvdXQnLCAnJGxvY2FsU3RvcmFnZScsXG4gICAgZnVuY3Rpb24gKCRyb290U2NvcGUsICR3aW5kb3csICRyb3V0ZSwgJGh0dHAsICR0ZW1wbGF0ZUNhY2hlLCAkbG9jYXRpb24sICRuYXZpZ2F0ZSwgJHRpbWVvdXQsICRsb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAvKiBsb2FkUGFnZSgpO1xuICAgICAgICBmdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICAgICAgICAgIHZhciBwYWdlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYWdlID0gSlNPTi5wYXJzZShINU5hdmlQbHVnaW4uZ2V0Q3VycmVudFBhZ2UoKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcGFnZSA9IHtjdXJyZW50UGFnZTogMH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAocGFnZS5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgLy8kbG9jYXRpb24ucGF0aCgnLycpLnNlYXJjaCh7J2RlcGFydHVyZUNpdHknOiAn77+977+977+977+9JywgYXJyaXZhbENpdHk6ICfvv73vv73vv73vv70nfSkucmVwbGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpLnJlcGxhY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2J1c09yZGVyTGlzdCcpLnJlcGxhY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0qL1xuXG4gICAgICAgICRyb290U2NvcGUuaXNMb2dnZWRJbiA9IDA7XG4gICAgICAgICR3aW5kb3cubm90aWZ5TG9naW5TdGF0dXMgPSBmdW5jdGlvbiAoaXNMb2dnZWRJbikge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5pc0xvZ2dlZEluID0gcGFyc2VJbnQoaXNMb2dnZWRJbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy/vv73vv73Ioe+/vcO777+977+977+9z6JcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJJbmZvU3RyID0gSDVVc2VyUGx1Z2luLmdldFVzZXJJbmZvKCk7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IEpTT04ucGFyc2UodXNlckluZm9TdHIpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkSW4gPSAxO1xuICAgICAgICAgICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVySWQ6IHBhcmFtcy5tZW1iZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBwYXJhbXMudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnVlbmFtZTogcGFyYW1zLnRydWVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm1vYmlsZTogcGFyYW1zLnVzZXJtb2JpbGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkSW4gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuXG4gICAgICAgIC8v1KTvv73Iu++/ve+/ve+/vcSj77+977+9XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkcm91dGUucm91dGVzLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgaWYgKHIudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoci50ZW1wbGF0ZVVybCwge2NhY2hlOiAkdGVtcGxhdGVDYWNoZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuLy8gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkgeyAvL++/ve+/ve+/ve+/vcSj77+95bu677+977+9XG4vLyAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHRlbXBsYXRlQ2FjaGUuaW5mbygpKTtcbi8vICAgICAgICAgICAgICAgICAgICAkdGVtcGxhdGVDYWNoZS5yZW1vdmVBbGwoKTtcbi8vICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy/vv73vv73Xqu+/ve+/ve+/ve+/vcK90rPvv73vv71cbiAgICAgICAgJHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbiAoZXZlbnQsIGN1cnJlbnQsIHByZXZpb3VzLCByZWplY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLm5lZWRzQXV0aGVudGljYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpLnJlcGxhY2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbiAmJiByZWplY3Rpb24ubmVlZEluQXBwID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9lcnJvcicpLnJlcGxhY2UoKTtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2xvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICAgICAgICAgICAgICBfbG9nLmNhbGwoY29uc29sZSwgJyVjJyArIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcgJyksICdjb2xvcjogcmVkOycpXG4gICAgICAgICAgICAgICAgfSkoJ0NvcHlyaWdodCAyMDAyLTIwMTTvv73vv73IqO+/ve+/ve+/ve+/vc2s77+977+977+977+977+977+977+9xrzvv73vv73Jt++/ve+/ve+/ve+/vd6577+9y74gXFxuXFxuRnJvbnQtRW5kIFdlYiBEZXZlbG9wZXI6IO+/ve+/ve+/ve+/vSBncTY1NzRATFkuY29tICDvv73vv73vv73vv70gaHIwOTI4OEBMWS5jb20nKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8v0rPvv73vv73vv73Qu++/ve+/vcm577+977+977+977+9xLLvv73vv73vv71cbiAgICAgICAgJHJvb3RTY29wZS4kb24oXCIkcGFnZU5hdmVkXCIsIGZ1bmN0aW9uIChldmVudCwgbmV4dCwgbGFzdCkge1xuICAgICAgICAgICAgLy/vv73vv73vv73vv73Ss++/ve+/ve+/ve+/ve+/ve+/vVxuICAgICAgICAgICAgLy92YXIgbmF2YmFyID0gbmV4dC4kJHJvdXRlWyduYXZiYXInXSxcbiAgICAgICAgICAgIC8vaWYgKGFuZ3VsYXIuaXNPYmplY3QobmF2YmFyKSkge1xuICAgICAgICAgICAgLy8gIG5hdGl2ZVBsdWdpbi5zZXROYXZpYmFyKG5hdmJhci5mdW5jLCBuYXZiYXIudGl0bGUsIG5hdmJhci5jYW5DbG9zZSwgbmF2YmFyLnN1YnRpdGxlLCBuYXZiYXIuaGFzTWVudSwgbmF2YmFyLnJpZ2h0bWVudVRpdGxlLCBuYXZiYXIuY2FsbGJhY2tFdmVudCk7XG4gICAgICAgICAgICAvL31cblxuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgLyogdmFyIGNvbnRyb2xsZXIgPSBuZXh0LiQkcm91dGUuY29udHJvbGxlcjtcbiAgICAgICAgICAgICAgICAvL++/ve+/ve+/ve+/vdKzyrHvv73vv73vv73vv73vv73vv73Kt++/ve+/vcK8XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIgPT09ICdob21lQ3RybCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJG5hdmlnYXRlLmVyYXNlSGlzdG9yeSgpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy/vv73vv73vv73vv73Ss++/ve+/ve+/ve+/vdeqXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29yZGVyUGF5Q3RybCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAkbmF2aWdhdGUubW9kaWZ5SGlzdG9yeShbJ2J1c1RyYWluTGlzdEN0cmwnLCAnZmlsbEluT3JkZXJDdHJsJywgJ2J1c09yZGVyRGV0YWlsQ3RybCcsICdwYXlGYWlsQ3RybCcsICdvcmRlclBheUN0cmwnXSk7ICAgLy/vv73vv73vv73rtqnvv73vv73Wp++/ve+/vdKz77+977+977+977+977+977+9yrfvv73vv73CvO+/ve+/ve+/vcaz77+977+977+977+977+90qrvv73vv73Ss++/ve+/vVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICAvLy8vQmluZCB0aGUgYCRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3NgIGV2ZW50IG9uIHRoZSByb290U2NvcGUsIHNvIHRoYXQgd2UgZG9udCBuZWVkIHRvXG4gICAgICAgIC8vLy9iaW5kIGluIGluZHV2aWR1YWwgY29udHJvbGxlcnMuXG4gICAgICAgIC8vJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgJHJvb3RTY29wZS5hY3R1YWxMb2NhdGlvbiA9ICRsb2NhdGlvbi5wYXRoKCk7XG4gICAgICAgIC8vfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vJHJvb3RTY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge3JldHVybiAkbG9jYXRpb24ucGF0aCgpfSwgZnVuY3Rpb24gKG5ld0xvY2F0aW9uLCBvbGRMb2NhdGlvbikge1xuICAgICAgICAvLyAgICBpZigkcm9vdFNjb3BlLmFjdHVhbExvY2F0aW9uID09PSBuZXdMb2NhdGlvbikge1xuICAgICAgICAvLyAgICAgICAgYWxlcnQoJ1doeSBkaWQgeW91IHVzZSBoaXN0b3J5IGJhY2s/Jyk7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy99KTtcblxuICAgIH1cbl07IiwidmFyIHByb3ZpZGVycyA9IGFuZ3VsYXIubW9kdWxlKCdhcHAucHJvdmlkZXInLCBbXSk7XG5cbi8vQ29uZmlndXJhdGlvbiBibG9ja3MgLSBnZXQgZXhlY3V0ZWQgZHVyaW5nIHRoZSBwcm92aWRlciByZWdpc3RyYXRpb25zIGFuZCBjb25maWd1cmF0aW9uIHBoYXNlLiBPbmx5IHByb3ZpZGVycyBhbmQgY29uc3RhbnRzIGNhbiBiZSBpbmplY3RlZCBpbnRvIGNvbmZpZ3VyYXRpb24gYmxvY2tzLiBUaGlzIGlzIHRvIHByZXZlbnQgYWNjaWRlbnRhbCBpbnN0YW50aWF0aW9uIG9mIHNlcnZpY2VzIGJlZm9yZSB0aGV5IGhhdmUgYmVlbiBmdWxseSBjb25maWd1cmVkLlxuXG5wcm92aWRlcnNcbiAgICAucHJvdmlkZXIoJ2lzSW5BcHAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJGdldCA9IFsnJHEnLCBmdW5jdGlvbiAoJHEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAvL2lmIChpbnRlcm5hbC5pc0luQXBwKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgLy99IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgZGVmZXJyZWQucmVqZWN0KHsgbmVlZEluQXBwOiB0cnVlIH0pO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfV07XG4gICAgfVxuKVxuICAgIC5wcm92aWRlcignaXNMb2dnZWRJbicsIGZ1bmN0aW9uICgpIHsgIC8v5piv5ZCm55m76ZmGXG4gICAgICAgIHRoaXMuJGdldCA9IFsnJHEnLCAnYXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJHEsIGF1dGhTZXJ2aWNlKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgaWYgKGF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoeyBuZWVkc0F1dGhlbnRpY2F0aW9uOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1dO1xuICAgIH1cbik7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBwcm92aWRlcnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJHEnLCAnJGh0dHAnLFxuICAgIGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcblxuICAgICAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uIChodHRwUGFyYW1zKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSwgaGVhZGVyUmVxZGF0YTtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBkYXRhID0gbmF0aXZlUGx1Z2luLmdldFNlcnZpY2VSZXF1ZXN0KGh0dHBQYXJhbXMuc2VydmljZU5hbWUsIGh0dHBQYXJhbXMuc2VydmljZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyUmVxZGF0YSA9IG5hdGl2ZVBsdWdpbi5lbmNvZGVSZXF1ZXN0KGRhdGEpO1xuICAgICAgICAgICAgfWNhdGNoKGUpe31cblxuXG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICB2YXIgbmV3SHR0cFBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IGh0dHBQYXJhbXMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiAgaHR0cFBhcmFtcy5jYWNoZSB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiBodHRwUGFyYW1zLnRpbWVvdXQgfHwgZGVmZXIucHJvbWlzZSB8fCAxNTAwMCAsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogaHR0cFBhcmFtcy5zdWNjZXNzIHx8IGFuZ3VsYXIubm9vcCxcbiAgICAgICAgICAgICAgICBlcnJvcjogaHR0cFBhcmFtcy5lcnJvciB8fCBhbmd1bGFyLm5vb3AsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGh0dHBQYXJhbXMuY29tcGxldGUgfHwgYW5ndWxhci5ub29wLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICByZXFkYXRhOiBoZWFkZXJSZXFkYXRhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuXG5cblxuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSAkaHR0cChuZXdIdHRwUGFyYW1zKTsgIC8vcmVxdXJlc3TkuLrkuIDkuKpkZWZlci5wcm9taXNlXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHJlcXVlc3Quc3VjY2VzcyhcbiAgICAgICAgICAgICAgICBodHRwUGFyYW1zLnN1Y2Nlc3NcbiAgICAgICAgICAgICkuZXJyb3IoXG4gICAgICAgICAgICAgICAgaHR0cFBhcmFtcy5lcnJvclxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcHJvbWlzZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGZpbmFsbHkoXG4gICAgICAgICAgICAgICAgICAgIGh0dHBQYXJhbXMuY29tcGxldGVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UuYWJvcnQgPSBhbmd1bGFyLm5vb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlciA9IHJlcXVlc3QgPSBwcm9taXNlID0gbnVsbDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGdldERhdGE7XG4gICAgfVxuXTtcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cblxudmFyIGFuY2hvclNtb290aFNjcm9sbCA9IGZ1bmN0aW9uICgkdGltZW91dCkge1xuXG4gICAgdGhpcy5zY3JvbGxUbyA9IGZ1bmN0aW9uIChlSUQsIHNjcm9sbEFyZWEpIHtcblxuICAgICAgICB2YXIgc3RhcnRZID0gc2Nyb2xsQXJlYS5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgIHN0b3BZID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZUlEKS5vZmZzZXRUb3AgLSA0NixcbiAgICAgICAgICAgICAgbWF4U3RvcFkgPSBzY3JvbGxBcmVhLnNjcm9sbEhlaWdodCAtIGdldEhlaWdodChzY3JvbGxBcmVhKSxcbiAgICAgICAgICAgICAgZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgIGlmIChzdG9wWSA+IG1heFN0b3BZKSBzdG9wWSA9IG1heFN0b3BZO1xuICAgICAgICBpZiAoc3RvcFkgPCAwKSBzdG9wWSA9IDA7XG4gICAgICAgIGRpc3RhbmNlID0gc3RvcFkgPiBzdGFydFkgPyBzdG9wWSAtIHN0YXJ0WSA6IHN0YXJ0WSAtIHN0b3BZO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzID0gODAsIHNzID0gMjA7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IDIwMCkge1xuICAgICAgICAgICAgcyA9IDU7XG4gICAgICAgICAgICBzcyA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzcGVlZCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyBzKTtcbiAgICAgICAgaWYgKHNwZWVkID49IDIwKSBzcGVlZCA9IDIwO1xuICAgICAgICB2YXIgc3RlcCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyBzcyk7XG4gICAgICAgIHZhciBsZWFwWSA9IHN0b3BZID4gc3RhcnRZID8gc3RhcnRZICsgc3RlcCA6IHN0YXJ0WSAtIHN0ZXA7XG4gICAgICAgIHZhciB0aW1lciA9IDA7XG4gICAgICAgIGlmIChzdG9wWSA+IHN0YXJ0WSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0WTsgaSA8IHN0b3BZOyBpICs9IHN0ZXApIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGNsb3N1cmVZKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEFyZWEuc2Nyb2xsVG9wID0gY2xvc3VyZVk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRpbWVyICogc3BlZWQpO1xuICAgICAgICAgICAgICAgIH0obGVhcFkpKTtcblxuICAgICAgICAgICAgICAgIGxlYXBZICs9IHN0ZXA7IGlmIChsZWFwWSA+IHN0b3BZKSBsZWFwWSA9IHN0b3BZOyB0aW1lcisrO1xuICAgICAgICAgICAgfSByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0WTsgaSA+IHN0b3BZOyBpIC09IHN0ZXApIHtcbiAgICAgICAgICAgIChmdW5jdGlvbiAoY2xvc3VyZVkpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEFyZWEuc2Nyb2xsVG9wID0gY2xvc3VyZVk7XG4gICAgICAgICAgICAgICAgfSwgdGltZXIgKiBzcGVlZCk7XG4gICAgICAgICAgICB9KGxlYXBZKSk7XG5cbiAgICAgICAgICAgIGxlYXBZIC09IHN0ZXA7IGlmIChsZWFwWSA8IHN0b3BZKSBsZWFwWSA9IHN0b3BZOyB0aW1lcisrO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEhlaWdodChlbGUpe1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGVsZS5jdXJyZW50U3R5bGU/IGVsZS5jdXJyZW50U3R5bGUgOiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGUsIG51bGwpLmhlaWdodCkgfHwgMDtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJHRpbWVvdXQnLCBhbmNob3JTbW9vdGhTY3JvbGxdOyIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgdmFsaWRhdGVMb2dpbiA9ICBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNBdXRoZW50aWNhdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIHVzZXIgaXMgbG9nZ2VkIGluLlxuICAgICAgICAgICAgcmV0dXJuICRyb290U2NvcGUuaXNMb2dnZWRJbjtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJHJvb3RTY29wZScsIHZhbGlkYXRlTG9naW5dOyIsIi8qKlxuICogIEBicmllZiAg5pel5pyf5oiW5pe26Ze05bCP5LqOMOeahOWJjemdouWKoDBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaWYgKGkgPCAxMCAmJiBpID49IDApIHtcbiAgICAgICAgICAgIGkgPSAnMCcgKyBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpO1xuICAgIH07XG59XTtcblxuIiwiLyoqXG4gKiAgQGJyaWVmIOi9rOaNouWtl+espuaNojIwMTQtMDgtMjggMTc6MDA6MDDmiJDml6XmnJ/miJbml7bpl7TmiLNcbiAqICBAZGVzY3JpcHRpb25cbiAqICBAbWV0aG9kIGlzVmFsaWRUaW1lIOaYr+WQpuS4uuWtl+espuS4suaXpeacn1xuICogIEBtZXRob2QgdG9EYXRlIOi9rOaNouS4uuaXtumXtFxuICogIEBtZXRob2QgdG9Vbml4IOi9rOaNouS4uuaXtumXtOaIs1xuICogIEBhdXRob3Ig6YOt5riFXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBpc1ZhbGlkVGltZSh0aW1lKSB7XG4gICAgaWYodHlwZW9mKHRpbWUpID09ICdzdHJpbmcnICYmIHRpbWUpcmV0dXJuIHRydWU7XG59XG5cblxuLy/ov5Tlm57ml6XmnJ9cbmZ1bmN0aW9uIHRvRGF0ZSh0aW1lKSB7IC8vdGltZSAyMDE0LTA4LTI4IDE3OjAwOjAwXG4gICAgaWYoaXNWYWxpZFRpbWUodGltZSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRpbWUucmVwbGFjZSgvLS9nLCAnLycpKTsgLy8yMDE0LzA4LzI4IDE3OjAwOjAwXG4gICAgfVxufVxuXG4vL+i/lOWbnuaXtumXtOaIs1xuZnVuY3Rpb24gdG9Vbml4KHRpbWUpIHtcbiAgICBpZihpc1ZhbGlkVGltZSh0aW1lKSkge1xuICAgICAgICByZXR1cm4gdG9EYXRlKHRpbWUpLmdldFRpbWUoKTsgLy8xOTU2NTg3NDEwMDBcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvRGF0ZTogdG9EYXRlLFxuICAgICAgICB0b1VuaXg6IHRvVW5peFxuICAgIH1cbn1dO1xuXG5cblxuIiwiLyoqXG4gKiDmsb3ovabnpajml6XmnJ/ooajmoLznmoTml6XmnJ/ojIPlm7RcbiAqICBAcmV0dXJuIHtPYmplY3R9XG4gKiAgc3RhcnQg5byA5aeL5pel5pyfXG4gKiAgZW5kIOe7k+adn+aXpeacn1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBbZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRlbXBEYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgc3RhcnREYXRlVW5peCA9IG5ldyBEYXRlKHRlbXBEYXRlLmdldEZ1bGxZZWFyKCksIHRlbXBEYXRlLmdldE1vbnRoKCksIHRlbXBEYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpLFxuICAgICAgICBlbmREYXRlVW5peCA9IG5ldyBEYXRlKHRlbXBEYXRlLmdldEZ1bGxZZWFyKCksIHRlbXBEYXRlLmdldE1vbnRoKCksIHRlbXBEYXRlLmdldERhdGUoKSArIDkpLmdldFRpbWUoKTsgIC8v6KGo56S65Y+v6YCJ6IyD5Zu05Li6MTDlpKnkuYvlhoXnmoTovabnpahcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydERhdGVVbml4OiBzdGFydERhdGVVbml4LFxuICAgICAgICBlbmREYXRlVW5peDogZW5kRGF0ZVVuaXhcbiAgICB9XG59XTtcblxuXG4iLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIOWtmOWCqOWOhuWPsuiusOW9lVxuICogKi9cblxuXG52YXIgaGlzdG9yeVJlY29yZHMgPSBmdW5jdGlvbiAoJGxvY2FsU3RvcmFnZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKHN0b3JlS2V5LCBzdG9yZVZhbHVlLCBtYXhsZW5ndGgpIHtcbiAgICAgICAgICAgIG1heGxlbmd0aCA9IG1heGxlbmd0aCA/IG1heGxlbmd0aCA6IDU7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNTdHJpbmcoc3RvcmVLZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdrZXkgbWFzdCBiZSBhIHN0cmluZycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGlzdG9yeVJlY29yZHMgPSAkbG9jYWxTdG9yYWdlW3N0b3JlS2V5XTtcbiAgICAgICAgICAgIGlmIChoaXN0b3J5UmVjb3Jkcykge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLnRvSnNvbihoaXN0b3J5UmVjb3JkcykuaW5kZXhPZiggIGFuZ3VsYXIudG9Kc29uKHN0b3JlVmFsdWUpICkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpc3RvcnlSZWNvcmRzLmxlbmd0aCA+PSBtYXhsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnlSZWNvcmRzLnNwbGljZShoaXN0b3J5UmVjb3Jkcy5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5UmVjb3Jkcy51bnNoaWZ0KHN0b3JlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAkbG9jYWxTdG9yYWdlW3N0b3JlS2V5XSA9IGhpc3RvcnlSZWNvcmRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGxvY2FsU3RvcmFnZVtzdG9yZUtleV0gPSBbc3RvcmVWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gKHN0b3JlS2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gJGxvY2FsU3RvcmFnZVtzdG9yZUtleV07XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKHN0b3JlS2V5KSB7XG4gICAgICAgICAgICBkZWxldGUgJGxvY2FsU3RvcmFnZVtzdG9yZUtleV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJGxvY2FsU3RvcmFnZScsIGhpc3RvcnlSZWNvcmRzIF07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiDlrZjlgqjor7fmsYLmlbDmja5cbiAqICovXG5cblxudmFyIGh0dHBDYWNoZURhdGEgPSBmdW5jdGlvbiAoJGNhY2hlRmFjdG9yeSkge1xuICAgIHJldHVybiAkY2FjaGVGYWN0b3J5KCdodHRwQ2FjaGVEYXRhJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFsnJGNhY2hlRmFjdG9yeScsIGh0dHBDYWNoZURhdGFdOyIsInZhciBzZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbXSk7XG5cblxuXG5zZXJ2aWNlc1xuICAgIC8vLmZhY3RvcnkoJ2FwaScsIHJlcXVpcmUoJy4vYXBpJykpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WQjuWPsOaOpeWPo+WcsOWdgFxuICAgIC5mYWN0b3J5KCdhdXRoU2VydmljZScsIHJlcXVpcmUoJy4vYXV0aFNlcnZpY2UnKSkgICAgICAgICAgICAgLy/liKTmlq3nlKjmiLfmmK/lkKbnmbvpmYZcbiAgICAuZmFjdG9yeSgnYXV0aFNlcnZpY2UnLCByZXF1aXJlKCcuL2F1dGhTZXJ2aWNlJykpICAgICAgICAgICAgIC8v5Yik5pat55So5oi35piv5ZCm55m76ZmGXG4gICAgLmZhY3RvcnkoJ25hdicsIHJlcXVpcmUoJy4vbmF2JykpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mhtemdouWvvOiIqlxuICAgIC5zZXJ2aWNlKCdoaXN0b3J5UmVjb3JkcycsIHJlcXVpcmUoJy4vaGlzdG9yeVJlY29yZHMnKSkgICAgICAgLy/ljoblj7LorrDlvZVcbiAgICAuZmFjdG9yeSgnbmV4dXMnLCByZXF1aXJlKCcuL25leHVzJykpICAgICAgICAgICAgICAgICAgICAgICAgIC8v5a2Y5YKoc2NvcGXkuK3nmoTmlbDmja5cbiAgICAuc2VydmljZSgnbG9hZGluZycsIHJlcXVpcmUoJy4vbG9hZGluZycpKSAgICAgICAgICAgICAgICAgICAgIC8v5q2j5Zyo5Yqg6L295o+Q56S65qGGXG4gICAgLnNlcnZpY2UoJ2RhdGVSYW5nZScsIHJlcXVpcmUoJy4vZGF0ZVJhbmdlJykpICAgICAgICAgICAgICAgICAvL+axvei9puelqOaXpeacn+ihqOagvOeahOaXpeacn+iMg+WbtFxuICAgIC5zZXJ2aWNlKCd2YWxpZGF0ZScsIHJlcXVpcmUoJy4vdmFsaWRhdGUnKSkgICAgICAgICAgICAgICAgICAgLy/miYvmnLrlj7fnrYnpqozor4FcbiAgIC5zZXJ2aWNlKCdhbmNob3JTbW9vdGhTY3JvbGwnLCByZXF1aXJlKCcuL2FuY2hvclNtb290aFNjcm9sbCcpKVxuICAgIC5mYWN0b3J5KCdBSkFYJywgcmVxdWlyZSgnLi9BSkFYJykpICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BSkFYXG4gICAgLy8uZmFjdG9yeSgnU0VSVkVSREFURScsIHJlcXVpcmUoJy4vU0VSVkVSREFURScpKSAgICAgICAgICAgICAgLy/ojrflj5bmnI3liqHlmajml7bpl7RcbiAgICAuZmFjdG9yeSgnY292ZXJ0VGltZScsIHJlcXVpcmUoJy4vY292ZXJ0VGltZScpKSAgICAgICAgICAgICAgLy/ovazmjaLml7bpl7RcbiAgICAuZmFjdG9yeSgnY2hlY2tUaW1lJywgcmVxdWlyZSgnLi9jaGVja1RpbWUnKSkgICAgICAgICAgICAgIC8v6L2s5o2i5pe26Ze0XG4gICAgLy8uZmFjdG9yeSgncmVxdWVzdCcsIHJlcXVpcmUoJy4vcmVxdWVzdCcpKVxuICAgIC5mYWN0b3J5KCdodHRwQ2FjaGVEYXRhJywgcmVxdWlyZSgnLi9odHRwQ2FjaGVEYXRhJykpXG4gICAgLmZhY3RvcnkoJ3NlbGVjdENoZWNrZWQnLCByZXF1aXJlKCcuL3NlbGVjdENoZWNrZWQnKSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2aWNlczsiLCIvKipcbiAqIOaYvuekuuWSjOmakOiXj+ato+WcqOWKoOi9veaPkOekuuahhlxuICogIEByZXR1cm4ge09iamVjdH1cbiAqICBzaG93IOaYvuekuuWKoOi9vVxuICogIGhpZGUg6ZqQ6JeP5Yqg6L29XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbmZ1bmN0aW9uIGxvYWRpbmcoJHJvb3RTY29wZSkge1xuICAgIHZhciBzaG93ID0gZnVuY3Rpb24obG9hZGluZ1RleHQpIHtcbiAgICAgICAgaWYoIWxvYWRpbmdUZXh0KSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmxvYWRpbmdUZXh0ID0gJ+ato+WcqOWKoOi9vSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmxvYWRpbmdUZXh0ID0gbG9hZGluZ1RleHQ7XG4gICAgICAgIH1cbiAgICAgICAgJHJvb3RTY29wZS5zaG93TG9hZGluZyA9IHRydWU7XG4gICAgfTtcblxuICAgIHZhciBoaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRyb290U2NvcGUuc2hvd0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvdzogc2hvdyxcbiAgICAgICAgaGlkZTogaGlkZVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBbJyRyb290U2NvcGUnLCBsb2FkaW5nXTtcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gIFsnJG5hdmlnYXRlJyxcbiAgICBmdW5jdGlvbigkbmF2aWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNsaWRlUGFnZTogZnVuY3Rpb24gKHBhdGgsIGFuaW1hdGUsIHJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICBpZihyZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRuYXZpZ2F0ZS5nbyhwYXRoLCBhbmltYXRlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkbmF2aWdhdGUuZ28ocGF0aCwgYW5pbWF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkbmF2aWdhdGUuYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXTtcbiIsIi8qKlxuICog5pWw5o2u5p6i57q9LOeUqOS6juS/neaMgeWSjOS6pOaNouaVsOaNrlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwZXJzaXN0ZW50RGF0YSA9IHt9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihrZXksIG5lZWRDbG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcGVyc2lzdGVudERhdGFba2V5XTtcbi8vICAgICAgICAgICAgICAgIGlmIChuZWVkQ2xvbmUpIHtcbi8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5jb3B5KGRhdGEpO1xuLy8gICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oa2V5LCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudERhdGFba2V5XSA9IGRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnREYXRhW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnREYXRhID0ge31cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXTtcbiIsIi8qKlxuICogIEBicmllZiAgY2xpY2vkuovku7blkI7mt7vliqDmoLflvI9cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCBzdHlsZUFyciwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHN0eWxlQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZihpID09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc3R5bGVBcnJbaV0gPSBjbGFzc05hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlQXJyW2ldID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufV07XG5cbiIsIi8qKlxuICogIOmqjOivgeiEmuacrFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBbZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNNb2JpbGU6IGZ1bmN0aW9uKGUpIHsgIC8v5piv5ZCm5piv5omL5py65Y+356CBXG4gICAgICAgICAgICB2YXIgdCA9IC9eKDFbMy04XVswLTldKVxcZHs4fSQvO1xuLy8gICAgICAgICAgICAvKFsrXT84Nik/KDEzWzAtOV18MTRbNXw3XXwxNVswfDF8MnwzfDV8Nnw3fDh8OV18MThbMHwxfDJ8M3w1fDZ8N3w4fDldKVxcZHs4fS9cbiAgICAgICAgICAgIHJldHVybiB0LnRlc3QoZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKHZhbHVlKSB7IC8v5piv5ZCm5Li6IE5hTiwgdW5kZWZpbmVkLCBudWxsICwgMCAsICcnLCBmYWxzZVxuICAgICAgICAgICAgaWYodmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBpc0VtcHR5T2JqZWN0OiBmdW5jdGlvbiAoZSkgeyAgLy/mmK/lkKbkuLrnqbrlr7nosaHvvIzljIXmi6znqbrmlbDnu4RcbiAgICAgICAgICAgIGZvciAodmFyIHQgaW4gZSkgcmV0dXJuITE7XG4gICAgICAgICAgICByZXR1cm4hMFxuICAgICAgICB9XG4gICAgfVxufV07XG5cblxuIiwiLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFySlMgdjEuNC43XG4gKiAoYykgMjAxMC0yMDE1IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xuICogTGljZW5zZTogTUlUXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGFuZ3VsYXIsIHVuZGVmaW5lZCkgeyd1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdkb2MgbW9kdWxlXG4gKiBAbmFtZSBuZ1JvdXRlXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiAjIG5nUm91dGVcbiAqXG4gKiBUaGUgYG5nUm91dGVgIG1vZHVsZSBwcm92aWRlcyByb3V0aW5nIGFuZCBkZWVwbGlua2luZyBzZXJ2aWNlcyBhbmQgZGlyZWN0aXZlcyBmb3IgYW5ndWxhciBhcHBzLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIFNlZSB7QGxpbmsgbmdSb3V0ZS4kcm91dGUjZXhhbXBsZSAkcm91dGV9IGZvciBhbiBleGFtcGxlIG9mIGNvbmZpZ3VyaW5nIGFuZCB1c2luZyBgbmdSb3V0ZWAuXG4gKlxuICpcbiAqIDxkaXYgZG9jLW1vZHVsZS1jb21wb25lbnRzPVwibmdSb3V0ZVwiPjwvZGl2PlxuICovXG4gLyogZ2xvYmFsIC1uZ1JvdXRlTW9kdWxlICovXG52YXIgbmdSb3V0ZU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ1JvdXRlJywgWyduZyddKS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyKCckcm91dGUnLCAkUm91dGVQcm92aWRlciksXG4gICAgJHJvdXRlTWluRXJyID0gYW5ndWxhci4kJG1pbkVycignbmdSb3V0ZScpO1xuXG4vKipcbiAqIEBuZ2RvYyBwcm92aWRlclxuICogQG5hbWUgJHJvdXRlUHJvdmlkZXJcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBVc2VkIGZvciBjb25maWd1cmluZyByb3V0ZXMuXG4gKlxuICogIyMgRXhhbXBsZVxuICogU2VlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSNleGFtcGxlICRyb3V0ZX0gZm9yIGFuIGV4YW1wbGUgb2YgY29uZmlndXJpbmcgYW5kIHVzaW5nIGBuZ1JvdXRlYC5cbiAqXG4gKiAjIyBEZXBlbmRlbmNpZXNcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSb3V0ZSBgbmdSb3V0ZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gKi9cbmZ1bmN0aW9uICRSb3V0ZVByb3ZpZGVyKCkge1xuICBmdW5jdGlvbiBpbmhlcml0KHBhcmVudCwgZXh0cmEpIHtcbiAgICByZXR1cm4gYW5ndWxhci5leHRlbmQoT2JqZWN0LmNyZWF0ZShwYXJlbnQpLCBleHRyYSk7XG4gIH1cblxuICB2YXIgcm91dGVzID0ge307XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBtZXRob2RcbiAgICogQG5hbWUgJHJvdXRlUHJvdmlkZXIjd2hlblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBSb3V0ZSBwYXRoIChtYXRjaGVkIGFnYWluc3QgYCRsb2NhdGlvbi5wYXRoYCkuIElmIGAkbG9jYXRpb24ucGF0aGBcbiAgICogICAgY29udGFpbnMgcmVkdW5kYW50IHRyYWlsaW5nIHNsYXNoIG9yIGlzIG1pc3Npbmcgb25lLCB0aGUgcm91dGUgd2lsbCBzdGlsbCBtYXRjaCBhbmQgdGhlXG4gICAqICAgIGAkbG9jYXRpb24ucGF0aGAgd2lsbCBiZSB1cGRhdGVkIHRvIGFkZCBvciBkcm9wIHRoZSB0cmFpbGluZyBzbGFzaCB0byBleGFjdGx5IG1hdGNoIHRoZVxuICAgKiAgICByb3V0ZSBkZWZpbml0aW9uLlxuICAgKlxuICAgKiAgICAqIGBwYXRoYCBjYW4gY29udGFpbiBuYW1lZCBncm91cHMgc3RhcnRpbmcgd2l0aCBhIGNvbG9uOiBlLmcuIGA6bmFtZWAuIEFsbCBjaGFyYWN0ZXJzIHVwXG4gICAqICAgICAgICB0byB0aGUgbmV4dCBzbGFzaCBhcmUgbWF0Y2hlZCBhbmQgc3RvcmVkIGluIGAkcm91dGVQYXJhbXNgIHVuZGVyIHRoZSBnaXZlbiBgbmFtZWBcbiAgICogICAgICAgIHdoZW4gdGhlIHJvdXRlIG1hdGNoZXMuXG4gICAqICAgICogYHBhdGhgIGNhbiBjb250YWluIG5hbWVkIGdyb3VwcyBzdGFydGluZyB3aXRoIGEgY29sb24gYW5kIGVuZGluZyB3aXRoIGEgc3RhcjpcbiAgICogICAgICAgIGUuZy5gOm5hbWUqYC4gQWxsIGNoYXJhY3RlcnMgYXJlIGVhZ2VybHkgc3RvcmVkIGluIGAkcm91dGVQYXJhbXNgIHVuZGVyIHRoZSBnaXZlbiBgbmFtZWBcbiAgICogICAgICAgIHdoZW4gdGhlIHJvdXRlIG1hdGNoZXMuXG4gICAqICAgICogYHBhdGhgIGNhbiBjb250YWluIG9wdGlvbmFsIG5hbWVkIGdyb3VwcyB3aXRoIGEgcXVlc3Rpb24gbWFyazogZS5nLmA6bmFtZT9gLlxuICAgKlxuICAgKiAgICBGb3IgZXhhbXBsZSwgcm91dGVzIGxpa2UgYC9jb2xvci86Y29sb3IvbGFyZ2Vjb2RlLzpsYXJnZWNvZGUqXFwvZWRpdGAgd2lsbCBtYXRjaFxuICAgKiAgICBgL2NvbG9yL2Jyb3duL2xhcmdlY29kZS9jb2RlL3dpdGgvc2xhc2hlcy9lZGl0YCBhbmQgZXh0cmFjdDpcbiAgICpcbiAgICogICAgKiBgY29sb3I6IGJyb3duYFxuICAgKiAgICAqIGBsYXJnZWNvZGU6IGNvZGUvd2l0aC9zbGFzaGVzYC5cbiAgICpcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHJvdXRlIE1hcHBpbmcgaW5mb3JtYXRpb24gdG8gYmUgYXNzaWduZWQgdG8gYCRyb3V0ZS5jdXJyZW50YCBvbiByb3V0ZVxuICAgKiAgICBtYXRjaC5cbiAgICpcbiAgICogICAgT2JqZWN0IHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAgIC0gYGNvbnRyb2xsZXJgIOKAkyBgeyhzdHJpbmd8ZnVuY3Rpb24oKT19YCDigJMgQ29udHJvbGxlciBmbiB0aGF0IHNob3VsZCBiZSBhc3NvY2lhdGVkIHdpdGhcbiAgICogICAgICBuZXdseSBjcmVhdGVkIHNjb3BlIG9yIHRoZSBuYW1lIG9mIGEge0BsaW5rIGFuZ3VsYXIuTW9kdWxlI2NvbnRyb2xsZXIgcmVnaXN0ZXJlZFxuICAgKiAgICAgIGNvbnRyb2xsZXJ9IGlmIHBhc3NlZCBhcyBhIHN0cmluZy5cbiAgICogICAgLSBgY29udHJvbGxlckFzYCDigJMgYHtzdHJpbmc9fWAg4oCTIEFuIGlkZW50aWZpZXIgbmFtZSBmb3IgYSByZWZlcmVuY2UgdG8gdGhlIGNvbnRyb2xsZXIuXG4gICAqICAgICAgSWYgcHJlc2VudCwgdGhlIGNvbnRyb2xsZXIgd2lsbCBiZSBwdWJsaXNoZWQgdG8gc2NvcGUgdW5kZXIgdGhlIGBjb250cm9sbGVyQXNgIG5hbWUuXG4gICAqICAgIC0gYHRlbXBsYXRlYCDigJMgYHtzdHJpbmc9fGZ1bmN0aW9uKCk9fWAg4oCTIGh0bWwgdGVtcGxhdGUgYXMgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAqICAgICAgcmV0dXJucyBhbiBodG1sIHRlbXBsYXRlIGFzIGEgc3RyaW5nIHdoaWNoIHNob3VsZCBiZSB1c2VkIGJ5IHtAbGlua1xuICAgKiAgICAgIG5nUm91dGUuZGlyZWN0aXZlOm5nVmlldyBuZ1ZpZXd9IG9yIHtAbGluayBuZy5kaXJlY3RpdmU6bmdJbmNsdWRlIG5nSW5jbHVkZX0gZGlyZWN0aXZlcy5cbiAgICogICAgICBUaGlzIHByb3BlcnR5IHRha2VzIHByZWNlZGVuY2Ugb3ZlciBgdGVtcGxhdGVVcmxgLlxuICAgKlxuICAgKiAgICAgIElmIGB0ZW1wbGF0ZWAgaXMgYSBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gICAqXG4gICAqICAgICAgLSBge0FycmF5LjxPYmplY3Q+fWAgLSByb3V0ZSBwYXJhbWV0ZXJzIGV4dHJhY3RlZCBmcm9tIHRoZSBjdXJyZW50XG4gICAqICAgICAgICBgJGxvY2F0aW9uLnBhdGgoKWAgYnkgYXBwbHlpbmcgdGhlIGN1cnJlbnQgcm91dGVcbiAgICpcbiAgICogICAgLSBgdGVtcGxhdGVVcmxgIOKAkyBge3N0cmluZz18ZnVuY3Rpb24oKT19YCDigJMgcGF0aCBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwYXRoIHRvIGFuIGh0bWxcbiAgICogICAgICB0ZW1wbGF0ZSB0aGF0IHNob3VsZCBiZSB1c2VkIGJ5IHtAbGluayBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgbmdWaWV3fS5cbiAgICpcbiAgICogICAgICBJZiBgdGVtcGxhdGVVcmxgIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICAgKlxuICAgKiAgICAgIC0gYHtBcnJheS48T2JqZWN0Pn1gIC0gcm91dGUgcGFyYW1ldGVycyBleHRyYWN0ZWQgZnJvbSB0aGUgY3VycmVudFxuICAgKiAgICAgICAgYCRsb2NhdGlvbi5wYXRoKClgIGJ5IGFwcGx5aW5nIHRoZSBjdXJyZW50IHJvdXRlXG4gICAqXG4gICAqICAgIC0gYHJlc29sdmVgIC0gYHtPYmplY3QuPHN0cmluZywgZnVuY3Rpb24+PX1gIC0gQW4gb3B0aW9uYWwgbWFwIG9mIGRlcGVuZGVuY2llcyB3aGljaCBzaG91bGRcbiAgICogICAgICBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb250cm9sbGVyLiBJZiBhbnkgb2YgdGhlc2UgZGVwZW5kZW5jaWVzIGFyZSBwcm9taXNlcywgdGhlIHJvdXRlclxuICAgKiAgICAgIHdpbGwgd2FpdCBmb3IgdGhlbSBhbGwgdG8gYmUgcmVzb2x2ZWQgb3Igb25lIHRvIGJlIHJlamVjdGVkIGJlZm9yZSB0aGUgY29udHJvbGxlciBpc1xuICAgKiAgICAgIGluc3RhbnRpYXRlZC5cbiAgICogICAgICBJZiBhbGwgdGhlIHByb21pc2VzIGFyZSByZXNvbHZlZCBzdWNjZXNzZnVsbHksIHRoZSB2YWx1ZXMgb2YgdGhlIHJlc29sdmVkIHByb21pc2VzIGFyZVxuICAgKiAgICAgIGluamVjdGVkIGFuZCB7QGxpbmsgbmdSb3V0ZS4kcm91dGUjJHJvdXRlQ2hhbmdlU3VjY2VzcyAkcm91dGVDaGFuZ2VTdWNjZXNzfSBldmVudCBpc1xuICAgKiAgICAgIGZpcmVkLiBJZiBhbnkgb2YgdGhlIHByb21pc2VzIGFyZSByZWplY3RlZCB0aGVcbiAgICogICAgICB7QGxpbmsgbmdSb3V0ZS4kcm91dGUjJHJvdXRlQ2hhbmdlRXJyb3IgJHJvdXRlQ2hhbmdlRXJyb3J9IGV2ZW50IGlzIGZpcmVkLiBUaGUgbWFwIG9iamVjdFxuICAgKiAgICAgIGlzOlxuICAgKlxuICAgKiAgICAgIC0gYGtleWAg4oCTIGB7c3RyaW5nfWA6IGEgbmFtZSBvZiBhIGRlcGVuZGVuY3kgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgY29udHJvbGxlci5cbiAgICogICAgICAtIGBmYWN0b3J5YCAtIGB7c3RyaW5nfGZ1bmN0aW9ufWA6IElmIGBzdHJpbmdgIHRoZW4gaXQgaXMgYW4gYWxpYXMgZm9yIGEgc2VydmljZS5cbiAgICogICAgICAgIE90aGVyd2lzZSBpZiBmdW5jdGlvbiwgdGhlbiBpdCBpcyB7QGxpbmsgYXV0by4kaW5qZWN0b3IjaW52b2tlIGluamVjdGVkfVxuICAgKiAgICAgICAgYW5kIHRoZSByZXR1cm4gdmFsdWUgaXMgdHJlYXRlZCBhcyB0aGUgZGVwZW5kZW5jeS4gSWYgdGhlIHJlc3VsdCBpcyBhIHByb21pc2UsIGl0IGlzXG4gICAqICAgICAgICByZXNvbHZlZCBiZWZvcmUgaXRzIHZhbHVlIGlzIGluamVjdGVkIGludG8gdGhlIGNvbnRyb2xsZXIuIEJlIGF3YXJlIHRoYXRcbiAgICogICAgICAgIGBuZ1JvdXRlLiRyb3V0ZVBhcmFtc2Agd2lsbCBzdGlsbCByZWZlciB0byB0aGUgcHJldmlvdXMgcm91dGUgd2l0aGluIHRoZXNlIHJlc29sdmVcbiAgICogICAgICAgIGZ1bmN0aW9ucy4gIFVzZSBgJHJvdXRlLmN1cnJlbnQucGFyYW1zYCB0byBhY2Nlc3MgdGhlIG5ldyByb3V0ZSBwYXJhbWV0ZXJzLCBpbnN0ZWFkLlxuICAgKlxuICAgKiAgICAtIGByZWRpcmVjdFRvYCDigJMgeyhzdHJpbmd8ZnVuY3Rpb24oKSk9fSDigJMgdmFsdWUgdG8gdXBkYXRlXG4gICAqICAgICAge0BsaW5rIG5nLiRsb2NhdGlvbiAkbG9jYXRpb259IHBhdGggd2l0aCBhbmQgdHJpZ2dlciByb3V0ZSByZWRpcmVjdGlvbi5cbiAgICpcbiAgICogICAgICBJZiBgcmVkaXJlY3RUb2AgaXMgYSBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gICAqXG4gICAqICAgICAgLSBge09iamVjdC48c3RyaW5nPn1gIC0gcm91dGUgcGFyYW1ldGVycyBleHRyYWN0ZWQgZnJvbSB0aGUgY3VycmVudFxuICAgKiAgICAgICAgYCRsb2NhdGlvbi5wYXRoKClgIGJ5IGFwcGx5aW5nIHRoZSBjdXJyZW50IHJvdXRlIHRlbXBsYXRlVXJsLlxuICAgKiAgICAgIC0gYHtzdHJpbmd9YCAtIGN1cnJlbnQgYCRsb2NhdGlvbi5wYXRoKClgXG4gICAqICAgICAgLSBge09iamVjdH1gIC0gY3VycmVudCBgJGxvY2F0aW9uLnNlYXJjaCgpYFxuICAgKlxuICAgKiAgICAgIFRoZSBjdXN0b20gYHJlZGlyZWN0VG9gIGZ1bmN0aW9uIGlzIGV4cGVjdGVkIHRvIHJldHVybiBhIHN0cmluZyB3aGljaCB3aWxsIGJlIHVzZWRcbiAgICogICAgICB0byB1cGRhdGUgYCRsb2NhdGlvbi5wYXRoKClgIGFuZCBgJGxvY2F0aW9uLnNlYXJjaCgpYC5cbiAgICpcbiAgICogICAgLSBgW3JlbG9hZE9uU2VhcmNoPXRydWVdYCAtIHtib29sZWFuPX0gLSByZWxvYWQgcm91dGUgd2hlbiBvbmx5IGAkbG9jYXRpb24uc2VhcmNoKClgXG4gICAqICAgICAgb3IgYCRsb2NhdGlvbi5oYXNoKClgIGNoYW5nZXMuXG4gICAqXG4gICAqICAgICAgSWYgdGhlIG9wdGlvbiBpcyBzZXQgdG8gYGZhbHNlYCBhbmQgdXJsIGluIHRoZSBicm93c2VyIGNoYW5nZXMsIHRoZW5cbiAgICogICAgICBgJHJvdXRlVXBkYXRlYCBldmVudCBpcyBicm9hZGNhc3RlZCBvbiB0aGUgcm9vdCBzY29wZS5cbiAgICpcbiAgICogICAgLSBgW2Nhc2VJbnNlbnNpdGl2ZU1hdGNoPWZhbHNlXWAgLSB7Ym9vbGVhbj19IC0gbWF0Y2ggcm91dGVzIHdpdGhvdXQgYmVpbmcgY2FzZSBzZW5zaXRpdmVcbiAgICpcbiAgICogICAgICBJZiB0aGUgb3B0aW9uIGlzIHNldCB0byBgdHJ1ZWAsIHRoZW4gdGhlIHBhcnRpY3VsYXIgcm91dGUgY2FuIGJlIG1hdGNoZWQgd2l0aG91dCBiZWluZ1xuICAgKiAgICAgIGNhc2Ugc2Vuc2l0aXZlXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlbGZcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFkZHMgYSBuZXcgcm91dGUgZGVmaW5pdGlvbiB0byB0aGUgYCRyb3V0ZWAgc2VydmljZS5cbiAgICovXG4gIHRoaXMud2hlbiA9IGZ1bmN0aW9uKHBhdGgsIHJvdXRlKSB7XG4gICAgLy9jb3B5IG9yaWdpbmFsIHJvdXRlIG9iamVjdCB0byBwcmVzZXJ2ZSBwYXJhbXMgaW5oZXJpdGVkIGZyb20gcHJvdG8gY2hhaW5cbiAgICB2YXIgcm91dGVDb3B5ID0gYW5ndWxhci5jb3B5KHJvdXRlKTtcbiAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChyb3V0ZUNvcHkucmVsb2FkT25TZWFyY2gpKSB7XG4gICAgICByb3V0ZUNvcHkucmVsb2FkT25TZWFyY2ggPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChyb3V0ZUNvcHkuY2FzZUluc2Vuc2l0aXZlTWF0Y2gpKSB7XG4gICAgICByb3V0ZUNvcHkuY2FzZUluc2Vuc2l0aXZlTWF0Y2ggPSB0aGlzLmNhc2VJbnNlbnNpdGl2ZU1hdGNoO1xuICAgIH1cbiAgICByb3V0ZXNbcGF0aF0gPSBhbmd1bGFyLmV4dGVuZChcbiAgICAgIHJvdXRlQ29weSxcbiAgICAgIHBhdGggJiYgcGF0aFJlZ0V4cChwYXRoLCByb3V0ZUNvcHkpXG4gICAgKTtcblxuICAgIC8vIGNyZWF0ZSByZWRpcmVjdGlvbiBmb3IgdHJhaWxpbmcgc2xhc2hlc1xuICAgIGlmIChwYXRoKSB7XG4gICAgICB2YXIgcmVkaXJlY3RQYXRoID0gKHBhdGhbcGF0aC5sZW5ndGggLSAxXSA9PSAnLycpXG4gICAgICAgICAgICA/IHBhdGguc3Vic3RyKDAsIHBhdGgubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIDogcGF0aCArICcvJztcblxuICAgICAgcm91dGVzW3JlZGlyZWN0UGF0aF0gPSBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAge3JlZGlyZWN0VG86IHBhdGh9LFxuICAgICAgICBwYXRoUmVnRXhwKHJlZGlyZWN0UGF0aCwgcm91dGVDb3B5KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQG5nZG9jIHByb3BlcnR5XG4gICAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyI2Nhc2VJbnNlbnNpdGl2ZU1hdGNoXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBBIGJvb2xlYW4gcHJvcGVydHkgaW5kaWNhdGluZyBpZiByb3V0ZXMgZGVmaW5lZFxuICAgKiB1c2luZyB0aGlzIHByb3ZpZGVyIHNob3VsZCBiZSBtYXRjaGVkIHVzaW5nIGEgY2FzZSBpbnNlbnNpdGl2ZVxuICAgKiBhbGdvcml0aG0uIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAqL1xuICB0aGlzLmNhc2VJbnNlbnNpdGl2ZU1hdGNoID0gZmFsc2U7XG5cbiAgIC8qKlxuICAgICogQHBhcmFtIHBhdGgge3N0cmluZ30gcGF0aFxuICAgICogQHBhcmFtIG9wdHMge09iamVjdH0gb3B0aW9uc1xuICAgICogQHJldHVybiB7P09iamVjdH1cbiAgICAqXG4gICAgKiBAZGVzY3JpcHRpb25cbiAgICAqIE5vcm1hbGl6ZXMgdGhlIGdpdmVuIHBhdGgsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICogYW5kIHRoZSBvcmlnaW5hbCBwYXRoLlxuICAgICpcbiAgICAqIEluc3BpcmVkIGJ5IHBhdGhSZXhwIGluIHZpc2lvbm1lZGlhL2V4cHJlc3MvbGliL3V0aWxzLmpzLlxuICAgICovXG4gIGZ1bmN0aW9uIHBhdGhSZWdFeHAocGF0aCwgb3B0cykge1xuICAgIHZhciBpbnNlbnNpdGl2ZSA9IG9wdHMuY2FzZUluc2Vuc2l0aXZlTWF0Y2gsXG4gICAgICAgIHJldCA9IHtcbiAgICAgICAgICBvcmlnaW5hbFBhdGg6IHBhdGgsXG4gICAgICAgICAgcmVnZXhwOiBwYXRoXG4gICAgICAgIH0sXG4gICAgICAgIGtleXMgPSByZXQua2V5cyA9IFtdO1xuXG4gICAgcGF0aCA9IHBhdGhcbiAgICAgIC5yZXBsYWNlKC8oWygpLl0pL2csICdcXFxcJDEnKVxuICAgICAgLnJlcGxhY2UoLyhcXC8pPzooXFx3KykoW1xcP1xcKl0pPy9nLCBmdW5jdGlvbihfLCBzbGFzaCwga2V5LCBvcHRpb24pIHtcbiAgICAgICAgdmFyIG9wdGlvbmFsID0gb3B0aW9uID09PSAnPycgPyBvcHRpb24gOiBudWxsO1xuICAgICAgICB2YXIgc3RhciA9IG9wdGlvbiA9PT0gJyonID8gb3B0aW9uIDogbnVsbDtcbiAgICAgICAga2V5cy5wdXNoKHsgbmFtZToga2V5LCBvcHRpb25hbDogISFvcHRpb25hbCB9KTtcbiAgICAgICAgc2xhc2ggPSBzbGFzaCB8fCAnJztcbiAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgKyAob3B0aW9uYWwgPyAnJyA6IHNsYXNoKVxuICAgICAgICAgICsgJyg/OidcbiAgICAgICAgICArIChvcHRpb25hbCA/IHNsYXNoIDogJycpXG4gICAgICAgICAgKyAoc3RhciAmJiAnKC4rPyknIHx8ICcoW14vXSspJylcbiAgICAgICAgICArIChvcHRpb25hbCB8fCAnJylcbiAgICAgICAgICArICcpJ1xuICAgICAgICAgICsgKG9wdGlvbmFsIHx8ICcnKTtcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZSgvKFtcXC8kXFwqXSkvZywgJ1xcXFwkMScpO1xuXG4gICAgcmV0LnJlZ2V4cCA9IG5ldyBSZWdFeHAoJ14nICsgcGF0aCArICckJywgaW5zZW5zaXRpdmUgPyAnaScgOiAnJyk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmdkb2MgbWV0aG9kXG4gICAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyI290aGVyd2lzZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogU2V0cyByb3V0ZSBkZWZpbml0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIG9uIHJvdXRlIGNoYW5nZSB3aGVuIG5vIG90aGVyIHJvdXRlIGRlZmluaXRpb25cbiAgICogaXMgbWF0Y2hlZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBwYXJhbXMgTWFwcGluZyBpbmZvcm1hdGlvbiB0byBiZSBhc3NpZ25lZCB0byBgJHJvdXRlLmN1cnJlbnRgLlxuICAgKiBJZiBjYWxsZWQgd2l0aCBhIHN0cmluZywgdGhlIHZhbHVlIG1hcHMgdG8gYHJlZGlyZWN0VG9gLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZWxmXG4gICAqL1xuICB0aGlzLm90aGVyd2lzZSA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgcGFyYW1zID0ge3JlZGlyZWN0VG86IHBhcmFtc307XG4gICAgfVxuICAgIHRoaXMud2hlbihudWxsLCBwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG5cbiAgdGhpcy4kZ2V0ID0gWyckcm9vdFNjb3BlJyxcbiAgICAgICAgICAgICAgICckbG9jYXRpb24nLFxuICAgICAgICAgICAgICAgJyRyb3V0ZVBhcmFtcycsXG4gICAgICAgICAgICAgICAnJHEnLFxuICAgICAgICAgICAgICAgJyRpbmplY3RvcicsXG4gICAgICAgICAgICAgICAnJHRlbXBsYXRlUmVxdWVzdCcsXG4gICAgICAgICAgICAgICAnJHNjZScsXG4gICAgICBmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRyb3V0ZVBhcmFtcywgJHEsICRpbmplY3RvciwgJHRlbXBsYXRlUmVxdWVzdCwgJHNjZSkge1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIHNlcnZpY2VcbiAgICAgKiBAbmFtZSAkcm91dGVcbiAgICAgKiBAcmVxdWlyZXMgJGxvY2F0aW9uXG4gICAgICogQHJlcXVpcmVzICRyb3V0ZVBhcmFtc1xuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IGN1cnJlbnQgUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvdXRlIGRlZmluaXRpb24uXG4gICAgICogVGhlIHJvdXRlIGRlZmluaXRpb24gY29udGFpbnM6XG4gICAgICpcbiAgICAgKiAgIC0gYGNvbnRyb2xsZXJgOiBUaGUgY29udHJvbGxlciBjb25zdHJ1Y3RvciBhcyBkZWZpbmUgaW4gcm91dGUgZGVmaW5pdGlvbi5cbiAgICAgKiAgIC0gYGxvY2Fsc2A6IEEgbWFwIG9mIGxvY2FscyB3aGljaCBpcyB1c2VkIGJ5IHtAbGluayBuZy4kY29udHJvbGxlciAkY29udHJvbGxlcn0gc2VydmljZSBmb3JcbiAgICAgKiAgICAgY29udHJvbGxlciBpbnN0YW50aWF0aW9uLiBUaGUgYGxvY2Fsc2AgY29udGFpblxuICAgICAqICAgICB0aGUgcmVzb2x2ZWQgdmFsdWVzIG9mIHRoZSBgcmVzb2x2ZWAgbWFwLiBBZGRpdGlvbmFsbHkgdGhlIGBsb2NhbHNgIGFsc28gY29udGFpbjpcbiAgICAgKlxuICAgICAqICAgICAtIGAkc2NvcGVgIC0gVGhlIGN1cnJlbnQgcm91dGUgc2NvcGUuXG4gICAgICogICAgIC0gYCR0ZW1wbGF0ZWAgLSBUaGUgY3VycmVudCByb3V0ZSB0ZW1wbGF0ZSBIVE1MLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IHJvdXRlcyBPYmplY3Qgd2l0aCBhbGwgcm91dGUgY29uZmlndXJhdGlvbiBPYmplY3RzIGFzIGl0cyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogYCRyb3V0ZWAgaXMgdXNlZCBmb3IgZGVlcC1saW5raW5nIFVSTHMgdG8gY29udHJvbGxlcnMgYW5kIHZpZXdzIChIVE1MIHBhcnRpYWxzKS5cbiAgICAgKiBJdCB3YXRjaGVzIGAkbG9jYXRpb24udXJsKClgIGFuZCB0cmllcyB0byBtYXAgdGhlIHBhdGggdG8gYW4gZXhpc3Rpbmcgcm91dGUgZGVmaW5pdGlvbi5cbiAgICAgKlxuICAgICAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSb3V0ZSBgbmdSb3V0ZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIGRlZmluZSByb3V0ZXMgdGhyb3VnaCB7QGxpbmsgbmdSb3V0ZS4kcm91dGVQcm92aWRlciAkcm91dGVQcm92aWRlcn0ncyBBUEkuXG4gICAgICpcbiAgICAgKiBUaGUgYCRyb3V0ZWAgc2VydmljZSBpcyB0eXBpY2FsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxuICAgICAqIHtAbGluayBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgYG5nVmlld2B9IGRpcmVjdGl2ZSBhbmQgdGhlXG4gICAgICoge0BsaW5rIG5nUm91dGUuJHJvdXRlUGFyYW1zIGAkcm91dGVQYXJhbXNgfSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBUaGlzIGV4YW1wbGUgc2hvd3MgaG93IGNoYW5naW5nIHRoZSBVUkwgaGFzaCBjYXVzZXMgdGhlIGAkcm91dGVgIHRvIG1hdGNoIGEgcm91dGUgYWdhaW5zdCB0aGVcbiAgICAgKiBVUkwsIGFuZCB0aGUgYG5nVmlld2AgcHVsbHMgaW4gdGhlIHBhcnRpYWwuXG4gICAgICpcbiAgICAgKiA8ZXhhbXBsZSBuYW1lPVwiJHJvdXRlLXNlcnZpY2VcIiBtb2R1bGU9XCJuZ1JvdXRlRXhhbXBsZVwiXG4gICAgICogICAgICAgICAgZGVwcz1cImFuZ3VsYXItcm91dGUuanNcIiBmaXhCYXNlPVwidHJ1ZVwiPlxuICAgICAqICAgPGZpbGUgbmFtZT1cImluZGV4Lmh0bWxcIj5cbiAgICAgKiAgICAgPGRpdiBuZy1jb250cm9sbGVyPVwiTWFpbkNvbnRyb2xsZXJcIj5cbiAgICAgKiAgICAgICBDaG9vc2U6XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svTW9ieVwiPk1vYnk8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5L2NoLzFcIj5Nb2J5OiBDaDE8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnlcIj5HYXRzYnk8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnkvY2gvND9rZXk9dmFsdWVcIj5HYXRzYnk6IENoNDwvYT4gfFxuICAgICAqICAgICAgIDxhIGhyZWY9XCJCb29rL1NjYXJsZXRcIj5TY2FybGV0IExldHRlcjwvYT48YnIvPlxuICAgICAqXG4gICAgICogICAgICAgPGRpdiBuZy12aWV3PjwvZGl2PlxuICAgICAqXG4gICAgICogICAgICAgPGhyIC8+XG4gICAgICpcbiAgICAgKiAgICAgICA8cHJlPiRsb2NhdGlvbi5wYXRoKCkgPSB7eyRsb2NhdGlvbi5wYXRoKCl9fTwvcHJlPlxuICAgICAqICAgICAgIDxwcmU+JHJvdXRlLmN1cnJlbnQudGVtcGxhdGVVcmwgPSB7eyRyb3V0ZS5jdXJyZW50LnRlbXBsYXRlVXJsfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnBhcmFtcyA9IHt7JHJvdXRlLmN1cnJlbnQucGFyYW1zfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnNjb3BlLm5hbWUgPSB7eyRyb3V0ZS5jdXJyZW50LnNjb3BlLm5hbWV9fTwvcHJlPlxuICAgICAqICAgICAgIDxwcmU+JHJvdXRlUGFyYW1zID0ge3skcm91dGVQYXJhbXN9fTwvcHJlPlxuICAgICAqICAgICA8L2Rpdj5cbiAgICAgKiAgIDwvZmlsZT5cbiAgICAgKlxuICAgICAqICAgPGZpbGUgbmFtZT1cImJvb2suaHRtbFwiPlxuICAgICAqICAgICBjb250cm9sbGVyOiB7e25hbWV9fTxiciAvPlxuICAgICAqICAgICBCb29rIElkOiB7e3BhcmFtcy5ib29rSWR9fTxiciAvPlxuICAgICAqICAgPC9maWxlPlxuICAgICAqXG4gICAgICogICA8ZmlsZSBuYW1lPVwiY2hhcHRlci5odG1sXCI+XG4gICAgICogICAgIGNvbnRyb2xsZXI6IHt7bmFtZX19PGJyIC8+XG4gICAgICogICAgIEJvb2sgSWQ6IHt7cGFyYW1zLmJvb2tJZH19PGJyIC8+XG4gICAgICogICAgIENoYXB0ZXIgSWQ6IHt7cGFyYW1zLmNoYXB0ZXJJZH19XG4gICAgICogICA8L2ZpbGU+XG4gICAgICpcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJzY3JpcHQuanNcIj5cbiAgICAgKiAgICAgYW5ndWxhci5tb2R1bGUoJ25nUm91dGVFeGFtcGxlJywgWyduZ1JvdXRlJ10pXG4gICAgICpcbiAgICAgKiAgICAgIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlLCAkcm91dGVQYXJhbXMsICRsb2NhdGlvbikge1xuICAgICAqICAgICAgICAgICRzY29wZS4kcm91dGUgPSAkcm91dGU7XG4gICAgICogICAgICAgICAgJHNjb3BlLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgKiAgICAgICAgICAkc2NvcGUuJHJvdXRlUGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAqICAgICAgfSlcbiAgICAgKlxuICAgICAqICAgICAgLmNvbnRyb2xsZXIoJ0Jvb2tDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGVQYXJhbXMpIHtcbiAgICAgKiAgICAgICAgICAkc2NvcGUubmFtZSA9IFwiQm9va0NvbnRyb2xsZXJcIjtcbiAgICAgKiAgICAgICAgICAkc2NvcGUucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAqICAgICAgfSlcbiAgICAgKlxuICAgICAqICAgICAgLmNvbnRyb2xsZXIoJ0NoYXB0ZXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGVQYXJhbXMpIHtcbiAgICAgKiAgICAgICAgICAkc2NvcGUubmFtZSA9IFwiQ2hhcHRlckNvbnRyb2xsZXJcIjtcbiAgICAgKiAgICAgICAgICAkc2NvcGUucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAqICAgICAgfSlcbiAgICAgKlxuICAgICAqICAgICAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgICAqICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICogICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkJywge1xuICAgICAqICAgICAgICAgdGVtcGxhdGVVcmw6ICdib29rLmh0bWwnLFxuICAgICAqICAgICAgICAgY29udHJvbGxlcjogJ0Jvb2tDb250cm9sbGVyJyxcbiAgICAgKiAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgKiAgICAgICAgICAgLy8gSSB3aWxsIGNhdXNlIGEgMSBzZWNvbmQgZGVsYXlcbiAgICAgKiAgICAgICAgICAgZGVsYXk6IGZ1bmN0aW9uKCRxLCAkdGltZW91dCkge1xuICAgICAqICAgICAgICAgICAgIHZhciBkZWxheSA9ICRxLmRlZmVyKCk7XG4gICAgICogICAgICAgICAgICAgJHRpbWVvdXQoZGVsYXkucmVzb2x2ZSwgMTAwMCk7XG4gICAgICogICAgICAgICAgICAgcmV0dXJuIGRlbGF5LnByb21pc2U7XG4gICAgICogICAgICAgICAgIH1cbiAgICAgKiAgICAgICAgIH1cbiAgICAgKiAgICAgICB9KVxuICAgICAqICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkL2NoLzpjaGFwdGVySWQnLCB7XG4gICAgICogICAgICAgICB0ZW1wbGF0ZVVybDogJ2NoYXB0ZXIuaHRtbCcsXG4gICAgICogICAgICAgICBjb250cm9sbGVyOiAnQ2hhcHRlckNvbnRyb2xsZXInXG4gICAgICogICAgICAgfSk7XG4gICAgICpcbiAgICAgKiAgICAgICAvLyBjb25maWd1cmUgaHRtbDUgdG8gZ2V0IGxpbmtzIHdvcmtpbmcgb24ganNmaWRkbGVcbiAgICAgKiAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICogICAgIH0pO1xuICAgICAqXG4gICAgICogICA8L2ZpbGU+XG4gICAgICpcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJwcm90cmFjdG9yLmpzXCIgdHlwZT1cInByb3RyYWN0b3JcIj5cbiAgICAgKiAgICAgaXQoJ3Nob3VsZCBsb2FkIGFuZCBjb21waWxlIGNvcnJlY3QgdGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICBlbGVtZW50KGJ5LmxpbmtUZXh0KCdNb2J5OiBDaDEnKSkuY2xpY2soKTtcbiAgICAgKiAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IENoYXB0ZXJDb250cm9sbGVyLyk7XG4gICAgICogICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0Jvb2sgSWRcXDogTW9ieS8pO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9DaGFwdGVyIElkXFw6IDEvKTtcbiAgICAgKlxuICAgICAqICAgICAgIGVsZW1lbnQoYnkucGFydGlhbExpbmtUZXh0KCdTY2FybGV0JykpLmNsaWNrKCk7XG4gICAgICpcbiAgICAgKiAgICAgICBjb250ZW50ID0gZWxlbWVudChieS5jc3MoJ1tuZy12aWV3XScpKS5nZXRUZXh0KCk7XG4gICAgICogICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL2NvbnRyb2xsZXJcXDogQm9va0NvbnRyb2xsZXIvKTtcbiAgICAgKiAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQm9vayBJZFxcOiBTY2FybGV0Lyk7XG4gICAgICogICAgIH0pO1xuICAgICAqICAgPC9maWxlPlxuICAgICAqIDwvZXhhbXBsZT5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBldmVudFxuICAgICAqIEBuYW1lICRyb3V0ZSMkcm91dGVDaGFuZ2VTdGFydFxuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBCcm9hZGNhc3RlZCBiZWZvcmUgYSByb3V0ZSBjaGFuZ2UuIEF0IHRoaXMgIHBvaW50IHRoZSByb3V0ZSBzZXJ2aWNlcyBzdGFydHNcbiAgICAgKiByZXNvbHZpbmcgYWxsIG9mIHRoZSBkZXBlbmRlbmNpZXMgbmVlZGVkIGZvciB0aGUgcm91dGUgY2hhbmdlIHRvIG9jY3VyLlxuICAgICAqIFR5cGljYWxseSB0aGlzIGludm9sdmVzIGZldGNoaW5nIHRoZSB2aWV3IHRlbXBsYXRlIGFzIHdlbGwgYXMgYW55IGRlcGVuZGVuY2llc1xuICAgICAqIGRlZmluZWQgaW4gYHJlc29sdmVgIHJvdXRlIHByb3BlcnR5LiBPbmNlICBhbGwgb2YgdGhlIGRlcGVuZGVuY2llcyBhcmUgcmVzb2x2ZWRcbiAgICAgKiBgJHJvdXRlQ2hhbmdlU3VjY2Vzc2AgaXMgZmlyZWQuXG4gICAgICpcbiAgICAgKiBUaGUgcm91dGUgY2hhbmdlIChhbmQgdGhlIGAkbG9jYXRpb25gIGNoYW5nZSB0aGF0IHRyaWdnZXJlZCBpdCkgY2FuIGJlIHByZXZlbnRlZFxuICAgICAqIGJ5IGNhbGxpbmcgYHByZXZlbnREZWZhdWx0YCBtZXRob2Qgb2YgdGhlIGV2ZW50LiBTZWUge0BsaW5rIG5nLiRyb290U2NvcGUuU2NvcGUjJG9ufVxuICAgICAqIGZvciBtb3JlIGRldGFpbHMgYWJvdXQgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7Um91dGV9IG5leHQgRnV0dXJlIHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudCByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBldmVudFxuICAgICAqIEBuYW1lICRyb3V0ZSMkcm91dGVDaGFuZ2VTdWNjZXNzXG4gICAgICogQGV2ZW50VHlwZSBicm9hZGNhc3Qgb24gcm9vdCBzY29wZVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEJyb2FkY2FzdGVkIGFmdGVyIGEgcm91dGUgY2hhbmdlIGhhcyBoYXBwZW5lZCBzdWNjZXNzZnVsbHkuXG4gICAgICogVGhlIGByZXNvbHZlYCBkZXBlbmRlbmNpZXMgYXJlIG5vdyBhdmFpbGFibGUgaW4gdGhlIGBjdXJyZW50LmxvY2Fsc2AgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld30gbGlzdGVucyBmb3IgdGhlIGRpcmVjdGl2ZVxuICAgICAqIHRvIGluc3RhbnRpYXRlIHRoZSBjb250cm9sbGVyIGFuZCByZW5kZXIgdGhlIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYW5ndWxhckV2ZW50IFN5bnRoZXRpYyBldmVudCBvYmplY3QuXG4gICAgICogQHBhcmFtIHtSb3V0ZX0gY3VycmVudCBDdXJyZW50IHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7Um91dGV8VW5kZWZpbmVkfSBwcmV2aW91cyBQcmV2aW91cyByb3V0ZSBpbmZvcm1hdGlvbiwgb3IgdW5kZWZpbmVkIGlmIGN1cnJlbnQgaXNcbiAgICAgKiBmaXJzdCByb3V0ZSBlbnRlcmVkLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIGV2ZW50XG4gICAgICogQG5hbWUgJHJvdXRlIyRyb3V0ZUNoYW5nZUVycm9yXG4gICAgICogQGV2ZW50VHlwZSBicm9hZGNhc3Qgb24gcm9vdCBzY29wZVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEJyb2FkY2FzdGVkIGlmIGFueSBvZiB0aGUgcmVzb2x2ZSBwcm9taXNlcyBhcmUgcmVqZWN0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYW5ndWxhckV2ZW50IFN5bnRoZXRpYyBldmVudCBvYmplY3RcbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBjdXJyZW50IEN1cnJlbnQgcm91dGUgaW5mb3JtYXRpb24uXG4gICAgICogQHBhcmFtIHtSb3V0ZX0gcHJldmlvdXMgUHJldmlvdXMgcm91dGUgaW5mb3JtYXRpb24uXG4gICAgICogQHBhcmFtIHtSb3V0ZX0gcmVqZWN0aW9uIFJlamVjdGlvbiBvZiB0aGUgcHJvbWlzZS4gVXN1YWxseSB0aGUgZXJyb3Igb2YgdGhlIGZhaWxlZCBwcm9taXNlLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIGV2ZW50XG4gICAgICogQG5hbWUgJHJvdXRlIyRyb3V0ZVVwZGF0ZVxuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBUaGUgYHJlbG9hZE9uU2VhcmNoYCBwcm9wZXJ0eSBoYXMgYmVlbiBzZXQgdG8gZmFsc2UsIGFuZCB3ZSBhcmUgcmV1c2luZyB0aGUgc2FtZVxuICAgICAqIGluc3RhbmNlIG9mIHRoZSBDb250cm9sbGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0XG4gICAgICogQHBhcmFtIHtSb3V0ZX0gY3VycmVudCBDdXJyZW50L3ByZXZpb3VzIHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuXG4gICAgdmFyIGZvcmNlUmVsb2FkID0gZmFsc2UsXG4gICAgICAgIHByZXBhcmVkUm91dGUsXG4gICAgICAgIHByZXBhcmVkUm91dGVJc1VwZGF0ZU9ubHksXG4gICAgICAgICRyb3V0ZSA9IHtcbiAgICAgICAgICByb3V0ZXM6IHJvdXRlcyxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEBuZ2RvYyBtZXRob2RcbiAgICAgICAgICAgKiBAbmFtZSAkcm91dGUjcmVsb2FkXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICAgKiBDYXVzZXMgYCRyb3V0ZWAgc2VydmljZSB0byByZWxvYWQgdGhlIGN1cnJlbnQgcm91dGUgZXZlbiBpZlxuICAgICAgICAgICAqIHtAbGluayBuZy4kbG9jYXRpb24gJGxvY2F0aW9ufSBoYXNuJ3QgY2hhbmdlZC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEFzIGEgcmVzdWx0IG9mIHRoYXQsIHtAbGluayBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgbmdWaWV3fVxuICAgICAgICAgICAqIGNyZWF0ZXMgbmV3IHNjb3BlIGFuZCByZWluc3RhbnRpYXRlcyB0aGUgY29udHJvbGxlci5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZWxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yY2VSZWxvYWQgPSB0cnVlO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAvLyBEb24ndCBzdXBwb3J0IGNhbmNlbGxhdGlvbiBvZiBhIHJlbG9hZCBmb3Igbm93Li4uXG4gICAgICAgICAgICAgIHByZXBhcmVSb3V0ZSgpO1xuICAgICAgICAgICAgICBjb21taXRSb3V0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEBuZ2RvYyBtZXRob2RcbiAgICAgICAgICAgKiBAbmFtZSAkcm91dGUjdXBkYXRlUGFyYW1zXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICAgKiBDYXVzZXMgYCRyb3V0ZWAgc2VydmljZSB0byB1cGRhdGUgdGhlIGN1cnJlbnQgVVJMLCByZXBsYWNpbmdcbiAgICAgICAgICAgKiBjdXJyZW50IHJvdXRlIHBhcmFtZXRlcnMgd2l0aCB0aG9zZSBzcGVjaWZpZWQgaW4gYG5ld1BhcmFtc2AuXG4gICAgICAgICAgICogUHJvdmlkZWQgcHJvcGVydHkgbmFtZXMgdGhhdCBtYXRjaCB0aGUgcm91dGUncyBwYXRoIHNlZ21lbnRcbiAgICAgICAgICAgKiBkZWZpbml0aW9ucyB3aWxsIGJlIGludGVycG9sYXRlZCBpbnRvIHRoZSBsb2NhdGlvbidzIHBhdGgsIHdoaWxlXG4gICAgICAgICAgICogcmVtYWluaW5nIHByb3BlcnRpZXMgd2lsbCBiZSB0cmVhdGVkIGFzIHF1ZXJ5IHBhcmFtcy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59IG5ld1BhcmFtcyBtYXBwaW5nIG9mIFVSTCBwYXJhbWV0ZXIgbmFtZXMgdG8gdmFsdWVzXG4gICAgICAgICAgICovXG4gICAgICAgICAgdXBkYXRlUGFyYW1zOiBmdW5jdGlvbihuZXdQYXJhbXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LiQkcm91dGUpIHtcbiAgICAgICAgICAgICAgbmV3UGFyYW1zID0gYW5ndWxhci5leHRlbmQoe30sIHRoaXMuY3VycmVudC5wYXJhbXMsIG5ld1BhcmFtcyk7XG4gICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKGludGVycG9sYXRlKHRoaXMuY3VycmVudC4kJHJvdXRlLm9yaWdpbmFsUGF0aCwgbmV3UGFyYW1zKSk7XG4gICAgICAgICAgICAgIC8vIGludGVycG9sYXRlIG1vZGlmaWVzIG5ld1BhcmFtcywgb25seSBxdWVyeSBwYXJhbXMgYXJlIGxlZnRcbiAgICAgICAgICAgICAgJGxvY2F0aW9uLnNlYXJjaChuZXdQYXJhbXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgJHJvdXRlTWluRXJyKCdub3JvdXQnLCAnVHJpZWQgdXBkYXRpbmcgcm91dGUgd2hlbiB3aXRoIG5vIGN1cnJlbnQgcm91dGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLCBwcmVwYXJlUm91dGUpO1xuICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgY29tbWl0Um91dGUpO1xuXG4gICAgcmV0dXJuICRyb3V0ZTtcblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb24ge3N0cmluZ30gY3VycmVudCB1cmxcbiAgICAgKiBAcGFyYW0gcm91dGUge09iamVjdH0gcm91dGUgcmVnZXhwIHRvIG1hdGNoIHRoZSB1cmwgYWdhaW5zdFxuICAgICAqIEByZXR1cm4gez9PYmplY3R9XG4gICAgICpcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBDaGVjayBpZiB0aGUgcm91dGUgbWF0Y2hlcyB0aGUgY3VycmVudCB1cmwuXG4gICAgICpcbiAgICAgKiBJbnNwaXJlZCBieSBtYXRjaCBpblxuICAgICAqIHZpc2lvbm1lZGlhL2V4cHJlc3MvbGliL3JvdXRlci9yb3V0ZXIuanMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3dpdGNoUm91dGVNYXRjaGVyKG9uLCByb3V0ZSkge1xuICAgICAgdmFyIGtleXMgPSByb3V0ZS5rZXlzLFxuICAgICAgICAgIHBhcmFtcyA9IHt9O1xuXG4gICAgICBpZiAoIXJvdXRlLnJlZ2V4cCkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHZhciBtID0gcm91dGUucmVnZXhwLmV4ZWMob24pO1xuICAgICAgaWYgKCFtKSByZXR1cm4gbnVsbDtcblxuICAgICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IG0ubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaSAtIDFdO1xuXG4gICAgICAgIHZhciB2YWwgPSBtW2ldO1xuXG4gICAgICAgIGlmIChrZXkgJiYgdmFsKSB7XG4gICAgICAgICAgcGFyYW1zW2tleS5uYW1lXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlUm91dGUoJGxvY2F0aW9uRXZlbnQpIHtcbiAgICAgIHZhciBsYXN0Um91dGUgPSAkcm91dGUuY3VycmVudDtcblxuICAgICAgcHJlcGFyZWRSb3V0ZSA9IHBhcnNlUm91dGUoKTtcbiAgICAgIHByZXBhcmVkUm91dGVJc1VwZGF0ZU9ubHkgPSBwcmVwYXJlZFJvdXRlICYmIGxhc3RSb3V0ZSAmJiBwcmVwYXJlZFJvdXRlLiQkcm91dGUgPT09IGxhc3RSb3V0ZS4kJHJvdXRlXG4gICAgICAgICAgJiYgYW5ndWxhci5lcXVhbHMocHJlcGFyZWRSb3V0ZS5wYXRoUGFyYW1zLCBsYXN0Um91dGUucGF0aFBhcmFtcylcbiAgICAgICAgICAmJiAhcHJlcGFyZWRSb3V0ZS5yZWxvYWRPblNlYXJjaCAmJiAhZm9yY2VSZWxvYWQ7XG5cbiAgICAgIGlmICghcHJlcGFyZWRSb3V0ZUlzVXBkYXRlT25seSAmJiAobGFzdFJvdXRlIHx8IHByZXBhcmVkUm91dGUpKSB7XG4gICAgICAgIGlmICgkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRyb3V0ZUNoYW5nZVN0YXJ0JywgcHJlcGFyZWRSb3V0ZSwgbGFzdFJvdXRlKS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgaWYgKCRsb2NhdGlvbkV2ZW50KSB7XG4gICAgICAgICAgICAkbG9jYXRpb25FdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbW1pdFJvdXRlKCkge1xuICAgICAgdmFyIGxhc3RSb3V0ZSA9ICRyb3V0ZS5jdXJyZW50O1xuICAgICAgdmFyIG5leHRSb3V0ZSA9IHByZXBhcmVkUm91dGU7XG5cbiAgICAgIGlmIChwcmVwYXJlZFJvdXRlSXNVcGRhdGVPbmx5KSB7XG4gICAgICAgIGxhc3RSb3V0ZS5wYXJhbXMgPSBuZXh0Um91dGUucGFyYW1zO1xuICAgICAgICBhbmd1bGFyLmNvcHkobGFzdFJvdXRlLnBhcmFtcywgJHJvdXRlUGFyYW1zKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVVcGRhdGUnLCBsYXN0Um91dGUpO1xuICAgICAgfSBlbHNlIGlmIChuZXh0Um91dGUgfHwgbGFzdFJvdXRlKSB7XG4gICAgICAgIGZvcmNlUmVsb2FkID0gZmFsc2U7XG4gICAgICAgICRyb3V0ZS5jdXJyZW50ID0gbmV4dFJvdXRlO1xuICAgICAgICBpZiAobmV4dFJvdXRlKSB7XG4gICAgICAgICAgaWYgKG5leHRSb3V0ZS5yZWRpcmVjdFRvKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhuZXh0Um91dGUucmVkaXJlY3RUbykpIHtcbiAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoaW50ZXJwb2xhdGUobmV4dFJvdXRlLnJlZGlyZWN0VG8sIG5leHRSb3V0ZS5wYXJhbXMpKS5zZWFyY2gobmV4dFJvdXRlLnBhcmFtcylcbiAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRsb2NhdGlvbi51cmwobmV4dFJvdXRlLnJlZGlyZWN0VG8obmV4dFJvdXRlLnBhdGhQYXJhbXMsICRsb2NhdGlvbi5wYXRoKCksICRsb2NhdGlvbi5zZWFyY2goKSkpXG4gICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHEud2hlbihuZXh0Um91dGUpLlxuICAgICAgICAgIHRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAobmV4dFJvdXRlKSB7XG4gICAgICAgICAgICAgIHZhciBsb2NhbHMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgbmV4dFJvdXRlLnJlc29sdmUpLFxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGUsIHRlbXBsYXRlVXJsO1xuXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChsb2NhbHMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBsb2NhbHNba2V5XSA9IGFuZ3VsYXIuaXNTdHJpbmcodmFsdWUpID9cbiAgICAgICAgICAgICAgICAgICAgJGluamVjdG9yLmdldCh2YWx1ZSkgOiAkaW5qZWN0b3IuaW52b2tlKHZhbHVlLCBudWxsLCBudWxsLCBrZXkpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodGVtcGxhdGUgPSBuZXh0Um91dGUudGVtcGxhdGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUobmV4dFJvdXRlLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlVXJsID0gbmV4dFJvdXRlLnRlbXBsYXRlVXJsKSkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGVtcGxhdGVVcmwpKSB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA9IHRlbXBsYXRlVXJsKG5leHRSb3V0ZS5wYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodGVtcGxhdGVVcmwpKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0Um91dGUubG9hZGVkVGVtcGxhdGVVcmwgPSAkc2NlLnZhbHVlT2YodGVtcGxhdGVVcmwpO1xuICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSAkdGVtcGxhdGVSZXF1ZXN0KHRlbXBsYXRlVXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlKSkge1xuICAgICAgICAgICAgICAgIGxvY2Fsc1snJHRlbXBsYXRlJ10gPSB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gJHEuYWxsKGxvY2Fscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuXG4gICAgICAgICAgdGhlbihmdW5jdGlvbihsb2NhbHMpIHtcbiAgICAgICAgICAgIC8vIGFmdGVyIHJvdXRlIGNoYW5nZVxuICAgICAgICAgICAgaWYgKG5leHRSb3V0ZSA9PSAkcm91dGUuY3VycmVudCkge1xuICAgICAgICAgICAgICBpZiAobmV4dFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgbmV4dFJvdXRlLmxvY2FscyA9IGxvY2FscztcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmNvcHkobmV4dFJvdXRlLnBhcmFtcywgJHJvdXRlUGFyYW1zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBuZXh0Um91dGUsIGxhc3RSb3V0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChuZXh0Um91dGUgPT0gJHJvdXRlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VFcnJvcicsIG5leHRSb3V0ZSwgbGFzdFJvdXRlLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgY3VycmVudCBhY3RpdmUgcm91dGUsIGJ5IG1hdGNoaW5nIGl0IGFnYWluc3QgdGhlIFVSTFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBhcnNlUm91dGUoKSB7XG4gICAgICAvLyBNYXRjaCBhIHJvdXRlXG4gICAgICB2YXIgcGFyYW1zLCBtYXRjaDtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChyb3V0ZXMsIGZ1bmN0aW9uKHJvdXRlLCBwYXRoKSB7XG4gICAgICAgIGlmICghbWF0Y2ggJiYgKHBhcmFtcyA9IHN3aXRjaFJvdXRlTWF0Y2hlcigkbG9jYXRpb24ucGF0aCgpLCByb3V0ZSkpKSB7XG4gICAgICAgICAgbWF0Y2ggPSBpbmhlcml0KHJvdXRlLCB7XG4gICAgICAgICAgICBwYXJhbXM6IGFuZ3VsYXIuZXh0ZW5kKHt9LCAkbG9jYXRpb24uc2VhcmNoKCksIHBhcmFtcyksXG4gICAgICAgICAgICBwYXRoUGFyYW1zOiBwYXJhbXN9KTtcbiAgICAgICAgICBtYXRjaC4kJHJvdXRlID0gcm91dGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gTm8gcm91dGUgbWF0Y2hlZDsgZmFsbGJhY2sgdG8gXCJvdGhlcndpc2VcIiByb3V0ZVxuICAgICAgcmV0dXJuIG1hdGNoIHx8IHJvdXRlc1tudWxsXSAmJiBpbmhlcml0KHJvdXRlc1tudWxsXSwge3BhcmFtczoge30sIHBhdGhQYXJhbXM6e319KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbnRlcnBvbGF0aW9uIG9mIHRoZSByZWRpcmVjdCBwYXRoIHdpdGggdGhlIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHJpbmcsIHBhcmFtcykge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKChzdHJpbmcgfHwgJycpLnNwbGl0KCc6JyksIGZ1bmN0aW9uKHNlZ21lbnQsIGkpIHtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICByZXN1bHQucHVzaChzZWdtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgc2VnbWVudE1hdGNoID0gc2VnbWVudC5tYXRjaCgvKFxcdyspKD86Wz8qXSk/KC4qKS8pO1xuICAgICAgICAgIHZhciBrZXkgPSBzZWdtZW50TWF0Y2hbMV07XG4gICAgICAgICAgcmVzdWx0LnB1c2gocGFyYW1zW2tleV0pO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHNlZ21lbnRNYXRjaFsyXSB8fCAnJyk7XG4gICAgICAgICAgZGVsZXRlIHBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG4gICAgfVxuICB9XTtcbn1cblxubmdSb3V0ZU1vZHVsZS5wcm92aWRlcignJHJvdXRlUGFyYW1zJywgJFJvdXRlUGFyYW1zUHJvdmlkZXIpO1xuXG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lICRyb3V0ZVBhcmFtc1xuICogQHJlcXVpcmVzICRyb3V0ZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGAkcm91dGVQYXJhbXNgIHNlcnZpY2UgYWxsb3dzIHlvdSB0byByZXRyaWV2ZSB0aGUgY3VycmVudCBzZXQgb2Ygcm91dGUgcGFyYW1ldGVycy5cbiAqXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUm91dGUgYG5nUm91dGVgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqIFRoZSByb3V0ZSBwYXJhbWV0ZXJzIGFyZSBhIGNvbWJpbmF0aW9uIG9mIHtAbGluayBuZy4kbG9jYXRpb24gYCRsb2NhdGlvbmB9J3NcbiAqIHtAbGluayBuZy4kbG9jYXRpb24jc2VhcmNoIGBzZWFyY2goKWB9IGFuZCB7QGxpbmsgbmcuJGxvY2F0aW9uI3BhdGggYHBhdGgoKWB9LlxuICogVGhlIGBwYXRoYCBwYXJhbWV0ZXJzIGFyZSBleHRyYWN0ZWQgd2hlbiB0aGUge0BsaW5rIG5nUm91dGUuJHJvdXRlIGAkcm91dGVgfSBwYXRoIGlzIG1hdGNoZWQuXG4gKlxuICogSW4gY2FzZSBvZiBwYXJhbWV0ZXIgbmFtZSBjb2xsaXNpb24sIGBwYXRoYCBwYXJhbXMgdGFrZSBwcmVjZWRlbmNlIG92ZXIgYHNlYXJjaGAgcGFyYW1zLlxuICpcbiAqIFRoZSBzZXJ2aWNlIGd1YXJhbnRlZXMgdGhhdCB0aGUgaWRlbnRpdHkgb2YgdGhlIGAkcm91dGVQYXJhbXNgIG9iamVjdCB3aWxsIHJlbWFpbiB1bmNoYW5nZWRcbiAqIChidXQgaXRzIHByb3BlcnRpZXMgd2lsbCBsaWtlbHkgY2hhbmdlKSBldmVuIHdoZW4gYSByb3V0ZSBjaGFuZ2Ugb2NjdXJzLlxuICpcbiAqIE5vdGUgdGhhdCB0aGUgYCRyb3V0ZVBhcmFtc2AgYXJlIG9ubHkgdXBkYXRlZCAqYWZ0ZXIqIGEgcm91dGUgY2hhbmdlIGNvbXBsZXRlcyBzdWNjZXNzZnVsbHkuXG4gKiBUaGlzIG1lYW5zIHRoYXQgeW91IGNhbm5vdCByZWx5IG9uIGAkcm91dGVQYXJhbXNgIGJlaW5nIGNvcnJlY3QgaW4gcm91dGUgcmVzb2x2ZSBmdW5jdGlvbnMuXG4gKiBJbnN0ZWFkIHlvdSBjYW4gdXNlIGAkcm91dGUuY3VycmVudC5wYXJhbXNgIHRvIGFjY2VzcyB0aGUgbmV3IHJvdXRlJ3MgcGFyYW1ldGVycy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqICAvLyBHaXZlbjpcbiAqICAvLyBVUkw6IGh0dHA6Ly9zZXJ2ZXIuY29tL2luZGV4Lmh0bWwjL0NoYXB0ZXIvMS9TZWN0aW9uLzI/c2VhcmNoPW1vYnlcbiAqICAvLyBSb3V0ZTogL0NoYXB0ZXIvOmNoYXB0ZXJJZC9TZWN0aW9uLzpzZWN0aW9uSWRcbiAqICAvL1xuICogIC8vIFRoZW5cbiAqICAkcm91dGVQYXJhbXMgPT0+IHtjaGFwdGVySWQ6JzEnLCBzZWN0aW9uSWQ6JzInLCBzZWFyY2g6J21vYnknfVxuICogYGBgXG4gKi9cbmZ1bmN0aW9uICRSb3V0ZVBhcmFtc1Byb3ZpZGVyKCkge1xuICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHt9OyB9O1xufVxuXG5uZ1JvdXRlTW9kdWxlLmRpcmVjdGl2ZSgnbmdWaWV3JywgbmdWaWV3RmFjdG9yeSk7XG5uZ1JvdXRlTW9kdWxlLmRpcmVjdGl2ZSgnbmdWaWV3JywgbmdWaWV3RmlsbENvbnRlbnRGYWN0b3J5KTtcblxuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIG5nVmlld1xuICogQHJlc3RyaWN0IEVDQVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogIyBPdmVydmlld1xuICogYG5nVmlld2AgaXMgYSBkaXJlY3RpdmUgdGhhdCBjb21wbGVtZW50cyB0aGUge0BsaW5rIG5nUm91dGUuJHJvdXRlICRyb3V0ZX0gc2VydmljZSBieVxuICogaW5jbHVkaW5nIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZSBvZiB0aGUgY3VycmVudCByb3V0ZSBpbnRvIHRoZSBtYWluIGxheW91dCAoYGluZGV4Lmh0bWxgKSBmaWxlLlxuICogRXZlcnkgdGltZSB0aGUgY3VycmVudCByb3V0ZSBjaGFuZ2VzLCB0aGUgaW5jbHVkZWQgdmlldyBjaGFuZ2VzIHdpdGggaXQgYWNjb3JkaW5nIHRvIHRoZVxuICogY29uZmlndXJhdGlvbiBvZiB0aGUgYCRyb3V0ZWAgc2VydmljZS5cbiAqXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUm91dGUgYG5nUm91dGVgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqIEBhbmltYXRpb25zXG4gKiBlbnRlciAtIGFuaW1hdGlvbiBpcyB1c2VkIHRvIGJyaW5nIG5ldyBjb250ZW50IGludG8gdGhlIGJyb3dzZXIuXG4gKiBsZWF2ZSAtIGFuaW1hdGlvbiBpcyB1c2VkIHRvIGFuaW1hdGUgZXhpc3RpbmcgY29udGVudCBhd2F5LlxuICpcbiAqIFRoZSBlbnRlciBhbmQgbGVhdmUgYW5pbWF0aW9uIG9jY3VyIGNvbmN1cnJlbnRseS5cbiAqXG4gKiBAc2NvcGVcbiAqIEBwcmlvcml0eSA0MDBcbiAqIEBwYXJhbSB7c3RyaW5nPX0gb25sb2FkIEV4cHJlc3Npb24gdG8gZXZhbHVhdGUgd2hlbmV2ZXIgdGhlIHZpZXcgdXBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IGF1dG9zY3JvbGwgV2hldGhlciBgbmdWaWV3YCBzaG91bGQgY2FsbCB7QGxpbmsgbmcuJGFuY2hvclNjcm9sbFxuICogICAgICAgICAgICAgICAgICAkYW5jaG9yU2Nyb2xsfSB0byBzY3JvbGwgdGhlIHZpZXdwb3J0IGFmdGVyIHRoZSB2aWV3IGlzIHVwZGF0ZWQuXG4gKlxuICogICAgICAgICAgICAgICAgICAtIElmIHRoZSBhdHRyaWJ1dGUgaXMgbm90IHNldCwgZGlzYWJsZSBzY3JvbGxpbmcuXG4gKiAgICAgICAgICAgICAgICAgIC0gSWYgdGhlIGF0dHJpYnV0ZSBpcyBzZXQgd2l0aG91dCB2YWx1ZSwgZW5hYmxlIHNjcm9sbGluZy5cbiAqICAgICAgICAgICAgICAgICAgLSBPdGhlcndpc2UgZW5hYmxlIHNjcm9sbGluZyBvbmx5IGlmIHRoZSBgYXV0b3Njcm9sbGAgYXR0cmlidXRlIHZhbHVlIGV2YWx1YXRlZFxuICogICAgICAgICAgICAgICAgICAgIGFzIGFuIGV4cHJlc3Npb24geWllbGRzIGEgdHJ1dGh5IHZhbHVlLlxuICogQGV4YW1wbGVcbiAgICA8ZXhhbXBsZSBuYW1lPVwibmdWaWV3LWRpcmVjdGl2ZVwiIG1vZHVsZT1cIm5nVmlld0V4YW1wbGVcIlxuICAgICAgICAgICAgIGRlcHM9XCJhbmd1bGFyLXJvdXRlLmpzO2FuZ3VsYXItYW5pbWF0ZS5qc1wiXG4gICAgICAgICAgICAgYW5pbWF0aW9ucz1cInRydWVcIiBmaXhCYXNlPVwidHJ1ZVwiPlxuICAgICAgPGZpbGUgbmFtZT1cImluZGV4Lmh0bWxcIj5cbiAgICAgICAgPGRpdiBuZy1jb250cm9sbGVyPVwiTWFpbkN0cmwgYXMgbWFpblwiPlxuICAgICAgICAgIENob29zZTpcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5XCI+TW9ieTwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL01vYnkvY2gvMVwiPk1vYnk6IENoMTwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL0dhdHNieVwiPkdhdHNieTwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL0dhdHNieS9jaC80P2tleT12YWx1ZVwiPkdhdHNieTogQ2g0PC9hPiB8XG4gICAgICAgICAgPGEgaHJlZj1cIkJvb2svU2NhcmxldFwiPlNjYXJsZXQgTGV0dGVyPC9hPjxici8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlldy1hbmltYXRlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBuZy12aWV3IGNsYXNzPVwidmlldy1hbmltYXRlXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGhyIC8+XG5cbiAgICAgICAgICA8cHJlPiRsb2NhdGlvbi5wYXRoKCkgPSB7e21haW4uJGxvY2F0aW9uLnBhdGgoKX19PC9wcmU+XG4gICAgICAgICAgPHByZT4kcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybCA9IHt7bWFpbi4kcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybH19PC9wcmU+XG4gICAgICAgICAgPHByZT4kcm91dGUuY3VycmVudC5wYXJhbXMgPSB7e21haW4uJHJvdXRlLmN1cnJlbnQucGFyYW1zfX08L3ByZT5cbiAgICAgICAgICA8cHJlPiRyb3V0ZVBhcmFtcyA9IHt7bWFpbi4kcm91dGVQYXJhbXN9fTwvcHJlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cImJvb2suaHRtbFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIGNvbnRyb2xsZXI6IHt7Ym9vay5uYW1lfX08YnIgLz5cbiAgICAgICAgICBCb29rIElkOiB7e2Jvb2sucGFyYW1zLmJvb2tJZH19PGJyIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWxlPlxuXG4gICAgICA8ZmlsZSBuYW1lPVwiY2hhcHRlci5odG1sXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgY29udHJvbGxlcjoge3tjaGFwdGVyLm5hbWV9fTxiciAvPlxuICAgICAgICAgIEJvb2sgSWQ6IHt7Y2hhcHRlci5wYXJhbXMuYm9va0lkfX08YnIgLz5cbiAgICAgICAgICBDaGFwdGVyIElkOiB7e2NoYXB0ZXIucGFyYW1zLmNoYXB0ZXJJZH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWxlPlxuXG4gICAgICA8ZmlsZSBuYW1lPVwiYW5pbWF0aW9ucy5jc3NcIj5cbiAgICAgICAgLnZpZXctYW5pbWF0ZS1jb250YWluZXIge1xuICAgICAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xuICAgICAgICAgIGhlaWdodDoxMDBweCFpbXBvcnRhbnQ7XG4gICAgICAgICAgYmFja2dyb3VuZDp3aGl0ZTtcbiAgICAgICAgICBib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgIGhlaWdodDo0MHB4O1xuICAgICAgICAgIG92ZXJmbG93OmhpZGRlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC52aWV3LWFuaW1hdGUge1xuICAgICAgICAgIHBhZGRpbmc6MTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC52aWV3LWFuaW1hdGUubmctZW50ZXIsIC52aWV3LWFuaW1hdGUubmctbGVhdmUge1xuICAgICAgICAgIHRyYW5zaXRpb246YWxsIGN1YmljLWJlemllcigwLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MCkgMS41cztcblxuICAgICAgICAgIGRpc3BsYXk6YmxvY2s7XG4gICAgICAgICAgd2lkdGg6MTAwJTtcbiAgICAgICAgICBib3JkZXItbGVmdDoxcHggc29saWQgYmxhY2s7XG5cbiAgICAgICAgICBwb3NpdGlvbjphYnNvbHV0ZTtcbiAgICAgICAgICB0b3A6MDtcbiAgICAgICAgICBsZWZ0OjA7XG4gICAgICAgICAgcmlnaHQ6MDtcbiAgICAgICAgICBib3R0b206MDtcbiAgICAgICAgICBwYWRkaW5nOjEwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWVudGVyIHtcbiAgICAgICAgICBsZWZ0OjEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1lbnRlci5uZy1lbnRlci1hY3RpdmUge1xuICAgICAgICAgIGxlZnQ6MDtcbiAgICAgICAgfVxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWxlYXZlLm5nLWxlYXZlLWFjdGl2ZSB7XG4gICAgICAgICAgbGVmdDotMTAwJTtcbiAgICAgICAgfVxuICAgICAgPC9maWxlPlxuXG4gICAgICA8ZmlsZSBuYW1lPVwic2NyaXB0LmpzXCI+XG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCduZ1ZpZXdFeGFtcGxlJywgWyduZ1JvdXRlJywgJ25nQW5pbWF0ZSddKVxuICAgICAgICAgIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsXG4gICAgICAgICAgICBmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICAgICAgICAud2hlbignL0Jvb2svOmJvb2tJZCcsIHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYm9vay5odG1sJyxcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCb29rQ3RybCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdib29rJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLndoZW4oJy9Cb29rLzpib29rSWQvY2gvOmNoYXB0ZXJJZCcsIHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY2hhcHRlci5odG1sJyxcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGFwdGVyQ3RybCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjaGFwdGVyJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAgICAgICB9XSlcbiAgICAgICAgICAuY29udHJvbGxlcignTWFpbkN0cmwnLCBbJyRyb3V0ZScsICckcm91dGVQYXJhbXMnLCAnJGxvY2F0aW9uJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCRyb3V0ZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgdGhpcy4kcm91dGUgPSAkcm91dGU7XG4gICAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICAgICAgICB0aGlzLiRyb3V0ZVBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgICAgICB9XSlcbiAgICAgICAgICAuY29udHJvbGxlcignQm9va0N0cmwnLCBbJyRyb3V0ZVBhcmFtcycsIGZ1bmN0aW9uKCRyb3V0ZVBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJCb29rQ3RybFwiO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSAkcm91dGVQYXJhbXM7XG4gICAgICAgICAgfV0pXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ0NoYXB0ZXJDdHJsJywgWyckcm91dGVQYXJhbXMnLCBmdW5jdGlvbigkcm91dGVQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IFwiQ2hhcHRlckN0cmxcIjtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAgICAgIH1dKTtcblxuICAgICAgPC9maWxlPlxuXG4gICAgICA8ZmlsZSBuYW1lPVwicHJvdHJhY3Rvci5qc1wiIHR5cGU9XCJwcm90cmFjdG9yXCI+XG4gICAgICAgIGl0KCdzaG91bGQgbG9hZCBhbmQgY29tcGlsZSBjb3JyZWN0IHRlbXBsYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudChieS5saW5rVGV4dCgnTW9ieTogQ2gxJykpLmNsaWNrKCk7XG4gICAgICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50KGJ5LmNzcygnW25nLXZpZXddJykpLmdldFRleHQoKTtcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvY29udHJvbGxlclxcOiBDaGFwdGVyQ3RybC8pO1xuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9Cb29rIElkXFw6IE1vYnkvKTtcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQ2hhcHRlciBJZFxcOiAxLyk7XG5cbiAgICAgICAgICBlbGVtZW50KGJ5LnBhcnRpYWxMaW5rVGV4dCgnU2NhcmxldCcpKS5jbGljaygpO1xuXG4gICAgICAgICAgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IEJvb2tDdHJsLyk7XG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0Jvb2sgSWRcXDogU2NhcmxldC8pO1xuICAgICAgICB9KTtcbiAgICAgIDwvZmlsZT5cbiAgICA8L2V4YW1wbGU+XG4gKi9cblxuXG4vKipcbiAqIEBuZ2RvYyBldmVudFxuICogQG5hbWUgbmdWaWV3IyR2aWV3Q29udGVudExvYWRlZFxuICogQGV2ZW50VHlwZSBlbWl0IG9uIHRoZSBjdXJyZW50IG5nVmlldyBzY29wZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFbWl0dGVkIGV2ZXJ5IHRpbWUgdGhlIG5nVmlldyBjb250ZW50IGlzIHJlbG9hZGVkLlxuICovXG5uZ1ZpZXdGYWN0b3J5LiRpbmplY3QgPSBbJyRyb3V0ZScsICckYW5jaG9yU2Nyb2xsJywgJyRhbmltYXRlJ107XG5mdW5jdGlvbiBuZ1ZpZXdGYWN0b3J5KCRyb3V0ZSwgJGFuY2hvclNjcm9sbCwgJGFuaW1hdGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0VDQScsXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgcHJpb3JpdHk6IDQwMCxcbiAgICB0cmFuc2NsdWRlOiAnZWxlbWVudCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsICRlbGVtZW50LCBhdHRyLCBjdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgY3VycmVudFNjb3BlLFxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICBwcmV2aW91c0xlYXZlQW5pbWF0aW9uLFxuICAgICAgICAgICAgYXV0b1Njcm9sbEV4cCA9IGF0dHIuYXV0b3Njcm9sbCxcbiAgICAgICAgICAgIG9ubG9hZEV4cCA9IGF0dHIub25sb2FkIHx8ICcnO1xuXG4gICAgICAgIHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIHVwZGF0ZSk7XG4gICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFudXBMYXN0VmlldygpIHtcbiAgICAgICAgICBpZiAocHJldmlvdXNMZWF2ZUFuaW1hdGlvbikge1xuICAgICAgICAgICAgJGFuaW1hdGUuY2FuY2VsKHByZXZpb3VzTGVhdmVBbmltYXRpb24pO1xuICAgICAgICAgICAgcHJldmlvdXNMZWF2ZUFuaW1hdGlvbiA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRTY29wZSkge1xuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHByZXZpb3VzTGVhdmVBbmltYXRpb24gPSAkYW5pbWF0ZS5sZWF2ZShjdXJyZW50RWxlbWVudCk7XG4gICAgICAgICAgICBwcmV2aW91c0xlYXZlQW5pbWF0aW9uLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHByZXZpb3VzTGVhdmVBbmltYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgIHZhciBsb2NhbHMgPSAkcm91dGUuY3VycmVudCAmJiAkcm91dGUuY3VycmVudC5sb2NhbHMsXG4gICAgICAgICAgICAgIHRlbXBsYXRlID0gbG9jYWxzICYmIGxvY2Fscy4kdGVtcGxhdGU7XG5cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodGVtcGxhdGUpKSB7XG4gICAgICAgICAgICB2YXIgbmV3U2NvcGUgPSBzY29wZS4kbmV3KCk7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9ICRyb3V0ZS5jdXJyZW50O1xuXG4gICAgICAgICAgICAvLyBOb3RlOiBUaGlzIHdpbGwgYWxzbyBsaW5rIGFsbCBjaGlsZHJlbiBvZiBuZy12aWV3IHRoYXQgd2VyZSBjb250YWluZWQgaW4gdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAvLyBodG1sLiBJZiB0aGF0IGNvbnRlbnQgY29udGFpbnMgY29udHJvbGxlcnMsIC4uLiB0aGV5IGNvdWxkIHBvbGx1dGUvY2hhbmdlIHRoZSBzY29wZS5cbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIHVzaW5nIG5nLXZpZXcgb24gYW4gZWxlbWVudCB3aXRoIGFkZGl0aW9uYWwgY29udGVudCBkb2VzIG5vdCBtYWtlIHNlbnNlLi4uXG4gICAgICAgICAgICAvLyBOb3RlOiBXZSBjYW4ndCByZW1vdmUgdGhlbSBpbiB0aGUgY2xvbmVBdHRjaEZuIG9mICR0cmFuc2NsdWRlIGFzIHRoYXRcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGlzIGNhbGxlZCBiZWZvcmUgbGlua2luZyB0aGUgY29udGVudCwgd2hpY2ggd291bGQgYXBwbHkgY2hpbGRcbiAgICAgICAgICAgIC8vIGRpcmVjdGl2ZXMgdG8gbm9uIGV4aXN0aW5nIGVsZW1lbnRzLlxuICAgICAgICAgICAgdmFyIGNsb25lID0gJHRyYW5zY2x1ZGUobmV3U2NvcGUsIGZ1bmN0aW9uKGNsb25lKSB7XG4gICAgICAgICAgICAgICRhbmltYXRlLmVudGVyKGNsb25lLCBudWxsLCBjdXJyZW50RWxlbWVudCB8fCAkZWxlbWVudCkudGhlbihmdW5jdGlvbiBvbk5nVmlld0VudGVyKCkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdXRvU2Nyb2xsRXhwKVxuICAgICAgICAgICAgICAgICAgJiYgKCFhdXRvU2Nyb2xsRXhwIHx8IHNjb3BlLiRldmFsKGF1dG9TY3JvbGxFeHApKSkge1xuICAgICAgICAgICAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNsZWFudXBMYXN0VmlldygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY2xvbmU7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUgPSBjdXJyZW50LnNjb3BlID0gbmV3U2NvcGU7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUuJGVtaXQoJyR2aWV3Q29udGVudExvYWRlZCcpO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRldmFsKG9ubG9hZEV4cCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsZWFudXBMYXN0VmlldygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLy8gVGhpcyBkaXJlY3RpdmUgaXMgY2FsbGVkIGR1cmluZyB0aGUgJHRyYW5zY2x1ZGUgY2FsbCBvZiB0aGUgZmlyc3QgYG5nVmlld2AgZGlyZWN0aXZlLlxuLy8gSXQgd2lsbCByZXBsYWNlIGFuZCBjb21waWxlIHRoZSBjb250ZW50IG9mIHRoZSBlbGVtZW50IHdpdGggdGhlIGxvYWRlZCB0ZW1wbGF0ZS5cbi8vIFdlIG5lZWQgdGhpcyBkaXJlY3RpdmUgc28gdGhhdCB0aGUgZWxlbWVudCBjb250ZW50IGlzIGFscmVhZHkgZmlsbGVkIHdoZW5cbi8vIHRoZSBsaW5rIGZ1bmN0aW9uIG9mIGFub3RoZXIgZGlyZWN0aXZlIG9uIHRoZSBzYW1lIGVsZW1lbnQgYXMgbmdWaWV3XG4vLyBpcyBjYWxsZWQuXG5uZ1ZpZXdGaWxsQ29udGVudEZhY3RvcnkuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJGNvbnRyb2xsZXInLCAnJHJvdXRlJ107XG5mdW5jdGlvbiBuZ1ZpZXdGaWxsQ29udGVudEZhY3RvcnkoJGNvbXBpbGUsICRjb250cm9sbGVyLCAkcm91dGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0VDQScsXG4gICAgcHJpb3JpdHk6IC00MDAsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICB2YXIgY3VycmVudCA9ICRyb3V0ZS5jdXJyZW50LFxuICAgICAgICAgIGxvY2FscyA9IGN1cnJlbnQubG9jYWxzO1xuXG4gICAgICAkZWxlbWVudC5odG1sKGxvY2Fscy4kdGVtcGxhdGUpO1xuXG4gICAgICB2YXIgbGluayA9ICRjb21waWxlKCRlbGVtZW50LmNvbnRlbnRzKCkpO1xuXG4gICAgICBpZiAoY3VycmVudC5jb250cm9sbGVyKSB7XG4gICAgICAgIGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSAkY29udHJvbGxlcihjdXJyZW50LmNvbnRyb2xsZXIsIGxvY2Fscyk7XG4gICAgICAgIGlmIChjdXJyZW50LmNvbnRyb2xsZXJBcykge1xuICAgICAgICAgIHNjb3BlW2N1cnJlbnQuY29udHJvbGxlckFzXSA9IGNvbnRyb2xsZXI7XG4gICAgICAgIH1cbiAgICAgICAgJGVsZW1lbnQuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBjb250cm9sbGVyKTtcbiAgICAgICAgJGVsZW1lbnQuY2hpbGRyZW4oKS5kYXRhKCckbmdDb250cm9sbGVyQ29udHJvbGxlcicsIGNvbnRyb2xsZXIpO1xuICAgICAgfVxuXG4gICAgICBsaW5rKHNjb3BlKTtcbiAgICB9XG4gIH07XG59XG5cblxufSkod2luZG93LCB3aW5kb3cuYW5ndWxhcik7XG4iLCJyZXF1aXJlKCcuL2FuZ3VsYXItcm91dGUnKTtcbm1vZHVsZS5leHBvcnRzID0gJ25nUm91dGUnO1xuIiwiLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFySlMgdjEuNC43XG4gKiAoYykgMjAxMC0yMDE1IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xuICogTGljZW5zZTogTUlUXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGFuZ3VsYXIsIHVuZGVmaW5lZCkgeyd1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdkb2MgbW9kdWxlXG4gKiBAbmFtZSBuZ1RvdWNoXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiAjIG5nVG91Y2hcbiAqXG4gKiBUaGUgYG5nVG91Y2hgIG1vZHVsZSBwcm92aWRlcyB0b3VjaCBldmVudHMgYW5kIG90aGVyIGhlbHBlcnMgZm9yIHRvdWNoLWVuYWJsZWQgZGV2aWNlcy5cbiAqIFRoZSBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBvbiBqUXVlcnkgTW9iaWxlIHRvdWNoIGV2ZW50IGhhbmRsaW5nXG4gKiAoW2pxdWVyeW1vYmlsZS5jb21dKGh0dHA6Ly9qcXVlcnltb2JpbGUuY29tLykpLlxuICpcbiAqXG4gKiBTZWUge0BsaW5rIG5nVG91Y2guJHN3aXBlIGAkc3dpcGVgfSBmb3IgdXNhZ2UuXG4gKlxuICogPGRpdiBkb2MtbW9kdWxlLWNvbXBvbmVudHM9XCJuZ1RvdWNoXCI+PC9kaXY+XG4gKlxuICovXG5cbi8vIGRlZmluZSBuZ1RvdWNoIG1vZHVsZVxuLyogZ2xvYmFsIC1uZ1RvdWNoICovXG52YXIgbmdUb3VjaCA9IGFuZ3VsYXIubW9kdWxlKCduZ1RvdWNoJywgW10pO1xuXG5mdW5jdGlvbiBub2RlTmFtZV8oZWxlbWVudCkge1xuICByZXR1cm4gYW5ndWxhci5sb3dlcmNhc2UoZWxlbWVudC5ub2RlTmFtZSB8fCAoZWxlbWVudFswXSAmJiBlbGVtZW50WzBdLm5vZGVOYW1lKSk7XG59XG5cbi8qIGdsb2JhbCBuZ1RvdWNoOiBmYWxzZSAqL1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIHNlcnZpY2VcbiAgICAgKiBAbmFtZSAkc3dpcGVcbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFRoZSBgJHN3aXBlYCBzZXJ2aWNlIGlzIGEgc2VydmljZSB0aGF0IGFic3RyYWN0cyB0aGUgbWVzc2llciBkZXRhaWxzIG9mIGhvbGQtYW5kLWRyYWcgc3dpcGVcbiAgICAgKiBiZWhhdmlvciwgdG8gbWFrZSBpbXBsZW1lbnRpbmcgc3dpcGUtcmVsYXRlZCBkaXJlY3RpdmVzIG1vcmUgY29udmVuaWVudC5cbiAgICAgKlxuICAgICAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdUb3VjaCBgbmdUb3VjaGB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gICAgICpcbiAgICAgKiBgJHN3aXBlYCBpcyB1c2VkIGJ5IHRoZSBgbmdTd2lwZUxlZnRgIGFuZCBgbmdTd2lwZVJpZ2h0YCBkaXJlY3RpdmVzIGluIGBuZ1RvdWNoYCwgYW5kIGJ5XG4gICAgICogYG5nQ2Fyb3VzZWxgIGluIGEgc2VwYXJhdGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogIyBVc2FnZVxuICAgICAqIFRoZSBgJHN3aXBlYCBzZXJ2aWNlIGlzIGFuIG9iamVjdCB3aXRoIGEgc2luZ2xlIG1ldGhvZDogYGJpbmRgLiBgYmluZGAgdGFrZXMgYW4gZWxlbWVudFxuICAgICAqIHdoaWNoIGlzIHRvIGJlIHdhdGNoZWQgZm9yIHN3aXBlcywgYW5kIGFuIG9iamVjdCB3aXRoIGZvdXIgaGFuZGxlciBmdW5jdGlvbnMuIFNlZSB0aGVcbiAgICAgKiBkb2N1bWVudGF0aW9uIGZvciBgYmluZGAgYmVsb3cuXG4gICAgICovXG5cbm5nVG91Y2guZmFjdG9yeSgnJHN3aXBlJywgW2Z1bmN0aW9uKCkge1xuICAvLyBUaGUgdG90YWwgZGlzdGFuY2UgaW4gYW55IGRpcmVjdGlvbiBiZWZvcmUgd2UgbWFrZSB0aGUgY2FsbCBvbiBzd2lwZSB2cy4gc2Nyb2xsLlxuICB2YXIgTU9WRV9CVUZGRVJfUkFESVVTID0gMTA7XG5cbiAgdmFyIFBPSU5URVJfRVZFTlRTID0ge1xuICAgICdtb3VzZSc6IHtcbiAgICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICAgIG1vdmU6ICdtb3VzZW1vdmUnLFxuICAgICAgZW5kOiAnbW91c2V1cCdcbiAgICB9LFxuICAgICd0b3VjaCc6IHtcbiAgICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgICAgIGVuZDogJ3RvdWNoZW5kJyxcbiAgICAgIGNhbmNlbDogJ3RvdWNoY2FuY2VsJ1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBnZXRDb29yZGluYXRlcyhldmVudCkge1xuICAgIHZhciBvcmlnaW5hbEV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICB2YXIgdG91Y2hlcyA9IG9yaWdpbmFsRXZlbnQudG91Y2hlcyAmJiBvcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoID8gb3JpZ2luYWxFdmVudC50b3VjaGVzIDogW29yaWdpbmFsRXZlbnRdO1xuICAgIHZhciBlID0gKG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgb3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSkgfHwgdG91Y2hlc1swXTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBlLmNsaWVudFgsXG4gICAgICB5OiBlLmNsaWVudFlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXZlbnRzKHBvaW50ZXJUeXBlcywgZXZlbnRUeXBlKSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGFuZ3VsYXIuZm9yRWFjaChwb2ludGVyVHlwZXMsIGZ1bmN0aW9uKHBvaW50ZXJUeXBlKSB7XG4gICAgICB2YXIgZXZlbnROYW1lID0gUE9JTlRFUl9FVkVOVFNbcG9pbnRlclR5cGVdW2V2ZW50VHlwZV07XG4gICAgICBpZiAoZXZlbnROYW1lKSB7XG4gICAgICAgIHJlcy5wdXNoKGV2ZW50TmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy5qb2luKCcgJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBtZXRob2RcbiAgICAgKiBAbmFtZSAkc3dpcGUjYmluZFxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogVGhlIG1haW4gbWV0aG9kIG9mIGAkc3dpcGVgLiBJdCB0YWtlcyBhbiBlbGVtZW50IHRvIGJlIHdhdGNoZWQgZm9yIHN3aXBlIG1vdGlvbnMsIGFuZCBhblxuICAgICAqIG9iamVjdCBjb250YWluaW5nIGV2ZW50IGhhbmRsZXJzLlxuICAgICAqIFRoZSBwb2ludGVyIHR5cGVzIHRoYXQgc2hvdWxkIGJlIHVzZWQgY2FuIGJlIHNwZWNpZmllZCB2aWEgdGhlIG9wdGlvbmFsXG4gICAgICogdGhpcmQgYXJndW1lbnQsIHdoaWNoIGlzIGFuIGFycmF5IG9mIHN0cmluZ3MgYCdtb3VzZSdgIGFuZCBgJ3RvdWNoJ2AuIEJ5IGRlZmF1bHQsXG4gICAgICogYCRzd2lwZWAgd2lsbCBsaXN0ZW4gZm9yIGBtb3VzZWAgYW5kIGB0b3VjaGAgZXZlbnRzLlxuICAgICAqXG4gICAgICogVGhlIGZvdXIgZXZlbnRzIGFyZSBgc3RhcnRgLCBgbW92ZWAsIGBlbmRgLCBhbmQgYGNhbmNlbGAuIGBzdGFydGAsIGBtb3ZlYCwgYW5kIGBlbmRgXG4gICAgICogcmVjZWl2ZSBhcyBhIHBhcmFtZXRlciBhIGNvb3JkaW5hdGVzIG9iamVjdCBvZiB0aGUgZm9ybSBgeyB4OiAxNTAsIHk6IDMxMCB9YCBhbmQgdGhlIHJhd1xuICAgICAqIGBldmVudGAuIGBjYW5jZWxgIHJlY2VpdmVzIHRoZSByYXcgYGV2ZW50YCBhcyBpdHMgc2luZ2xlIHBhcmFtZXRlci5cbiAgICAgKlxuICAgICAqIGBzdGFydGAgaXMgY2FsbGVkIG9uIGVpdGhlciBgbW91c2Vkb3duYCBvciBgdG91Y2hzdGFydGAuIEFmdGVyIHRoaXMgZXZlbnQsIGAkc3dpcGVgIGlzXG4gICAgICogd2F0Y2hpbmcgZm9yIGB0b3VjaG1vdmVgIG9yIGBtb3VzZW1vdmVgIGV2ZW50cy4gVGhlc2UgZXZlbnRzIGFyZSBpZ25vcmVkIHVudGlsIHRoZSB0b3RhbFxuICAgICAqIGRpc3RhbmNlIG1vdmVkIGluIGVpdGhlciBkaW1lbnNpb24gZXhjZWVkcyBhIHNtYWxsIHRocmVzaG9sZC5cbiAgICAgKlxuICAgICAqIE9uY2UgdGhpcyB0aHJlc2hvbGQgaXMgZXhjZWVkZWQsIGVpdGhlciB0aGUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBkZWx0YSBpcyBncmVhdGVyLlxuICAgICAqIC0gSWYgdGhlIGhvcml6b250YWwgZGlzdGFuY2UgaXMgZ3JlYXRlciwgdGhpcyBpcyBhIHN3aXBlIGFuZCBgbW92ZWAgYW5kIGBlbmRgIGV2ZW50cyBmb2xsb3cuXG4gICAgICogLSBJZiB0aGUgdmVydGljYWwgZGlzdGFuY2UgaXMgZ3JlYXRlciwgdGhpcyBpcyBhIHNjcm9sbCwgYW5kIHdlIGxldCB0aGUgYnJvd3NlciB0YWtlIG92ZXIuXG4gICAgICogICBBIGBjYW5jZWxgIGV2ZW50IGlzIHNlbnQuXG4gICAgICpcbiAgICAgKiBgbW92ZWAgaXMgY2FsbGVkIG9uIGBtb3VzZW1vdmVgIGFuZCBgdG91Y2htb3ZlYCBhZnRlciB0aGUgYWJvdmUgbG9naWMgaGFzIGRldGVybWluZWQgdGhhdFxuICAgICAqIGEgc3dpcGUgaXMgaW4gcHJvZ3Jlc3MuXG4gICAgICpcbiAgICAgKiBgZW5kYCBpcyBjYWxsZWQgd2hlbiBhIHN3aXBlIGlzIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWQgd2l0aCBhIGB0b3VjaGVuZGAgb3IgYG1vdXNldXBgLlxuICAgICAqXG4gICAgICogYGNhbmNlbGAgaXMgY2FsbGVkIGVpdGhlciBvbiBhIGB0b3VjaGNhbmNlbGAgZnJvbSB0aGUgYnJvd3Nlciwgb3Igd2hlbiB3ZSBiZWdpbiBzY3JvbGxpbmdcbiAgICAgKiBhcyBkZXNjcmliZWQgYWJvdmUuXG4gICAgICpcbiAgICAgKi9cbiAgICBiaW5kOiBmdW5jdGlvbihlbGVtZW50LCBldmVudEhhbmRsZXJzLCBwb2ludGVyVHlwZXMpIHtcbiAgICAgIC8vIEFic29sdXRlIHRvdGFsIG1vdmVtZW50LCB1c2VkIHRvIGNvbnRyb2wgc3dpcGUgdnMuIHNjcm9sbC5cbiAgICAgIHZhciB0b3RhbFgsIHRvdGFsWTtcbiAgICAgIC8vIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb3NpdGlvbi5cbiAgICAgIHZhciBzdGFydENvb3JkcztcbiAgICAgIC8vIExhc3QgZXZlbnQncyBwb3NpdGlvbi5cbiAgICAgIHZhciBsYXN0UG9zO1xuICAgICAgLy8gV2hldGhlciBhIHN3aXBlIGlzIGFjdGl2ZS5cbiAgICAgIHZhciBhY3RpdmUgPSBmYWxzZTtcblxuICAgICAgcG9pbnRlclR5cGVzID0gcG9pbnRlclR5cGVzIHx8IFsnbW91c2UnLCAndG91Y2gnXTtcbiAgICAgIGVsZW1lbnQub24oZ2V0RXZlbnRzKHBvaW50ZXJUeXBlcywgJ3N0YXJ0JyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHN0YXJ0Q29vcmRzID0gZ2V0Q29vcmRpbmF0ZXMoZXZlbnQpO1xuICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0b3RhbFggPSAwO1xuICAgICAgICB0b3RhbFkgPSAwO1xuICAgICAgICBsYXN0UG9zID0gc3RhcnRDb29yZHM7XG4gICAgICAgIGV2ZW50SGFuZGxlcnNbJ3N0YXJ0J10gJiYgZXZlbnRIYW5kbGVyc1snc3RhcnQnXShzdGFydENvb3JkcywgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgICB2YXIgZXZlbnRzID0gZ2V0RXZlbnRzKHBvaW50ZXJUeXBlcywgJ2NhbmNlbCcpO1xuICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICBlbGVtZW50Lm9uKGV2ZW50cywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBldmVudEhhbmRsZXJzWydjYW5jZWwnXSAmJiBldmVudEhhbmRsZXJzWydjYW5jZWwnXShldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50Lm9uKGdldEV2ZW50cyhwb2ludGVyVHlwZXMsICdtb3ZlJyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghYWN0aXZlKSByZXR1cm47XG5cbiAgICAgICAgLy8gQW5kcm9pZCB3aWxsIHNlbmQgYSB0b3VjaGNhbmNlbCBpZiBpdCB0aGlua3Mgd2UncmUgc3RhcnRpbmcgdG8gc2Nyb2xsLlxuICAgICAgICAvLyBTbyB3aGVuIHRoZSB0b3RhbCBkaXN0YW5jZSAoKyBvciAtIG9yIGJvdGgpIGV4Y2VlZHMgMTBweCBpbiBlaXRoZXIgZGlyZWN0aW9uLFxuICAgICAgICAvLyB3ZSBlaXRoZXI6XG4gICAgICAgIC8vIC0gT24gdG90YWxYID4gdG90YWxZLCB3ZSBzZW5kIHByZXZlbnREZWZhdWx0KCkgYW5kIHRyZWF0IHRoaXMgYXMgYSBzd2lwZS5cbiAgICAgICAgLy8gLSBPbiB0b3RhbFkgPiB0b3RhbFgsIHdlIGxldCB0aGUgYnJvd3NlciBoYW5kbGUgaXQgYXMgYSBzY3JvbGwuXG5cbiAgICAgICAgaWYgKCFzdGFydENvb3JkcykgcmV0dXJuO1xuICAgICAgICB2YXIgY29vcmRzID0gZ2V0Q29vcmRpbmF0ZXMoZXZlbnQpO1xuXG4gICAgICAgIHRvdGFsWCArPSBNYXRoLmFicyhjb29yZHMueCAtIGxhc3RQb3MueCk7XG4gICAgICAgIHRvdGFsWSArPSBNYXRoLmFicyhjb29yZHMueSAtIGxhc3RQb3MueSk7XG5cbiAgICAgICAgbGFzdFBvcyA9IGNvb3JkcztcblxuICAgICAgICBpZiAodG90YWxYIDwgTU9WRV9CVUZGRVJfUkFESVVTICYmIHRvdGFsWSA8IE1PVkVfQlVGRkVSX1JBRElVUykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9uZSBvZiB0b3RhbFggb3IgdG90YWxZIGhhcyBleGNlZWRlZCB0aGUgYnVmZmVyLCBzbyBkZWNpZGUgb24gc3dpcGUgdnMuIHNjcm9sbC5cbiAgICAgICAgaWYgKHRvdGFsWSA+IHRvdGFsWCkge1xuICAgICAgICAgIC8vIEFsbG93IG5hdGl2ZSBzY3JvbGxpbmcgdG8gdGFrZSBvdmVyLlxuICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGV2ZW50SGFuZGxlcnNbJ2NhbmNlbCddICYmIGV2ZW50SGFuZGxlcnNbJ2NhbmNlbCddKGV2ZW50KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUHJldmVudCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZy5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50SGFuZGxlcnNbJ21vdmUnXSAmJiBldmVudEhhbmRsZXJzWydtb3ZlJ10oY29vcmRzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBlbGVtZW50Lm9uKGdldEV2ZW50cyhwb2ludGVyVHlwZXMsICdlbmQnKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybjtcbiAgICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGV2ZW50SGFuZGxlcnNbJ2VuZCddICYmIGV2ZW50SGFuZGxlcnNbJ2VuZCddKGdldENvb3JkaW5hdGVzKGV2ZW50KSwgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufV0pO1xuXG4vKiBnbG9iYWwgbmdUb3VjaDogZmFsc2UsXG4gIG5vZGVOYW1lXzogZmFsc2VcbiovXG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgbmdDbGlja1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBtb3JlIHBvd2VyZnVsIHJlcGxhY2VtZW50IGZvciB0aGUgZGVmYXVsdCBuZ0NsaWNrIGRlc2lnbmVkIHRvIGJlIHVzZWQgb24gdG91Y2hzY3JlZW5cbiAqIGRldmljZXMuIE1vc3QgbW9iaWxlIGJyb3dzZXJzIHdhaXQgYWJvdXQgMzAwbXMgYWZ0ZXIgYSB0YXAtYW5kLXJlbGVhc2UgYmVmb3JlIHNlbmRpbmdcbiAqIHRoZSBjbGljayBldmVudC4gVGhpcyB2ZXJzaW9uIGhhbmRsZXMgdGhlbSBpbW1lZGlhdGVseSwgYW5kIHRoZW4gcHJldmVudHMgdGhlXG4gKiBmb2xsb3dpbmcgY2xpY2sgZXZlbnQgZnJvbSBwcm9wYWdhdGluZy5cbiAqXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nVG91Y2ggYG5nVG91Y2hgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGNhbiBmYWxsIGJhY2sgdG8gdXNpbmcgYW4gb3JkaW5hcnkgY2xpY2sgZXZlbnQsIGFuZCBzbyB3b3JrcyBvbiBkZXNrdG9wXG4gKiBicm93c2VycyBhcyB3ZWxsIGFzIG1vYmlsZS5cbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBhbHNvIHNldHMgdGhlIENTUyBjbGFzcyBgbmctY2xpY2stYWN0aXZlYCB3aGlsZSB0aGUgZWxlbWVudCBpcyBiZWluZyBoZWxkXG4gKiBkb3duIChieSBhIG1vdXNlIGNsaWNrIG9yIHRvdWNoKSBzbyB5b3UgY2FuIHJlc3R5bGUgdGhlIGRlcHJlc3NlZCBlbGVtZW50IGlmIHlvdSB3aXNoLlxuICpcbiAqIEBlbGVtZW50IEFOWVxuICogQHBhcmFtIHtleHByZXNzaW9ufSBuZ0NsaWNrIHtAbGluayBndWlkZS9leHByZXNzaW9uIEV4cHJlc3Npb259IHRvIGV2YWx1YXRlXG4gKiB1cG9uIHRhcC4gKEV2ZW50IG9iamVjdCBpcyBhdmFpbGFibGUgYXMgYCRldmVudGApXG4gKlxuICogQGV4YW1wbGVcbiAgICA8ZXhhbXBsZSBtb2R1bGU9XCJuZ0NsaWNrRXhhbXBsZVwiIGRlcHM9XCJhbmd1bGFyLXRvdWNoLmpzXCI+XG4gICAgICA8ZmlsZSBuYW1lPVwiaW5kZXguaHRtbFwiPlxuICAgICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiY291bnQgPSBjb3VudCArIDFcIiBuZy1pbml0PVwiY291bnQ9MFwiPlxuICAgICAgICAgIEluY3JlbWVudFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgY291bnQ6IHt7IGNvdW50IH19XG4gICAgICA8L2ZpbGU+XG4gICAgICA8ZmlsZSBuYW1lPVwic2NyaXB0LmpzXCI+XG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCduZ0NsaWNrRXhhbXBsZScsIFsnbmdUb3VjaCddKTtcbiAgICAgIDwvZmlsZT5cbiAgICA8L2V4YW1wbGU+XG4gKi9cblxubmdUb3VjaC5jb25maWcoWyckcHJvdmlkZScsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICRwcm92aWRlLmRlY29yYXRvcignbmdDbGlja0RpcmVjdGl2ZScsIFsnJGRlbGVnYXRlJywgZnVuY3Rpb24oJGRlbGVnYXRlKSB7XG4gICAgLy8gZHJvcCB0aGUgZGVmYXVsdCBuZ0NsaWNrIGRpcmVjdGl2ZVxuICAgICRkZWxlZ2F0ZS5zaGlmdCgpO1xuICAgIHJldHVybiAkZGVsZWdhdGU7XG4gIH1dKTtcbn1dKTtcblxubmdUb3VjaC5kaXJlY3RpdmUoJ25nQ2xpY2snLCBbJyRwYXJzZScsICckdGltZW91dCcsICckcm9vdEVsZW1lbnQnLFxuICAgIGZ1bmN0aW9uKCRwYXJzZSwgJHRpbWVvdXQsICRyb290RWxlbWVudCkge1xuICB2YXIgVEFQX0RVUkFUSU9OID0gNzUwOyAvLyBTaG9ydGVyIHRoYW4gNzUwbXMgaXMgYSB0YXAsIGxvbmdlciBpcyBhIHRhcGhvbGQgb3IgZHJhZy5cbiAgdmFyIE1PVkVfVE9MRVJBTkNFID0gMTI7IC8vIDEycHggc2VlbXMgdG8gd29yayBpbiBtb3N0IG1vYmlsZSBicm93c2Vycy5cbiAgdmFyIFBSRVZFTlRfRFVSQVRJT04gPSAyNTAwOyAvLyAyLjUgc2Vjb25kcyBtYXhpbXVtIGZyb20gcHJldmVudEdob3N0Q2xpY2sgY2FsbCB0byBjbGlja1xuICB2YXIgQ0xJQ0tCVVNURVJfVEhSRVNIT0xEID0gMjU7IC8vIDI1IHBpeGVscyBpbiBhbnkgZGltZW5zaW9uIGlzIHRoZSBsaW1pdCBmb3IgYnVzdGluZyBjbGlja3MuXG5cbiAgdmFyIEFDVElWRV9DTEFTU19OQU1FID0gJ25nLWNsaWNrLWFjdGl2ZSc7XG4gIHZhciBsYXN0UHJldmVudGVkVGltZTtcbiAgdmFyIHRvdWNoQ29vcmRpbmF0ZXM7XG4gIHZhciBsYXN0TGFiZWxDbGlja0Nvb3JkaW5hdGVzO1xuXG5cbiAgLy8gVEFQIEVWRU5UUyBBTkQgR0hPU1QgQ0xJQ0tTXG4gIC8vXG4gIC8vIFdoeSB0YXAgZXZlbnRzP1xuICAvLyBNb2JpbGUgYnJvd3NlcnMgZGV0ZWN0IGEgdGFwLCB0aGVuIHdhaXQgYSBtb21lbnQgKHVzdWFsbHkgfjMwMG1zKSB0byBzZWUgaWYgeW91J3JlXG4gIC8vIGRvdWJsZS10YXBwaW5nLCBhbmQgdGhlbiBmaXJlIGEgY2xpY2sgZXZlbnQuXG4gIC8vXG4gIC8vIFRoaXMgZGVsYXkgc3Vja3MgYW5kIG1ha2VzIG1vYmlsZSBhcHBzIGZlZWwgdW5yZXNwb25zaXZlLlxuICAvLyBTbyB3ZSBkZXRlY3QgdG91Y2hzdGFydCwgdG91Y2hjYW5jZWwgYW5kIHRvdWNoZW5kIG91cnNlbHZlcyBhbmQgZGV0ZXJtaW5lIHdoZW5cbiAgLy8gdGhlIHVzZXIgaGFzIHRhcHBlZCBvbiBzb21ldGhpbmcuXG4gIC8vXG4gIC8vIFdoYXQgaGFwcGVucyB3aGVuIHRoZSBicm93c2VyIHRoZW4gZ2VuZXJhdGVzIGEgY2xpY2sgZXZlbnQ/XG4gIC8vIFRoZSBicm93c2VyLCBvZiBjb3Vyc2UsIGFsc28gZGV0ZWN0cyB0aGUgdGFwIGFuZCBmaXJlcyBhIGNsaWNrIGFmdGVyIGEgZGVsYXkuIFRoaXMgcmVzdWx0cyBpblxuICAvLyB0YXBwaW5nL2NsaWNraW5nIHR3aWNlLiBXZSBkbyBcImNsaWNrYnVzdGluZ1wiIHRvIHByZXZlbnQgaXQuXG4gIC8vXG4gIC8vIEhvdyBkb2VzIGl0IHdvcms/XG4gIC8vIFdlIGF0dGFjaCBnbG9iYWwgdG91Y2hzdGFydCBhbmQgY2xpY2sgaGFuZGxlcnMsIHRoYXQgcnVuIGR1cmluZyB0aGUgY2FwdHVyZSAoZWFybHkpIHBoYXNlLlxuICAvLyBTbyB0aGUgc2VxdWVuY2UgZm9yIGEgdGFwIGlzOlxuICAvLyAtIGdsb2JhbCB0b3VjaHN0YXJ0OiBTZXRzIGFuIFwiYWxsb3dhYmxlIHJlZ2lvblwiIGF0IHRoZSBwb2ludCB0b3VjaGVkLlxuICAvLyAtIGVsZW1lbnQncyB0b3VjaHN0YXJ0OiBTdGFydHMgYSB0b3VjaFxuICAvLyAoLSB0b3VjaGNhbmNlbCBlbmRzIHRoZSB0b3VjaCwgbm8gY2xpY2sgZm9sbG93cylcbiAgLy8gLSBlbGVtZW50J3MgdG91Y2hlbmQ6IERldGVybWluZXMgaWYgdGhlIHRhcCBpcyB2YWxpZCAoZGlkbid0IG1vdmUgdG9vIGZhciBhd2F5LCBkaWRuJ3QgaG9sZFxuICAvLyAgIHRvbyBsb25nKSBhbmQgZmlyZXMgdGhlIHVzZXIncyB0YXAgaGFuZGxlci4gVGhlIHRvdWNoZW5kIGFsc28gY2FsbHMgcHJldmVudEdob3N0Q2xpY2soKS5cbiAgLy8gLSBwcmV2ZW50R2hvc3RDbGljaygpIHJlbW92ZXMgdGhlIGFsbG93YWJsZSByZWdpb24gdGhlIGdsb2JhbCB0b3VjaHN0YXJ0IGNyZWF0ZWQuXG4gIC8vIC0gVGhlIGJyb3dzZXIgZ2VuZXJhdGVzIGEgY2xpY2sgZXZlbnQuXG4gIC8vIC0gVGhlIGdsb2JhbCBjbGljayBoYW5kbGVyIGNhdGNoZXMgdGhlIGNsaWNrLCBhbmQgY2hlY2tzIHdoZXRoZXIgaXQgd2FzIGluIGFuIGFsbG93YWJsZSByZWdpb24uXG4gIC8vICAgICAtIElmIHByZXZlbnRHaG9zdENsaWNrIHdhcyBjYWxsZWQsIHRoZSByZWdpb24gd2lsbCBoYXZlIGJlZW4gcmVtb3ZlZCwgdGhlIGNsaWNrIGlzIGJ1c3RlZC5cbiAgLy8gICAgIC0gSWYgdGhlIHJlZ2lvbiBpcyBzdGlsbCB0aGVyZSwgdGhlIGNsaWNrIHByb2NlZWRzIG5vcm1hbGx5LiBUaGVyZWZvcmUgY2xpY2tzIG9uIGxpbmtzIGFuZFxuICAvLyAgICAgICBvdGhlciBlbGVtZW50cyB3aXRob3V0IG5nVGFwIG9uIHRoZW0gd29yayBub3JtYWxseS5cbiAgLy9cbiAgLy8gVGhpcyBpcyBhbiB1Z2x5LCB0ZXJyaWJsZSBoYWNrIVxuICAvLyBZZWFoLCB0ZWxsIG1lIGFib3V0IGl0LiBUaGUgYWx0ZXJuYXRpdmVzIGFyZSB1c2luZyB0aGUgc2xvdyBjbGljayBldmVudHMsIG9yIG1ha2luZyBvdXIgdXNlcnNcbiAgLy8gZGVhbCB3aXRoIHRoZSBnaG9zdCBjbGlja3MsIHNvIEkgY29uc2lkZXIgdGhpcyB0aGUgbGVhc3Qgb2YgZXZpbHMuIEZvcnR1bmF0ZWx5IEFuZ3VsYXJcbiAgLy8gZW5jYXBzdWxhdGVzIHRoaXMgdWdseSBsb2dpYyBhd2F5IGZyb20gdGhlIHVzZXIuXG4gIC8vXG4gIC8vIFdoeSBub3QganVzdCBwdXQgY2xpY2sgaGFuZGxlcnMgb24gdGhlIGVsZW1lbnQ/XG4gIC8vIFdlIGRvIHRoYXQgdG9vLCBqdXN0IHRvIGJlIHN1cmUuIElmIHRoZSB0YXAgZXZlbnQgY2F1c2VkIHRoZSBET00gdG8gY2hhbmdlLFxuICAvLyBpdCBpcyBwb3NzaWJsZSBhbm90aGVyIGVsZW1lbnQgaXMgbm93IGluIHRoYXQgcG9zaXRpb24uIFRvIHRha2UgYWNjb3VudCBmb3IgdGhlc2UgcG9zc2libHlcbiAgLy8gZGlzdGluY3QgZWxlbWVudHMsIHRoZSBoYW5kbGVycyBhcmUgZ2xvYmFsIGFuZCBjYXJlIG9ubHkgYWJvdXQgY29vcmRpbmF0ZXMuXG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBjb29yZGluYXRlcyBhcmUgY2xvc2UgZW5vdWdoIHRvIGJlIHdpdGhpbiB0aGUgcmVnaW9uLlxuICBmdW5jdGlvbiBoaXQoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoeDEgLSB4MikgPCBDTElDS0JVU1RFUl9USFJFU0hPTEQgJiYgTWF0aC5hYnMoeTEgLSB5MikgPCBDTElDS0JVU1RFUl9USFJFU0hPTEQ7XG4gIH1cblxuICAvLyBDaGVja3MgYSBsaXN0IG9mIGFsbG93YWJsZSByZWdpb25zIGFnYWluc3QgYSBjbGljayBsb2NhdGlvbi5cbiAgLy8gUmV0dXJucyB0cnVlIGlmIHRoZSBjbGljayBzaG91bGQgYmUgYWxsb3dlZC5cbiAgLy8gU3BsaWNlcyBvdXQgdGhlIGFsbG93YWJsZSByZWdpb24gZnJvbSB0aGUgbGlzdCBhZnRlciBpdCBoYXMgYmVlbiB1c2VkLlxuICBmdW5jdGlvbiBjaGVja0FsbG93YWJsZVJlZ2lvbnModG91Y2hDb29yZGluYXRlcywgeCwgeSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG91Y2hDb29yZGluYXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgaWYgKGhpdCh0b3VjaENvb3JkaW5hdGVzW2ldLCB0b3VjaENvb3JkaW5hdGVzW2kgKyAxXSwgeCwgeSkpIHtcbiAgICAgICAgdG91Y2hDb29yZGluYXRlcy5zcGxpY2UoaSwgaSArIDIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gYWxsb3dhYmxlIHJlZ2lvblxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7IC8vIE5vIGFsbG93YWJsZSByZWdpb247IGJ1c3QgaXQuXG4gIH1cblxuICAvLyBHbG9iYWwgY2xpY2sgaGFuZGxlciB0aGF0IHByZXZlbnRzIHRoZSBjbGljayBpZiBpdCdzIGluIGEgYnVzdGFibGUgem9uZSBhbmQgcHJldmVudEdob3N0Q2xpY2tcbiAgLy8gd2FzIGNhbGxlZCByZWNlbnRseS5cbiAgZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgIGlmIChEYXRlLm5vdygpIC0gbGFzdFByZXZlbnRlZFRpbWUgPiBQUkVWRU5UX0RVUkFUSU9OKSB7XG4gICAgICByZXR1cm47IC8vIFRvbyBvbGQuXG4gICAgfVxuXG4gICAgdmFyIHRvdWNoZXMgPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID8gZXZlbnQudG91Y2hlcyA6IFtldmVudF07XG4gICAgdmFyIHggPSB0b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdmFyIHkgPSB0b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgLy8gV29yayBhcm91bmQgZGVza3RvcCBXZWJraXQgcXVpcmsgd2hlcmUgY2xpY2tpbmcgYSBsYWJlbCB3aWxsIGZpcmUgdHdvIGNsaWNrcyAob24gdGhlIGxhYmVsXG4gICAgLy8gYW5kIG9uIHRoZSBpbnB1dCBlbGVtZW50KS4gRGVwZW5kaW5nIG9uIHRoZSBleGFjdCBicm93c2VyLCB0aGlzIHNlY29uZCBjbGljayB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gYnVzdCBoYXMgZWl0aGVyICgwLDApLCBuZWdhdGl2ZSBjb29yZGluYXRlcywgb3IgY29vcmRpbmF0ZXMgZXF1YWwgdG8gdHJpZ2dlcmluZyBsYWJlbFxuICAgIC8vIGNsaWNrIGV2ZW50XG4gICAgaWYgKHggPCAxICYmIHkgPCAxKSB7XG4gICAgICByZXR1cm47IC8vIG9mZnNjcmVlblxuICAgIH1cbiAgICBpZiAobGFzdExhYmVsQ2xpY2tDb29yZGluYXRlcyAmJlxuICAgICAgICBsYXN0TGFiZWxDbGlja0Nvb3JkaW5hdGVzWzBdID09PSB4ICYmIGxhc3RMYWJlbENsaWNrQ29vcmRpbmF0ZXNbMV0gPT09IHkpIHtcbiAgICAgIHJldHVybjsgLy8gaW5wdXQgY2xpY2sgdHJpZ2dlcmVkIGJ5IGxhYmVsIGNsaWNrXG4gICAgfVxuICAgIC8vIHJlc2V0IGxhYmVsIGNsaWNrIGNvb3JkaW5hdGVzIG9uIGZpcnN0IHN1YnNlcXVlbnQgY2xpY2tcbiAgICBpZiAobGFzdExhYmVsQ2xpY2tDb29yZGluYXRlcykge1xuICAgICAgbGFzdExhYmVsQ2xpY2tDb29yZGluYXRlcyA9IG51bGw7XG4gICAgfVxuICAgIC8vIHJlbWVtYmVyIGxhYmVsIGNsaWNrIGNvb3JkaW5hdGVzIHRvIHByZXZlbnQgY2xpY2sgYnVzdGluZyBvZiB0cmlnZ2VyIGNsaWNrIGV2ZW50IG9uIGlucHV0XG4gICAgaWYgKG5vZGVOYW1lXyhldmVudC50YXJnZXQpID09PSAnbGFiZWwnKSB7XG4gICAgICBsYXN0TGFiZWxDbGlja0Nvb3JkaW5hdGVzID0gW3gsIHldO1xuICAgIH1cblxuICAgIC8vIExvb2sgZm9yIGFuIGFsbG93YWJsZSByZWdpb24gY29udGFpbmluZyB0aGlzIGNsaWNrLlxuICAgIC8vIElmIHdlIGZpbmQgb25lLCB0aGF0IG1lYW5zIGl0IHdhcyBjcmVhdGVkIGJ5IHRvdWNoc3RhcnQgYW5kIG5vdCByZW1vdmVkIGJ5XG4gICAgLy8gcHJldmVudEdob3N0Q2xpY2ssIHNvIHdlIGRvbid0IGJ1c3QgaXQuXG4gICAgaWYgKGNoZWNrQWxsb3dhYmxlUmVnaW9ucyh0b3VjaENvb3JkaW5hdGVzLCB4LCB5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGRpZG4ndCBmaW5kIGFuIGFsbG93YWJsZSByZWdpb24sIGJ1c3QgdGhlIGNsaWNrLlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBCbHVyIGZvY3VzZWQgZm9ybSBlbGVtZW50c1xuICAgIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuYmx1ciAmJiBldmVudC50YXJnZXQuYmx1cigpO1xuICB9XG5cblxuICAvLyBHbG9iYWwgdG91Y2hzdGFydCBoYW5kbGVyIHRoYXQgY3JlYXRlcyBhbiBhbGxvd2FibGUgcmVnaW9uIGZvciBhIGNsaWNrIGV2ZW50LlxuICAvLyBUaGlzIGFsbG93YWJsZSByZWdpb24gY2FuIGJlIHJlbW92ZWQgYnkgcHJldmVudEdob3N0Q2xpY2sgaWYgd2Ugd2FudCB0byBidXN0IGl0LlxuICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICB2YXIgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPyBldmVudC50b3VjaGVzIDogW2V2ZW50XTtcbiAgICB2YXIgeCA9IHRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICB2YXIgeSA9IHRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICB0b3VjaENvb3JkaW5hdGVzLnB1c2goeCwgeSk7XG5cbiAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgYWxsb3dhYmxlIHJlZ2lvbi5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG91Y2hDb29yZGluYXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBpZiAodG91Y2hDb29yZGluYXRlc1tpXSA9PSB4ICYmIHRvdWNoQ29vcmRpbmF0ZXNbaSArIDFdID09IHkpIHtcbiAgICAgICAgICB0b3VjaENvb3JkaW5hdGVzLnNwbGljZShpLCBpICsgMik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgUFJFVkVOVF9EVVJBVElPTiwgZmFsc2UpO1xuICB9XG5cbiAgLy8gT24gdGhlIGZpcnN0IGNhbGwsIGF0dGFjaGVzIHNvbWUgZXZlbnQgaGFuZGxlcnMuIFRoZW4gd2hlbmV2ZXIgaXQgZ2V0cyBjYWxsZWQsIGl0IGNyZWF0ZXMgYVxuICAvLyB6b25lIGFyb3VuZCB0aGUgdG91Y2hzdGFydCB3aGVyZSBjbGlja3Mgd2lsbCBnZXQgYnVzdGVkLlxuICBmdW5jdGlvbiBwcmV2ZW50R2hvc3RDbGljayh4LCB5KSB7XG4gICAgaWYgKCF0b3VjaENvb3JkaW5hdGVzKSB7XG4gICAgICAkcm9vdEVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrLCB0cnVlKTtcbiAgICAgICRyb290RWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCB0cnVlKTtcbiAgICAgIHRvdWNoQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB9XG5cbiAgICBsYXN0UHJldmVudGVkVGltZSA9IERhdGUubm93KCk7XG5cbiAgICBjaGVja0FsbG93YWJsZVJlZ2lvbnModG91Y2hDb29yZGluYXRlcywgeCwgeSk7XG4gIH1cblxuICAvLyBBY3R1YWwgbGlua2luZyBmdW5jdGlvbi5cbiAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgdmFyIGNsaWNrSGFuZGxlciA9ICRwYXJzZShhdHRyLm5nQ2xpY2spLFxuICAgICAgICB0YXBwaW5nID0gZmFsc2UsXG4gICAgICAgIHRhcEVsZW1lbnQsICAvLyBVc2VkIHRvIGJsdXIgdGhlIGVsZW1lbnQgYWZ0ZXIgYSB0YXAuXG4gICAgICAgIHN0YXJ0VGltZSwgICAvLyBVc2VkIHRvIGNoZWNrIGlmIHRoZSB0YXAgd2FzIGhlbGQgdG9vIGxvbmcuXG4gICAgICAgIHRvdWNoU3RhcnRYLFxuICAgICAgICB0b3VjaFN0YXJ0WTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0U3RhdGUoKSB7XG4gICAgICB0YXBwaW5nID0gZmFsc2U7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKEFDVElWRV9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBlbGVtZW50Lm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHRhcHBpbmcgPSB0cnVlO1xuICAgICAgdGFwRWxlbWVudCA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldCA6IGV2ZW50LnNyY0VsZW1lbnQ7IC8vIElFIHVzZXMgc3JjRWxlbWVudC5cbiAgICAgIC8vIEhhY2sgZm9yIFNhZmFyaSwgd2hpY2ggY2FuIHRhcmdldCB0ZXh0IG5vZGVzIGluc3RlYWQgb2YgY29udGFpbmVycy5cbiAgICAgIGlmICh0YXBFbGVtZW50Lm5vZGVUeXBlID09IDMpIHtcbiAgICAgICAgdGFwRWxlbWVudCA9IHRhcEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhBQ1RJVkVfQ0xBU1NfTkFNRSk7XG5cbiAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgIC8vIFVzZSBqUXVlcnkgb3JpZ2luYWxFdmVudFxuICAgICAgdmFyIG9yaWdpbmFsRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuICAgICAgdmFyIHRvdWNoZXMgPSBvcmlnaW5hbEV2ZW50LnRvdWNoZXMgJiYgb3JpZ2luYWxFdmVudC50b3VjaGVzLmxlbmd0aCA/IG9yaWdpbmFsRXZlbnQudG91Y2hlcyA6IFtvcmlnaW5hbEV2ZW50XTtcbiAgICAgIHZhciBlID0gdG91Y2hlc1swXTtcbiAgICAgIHRvdWNoU3RhcnRYID0gZS5jbGllbnRYO1xuICAgICAgdG91Y2hTdGFydFkgPSBlLmNsaWVudFk7XG4gICAgfSk7XG5cbiAgICBlbGVtZW50Lm9uKCd0b3VjaGNhbmNlbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICByZXNldFN0YXRlKCk7XG4gICAgfSk7XG5cbiAgICBlbGVtZW50Lm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgZGlmZiA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG5cbiAgICAgIC8vIFVzZSBqUXVlcnkgb3JpZ2luYWxFdmVudFxuICAgICAgdmFyIG9yaWdpbmFsRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuICAgICAgdmFyIHRvdWNoZXMgPSAob3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBvcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCkgP1xuICAgICAgICAgIG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMgOlxuICAgICAgICAgICgob3JpZ2luYWxFdmVudC50b3VjaGVzICYmIG9yaWdpbmFsRXZlbnQudG91Y2hlcy5sZW5ndGgpID8gb3JpZ2luYWxFdmVudC50b3VjaGVzIDogW29yaWdpbmFsRXZlbnRdKTtcbiAgICAgIHZhciBlID0gdG91Y2hlc1swXTtcbiAgICAgIHZhciB4ID0gZS5jbGllbnRYO1xuICAgICAgdmFyIHkgPSBlLmNsaWVudFk7XG4gICAgICB2YXIgZGlzdCA9IE1hdGguc3FydChNYXRoLnBvdyh4IC0gdG91Y2hTdGFydFgsIDIpICsgTWF0aC5wb3coeSAtIHRvdWNoU3RhcnRZLCAyKSk7XG5cbiAgICAgIGlmICh0YXBwaW5nICYmIGRpZmYgPCBUQVBfRFVSQVRJT04gJiYgZGlzdCA8IE1PVkVfVE9MRVJBTkNFKSB7XG4gICAgICAgIC8vIENhbGwgcHJldmVudEdob3N0Q2xpY2sgc28gdGhlIGNsaWNrYnVzdGVyIHdpbGwgY2F0Y2ggdGhlIGNvcnJlc3BvbmRpbmcgY2xpY2suXG4gICAgICAgIHByZXZlbnRHaG9zdENsaWNrKHgsIHkpO1xuXG4gICAgICAgIC8vIEJsdXIgdGhlIGZvY3VzZWQgZWxlbWVudCAodGhlIGJ1dHRvbiwgcHJvYmFibHkpIGJlZm9yZSBmaXJpbmcgdGhlIGNhbGxiYWNrLlxuICAgICAgICAvLyBUaGlzIGRvZXNuJ3Qgd29yayBwZXJmZWN0bHkgb24gQW5kcm9pZCBDaHJvbWUsIGJ1dCBzZWVtcyB0byB3b3JrIGVsc2V3aGVyZS5cbiAgICAgICAgLy8gSSBjb3VsZG4ndCBnZXQgYW55dGhpbmcgdG8gd29yayByZWxpYWJseSBvbiBBbmRyb2lkIENocm9tZS5cbiAgICAgICAgaWYgKHRhcEVsZW1lbnQpIHtcbiAgICAgICAgICB0YXBFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoYXR0ci5kaXNhYmxlZCkgfHwgYXR0ci5kaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBlbGVtZW50LnRyaWdnZXJIYW5kbGVyKCdjbGljaycsIFtldmVudF0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlc2V0U3RhdGUoKTtcbiAgICB9KTtcblxuICAgIC8vIEhhY2sgZm9yIGlPUyBTYWZhcmkncyBiZW5lZml0LiBJdCBnb2VzIHNlYXJjaGluZyBmb3Igb25jbGljayBoYW5kbGVycyBhbmQgaXMgbGlhYmxlIHRvIGNsaWNrXG4gICAgLy8gc29tZXRoaW5nIGVsc2UgbmVhcmJ5LlxuICAgIGVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7IH07XG5cbiAgICAvLyBBY3R1YWwgY2xpY2sgaGFuZGxlci5cbiAgICAvLyBUaGVyZSBhcmUgdGhyZWUgZGlmZmVyZW50IGtpbmRzIG9mIGNsaWNrcywgb25seSB0d28gb2Ygd2hpY2ggcmVhY2ggdGhpcyBwb2ludC5cbiAgICAvLyAtIE9uIGRlc2t0b3AgYnJvd3NlcnMgd2l0aG91dCB0b3VjaCBldmVudHMsIHRoZWlyIGNsaWNrcyB3aWxsIGFsd2F5cyBjb21lIGhlcmUuXG4gICAgLy8gLSBPbiBtb2JpbGUgYnJvd3NlcnMsIHRoZSBzaW11bGF0ZWQgXCJmYXN0XCIgY2xpY2sgd2lsbCBjYWxsIHRoaXMuXG4gICAgLy8gLSBCdXQgdGhlIGJyb3dzZXIncyBmb2xsb3ctdXAgc2xvdyBjbGljayB3aWxsIGJlIFwiYnVzdGVkXCIgYmVmb3JlIGl0IHJlYWNoZXMgdGhpcyBoYW5kbGVyLlxuICAgIC8vIFRoZXJlZm9yZSBpdCdzIHNhZmUgdG8gdXNlIHRoaXMgZGlyZWN0aXZlIG9uIGJvdGggbW9iaWxlIGFuZCBkZXNrdG9wLlxuICAgIGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQsIHRvdWNoZW5kKSB7XG4gICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsaWNrSGFuZGxlcihzY29wZSwgeyRldmVudDogKHRvdWNoZW5kIHx8IGV2ZW50KX0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBlbGVtZW50Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgZWxlbWVudC5hZGRDbGFzcyhBQ1RJVkVfQ0xBU1NfTkFNRSk7XG4gICAgfSk7XG5cbiAgICBlbGVtZW50Lm9uKCdtb3VzZW1vdmUgbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKEFDVElWRV9DTEFTU19OQU1FKTtcbiAgICB9KTtcblxuICB9O1xufV0pO1xuXG4vKiBnbG9iYWwgbmdUb3VjaDogZmFsc2UgKi9cblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1N3aXBlTGVmdFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhbiBlbGVtZW50IGlzIHN3aXBlZCB0byB0aGUgbGVmdCBvbiBhIHRvdWNoc2NyZWVuIGRldmljZS5cbiAqIEEgbGVmdHdhcmQgc3dpcGUgaXMgYSBxdWljaywgcmlnaHQtdG8tbGVmdCBzbGlkZSBvZiB0aGUgZmluZ2VyLlxuICogVGhvdWdoIG5nU3dpcGVMZWZ0IGlzIGRlc2lnbmVkIGZvciB0b3VjaC1iYXNlZCBkZXZpY2VzLCBpdCB3aWxsIHdvcmsgd2l0aCBhIG1vdXNlIGNsaWNrIGFuZCBkcmFnXG4gKiB0b28uXG4gKlxuICogVG8gZGlzYWJsZSB0aGUgbW91c2UgY2xpY2sgYW5kIGRyYWcgZnVuY3Rpb25hbGl0eSwgYWRkIGBuZy1zd2lwZS1kaXNhYmxlLW1vdXNlYCB0b1xuICogdGhlIGBuZy1zd2lwZS1sZWZ0YCBvciBgbmctc3dpcGUtcmlnaHRgIERPTSBFbGVtZW50LlxuICpcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdUb3VjaCBgbmdUb3VjaGB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gKlxuICogQGVsZW1lbnQgQU5ZXG4gKiBAcGFyYW0ge2V4cHJlc3Npb259IG5nU3dpcGVMZWZ0IHtAbGluayBndWlkZS9leHByZXNzaW9uIEV4cHJlc3Npb259IHRvIGV2YWx1YXRlXG4gKiB1cG9uIGxlZnQgc3dpcGUuIChFdmVudCBvYmplY3QgaXMgYXZhaWxhYmxlIGFzIGAkZXZlbnRgKVxuICpcbiAqIEBleGFtcGxlXG4gICAgPGV4YW1wbGUgbW9kdWxlPVwibmdTd2lwZUxlZnRFeGFtcGxlXCIgZGVwcz1cImFuZ3VsYXItdG91Y2guanNcIj5cbiAgICAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XG4gICAgICAgIDxkaXYgbmctc2hvdz1cIiFzaG93QWN0aW9uc1wiIG5nLXN3aXBlLWxlZnQ9XCJzaG93QWN0aW9ucyA9IHRydWVcIj5cbiAgICAgICAgICBTb21lIGxpc3QgY29udGVudCwgbGlrZSBhbiBlbWFpbCBpbiB0aGUgaW5ib3hcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgbmctc2hvdz1cInNob3dBY3Rpb25zXCIgbmctc3dpcGUtcmlnaHQ9XCJzaG93QWN0aW9ucyA9IGZhbHNlXCI+XG4gICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cInJlcGx5KClcIj5SZXBseTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XCJkZWxldGUoKVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cbiAgICAgIDxmaWxlIG5hbWU9XCJzY3JpcHQuanNcIj5cbiAgICAgICAgYW5ndWxhci5tb2R1bGUoJ25nU3dpcGVMZWZ0RXhhbXBsZScsIFsnbmdUb3VjaCddKTtcbiAgICAgIDwvZmlsZT5cbiAgICA8L2V4YW1wbGU+XG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1N3aXBlUmlnaHRcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYW4gZWxlbWVudCBpcyBzd2lwZWQgdG8gdGhlIHJpZ2h0IG9uIGEgdG91Y2hzY3JlZW4gZGV2aWNlLlxuICogQSByaWdodHdhcmQgc3dpcGUgaXMgYSBxdWljaywgbGVmdC10by1yaWdodCBzbGlkZSBvZiB0aGUgZmluZ2VyLlxuICogVGhvdWdoIG5nU3dpcGVSaWdodCBpcyBkZXNpZ25lZCBmb3IgdG91Y2gtYmFzZWQgZGV2aWNlcywgaXQgd2lsbCB3b3JrIHdpdGggYSBtb3VzZSBjbGljayBhbmQgZHJhZ1xuICogdG9vLlxuICpcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdUb3VjaCBgbmdUb3VjaGB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gKlxuICogQGVsZW1lbnQgQU5ZXG4gKiBAcGFyYW0ge2V4cHJlc3Npb259IG5nU3dpcGVSaWdodCB7QGxpbmsgZ3VpZGUvZXhwcmVzc2lvbiBFeHByZXNzaW9ufSB0byBldmFsdWF0ZVxuICogdXBvbiByaWdodCBzd2lwZS4gKEV2ZW50IG9iamVjdCBpcyBhdmFpbGFibGUgYXMgYCRldmVudGApXG4gKlxuICogQGV4YW1wbGVcbiAgICA8ZXhhbXBsZSBtb2R1bGU9XCJuZ1N3aXBlUmlnaHRFeGFtcGxlXCIgZGVwcz1cImFuZ3VsYXItdG91Y2guanNcIj5cbiAgICAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XG4gICAgICAgIDxkaXYgbmctc2hvdz1cIiFzaG93QWN0aW9uc1wiIG5nLXN3aXBlLWxlZnQ9XCJzaG93QWN0aW9ucyA9IHRydWVcIj5cbiAgICAgICAgICBTb21lIGxpc3QgY29udGVudCwgbGlrZSBhbiBlbWFpbCBpbiB0aGUgaW5ib3hcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgbmctc2hvdz1cInNob3dBY3Rpb25zXCIgbmctc3dpcGUtcmlnaHQ9XCJzaG93QWN0aW9ucyA9IGZhbHNlXCI+XG4gICAgICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cInJlcGx5KClcIj5SZXBseTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gbmctY2xpY2s9XCJkZWxldGUoKVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cbiAgICAgIDxmaWxlIG5hbWU9XCJzY3JpcHQuanNcIj5cbiAgICAgICAgYW5ndWxhci5tb2R1bGUoJ25nU3dpcGVSaWdodEV4YW1wbGUnLCBbJ25nVG91Y2gnXSk7XG4gICAgICA8L2ZpbGU+XG4gICAgPC9leGFtcGxlPlxuICovXG5cbmZ1bmN0aW9uIG1ha2VTd2lwZURpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBkaXJlY3Rpb24sIGV2ZW50TmFtZSkge1xuICBuZ1RvdWNoLmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBbJyRwYXJzZScsICckc3dpcGUnLCBmdW5jdGlvbigkcGFyc2UsICRzd2lwZSkge1xuICAgIC8vIFRoZSBtYXhpbXVtIHZlcnRpY2FsIGRlbHRhIGZvciBhIHN3aXBlIHNob3VsZCBiZSBsZXNzIHRoYW4gNzVweC5cbiAgICB2YXIgTUFYX1ZFUlRJQ0FMX0RJU1RBTkNFID0gNzU7XG4gICAgLy8gVmVydGljYWwgZGlzdGFuY2Ugc2hvdWxkIG5vdCBiZSBtb3JlIHRoYW4gYSBmcmFjdGlvbiBvZiB0aGUgaG9yaXpvbnRhbCBkaXN0YW5jZS5cbiAgICB2YXIgTUFYX1ZFUlRJQ0FMX1JBVElPID0gMC4zO1xuICAgIC8vIEF0IGxlYXN0IGEgMzBweCBsYXRlcmFsIG1vdGlvbiBpcyBuZWNlc3NhcnkgZm9yIGEgc3dpcGUuXG4gICAgdmFyIE1JTl9IT1JJWk9OVEFMX0RJU1RBTkNFID0gMzA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgIHZhciBzd2lwZUhhbmRsZXIgPSAkcGFyc2UoYXR0cltkaXJlY3RpdmVOYW1lXSk7XG5cbiAgICAgIHZhciBzdGFydENvb3JkcywgdmFsaWQ7XG5cbiAgICAgIGZ1bmN0aW9uIHZhbGlkU3dpcGUoY29vcmRzKSB7XG4gICAgICAgIC8vIENoZWNrIHRoYXQgaXQncyB3aXRoaW4gdGhlIGNvb3JkaW5hdGVzLlxuICAgICAgICAvLyBBYnNvbHV0ZSB2ZXJ0aWNhbCBkaXN0YW5jZSBtdXN0IGJlIHdpdGhpbiB0b2xlcmFuY2VzLlxuICAgICAgICAvLyBIb3Jpem9udGFsIGRpc3RhbmNlLCB3ZSB0YWtlIHRoZSBjdXJyZW50IFggLSB0aGUgc3RhcnRpbmcgWC5cbiAgICAgICAgLy8gVGhpcyBpcyBuZWdhdGl2ZSBmb3IgbGVmdHdhcmQgc3dpcGVzIGFuZCBwb3NpdGl2ZSBmb3IgcmlnaHR3YXJkIHN3aXBlcy5cbiAgICAgICAgLy8gQWZ0ZXIgbXVsdGlwbHlpbmcgYnkgdGhlIGRpcmVjdGlvbiAoLTEgZm9yIGxlZnQsICsxIGZvciByaWdodCksIGxlZ2FsIHN3aXBlc1xuICAgICAgICAvLyAoaWUuIHNhbWUgZGlyZWN0aW9uIGFzIHRoZSBkaXJlY3RpdmUgd2FudHMpIHdpbGwgaGF2ZSBhIHBvc2l0aXZlIGRlbHRhIGFuZFxuICAgICAgICAvLyBpbGxlZ2FsIG9uZXMgYSBuZWdhdGl2ZSBkZWx0YS5cbiAgICAgICAgLy8gVGhlcmVmb3JlIHRoaXMgZGVsdGEgbXVzdCBiZSBwb3NpdGl2ZSwgYW5kIGxhcmdlciB0aGFuIHRoZSBtaW5pbXVtLlxuICAgICAgICBpZiAoIXN0YXJ0Q29vcmRzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkZWx0YVkgPSBNYXRoLmFicyhjb29yZHMueSAtIHN0YXJ0Q29vcmRzLnkpO1xuICAgICAgICB2YXIgZGVsdGFYID0gKGNvb3Jkcy54IC0gc3RhcnRDb29yZHMueCkgKiBkaXJlY3Rpb247XG4gICAgICAgIHJldHVybiB2YWxpZCAmJiAvLyBTaG9ydCBjaXJjdWl0IGZvciBhbHJlYWR5LWludmFsaWRhdGVkIHN3aXBlcy5cbiAgICAgICAgICAgIGRlbHRhWSA8IE1BWF9WRVJUSUNBTF9ESVNUQU5DRSAmJlxuICAgICAgICAgICAgZGVsdGFYID4gMCAmJlxuICAgICAgICAgICAgZGVsdGFYID4gTUlOX0hPUklaT05UQUxfRElTVEFOQ0UgJiZcbiAgICAgICAgICAgIGRlbHRhWSAvIGRlbHRhWCA8IE1BWF9WRVJUSUNBTF9SQVRJTztcbiAgICAgIH1cblxuICAgICAgdmFyIHBvaW50ZXJUeXBlcyA9IFsndG91Y2gnXTtcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoYXR0clsnbmdTd2lwZURpc2FibGVNb3VzZSddKSkge1xuICAgICAgICBwb2ludGVyVHlwZXMucHVzaCgnbW91c2UnKTtcbiAgICAgIH1cbiAgICAgICRzd2lwZS5iaW5kKGVsZW1lbnQsIHtcbiAgICAgICAgJ3N0YXJ0JzogZnVuY3Rpb24oY29vcmRzLCBldmVudCkge1xuICAgICAgICAgIHN0YXJ0Q29vcmRzID0gY29vcmRzO1xuICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NhbmNlbCc6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2VuZCc6IGZ1bmN0aW9uKGNvb3JkcywgZXZlbnQpIHtcbiAgICAgICAgICBpZiAodmFsaWRTd2lwZShjb29yZHMpKSB7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQudHJpZ2dlckhhbmRsZXIoZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgc3dpcGVIYW5kbGVyKHNjb3BlLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBwb2ludGVyVHlwZXMpO1xuICAgIH07XG4gIH1dKTtcbn1cblxuLy8gTGVmdCBpcyBuZWdhdGl2ZSBYLWNvb3JkaW5hdGUsIHJpZ2h0IGlzIHBvc2l0aXZlLlxubWFrZVN3aXBlRGlyZWN0aXZlKCduZ1N3aXBlTGVmdCcsIC0xLCAnc3dpcGVsZWZ0Jyk7XG5tYWtlU3dpcGVEaXJlY3RpdmUoJ25nU3dpcGVSaWdodCcsIDEsICdzd2lwZXJpZ2h0Jyk7XG5cblxuXG59KSh3aW5kb3csIHdpbmRvdy5hbmd1bGFyKTtcbiIsInJlcXVpcmUoJy4vYW5ndWxhci10b3VjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSAnbmdUb3VjaCc7XG4iXX0=
