/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('bsdh004.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //办税厅工作状态
            .state('tab.bsdh004', {
                url: '/bsdh004',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/004/bsdh004.html",
                        controller: 'BstgzztCtrl'
                    }
                }
            })
    })
    //办税厅工作状态
    .controller('BstgzztCtrl', function(AppInfo,$ionicScrollDelegate,$ionicPopup,AjaxPost,$scope,$rootScope,$stateParams,$timeout,$ionicPopover,LocCache,$ionicActionSheet,$ionicModal,AppConfig,Loading,$ionicNavBarDelegate) {
        var bsdh004_areaInfo = $.evalJSON(localStorage.getItem(appStorageName.curArea));
        var bsdh004_curCity = bsdh004_areaInfo.DS_SWDM;
        var bsdh004_myMuids = [];
//        if(!LocCache.load('bsdh004_muids')){
//            LocCache.save('bsdh004_muids',bsdh004_myMuids);
//        }else{
//            bsdh004_myMuids = LocCache.load('bsdh004_muids');
//        }

        $rootScope.hideTabs='tabs-item-hide';
        $scope.showloading=false;

        //$scope.sc='收藏';
        $scope.shoucang = function(item){
            var flag=0;
            if( item.sc=='收藏'){
                for(var i=0;i<bsdh004_myMuids.length;i++){
                    if(item.muid==bsdh004_myMuids[i].muid){
                        flag=1;
                    }
                }
                if(flag==1){
                    $ionicPopup.alert({
                        title: "提示",
                        template: '请不要重复收藏!'
                    })
                        .then(function(res) {

                        });
                }else{
                    item.sc='取消收藏';
                    bsdh004_myMuids.push(item);
                    LocCache.save('bsdh004_muids',bsdh004_myMuids);
                }
                return;
            }
            if( item.sc=='取消收藏'){
                var isExist = bsdh004_myMuids.indexOf(item);
                if(isExist>=0){
                    item.sc='收藏';
                    bsdh004_myMuids.splice(isExist,1);
                    if(bsdh004_myMuids.length==0){
                        LocCache.clearOneKey('bsdh004_muids');
                    }else{
                        LocCache.save('bsdh004_muids',bsdh004_myMuids);
                    }

                }
                return;
            }
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

        $ionicModal.fromTemplateUrl("gdxx.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openGDXXModal = function() {
            $scope.modal1.show();
        };
        $scope.openGDXX = function(muI) {
            var data={
                muid:muI
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Bsdh004BLH",
                    data : {
                        muid:muI
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "queryMxxx"
                })
            };
            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
                Loading.loadingShow(cnt);
                AjaxPost.getData(reqDatas)
                    .then(function(responseText, textStatus,
                                   XMLHttpRequest) {
                        Loading.loadingHide();
                        var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                        var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                        if(checkResponse(responseTex)){
                            $scope.gdxxList = responseTex.data.datamxList;
                           // console.log(JSON.stringify(responseText));
                        }
                    }, function(jqXHR, textStatus, errorThrown) {
                        Loading.loadingHide();
                        Loading.commonAlert(textStatus);
                    })
        };
        $scope.closeGDXXModal = function() {
            $scope.modal1.hide();
        };

        $scope.show = function() {

            // Show the action sheet
            var hideSheet= $ionicActionSheet.show({
                cancelOnStateChange:true,
                cssClass:'action_s',
                //titleText: "操作当前文章",
                buttons: [
                    { text: "显示全部" },
                    { text: "显示收藏" },
                    { text: "清空收藏" }
                ],
                buttonClicked: function(index) {
                    if(index==0){
                        $scope.dqgztList(bsdh004_curCity);
                    }
                    if(index==1){
                        if(!LocCache.load('bsdh004_muids')){
                            $ionicPopup.alert({
                                title: "提示",
                                template: '没有收藏信息,即将显示全部...'
                            })
                                .then(function(res) {
                                    $scope.dqgztList(bsdh004_curCity);
                                });
                        }else{
                            bsdh004_myMuids=[];
                            bsdh004_myMuids = LocCache.load('bsdh004_muids');
                            $scope.cityList=bsdh004_myMuids;
                            $ionicScrollDelegate.scrollTop();
                        }
                    }
                    if(index==2){
                        if(!LocCache.load('bsdh004_muids')){
                            $ionicPopup.alert({
                                title: "提示",
                                template: '收藏夹已清空！'
                            })
                                .then(function(res) {

                                });
                        }else {
                            $ionicPopup.confirm({
                                title: '提示',
                                content: '将要清空所有收藏的地税局，是否继续?',
                                cancelText: '取消',
                                okText: '确认'
                            }).then(function (res) {
                                if (res) {
                                    LocCache.clearOneKey('bsdh004_muids');
                                    bsdh004_myMuids=[];
                                    //$scope.cityList=bsdh004_myMuids;
                                } else {

                                }
                            });
                        }

                    }
                    return true;
                },
                cancel: function() {
                    // add cancel code..
                    return true;
                }
            });

        };
        $scope.dqgztList=function(cityId){
            bsdh004_curCity = cityId ;
            var data={
                id:cityId
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Bsdh004BLH",
                    data : {
                        id:cityId
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "queryData"
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
                        var CityList = responseTex.data.datamxList;
                        for(var i=0;i<CityList.length;i++){
                            CityList[i].sc="收藏";
                        }
                        $scope.cityList=CityList;
                        // console.log(JSON.stringify(responseText));
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
//            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner></div>';
//            Loading.loadingShow(cnt);
//            $.ajax({
//                url : AppConfig.appServer_Url,
//                async : true,
//                dataType : "jsonP",
//                data : {
//                    jsonData : $.toJSON({
//                        blhName : "Bsdh004BLH",
//                        data : {
//                            id:cityId
//                        },
//                        handleCode : "queryData"
//                    })
//                },
//                type : 'post',
//                timeout : AppConfig.appServer_TimeOut,
//                success : function(responseText, textStatus, XMLHttpRequest) {
//                    Loading.loadingHide();
//                    // alert(JSON.stringify(responseText));
//                    $scope.cityList=responseText.data.datamxList;
//                    //console.log($scope.cityList[0].muid);
//                    //alert(responseText.data.datamxList[0].muname);
//                },
//                error : function(jqXHR, textStatus, errorThrown) {
//                    Loading.loadingHide();
//                    alert(JSON.stringify(jqXHR)+""+textStatus+""+errorThrown);
//                }
//            });
        }
        $scope.dqgztList(bsdh004_curCity);
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
        };
//        $scope.doRefresh=function(){
//            var timer = $timeout(  function() {
//              $scope.$broadcast('scroll.refreshComplete');
//            },  2000 );
//        };
//        $scope.loadMore=function(){
//            var timer = $timeout(  function() {
//                $scope.$broadcast('scroll.infiniteScrollComplete');
//            },  2000 );
//        };
    })
