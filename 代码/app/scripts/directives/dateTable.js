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