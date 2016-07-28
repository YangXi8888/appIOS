/**
 * Created by Administrator on 2016/4/8.
 */
angular.module('sqhd003.controllers',[])
  .config(function($stateProvider){
      $stateProvider
          //纳税人学堂
          .state('tab.sqhd_nsrxt', {
              url: '/sqhd_nsrxt',
              views: {
                  'publicService': {
                    templateUrl: "templates/publicService/sqhd/003/sqhd003.html",
                    controller: 'NsrxtCtrl'
                  }
              }
          })
          //具体内容
          .state('tab.sqhd_nsrxtContent', {
              url: '/sqhd_nsrxtContent/:url',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/003/sqhd003_1.html",
                      controller: 'NsrxtContentCtrl'
                  }
              }
          })
  })
  .controller('NsrxtCtrl',function($scope,$rootScope,$ionicNavBarDelegate,Loading,$timeout,AjaxPost,$state,$ionicPopover,AppInfo){
      var uuid = AppInfo.getUUID();
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.qhCity = [{id:'23201',name:'南京'},{id:'23202',name:'无锡'},
          {id:'23203',name:'徐州'},{id:'23204',name:'常州'},{id:'23206',name:'南通'},
          {id:'23207',name:'连云港'},{id:'23208',name:'淮安'},{id:'23209',name:'盐城'},{id:'23210',name:'扬州'},
          {id:'23211',name:'镇江'},{id:'23212',name:'泰州'},{id:'23213',name:'宿迁'},{id:'23217',name:'苏州园区'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
        '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view class="zxzxPopover">'+
        '<ion-content align="center" class="zxzxContent">'+
        '<div class="list"><a class="item" ng-repeat="city in qhCity" ng-click="qhcs(city.id)">{{city.name}}</a></div></ion-content></ion-popover-view>';

      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openNsrxtPopover = function($event){
          $scope.popover.show($event);
      };
      $scope.closeNsrxtPopover = function(){
          $scope.popover.hide();
      };

      $scope.curArea = $.evalJSON(localStorage.getItem(appStorageName.curArea)).DS_SWDM;//默认地区
      $timeout(function(){
          $scope.queryTitle(1,$scope.curArea);
      },300);

      $scope.queryTitle = function(val,city){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          $scope.getRequest(val,city);
      };
      //加载列表
      var run=false;//方法锁
      $scope.showloading = false;//页面内容展示与隐藏
      $scope.nextPage = false;//是否有下一页
      $scope.getRequest = function(val,city){
          if(city == "23216" || city == "23298"){
              city = "23201";
          }
          if(!run){
              run =true;
              if(val==1){
                $scope.sqhd003_Content=[];
              }
              var val =val;
              $scope.nextPage = false;
              var data = {CurrentPage : val + "", id : city};
              var reqDatas = {
                  jsonData : angular.toJson({
                      blhName : "Sqhd002BLH",
                      handleCode : "queryTitle",
                      data : data,
                      yhwybz : uuid,
                      bizDataMw : formatStr(data.toString(),uuid)
                  })
              };
              AjaxPost.getData(reqDatas)
                  .then(function(responseText, textStatus,XMLHttpRequest){
                      Loading.loadingHide();
                      var response = Decrypt(responseText.toString(),uuid);
                      var responseTex = JSON.parse(AjaxPost.change(response));
                      if (checkResponse(responseTex)) {
                          if (responseTex.data.urlList.length == 0) {
                              $scope.nextPage = false;
                              $scope.infiniteIcon = false;
                              Loading.loadingTimoutHide("已经是最后一页");
                          }else{
                              $scope.showloading = false;
                              var urllist = responseTex.data.urlList;
                              for(var i=0;i<urllist.length;i++){
                                  if(urllist.length%2==1){
                                      if(val%2==1){
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
                              $scope.sqhd003_Content = $scope.sqhd003_Content.concat(urllist);
//                              angular.forEach(responseText.data.urlList,function(value, key){
//                                  if(val==1){
//                                    $scope.sqhd003_Content.push(value);
//                                    //$scope.sqhd002_Content.splice(0,15,value);
//                                  }else{
//                                      $scope.sqhd003_Content.push(value);
//                                  }
//                              });
                                  $scope.infiniteIcon = false;
                                  $scope.nextPage = true;
                          }
                          run=false;
                      }else{
                          Loading.loadingTimoutHide(responseTex.msg);
                      }
                  }, function(jqXHR, textStatus, errorThrown){
                      Loading.loadingHide();
                      Loading.loadingTimoutHide(textStatus);
                  });
          }
      };

      //下拉更新
      $scope.loadRefresh = function(){
          index = 2;
          $scope.getRequest(1,$scope.curArea);
          $scope.$broadcast('scroll.refreshComplete');
      };
      //上拉更新
      var index = 2;
      $scope.infiniteIcon = false;
      $scope.loadInfinite = function(){
          $scope.infiniteIcon = true;
          $scope.getRequest(index,$scope.curArea);
          index++;
          $scope.$broadcast('scroll.infiniteScrollComplete');
      };
      //具体内容
      $scope.loadContent = function(url){
          $state.go('tab.sqhd_nsrxtContent',{'url':url});
      };
      //切换城市的方法
      $scope.qhcs = function(city){
          $scope.curArea = city;
          $scope.queryTitle(1,city);
          $scope.popover.hide();
      };
  })
  .controller('NsrxtContentCtrl',function($scope,$rootScope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $timeout(function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {url : $stateParams.url};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd002BLH",
                  handleCode : "queryContent",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
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
