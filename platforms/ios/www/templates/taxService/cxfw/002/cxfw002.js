/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('cxfw002.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //我的税收
            .state('tab.cxfw002', {
                url: '/cxfw002',
                views: {
                    'taxService': {
                        templateUrl: 'templates/taxService/cxfw/002/cxfw002.html',
                        controller: 'WdssCtrl'
                    }
                }
            });
    })
    //我的税收
    .controller('WdssCtrl',function(AppInfo,AjaxPost,$scope,$ionicModal,Loading,AppConfig,$ionicNavBarDelegate,$rootScope){
        $rootScope.hideTabs='tabs-item-hide';
        var userInfo = findUserByLocal();
        $scope.skcx={
            gsnf:'',
            ccsnf:'',
            qsnf:''
        };
        $scope.yhxm=userInfo.XM;

        $ionicModal.fromTemplateUrl("gs.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openGSModal = function() {
            $scope.modal1.show();
        };
        $scope.closeGSModal = function() {
            $scope.modal1.hide();
        };
        $ionicModal.fromTemplateUrl("ccs.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
        $scope.openCCSModal = function() {
            $scope.modal2.show();
        };
        $scope.closeCCSModal = function() {
            $scope.modal2.hide();
        };
        $ionicModal.fromTemplateUrl("qs.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal3 = modal;
        });
        $scope.openQSModal = function() {
            $scope.modal3.show();
        };
        $scope.closeQSModal = function() {
            $scope.modal3.hide();
        };

        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
            $scope.modal1.remove();
            $scope.modal2.remove();
            $scope.modal3.remove();

        };
        $scope.gscx = function(){
            var data={
                nf : $scope.skcx.gsnf,
                sfzlxdm : userInfo.SFZMLX_DM,
                sfzhm : userInfo.SFZHM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw002BLH",
                    yhwybz : AppInfo.getUUID().toString(),
                    sjHm : userInfo.SJHM,
                    passWord : userInfo.LOGPASS,
                    data : {
                        nf : $scope.skcx.gsnf,
                        sfzlxdm : userInfo.SFZMLX_DM,
                        sfzhm : userInfo.SFZHM
                    },
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "gsxxcx"
                })
            };
            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
            Loading.loadingShow(cnt);
            AjaxPost.getData(reqDatas)
                .then(function(responseText, textStatus,
                               XMLHttpRequest) {
                    Loading.loadingHide();
                    var response = Decrypt(responseText.toString(),my);
                    var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                    if(checkResponse(responseTex)){
                        $scope.gsList = responseTex.data.gsxxList;
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                });
        };
        $scope.ccscx = function(){
            var data={
                cxnf : $scope.skcx.ccsnf,
                sfzlxdm : userInfo.SFZMLX_DM,
                sfzhm : userInfo.SFZHM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw002BLH",
                    sjHm : userInfo.SJHM,
                    xm : userInfo.XM,
                    passWord : userInfo.LOGPASS,
                    data : data,
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "ccsxxcx"
                })
            };
            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
            Loading.loadingShow(cnt);
            AjaxPost.getData(reqDatas)
                .then(function(responseText, textStatus,
                               XMLHttpRequest) {
                    Loading.loadingHide();
                    var response = Decrypt(responseText.toString(),my);
                    var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                    if(checkResponse(responseTex)){
                        $scope.ccsList = responseTex.data.ccsList;
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                });
        };
        $scope.qscx = function(){
            var data={
                cxnf : $scope.skcx.qsnf,
                sfzlxdm : userInfo.SFZMLX_DM,
                sfzhm : userInfo.SFZHM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw002BLH",
                    sjHm : userInfo.SJHM,
                    xm : userInfo.XM,
                    passWord : userInfo.LOGPASS,
                    data :data,
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "qsxxcx"
                })
            };
            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
            Loading.loadingShow(cnt);
            AjaxPost.getData(reqDatas)
                .then(function(responseText, textStatus,
                               XMLHttpRequest) {
                    Loading.loadingHide();
                    var response = Decrypt(responseText.toString(),my);
                    var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                    if(checkResponse(responseTex)){
                        $scope.qsList = responseTex.data.qsList;
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                });
        };
    });
