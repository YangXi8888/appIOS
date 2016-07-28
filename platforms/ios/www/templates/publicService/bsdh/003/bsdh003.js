/**
 * Created by Administrator on 2016/4/5.
 */
angular.module('bsdh003.controllers',[])
    .config(function($stateProvider) {
        $stateProvider
            //办税地图
            .state('tab.bsdh003', {
                url: '/bsdh003',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/003/bsdh003.html",
                        controller: 'BsdtCtrl'
                    }
                }
            })
    })
    //办税地图
    .controller('BsdtCtrl', function (AppInfo,AjaxPost,Loading,$ionicPopover,$scope,$rootScope,$ionicNavBarDelegate) {
        $rootScope.hideTabs='tabs-item-hide';
        var curCity;
        var curPonit;
        var map;
        var myGeo;
        var cityTypes = {
             "南京市":"NJ",
             "无锡市":"WX",
             "徐州市":"XZ",
             "常州市":"CZ",
             "苏州市":"SZ",
             "南通市":"NT",
             "连云港市":"LYG",
            "淮安市" :"HA",
            "盐城市" :"YC",
             "扬州市":"YZ",
             "镇江市":"ZJ",
             "泰州市":"TZ",
             "宿迁市":"SQ"
        };

        if (device.platform == "iOS") {
            navigator.geolocation.getCurrentPosition(function(position) {
                curPonit = new BMap.Point(position.coords.longitude, position.coords.latitude);
                myGeo = new BMap.Geocoder();
                myGeo.getLocation(curPonit, function(rs) {
                    curCity = rs.addressComponents.city;
                    $scope.csdw(curPonit, curCity);
                });
            }, function(error) {
                Loading.commonAlert(error.message);
            });
        } else {
            gov.jslt.app.plugin.location.getLocationInfo(function(result) {
                if (result.code == "0") {
                    curPonit = new BMap.Point(result.data.lontitude, result.data.latitude);
                    myGeo = new BMap.Geocoder();
                    myGeo.getLocation(curPonit, function(rs) {
                        curCity = rs.addressComponents.city;
                        $scope.csdw(curPonit, curCity);
                    });
                } else {
                    Loading.commonAlert(result.msg);
                }
            });
        }
        $ionicPopover.fromTemplateUrl("ez-popover.html", {
            scope: $scope
        })
            .then(function(popover){
                $scope.popover = popover;
            })
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        $scope.csqh=function(csdm,csmc){
            if(csmc==curCity){
                $scope.csdw(curPonit, curCity);
            }else{
                myGeo = new BMap.Geocoder();
                myGeo.getPoint(csmc, function(point) {
                    $scope.csdw(point,csmc);
                });
            }
        };
       // $scope.csqh('NJ','南京市');
        $scope.csdw=function(point,city){
            map = new BMap.Map("allmap");
            map.centerAndZoom(point,12);
            map.setCurrentCity(city);
            map.enableScrollWheelZoom(true);
            // 添加带有定位的导航控件
            var navigationControl = new BMap.NavigationControl({
                // 靠左上角位置
                anchor : BMAP_ANCHOR_BOTTOM_LEFT,
                // LARGE类型
                type : BMAP_NAVIGATION_CONTROL_LARGE,
                // 启用显示定位
                enableGeolocation : true
            });
            map.addControl(navigationControl);
                if (point.equals(curPonit)) {
                    var marker = new BMap.Marker(point);
                    // 创建信息窗口对象
                    marker.setLabel(new BMap.Label("我"));
                    map.addOverlay(marker);
                    marker.addEventListener("click", function() {
                        this.openInfoWindow(new BMap.InfoWindow("当前位置"));
                    });
                }
            $scope.swjzb(cityTypes[city]);
//                bscxSearch($("#bsdh003_csqh_content").val(), $("#bsdh003_csqh_content").find("option:selected").text());
        };
       //$scope.csdw('NJ','南京市');
        $scope.swjzb=function(csdm){
            var data={
                DS_DM : csdm
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Bsdh003BLH",
                    data : {
                        DS_DM : csdm
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "queryContent"
                })
            };
            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
            Loading.loadingShow(cnt);
            AjaxPost.getData(reqDatas)
                .then(function(responseText, textStatus,
                               XMLHttpRequest) {
                    Loading.loadingHide();
                    var response = Decrypt(responseText.toString(),my);
//                    alert(response);
                    var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                    if(checkResponse(responseTex)) {
//                        alert(JSON.stringify(responseText.data));
                        for (var i = 0; i < responseTex.data.bsdtList.length; i++){
                             var obj = responseTex.data.bsdtList[i];
                            myGeo.getPoint(obj.BSDZ, function (point) {
                            if (point) {
                                var marker = new BMap.Marker(point);
                                marker.addEventListener("click", function (e) {
                                    var p = e.target;
                                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                                    var searchInfoWindow = new BMapLib.SearchInfoWindow(map, "地址:" + obj.BSDZ + "<br/>电话:" + obj.BSDH + "<br/>邮编:" + obj.BSYB, {
                                        title: obj.BSFWTMC, //标题
                                        width: 200, //宽度
                                        height: 60, //高度
                                        panel: "panel", //检索结果面板
                                        enableAutoPan: true //自动平移
                                    });
                                    searchInfoWindow.open(marker);
                                });
                                map.addOverlay(marker);
                            }
                        }, obj.DS_MC);
                    }

                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeSJMXModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
        };

    })

