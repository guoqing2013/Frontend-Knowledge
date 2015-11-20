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
