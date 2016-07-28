/**
 * Created by Administrator on 2016/4/5.
 */
angular.module('bsdh008.controllers',[])
    .config(function($stateProvider) {
        $stateProvider
            //办税指南
            .state('tab.bsdh008', {
                url: '/bsdh008',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/008/bsdh008.html",
                        controller: 'BsznCtrl'
                    }
                }
            })
            //办税指南_01
            .state('tab.bsdh_bszn01', {
                url: '/bsdh_bszn01?address',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/008/bsdh008_1.html",
                        controller: 'BsznCtrl01'
                    }
                }
            })
    })
    //办税指南
    .controller('BsznCtrl', function ($state,$scope,$ionicNavBarDelegate,$rootScope) {
        $rootScope.hideTabs='tabs-item-hide';
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
        };
        $scope.queryTitle=function(address){
            $state.go('tab.bsdh_bszn01',{'address':address});
        };
    })
    //办税指南_01
    .controller('BsznCtrl01', function (AppInfo,$timeout,$ionicModal,AjaxPost,Loading,$scope,$ionicNavBarDelegate,$stateParams,$rootScope) {
        $rootScope.hideTabs='tabs-item-hide';
        $scope.showloading = false;
        $scope.nextPage = false;
        $scope.infiniteIcon = false;
        var run=false;//方法锁
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
            $scope.modal1.remove();
        };
        $ionicModal.fromTemplateUrl("bsznmx.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });

        $scope.openBSZNMXModal = function() {
            $scope.modal1.show();
        };
        $scope.closeBSZNMXModal = function() {
            $scope.modal1.hide();
        };

        $scope.queryTitle = function(){
            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
            Loading.loadingShow(cnt);
            $scope.szslmx(1);
        };
        $scope.urlList=[];
        var address=$stateParams.address;
        $scope.szslmx=function(Page){
            if(!run) {
                run = true;
                $scope.nextPage = false;
                var data={
                    colname: address,
                    CurrentPage: Page.toString()
                };
                var my = AppInfo.getUUID();
                var reqDatas = {
                    jsonData: angular.toJson({
                        blhName: "Bsdh008BLH",
                        data: {
                            colname: address,
                            CurrentPage: Page.toString()
                        },
                        yhwybz : AppInfo.getUUID().toString(),
                        bizDataMw : formatStr(data.toString(),my),
                        handleCode: "queryTitle"
                    })
                };

                AjaxPost.getData(reqDatas)
                    .then(function (responseText, textStatus, XMLHttpRequest) {
                        Loading.loadingHide();
                        var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                        var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                        if (checkResponse(responseTex)) {
                            if (responseTex.data.urlList.length == 0) {
                                $scope.nextPage = false;
                                $scope.infiniteIcon = false;
                                Loading.loadingTimoutHide("已经是最后一页");
                            } else {
                                $scope.showloading = false;
                                var urllist = responseTex.data.urlList;
                                for(var i=0;i<urllist.length;i++){
                                    if(urllist.length%2==1){
                                        if(Page%2==1){
                                            if(i%2==1) {
                                                urllist[i].backcolor = 'beige';
                                            }
                                        }else{
                                            if(i%2==0) {
                                                urllist[i].backcolor = 'beige';
                                            }
                                        }
                                    }else{
                                        if(i%2==1) {
                                            urllist[i].backcolor = 'beige';
                                        }
                                    }
                                }
                                $scope.urlList = $scope.urlList.concat(urllist);
                                $scope.infiniteIcon = false;
                                $scope.nextPage = true;
                            }
                            run=false;
                        } else {
                            Loading.commonAlert(responseTex.msg, null, null);
                            $scope.back();
                        }
                    }, function (jqXHR, textStatus, errorThrown) {
                        Loading.loadingHide();
                        Loading.commonAlert(textStatus);
                    })
            }
        }
        $scope.queryContent=function(href){
            $("#contentDiv").empty();
            var data={
                url : href
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Bsdh008BLH",
                    data : {
                        url : href
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
//                        alert(JSON.stringify(responseText.data));
                        $scope.titt=responseTex.data.title;
                        $scope.fbsj=responseTex.data.fbsj;
                        $("#contentDiv").append(responseTex.data.content);
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeSJMXModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        //上拉更新
        var index = 2;
        $scope.loadInfinite = function(){
            $scope.infiniteIcon = true;
            $scope.szslmx(index);
            index++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.queryTitle();
        //下拉更新
        $scope.loadRefresh = function(){
            index = 2;
            $scope.infiniteIcon = false;
            $scope.urlList=[];
            $scope.szslmx(1);
            $scope.$broadcast('scroll.refreshComplete');
        };
//        $scope.$on('$stateChangeSuccess', function() {
//            $scope.loadMore();
//        });
        $scope.doRefresh=function(){
            $scope.$broadcast('scroll.refreshComplete');
        };
    })

