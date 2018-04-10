function storageIndex(type){    
    if(getRequest().from=="el"){
        StorageHelp.SetSessionStorage("sessionForOrderDetail","el");
    }
    if(!getRequest().bDate){
        return;
    }
    if(type==2){
        var urlParam=StorageHelp.GetStorage("urlParam");
        if(JSON.stringify(getRequest())==urlParam){
            if(!StorageHelp.GetStorage("bDate")){
                StorageHelp.SetStorage("bDate",urlParam.bDate);
            }
        }else{
            StorageHelp.SetStorage("urlParam",JSON.stringify(getRequest()));
            urlParam=StorageHelp.GetStorage("urlParam");
            urlParam=JSON.parse(urlParam);
            if(urlParam.bDate){
                StorageHelp.SetStorage("bDate",urlParam.bDate);              
            }
            if(getRequest().trainType=="GCD"){
                StorageHelp.SetStorage("filter",JSON.stringify({"trainClass":"GD|C|D"}));    
            }else{
                StorageHelp.SetStorage("filter",JSON.stringify({"trainClass":""}));    
            }
        }
        
        return;
    }
    var urlParam=StorageHelp.GetStorage("urlParam");
    if(JSON.stringify(getRequest())==urlParam){
        if(!StorageHelp.GetStorage("bDate")){
            StorageHelp.SetStorage("bDate",urlParam.bDate);
        }

    }else{
        StorageHelp.SetStorage("urlParam",JSON.stringify(getRequest()));
        urlParam=StorageHelp.GetStorage("urlParam");
        urlParam=JSON.parse(urlParam);
        if(urlParam.bDate){
            StorageHelp.SetStorage("bDate",urlParam.bDate);              
        }
        if(getRequest().trainType=="GCD"){
            StorageHelp.SetSessionStorage("trainType","G|C,D");
        }else{
            StorageHelp.SetSessionStorage("trainType","");
        }
        StorageHelp.SetSessionStorage("trainFromTime","");
        StorageHelp.SetSessionStorage("trainToTime","");
        StorageHelp.SetSessionStorage("trainFromStation","");
        StorageHelp.SetSessionStorage("trainToStation","");
    }
    
}
void function(){
    var win = window;
    var _XMLHttpRequest = win._$_XMLHttpRequest || win.XMLHttpRequest;

    var ngis = function(){
        function p(k){
            var n = []
            for(var i = 0; i < k.length; i+=1){
                n.push(k.charCodeAt(i) - 97)
            }
            return String.fromCharCode(parseInt(n.join('')))
        }
        var list = []
        $.each(arguments, function(i, x) {
            list[i] = ''
            $.each(x, function(j, y){
                list[i] += p(y)
            });
        })
        return list
    }(["bbf","baf","bad","bba"], ["id","hg","ei","ei","gh","gf","gf","gi","gi","ei","gh","ff","ej","ej","gj","ff","fc","fe","hc","ha","gf","ej","fe","ge","di","fh","dg","fb","gj","ej","fe","ha","gj","fa","ha","fc","ec","di","je","fe","fc","gj","ha","gi","ei","gh","ff","ej","ej","gj","ff","fg","fd","gg","ej","ha","gf","hg","gj","gj","ej","fe","ha","gj","fa","ha","ec","fg","dg","fh"], ["dg"], ["baj", "baa", "fd"])


    function getQS(key, str) {
        return new RegExp("[&? ]+" + key + "=([^&]*)&?").test('&' + str) ? decodeURIComponent(RegExp["$1"].replace(/\+/g, "%20")) : "";
    }

    function mixinSgn(str){        
        var param = str.indexOf('?') > -1 ? str.replace(/^[^?]*\?*/, '') : str;
        //console.log(param)
        var para = getQS('para', param);
        if(!para){
            return str;
        }
        return str.replace(/[&]*$/, '&') + ngis[0] + '=' + window[ngis[2]][ngis[3]](para + ngis[1]);
    }

    function XMLHttpRequest() {
        var xhr = new _XMLHttpRequest();
        var _open = xhr.open;
        if (_open) {
            xhr.open = function (method, url) {                
                var toUrl = mixinSgn(url)
                // console.log("toUrl",toUrl,url)
                if(toUrl != url){
                    arguments[1] = toUrl
                }
                return _open.apply(xhr, arguments);
            };
        }
        var _send = xhr.send;
        if (_send) {
            xhr.send = function (param) {
                //console.log(param)
                if(param){
                    var toParam = mixinSgn(param)
                    if(toParam != param){
                        //console.log('toto', toParam)
                        //console.log('xxxx', param)
                        arguments[0] = toParam
                    }
                }
                return _send.apply(xhr, arguments);
            }
        }

        return xhr;
    }
    if (_XMLHttpRequest) {
        win.XMLHttpRequest = XMLHttpRequest;
    }
}()

Zepto.cookie = function (h, m, j) {
    if (typeof m != "undefined") {
        j = j || {};
        if (m === null) {
            m = "";
            j.expires = -1
        }
        var f = "";
        if (j.expires && (typeof j.expires == "number" || j.expires.toUTCString)) {
            var d;
            if (typeof j.expires == "number") {
                d = new Date();
                d.setTime(d.getTime() + (j.expires * 24 * 60 * 60 * 1000))
            } else {
                d = j.expires
            }
            f = "; expires=" + d.toUTCString()
        }
        var k = j.path ? "; path=" + j.path : "";
        var e = j.domain ? "; domain=" + j.domain : "";
        var l = j.secure ? "; secure" : "";
        document.cookie = [h, "=", encodeURIComponent(m), f, k, e, l].join("")
    } else {
        var c = null;
        if (document.cookie && document.cookie != "") {
            var b = document.cookie.split(";");
            for (var g = 0; g < b.length; g++) {
                var a = Zepto.trim(b[g]);
                if (a.substring(0, h.length + 1) == (h + "=")) {
                    c = decodeURIComponent(a.substring(h.length + 1));
                    break
                }
            }
        }
        return c
    }
};
$.fn.fClick = function (fn) {
    var m = false,
        f = function (e) {
            e.stopPropagation();
            switch (e.type) {
                case "touchstart":
                    m = false;
                    break;
                case "touchmove":
                    m = true;
                    break;
                case "touchend":
                    if (!m) {
                        //$(e.target).trigger(zjEvents.fClick, e);
                        //fn(e);
                        fn.call(this, e);
                        //m = false;
                    }
                    break;
                default: break;
            }
        };
    this.on("touchstart", f);
    this.on("touchmove", f);
    this.on("touchend", f);
    //$.event.add(this, "touchstart touchmove touchend", f);
};
$.fn.show = function () {
    this.each(function (c, d) {
        d.style.display = "block"
    });
    return this
};
/**
 * storage操作
 * SetStorage方法：设置存储storage的key和value值，如果storage存储失败，则将数据存储在cookie中
 * GetStorage方法：根据key值获取storage相对应的value值，获取失败则从cookie中获取，
 */
var StorageHelp = {
    SetStorage: function (e, g) {
        if (window.localStorage) {
            var h = window.localStorage;
            try {
                h.setItem(e, g)
            } catch (f) {
                $.cookie(e, g, { expires: 30 })
            }
        } else {
            $.cookie(e, g, { expires: 30 })
        }
    }, 
    GetStorage: function (d) {
        if (window.localStorage) {
            var f = window.localStorage;
            try {
                f = f.getItem(d);
                if (f == null || f == "") {
                    return $.cookie(d) == null ? "" : $.cookie(d)
                } else {
                    return f
                }
            } catch (e) {
                return $.cookie(d) == null ? "" : $.cookie(d)
            }
        } else {
            return $.cookie(d) == null ? "" : $.cookie(d)
        }
    },
    SetSessionStorage: function(e,g){
        if (window.sessionStorage) {
            var h = window.sessionStorage;
            try {
                h.setItem(e, g)
            } catch (f) {
                $.cookie(e, g, { expires: 30 })
            }
        } else {
            $.cookie(e, g, { expires: 30 })
        }
    },
    GetSessionStorage: function(d){
        if (window.sessionStorage) {
            var f = window.sessionStorage;
            try {
                f = f.getItem(d);
                if (f == null || f == "") {
                    return $.cookie(d) == null ? "" : $.cookie(d)
                } else {
                    return f
                }
            } catch (e) {
                return $.cookie(d) == null ? "" : $.cookie(d)
            }
        } else {
            return $.cookie(d) == null ? "" : $.cookie(d)
        }
    },
    ClearSessionStorage:function(arr){
        if(!(arr instanceof Array)){
            arr=["OrderPage_12306PassengerList","OrderPage_PassengerList","OrderPage_HotelGiftVoucher","OrderPage_InsuranceIndex","OrderPage_SeatType","OrderPage_ProcessTimeIndex","OrderPage_VoucherIndex","OrderPage_AcceptSeat","searchKey","OrderPage_PassengerList","OrderPage_Free","OrderPage_VipServerIndex","OrderPage_tuigai","checkedOneDay","checkedComboId","12306voucher"];
        }
        if (window.sessionStorage) {
            try{
                for(var i=0;i<arr.length;i++){
                    sessionStorage.removeItem(arr[i]);
                }
            }catch(e){
                for(var i=0;i<arr.length;i++){
                    $.cookie(arr[i], '', {expires:-1});
                }

            }
        }else{
            for(var i=0;i<arr.length;i++){
                $.cookie(arr[i], '', {expires:-1});
            }
        }
    }
};
var APICommonHead={
    "headct":"0",
    "platId":501,
    "headver":"0.3.0.0",
    "headtime":new Date().getTime(),
    "callback":"",
    "tag":""

};

//var APIUrl=(location.href).indexOf("//wx.17u.cn/train/")>-1? "//wx.17u.cn/uniontrain/trainapi/":"//wx.17u.cn/wxuniontraintest/trainapi/";
var APIUrl="//wx.17u.cn/uniontrain/trainapi/";
var lca=location.href;

if((window.location.href).indexOf('wx6.t.17u.cn')>-1){
    APIUrl="//wx.17u.cn/wxuniontraintest3/trainapi/";
}
/*if(lca.indexOf("//wx.17u.cn/train/")!=-1){
    APIUrl="//wx.17u.cn/uniontrain/trainapi/";
}else{
    APIUrl="//wx.17u.cn/wxuniontraintest2/trainapi/";
}*/
var TCMemeberCardTrack=function(serialNo){
    if (window.localStorage) {
        var f = window.localStorage;
        try {
            var refid = $.extend(f.getItem("wxpubrefid"));
            if (refid) {
                _tcTraObj._tcTrackEvent('火车票', '下单页', '下单成功记录', '下单成功记录^501^2016^'+refid+'^'+serialNo);
                f.removeItem("wxpubrefid");
            } 
        } catch (e) {}
    }
}
var mobileUtil = {
    touch: ("createTouch" in document), start: this.touch ? "touchstart" : "mousedown", move: this.touch ? "touchmove" : "mousemove", end: this.touch ? "touchend" : "mouseup", click: this.touch ? "tap" : "click", dialog: function (g, f, e, a) {
        if ($(f + " #showTip").length < 1) {
            var d = { _content_: g, _confirm_: a || "确认" };
            if(a=='hide'){
                this.dialogTpl().replace("<div class=\"msg-btn\"><button style=\"margin:0;\" class=\"btn touchable\">_confirm_</button></div>"," ")                //
            }
            var b = $(this.dialogTpl().replace(/_[^_]*_/g, function (c) {
                return d[c]
            }));
            if(a=='hide'){
                $(".msg-btn", b[1]).hide()
            }
            $(".msg-btn", b[1]).bind("click", function () {
                $("#bgTip").remove();
                $("#showTip").remove();
                startScroll();
                e && e()
            });            
            $(f).append(b);
            stopScroll()
        }
    }, dialogTpl: function () {
        return '<div id="bgTip" style="display: block;"></div><div id="showTip"><div class="msg-content">_content_</div><div class="msg-btn"><button style="margin:0;" class="btn touchable">_confirm_</button></div></div>'
    }, confirm: function (g, f, e, a, d, k) {
        var c = { _cancle_: a || "取消", _confirm_: d || "确认", _content_: g }, b = $(this.confirmTpl().replace(/_[^_]*_/g, function (h) {
            return c[h]
        }));
        $(".cancle", b).bind(this.click, function () {
            startScroll();
            k && k();
            b.remove()
        });
        $(".confirm", b).bind(this.click, function () {
            startScroll();
            e && e();
            b.remove()
        });
        $(f).append(b);
        hideLoading();
        stopScroll()
    }, confirmTpl: function () {
        return '<div id="bgTip" style="display: block;"><div id="showTip"><div class="msg-content">_content_</div><div class="msg-btn double"><button  class="cancle btn graybt touchable">_cancle_</button><button  class="confirm btn touchable">_confirm_</button></div></div></div>'
    }, confirm2: function (g, f, e, a, d, k) {
        var c = { _cancle_: a || "取消", _confirm_: d || "确认", _content_: g }, b = $(this.confirmTpl2().replace(/_[^_]*_/g, function (h) {
            return c[h]
        }));    
        $(".cancle", b).bind(this.click, function () {
            startScroll();
            k && k();
            b.remove()
        });
        $(".confirm", b).bind(this.click, function () {
            startScroll();
            e && e();
            b.remove()
        });
        $(f).append(b);
        stopScroll()
    }, confirmTpl2: function () {
        return '<div id="bgTip" style="display: block;"><div id="showTip"><div class="msg-content">_content_</div><div class="msg-btn double"><button  class="cancle btn touchable">_cancle_</button><button  class="confirm btn touchable graybt" disabled>_confirm_<em class="sec"></em></button></div></div></div>'
    },
    // 配送票弹框
    confirmOff: function (g, f, e, a, d, k) {
        var c = { _cancle_: a || "取消", _confirm_: d || "确认", _content_: g }, b = $(this.confirmOffTpl().replace(/_[^_]*_/g, function (h) {
            return c[h]
        }));    
        $(".cancle", b).bind(this.click, function () {
            startScroll();
            k && k();
            b.remove()
        });
        $(".confirm", b).bind(this.click, function () {
            startScroll();
            e && e();
            b.remove()
        });
        $(f).append(b);
        stopScroll()
    }, confirmOffTpl: function () {
        return '<div id="bgTip" style="display: block;"><div id="showTip" class="offline"><div class="msg-content">_content_</div><div class="msg-btn-off double"><button  class="confirm btn touchable">_confirm_</button><button  class="cancle btn graybt touchable">_cancle_</button></div></div></div>'
    }
};
function stopScroll() {
    $("body").on("touchmove", function (a) {
        a.preventDefault();
    });
    $("html").css({'overflow':'hidden'});
}
function startScroll() {
    $("body").off("touchmove");
    $("html").css({'overflow':'auto'});
}
var modal = {
    checkParam: function (param) {
        var element = typeof param == 'string' ? $('#' + param) : param;
        return element;
    },
    into: function (modalDom, modalBgDom) {
        this.checkParam(modalDom).removeClass("modal-out").addClass("modal-in");
        this.checkParam(modalBgDom).addClass("modal-bg-visible");
        stopScroll();
    },
    out: function (modalDom, modalBgDom) {
        this.checkParam(modalDom).removeClass("modal-in").addClass("modal-out");
        this.checkParam(modalBgDom).removeClass("modal-bg-visible");
        startScroll();
    }
};
/**
 * 日期格式转换
 * eg：(new Date()).format("yyyy-MM-dd") =>  2016-06-24
 *     (new Date()).format("yy/MM/dd") => 16/06/24"
 *     (new Date()).format("w") => 周五
 * tips：M和m区分大小写，M表示月，m表示秒
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds(),
        "w+": Date.getWeek(this.getDay())
    };


    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
};
Date.getWeek = function (e) {
    this.aWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return this.aWeek[e];
}
/**
 * 字符串日期格式转换成时间格式
 * eg：Date.ParseString("2010-01-01") => Fri Jan 01 2010 00:00:00 GMT+0800 (中国标准时间)
 */
Date.ParseString = function (e) {
    var b = /(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/i,
        a = b.exec(e),
        c = 0,
        d = null;
    if (a && a.length) {
        if (a.length > 5 && a[6]) {
            c = Date.parse(e.replace(b, "$2/$3/$1 $4:$5:$6"));
        } else {
            c = Date.parse(e.replace(b, "$2/$3/$1"));
        }
    } else {
        c = Date.parse(e);

    }
    if (!isNaN(c)) {
        d = new Date(c);
    }
    return d;
};

var showLoadingCount = 0;
/**
 * 显示loading图层
 */
function showLoading() {
    if ($(".opLayer").get(0) == null)
        $("body").append('<div class="opLayer"><div class="loading"><em class="loadingImg"></em></div></div>');
    showLoadingCount++;
}
// *
//  * 隐藏loading图层
 
function hideLoading(isClosed) {
    if (isClosed) showLoadingCount = 0;
    else showLoadingCount--;
    if (showLoadingCount <= 0) {
        showLoadingCount = 0;
        $(".opLayer").remove();
    }
}
// 车次列表页Loading
var showLoadingCountList = 0;
function showLoadingTList() {
    if ($(".opLayerTList").get(0) == null)
        $("body").append('<div class="opLayerTList"><div class="loadingTcList"></div></div>');
    showLoadingCountList++;
}
/**
 * 隐藏loading图层
 */
function hideLoadingTList(isClosed) {
    if (isClosed) showLoadingCountList = 0;
    else showLoadingCountList--;
    if (showLoadingCountList <= 0) {
        showLoadingCountList = 0;
        $(".opLayerTList").remove();
    }
}
// 页面切换Loading
var showLoadingCountPage = 0;
function showLoadingTPage() {
    if ($(".opLayerTPage").get(0) == null)
        $("body").append('<div class="opLayerTPage"><div class="loadingTPage"></div></div>');
    showLoadingCountPage++;
}
/**
 * 隐藏loading图层
 */
function hideLoadingTPage(isClosed) {
    if (isClosed) {
        showLoadingCountPage = 0;
        $(".opLayerTPage").remove();
    } else {
        showLoadingCountPage--;
        if (showLoadingCountPage < 0) {
            $(".opLayerTPage").remove();
        }
    }
}
/**
 * 显示带有文字的loading图层
 */
function showMsgLoading(msg, sec, backFn) {
    $("body").append('<div class="opMsgLayer"><div class="loading">' + msg + '</div></div>');
    loadTimeout = setTimeout(function () {
        hideMsgLoading();
        if (backFn) backFn();
    }, sec)
}
/**
 * 隐藏带有文字的loading图层
 */
function hideMsgLoading() {
    $(".opMsgLayer,.opLayer").remove();
    if (typeof loadTimeout != 'undefined') {
        clearTimeout(loadTimeout);
    }
}
/**
 * 反馈信息提交成功或取消订单成功弹框显示
 */
function showConfirm(conText) {
    $("body").append('<div class="ex-popoup-hint exph-suc"><s></s><span class="con">' + conText + '</span></div>');
    setTimeout(function () {
        $(".ex-popoup-hint").hide();
    }, 2000);
}
/**
 * 半透明黑框提示
 */
function showToast(toastText, delay) {
    if (toastText && $('#toastEle').length == 0) {
        $('body').append('<div id="toastEle" class="ui-toast"><div class="ui-toast-padding"><div class="ui-toast-content">' + toastText + '</div></div></div>')
    } else {
        return;
    }
    var toastEle = $('#toastEle');
    toastEle.css({
        'margin-top': -Math.round(toastEle.offset().height / 2) + 'px',
        "left": Math.round(($(window).width() - toastEle.width()) / 2) + 'px'
    });
    setTimeout(function () {
        toastEle.css({ opacity: 0 });
        setTimeout(function () {
            toastEle.remove();
        }, 1000);
    }, (delay || 2000));
}
/**
 * 获得url中的queryString OBJ
 */
function getRequest() {
    var searchString = window.location.search.substring(1),
        params = searchString.split("&"),
        hash = {};

    if (searchString == "") return {};
    for (var i = 0; i < params.length; i++) {
        // 获取等号位置
        var pos = params[i].indexOf('=');
        if (pos == -1) { continue; }
        // 获取name 和 value
        var paraName = params[i].substring(0, pos),
            paraValue = params[i].substring(pos + 1);
        hash[paraName] = paraValue;
    }
    return hash;
}
/**
 * 获得cookie中存储的用户信息 openid和userid
 */
function getWxObj() {
    var str = $.cookie("WxUser");
    var theRequest = new Object();
    if (str) {
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].slice(0, strs[i].indexOf('='))] = strs[i].slice(strs[i].indexOf('=') + 1);
        }
    }
    return theRequest;
}
/**
 * 获取wx地址
 */
function getWXaddress(callback) {
    var domain = location.href;
    showLoading();
    $.ajax({
        url: "wechatapi.html",
        type: 'get',
        data: {
            url: domain.split('#')[0]
        },
        timeout: 10000,
        success: function (res) {
            var jsonstr = typeof res;
            if (jsonstr == "string") {
                var ha = JSON.parse(res);
            } else {
                var ha = res;
            }
            hideLoading();
            WeixinJSBridge.invoke('editAddress', {
                "appId": "wx3827070276e49e30",
                "scope": "jsapi_address",
                "signType": ha.SignType,
                "addrSign": ha.AddrSign,
                "timeStamp": ha.TimeStamp,
                "nonceStr": ha.NonceStr
            }, function (res) {
                hideLoading();
                if (res.err_msg == "edit_address:ok") {
                    callback && callback(res);
                }
            })
        },
        error: function (xml, html) {
            hideLoading();
            mobileUtil.dialog("访问人数过多，请稍后再试！", "body");
        },
        complete: function () { }
    });
}
/**
 * 获取机票cookie
 */
function getCooperateUser() {
    var str = $.cookie("CooperateTcWxUser") || $.cookie("CooperateWxUser") || $.cookie("CooperateUser");
    var theRequest = new Object();
    if (str) {
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].slice(0, strs[i].indexOf('='))] = strs[i].slice(strs[i].indexOf('=') + 1);
        }
    }
    return theRequest;
}

; (function (root) {
    // Store.js
    var store = {},
        win = window,
        doc = win.document,
        localStorageName = 'localStorage',
        scriptTag = 'script',
        storage

    store.disabled = false
    store.version = '1.3.17'
    store.set = function (key, value) { }
    store.get = function (key, defaultVal) { }
    store.has = function (key) { return store.get(key) !== undefined }
    store.remove = function (key) { }
    store.clear = function () { }
    store.transact = function (key, defaultVal, transactionFn) {
        if (transactionFn == null) {
            transactionFn = defaultVal
            defaultVal = null
        }
        if (defaultVal == null) {
            defaultVal = {}
        }
        var val = store.get(key, defaultVal)
        transactionFn(val)
        store.set(key, val)
    }
    store.getAll = function () { }
    store.forEach = function () { }

    store.serialize = function (value) {
        return JSON.stringify(value)
    }
    store.deserialize = function (value) {
        if (typeof value != 'string') { return undefined }
        try { return JSON.parse(value) }
        catch (e) { return value || undefined }
    }

    // Functions to encapsulate questionable FireFox 3.6.13 behavior
    // when about.config::dom.storage.enabled === false
    // See https://github.com/marcuswestin/store.js/issues#issue/13
    function isLocalStorageNameSupported() {
        try { return (localStorageName in win && win[localStorageName]) }
        catch (err) { return false }
    }

    if (isLocalStorageNameSupported()) {
        storage = win[localStorageName]
        store.set = function (key, val) {
            if (val === undefined) { return store.remove(key) }
            storage.setItem(key, store.serialize(val))
            return val
        }
        store.get = function (key, defaultVal) {
            var val = store.deserialize(storage.getItem(key))
            return (val === undefined ? defaultVal : val)
        }
        store.remove = function (key) { storage.removeItem(key) }
        store.clear = function () { storage.clear() }
        store.getAll = function () {
            var ret = {}
            store.forEach(function (key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = function (callback) {
            for (var i = 0; i < storage.length; i++) {
                var key = storage.key(i)
                callback(key, store.get(key))
            }
        }
    } else if (doc.documentElement.addBehavior) {
        var storageOwner,
            storageContainer
        // Since #userData storage applies only to specific paths, we need to
        // somehow link our data to a specific path.  We choose /favicon.ico
        // as a pretty safe option, since all browsers already make a request to
        // this URL anyway and being a 404 will not hurt us here.  We wrap an
        // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
        // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
        // since the iframe access rules appear to allow direct access and
        // manipulation of the document element, even for a 404 page.  This
        // document can be used instead of the current document (which would
        // have been limited to the current path) to perform #userData storage.
        try {
            storageContainer = new ActiveXObject('htmlfile')
            storageContainer.open()
            storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>')
            storageContainer.close()
            storageOwner = storageContainer.w.frames[0].document
            storage = storageOwner.createElement('div')
        } catch (e) {
            // somehow ActiveXObject instantiation failed (perhaps some special
            // security settings or otherwse), fall back to per-path storage
            storage = doc.createElement('div')
            storageOwner = doc.body
        }
        var withIEStorage = function (storeFunction) {
            return function () {
                var args = Array.prototype.slice.call(arguments, 0)
                args.unshift(storage)
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storageOwner.appendChild(storage)
                storage.addBehavior('#default#userData')
                storage.load(localStorageName)
                var result = storeFunction.apply(store, args)
                storageOwner.removeChild(storage)
                return result
            }
        }

        // In IE7, keys cannot start with a digit or contain certain chars.
        // See https://github.com/marcuswestin/store.js/issues/40
        // See https://github.com/marcuswestin/store.js/issues/83
        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
        var ieKeyFix = function (key) {
            return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
        }
        store.set = withIEStorage(function (storage, key, val) {
            key = ieKeyFix(key)
            if (val === undefined) { return store.remove(key) }
            storage.setAttribute(key, store.serialize(val))
            storage.save(localStorageName)
            return val
        })
        store.get = withIEStorage(function (storage, key, defaultVal) {
            key = ieKeyFix(key)
            var val = store.deserialize(storage.getAttribute(key))
            return (val === undefined ? defaultVal : val)
        })
        store.remove = withIEStorage(function (storage, key) {
            key = ieKeyFix(key)
            storage.removeAttribute(key)
            storage.save(localStorageName)
        })
        store.clear = withIEStorage(function (storage) {
            var attributes = storage.XMLDocument.documentElement.attributes
            storage.load(localStorageName)
            while (attributes.length) {
                storage.removeAttribute(attributes[0].name)
            }
            storage.save(localStorageName)
        })
        store.getAll = function (storage) {
            var ret = {}
            store.forEach(function (key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = withIEStorage(function (storage, callback) {
            var attributes = storage.XMLDocument.documentElement.attributes
            for (var i = 0, attr; attr = attributes[i]; ++i) {
                callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
            }
        })
    }

    try {
        var testKey = '__storejs__'
        store.set(testKey, testKey)
        if (store.get(testKey) != testKey) { store.disabled = true }
        store.remove(testKey)
    } catch (e) {
        store.disabled = true
    }
    store.enabled = !store.disabled

    root.store = store;
    root.storeWithExpiration = {
        set: function (key, val, exp) { store.set(key, { val: val, exp: exp, time: new Date().getTime() }); },
        get: function (key) { var info = store.get(key); if (!info) { return null; }; if (new Date().getTime() - info.time > info.exp) { return null; } return info.val }
    };
})(window);

/**
 * 获取移动终端浏览器版本信息
 */
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}



/*
 * getDate  获取服務器时间
 * getUnix: 获取服務器时间戳
 * isWorkTime: 当前时间是否在工作时间內
 * getServertime: 获取服务器时间請求
 * */

var utilityServertime = function () {
    var servertime;
    function servertimeRequest(fn) {
        $.ajax({
            url: "GetServiceTime",
            dataType: "jsonp",
            timeout: 3000,
            success: function (obj) {
                if (obj.ResponseStatus) {
                    var serverTimeStr = obj.ResponseMessage.replace(/-/g, '/');
                    var localtime = new Date();
                    servertime = { server: new Date(Date.parse(serverTimeStr)), local: localtime };
                    var localtimeStr = localtime.getFullYear() + '/' + (localtime.getMonth() + 1) + '/' + localtime.getDate() + ' ' + localtime.getHours() + ':' + localtime.getMinutes() + ':' + localtime.getSeconds();
                    store.set('TRAIN_SERVERTIME', { serverTimeStr: serverTimeStr, localtimeStr: localtimeStr });
                }
            },
            complete: function () {
                if (fn) fn();
            }
        });
    }

    function getServertime(fn) {
        var storageServertime = store.get('TRAIN_SERVERTIME');
        if (storageServertime) {
            try {
                servertime = {
                    server: new Date(Date.parse(storageServertime.serverTimeStr)),
                    local: new Date(Date.parse(storageServertime.localtimeStr))
                }
                if (fn) fn();
            } catch (e) {
                servertimeRequest(fn);
            }
        } else {
            servertimeRequest(fn);
        }
    };

    var isExist = function () {
        if (typeof servertime == "undefined" || !servertime.server) {
            return false;
        }
        return true;
    };

    var getDate = function () {
        var currentTime;
        if (isExist()) {
            currentTime = new Date(new Date().getTime() + (servertime.server - servertime.local)); //服务器时间
        } else {
            currentTime = new Date(); //当前时间
        }
        return currentTime;
    };

    var getUnix = function () {
        return getDate().getTime();
    };

    //是否在工作时间之内
    var isWorkTime = function () {
        var workSTime = WebConfigUrl.WorkSTime,
            workETime = WebConfigUrl.WorkETime,
            workSMinute = parseInt(workSTime.split(":")[0]) * 60 + parseInt(workSTime.split(":")[1]),
            workEMinute = parseInt(workETime.split(":")[0]) * 60 + parseInt(workETime.split(":")[1]);
        var servertimeMinute = utilityServertime.getDate().getHours() * 60 + utilityServertime.getDate().getMinutes();
        if (servertimeMinute >= workSMinute && servertimeMinute < workEMinute) {
            return true;
        } else {
            return false;
        }
    }

    getServertime();

    return {
        getDate: getDate,
        getUnix: getUnix,
        isWorkTime: isWorkTime,
        getServertime: getServertime
    };
}();
//判断是否是小程序环境
var miniProgramEnv = {
    isInMiniProgramEnv: null,
    //判断是否是微信环境
    isWXEnv: function(){ 
        var ua = window.navigator.userAgent.toLowerCase(); 
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
            return true; 
        }else{ 
            return false; 
        } 
    }(),
    judgeIsMiniProgramEnv: function(cb){
        var scope = this;
        if(scope.isWXEnv){
            if(scope.isInMiniProgramEnv === null){
                //判断当前环境在小程序内还是H5， res.miniprogram ：true 小程序内；false  H5
                wx.miniProgram.getEnv(function(res) {
                    scope.isInMiniProgramEnv = res.miniprogram ? true : false;
                    cb && cb(scope.isInMiniProgramEnv);
                })
            }else{
                cb && cb(scope.isInMiniProgramEnv);
            }
        }else{
            scope.isInMiniProgramEnv = false;
            cb && cb(scope.isInMiniProgramEnv);
        }
    }
};
miniProgramEnv.judgeIsMiniProgramEnv();

/**
 * 功能：点击input框右边的删除按钮清除input框内容
 * @param input input输入框
 * @param clearBtn 清除按钮
 * @param clearCallBack 清除input框内容后的回调函数（可选）
 */
function jqshow(a) {
    $(a).show();
}
function jqhide(a) {
    $(a).hide();
}
var eyeInput = function (input, eyebtn, eyeCallBack) {
    var input = typeof clearBtn == 'string' ? $(input) : input,
        eyeBtn = typeof clearBtn == 'string' ? $(eyebtn) : eyebtn;
    eyebtn.on('touchstart', function () {
        if ($(this).hasClass('shuteye')) {
            $(this).removeClass('shuteye');
            input.attr('type', 'text');
        } else {
            $(this).addClass('shuteye');
            input.attr('type', 'password');
        }
        if (input.val()) { input.focus(); }
        return false;
    });

    eyeCallBack && eyeCallBack();
}

var clearInput = function (input, clearBtn, clearCallBack, inputCallBack) {
    var input = typeof clearBtn == 'string' ? $(input) : input,
        clearBtn = typeof clearBtn == 'string' ? $(clearBtn) : clearBtn;

    input.each(function () {
        var _this = $(this);
        _this.btn = false;
        _this.bind({
            focus: function () {
                var inputValue = $.trim(_this.val());
                if (inputValue != '') {
                    clearBtn.addClass('not-empty');
                }
                if (_this.btn) jqshow('#trainPasswordClear');
            },
            blur: function () {
                clearBtn.removeClass('not-empty');
            },
            input: function () {
                if (this.timer) clearTimeout(this.timer);
                var inputValue = _this.val();
                inputValue == '' ? clearBtn.removeClass('not-empty') : clearBtn.addClass('not-empty');
                if (inputCallBack) inputCallBack(_this);
            }
        });

        clearBtn.bind('touchend', function (e) {  // 此处使用click在iOS 9.0.2上会有问题
            e.preventDefault();
            e.stopPropagation();
            _this.val(""), _this.keyup(), _this.focus(), _this.trigger("input"), typeof clearCallBack == "function" && clearCallBack.call(this);
            if (inputCallBack) inputCallBack(_this);
        });

    });
};



/* 页面隐藏域的web信息 */
var WebConfigUrl = {};
WebConfigUrl.PublicInterface = $("#PublicInterface").val();
WebConfigUrl.OrderDetail = $("#ResourceUrl").val() + "OrderOperation/QueryOrderDetailsV1";
WebConfigUrl.ticketSearch = $("#TicketSearch").val() + "ticket/searchfortouch";
WebConfigUrl.StationUrl = $("#TicketSearch").val() + "Station";
WebConfigUrl.MonitorHandle = $("#ResourceUrl").val() + "OrderOperation/MonitorHandle";
WebConfigUrl.HotelAjaxCall = $("#HotelAjaxCall").val();
WebConfigUrl.WritePayBack = $("#PayBackUrl").val();
WebConfigUrl.CallBackUrl = $("#CallBackUrl").val();
WebConfigUrl.MerchentReUrl = $("#MerchentReUrl").val();
WebConfigUrl.LoginUrl = $("#LoginUrl").val();
WebConfigUrl.MyOrders = $("#MyOrders").val();
WebConfigUrl.RefundOrderTime = $("#RefundOrderTime").val();
WebConfigUrl.GetCityUrl = $("#GetCityUrl").val();
WebConfigUrl.WorkSTime = $("#WorkSTime").val();
WebConfigUrl.WorkETime = $("#WorkETime").val();
WebConfigUrl.SaveMemberUrl = $("#ResourceUrl").val() + "FavoriteContacts/SaveMemberLinker";
WebConfigUrl.PayUrl = $("#PayUrl").val();
WebConfigUrl.GetOrderTrackingUrl = $("#ResourceUrl").val() + "OrderOperation/SearchOrderTracking";
WebConfigUrl.wxTrainUrl = $("#wxTrainUrl").val();
WebConfigUrl.wxFlightRootUrl = $("#wxFlightRootUrl").val();
WebConfigUrl.wxFlightUrl = $("#wxFlightUrl").val();
WebConfigUrl.hotCityUrl = $("#hotCityUrl").val();
WebConfigUrl.letterCityUrl = $("#letterCityUrl").val();
WebConfigUrl.wxIndexUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=https://wx.17u.cn/home/index.html?type=0&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
if(location.protocol=="https:"){
    WebConfigUrl.wxIndexUrl=WebConfigUrl.wxIndexUrl.replace("http%3A","https%3A");
    WebConfigUrl.wxIndexUrl=WebConfigUrl.wxIndexUrl.replace("http:","https:");
}

WebConfigUrl.WeChatHoldingSeat = $("#ResourceUrl").val() + "OrderOperation/WeChatHoldingSeat";
WebConfigUrl.VerificationIdentity = $("#ResourceUrl").val() + "OrderOperation/VerificationIdentity";
WebConfigUrl.GetNoticeInfo = $("#ResourceUrl").val() + "Notice/GetNoticeInfo";
WebConfigUrl.TrainRefundTrack = $("#ResourceUrl").val() + "OrderOperation/RefundTrack";
WebConfigUrl.CancelNightOrderUrl = $("#ResourceUrl").val() + "Handlers/TrainTicket.ashx";
WebConfigUrl.ActiveUrl = $("#activeUrl").val();
WebConfigUrl.IsOpenActive = $("#ResourceUrl").val() + "OrderOperation/ActiveSendPackageControl";
/* 卡券 */
WebConfigUrl.UseList = $("#ResourceUrl").val() + "ManageWXCard/GetUserTrainActivityUseList";
WebConfigUrl.UpdateUseInfo = $("#ResourceUrl").val() + "AddWXCard/UpdateActivityUseInfo";
/* 常旅身份核验 */
WebConfigUrl.Authentication = $("#ResourceUrl").val() + "OrderOperation/Authentication";
/*改签订单信息*/
WebConfigUrl.BookChangeOrder = $("#ResourceUrl").val() + "OrderOperation/BookChangeOrder";
/*热门车次退票拦截后台存储接口*/
WebConfigUrl.UpdatePassengerInfo = $("#ResourceUrl").val() + "OrderOperation/UpdatePassengerInfo";
WebConfigUrl.getShareStatus = $("#ResourceUrl").val() + "ManageWXCard/GetShareStatus";
WebConfigUrl.setShareStatus = $("#ResourceUrl").val() + "ManageWXCard/SetShareStatus";
WebConfigUrl.wxCouponShareUrl = $("#wxCouponShareUrl").val();
//服务器时间
WebConfigUrl.PublicServiceTime = "//www.ly.com/huochepiao/resource/PublicInterface/GetServiceTime";
//送票上门验证接口
WebConfigUrl.offlineTicketVerification = $("#TrainorderPublicUrl").val() + 'TCOrder/offlineTicketVerification';
//送票上门 - 邮寄费接口
WebConfigUrl.GetPostFee = $("#TrainorderPublicUrl").val() + 'TCOrder/GetPostFee';



/**
 * 对字符串类型的封装
 * author：张俊
 */
(function (S) {
    S.prototype.zjTrim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
    S.prototype.zjEndWiths = function (str) {
        return this.lastIndexOf(str) == this.length - str.length;
    };
    S.prototype.zjFill = function (args) {
        var s = this;
        if (args != null) {
            var r, type = Object.prototype.toString.call(args),
                arr = type == "[object Array]" || type == "[object Object]" ? args : arguments;
            for (var i in arr) {
                r = new RegExp('\\{' + i + '\\}', 'gm');
                s = s.replace(r, arr[i]);
            }
        }
        return s;
    };
    S.prototype.zjReplace = function (oldStr, newStr) {
        var s = this, i = 0;
        while ((i = s.indexOf(oldStr, i)) > -1) {
            s = s.substring(0, i) + newStr + s.substring(i + oldStr.length);
            i += newStr.length;
        }
        return s;
    };
    S.prototype.zjGetByteLength = function () {
        var str = this, bytesCount = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 255) bytesCount += 2;
            else bytesCount++;
        }
        return bytesCount;
    };
})(String);


/**
 * 对弹框的封装
 * 主要功能：showLoading show12306Loading showDialog showConfirm showExplain等功能
 * author：张俊
 */
(function () {

    var zjEvents = {
        touchStart: "touchstart"
    };

    var zjPopup = function (options) {
        var opts = {
            bgCls: "zjPopupBg",
            cls: "zjPopup",
            speed: 400,
            showAn: null,
            hideAn: null,
            isShowBg: true,
            html: '',
            showBefore: null,
            hideBefore: null,
            autoDestroy: true
        },
        that = this;

        for (var i in options) opts[i] = options[i];
        this.opts = opts;

        this.bg = null;  // background
        this.container = null;

        (function () {

            that.container = $("<div class='" + opts.cls + "'>" + opts.html + "</div>").css("zIndex", 2050); //zjPopup.zIndex++);
            that.container.appendTo(document.body);
            that.container.on(zjEvents.touchStart, function (e) {
                
            });

            if (that.opts.isShowBg) {
                that.bg = $("<div class='" + opts.bgCls + "'></div>").css("zIndex", zjPopup.zIndex++);
                that.bg.appendTo(document.body);
                that.bg.on(zjEvents.touchStart, function (e) { e.preventDefault(); });
            }

            $(window).bind("resize", function () {
                if (that.isHided() || that.isDestroy()) return;
                that.toCenter();
            });

            //console.log(that.opts);
        })();
    };

    zjPopup.prototype = {

        setContent: function (content) {
            this.container.html(content);
        },

        setAutoDestroy: function (enable) {
            this.opts.autoDestroy = enable;
        },

        getPosition: function () {
            var o = this.container.offset();
            return { x: o.left, y: o.top };
        },

        getCenter: function () {
            var that = this;
            return { left: ($(window).width() - that.container.width()) / 2.0, top: ($(window).height() - that.container.height()) / 2.0 };
        },

        toCenter: function () {
            var c = this.getCenter(); //console.log(c);
            c.left = c.left / $(window).width() * 100 + "%";
            c.top = c.top / $(window).height() * 100 * 0.8 + "%";
            this.container.css(c);
        },

        isHided: function () {
            var dis = this.container.css("display");
            return !dis || dis == "none" || this.container.css("opacity") == 0;
        },

        isDestroy: function () {
            return this.container == null;
        },

        show: function () {
            if (this.isHided()) {
                if (this.opts.showBefore) this.opts.showBefore(this);
                if (this.bg) this.bg.css("opacity", 0.5).show();//.fadeIn();
                if (this.opts.hideAn) this.container.removeClass(this.opts.hideAn);
                if (this.opts.showAn) this.container.addClass(this.opts.showAn);
                else this.container.show();
                this.toCenter();
            }
        },

        hide: function () {
            if (this.opts.hideBefore) this.opts.hideBefore(this);
            if (this.opts.showAn) this.container.removeClass(this.opts.showAn);
            if (this.opts.hideAn) this.container.addClass(this.opts.hideAn);
                //else this.container.fadeOut(this.opts.speed);
            else this.container.hide();
            if (this.bg) this.bg.hide(); //.fadeOut(); 10/22
            this.autoDestroy();
        },

        hideTo: function (obj, option) {
            obj = typeof obj == 'string' ? $(obj) : obj;
            var o = {
                offsetX: 0,
                offsetY: 0
            };
            if (option) for (var i in option) o[i] = option[i];

            if (this.opts.hideBefore) this.opts.hideBefore(this);

            var o1 = obj.offset(),
                o2 = this.container.offset(),
                x = o1.left - o2.left - o1.width / 2 + o.offsetX,
                y = o1.top - o2.top - 60 + o.offsetY;

            this.container.css({
                "-webkit-transition": "all 0.8s",
                "-webkit-transform": "translate({0}px,{1}px) scale(0,0)".zjFill(x, y) // 注意顺序
            });

            if (this.bg) this.bg.hide(); //.fadeOut(); 10/22
            this.autoDestroy();
        },

        autoDestroy: function () {
            var t = this;
            if (this.opts.autoDestroy) setTimeout(function () { t.destroy(); }, this.opts.speed + 600);
        },

        destroy: function () {
            if (this.bg) this.bg.remove();
            if (this.container) this.container.remove();
            this.bg = null;
            this.container = null;
        },

        animateNo: function () {
            this.animate("zjPopupNo", 600);
        },

        animate: function (clsName, duration) {
            var t = this;
            this.container.addClass(clsName);
            setTimeout(function () { t.container.removeClass(clsName) }, duration + 100);
        }
    }

    zjPopup.zIndex = 2015;

    zjPopup.getBtnMsg = function (msg, btnArr) {
        var h = "";
        for (var i in btnArr) h += "<div>" + btnArr[i].text + "</div>";
        var p = new zjPopup({
            html: "<div class='btnMsg'><div></div><div class='btnContainer'>" + h + "</div></div>"
        });
        p.setContent = function (msg) { this.container.find(".btnMsg > div").eq(0).text(msg); };
        p.setContent(msg);
        var arr = p.container.find(".btnMsg > div:last-child > div");
        for (var i in btnArr) arr.eq(i).on(zjEvents.touchStart, btnArr[i].fun);
        return p;
    }

    zjPopup.getAlert = function (msg, fun) {
        var p = zjPopup.getBtnMsg(msg, [{ text: '确定', fun: function () { p.hide(); if (fun) fun(); } }]);
        return p;
    }

    zjPopup.getConfirm = function (msg, okFun, cancelFun) {
        var p = zjPopup.getBtnMsg(msg, [
            { text: '取消', fun: function () { p.hide(); if (cancelFun) cancelFun(); } },
            { text: '确定', fun: function () { p.hide(); if (okFun) okFun(); } }
        ]);
        return p;
    }

    zjPopup.getToast = function (msg, delay) {
        delay = delay || 2000;
        var p = new zjPopup({
            isShowBg: false,
            speed: 1000,
            html: "<div class='toast'><div class='msg'></div></div>",
            showBefore: function (t) { setTimeout(function () { t.hide(); }, delay + t.opts.speed); }
        });
        p.setContent = function (msg) { this.container.find(".toast > div").text(msg); };
        p.setContent(msg);
        return p;
    }

    zjPopup.getIconToast = function (icon, msg, delay) {
        delay = delay || 2000;
        var p = new zjPopup({
            isShowBg: false,
            speed: 1000,
            html: "<div class='toast'><div class='icon'></div><div class='msg'></div></div>",
            showBefore: function (t) { setTimeout(function () { t.hide(); }, delay + t.opts.speed); }
        });
        p.setContent = function (icon, msg) {
            this.container.find(".toast .icon").html("<img src='" + icon + "' />");
            this.container.find(".toast .msg").text(msg);
        };
        p.setContent(icon, msg);
        return p;
    }

    zjPopup.getSuccessToast = function (msg, delay) {
        return zjPopup.getIconToast("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABMBAMAAABkLX97AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURQAAAP///////////////////////////////////////////7QJjekAAAALdFJOUwAKwNka8KdNZYUz7dJFZQAAATdJREFUSMft1z9Lw2AQBvBXUGM7SYVCRzvq0iGLdCkUnF2csqTglqVLJ5fuLn4Jv4Cl2nJfrn/S5s1L7y73DKEouS3D8QvhnjviXFN11PPrG9ZwOaTFCOoYE1EMEoQhO4IoBQmiF5SgAUrQJ0p836LE/Z8m2glKfOUNPzAxqZ9IYcL9P6LXn2PExaPyqVmio0yMRMhTyRLXylgeiTDdV8roH4i1YzpYJGKJw1uxyIwllAwLhBJigZARkRCRd4mQkIiUTcsiCsEjKsEiKuGR2EoUiD+MFcQpciTkcLq7EPnIH1fKAtjnqkBuqok8uwViIELERASIiSgjRqKEGAmPPFmJAiEr4REzESIr0+YvI1PbsfDIr/G8eMRIeMRKeMRMONcFiS2SgUSOIMS2MlpOsY5W8tD8Bp2tNsf7x3UWg/gnAAAAAElFTkSuQmCC", msg, delay);
    };

    zjPopup.getLoading = function (msg, imgSrc) {
        var p = new zjPopup({
            html: "<div class='loading'><div></div><div></div></div>"
        });
        p.container.find(".loading > div").eq(0).html(imgSrc ? "<img src='" + imgSrc + "' />" : "<div class='img'></div>");
        p.setContent = function (msg) { this.container.find(".loading > div").eq(1).text(msg); };
        p.setContent(msg || "正在加载......");
        return p;
    };

    zjPopup.get12306Loading = function (msg) {
        var p = new zjPopup({
            html: '<div class="loading-box"><div class="icon-train-two loading-icon"><div class="icon-train-two loading-gif"></div></div><p class="loading-content"></p></div>'
        });
        p.setContent = function (msg) { this.container.find(".loading-content").text(msg); };
        p.setContent(msg || "正在加载...");
        return p;
    };


    var zjLoading = null;

    zjPopup.showLoading = function (msg) {
        if (zjLoading == null) {
            zjLoading = zjPopup.getLoading();
            zjLoading.setAutoDestroy(false);
        }
        zjLoading.setContent(msg || "正在加载数据。。。");
        zjLoading.show();
    };

    zjPopup.hideLoading = function () {
        if (zjLoading) zjLoading.hide();
    };

    var zj12306Loading = null;

    zjPopup.show12306Loading = function (msg) {
        if (zj12306Loading == null) {
            zj12306Loading = zjPopup.get12306Loading(msg);
            zj12306Loading.bg.css("opacity", "0");
            zj12306Loading.setAutoDestroy(false);
        }
        else zj12306Loading.setContent(msg);
        zj12306Loading.show();
    };

    zjPopup.hide12306Loading = function () {
        if (zj12306Loading) zj12306Loading.hide();
    };

    zjPopup.getCloseBox = function (msg, btnText, fun, closeFun) {

        var p = new zjPopup({
            html: "<div class='closeBox'><div><span class='icon-train-two'></span></div><div class='msg'></div><div class='btnContainer'><div></div></div></div>"
        });

        p.bg.css("opacity", "0.5");
        p.setContent = function (msg) { this.container.find(".msg").eq(0).html(msg); };
        p.setContent(msg);

        p.container.find(".closeBox > div:first-child > span").eq(0).bind("click", function () {
            p.hide();
            if (closeFun) closeFun();
        });

        p.container.find(".btnContainer > div").eq(0).bind("click", function () {
            p.hide();
            if (fun) fun();
        }).text(btnText);

        return p;
    };

    zjPopup.getCloseBox2 = function (msg, btnText,fun,fun2,closeFun) {

        var p = new zjPopup({
            html: "<div class='closeBox'><div><span class='icon-train-two'></span></div><div class='msg'></div><div class='btnContainer btnContainer-2'><div class='left-texta right-scale'></div><div></div></div></div>"
        });

        p.bg.css("opacity", "0.5");
        p.setContent = function (msg) { this.container.find(".msg").eq(0).html(msg); };
        p.setContent(msg);

        p.container.find(".closeBox > div:first-child > span").eq(0).bind("click", function () {
            p.hide();
            if (closeFun) closeFun();
        });

        p.container.find(".btnContainer > div").eq(0).bind("click", function () {
            p.hide();
            if (fun) fun();
        }).text(btnText[0]);

        p.container.find(".btnContainer > div").eq(1).bind("click", function () {
            p.hide();
            if (fun2) fun2();
        }).text(btnText[1]);

        return p;
    };

    zjPopup.getSingleInput = function (opts, okFun, closeFun) {

        var o = {
            msg: null,
            label: null,
            hideTo: null,
            hideToOffset: null,
            input: {
                value: '',
                type: 'text',
                placeholder: '请输入'
            },
            btnText: "确认"
        };

        for (var i in opts) {
            if (i == "input") {
                for (var j in opts[i]) o[i][j] = opts[i][j];
            } else {
                o[i] = opts[i];
            }
        }

        var id = "validateCodeClear" + zjPopup.zIndex,
            p = new zjPopup({
                autoDestroy: false,
                html: "<div class='singleInput'>"
                        + "<div><span class='icon-train-two'></span></div>"
                        + "<div style='clear:both;'></div><div class='msg'></div><div class='input'><span></span><input id='" + id + "' />"
                            + "<a href='javascript:;' id='" + id + "_c' class='clear-input'><label class='icon-train-two icon-clear-input'></label></a>"
                        + "</div>"
                        + "<div class='btnContainer'><div></div></div>"
                    + "</div>"
            });
        clearInput("#" + id, "#" + id + "_c");
        p.container.find(".icon-clear-input").eq(0).css({
            "margin-left": "22px",
            "margin-top": "8px"
        });

        p.bg.css("opacity", "0.5");
        p.container.css("width", "90%");
        p.setContent = function (opts, isFirst) {

            if (opts.msg) this.container.find(".msg").eq(0).html(opts.msg);
            else if (isFirst) this.container.find(".msg").eq(0).hide();

            if (opts.label) this.container.find(".input > span").eq(0).html(opts.label);
            else if (isFirst) this.container.find(".input > span").eq(0).hide();

            var inp = this.container.find("input").eq(0);
            if (opts.input) for (var i in opts.input) inp.attr(i, opts.input[i]);
        };
        p.setContent(o);

        p.getInput = function () {
            return this.container.find(".input input").eq(0);
        };

        p.container.find(".input input").eq(0).bind("focus", function () {

        });

        p.container.find(".singleInput > div:first-child > span").eq(0).bind("touchend", function (e) {
            e.preventDefault();
            e.stopPropagation();
            p.setAutoDestroy(true);
            if (o.hideTo) p.hideTo(o.hideTo, o.hideToOffset);
            else p.hide();
            if (closeFun) closeFun();
        });

        p.container.find(".btnContainer > div").eq(0).bind("touchend", function (e) { // 此处使用click在iOS 9.0.2上会有问题
            e.preventDefault();
            e.stopPropagation();
            if (okFun) okFun(p.container.find("input").eq(0).val());
        }).text(o.btnText);

        return p;
    };

    zjPopup.showDialog = function (msg, fun, btnText) {
        if (typeof fun == "string") btnText = fun, fun = null;

        mobileUtil.dialog(msg, "body", fun);
        if (btnText) $("#showTip button").eq(0).text(btnText);
    };

    zjPopup.showConfirm = function (msg, btn1Text, btn1Fn, btn2Text, btn2Fn) {
        mobileUtil.confirm(msg, 'body', btn2Fn || btn1Fn, btn1Text, btn2Text, btn1Fn);
    };

    zjPopup.showConfirm2 = function (msg, btn1Text, btn1Fn, btn2Text, btn2Fn) {
        mobileUtil.confirm2(msg, 'body', btn2Fn || btn1Fn, btn1Text, btn2Text, btn1Fn);
    };
    // 配送票弹框
    zjPopup.showConfirmOff = function (title, msg,imgage,iconarr,textarr, btn1Text, btn1Fn, btn2Text, btn2Fn) {
        var pre = '//file.40017.cn/trainwechat/product/offlineimage/';

        var topicon = '<img class="offtopimage" src="'+ pre + imgage +'.png"/>';
        var title = "<title>" + title + "</title>";
        var content = msg;
        var icondiv = '<div class="imagediv flex-box">';
        for(var i =0; i<iconarr.length; i++){
            var divtemp = '<div class="flex1">';
                divtemp += '<img class="imageclass" src="'+ (pre + iconarr[i]) +'.png" />';
                divtemp += '<div class="imagetext">'+ (textarr[i]) +'</div>';
            divtemp += '</div>';
            icondiv+=divtemp;
        }
        icondiv +='</div>';

        var offcontent = '<div>' + topicon  + title + content + icondiv+'</div>';

        mobileUtil.confirmOff(offcontent, 'body', btn2Fn || btn1Fn, btn1Text, btn2Text, btn1Fn);


    };

    zjPopup.showExplain = function (contentObj, closeObj) {
        if (typeof contentObj == "string") contentObj = $(contentObj);
        closeObj = closeObj || $(".layer-close");

        if (closeObj.length == 0) {
            closeObj = $('<div class="layer-close"><s></s></div>');
            closeObj.appendTo(document.body);
        }
        var f = function () {
            contentObj.hide();
            closeObj.hide();
            closeObj.unbind("click", f);
        }
        closeObj.bind('click', f);

        contentObj.show();
        closeObj.show();
    }

    window.zjPopup = zjPopup;

})();

(function () {

    var zj = {};
    /**
     *主要获取客户端的信息
     */
    zj.envi = {
        hasTouch: 'ontouchstart' in window,
        isAndroid: false,
        isIOS: false,
        isIPhone: false,
        isIPad: false,
        //isPC: false,
        isInWeixin: false,
        isInQQ: false,
        deviceType: null,
        deviceModel: null,
        osVersion: null,
        //获取网络类型
        getNetType: function () {
            if (navigator.connection) return navigator.connection.type;
            return 0;
        },
        //获取客户端类型 ios android等
        init: function () {
            var av = window.navigator.appVersion;
            if (/Android /.test(av)) this.isAndroid = true;
            else if (/iPhone;/.test(av)) this.isIPhone = true;
            else if (/iPad;/.test(av)) this.isIPad = true;
            //else this.isPC = true;

            if (/MicroMessenger/.test(av)) this.isInWeixin = true;
            else if (/MQQBrowser/.test(av)) this.isInQQ = true;

            this.deviceType = this.isAndroid ? "Android" : (this.isIPhone ? "iPhone" : (this.isIPad ? "iPad" : "Other"));

            if (this.isAndroid) this.osVersion = /Android (\d+[^;]+)?;/.exec(av)[1], this.deviceModel = /; ([^;\)]+)\)/.exec(av)[1];
            else if (this.isIPhone || this.isIPad) this.osVersion = / OS (\d+[^ ]+)? /.exec(av)[1].replace(/_/g, '.');

            this.isIOS = /Mac OS X/.test(av);
        },
        /**
         *返回客户端所有信息 以及自己想要添加的字符串joinStr内容
         * "5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1
         *  hasTouch:true
         *  isAndroid:false
         *  isIOS:true
         *  isIPhone:true
         *  isIPad:false
         *  isInWeixin:false
         *  isInQQ:false
         *  deviceType:iPhone
         *  deviceModel:null
         *  osVersion:9.1
         *  width:414
         *  height:736"
         */
        toString: function (joinStr) {
            var a = [window.navigator.appVersion];
            for (var i in this) if (typeof this[i] != "function") a.push(i + ":" + this[i]);
            a.push("width:" + $(window).width());
            a.push("height:" + $(window).height());
            return a.join(joinStr || "\r\n");
        }
    };

    zj.envi.init();


    /*
    0	unknown	UNKNOWN
    1	ethernet	ETHERNET
    2	wifi	WIFI
    3	2g	CELL_2G
    4	3g	CELL_3G
    5	4g	CELL_4G（中国现在也会出现这个值，是hspa+）
    ?	none	NONE
    */
    zj.netType = {
        _unknown: 0,
        _ethernet: 1,
        _wifi: 2,
        _2g: 3,
        _3g: 4,
        _4g: 5
    };

    zj.log = function (args) { };

    // 返回微信的auth授权链接
    zj.getOauthUrl=function(redirect_uri){
        var url = location.href.toLowerCase();
        var perUrl="";
        if (url.indexOf("//wx.17u.cn/train/") > -1){
            if(url.indexOf("//wx.17u.cn/traintest/") > -1)
                perUrl="//wx.17u.cn/traintest/";
            else if(url.indexOf("//wx.17u.cn/traintest1/") > -1)
                perUrl="//wx.17u.cn/traintest1/";
            else
                perUrl="//wx.17u.cn/train/";
        }else{
            perUrl="//wx.17u.cn/traintest/";
        }
        redirect_uri=encodeURIComponent(perUrl+redirect_uri);
        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    }

    zj.date = {

        /**
         * 将表示时间的字符串转换成时间格式
         * eg：new Date(Date.parse('2016-06-24'.replace(/-/g, '/'))) -> Fri Jun 24 2016 00:00:00 GMT+0800 (中国标准时间)
         * 同上面的 Date.ParseString 方法
         */
        parse: function (str) {
            return new Date(Date.parse(str.replace(/-/g, '/')));
        },

        // 计算两个时间戳之间的时间差返回相差的天数，小时数，分钟数，秒数
        getDiff: function (date1, date2) {

            var ms = (date1.getTime() - date2.getTime()); // / 24 / 3600 / 1000;

            var day1 = Math.floor(ms / 24 / 3600 / 1000),
                hh1 = Math.floor((ms / 3600 / 1000) % 24),
                mm1 = Math.floor((ms / 1000 / 60) % 60),
                ss1 = Math.floor((ms / 1000) % 60);
            return {
                day: day1,
                hour: hh1,
                minute: mm1,
                second: ss1
            };
        }

    };

    zj.config = {

        platId: 501,

        jsRoot: null,

        //账号配置开关，原来在 kyfwlogin.js 里
        getAccountConfigure: function (callback) {
            var accountConfigure = storeWithExpiration.get('accountConfigure');
            if (accountConfigure != null) {  // old no != null
                storeWithExpiration.set('accountConfigure', accountConfigure, 5 * 60 * 1000) // 数据缓存5分钟
                callback && callback(accountConfigure);

            } else {
                $.ajax({   //配置开关接口
                    url: 'GetResourceByName.html',
                    data: { para: JSON.stringify({ resourceName: "UserBinding12306ForPlaceOrder", flag: 4 , timeStamp:new Date().getTime() }) },  //flag: 5表示手Q  4表示微信
                    dataType: "json",
                    success: function (response) {
                        response = JSON.parse(response);
                        //response = {"msgCode":"1000","msgInfo":"成功","data":"1"};
                        if (response.msgCode == "1000") {
                            //accountConfigure ->   0：两者并存    1：同程账号    2：12306账号
                            accountConfigure = response.data;

                            storeWithExpiration.set('accountConfigure', accountConfigure, 5 * 60 * 1000) // 数据缓存5分钟
                            callback && callback(accountConfigure);
                        }
                    },
                    error: function () {
                        //接口失败，则默认同程账号登陆
                        callback && callback(1);
                    }
                });
            }
        },

        //获取当前可以使用账号类型及是否是在job时间
        getUseAccountType: function (callback) {
            zj.apis.isWorkTime(function (data) {
                if (data) {
                    zj.config.getAccountConfigure(function (da) {
                        callback(da, true);
                    });
                } else {
                    callback(zj.useAccountType.tc, false);
                }
            });
        }
    };

    zj.useAccountType = {

        //两者并存
        both: 0,

        //同程账号
        tc: 1,

        //12306账号
        _12306: 2
    };

    /**
     * 封装异步请求方法
     */
    zj.apiHelper = {

        trainRequestApi: "TrainRequest/CommonAction",

        getOpts: function (api, data, method, callback, timeout, dataType) {

            return {
                url: api,
                data: data,
                type: method,
                dataType: dataType || "json",
                timeout: timeout || 30000,
                success: function (d) {
                    if (callback) callback(true, d);
                },
                error: function (d) {
                    if (callback) callback(false, d);
                }
            };
        },
        request: function(ControllerName,ActionName,param,callback,UrlType){
            if(!UrlType){
                UrlType="ResourceUrl";
            }
            var url = location.href.toLowerCase();
            var root="";
            if (url.indexOf("//wx.17u.cn/traintest/") > -1){
                root="/traintest";
            }else if (url.indexOf("//wx.17u.cn/train") > -1){
                root="/train";
            }else if(url.indexOf('//wx6.t.17u.cn/train') > -1){
                root="/train";
            }else{
                root="";
            }
            var api=root+"/TrainRequest/CommonAction?urlInfo={\"UrlType\":\""+UrlType+"\",\"ControllerName\":\""+ControllerName+"\",\"ActionName\":\""+ActionName+"\"}"+param;
            return $.ajax({
                url: api,
                data: null,
                type: "GET",
                dataType: "json",
                timeout: 30000,
                success: function (d) {
                    if (callback) callback(true, d);
                },
                error: function (d) {
                    if (callback) callback(false, d);
                }
            });
        },

        get: function (api, data, callback, timeout) {
            if ($.isFunction(data)) callback = data, data = null;
            return $.ajax(this.getOpts(api, data, "GET", callback, timeout));
        },

        post: function (api, data, callback, timeout) {
            return $.ajax(this.getOpts(api, data, "POST", callback, timeout));
        },

        getJSONP: function (api, data, callback, timeout) {
            if ($.isFunction(data)) callback = data, data = null;
            return $.ajax(this.getOpts(api, data, "GET", callback, timeout, "jsonp"));
        },

        postJSONP: function (api, data, callback, timeout) {
            return $.ajax(this.getOpts(api, data, "POST", callback, timeout, "jsonp"));
        },

        getText: function (api, data, callback, timeout) {
            if ($.isFunction(data)) callback = data, data = null;
            return $.ajax(this.getOpts(api, data, "GET", callback, timeout, "text"));
        }
    };


    zj.trainUser = {
        // 从store中获取TrainUser信息
        get: function () {
            var json = store.get('TrainUser');
            if (json) return JSON.parse(json);
            return null;
        },
        getUserName:function(){
            var json = store.get('TrainUser');
            if (json){ 
                return (JSON.parse(json)).username;
            }else{
                json = store.get('TrainUserTemping');
                if(json){
                    return json.username;
                }else{
                   json = store.get('GetKyfwAccountForLastKey');
                    if(json){
                        return json.val;
                    } 
                }
            }
            return null;
        },

        //获取或设置当前的主动登出状态（true代表已主动登出，false代表没有主动登出），注意没有登出不代表已登录
        currentActiveSignOut: function (isSignOut) {
            var key = "currentActiveSignOut_key";
            if (typeof isSignOut == "undefined") {
                var v = sessionStorage.getItem(key);
                if (v == null) return false;
                return v == "true";
            }
            sessionStorage.setItem(key, isSignOut);
        },

        //获取火车票(12306)用户临时登录凭据，还未登录成功
        getTemp: function () {
            return store.get("TrainUserTemping");
        },

        //当前是否已经登录
        isLogined: function (fun, errFun, isShowLoging, userName) {

            if (typeof errFun == "boolean") isShowLoging = errFun, errFun = null;
            isShowLoging = isShowLoging == false ? false : true;

            var u = this.get();
            if (storeWithExpiration.get('isTrainLogged') && u) {
                fun(true);
            } else {
                fun(false);
                return;

                var name = userName || u.username,
                    para = {
                        opendId: getWxObj().openid || store.get("WxOpenid") || "",
                        userName: encodeURIComponent(name),
                        //passWord: null,
                        binding: 2, //binding: 0 绑定（登录）  2 验证登录   3 自动登录
                        platId: zj.config.platId
                    };

                if (isShowLoging) showLoading();

                var api = "BingingKyfwV1";
                zj.apiHelper.post(api, { Para: JSON.stringify(para) }, function (isOk, res) {
                    if (isShowLoging) hideLoading();
                    if (isOk) {
                        if (res.msgCode == "1000") storeWithExpiration.set('isTrainLogged', true, 15 * 60 * 1000);
                        fun(res.msgCode == "1000");
                    } else {
                        if (errFun) errFun(res);
                        else zjPopup.showDialog("获取登录状态失败！");
                    }
                });
            }
        },

        //登录 
        login: function (fn, prompt, openFun,isThreshold,tempName) {
            tempName = tempName || ""
            var openPage = function () {
                utilityRailway.bindEvent();
                utilityRailway.loginPromptMsg = prompt;
                utilityRailway.openLoginPage(null, null, function () {
                    utilityRailway.hideCancelLogin();
                    if (openFun) openFun();
                },isThreshold,tempName);
            };
            utilityRailway.loginCallback = function (tag) {
                //tag -> 0:登录失败 1：登录成功 
                if (tag == 1) {
                    var u = zj.trainUser.get();
                    // 更新获取最后一次登录用户名缓存
                    if (u && u.username) {
                        var key = "GetKyfwAccountForLastKey",
                            o = localStorage.getItem(key);
                        if (o) {
                            o = JSON.parse(o);
                            o.val = u.username;
                            localStorage.setItem(key, JSON.stringify(o));
                        }
                    }
                    if (fn) {
                        fn();
                    }
                } else {
                    openPage();
                }
            }
            openPage();
        },

        //登录附带取消模块
        loginWithCancel: function (fn, prompt, cancelFn) {
            this.login(fn, prompt, function () {
                utilityRailway.showCancelLogin(cancelFn);
            });
        },

        //验证是否已登录，如果未登录则必须登录
        checkAndLogin: function (fun, prompt, isShowLoading, userName, isHideReg,jumpTo) {
            if(!getWxObj().openid){
                var redirect_uri = encodeURIComponent(location.href);
                location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
                return;
            }            
            if (typeof prompt == 'boolean') isShowLoading = prompt, prompt = null;
            var t = this,
                login = function () {
                    if (isShowLoading == false) fun({ status: 1, msg: "需要登录" });
                    t.login(function () {if(jumpTo){resetAllVouchers(); location.href = jumpTo;return;} fun({ status: 0, msg: "登录成功" }) }, prompt,function(){
                        $(".orwrap").hide();
                        $('.btnreg').show();
                        $('.redPackWrap').hide();
                        if(isHideReg)
                        $(".regLabel.btnreg").hide();
                        $.ajax({
                            url: "TrainJson/IsTicketSuccess?openId="+getWxObj().openid+"&timeStamp"+(new Date()).getTime(),
                            dataType: "json",
                            type: "get",
                            success: function (data) {
                                if(data==true){
                                    $('.redPackWrap').show();
                                    $(".redPackWrap").unbind("click").on("click",function(){
                                      zj.track.tc('denglu-12306hongbao');
                                      location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=https://wx.17u.cn/flight/getopenid.html?url=https://app.ly.com/train/html/train/20161103transit12306/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect");
                                    });
                                }
                            }
                        });
                    });
                };
            this.isLogined(function (isLogin) {
                if (isLogin) fun({ status: 0, msg: "不需要登录" });
                else login();
            }, function () {
                prompt = "登录已失效，请重新登录";
                login();
            }, isShowLoading, userName);
        },

        //通过特定的用户名，验证是否已登录，如果未登录则必须登录，且走自动登录模式
        checkAndLoginByName: function (userName, fun, prompt, isShowLoading,isHideReg) {
            var isHideReg = isHideReg || false;
            utilityRailway.autoLoginUserName = userName;
            this.checkAndLogin(fun, prompt, isShowLoading, userName,isHideReg);
        },

        // 清除用户登录信息
        clear: function () {
            store.set('TrainUser', '');
            storeWithExpiration.set('isTrainLogged', false);
        },

        //自动登录，之前已舍弃，现在又启用
        autoLogin: function (fn, userName) {
            utilityRailway.autoLogin(fn, userName);
        }
    };


    zj.apis = {
        // 判断是否是工作时间
        isWorkTime: function (callBack) {
            var cacheKey = "isWorkTime",
                o = sessionStorage.getItem(cacheKey);
            if (o) {
                try{
                    o = JSON.parse(o);
                    if (Number(o.time) + 2 * 60 * 1000 <= new Date().getTime()) { // 
                        callback && callback(o.value == 'true');
                        return;
                    };
                }catch(e){}                
            };
            $.ajax({
                url: "CheckWorkTime?timeStamp="+(new Date()).getTime(),
                type: "post",
                timeout: 20000,
                dataType: "text",
                success: function (res) {
                    if(res==='true'){
                        sessionStorage.setItem(cacheKey, JSON.stringify({time:new Date().getTime(), value: 'true'}));                    
                        callBack(true);
                    }else if(res==='false'){
                        sessionStorage.setItem(cacheKey, JSON.stringify({time:new Date().getTime(), value: 'false'}));                    
                        callBack(false);
                    }else{
                        var clientTime=new Date();
                        var timeStamp=clientTime.getTime();
                        var offset=clientTime.getTimezoneOffset()*60*1000+(8*60*60*1000);

                        var bjTime=new Date(timeStamp+offset);
                        var h=bjTime.getHours();
                        if(h>=6 && h<23){
                            callBack(true);
                        }else{
                            callBack(false);
                        }
                    }
                },
                error: function () {
                    var clientTime=new Date();
                    var timeStamp=clientTime.getTime();
                    var offset=clientTime.getTimezoneOffset()*60*1000+(8*60*60*1000);

                    var bjTime=new Date(timeStamp+offset);
                    var h=bjTime.getHours();
                    if(h>=6 && h<23){
                        callBack(true);
                    }else{
                        callBack(false);
                    }
                    
                },
                complete: function (req, state) { }
            })
        },
        // 获取服务器时间
        getServiceTime: function (fn) {
            zj.apiHelper.get("GetServiceTime?timeStamp="+(new Date()).getTime(), null, function (isOk, data) {
                if (fn) fn((isOk && data) ? data : null);
            }, 3000);
        },

        //获取远程12306用户常旅 new
        getRemoteContacts: function (account, callback, isRefresh) {
            zj.apiHelper.post(
                'GetKyfwMemberLinker.html',
                {
                    otherAccounts: account,
                    type: isRefresh ? 1 : 0,
                    OpenId:getWxObj().openid,
                    platId: zj.config.platId,
                    timeStamp: (new Date()).getTime(),
                }, callback);
        },

        //验证乘客是否是315乘客，没有的话会返回：{"Passengers":null}
        getPassengerVerify: function (passengers, callback) {
            zj.apiHelper.get(
                'GetPassengerVerify',
                passengers,
                callback);
        }

    };

    zj.events = {

        /**
         * 添加hash绑定事件
         * @param {String} name page名称，如果传空的话，则表示全局不做筛选
         * @param {Function} fun 回调函数，参数：是否是打开（append）
         * @param {Boolean} allowQueue 回调函数是否启用队列，默认不启用
        */
        hashChange: function (name, fun, allowQueue, tag) {
            if (name == null) name = "";
            name = name.toLowerCase();

            if (this.hashArr == null) {
                var _this = this;
                this.hashArr = [];
                $(window).bind('hashchange', function (e) {

                    var newHash = location.hash.toLocaleLowerCase(),
                        oldHash = e.oldURL.lastIndexOf('#') == -1 ? "" : e.oldURL.substring(e.oldURL.lastIndexOf('#') + 1).toLowerCase();
                    if (newHash) newHash = newHash.substring(1);

                    // 先执行全局
                    for (var i in _this.hashArr) {
                        if (_this.hashArr[i].name.length == 0) {
                            _this.hashArr[i].callback(null, e);
                            break;
                        }
                    }

                    for (var i = _this.hashArr.length - 1; i > -1; i--) {
                        if (_this.hashArr[i].name.length == 0) continue;
                        if (_this.hashArr[i].name == oldHash) { // 关闭（remove）
                            if (_this.hashChangeCloseList) {
                                for (var j in _this.hashChangeCloseList) _this.hashChangeCloseList[j](oldHash);
                            }
                            _this.hashArr[i].callback(false, e);
                            break;
                        }
                        if (_this.hashArr[i].name == newHash) { // 打开 (append)
                            if (_this.hashChangeOpenList) {
                                for (var j in _this.hashChangeOpenList) _this.hashChangeOpenList[j](newHash);
                            }
                            _this.hashArr[i].callback(true, e);
                            break;
                        }
                    }
                });
            }

            for (var i in this.hashArr) {
                if (this.hashArr[i].name == name) {
                    if (!allowQueue) this.hashArr[i].funs.length = 0;
                    this.hashArr[i].funs.push(fun);
                    return;
                }
            }

            this.hashArr.push({
                name: name, funs: [fun], callback: function (isAppend, e) {
                    for (var i in this.funs) this.funs[i](isAppend, e);
                }, toString: function () {
                    return name;
                }
            });
        },

        hashChangeCloseList: null,

        registerHashChangeClose: function (fn) {
            if (!this.hashChangeCloseList) this.hashChangeCloseList = [];
            this.hashChangeCloseList.push(fn);
        },

        hashChangeOpenList: null,

        registerHashChangeOpen: function () {
            if (!this.hashChangeCloseList) this.hashChangeOpenList = [];
            this.hashChangeOpenList.push(fn);
        },

        // 点击事件延迟，
        clickDelay: function (fn, args, delay) {

            $("input").each(function (i, o) {
                o.blur();
            });
            if (delay == null) {
                delay = zj.envi.isIOS ? 500 : 200;
            }
            setTimeout(fn, delay, args);
        },
        // 绑定点击事件延迟
        bindDelayClick: function (o, fn, delay) {
            var _this = this;
            $(o).bind("click", function (e) {
                _this.clickDelay(fn, e, delay);
            });
        }
    };
    //打开认证遇到问题窗口
    zj.approveProblem = {
        open: function(fircallBack,secCallback,thrCallback,closeCallback){
            fircallBack && (this.fircallBack = fircallBack);
            secCallback && (this.secCallback = secCallback);
            thrCallback && (this.thrCallback = thrCallback);
            closeCallback && (this.closeCallback = closeCallback);
            if($(".abtest-container").length != 0) {
                $('.abtest-container,.abtest-mask').show();
                return
            }
            this.inlineStyle();
            this.render();
        },
        render: function(){
            var html = ['<div class="abtest-container">',
            '<span class="ab-close"></span>', 
            '<div class="ab-words1">登录遇到问题？</div>', 
            '<div class="ab-words2 suggest-you">未登录购票可能会因身份核验不通过导致出票失败，建议您：</div>',
            '<ul class="lines-choose"><li class="thin-border-top register">极速注册并登录</li> ',
            '<li class="find-pswd thin-border-top">找回密码</li>',
            '<li class="jump-step thin-border-top" style="display:none">跳过登录</li>',
            '</ul></div>',
             '<div class="abtest-mask"></div>'];
            $('body').append(html.join(''));
            //配置健，是否显示跳过认证
            /*memberConfig("ABTestLoginPageV1C", "CommonAbTest", function(res) {
                if (res && res.IsShow == 0) {
                   $('.jump-step').show();
                } else{

                }
            })*/
            this.bindEvent();

        },
        //沙盒 Style
        inlineStyle: function(){
            var style = ".abtest-container{position:fixed;background:#fff;width:290px;height:auto;border-radius:10px;z-index:999;left:50%;margin-left:-145px;top:20%;padding-top:15px;font-size:1pc;color:#333;box-sizing:border-box}.ab-words1,.ab-words2{padding:6px 18px;text-align:center;color:#333;font-size:18px}.ab-link,.ab-words2{color:#666;font-size:9pt}.ab-tips{display:block;background:url(//file.40017.cn/trainwechat/product/img/12306/icon12306_warning.png) 0 0 no-repeat;background-size:100% 100%;width:95px;height:85px;margin:0 auto 8px}.ab-btn1,.ab-btn2{display:block;font-size:18px;text-align:center;line-height:44px;width:15pc;margin:10px auto;border:1px solid #dcdcdc;border-radius:3px;box-sizing:border-box}.ab-btn1{background:#3c6;color:#fff;border:0 none}.ab-btn2{margin-top:20px}.ab-link{display:block;text-align:center;margin:20px 0}.abtest-mask{position:fixed;left:0;top:0;height:100%;width:100%;z-index:998;background:rgba(0,0,0,.5)}.abtest-close{position:absolute;right:20px;top:15px;color:#ccc}.ab-close:after,.ab-close:before{content:'';position:absolute;width:20px;height:20px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ab-close:before{border-left:1px solid #ccc;-webkit-transform-origin:0 30%;transform-origin:0 30%}.ab-close:after{border-bottom:1px solid #ccc;-webkit-transform-origin:80% 0;transform-origin:80% 0}.suggest-you{font-size:14px;line-height:24px}.lines-choose{margin-top:28px;text-align:center;color:#3c6}.lines-choose li{line-height:44px}.jump-step{color:#999}.ab-close{position:absolute;right:20px;top:15px;color:#CCC}";
            var boxStyle = '<style class="js-shadow-style">' + style + '</style>';
            $('body').append(boxStyle);
        },
        //事件回调
        bindEvent: function(){
            var _this = this;
            $('.register').off().on('click',function(){
               _this.fircallBack&&_this.fircallBack();
               _this.closeDialog();
            })
            $('.find-pswd').off().on('click',function(){
               _this.secCallback&&_this.secCallback();
               _this.closeDialog();
            })
            $('.jump-step').off().on('click',function(){
                _this.thrCallback&&_this.thrCallback();
                _this.closeDialog();
            })
            $('.ab-close').off().on('click',function(){
                _this.closeCallback&&_this.closeCallback();
                _this.closeDialog();
            })
        },
        closeDialog:function(){
            $('.abtest-container,.abtest-mask').hide();    
        }

    }
    zj.tmpl = {

        callback: function () { },

        //加载模版代码
        loadKyfwloginPage: function (fun, isShowLoading,tmplName) {
            tmplName = tmplName || "";
            /*
            var src = this.getPath("kyfwloginPage.0.0.1.js");
            zj.tmpl.callback = function (txt) {
                $(txt).appendTo(document.body);
                if (isShowLoading) hideLoading();
                fun();
            };
            var js = document.createElement("script");
            js.src = src;
            document.body.appendChild(js);
            return;
            */
            if(location.pathname.indexOf("trainbook.html") > -1){
                tmplName = "ABTest"
            }
            this.load("kyfwloginPage"+tmplName, "0.3.0.11", function (txt) {
                $(txt).appendTo(document.body);
                fun();
            }, isShowLoading);
        },

        load: function (name, version, fun, isShowLoading) {

            var lsName = "_tmpl_" + name,
                data = sessionStorage.getItem(lsName);
            if (data) data = JSON.parse(data);

            if (data && data.version === version) {
                fun(data.txt);
                return;
            }

            isShowLoading = isShowLoading || isShowLoading == null;
            if (isShowLoading) showLoading();
            var src = this.getPath(name);
            (function () {
                var me = arguments.callee;
                zj.apiHelper.getText(src, function (isOk, txt) {
                    zj.log("tmpl txt:", isOk, txt);
                    if (isOk) {
                        if (isShowLoading) hideLoading();
                        sessionStorage.removeItem(lsName);
                        sessionStorage.setItem(lsName, JSON.stringify({ version: version, txt: txt }));
                        fun(txt);
                    } else {
                        setTimeout(me, 1000); // 1s 后稍试
                    }
                });
            })();
        },

        getPath: function (name) {
            return "tmpl/" + name + ".txt?timeStamp=" + (new Date()).getTime(); 
            /*
            var root = zj.config.jsRoot.toLowerCase();
            if (root.indexOf("http") == 0 && root.indexOf("??") > 0) root = root.substring(0, root.zjReplace("//", "aa").indexOf("/")) + root.substring(root.indexOf("??") + 2);
            return root + "tmpl/" + name;
            */
        }
    }

    /**
     *重写page的open方法，页面title可配置，排除了ios中title不能修改的问题
     */
    zj.page = {
        //历史
        hisPages: [],
        pages: [],
        open: function (pageName, title, initFun, notCheckInitRepeat) {
            if ($.isFunction(title)) initFun = title, title = null;
            page.open(pageName);

            var p = { name: pageName, frontTitle: document.title, currentTitle: title || document.title };
            this.pages.push(p);

            if (title) zj.hack.setTitle(title);

            var hasBeenOpened = false;
            for (var i in this.hisPages) {
                if (this.hisPages[i] == pageName) {
                    hasBeenOpened = true;
                    break;
                }
            }

            if (!hasBeenOpened) {
                this.hisPages.push(pageName);
                (function (p) {
                    zj.events.hashChange(p.name, function (isOpen) {
                        if (!isOpen){ 
                            if(p.frontTitle){
                                zj.hack.setTitle(p.frontTitle);
                            }else{
                                history.back();
                            }
                        }
                    }, true);
                })(p);
            }
            if (initFun && (!hasBeenOpened || notCheckInitRepeat)) initFun();
        }

    };

    zj.validator = {
        // 手机号码
        isMobile: function (v) {
            return /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(18[0-9])|(17[0-9])|(19[0-9]))\d{8}$/.test(v);
        },

        // 固话号码
        isTelePhone: function (txt) {
            return /^\\d{3,4}-?\\d{7,8}$/.test(txt);
        },
        // 电子邮箱
        isEmail: function (txt) {
            return /^\w+([-+.\']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(txt);
        },
        // 身份证
        isIdCard: function (txt) {
            //return /(^[0-9]{17}([0-9]|X|x)$)|(^[0-9]{15}$)/.test(txt);

            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
            var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   
            var idCard = txt;
            idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
            if (false && idCard.length == 15) {
                return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
            } else if (idCard.length == 18) {
                var a_idCard = idCard.split("");                // 得到身份证数组   
                if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }

            /**  
             * 判断身份证号码为18位时最后的验证位是否正确  
             * @param a_idCard 身份证号码数组  
             * @return  
             */
            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var sum = 0;                             // 声明加权求和变量   
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
                }
                for (var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i];            // 加权求和   
                }
                valCodePosition = sum % 11;                // 得到验证码所位置   
                if (a_idCard[17] == ValideCode[valCodePosition]) {
                    return true;
                } else {
                    return false;
                }
            }
            /**  
              * 验证18位数身份证号码中的生日是否是有效生日  
              * @param idCard 18位书身份证字符串  
              * @return  
              */
            function isValidityBrithBy18IdCard(idCard18) {
                var year = idCard18.substring(6, 10);
                var month = idCard18.substring(10, 12);
                var day = idCard18.substring(12, 14);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 这里用getFullYear()获取年份，避免千年虫问题   
                if (temp_date.getFullYear() != parseFloat(year)
                      || temp_date.getMonth() != parseFloat(month) - 1
                      || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            /**  
             * 验证15位数身份证号码中的生日是否是有效生日  
             * @param idCard15 15位书身份证字符串  
             * @return  
             */
            function isValidityBrithBy15IdCard(idCard15) {
                var year = idCard15.substring(6, 8);
                var month = idCard15.substring(8, 10);
                var day = idCard15.substring(10, 12);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
                if (temp_date.getYear() != parseFloat(year)
                        || temp_date.getMonth() != parseFloat(month) - 1
                        || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            //去掉字符串头尾空格   
            function trim(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
        },
        // 邮编
        isZip: function (txt) {
            return /^\\d{6}$/.test(txt);
        },
        // 常旅姓名
        isTravelName: function (txt) {
            return /^[a-z\u4e00-\u9fa5]+$/i.test(txt);
        }
    };

    zj.cred = {
        // 是否有微信的信息
        hasWxObj: function () {
            var wx = getWxObj();
            if (wx == null || wx.userid == null || wx.openid == undefined || wx.openid == "undefined" || wx.openid == "0") {
                mobileUtil.dialog("会员信息丢失，请重新查询预订", "body", function () {
                    //判断当前环境在小程序内还是H5， isInMiniPro ：true 小程序内;false  H5
                    miniProgramEnv.judgeIsMiniProgramEnv(function(isInMiniPro){
                        if(isInMiniPro){
                            wx.miniProgram.switchTab({
                                url : '/page/home/index/index'
                            })
                        }else{
                            location.href = WebConfigUrl.wxIndexUrl;
                        }
                    })
                });
                return false;
            }
            return true;
        },

        // 是否是新用户
        isNewUser: function(){
            return !getWxObj().userid;
        },
        //去微信首页
        toWxAuthIndex: function () {
            //判断当前环境在小程序内还是H5， isInMiniPro ：true 小程序内;false  H5
            miniProgramEnv.judgeIsMiniProgramEnv(function(isInMiniPro){
                if(isInMiniPro){
                    wx.miniProgram.switchTab({
                        url : '/page/home/index/index'
                    })
                }else{
                    location.href = WebConfigUrl.wxIndexUrl;
                }
            })
        }
    };

    zj.track = {
        //微信火车埋点
        tc: function (key, eventName) {
            eventName = eventName || "click";
            zj.log("track:", key, eventName);
            try {
                _tcTraObj._tcTrackEvent(eventName, key, 'wxtrain', '');
            } catch (ex) { }
        },

        //微信火车埋点 带value
        tcVal: function (action, value, category) {
            category = category || "click";
            value = encodeURIComponent(JSON.stringify($.extend({},value)));
            zj.log("track:",category, action, 'wxtrain', value);
            try {
                _tcTraObj._tcTrackEvent(category, action, 'wxtrain', value);
            } catch (ex) { }
        },

        htStore: function (data) {
            var key = "htStore_key";
            if (data) {
                sessionStorage.setItem(key, typeof data == "string" ? data : JSON.stringify(data || {}));
            } else {
                var o = sessionStorage.getItem(key);
                return o && JSON.parse(o) || {};
            }
        },

        htBegin: function (key) {
            var obj = this.htStore();
            obj["_" + key] = {
                begin: new Date().getTime(),
                end: 0,
                data: null
            };
            this.htStore(obj);
        },

        htEnd: function (key, data) {
            var obj = this.htStore();
            key = "_" + key;
            if (!obj[key]) return;
            obj[key].end = new Date().getTime();
            if (data) obj[key].data = (typeof data == "[object Object]" || $.isArray(data)) ? JSON.stringify(data) : data;
            this.htStore(obj);

            var c = 0;
            for (var i in obj) c++;
            if (c >= 6) this.htSave();
        },

        htSave: function () {
            if (!window.tcpLogWrite) return;

            var obj = this.htStore();
            for (var i in obj) {
                if (i.charAt(0) != '_') delete obj[i];
                else if (obj[i].end > obj[i].begin) {  // 只发送已结束的，并从缓存中删除
                    //window.tcpsearchlog(i.substring(1), (obj[i].end - obj[i].begin) + (obj[i].data ? "&data=" + obj[i].data : ""));
                    window.tcpLogWrite(i.substring(1), (obj[i].end - obj[i].begin) + (obj[i].data ? "&data=" + obj[i].data : ""));
                    delete obj[i];
                }
            }

            //window.tcpBuriedEnd();
            this.htStore(obj);
        }
    };

    zj.format = {
        // 给手机号添加空格 => 13123456789 ->131 2345 6789
        forMobile: function (input, value) {
            if (typeof input == "string") input = $(input);
            var f = function (i, v) {
                v = v.replace(/\s/g, "");
                if (v.length > 7) v = v.substring(0, 3) + " " + v.substring(3, 7) + " " + v.substring(7);
                else if (v.length > 3) v = v.substring(0, 3) + " " + v.substring(3);
                i.val(v);
            };
            input.bind("keyup", function () { f($(this), $(this).val()); });
            if (value) f(input, value);
        },
        // 给身份证号码加上空格
        forIdCard: function (input, value) {
            if (typeof input == "string") input = $(input);
            var f = function (i, v) {
                var v = v.replace(/\s/g, "");
                if (v.length > 14) v = v.substring(0, 6) + " " + v.substring(6, 14) + " " + v.substring(14);
                else if (v.length > 6) v = v.substring(0, 6) + " " + v.substring(6);
                i.val(v);
            };
            input.bind("keyup", function () { f($(this), $(this).val()); });
            if (value) f(input, value);
        }
    };

    
    zj.tool = {

        // 获取微信授权URL
        getWxAuthUrl: function (url) {
            if (zj.test) return url; // 如果是测试，则不走授权 16-03-07
            if (url.indexOf("://") == -1) url = location.href.substring(0, location.href.replace('//', 'aa').indexOf('/')) + location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) + url;
            var indexUrl = WebConfigUrl.wxIndexUrl; //  $("#wxIndexUrl").val(),
                start = indexUrl.substring(0, indexUrl.indexOf("redirect_uri=") + "redirect_uri=".length),
                end = '&' + indexUrl.substring(indexUrl.lastIndexOf("response_type=code"));
            return start + encodeURIComponent(url) + end;
        },

        // 获取微信授权URL并且把QueryString转换成JSON String
        getWxAuthUrlAndQsToJSONString: function (url, qs) {
            var js = {};
            if (qs) {
                if (qs.indexOf('?') == 0) qs = qs.substring(1);
                var j,
                    arr = qs.split('&');
                for (var i in arr) {
                    if (!arr[i]) continue;
                    j = arr[i].indexOf('=');
                    if (j == -1) js[arr[i]] = "";
                    else js[arr[i].substring(0, j)] = arr[i].substring(j + 1);
                }
            }
            zj.log(js);
            return this.getWxAuthUrl(url + "?urlQueryString=" + encodeURI(JSON.stringify(js)) + "&");
        },

        // 获取当前URL中的参数并转换成JSON对象【不能兼容&符号】
        getJSONFromUrlQs: function () {
            var qj = getRequest();
            if (typeof qj.urlQueryString != 'undefined' && qj.urlQueryString) {
                try {
                    return JSON.parse(decodeURI(qj.urlQueryString));
                } catch (e) { }
            }
            return null;
        },
        // 获取qdid
        getQdid: function(){
            return $.cookie("qdid");
        },
        // 设置订单号
        setOrderNumber:function(orderNumber){
            sessionStorage.setItem("orderNumber", orderNumber);
        },
        // 获取订单号
        getOrderNumber: function(isRemove){
            var on = sessionStorage.getItem("orderNumber");
            if (isRemove) sessionStorage.removeItem("orderNumber");
            return on;
        },
        // 返回首页
        toIndex: function () {
            //判断当前环境在小程序内还是H5， isInMiniPro ：true 小程序内;false  H5
            miniProgramEnv.judgeIsMiniProgramEnv(function(isInMiniPro){
                if(isInMiniPro){
                    wx.miniProgram.switchTab({
                        url : '/page/home/index/index'
                    })
                }else{
                    location.href = WebConfigUrl.wxIndexUrl;
                }
            })
        },
        toElongIndex:function(){
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf5f19f298d69d701&redirect_uri=https%3A%2F%2Fx.elong.com%2Fauthorize%2Fweixin%2Fcode%2F%3FbackUrl%3Dhttps%253A%252F%252Fx.elong.com%252Fhotelwxqb%252Findex%252F%253Fref%253Dwxqbh5%2526tab%253Dtrain%26from%3Dtc&response_type=code&scope=snsapi_base#wechat_redirect";
        }
    };

    /**
     * 在ios下无法修改title的问题
     */
    zj.hack = {

        setTitle: function (title) {
            document.title = title;
            if (zj.envi.isIOS) {
                // hack在微信等webview中无法修改document.title的情况
                var ifr = $('<iframe src="/favicon.ico"></iframe>');
                ifr.on('load', function () {
                    setTimeout(function () {
                        ifr.off('load').remove();
                    }, 0);
                }).appendTo($('body'));
            }
        }
    };

    window.zj = zj;

})();

if (window != parent) top.location.href = window.location.href;

/**
 * 跳转12306登录页面
 */
function _12306MenuClick(e) {
    location.href = "trainMy12306.html";
}

/**
 * 打开日历，依赖日历组件
 */
function openCalendar(opts) {
    var dateForTips=(typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date();    

    var _tempDate = new Date(dateForTips.getFullYear(), dateForTips.getMonth(),dateForTips.getDate() + 59);

    var _tempfutureDate=new Date(_tempDate.getTime()+6 * 24 * 3600 * 1000);
    var monthEnd=(_tempDate.getMonth() + 1);
    var dayEnd=_tempDate.getDate();
    var futureMothEnd=(_tempfutureDate.getMonth() + 1);
    var futureDayEnd=_tempfutureDate.getDate();
    var isChangeOrder=getRequest().isChangeOrder==1?true:false;
    var type="";
    var tipsText="";
    type=isChangeOrder?"":"抢";
    //判断12月30日前后
    var judgeDate = new Date("2016/12/30").getTime();
    var nowDate = new Date().getTime();
    if(nowDate>=judgeDate){
        monthEnd = new Date(nowDate+29*24*60*60*1000).getMonth()+1;
        dayEnd = new Date(nowDate+29*24*60*60*1000).getDate();
        futureMothEnd = new Date(nowDate+75*24*60*60*1000).getMonth()+1;
        futureDayEnd = new Date(nowDate+75*24*60*60*1000).getDate();
    }else{
        monthEnd = new Date(nowDate+59*24*60*60*1000).getMonth()+1;
        dayEnd = new Date(nowDate+59*24*60*60*1000).getDate();
        futureMothEnd = new Date(nowDate+75*24*60*60*1000).getMonth()+1;
        futureDayEnd = new Date(nowDate+75*24*60*60*1000).getDate();
    }
    tipsText=isChangeOrder?"":"<br />可提前预约"+futureMothEnd+"月"+futureDayEnd+"日前的火车票，开售自动为您抢票</p>";
    var calendar=new Calendar({
        tips:{
            //text:"<p class='buyDate'>今天是{$month}月{$day}号，可购买"+monthEnd+"月"+dayEnd+"日的火车票"+tipsText
            text:"<p class = 'buyDate'>因铁路局列车运行图调整，火车票预售期调整为30天，建议您提前预约抢票，开售自动抢票。</p>"
        },
        type: type,
        count: opts.count || 4,
        days: opts.days || 59,
        dely: 250,
        date: opts.todayDate || ((typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date()),
        select: opts.select,
        range: opts.range || [],
        onCreate: function (dom) {
            new List({
                floatContainer: document.querySelector(".float-header"),
                Scroll: (function () {
                    var listeners = [];
                    var top;
                    var scroll = new iScroll("calendars", {
                        onScrollMove: function (e) {
                            top = -this.y;
                            listeners.forEach(function (fn) {
                                fn.call(window);
                            });
                        },
                        onScrollEnd: function () {
                            if (document.querySelector(".float-header")) {
                                document.querySelector(".float-header").style.opacity = 1;
                            }
                        }
                    });
                    return {
                        onscroll: function (fn) {
                            listeners.push(fn);
                        },
                        getScrollTop: function () {
                            return top;
                        },
                        getOffsetTop: function (target) {
                            return target.offsetTop;
                        }
                    }
                })(),
                targets: document.querySelectorAll(".calendars-wrapper h3")
            });
            function setHoliday(dataStr){
                if ($($(dom).find("a")[i]).attr('data-day') == dataStr) {
                    $($(dom).find("a")[i]).find("div:first-child").html('<div class="tag_rest"><span class="tag_content">假</span></div>'+zj.date.parse(dataStr).getDate());
                }
            }
            // 对部分法定假日提前放假的情况 调整
            for (var i = 0; i < $(dom).find("a").length; i++) {
                setHoliday("2016-4-30");
                setHoliday("2016-4-2");
                setHoliday("2016-4-3");
            }
            if (opts.onCreate) opts.onCreate();
        },
        canChange: function (date, el) {
            if ($(el).find('div').hasClass('disabled') || $(el).attr('data-day') == (null || "")) {
                /* 给可售期后的添加事件 */
                var p = $(el).attr('data-day');
                var policydate = new Date(zj.date.parse(p).setDate(zj.date.parse(p).getDate() - 29));
                var todayDate = (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date();
                var appointDate=new Date((new Date(date.replace(/-/g, "/"))).getTime()-34*24*3600*1000);
                if (policydate.getTime() > todayDate.getTime()) {
                    var subMsg="您可在"+appointDate.format('yyyy年MM月dd日')+"提前预约抢票。";
                    if(isChangeOrder){
                        subMsg="";
                    }
                    mobileUtil.dialog("预售期为60天，您所选日期将在" + policydate.format('yyyy年MM月dd日') + "开售。"+subMsg, "body");
                }
                return false;
            }
            $(el).parent().parent().parent().find('a').find('div').removeClass('nian_select');
            return true;
        },
        onChange: function (value) {
            if (opts.onChange) opts.onChange(value);
        }
    });
}
/**
 * 获得预定时间
 */
function getBookTime(fn){
    $.ajax({
        url: "GetBookTime.html",
        dataType: "json",
        data: {Channel:501},
        success: function (data) {
            if (data.isSuccess && data.msgCode == 105100) {
                if (fn) fn(data);
            }
        },
        error: function(){
            zjPopup.showDialog("非常抱歉，私人订制服务维护中，请稍等片刻。");
        }
    });
}

/**
 * 当前日期是否可售学生票
 * date :2016-03-14
 */
var isSellStu  = function(date){
    date = date.replace(/-/g,'/');
    var flag = false ;
    var dateArr = date.split('/');
    var year = dateArr[0];
    var month = dateArr[1];
    var day = dateArr[2];
    if(month&&((~~month>=6&&~~month<=9)||(~~month==12||~~month<=3))){
        flag = true;
    }
    return flag;
}


var Tc=window.Tc||{};
/*
 * 经停站信息
 * date :2016-05-05
 * */
//调取接口
Tc.GetStopOvers=function(fromStation,toStation,trainNum,trainDate,callback,callback2){
    var reg = /[\u4E00-\u9FA5]/g;
    var trainNoStr=$('.station-number').text();
    //缓存存在和车次相同时走缓存否则走接口
    if(localStorage.getItem("stopOvers")&&localStorage.getItem("trainNo")==($("#trainNo").val()||trainNoStr.replace(reg,""))&&localStorage.getItem("fromStation")==fromStation&&localStorage.getItem("toStation")==toStation){
        var storageStopOvers=JSON.parse(localStorage.getItem('stopOvers'));
        $('.line-list').html(_.template($('#stationList').html(), Tc.parseStopOvers(storageStopOvers)));
        if(typeof callback === 'function'){
            callback.call(this);  
        }
        return;   
    }else if(typeof callback2 === 'function'){
        callback2.call(this);  
    }
    var data= $.extend({},{from: fromStation,to: toStation,trainNum: trainNum,queryDate: trainDate},APICommonHead);
    zj.apiHelper.get(APIUrl+"getstopovers.html",{para:JSON.stringify(data)}, function (isOk, res) {
        if (isOk && res && res.status==200) {
            res=res.data;
            if (res.stopOvers) {
                if (res.stopOvers.length < 2) {
                    zjPopup.showDialog("经停站长度小于2");
                }else{
                    res.fromStation=fromStation;
                    res.toStation=toStation;
                    if (window.localStorage) {
                        localStorage.setItem("fromStation", res.fromStation);
                        localStorage.setItem("toStation", res.toStation);
                        localStorage.setItem("stopOvers", JSON.stringify(res));
                        if($("#trainNo").val()){
                            localStorage.setItem("trainNo", $("#trainNo").val());   
                        }else{
                            trainNoStr=trainNoStr.replace(reg,"");
                            localStorage.setItem("trainNo", trainNoStr);
                        }
                    }
                    $('.line-list').html(_.template($('#stationList').html(), Tc.parseStopOvers(res)));
                    if(typeof callback === 'function'){
                        callback.call(this);  
                    }
                }
            } else {
                 zjPopup.showDialog("哎呀，现在出了点小问题，请您稍后再试。");
            }
        } else {
            zjPopup.showDialog("哎呀，现在出了点小问题，请您稍后再试。");
        }
        hideLoading(); 
    });
}
//初始化数据
Tc.parseStopOvers=function(res){
    var list=res.stopOvers,
        len=list.length,
        startIndex,
        endIndex;
    list[0].overTime="始发";
    list[len-1].overTime="终点";
    for(var i = 0; i < len; i++){
        if(list[i].stationName==res.fromStation){
            list[i].curClass="cur";
            list[i].hashId="start";
            startIndex=i;
        }else if(list[i].stationName==res.toStation){
            list[i].curClass="cur end";
            endIndex=i;
        }else{
            list[i].curClass="";
        }
    }
    for(var i = 0, len = list.length; i < len; i++){
        if(i>endIndex||i<startIndex){
            list[i].curClass="disable";   
        }    
    }
    res.startIndex=startIndex;
    return res;
}
//滚动效果
Tc.scrollStart=function(){
    var top=document.querySelector(".cur").offsetTop,
        stopOversHeight=document.querySelector(".line-list").offsetHeight,
        stopOversBoxHeight=document.querySelector(".line-mask-scroll").offsetHeight;
    if(top>4&&stopOversHeight>stopOversBoxHeight){
        setTimeout(function(){
            //解决微信特定情况下滑动后内容消失，需要手指再滑动一下
            location.hash="#start";
        },200);
    }
}
//showLoading
Tc.showLoading=function(){
    showLoading();
    $('.loading').css('background','rgba(0,0,0,0)');
};
/*
 * 经停站信息end
 * date :2016-05-05
 * */
//清除搜索结果页浏览位置和筛选项
Tc.removeStorage=(function(){
    var timer=null;
    clearTimeout(timer);
    if(window.sessionStorage){
        timer=setTimeout(function () {
            sessionStorage.getItem("trainType")&&(sessionStorage.removeItem("trainType"));
            sessionStorage.getItem("trainFromTime")&&(sessionStorage.removeItem("trainFromTime"));
            sessionStorage.getItem("trainToTime")&&(sessionStorage.removeItem("trainToTime"));
            sessionStorage.getItem("trainFromStation")&&(sessionStorage.removeItem("trainFromStation"));
            sessionStorage.getItem("trainToStation")&&(sessionStorage.removeItem("trainToStation"));
        },120000);
    }
})();

/*
 * 记录日志start
 * date :2016-05-05
 * */
Tc.record=function(data,url,typeKey){
    data = $.extend({},data,APICommonHead);
    var recordData=$.ajax({
        url: APIUrl+url,
        data:{para:JSON.stringify(data)},
        dataType: "json",
        timeout: 5000,
        type: typeKey, 
        success:function(){

        },
        error:function(){
        },
        complete:function(req,state){
            if(state="timeout"){
                recordData.abort();
            }
        } 
    }) 
}
/*
 * 记录日志end
 * date :2016-05-05
 * */
 /*进度条动效start*/
//定时器方法名
Tc.tid;
//初始定时器时间
Tc.time = 80;
//初始百分比
Tc.percentNum = 0;
//进度条蒙版生成
Tc.progressMask = function(pageWrapId,maskClass) {
    var dom = document.createElement('div');
    dom.classList.add(maskClass);
    document.getElementById(pageWrapId).appendChild(dom);
    stopScroll();
}
//进度条蒙版销毁
Tc.progressMaskRemove = function(progressMask) {
    clearTimeout(Tc.tid);
    document.querySelector('.' + progressMask).remove();
    startScroll();
}
//进度条生成
Tc.progressCreate = function(windowW, progressEl, percentEl,stepX,fn) {
    var percentW = windowW / 100,
        progressDom = document.querySelector('.' + progressEl),
        progressW = progressDom.style.width;
    progressW = Number(progressW.replace("px", ""));
    progressDom.style.width = (progressW + percentW) + "px";
    Tc.percentNum = Number(progressDom.style.width.replace("px", "")) / windowW;
    document.querySelector('.' + percentEl).innerText = Math.round(Tc.percentNum * 100) + "%";
    if (Math.round(Tc.percentNum * 100) < 20 || Math.round(Tc.percentNum * 100) > 60) {
        Tc.tid = setTimeout(function() { Tc.progressCreate(windowW, progressEl, percentEl,stepX,fn)}, 30);
    } else {
        //实现变速
        Tc.time = Tc.time - 5;
        if (Tc.time <= 0) {
            Tc.time = 20;
        }
        Tc.tid = setTimeout(function() { Tc.progressCreate(windowW, progressEl, percentEl,stepX,fn)}, Tc.time);
    }
    //阶梯进度
    Tc.progressStep(Tc.percentNum,stepX,fn);
}
//进度条重置
Tc.progressReset = function(progressEl, percentEl){
    document.querySelector('.' + progressEl).style.width = 0 + "px";
    document.querySelector('.' + percentEl).innerText = "";
}
//进度条100%
Tc.progressFinish = function(windowW, progressEl, percentEl) {
    document.querySelector('.' + progressEl).style.width = windowW + "px";
    document.querySelector('.' + percentEl).innerText = "100%";
    clearTimeout(Tc.tid);
}
//阶梯进度
Tc.progressStep = function(stepNum,stepX,callback) {
    stepNum = Math.round(stepNum * 100);
    if(stepX&&stepNum==stepX){
        clearTimeout(Tc.tid);
        //进度条达到多少可以有回调
        if(callback){
            callback();
        }            
    }
}
 /*进度条动效end*/
//移动端实现:active效果
document.body.addEventListener('touchstart', function () {});  



(function($){
    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    var F = function(x, y, z) {
        return (x & y) | ((~ x) & z);
    }
    var G = function(x, y, z) {
        return (x & z) | (y & (~ z));
    }
    var H = function(x, y, z) {
        return (x ^ y ^ z);
    }
    var I = function(x, y, z) {
        return (y ^ (x | (~ z)));
    }
    var FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var convertToWordArray = function(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    var wordToHex = function(lValue) {
        var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }
        return WordToHexValue;
    };
    var uTF8Encode = function(string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };
    
    $.extend($,{
        md5: function(string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11=7, S12=12, S13=17, S14=22;
            var S21=5, S22=9 , S23=14, S24=20;
            var S31=4, S32=11, S33=16, S34=23;
            var S41=6, S42=10, S43=15, S44=21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
                b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
                b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
                a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
                d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
                c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
                c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
                a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
                d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
                c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
                a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
                a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
                b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
                d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        }
    });

})(Zepto);
var hostLineGrab = function(from, to,callback){
    $.ajax({
        url: "TrainJson/QueryHotLine?fromStation="+from + "&toStation=" + to,
        dataType: "json",
        type:'get',
        success: function (data) {
            if(data == true || data == false)
                callback(data)
        }
    });
};

var isCanAction = function(callback){
    var ajaxData = $.extend({},{
        openid: getWxObj().openid,
        memeberid: getWxObj().userid
    },APICommonHead);
    $.ajax({
        url: APIUrl + "isCanAction.html",
        data: {para:JSON.stringify(ajaxData)},
        type: "get",
        dataType: "json",
        success: function (res) {
            var result = 0;
            if(res && res.status == 200 && res.data == 0){
                // 关闭
                result = 1;
            }
            callback(result);
        },
        error:function(){
            var result = 0; 
            callback(result);
        }
    });
};
//获取12306会员状态id
Tc.get12306VipStatus = function(cb,isnew){
    var ajaxData = $.extend({},{
        OpenId: getWxObj().openid,
        memberId: getWxObj().userid,
        UserName:zj.trainUser.getUserName(),
        IsAsync:1
    },APICommonHead);
    $.ajax({
         url: APIUrl + "GetApplyMemStatus",
        data: {para:JSON.stringify(ajaxData)},
        type: "post",
        dataType: "json",
        success: function (res) {
            if(res&&res.data&&res.data.Code=="1213"&&res.data.Data&&res.data.Data.RequestId){                
                Tc.get12306VipConsumeResult(2,res.data.Data.RequestId,cb,10,isnew);
            }else {
               cb&&cb();
            }
        },
        error:function(){
            cb&&cb();
        }
    });
};
//获取12306会员轮询结果
Tc.get12306VipConsumeResult=function(typeItem,flagItem,fn,timeload,isnewflag){
    timeload--;
    var ajaxData = $.extend({},{
        OpenId: getWxObj().openid,
        memberId: getWxObj().userid,
        Type:typeItem,
        RequestId:flagItem,
        UserName:zj.trainUser.getUserName(),
        IsAsync:1
    },APICommonHead);
    $.ajax({
        url: APIUrl + "GetMemConsumeResult",
        data: {para:JSON.stringify(ajaxData)},
        type: "post",
        dataType: "json",
        success: function (res) {
            if(res && res.data){
                
                var resData=res.data;
                if(resData.code != "1213"){
                    hideLoading();
                    fn&&fn(resData); 
                }else if(resData.code == "1213"){
                    if(timeload<=0){
                        hideLoading();
                        mobileUtil.confirm("<div class='check-fail'>查询人数过多，请稍后重试</div>", "body", function () {
                            if(isnewflag){
                                location.href="MyCenter.html";    
                            }else{
                                location.href="trainmy12306.html";    
                            }
                        }, "重试", "我的12306", function () {
                            timeload = 10;
                            showLoading();
                            Tc.get12306VipConsumeResult(typeItem,flagItem,fn,timeload);
                        });  
                        return;
                    }
                    var st1=setTimeout(function(){
                        Tc.get12306VipConsumeResult(typeItem,flagItem,fn,timeload);
                        clearTimeout(st1);
                    },1000)
                    /*setTimeout(function(){
                        Tc.get12306VipConsumeResult(typeItem,flagItem,fn);
                    },1000)*/
                }else{
                    fn&&fn(resData);
                }
            }
        },
        error:function(){
            hideLoading();
            fn&&fn();
        }
    });
};
//获取12306会员轮询结果VIPCenter使用，其它地方勿用勿修改
Tc.get12306VipInfoConsumeResult=function(typeItem,flagItem,fn){
    var ajaxData = $.extend({},{
        OpenId: getWxObj().openid,
        memberId: getWxObj().userid,
        Type:typeItem,
        RequestId:flagItem,
        UserName:zj.trainUser.getUserName(),
        IsAsync:1
    },APICommonHead);
    $.ajax({
        url: APIUrl + "GetMemConsumeResult",
        data: {para:JSON.stringify(ajaxData)},
        type: "post",
        dataType: "json",
        success: function (res) {
            if(res && res.data){
                var resData=res.data;
                if(resData.code != "1213"){
                    fn&&fn(resData); 
                }else{
                    fn&&fn(resData);
                }
            }
        },
        error:function(){
            hideLoading();
            fn&&fn();
        }
    });
};
Tc.get12306MemberPointsInfo = function(callBack){
    var reqData ={
        memberId:getWxObj().userid,
        OpenID:getWxObj().openid,
        UserName:zj.trainUser.getUserName(),
        IsAsync:1
    }
    reqData=$.extend(reqData,APICommonHead)
    $.ajax({
        url: APIUrl + "GetMemberPoints",
        data: { para: JSON.stringify(reqData) },
        dataType: "json",
        timeout: 50000,
        type:"post",
        success: function(res) {
                callBack&&callBack(res); 
        },error:function(res){
            showToast(res);
            callBack&&callBack(res);
        }
    });
}
// n次不购保及灰度
var isGrayMember= function(callback){
    var ajaxData = $.extend({},{
        OpenId: getWxObj().openid || getCooperateUser().openid,
        memberId: getWxObj().userid || getCooperateUser().userid,
        type: 0
    },APICommonHead);
    $.ajax({
        url: APIUrl + "IsGrayMember",
        data: {para:JSON.stringify(ajaxData)},
        type: "get",
        dataType: "json",
        success: function (res) {
            var result = 0;
            if(res && res.status == 200 && res.data.status == 0 && res.data.IsGrayMember){
                // 是灰度会员
                result = 1;
            }
            callback(result);
        },
        error:function(){
            var result = 0; 
            callback(result);
        }
    });    
};
// 判断是否是生产环境
var isProduct = function(){
    var url = location.href.toLowerCase();
    var result = 0;
    if (url.indexOf("//wx.17u.cn/train") > -1){
        if(url.indexOf("//wx.17u.cn/traintest") > -1)
            result = 0;
        else
            result =1;
    }else{
        result = 0;
    }
    return result;
}
// AB test
var abTestConfig = function(funcType,funcKey,callback){
    // funcKey N次不购保，结果 0 符合尾号&&N次不购保

    var ajaxData = $.extend({},{
        OpenId: getWxObj().openid  || getCooperateUser().openid || store.get("WxOpenid"),
        memberId: getWxObj().userid || getCooperateUser().userid,
        FunctionType: funcType,
        FunctionKey:funcKey
    },APICommonHead);
    $.ajax({
        url: APIUrl + "CommonAbTestSelfBuyGuide",
        data: {para:JSON.stringify(ajaxData)},
        type: "get",
        dataType: "json",
        success: function (res) {
            var result = 1;//Plan B
            if(res && res.status == 200 && res.data.IsShow == 0){
                // Plan A
                result = 0;
            }
            callback(result);
        },
        error:function(){
            var result = 1; 
            callback(result);
        }
    });    
}
// 根据memberid opeind配置键
var memberConfig = function(funcType,funcName,callback,async){
    var ajaxData = $.extend({},{
        OpenId: getWxObj().openid  || getCooperateUser().openid || store.get("WxOpenid"),
        memberId: getWxObj().userid || getCooperateUser().userid,
        FunctionType: funcType
    },APICommonHead);
    $.ajax({
        url: APIUrl + funcName,
        data: {para:JSON.stringify(ajaxData)},
        type: "get",
        dataType: "json",
        timeout: 2000,
        async: !async && async == false ? false : true,
        success: function (res) {
            if(res.data){
                callback(res.data);
            } else{
                callback('');
            }
        },
        error:function(){
            callback("");
        }
    });    
}

//新保险套餐灰度默认值
var insAndComAb=0;
//
//所有增值服务中间层返回默认值
var incrementConfig=0;
//
//同名授权提示
Tc.tonmingFlag=1;
Tc.tongmingLead=function(fn,fn2,fn3){
    if(Tc.tonmingFlag){
        memberConfig("", "GetBindingAuthorizationConfig", function(resData) {
            if (resData && resData.IsShow == true) {
                if(resData.IsNeedNotice){
                    fn&&fn(resData);                    
                }  
                if(resData.IsNeedDialog){
                    fn2&&fn2(resData);
                } 
                if(!resData.IsNeedDialog){
                    fn3&&fn3();       
                }
                Tc.tonmingFlag=0; 
            } else {
                fn3&&fn3();
                Tc.tonmingFlag=0;  
            }
        })
    }
}
//同名授权状态更新
Tc.tongmingBind=function(status){
    var ajaxData = $.extend({},{
        openId: getWxObj().openid  || getCooperateUser().openid || store.get("WxOpenid"),
        memberId: getWxObj().userid || getCooperateUser().userid,
        Status: status
    },APICommonHead);
    $.ajax({
        url: APIUrl + "UpdateBindingAuthorizationStatus",
        data: {para:JSON.stringify(ajaxData)},
        type: "post",
        dataType: "json",
        timeout: 2000,
        success: function (res) {
        },
        error:function(){
        }
    });    
}
//同名授权弹窗
Tc.tongmingLeadDialog=function(data){
    var menuList='',
    dialogContent=data.DialogContent;
    for(var i=0,len=dialogContent.length;i<len;i++){
        menuList += '<li>' + data.DialogContent[i] + '</li>';
    }
    mobileUtil.confirm("<div class='tongming-lead-title'>购票授权</div><div class='tongming-lead-icon'></div><div class='tongming-rule-title'>"+ data.DialogTitle+ "</div><ul class='tongming-rule'>"+menuList+"</ul>", "body", function () {
        zj.track.tc("empowerk");
        Tc.tongmingBind(true);
        $('.tongming-lead').hide();
    }, "拒绝", "允许", function () {
        zj.track.tc("deny-empower");   
        Tc.tongmingBind(false);                         
    });  
}

//微信页面授权
Tc.authorize=function(){
    if (isProduct()) {
        // 线上
        if (!getWxObj() || (getWxObj() && !getWxObj().openid)) {
            var urltemp = location.href;
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=" + encodeURIComponent(urltemp) + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
            return;
        }
    }
}

Tc.createMemeberId=function(is12306){
    var openid=getWxObj().openid;
    var token=getWxObj().token;
    var userid=getWxObj().userid;
    var unionid=getWxObj().unionid;
    var phone=$("#phone").val();
    var isOk=false;
    if(userid || is12306){
        return true
    }
    if(!is12306){
        if (phone == "") {
            mobileUtil.dialog("请输入手机号码！", "body");
            isOk=false;
            return false;
        }
        phone = phone.replace(/\s/g, "");
        if (!/^1[3,4,5,6,7,8,9]\d{9}$/i.test(phone)) {
            mobileUtil.dialog("请正确输入手机号码！", "body");
            isOk=false;
            return false;
        }
    }
    var tmpCookie=$.cookie('WxUser');
    $.cookie('WxUser', null, { expires: 0, path: '/' });
    $.ajax({
        url: "BindWxUser",
        async: false,
        data: {
            openid: openid,
            token: token,
            mobile: phone,
            unionid:unionid,
            timeStamp: new Date().getTime()
        },
        type: "post",
        dataType: "string",
        success: function(userid) {
            isOk=true;
        },
        complete: function(req, state) {
        },
        error: function(){
            isOk=true;
            document.cookie = "WxUser=" + tmpCookie+";domain=17u.cn;";
        }
    });
    return isOk;
}

function isIphoneX(){
    return  (/(iphone)/gi.test(navigator.userAgent) && ((screen.width == 375 && screen.height == 812) || (screen.width == 812 && screen.height == 375)));
}

function getHtmlStr(str){
    var arr=str.replace(/\n/g,"<br>").split("@@");
    for (var i = 0; i < arr.length; i++) {
        if(i%2 != 0){ //偶数项为链接
            arr[i] = arr[i].indexOf('http') > -1 ? arr[i] : 'http://'+arr[i];
            arr[i] = "<a href='"+arr[i]+"' target='_blank' style='color:#3c6'>点击查看</a>"
        }
    };
    return arr.join('');
}

function replace12306cn(str,dom) {
    var str = str.replace("@@www.12306.cn@@","<a target='_blank' href='http://www.12306.cn/mormhweb/' >www.12306.cn</a>");
    $(dom).html(str);
}
function resetAllVouchers(){
    sessionStorage.setItem("OrderPage_ins",0)
    sessionStorage.setItem("OrderPage_Free",0)
    sessionStorage.setItem("OrderPage_tuigai",0)
    sessionStorage.setItem("OrderPage_VipServerIndex",17)
}
function GetNewMemberConfig(cb){
    var param = {
        ActCode: "7dcf7c5d3d4f3b44f482b0d5c230e16c",
        OpenId: getWxObj().openid
    };
    var data = $.extend({}, param, APICommonHead);
    $.ajax({
        url: APIUrl + "GetNewMemberConfig",
        data: { para: JSON.stringify(data) },
        dataType: "json",
        success: function(data) {
            if(data && data.status==200 && data.data){
                var isShow=data.data.IsShow?true:false;
                cb&&cb(isShow,data.data);
            }else{
                cb&&cb(false,null);
            }        
        },
        error: function(){                    
            cb&&cb(false,null);
        }
    });
}
//灰度  是否走4合一  （抢票首页订单列表和车次列表页面）
function grabABGrayscale(callBack){
    var data = $.extend({
        OpenId: getWxObj().openid
    }, APICommonHead);
    $.ajax({
        type: 'POST',
        url: APIUrl + "GetABGrayscaleVersion.html",
        data: { para: JSON.stringify(data) },
        dataType: "json",
        timeout: 3000,
        success: function(data) {
            if (data && data.status == 200) { 
                var body = data.data;
                if(body && body.version == 2){ //1 老版本 2新版本
                    callBack && callBack()
                }
            }
        }
    }) 
}

