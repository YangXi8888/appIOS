/**
 * Created by Administrator on 2016/3/29.
 */
angular.module('sqhd002.controllers',[])
  .config(function($stateProvider){
      $stateProvider
          //涉税通知
          .state('tab.sqhd_sstz', {
              url: '/sqhd_sstz',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/002/sqhd002.html",
                      controller: 'SstzCtrl'
                  }
              }
          })
          //涉税通知内容
          .state('tab.sqhd_sstzContent',{
              url:'/sqhd_sstzContent/:url',
              views:{
                  'publicService':{
                      templateUrl:'templates/publicService/sqhd/002/sqhd002_1.html',
                      controller:'SstzContentCtrl'
                  }
              }
          })
  })
  .controller('SstzCtrl',function($scope,$rootScope,$ionicNavBarDelegate,Loading,AjaxPost,$state,$timeout,AppInfo){
      var uuid = AppInfo.getUUID();
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      //$scope.sqhd002_CurPage = 1;
      $scope.sqhd002_Content=[];
      $scope.showloading = false;
      $scope.nextPage = false;
      var run=false;//方法锁
      $scope.queryTitle = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          $scope.getRequest(1);
      };
      //请求后台数据
      $scope.getRequest = function(val){
          if(!run){
              run =true;

              if(val==1){
                  $scope.sqhd002_Content=[];
              }
              var val =val;
              $scope.nextPage = false;
              var data = {CurrentPage : val + ""};
              var reqDatas = {
                  jsonData : angular.toJson({
                      blhName : "Sqhd001BLH",
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
                              $scope.sqhd002_Content = $scope.sqhd002_Content.concat(urllist);
//                              angular.forEach(responseText.data.urlList,function(value, key){
//                                  //if(val==1){
//                                  //    $scope.sqhd002_Content.push(value);
//                                  //    //$scope.sqhd002_Content.splice(0,15,value);
//                                  //}else{
//                                      $scope.sqhd002_Content.push(value);
//                                  //}
//                              });
                              $scope.infiniteIcon = false;
                              $scope.nextPage = true;
                          }
                          run=false;
                      }else{
                          Loading.loadingTimoutHide(responseText.msg);
                      }
                  }, function(jqXHR, textStatus, errorThrown){
                      Loading.loadingHide();
                      Loading.loadingTimoutHide(textStatus);
                  });
          }
      };
      $timeout(function(){
          $scope.queryTitle()
      },300);
      //下拉更新
      $scope.loadRefresh = function(){
          index = 2;
          $scope.getRequest(1);
          $scope.$broadcast('scroll.refreshComplete');
      };
      //上拉更新
      var index = 2;
      $scope.infiniteIcon = false;
      $scope.loadInfinite = function(){
          $scope.infiniteIcon = true;
          $scope.getRequest(index);
          index++;
          $scope.$broadcast('scroll.infiniteScrollComplete');
      };

      //具体内容
      $scope.loadContent = function(url){
          $state.go('tab.sqhd_sstzContent',{'url':url});
      };
  })
  .controller('SstzContentCtrl',function($scope,$rootScope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost,AppInfo){
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
                  blhName : "Sqhd001BLH",
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
