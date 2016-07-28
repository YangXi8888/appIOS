/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('cxfw003.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //发票验证
            .state('tab.cxfw003', {
                url: '/cxfw003',
                views: {
                    'taxService': {
                        templateUrl: 'templates/taxService/cxfw/003/cxfw003.html',
                        controller: 'FpyzCtrl'
                    }
                }
            })
    })
    //发票验证
    .controller('FpyzCtrl',function(AppInfo,Loading,AjaxPost,$scope,$rootScope,$ionicNavBarDelegate,$ionicModal){
        $rootScope.hideTabs='tabs-item-hide';
        $ionicModal.fromTemplateUrl("yzjg.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openYZJGModal = function() {
            $scope.modal1.show();
        };
        $scope.closeYZJGModal = function() {
            $scope.modal1.hide();
        };
        $scope.fpyz={
            fpdm:'',
            fphm:''
        };
        $scope.clear=function(){
            $scope.fpyz.fpdm='';
            $scope.fpyz.fphm='';
        };
        $scope.codeScan = function () {
            cordova.plugins.barcodeScanner.scan(function(result) {
                var barCode = result.text;
                if(result.text==null || result.text==""){
//                    toast("未能识别");
                    return ;
                }else{
                    $scope.openYZJGModal();
                    $scope.smyz(barCode);
                }
            }, function(error) {
               // toast("扫描出错,请重试");
            });
        };
        $scope.sgsryz=function(){
            var data={
                param1 : "",
                param2 : $scope.fpyz.fpdm.toString(),
                param3 : $scope.fpyz.fphm.toString()
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw003BLH",
                    data : {
                        param1 : "",
                        param2 : $scope.fpyz.fpdm.toString(),
                        param3 : $scope.fpyz.fphm.toString()
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "fpcx"
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
                        if(typeof(responseTex.data.kprq) == "undefined"){
                            Loading.commonAlert('发票信息不存在',null,null);
                            $scope.closeYZJGModal();
                        }else{
                            $scope.yzjg = responseTex.data;
                        }
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.smyz=function(Code){
            var data={
                param1 : Code,
                param2 : "",
                param3 : ""
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw003BLH",
                    data : {
                        param1 : Code,
                        param2 : "",
                        param3 : ""
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "fpcx"
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
                        if(typeof(responseTex.data.kprq) == "undefined"){
                            Loading.commonAlert('发票信息不存在',null,null);
                            $scope.closeYZJGModal();
                        }else{
                            $scope.yzjg = responseTex.data;
                        }
                        // console.log(JSON.stringify(responseText));
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
            $scope.modal1.remove();
        };
    })