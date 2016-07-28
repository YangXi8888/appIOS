/**
 * Created by Administrator on 2016/5/24.
 */
angular.module('sqhd008.controllers',[])
    .config(function($stateProvider){
        $stateProvider
        //纳税人学堂
            .state('tab.sqhd_wdnjrz', {
                url: '/sqhd_wdnjrz',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/sqhd/008/sqhd008.html",
                        controller: 'wdnjrzCtrl'
                    }
                }
            })
    })
    .controller('wdnjrzCtrl',function($scope,$rootScope,$ionicNavBarDelegate,Loading,AjaxPost,$state,AppInfo){
       var uuid = AppInfo.getUUID();
        $rootScope.hideTabs='tabs-item-hide';//footer隐藏
        //返回事件和footer显示
        $scope.back =function(){
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
        };
        $scope.rzInfo = {
            sjhm : '',
            zjhm : ''
        };
        $scope.rz = function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">认证中...</div></div>');
            $scope.da = {
                phoneNumber : $scope.rzInfo.sjhm,
                idNumber : $scope.rzInfo.zjhm
            };
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd008BLH",
                    handleCode : "checkUser",
                    data : $scope.da,
                    yhwybz : uuid,
                    bizDataMw : formatStr($scope.da,uuid)
                })
            };
            AjaxPost.getData(reqDatas)
                .then(function(responseText, textStatus,XMLHttpRequest){
                    Loading.loadingHide();
                    var response = Decrypt(responseText.toString(),uuid);
                    var responseTex = JSON.parse(AjaxPost.change(response));
                    if (checkResponse(responseTex)) {
                        Loading.loadingTimoutHide('认证成功');
                    }else{
                        Loading.loadingTimoutHide('认证失败,请用户下载下载我的南京并注册！');
                        $ionicNavBarDelegate.back();
                        $rootScope.hideTabs='';
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        };
    });
