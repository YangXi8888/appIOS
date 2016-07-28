/**
 * Created by Administrator on 2016/3/28.
 */
angular.module('sqhd001.controllers',[])
  .controller('ZxzxCtrl',function($scope,$rootScope,$ionicNavBarDelegate,$ionicPopover,Loading){
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.qhCity = [{id:'23298',name:'省直属局'},{id:'23201',name:'南京'},{id:'23202',name:'无锡'},
        {id:'23203',name:'徐州'},{id:'23204',name:'常州'},{id:'23205',name:'苏州'},{id:'23206',name:'南通'},
        {id:'23207',name:'连云港'},{id:'23208',name:'淮安'},{id:'23209',name:'盐城'},{id:'23210',name:'扬州'},
        {id:'23211',name:'镇江'},{id:'23212',name:'泰州'},{id:'23213',name:'宿迁'},{id:'23217',name:'苏州工业园区'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
        '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view class="zxzxPopover">'+
        '<ion-content align="center" class="zxzxContent">'+
        '<div class="list"><a class="item" ng-repeat="city in qhCity" ng-click="getCity(city.id)">{{city.name}}</a></div></ion-content></ion-popover-view>';
      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openZxzxPopover = function($event){
          $scope.popover.show($event);
      };
      $scope.closeZxzxPopover = function(){
          $scope.popover.hide();
      };
      //销毁事件回调处理：清理popover对象
      $scope.$on("$destroy", function() {
          $scope.popover.remove();
      });
      // 隐藏事件回调处理
      $scope.$on("popover.hidden", function() {
        // Execute action
      });
      //删除事件回调处理
      $scope.$on("popover.removed", function() {
        // Execute action
      });
      $scope.zxdqQuery = function(dq){
          switch (dq) {
              case "23298":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=jsds");
                  break;
              case "23201":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=njds");
                  break;
              case "23202":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=wxds");
                  break;
              case "23203":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=xzds");
                  break;
              case "23204":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=czds");
                  break;
              case "23205":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=szds");
                  break;
              case "23206":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=ntds");
                  break;
              case "23207":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=lygds");
                  break;
              case "23208":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=hads");
                  break;
              case "23209":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=ycds");
                  break;
              case "23210":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=yzds");
                  break;
              case "23211":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=zjds");
                  break;
              case "23212":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=tzds");
                  break;
              case "23213":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=sqds");
                  break;
              case "23217":
                  $("#dqzx").attr("src","http://kf2.js-l-tax.gov.cn/new/client.php?arg=yqds");
                  break;
              default:
                  Loading.loadingTimoutHide("未找到地区信息！");
          };
      };
      var val = $.evalJSON(localStorage.getItem(appStorageName.curArea));
      $scope.zxdqQuery(val.DS_SWDM);
      $scope.getCity = function(id){
          $scope.zxdqQuery(id);
          $scope.popover.hide();
      };
  });
