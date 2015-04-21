//from 0.2.2


(function () {
    showLoading('正在查询车次');
    var datalist;
    var da;
    CommonFn = {
        Container: $("#trains").clone(),
        //trainseats: {},
        getTrains: function () {
            //var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            //    dates = new Date($("#Time").val().replace(/-/g, "/"));
            //    $("#mcal").html(dates.format("yyyy-MM-dd") + " " + week[dates.getDay()]);
            //
            //CommonFn.CheckDateButton();
            //CommonFn.changeCalendar();
            var dataLoader = $("#trains").dataLoader({
                initLoad: true,
                // method:"scroll",
                ajaxObj: {
                    //                  url: WebConfigUrl.ticketSearch + "?" + CommonFn.getData(),
                    url: WebConfigUrl.ticketSearch,
                    data: CommonFn.getBaseData(),
                    type: "get",
                    dataType: "jsonp",
                    cache: true,
                    timeout: 40000, //超时时间设置，单位毫秒
                    beforeSend: function () {
                        if ($(".opLayer").length == 0) { showLoading(); }
                        $("#trains").html(CommonFn.Container.html());
                        $(".again").attr("href", 'TrainQuery.html');
                        $(".again").click(function () {
                            StorageHelp.SetStorage("filter", "");
                        });

                        //                        if (typeof (window.isInit) == "undefined") {
                        //                            $("#mainPage").hide();
                        //                            window.isInit = true;
                        //                        }
                    },
                    success: function (data, loader) {
                        if (data.status) {
                            loader.isLoaded = true;
                            CommonFn.initData(data);
                            return CommonFn.buildConent(filter());
                        } else {
                            mobileUtil.dialog("服务器繁忙，请稍后再试！", "body", CommonFn.getTrains);
                        }
                    },
                    complete: function (a, status, c) {
                        $("#mainPage").show();
//                        $('#trains').css({marginTop:$('.f-tip').height()});
                        hideLoading();
                        if (status == 'timeout' || status == 'error') {
                            //超时,timeout还有error等值的情况
                            mobileUtil.dialog("服务器繁忙，请稍后再试！", "body");
                        }
                        $(".data-loader").hide();

                        $(".traindatainfo").on("click", function () {


                                    if($(this).attr("data-isbook") == 1 ||$(this).attr("data-isbook") == 2 || $(this).attr("data-isbook") == 12 ) {
                                        var time = $("#Time").val(),
                                            search = $(this).next().attr("data-place"),
                                            searchObj = JSON.parse('{"' + search.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                                        location.href = "traindetail.html?From="+searchObj.fromCity+"&To="+searchObj.toCity+"&TrainDate="+time+"&No=" + searchObj.trainNo;
                                    }

                        });

                    }
                }
            });
        },
        // getSeatsByAjax: function (object,trainno,frompy,topy,query,traindate) {
        //     var para={};
        //     var s="";
        //     para.TrainNo=trainno;
        //     para.from=frompy;
        //     para.to=topy;
        //     para.queryKey=query;
        //     para.trainDate=traindate;
        //     $.ajax({
        //         url:"traintickets.html",
        //         data:para,
        //         type:"get",
        //         cache:true,
        //         success:function(data){
        //             if(data)
        //             {
        //                 data = eval(data)[0];
        //                 s= _.template($("#ticketState-template").html(), data);
        //                 object.next().html(s);
        //             }
        //         }
        //     })
        // },
        initData: function (data) {
            var list = data.trains;
            for (var i = 0; i < list.length; i++) {
                var t = list[i].fromTime.split(":"), /*array = [], obj = {},*/ priceArr = [], cnArr = [], seatsArr = [];

                list[i].f = t[0] * 60 + t[1] * 1;
                var p = new RegExp("(\\d+).*?(\\d+)");
                var m = p.exec(list[i].usedTime);
                list[i].h = m[1] * 60 + m[2] * 1;

                if (list[i].isBook == 1 || list[i].isBook == 2 | list[i].isBook == 10) {
                    for (var j in list[i].ticketState) {
                        var ticket = list[i].ticketState[j];

                        if (j != "noseat" && ticket.state == 1) {
                            priceArr.push(ticket.price);
                            cnArr.push(ticket.cn);
                            seatsArr.push(ticket.seats);

                            //obj[list[i].ticketState[j].price] = list[i].ticketState[j].cn;
                            //array.push(list[i].ticketState[j].price);
                        }
                    }
                    if (!priceArr.toString()) {
                        var ticketNoSeat = list[i].ticketState['noseat'];
                        if(ticketNoSeat) {
                            priceArr.push(ticketNoSeat.price);
                            cnArr.push(ticketNoSeat.cn);
                            seatsArr.push(ticketNoSeat.seats);
                        }
                        //obj[list[i].ticketState['noseat'].price] = list[i].ticketState['noseat'].cn;
                        //array.push(list[i].ticketState['noseat'].price);
                    }

                    var minPrice = Math.min.apply(Math, priceArr),
                        minPriceIndex = _.indexOf(priceArr, minPrice);

                    list[i].p = minPrice;
                    list[i].r = cnArr[minPriceIndex];
                    list[i].customSeats = seatsArr[minPriceIndex];

                    //list[i].p = Math.min.apply(Math, priceArr);
                    //list[i].r = obj[list[i].p];
                }
                //CommonFn.trainseats[list[i].trainId] = { ticketState: list[i].ticketState, isBook: list[i].isBook, trainId: list[i].trainId, note: list[i].note };
            }
            datalist = data;
        },
        getData: function () {
            var data = "",
                InputParam = $("#myForm input[type=hidden]");
            for (var i = 0; i < InputParam.length; i++) {
                if (InputParam[i].value.trim() == "") continue;
                data += InputParam[i].name + "=" + InputParam[i].value;
                if (i != InputParam.length - 1) {
                    data += "&"
                }
            }
            return data;
        },
        getBaseData: function () {
            var data = {}, o = CommonFn.getCond();
            data.From = o.From;
            data.To = o.To;
            data.OrderBy = o.OrderBy;
            data.TrainDate = o.TrainDate;
            data.PlatId = 596;
            return data;
        },
        getCond: function () {
            var url = CommonFn.getData(),
                theRequest = new Object(),
                strs = url.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
            //            var filter =StorageHelp.GetStorage("filter");
            //            if(!theRequest.trainClass){theRequest.trainClass = filter?JSON.parse(filter).trainClass:theRequest.trainClass;}
            //            if(!theRequest.fromTimeSlot){theRequest.fromTimeSlot = filter?JSON.parse(filter).fromTimeSlot:theRequest.fromTimeSlot;}
            //            if(!theRequest.toTimeSlot){theRequest.toTimeSlot = filter?JSON.parse(filter).toTimeSlot:theRequest.toTimeSlot;}
            //            if(!theRequest.fromStation){theRequest.fromStation = filter?JSON.parse(filter).fromStation:theRequest.fromStation;}
            //            if(!theRequest.toStation){theRequest.toStation = filter?JSON.parse(filter).toStation:theRequest.toStation;}

            return theRequest;
        },
        changeCalendar: function(bDate) {
            var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                dateStr = $("#Time").val();
                //dates = new Date($("#Time").val().replace(/-/g, "/"));
            if(bDate) {
                dateStr =bDate;
                $("#Time").val(bDate);
            }
            var dates = new Date( dateStr.replace(/-/g, "/") );
            $("#mcal").html(dates.format("yyyy-MM-dd") + " " + week[dates.getDay()]);
            CommonFn.CheckDateButton();
        },
        CheckDateButton: function () {
            if ($("input#Time").val() && DateFn.IsSameToNow($("input#Time").val())) {
                $("#prevDate").addClass("disable");
            } else {
                $("#prevDate").removeClass("disable");
            }
            if ($("input#Time").val() && DateFn.CheckDate($("input#Time").val())) {
                $("#nextDate").addClass("disable");
            } else {
                $("#nextDate").removeClass("disable");
            }

        },
        getPrevDate: function (o) {
            if ($(o).hasClass("disable")) {
                return
            }
            $("input#Time").val(this.dateAdd($("input#Time").val(), -1).format("yyyy-MM-dd"));
            //            this.setDate($("input#Time").val());
            CommonFn.changeCalendar();
            CommonFn.getTrains(); //火车列表刷新
            //this.resetFilter(); //恢复默认
        },
        getNextDate: function (o) {
            if ($(o).hasClass("disable")) {
                return
            }
            $("input#Time").val(this.dateAdd($("input#Time").val(), 1).format("yyyy-MM-dd"));
            //            this.setDate($("input#Time").val());
            CommonFn.changeCalendar();
            CommonFn.getTrains(); //火车列表刷新
            //this.resetFilter(); //恢复默认
        },
        initFilter: function (data) {
            //            var $froms = $("#filterPage>div").eq(4).find("ul");
            //            var $tos = $("#filterPage>div").eq(5).find("ul");
            var $froms = $("#filterPage #scroller3>ul"), $tos = $("#filterPage #scroller4>ul");
            var d = '<li class="active">不限<em class="grengou icon-train"></em></li>';
            var formitems = d, toitems = d;
            for (var i = 0; i < data.froms.length; i++) {
                formitems += "<li data-val='" + data.froms[i].Name + "'>" + data.froms[i].Name + "</li>";
            }
            for (var j = 0; j < data.tos.length; j++) {
                toitems += "<li data-val='" + data.tos[j].Name + "'>" + data.tos[j].Name + "</li>";
            }
            $froms.html(formitems);
            $tos.html(toitems);
            initSelected();
            $froms.add($tos).find("li").click(function () { select(this) });
        },
        buildConent: function (data) {
            var RHtml = "";
            if (data.trains.length > 0) {
                $(".fail").hide();
                $(".filtrate li").addClass("touchable");
                //执行一次初始化筛选信息
                if (typeof (window.isInitFilter) == "undefined") {
                    this.initFilter(data);
                    window.isInitFilter = true;
                }
                //console.log(data.trains)
                RHtml = _.template($("#trainList-template").html(), data);
                //                    $(".fail").show();
                //                    $("#filtrate").hide();
                //                } else {
                $("#filtrate").show();
                //                }
            } else {
                //$("#filtrate").hide();
                $(".fail").show();
                $(".filtrate li em").removeClass("greenarrow");
                $(".filtrate li").eq(0).removeClass("on touchable");
                $(".filtrate li").eq(1).removeClass("on touchable");
            }
            $("#mainPage").show();
            return RHtml;
        },
        dateAdd: function (b, a) {
            return new Date(b.split("-")[0], parseInt(b.split("-")[1], 10) - 1, parseInt(b.split("-")[2], 10) + a)
        },
        resetFilter: function () {//重置筛选内容
            //            StorageHelp.SetStorage("filter", "");
            $("#filterPage .filtercont input[type=hidden]").val("");
            //            $("#filtercont_tab").find("li em")[0].outerHTML = "";
            //            $("#filtercont_tab").find("li:first").prepend("<em class=\"ogcircle\"></em>");
            $(".filter_scroll .scroller").each(function () {
                $(this).find("li em").remove();
                $(this).find("li").removeClass("active");
                $(this).find("li:first").append("<em class=\"grengou icon-train\"></em>").addClass("active");
                $(this).find("li:first").addClass("active");
                if ($(this).attr("data") == "0") {
                    $(this).attr("style", "display:block");
                } else {
                    $(this).attr("style", "display:none");
                }
            });
            $("#filtercont_tab li").removeClass("active");
            $("#filtercont_tab li:first").addClass("active");
        },
        bindData: function (data) {
            $("#trains section").remove();//清楚数据
            //$("#trains").html($("#fail-template").html());//清除数据
            //            $("#trains").html(""); //清除数据
            var RHtml = "";

            var list = data.trains;
            if (list.length > 0) {
                $(".fail").hide();
                $(".filtrate li").addClass("touchable");
                RHtml = _.template($("#trainList-template").html(), data);
                //if (RHtml) {
                //                    $('#trains').html(RHtml);
                //                setTimeout(function(){ $('#trains').append(RHtml);},50);
                $('#trains').append(RHtml);
                $("#filtrate").show();
                //} else {
                //     $(".fail").show();
                //   $("#filtrate").hide();
                // }
                //                hideLoading();
            } else {
                //$("#filtrate").hide();
                $(".fail").show();
                $(".filtrate li em").removeClass("greenarrow");
                $(".filtrate li em").eq(2).addClass('icon-train');
                $(".filtrate li").eq(0).removeClass("on touchable");
                $(".filtrate li").eq(1).removeClass("on touchable");
            }
           /* $(".traindatainfo").on("click", function () {
                $(this).next().toggleClass('none');
                $(this).children().eq(1).toggleClass('roateup');
                var key = $(this).attr("trainId");
                var data = CommonFn.trainseats[key];
                s = _.template($("#ticketState-template").html(), data);
                $(this).next().html(s);
            });*/
            $(".traindatainfo").on("click", function () {
                if($(this).attr("data-isbook") == 1 ||$(this).attr("data-isbook") == 2 || $(this).attr("data-isbook") == 12) {
                    var time = $("#Time").val(),
                        search = $(this).next().attr("data-place"),
                        searchObj = JSON.parse('{"' + search.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                    location.href = "traindetail.html?From="+searchObj.fromCity+"&To="+searchObj.toCity+"&TrainDate="+time+"&No=" + searchObj.trainNo;
                }
            });
           /* $("#trains .traindatainfo").last().on("click", function (s) {
                window.scrollTo(0, 100000)
            });*/
            hideLoading()
        },
        PolicyDateValidate: {
            presellStratDate: new Date(2014, 11, 1), //预售日期
            presellChangeEndDate: new Date(2014, 11, 6), //预售变动截止日期
            presellDepStartDate: new Date(2014, 11, 30), //预售发车起始时间
            presellAdvanceDays: 60, //新政策预售提前天数
            getcurrentServerTime: function () { return (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date() },//获取服务器时间

            /*
             * 根据传入日期获取最早发车日期, 默认当前时间 */
            getPolicyDepDate: function (date) {
                var _this = this,
                    currentTime = date || this.getcurrentServerTime(),//当前服务器时间
                    currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()),//当前日期
                    canPresell = currentTime >= this.presellStratDate; //是否可以预售

                //获取当前站点出发日期
                var getDepDate = function () {
                    if (currentDate < _this.presellStratDate) {//当前时间 12.1 之前无法预售
                        return null;
                    }
                        /*	2014.12.1 ~ 2014.12.7
                         预售时间等差递增
                         2014.12.30 ~ 2015.2.7 步长 7 */
                    else if (currentDate >= _this.presellStratDate && currentDate <= _this.presellChangeEndDate) {

                        var dDays = currentDate.getDate() - _this.presellStratDate.getDate();
                        return new Date(_this.presellDepStartDate.getTime() + dDays * 7 * 24 * 60 * 60 * 1000);
                    }
                    else {//2014, 12, 7 以后，统一提前60天购票
                        return new Date(currentDate.getTime() + (_this.presellAdvanceDays - 1) * 24 * 60 * 60 * 1000);
                    }
                }

                // 预售当天7:00 之前，可以预售 至有效日； 7:00之后后延1日
                var depDate = getDepDate();
                if (canPresell == false || depDate == null) {
                    return null;
                }
                else {
                    return depDate;
                }
            }
        }
    };
    //function isOpenLij(fn, fn1) {
    //    var url = WebConfigUrl.PublicInterface;
    //    var para = { Parameters: "wirelessPriceIsOpen", MothedName: "getmemcachedvalue", MothedVersion: "V1.0.1" };
        //        $.ajax({
        //            url:url,
        //            data:{para:JSON.stringify(para)},
        //            type:"get",
        //            dataType:"jsonp",
        //            success:function(d){
        //                console.log(d)
        //                if(d == "1"){
        //                    if(fn)fn();
        //                }else{
        //                    if(fn1)fn1();
        //                }
        //            },
        //            error:function(d){
        //                console.log("读取立减1元开关error")
        //            },
        //            complete:function(){
        //            }
        //        });
        //if (fn) fn();
    //}

    //筛选浮层
    $("#filtercont_tab li").bind("click", function () {
        //        $("#filtercont_tab").find("li em")[0].outerHTML = "";
        //        $(this).html('<em class="ogcircle"></em>' + $(this).html());
        $(this).html($(this).html());
        $("#filtercont_tab li").removeClass("active");
        var num = $(this).attr("data");
        $(".filter_scroll .scroller").each(function () {
            if ($(this).attr("data") == num) {
                $(this).attr("style", "display:block");
            } else {
                $(this).attr("style", "display:none");
            }
        });
        $(this).addClass("active");
    });



    /*****日期筛选*******/
    DateFn = {
        CheckDate: function (date) {
            var now = (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date();
            var future = CommonFn.PolicyDateValidate.getPolicyDepDate() || new Date(Date.parse((typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date()) + 19 * 24 * 60 * 60 * 1000),
                n_year = future.getFullYear(), n_month = future.getMonth() + 1, n_day = future.getDate();
            var c_year = parseInt(date.split("-")[0], 10), c_month = parseInt(date.split("-")[1], 10), c_day = parseInt(date.split("-")[2], 10);
            return (c_year == n_year) && (c_month == n_month) && (c_day == n_day);
        },
        IsSameToNow: function (date) {
            var now = (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date(), n_year = now.getFullYear(), n_month = now.getMonth() + 1, n_day = now.getDate();
            var c_year = parseInt(date.split("-")[0], 10), c_month = parseInt(date.split("-")[1], 10), c_day = parseInt(date.split("-")[2], 10);
            return (c_year == n_year) && (c_month == n_month) && (c_day == n_day);
        }
    }


    //初始化page插件
    page.init();

    $("#headnav").delegate("#nextDate", "click", function () {
        CommonFn.getNextDate(this);
    });

    $("#headnav").delegate("#prevDate", "click", function () {
        CommonFn.getPrevDate(this);
    });

    $("#trains").delegate(".train_list_tab", "click", function (e) {
        var l = $(e.srcElement).parents(".train_detail").length;
        var f = $(e.srcElement).attr("class") == "adjust touchable";
        if (l == 0 && !f) {
            $(this).toggleClass('opened').find(".train_detail").toggle().find("li:last").css({ borderBottomWidth: 0 });
        }
    });
   /* $("#trains").delegate(".adjust", "click", function (e) {
        $.dialog({
            content: $(".adjustTip").clone().html(),
            buttons: {
                '不需要': function () {
                    this.destroy();
                },
                '去补票': function () {
                    var arr = $(e.srcElement).attr("_href").split("-");
                    //                alert(arr.toString());
                    var a = {}; a.trainNum = arr[0], a.from = arr[1], a.to = arr[2];
                    location.href = "arealist-" + $(e.srcElement).attr("_href") + ".html";
                }
            }
        }).open();
    });*/



    //底部筛选滑动动画
    var trainsElement = $("#trains"),
        filtrate = $("#filtrate"),
        timer;
    var startY = 0,
        endY  = 0;
    trainsElement.bind('touchstart', function (evt) {
        if (evt.targetTouches.length == 1) startY = evt.targetTouches[0].pageY;
        clearTimeout(timer);
    });

    trainsElement.bind('touchmove', function (evt) {
        if (evt.targetTouches.length == 1) { endY = evt.targetTouches[0].pageY;}
        var move = Math.round(endY - startY);  //移动的距离
        if(move > 0) {
            filtrate.removeClass('hide-bottom').addClass('show-bottom');
        } else {
            filtrate.removeClass('show-bottom').addClass('hide-bottom');
        }
    });

    trainsElement.bind('touchend', function () {
        startY = 0;
        endY  = 0;
        timer = setTimeout(function() {
            filtrate.removeClass('hide-bottom').addClass('show-bottom');
        }, 2500);
    });




    //筛选部分
    function select(obj) {
        $(obj.parentNode).find("li.active").removeClass("active");
        $(obj).addClass("active");
        $(obj.parentNode).find("li em")[0].outerHTML = "";
        $(obj).append("<em class=\"grengou icon-train\"></em>");
        $(obj.parentNode.parentNode).find("input[type='hidden']").val($(obj).attr("data-val"));
    }
    //点击效果
    $("#filterPage .filter_scroll ul li").click(function () {
        select(this);
    });

    /*无用代码start*/
    /*
    $("#filterPage>div>p").click(function () {
        $(this).next().toggle();
        $(".tra_left", this).toggleClass("trans_right");
    });
    */
    /*无用代码end*/

    //开始过滤
    $("#filterPage #btnFilter").on(mobileUtil.click, function () {
        showLoading();
        //        $("#paramPage").val("1"); //重置页数
        $("#filterPage").addClass("none");
        startScroll();
        StorageHelp.SetStorage("filter", JSON.stringify(CommonFn.getCond()));
        setTimeout(function () {
            CommonFn.bindData(filter()); //更新数据
        }, 100);
    });
    //恢复默认
    $("#btnResetVal").click(function () { CommonFn.resetFilter(); });

   /* $("#trains").delegate(".train_detail li", {
        click: function (e) {
             if(!$(this).hasClass("no-ticket")) {
                showLoading();
                var no = $(this).parents(".train_detail").attr("data-no"),
                    data = $(this).parents(".train_detail").attr("data-place"),
                    seatType = $(this).attr("data-cn"),
                    time = $("#Time").val();
                //清除常用联系人本地储存
                if (localStorage.Contacts) {
                    var _arr = localStorage.Contacts.split(",");
                    for (var i in _arr) {
                        delete localStorage["Contacts-" + _arr[i]];
                    }
                    delete localStorage.Contacts;
                }
                location.href = "trainbook.html?seatType=" + seatType + "&" + data;
            }
            //            } else {
            //                location.href = "http://img1.40017.cn/touch/newproject/traffic/html/trainoneyuan.html";
            //            }
        }
    });*/

    $(".layer").on("click", function () {
        $("#filterPage").toggleClass("none");
        startScroll();    //滚动条
    });

    //出发时间，耗时重新请求排序
    $(".filtrate").delegate("li", mobileUtil.click, function () {

        $(".filtrate li em").removeClass("greenarrow");
        var index = $(this).index();
        if (index < 2 && da.trains.length > 0) {
            showLoading();
            startScroll();
            $(".filtrate li").removeClass("on");
            $(this).addClass("on");
            $(".filtrate li em").removeClass("greenselect");
            //$(".filtrate li em.grayselect").removeClass("icon-train");
            $("#filterPage").addClass("none");
            $("em", this).toggleClass("roateright");
            
            $("em", this).addClass("greenarrow");

            var _this = this;
            setTimeout(function () {
                var order = $(_this).attr('orderby');
                if (!da) { da = $.extend({}, datalist); }
                switch (index) {
                    case 0:
                        da.trains.sort(function (a, b) {
                            return order == '1' ? (b.f - a.f) : (a.f - b.f);
                        });
                        $(_this).attr('orderby', order == '1' ? '0' : '1');
                        break;
                    case 1:
                        da.trains.sort(function (a, b) {
                            return order == '1' ? (b.h - a.h) : (a.h - b.h);
                        });
                        break;
                }
                $(_this).attr('orderby', order == '1' ? '0' : '1');
                CommonFn.bindData(da); //更新数据
            }, 100);
        } else if (index == 2) {
            $(".filtrate li").removeClass("on");
            $(this).addClass("on");
            $("em", this).addClass("greenselect").addClass("icon-train");
            $("#filterPage").toggleClass("none");
            if ( !$("#filterPage").hasClass("none")) {
                stopScroll();
                initSelected();
            } else {
                startScroll();
            }
        }

        //        var name = this.getAttribute("name"),
        //            orderType = this.getAttribute("ordertype"),
        //            orderby = this.getAttribute("orderby");
        //        if ($(this).hasClass("on")) {
        //            if (name == "filter") {
        //                $("#filterPage").toggle();
        //                if($("#filterPage").attr("class")=="none"){
        //                    startScroll();
        //                    initSelected();
        //                }else{
        //                    stopScroll();
        //                }
        //            } else {
        //                $("em", this).toggleClass("roateright");
        //            }
        //        } else {
        //            var fontcss = $("#filtrate .filtrate ul li");
        //            fontcss.removeClass("on");
        //            $(this).addClass("on");
        //
        //            $("#filtrate .filtrate ul li.tab em").each(function (index) {
        //                if (index == 2) {
        //                    $(this).removeClass("greenselect").addClass("grayselect");
        //                } else {
        //                    $(this).removeClass("greenarrow").addClass("grayarrow");
        //                }
        //            });
        //
        //            if (name == "filter") {
        //                $("em", this).removeClass("grayselect").addClass("greenselect");
        //                $("#filterPage").show();
        //                //禁止滑动
        //                stopScroll();
        ////                $("body").on("touchmove", function(a) {
        ////                    a.preventDefault();
        ////                })
        //            } else {
        //                $("em", this).removeClass("grayarrow").addClass("greenarrow");
        //                orderby == "0" ? orderby = "1" : orderby = "0";
        //                $("#filterPage").hide();
        //                startScroll();
        //            }
        //        }
        //        if(name=="bt"||name == "time"){
        //            showLoading();
        //            $("#orderType").val(orderType);
        //            $("#orderby").val(orderby);
        ////            var type = $(this).attr('data');
        ////            if (model.listSort[type]) {
        ////                $(this).toggleClass("rotate");
        ////                model.listSort['order' + type] = !model.listSort['order' + type];
        ////            } else {
        ////                model.listSort.byTime = !model.listSort.byTime;
        ////                model.listSort.byPrice = !model.listSort.byPrice;
        ////            }
        ////
        ////            model.listSort.byrecf = false;
        ////            sortModel(model.listSort, model.filter);
        //
        //            if(!da){
        //                da = $.extend({},datalist);
        //            }
        //
        //            da.trains.sort(function (a, b) {
        //                switch (name) {
        //                    case "bt":
        //                        var one = a.f;
        //                        var two = b.f;
        //                        break;
        //                    case "time":
        //                        var one = a.h;
        //                        var two = b.h;
        //                        break;
        //                }
        //                if(orderby=="0"){
        //                    return  one- two;
        //                }else{
        //                    return two - one;
        //                }
        //            });
        //            CommonFn.bindData(da); //更新数据
        //            $(this).attr("orderby", orderby == "0" ? "1" : "0");
        //        }
    });

    function filter() {
        var a = StorageHelp.GetStorage("filter") ? JSON.parse(StorageHelp.GetStorage("filter")) : CommonFn.getCond();
        var g = $("#Time").val().replace(/-/g, "/"), b = a.trainClass, c = a.fromTimeSlot, d = a.toTimeSlot, e = a.fromStation, f = a.toStation;
        da = $.extend({}, datalist);

        if (b) {
            switch (b) {
                case "GD|C|D":
                    da.trains = $.grep(datalist.trains, function (item) {
                        return item.sort == "GD" || item.sort == "D" || item.sort == "C";
                    });
                    break;
                case "KT|KKS|KPK|KPM|KS|PK|PM|XGZ|Z":
                    da.trains = $.grep(datalist.trains, function (item) {
                        return item.sort == "KT" || item.sort == "KKS" || item.sort == "KPK" || item.sort == "KPM" || item.sort == "KS" || item.sort == "PK" || item.sort == "PM" || item.sort == "XGZ" || item.sort == "Z";
                    });
                    break;
            }
        }

        if (c) {
            var startTime = 0;
            var endTime = 0;
            var dateFrom = 0;
            switch (c) {
                case "0-6":
                    startTime = Date.parse(g + " 00:00");
                    endTime = Date.parse(g + " 06:00");

                    break;
                case "6-12":
                    startTime = Date.parse(g + " 06:00");
                    endTime = Date.parse(g + " 12:00");
                    break;
                case "12-18":
                    startTime = Date.parse(g + " 12:00");
                    endTime = Date.parse(g + " 18:00");
                    break;
                case "18-24":
                    startTime = Date.parse(g + " 18:00");
                    endTime = Date.parse(g + " 23:59");
                    break;
            };
            da.trains = $.grep(da.trains, function (item) {
                dateFrom = Date.parse(g + " " + item.fromTime);
                return dateFrom > startTime && dateFrom < endTime;
            });
        }

        if (d) {
            var a_startTime = 0;
            var a_endTime = 0;
            var a_dateFrom = 0;
            switch (d) {
                case "0-6":
                    a_startTime = Date.parse(g + " 00:00");
                    a_endTime = Date.parse(g + " 06:00");

                    break;
                case "6-12":
                    a_startTime = Date.parse(g + " 06:00");
                    a_endTime = Date.parse(g + " 12:00");
                    break;
                case "12-18":
                    a_startTime = Date.parse(g + " 12:00");
                    a_endTime = Date.parse(g + " 18:00");
                    break;
                case "18-24":
                    a_startTime = Date.parse(g + " 18:00");
                    a_endTime = Date.parse(g + " 23:59");
                    break;
            };
            da.trains = $.grep(da.trains, function (item) {
                a_dateFrom = Date.parse(g + " " + item.toTime);
                return a_dateFrom > a_startTime && a_dateFrom < a_endTime;
            });
        }

        if (e) {
            da.trains = $.grep(da.trains, function (item) {
                return e == item.fromCity;
            });
        }

        if (f) {
            da.trains = $.grep(da.trains, function (item) {
                return f == item.toCity;
            });
        }

        return da;
    }

    function GetServiceTime(fn) {
        $.ajax({
            url: WebConfigUrl.PublicServiceTime,
            dataType: "jsonp",
            timeout: 3000,
            beforeSend: function () {

            },
            success: function (obj) {
                if (obj.ResponseStatus) {
                    SERVERTIME = obj.ResponseMessage.replace(/-/g, '/');
                }
            },
            complete: function (rxl, state) {
                if (fn) fn();
            }
        });
    }

    function initCal() {
        //日历插件
        $("#mcal").on("click", function () {
            $("#calContainerPage").find(".calendar").remove();
            //            GetServiceTime(function(){
            var c = $.calendar({
                mode: "rangeFrom",
                startDate: (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date(),
                endDate: CommonFn.PolicyDateValidate.getPolicyDepDate() || new Date(Date.parse((typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date()) + 19 * 24 * 60 * 60 * 1000),
                wrapper: $("#calContainerPage"),
                currentDate: [$("#Time").val()],
                fn: function (dates) {
                    dates = new Date(dates.join("/"));
                    StorageHelp.SetStorage("bDate", dates.format("yyyy-MM-dd"));
                    $("#Time").val(dates.format("yyyy-MM-dd"));

                    CommonFn.changeCalendar();
                    CommonFn.getTrains();

                    page.close();
                    //$("#calContainer").hide();
                },
                buildContent: function (date, dateStr, classArr, data) {
                    var htmlStr;
                    var today = (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date();
                    var todayC = (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date();
                    var tomorrow = new Date(today.setDate(today.getDate() + 1));
                    var afterDay = new Date(today.setDate(tomorrow.getDate() + 1));
                    htmlStr = dateStr ? dateStr : date.getDate();

                    if (date.format("yyyyMMdd") == tomorrow.format("yyyyMMdd")) {
                        htmlStr = "明天";
                    }
                    if (date.format("yyyyMMdd") == afterDay.format("yyyyMMdd")) {
                        htmlStr = "后天";
                    }
                    if (classArr.toString().indexOf("today") >= 0) {
                        htmlStr = date.getDate();
                    }
                    if (date.format("yyyyMMdd") == todayC.format("yyyyMMdd")) {
                        htmlStr = "<div class='today'>今天</div>";
                    }
                    if (dateStr && dateStr.length >= 3) {
                        htmlStr = "<div style='font-size: 10px'>" + dateStr + "</div>";
                    }
                    return htmlStr;
                }
            });

            $("#calContainerPage").find("th").forEach(function (th, index) {
                $(th).text(th.innerHTML.replace('周', ''));
            });

            ////设置选中日期背景
            //var selectedDate = $('#Time').val(), year = selectedDate.split('-')[0], month = selectedDate.split('-')[1], day = selectedDate.split('-')[2];
            //var td = $('div[data-year="' + year + '"][data-month="' + month + '"] td[data-day="' + day + '"]');
            //td[0] && td.addClass('background-action').css('color', '#fff');

            //可购买日期提示
            $("#calContainerPage .tip").remove();
            var startM = c.startDate.getMonth() + 1, startD = c.startDate.getDate(), endM = c.endDate.getMonth() + 1, endD = c.endDate.getDate();
            $("#calContainerPage").append('<div class="tip"><p>今天是' + startM + '月' + startD + '号，可购买' + endM + '月' + endD + '号的火车票</p><p>部分车次预售期特殊，请以车站当日公布的为准</p></div>')


            $("#calContainerPage .disabled[data-day]").on("click", function () {
                //根据data-attr获取选中的日期
                var calendarWrapper = $(this).parents(".calendar-wrapper");
                var selectedDate = calendarWrapper.attr("data-year") + "/" + calendarWrapper.attr("data-month") + "/" + $(this).attr("data-day");
                selectedDate = new Date(selectedDate);
                var endDate = c.endDate;
                //选中日期大于最晚开售日期提示
                if (selectedDate.getTime() - endDate.getTime() > 0) {
                    var sellDate = new Date(selectedDate.setDate(selectedDate.getDate() - 59));
                    mobileUtil.dialog("您所选的日期" + sellDate.format("M月d号") + "开售", "body");
                } else {
                    mobileUtil.dialog("所选日期不在预售期内，暂不开售火车票", "body");
                }
            });
            //page.open('calendar');
            page.open('calContainer');
            //            })
        });

    }

    function initSelected() {
        //        var fi = CommonFn.getCond();
        var fi = StorageHelp.GetStorage("filter") ? JSON.parse(StorageHelp.GetStorage("filter")) : CommonFn.getBaseData();
        //        var fi = StorageHelp.GetStorage("filter");
        if (fi.trainClass || getRequest().filter) {
            $("#scroller0 ul li em").remove();
            if (fi.trainClass == "GD|C|D" || getRequest().filter == "GD|C|D") {
                $("#scroller0 ul li").removeClass("active").eq(1).addClass("active").append("<em class=\"grengou icon-train\"></em>");
            } else if (fi.trainClass == "KT|KKS|KPK|KPM|KS|PK|PM|XGZ|Z") {
                $("#scroller0 ul li").removeClass("active").eq(2).addClass("active").append("<em class=\"grengou icon-train\"></em>");
            }
        } else {
            $("#scroller0 ul li em").remove();
            $("#scroller0 ul li").removeClass("active").eq(0).addClass("active").append("<em class=\"grengou icon-train\"></em>");
        }
        if (fi.fromTimeSlot) {
            $("#scroller1 ul li em").remove();
            var i;
            switch (fi.fromTimeSlot) {
                case "0-6": i = 1; break;
                case "6-12": i = 2; break;
                case "12-18": i = 3; break;
                case "18-24": i = 4; break;
            }
            $("#scroller1 ul li").removeClass("active").eq(i).addClass("active").append("<em class=\"grengou icon-train\"></em>");
        } else {
            $("#scroller1 ul li em").remove();
            $("#scroller1 ul li").removeClass("active").eq(0).addClass("active").append("<em class=\"grengou icon-train\"></em>");
        }
        if (fi.toTimeSlot) {
            $("#scroller2 ul li em").remove();
            var j;
            switch (fi.toTimeSlot) {
                case "0-6": j = 1; break;
                case "6-12": j = 2; break;
                case "12-18": j = 3; break;
                case "18-24": j = 4; break;
            }
            $("#scroller2 ul li").removeClass("active").eq(j).addClass("active").append("<em class=\"grengou icon-train\"></em>");
        } else {
            $("#scroller2 ul li em").remove();
            $("#scroller2 ul li").removeClass("active").eq(0).addClass("active").append("<em class=\"grengou icon-train\"></em>");
        }
        if (fi.fromStation) {
            $("#scroller3 ul li em").remove();
            //            console.log($("#scroller3 ul li"))
            $("#scroller3 ul li").each(function () {
                //                console.log($(this).attr("data-val"))
                if (fi.fromStation == $(this).attr("data-val")) {
                    $("#scroller3 ul li").removeClass("active");
                    $(this).addClass("active").append("<em class=\"grengou icon-train\"></em>");
                }
            });
        } else {
            $("#scroller3 ul li em").remove();
            $("#scroller3 ul li").removeClass("active").eq(0).addClass("active").append("<em class=\"grengou icon-train\"></em>");
        }
        if (fi.toStation) {
            $("#scroller4 ul li em").remove();
            //            console.log($("#scroller4 ul li"))
            $("#scroller4 ul li").each(function () {
                //                console.log($(this).attr("data-val"))
                if (fi.toStation == $(this).attr("data-val")) {
                    $("#scroller4 ul li").removeClass("active");
                    $(this).addClass("active").append("<em class=\"grengou icon-train\"></em>");
                }
            });
        } else {
            $("#scroller4 ul li em").remove();
            $("#scroller4 ul li").removeClass("active").eq(0).addClass("active").append("<em class=\"grengou icon-train\"></em>");
        }

    }


    $(function() {
        initCal();
        CommonFn.changeCalendar( StorageHelp.GetStorage("bDate") );
        GetServiceTime(CommonFn.getTrains); //获取火车列表

        var filter = getRequest().filter;
        if (filter) {
            select($("#filterPage .filter_scroll ul").find("li")[1]);
            StorageHelp.SetStorage("filter", JSON.stringify(CommonFn.getCond()))
        }

        //hScrollbar, 水平的滚动条是否显示选项
        //vScrollbar, 垂直的滚动条是否显示选项
        //[new iScroll("scroller0", { hScrollbar: false, vScrollbar: false }), new iScroll("scroller1", { hScrollbar: false, vScrollbar: false }), new iScroll("scroller2", { hScrollbar: false, vScrollbar: false }), new iScroll("scroller3", { hScrollbar: false, vScrollbar: false }), new iScroll("scroller4", { hScrollbar: false, vScrollbar: false })];
    //}
    });

})();

