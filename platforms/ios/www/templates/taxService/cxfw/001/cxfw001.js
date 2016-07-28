/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('cxfw001.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //企业信息查询
            .state('tab.cxfw001', {
                url: '/cxfw001',
                views: {
                    'taxService': {
                        templateUrl: 'templates/taxService/cxfw/001/cxfw001.html',
                        controller: 'QyxxcxCtrl'
                    }
                }
            })
    })
    //企业信息查询
    .controller('QyxxcxCtrl',function(AppInfo,$timeout,AjaxPost,$scope,$ionicActionSheet,$ionicModal,Loading,AppConfig,$rootScope,$ionicNavBarDelegate){
        $rootScope.hideTabs='tabs-item-hide';
        //取得缓存的首选企业
        var cfw001_QyxxVO = findSxQyByLocal();
        if(cfw001_QyxxVO!=null){
            cfw001_QyxxVO.MC = converLongName(cfw001_QyxxVO.MC);
        }else{
            cfw001_QyxxVO = {};
            cfw001_QyxxVO.MC = '没有企业信息' ;
        }
        $scope.dqqy = cfw001_QyxxVO;
        var qyxxListButtons = [];
        var qyxxList = findAllQyByLocal()==null?[]:findAllQyByLocal();
        for(var i=0;i<qyxxList.length;i++){
            qyxxListButtons.push({text:qyxxList[i].MC});
        }
        $scope.exchangeQy = function(){
            if(qyxxListButtons.length ==0){
                Loading.loadingTimoutHide('没有企业信息');
                return ;
            }
            var hideSheet = $ionicActionSheet.show({
                titleText : '切换企业',
                buttons : qyxxListButtons,
                buttonClicked : function(index){
                    cfw001_QyxxVO = qyxxList[index] ;
                    cfw001_QyxxVO.MC = converLongName(cfw001_QyxxVO.MC);
                    $scope.dqqy = cfw001_QyxxVO;
                    return true;
                }
            });
            $timeout(function() {
                hideSheet();
            }, 3000);
        }

//        $scope.dqqy = cfw001_QyxxVO.MC;
        $ionicModal.fromTemplateUrl("jd.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openJDModal = function() {
            $scope.modal1.show();
        };
        $scope.closeJDModal = function() {
            $scope.modal1.hide();
        };
        $ionicModal.fromTemplateUrl("dj.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
        $scope.openDJModal = function() {
            $scope.modal2.show();
        };
        $scope.closeDJModal = function() {
            $scope.modal2.hide();
        };
        $ionicModal.fromTemplateUrl("bysbqk.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal3 = modal;
        });
        $scope.openBYSBQKModal = function() {
            $scope.modal3.show();
        };
        $scope.closeBYSBQKModal = function() {
            $scope.modal3.hide();
        };
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
            $scope.modal1.remove();
            $scope.modal2.remove();
            $scope.modal3.remove();
        };
        $scope.jdxxcx = function() {
            var data={
                swglm : $scope.dqqy.SWGLM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw001BLH",
                    data : {
                        swglm : $scope.dqqy.SWGLM
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "jdxxcx"
                })
            };
//            alert(formatStr(data.toString(),my));
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
//                        alert(JSON.stringify(responseText));
                        $scope.jdList = responseTex.data.jdxxList;
                        // console.log(JSON.stringify(responseText));
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeJDModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.djxxcx = function() {
            var data={
                swglm : $scope.dqqy.SWGLM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw001BLH",
                    data : {
                        swglm : $scope.dqqy.SWGLM
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "nsrjbxxcx"
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
                        $scope.djList = responseTex.data;
                        // console.log(JSON.stringify(responseText));
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeDJModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.bysbtj = function() {
            var data={
                swglm : $scope.dqqy.SWGLM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw001BLH",
                    data : {
                        swglm : $scope.dqqy.SWGLM
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "ysbxxcx"
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
                        $scope.byysbList = responseTex.data.ysbxxList;
                        $scope.byysbHj=responseTex.data.HJ;
                        // console.log(JSON.stringify(responseText));
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeBYSBQKModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
    })