/**
 * Created by Administrator on 2016/4/12.
 */
angular.module('sqhd007.controllers',[])
  .config(function($stateProvider){
      $stateProvider
          //纳税人学堂
          .state('tab.sqhd_dswb', {
              url: '/sqhd_dswb',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/007/sqhd007.html",
                      controller: 'DswbCtrl'
                  }
              }
          })
  })
  .controller('DswbCtrl',function($scope,$rootScope,$ionicNavBarDelegate,Loading,$timeout,AjaxPost,$state,$ionicPopover,$location,AppInfo){
      var uuid = AppInfo.getUUID();
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function(){
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.qhCity = [{id:'23298',name:'省直属局'},{id:'23201',name:'南京'},{id:'23202',name:'无锡'},
          {id:'23203',name:'徐州'},{id:'23204',name:'常州'},{id:'23205',name:'苏州'},{id:'23206',name:'南通'},
          {id:'23207',name:'连云港'},{id:'23208',name:'淮安'},{id:'23209',name:'盐城'},{id:'23210',name:'扬州'},
          {id:'23211',name:'镇江'},{id:'23212',name:'泰州'},{id:'23213',name:'宿迁'},{id:'23216',name:'张家港保税区'},{id:'23217',name:'苏州工业园区'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view class="zxzxPopover">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item" ng-repeat="city in qhCity" ng-click="initPage(city.id)">{{city.name}}</a></div></ion-content></ion-popover-view>';

      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openDswbPopover = function($event){
          $scope.popover.show($event);
      };
      $scope.closeDswbPopover = function(){
          $scope.popover.hide();
      };
      $scope.curArea = $.evalJSON(localStorage.getItem(appStorageName.curArea)).DS_SWDM;//默认地区
      $timeout(function(){
          $scope.initPage($scope.curArea);
      },300);
      $scope.initPage = function(id){
          var uuids = "";
          $scope.popover.hide();
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd006BLH",
                  handleCode : "queryWblist",
                  data : {

                  },
                  yhwybz : uuid,
                  bizDataMw : formatStr('132sljflsjflsjdfkj',uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      var wbuidList = responseTex.data.wbList;
                      for(var i=0;i<wbuidList.length;i++){
                          if(wbuidList[i].swjgdm == id){
                              if(i==wbuidList.length-1){
                                  uuids += wbuidList[i].wbuid;
                              }else{
                                  uuids += wbuidList[i].wbuid+",";
                              }
                          }
                      }
                      $('#sqhd007_dswb').attr('src','');
                      if(uuids.length==0){
                        Loading.loadingTimoutHide("该区域没有开通微博");
                      }else{
                          $('#sqhd007_dswb').attr('src','http://widget.weibo.com/relationship/bulkfollow.php?language=zh_cn&uids='+uuids+'&wide=1&color=C2D9F2,FFFFFF,0082CB,666666&showtitle=1&showinfo=1&sense=0&verified=1&count=20&refer='+encodeURIComponent(location.href)+'&dpc=1');
                      }
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      $scope.openWeixinErweiMa = function(wxId){
          window.open('http://open.weixin.qq.com/qr/code/?username='+wxId,'_system','location=yes');
      };
  });
