/**
 * Created by Administrator on 2016/3/30.
 */
angular.module('bsdh001.controllers',[])
    .config(function($stateProvider) {
        $stateProvider
            //办税日历
            .state('tab.bsdh001', {
                url: '/bsdh001',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/001/bsdh001.html",
                        controller: 'BsrlCtrl'
                    }
                }
            })
    })

//办税日历
    .controller('BsrlCtrl', function (AppInfo,$rootScope,$ionicModal,$scope,$ionicNavBarDelegate,$ionicPopover,Loading,AjaxPost,$ionicScrollDelegate) {
        $rootScope.hideTabs='tabs-item-hide';
        var areaInfo = $.evalJSON(localStorage.getItem(appStorageName.curArea));
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
        $scope.disyf=[];
        for(var i=0;i<12;i++){
            $scope.disyf.push(false);
        };
        $scope.ionfx=[];
        for(var i=0;i<12;i++){
            $scope.ionfx.push('ion-android-arrow-dropright-circle');
        };
        $scope.display=function(i,obj){
            $scope.disyf[i]=!$scope.disyf[i];
            if($scope.ionfx[i]=='ion-android-arrow-dropdown-circle'){
                $scope.ionfx[i]='ion-android-arrow-dropright-circle';
            }else{
                $scope.ionfx[i]='ion-android-arrow-dropdown-circle';
            }
            $ionicScrollDelegate.resize();
        };
        $scope.play=[];
        for(var i=0;i<15;i++){
            $scope.play.push(false);
        }
        $scope.showplay=function(id){
            for(var i= 0;i<$scope.play.length;i++){
                $scope.play[i]=false;
            }
            $scope.play[id]=true;
        };

        $ionicModal.fromTemplateUrl("bsrlmx.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });

        $scope.openSJMXModal = function() {
            $scope.modal1.show();
        };
        $scope.closeSJMXModal = function() {
            $scope.modal1.hide();
        };
        $scope.sqList = function (city) {
            switch(city) {
                case "23201":
                    $scope.showplay(0);
                    break;
                case "23202":
                    $scope.showplay(1);
                    break;
                case "23203":
                    $scope.showplay(2);
                    break;
                case "23204":
                    $scope.showplay(3);
                    break;
                case "23205":
                    $scope.showplay(4);
                    break;
                case "23206":
                    $scope.showplay(5);
                    break;
                case "23207":
                    $scope.showplay(6);
                    break;
                case "23208":
                    $scope.showplay(7);
                    break;
                case "23209":
                    $scope.showplay(8);
                    break;
                case "23210":
                    $scope.showplay(9);
                    break;
                case "23211":
                    $scope.showplay(10);
                    break;
                case "23212":
                    $scope.showplay(11);
                    break;
                case "23213":
                    $scope.showplay(12);
                    break;
                case "23217":
                    $scope.showplay(13);
                    break;
                case "23216":
                    $scope.showplay(14);
                    break;
                default :
                    toast("未找到地区信息");
            }
        }
        $scope.sqList(areaInfo.DS_SWDM);
        $scope.bsrlmx = function(id,mc){
            $ionicScrollDelegate.scrollTop();
            var bsrlmxList = [];
            $scope.titt=mc + new Date().getFullYear();
            for(var i=1;i<13;i++){
                $("#bsrlmx_"+i).empty();
                $scope.disyf[i-1]=false;
                $scope.ionfx[i-1]='ion-android-arrow-dropright-circle';
            };
            var data={
                dsqx_dm : id
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Bsdh001BLH",
                    data : {
                        dsqx_dm : id
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "queryBsrl"
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
                        bsrlmxList = responseTex.data.bsrlList;
                        for(var i=0;i<bsrlmxList.length;i++){
                            $("#bsrlmx_"+bsrlmxList[i].yf).append("<span class='calm' style='font-weight:bold;'>申报期:</span>"+
                                bsrlmxList[i].sbq+"<br><span class='calm' style='font-weight:bold;'>申报税费种类:</span>"+
                                bsrlmxList[i].nr+"<br><br>");
//
                        };
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeSJMXModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
//            $("#bssjmx_1").empty();
//
//            $("#bssjmx_1").append("A");
           // console.log($("#bssjmx_1").html());
        };
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
            $scope.modal1.remove();
        };
    })