/**
 * Created by Administrator on 2016/4/11.
 */
angular.module('zczn001.controllers',[])
  .config(function($stateProvider){
      $stateProvider
          //12366知识库
          .state('tab.zczn_12366zsk', {
              url: '/zczn_12366zsk',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/zczn/001/zczn001.html",
                      controller: 'ZcznCtrl'
                  }
              }
          })
          //12366知识库_title
          .state('tab.zczn_12366zsk_1', {
              url: '/zczn_12366zsk_1/:title/:content/:gxrqq/:gxrqz',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/zczn/001/zczn001_1.html",
                      controller: 'Zczn1Ctrl'
                  }
              }
          })
          //12366知识库_content
          .state('tab.zczn_12366zsk_2', {
              url: '/zczn_12366zsk_2/:url',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/zczn/001/zczn001_2.html",
                      controller: 'Zczn2Ctrl'
                  }
              }
          })
  })
  .controller('ZcznCtrl',function($scope,$rootScope,$ionicNavBarDelegate,Loading,$state){
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.zsk ={
          title:'',
          content:'',
          gxrqq:'',
          gxrqz:''
      };
    $scope.formatDate = function (date) {
        if(date==''){
            return '';
        }
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;a
    };
      //确定方法
      $scope.qd = function(){
          if($scope.zsk.gxrqq>$scope.zsk.gxrqz){
              Loading.loadingTimoutHide("开始时间不能大于结束时间");
              return ;
          }
          $state.go('tab.zczn_12366zsk_1',{'title':$scope.zsk.title,'content':$scope.zsk.content,'gxrqq':$scope.formatDate($scope.zsk.gxrqq),'gxrqz':$scope.formatDate($scope.zsk.gxrqz)});
      };
      //清空方法
      $scope.qk = function(){
          var p = '';
          for(p in $scope.zsk){
              $scope.zsk[p] = '';
          }
      };

  })
  .controller('Zczn1Ctrl',function(AppInfo,$scope,$stateParams,$ionicNavBarDelegate,$timeout,Loading,AjaxPost,$state){
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $timeout(function(){
          $scope.queryTitle(1);
      },300);
      $scope.queryTitle = function(val){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          $scope.getRequest(val);
      };
      //加载列表
      var run=false;//方法锁
      $scope.showloading = false;//页面内容展示与隐藏
      $scope.nextPage = false;//是否有下一页
      var listLength = null;//列表长度
      $scope.getRequest = function(val){
          if(!run){
              run =true;
              if(val==1){
                  $scope.zczn001_Content=[];
              }
              var val =val;
              $scope.nextPage = false;
              var data={
                  title : $stateParams.title,
                  iCurrentPage : val + "",
                  zlnr : $stateParams.content,
                  zlzhczsjStart : $stateParams.gxrqq,
                  zlzhczsjEnd : $stateParams.gxrqz
              };
              var my = AppInfo.getUUID();
              var reqDatas = {
                  jsonData : angular.toJson({
                      blhName : "Zczn001BLH",
                      yhwybz : AppInfo.getUUID().toString(),
                      bizDataMw : formatStr(data.toString(),my),
                      handleCode : "queryTitle",
                          data : {
                              title : $stateParams.title,
                              iCurrentPage : val + "",
                              zlnr : $stateParams.content,
                              zlzhczsjStart : $stateParams.gxrqq,
                              zlzhczsjEnd : $stateParams.gxrqz
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
                              listLength =urllist.length;
                              for(var i=0;i<listLength;i++){
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
                              $scope.zczn001_Content = $scope.zczn001_Content.concat(urllist);
//                              angular.forEach(responseText.data.urlList,function(value, key){
//                                  $scope.zczn001_Content.push(value);
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
          $scope.getRequest(1);
          $scope.$broadcast('scroll.refreshComplete');
      };
      //上拉更新
      var index = 2;
      $scope.infiniteIcon = false;
      $scope.loadInfinite = function(){
          if(listLength>=10){
              $scope.infiniteIcon = true;
              $scope.getRequest(index);
              index++;
              $scope.$broadcast('scroll.infiniteScrollComplete');
          }else {
              $scope.nextPage = false;
          }

      };
      //具体内容
      $scope.loadContent = function(url){
          $state.go('tab.zczn_12366zsk_2',{'url':url});
      };
  })
  .controller('Zczn2Ctrl',function(AppInfo,$scope,$ionicNavBarDelegate,Loading,$timeout,$stateParams,AjaxPost){
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $timeout(function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data={
              id : $stateParams.url
          };
          var my = AppInfo.getUUID();
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Zczn001BLH",
                  handleCode : "queryContent",
                  yhwybz : AppInfo.getUUID().toString(),
                  bizDataMw : formatStr(data.toString(),my),
                  data : {
                      id : $stateParams.url
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
