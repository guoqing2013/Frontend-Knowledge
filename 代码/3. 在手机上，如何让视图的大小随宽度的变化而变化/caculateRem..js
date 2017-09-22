// https://market.m.taobao.com/markets/20151111/nvzhuang/index?locate=home-1-5-4&spm=a215s.7406091.1.home-1-5-4&scm=2027.1.7.64


!function (e) {
        var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    if( clientWidth > 400 & clientWidth<=500){
                        clientWidth = 400;
                    }
                    if( clientWidth > 500){
                        clientWidth = 500;
                    }
                    var fontSize = 20 * (clientWidth / 375);
                    docEl.style.fontSize = fontSize + 'px';

                    var dpi =  window.devicePixelRatio;
                    var viewport = document.querySelector('meta[name="viewport"]');

                    docEl.setAttribute('data-dpi',dpi);
                    var scale = 1/dpi;
                };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);)
}(window);






