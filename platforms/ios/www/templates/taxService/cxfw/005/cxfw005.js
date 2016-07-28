/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('cxfw005.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //纳税信用查询
            .state('tab.cxfw005', {
                url: '/cxfw005',
                views: {
                    'taxService': {
                        templateUrl: 'templates/taxService/cxfw/005/cxfw005.html',
                        controller: 'NsxycxCtrl'
                    }
                }
            })
    })
    //纳税信用查询
    .controller('NsxycxCtrl',function(AppInfo,$ionicActionSheet,$timeout,Loading,AjaxPost,$rootScope,$ionicNavBarDelegate,$scope,$ionicModal,AppConfig){
        $rootScope.hideTabs='tabs-item-hide';
        //取得缓存的首选企业
        var cfw005_QyxxVO = findSxQyByLocal();
        if(cfw005_QyxxVO!=null){
            cfw005_QyxxVO.MC = converLongName(cfw005_QyxxVO.MC);
        }else{
            cfw005_QyxxVO = {};
            cfw005_QyxxVO.MC = '没有企业信息' ;
        }
        $scope.dqqy = cfw005_QyxxVO;
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
                    cfw005_QyxxVO = qyxxList[index] ;
                    cfw005_QyxxVO.MC = converLongName(cfw005_QyxxVO.MC);
                    $scope.dqqy = cfw005_QyxxVO;
                    return true;
                }
            });
            $timeout(function() {
                hideSheet();
            }, 3000);
        }
//        var cfw005_QyxxVO = findSxQyByLocal();
//        $scope.dqqy =cfw005_QyxxVO.MC;
        $scope.nsxycx={
            ssnd:''
        };
        $ionicModal.fromTemplateUrl("nsxypjjg.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openPJJGModal = function() {
            $scope.modal1.show();
        };
        $scope.closePJJGModal = function() {
            $scope.modal1.hide();
        };

        $scope.nsxycx=function(){
            var data={
                swglm : $scope.dqqy.SWGLM,
                ssnd :  $scope.nsxycx.ssnd
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Cxfw005BLH",
                    data : {
                        swglm : $scope.dqqy.SWGLM,
                        ssnd :  $scope.nsxycx.ssnd
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "nsxypj"
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
                        //alert(JSON.stringify(responseText));
                        if(typeof(responseTex.data.nsr_mc) == "undefined"){
                            Loading.commonAlert('企业该年度纳税信用评价不存在',null,null);
                            $scope.closePJJGModal();
                        }else {
                            $scope.pjjg = responseTex.data;
                        }
                        // console.log(JSON.stringify(responseText));
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closePJJGModal();
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