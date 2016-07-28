/**
 * Created by Administrator on 2016/4/5.
 */
angular.module('bsdh006.controllers',[])
    .config(function($stateProvider) {
        $stateProvider
            //税种税率
            .state('tab.bsdh006', {
                url: '/bsdh006',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/006/bsdh006.html",
                        controller: 'SzslCtrl'
                    }
                }
            })
    })
    //税种税率
    .controller('SzslCtrl', function (AppInfo,AjaxPost,Loading,$scope,$ionicNavBarDelegate,$rootScope,$ionicPopover,$ionicModal) {
        $rootScope.hideTabs='tabs-item-hide';
        var areaInfo = $.evalJSON(localStorage.getItem(appStorageName.curArea));
        $scope.tax4=true;
        $scope.tax10=true;
        $scope.tax11=true;
        $scope.tax12=true;
        var dqds='NJ';
        var cityTypes = {
            "NJ": "南京市",
            "WX": "无锡市",
            "XZ": "徐州市",
            "CZ": "常州市",
            "SZ": "苏州市",
            "NT": "南通市",
            "LYG": "连云港市",
            "HA": "淮安市",
            "YC": "盐城市",
            "YZ": "扬州市",
            "ZJ": "镇江市",
            "TZ": "泰州市",
            "SQ": "宿迁市",
            "SZYQ": "苏州园区",
            "BSQ": "张家港保税区",
            "SZSQ": "省直属局"
        };

        var taxTypes = {
            "taxType1" : "营业税",
            "taxType2" : "企业所得税",
            "taxType3" : "个人所得税",
            "taxType4" : "资源税",
            "taxType5" : "土地使用税",
            "taxType6" : "维护建设税",
            "taxType7" : "印花税",
            "taxType8" : "土地增值税",
            "taxType9" : "房产税",
            "taxType10" : "车船税",
            "taxType11" : "契  税",
            "taxType12" : "耕地占用税"
        };

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
        $ionicModal.fromTemplateUrl("szslmx.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });

        $scope.openSLMXModal = function() {
            $scope.modal1.show();
        };
        $scope.closeSLMXModal = function() {
            $scope.modal1.hide();
        };
        $scope.szmx=function(city){
            $scope.tax4=true;
            $scope.tax10=true;
            $scope.tax11=true;
            $scope.tax12=true;
            switch(city) {
                case 'SZYQ':
                    $scope.tax4=false;
                    break;
                case 'BSQ':
                    $scope.tax4=false;
                    $scope.tax10=false;
                    break;
                case 'SZSQ':
                    $scope.tax4=false;
                    $scope.tax11=false;
                    $scope.tax12=false;
                    break;
            }
            dqds=city;
        };
        $scope.szmx(dqds);
        $scope.szslmx=function(taxid){
            $("#contentDiv").empty();
            var taxTypeId = dqds + "_"+ taxid;
            $scope.titt=cityTypes[dqds] + taxTypes[taxid];
            var data={
                id : taxTypeId
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Bsdh006BLH",
                    data : {
                        id : taxTypeId
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
                    if(checkResponse(responseTex)){
                        $("#contentDiv").append(responseTex.data.content);
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeSLMXModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        }
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
            $scope.modal1.remove();
        };
    })