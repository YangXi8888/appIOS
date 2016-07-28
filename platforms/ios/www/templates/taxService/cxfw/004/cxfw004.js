/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('cxfw004.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //社保费查询
            .state('tab.cxfw004', {
                url: '/cxfw004',
                views: {
                    'taxService': {
                        templateUrl: 'templates/taxService/cxfw/004/cxfw004.html',
                        controller: 'SbfcxCtrl'
                    }
                }
            })
    })
    //社保费查询
    .controller('SbfcxCtrl',function(AppInfo,$ionicActionSheet,$timeout,AjaxPost,$ionicNavBarDelegate,$rootScope,$scope,$ionicModal,Loading){
        $rootScope.hideTabs='tabs-item-hide';
        //取得缓存的首选企业
        var cfw004_QyxxVO = findSxQyByLocal();
        if(cfw004_QyxxVO!=null){
            cfw004_QyxxVO.MC = converLongName(cfw004_QyxxVO.MC);
        }else{
            cfw004_QyxxVO = {};
            cfw004_QyxxVO.MC = '没有企业信息' ;
        }
        $scope.dqqy = cfw004_QyxxVO;
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
                    cfw004_QyxxVO = qyxxList[index] ;
                    cfw004_QyxxVO.MC = converLongName(cfw004_QyxxVO.MC);
                    $scope.dqqy = cfw004_QyxxVO;
                    return true;
                }
            });
            $timeout(function() {
                hideSheet();
            }, 3000);
        }
//        var cfw004_QyxxVO = findSxQyByLocal();
//        $scope.dqqy =cfw004_QyxxVO.MC;
        $scope.sbfjn={
            ssqq:'',
            ssqz:''
        };
        $ionicModal.fromTemplateUrl("sbfjbxx.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openJBXXModal = function() {
            $scope.modal1.show();
        };
        $scope.closeJBXXModal = function() {
            $scope.modal1.hide();
        };
        $ionicModal.fromTemplateUrl("sbfjnqk.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
        $scope.openJNQKModal = function() {
            $scope.modal2.show();
        };
        $scope.closeJNQKModal = function() {
            $scope.modal2.hide();
        };
        $scope.sbjbxx=function(){
            var data={
                swglm : $scope.dqqy.SWGLM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw004BLH",
                    data : {
                        swglm : $scope.dqqy.SWGLM
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "sbfyzxx"
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
                    //alert(JSON.stringify(responseText));
                    if(checkResponse(responseTex)){
                        $scope.jbxxList = responseTex.data.yzxxList;
                        // console.log(JSON.stringify(responseText));
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeJBXXModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.formatDate = function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        };
        $scope.sbjnqk=function(){
            var data={
                swglm : $scope.dqqy.SWGLM,
                ssqs : $scope.formatDate($scope.sbfjn.ssqq),
                ssqz : $scope.formatDate($scope.sbfjn.ssqz)
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw004BLH",
                    data : {
                        swglm : $scope.dqqy.SWGLM,
                        ssqs : $scope.formatDate($scope.sbfjn.ssqq),
                        ssqz : $scope.formatDate($scope.sbfjn.ssqz)
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "sbfjnxx"
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
                       // alert(JSON.stringify(responseText));
                        $scope.jnqkList = responseTex.data.jnxxList;
                        // console.log(JSON.stringify(responseText));
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
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
            $scope.modal2.remove();
        };
    })