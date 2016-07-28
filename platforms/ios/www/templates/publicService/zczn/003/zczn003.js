/**
 * Created by Administrator on 2016/4/11.
 */
angular.module('zczn003.controllers',[])
  .config(function($stateProvider){
      $stateProvider
          //纳税人学堂
          .state('tab.zczn_yhxz', {
              url: '/zczn_yhxz',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/zczn/003/zczn003.html",
                      controller: 'YhxzCtrl'
                  }
              }
          })
          //具体内容
          .state('tab.zczn_yhxzContent', {
              url: '/zczn_yhxzContent/:url',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/zczn/003/zczn003_1.html",
                      controller: 'YhxzContentCtrl'
                  }
              }
          })
  })
  .controller('YhxzCtrl',function(AppInfo,$scope,$rootScope,$ionicNavBarDelegate,Loading,$timeout,AjaxPost,$state,$ionicPopover){
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };

      $scope.qhType = [{id:'ZHL',name:'综合类'},{id:'YYS',name:'营业税'},
          {id:'QYSDS',name:'企业所得税'},{id:'GRSDS',name:'个人所得税'},{id:'FCS',name:'房产税'},
          {id:'CZTDSYS',name:'城镇土地使用税'},{id:'DTZZS',name:'土地增值税'},{id:'GDZYS',name:'耕地占用税'},{id:'ZYS',name:'资源税'},
          {id:'QS',name:'契税'},{id:'YHS',name:'印花税'},{id:'CCS',name:'车船税'},{id:'CSWHJS_JYFJ',name:'城市维护建设税、 教育费附加'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view class="zxzxPopover">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item" ng-repeat="type in qhType" ng-click="qhlx(type.id)">{{type.name}}</a></div></ion-content></ion-popover-view>';

      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openYhxzPopover = function($event){
          $scope.popover.show($event);
      };
      $scope.closeYhxzPopover = function(){
          $scope.popover.hide();
      };

      $scope.searchType = "ZHL";
      $timeout(function(){
          $scope.queryTitle(1,$scope.searchType);
      },300);

      $scope.queryTitle = function(val,type){
        Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
        $scope.getRequest(val,type);
      };
      //加载列表
      var run=false;//方法锁
      $scope.showloading = false;//页面内容展示与隐藏
      $scope.nextPage = false;//是否有下一页
      $scope.getRequest = function(val,type){
          if (type == null || type == "") {
              type = "ZHL";
          }
          if(!run){
              run =true;
              if(val==1){
                  $scope.zczn003_Content=[];
              }
              var val =val;
              $scope.nextPage = false;
              var data={
                  CurrentPage : val + "",
                  colname : type
              };
              var my = AppInfo.getUUID();
              var reqDatas = {
                  jsonData : angular.toJson({
                      blhName : "Zczn003BLH",
                      yhwybz : AppInfo.getUUID().toString(),
                      bizDataMw : formatStr(data.toString(),my),
                      handleCode : "queryTitle",
                      data : {
                          CurrentPage : val + "",
                          colname : type
                      }
                  })
              };
              AjaxPost.getData(reqDatas)
                  .then(function(responseText, textStatus,XMLHttpRequest){
                      Loading.loadingHide();
                      var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                      var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                      if (checkResponse(responseTex)) {
                          if (responseTex.data.urlList.length == 0) {
                              $scope.nextPage = false;
                              $scope.infiniteIcon = false;
                              if(val==1){
                                  Loading.loadingTimoutHide("未查询到相关信息");
                              }else{
                                  Loading.loadingTimoutHide("已经是最后一页");
                              }
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
                              $scope.zczn003_Content = $scope.zczn003_Content.concat(urllist);
//                              angular.forEach(urllist,function(value, key){
//                                  $scope.zczn003_Content.push(value);
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
          $scope.getRequest(1,$scope.searchType);
          $scope.$broadcast('scroll.refreshComplete');
      };
      //上拉更新
      var index = 2;
      $scope.infiniteIcon = false;
      $scope.loadInfinite = function(){
          $scope.infiniteIcon = true;
          $scope.getRequest(index, $scope.searchType);
          index++;
          $scope.$broadcast('scroll.infiniteScrollComplete');
      };
      //具体内容
      $scope.loadContent = function(url){
        $state.go('tab.zczn_yhxzContent',{'url':url});
      };
      //切换类型的方法
      $scope.qhlx = function(type){
          $scope.searchType = type;
          $scope.queryTitle(1,type);
          $scope.popover.hide();
      };
  })
  .controller('YhxzContentCtrl',function(AppInfo,$scope,$rootScope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost){
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
                  blhName : "Zczn003BLH",
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
