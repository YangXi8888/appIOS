/**
 * Created by Administrator on 2016/4/11.
 */
angular.module('zczn002.controllers',[])
  .config(function($stateProvider){
      $stateProvider
           //涉税信息月报
          .state('tab.zczn_ssxxyb', {
              url: '/zczn_ssxxyb',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/zczn/002/zczn002.html",
                      controller: 'SsxxybCtrl'
                  }
              }
          })
          //具体内容
          .state('tab.zczn_ssxxybContent', {
              url: '/zczn_ssxxybContent/:url',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/zczn/002/zczn002_1.html",
                      controller: 'SsxxybContentCtrl'
                  }
              }
          })
  })
  .controller('SsxxybCtrl',function(AppInfo,$scope,$rootScope,$ionicNavBarDelegate,Loading,$timeout,AjaxPost,$state,$ionicPopover){
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.qhCity = [{id:'23201',name:'南京'},{id:'23202',name:'无锡'},
          {id:'23203',name:'徐州'},{id:'23204',name:'常州'},{id:'23205',name:'苏州市'},{id:'23206',name:'南通'},
          {id:'23207',name:'连云港'},{id:'23208',name:'淮安'},{id:'23209',name:'盐城'},{id:'23210',name:'扬州'},
          {id:'23211',name:'镇江'},{id:'23212',name:'泰州'},{id:'23213',name:'宿迁'},{id:'23217',name:'苏州工业园区'},{id:'23216',name:'张家港保税区'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view class="zxzxPopover">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item" ng-repeat="city in qhCity" ng-click="qhcs(city.id)">{{city.name}}</a></div></ion-content></ion-popover-view>';
      $scope.popover = $ionicPopover.fromTemplate(template,{
          scope: $scope
      });
      $scope.openSsxxybPopover = function($event){
         $scope.popover.show($event);
      };
      $scope.closeSsxxybPopover = function(){
          $scope.popover.hide();
      };

      $scope.curArea = $.evalJSON(localStorage.getItem(appStorageName.curArea)).DS_SWDM;//默认地区
      $timeout(function(){
          $scope.queryTitle($scope.curArea);
      },300);

      //加载列表
      $scope.showloading = false;//页面内容展示与隐藏
      $scope.queryTitle = function(city){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          if(city == null || city == ""){
              city = "23298";
          }
          var data={
              colname : city
          };
          var my = AppInfo.getUUID();
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Zczn002BLH",
                  yhwybz : AppInfo.getUUID().toString(),
                  bizDataMw : formatStr(data.toString(),my),
                  handleCode : "queryTitle",
                  data : {
                      colname : city
                  }
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                  var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                  if (checkResponse(responseTex)){
                      $scope.showloading = false;
                      var urllist = responseTex.data.urlList;
                      for(var i=0;i<urllist.length;i++){
                          if(i%2==1) {
                              urllist[i].backcolor = 'beige';
                          }
                      }
                      $scope.zczn002_Content = urllist;
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      //具体内容
      $scope.loadContent = function(url){
        $state.go('tab.zczn_ssxxybContent',{'url':url});
      };
      //切换城市的方法
      $scope.qhcs = function(city){
        $scope.curArea = city;
        $scope.queryTitle(city);
        $scope.popover.hide();
      };

  })
  .controller('SsxxybContentCtrl',function(AppInfo,$scope,$rootScope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost){
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $timeout(function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data={
              url : $stateParams.url
          };
          var my = AppInfo.getUUID();
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Zczn002BLH",
                  yhwybz : AppInfo.getUUID().toString(),
                  bizDataMw : formatStr(data.toString(),my),
                  handleCode : "queryContent",
                  data : {
                      url : $stateParams.url
                  }
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                  var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                  if(checkResponse(responseTex)){
                      $scope.content = responseTex.data;
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      },300);
  });
