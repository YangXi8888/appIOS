/**
 * Created by Administrator on 2016/2/23.
 */

angular.module('starter.controllers', ['settings.controllers','sqhd001.controllers','sqhd002.controllers','sqhd003.controllers',
    'sqhd004.controllers','sqhd005.controllers','sqhd006.controllers','sqhd007.controllers','sqhd008.controllers','zczn001.controllers',
    'zczn002.controllers','zczn003.controllers','sbns002.controllers', 'cxfw001.controllers','cxfw002.controllers',
    'cxfw003.controllers', 'cxfw004.controllers', 'cxfw005.controllers', 'bsdh004.controllers','bsdh005.controllers',
    'sbns001.controllers', 'ssbl001.controllers','ssbl002.controllers','ssbl005.controllers', 'ssbl006.controllers',
  'bsdh001.controllers','bsdh002.controllers','bsdh003.controllers','bsdh006.controllers','bsdh008.controllers',
    'ssbl003.controllers','sbns003.controllers'])
  //tab主页
  .controller('TabCtrl', function ($scope, $state, $rootScope, $timeout) {
    $scope.name = 'TabCtrl';
    $rootScope.hideTabs = '';
    $scope.go = function (ind) {
      if (ind == 1) {
        $state.go('tab.home');
      } else if (ind == 2) {
        $state.go('tab.publicService');
        $timeout(function () {
          var height = document.body.scrollHeight;
          $('#publicSlideBox').height(height - 142 + 'px');
        }, 100);
      } else if (ind == 3) {
        $state.go('tab.taxService');
        $timeout(function () {
          var height = document.body.scrollHeight;
          $('#taxServiceSlideBox').height(height - 142 + 'px');
        }, 100);
      } else {
        $state.go('tab.settings');
      }
    }
  })
  //掌上办税
  .controller('HomeCtrl', function (AppInfo,$timeout,$ionicActionSheet,AjaxPost,$ionicScrollDelegate,$scope, $ionicPopup, AppModule, LocCache, $location, $state, Linking, Loading) {
    // LocCache.clearAll();
    $scope.sbqkShow=false;
    $scope.sbqkBs='ion-ios-arrow-down';
    $scope.qhplay=false;

//        var response='{"code"%3A"ZB0008"%2C"data"%3A{"jdxxList"%3A[]}%2C"msg"%3A"当前纳税人没有有效的税种基金信息鉴定"}';
//        console.log(response);
//        console.log(AjaxPost.change(response.toString()));
//        console.log((JSON.parse(AjaxPost.change(response.toString()))).data);

    var qyxx=findSxQyByLocal();
    if(qyxx!=null){
        $scope.qhplay=true;
        $scope.title=converLongName(qyxx.MC);
    }else{
        $scope.title='掌上办税';
    }
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
                qyxx = qyxxList[index] ;
                $scope.title=converLongName(qyxx.MC);
                $scope.sbqkBs='ion-ios-arrow-down';
                $scope.sbqkShow=false;
                $scope.ssslBs='ion-ios-arrow-down';
                $scope.ssslShow=false;
                $scope.gsggBs='ion-ios-arrow-down';
                $scope.gsggShow=false;
                $ionicScrollDelegate.scrollTop();
                return true;
            }
        });
        $timeout(function() {
            hideSheet();
        }, 3000);
    }
    $scope.showSbqk=function(){
        if(qyxx!==null){
            $scope.sbqkShow=!$scope.sbqkShow;
            $ionicScrollDelegate.resize();
            if($scope.sbqkBs=='ion-ios-arrow-down'){
                $scope.chusihua();
                $scope.sbqkBs='ion-ios-arrow-up';
            }else{
                $scope.sbqkBs='ion-ios-arrow-down';
            }
        }else{
            Loading.loadingTimoutHide('没有企业信息');
        }
    };
    $scope.ssslShow=false;
    $scope.ssslBs='ion-ios-arrow-down';
    $scope.showSssl=function(){
        if(qyxx!==null){
            $scope.ssslShow=!$scope.ssslShow;
            $ionicScrollDelegate.resize();
            if($scope.ssslBs=='ion-ios-arrow-down'){
                $scope.chusihua();
                $scope.ssslBs='ion-ios-arrow-up';
            }else{
                $scope.ssslBs='ion-ios-arrow-down';
            }
        }else{
            Loading.loadingTimoutHide('没有企业信息');
        }
    };
    $scope.gsggShow=false;
    $scope.gsggBs='ion-ios-arrow-down';
    $scope.showGsgg=function(){
        if(qyxx!==null){
            $scope.gsggShow=!$scope.gsggShow;
            $ionicScrollDelegate.resize();
            if($scope.gsggBs=='ion-ios-arrow-down'){
                $scope.gsgg();
                $scope.gsggBs='ion-ios-arrow-up';
            }else{
                $scope.gsggBs='ion-ios-arrow-down';
            }
        }else{
            Loading.loadingTimoutHide('没有企业信息');
        }
    };
    //新增功能
    $scope.xzgnBs='ion-ios-arrow-down';
    $scope.xzgnIf = false;
    $scope.showXzgn = function(){
        $ionicScrollDelegate.resize();
        if($scope.xzgnBs=='ion-ios-arrow-down'){
            $scope.xzgnBs='ion-ios-arrow-up';
          $scope.xzgnIf = true;
        }else{
            $scope.xzgnBs='ion-ios-arrow-down';
          $scope.xzgnIf = false;
        }
    };
    $scope.xzgnGo = function(con){
        var val = localStorage.getItem('loginState');
        if(val==0||val==null){
            Loading.loadingTimoutHide('请先登录！');
            return ;
        }
        $state.go(con);
    };
    $scope.gsggMx=function(xh,mxxh){
        if(sjflag==1){
            window.open("http://pub.jsds.gov.cn/art/2016/3/28/art_4341_800597.html","_system","location=yes");
        }else{
            var cs= xh+ "," + mxxh + ","+ qyxx.SWGLM;
            $state.go('tab.home_gsggcon',{'cs':cs});
        }
    };
    $scope.chusihua=function(){
//        alert(qyxx.SWGLM);
//        alert(qyxx.GLJG_DM);
        var data={
            swglm : qyxx.SWGLM,
            gljgdm : qyxx.GLJG_DM
        };
        var my = AppInfo.getUUID();
        var reqDatas = {
            jsonData : angular.toJson({
                blhName : "ZBfwBLH",
                data : {
                    swglm : qyxx.SWGLM,//'320100004071969',
                    gljgdm : qyxx.GLJG_DM//'23201381200'
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
//                alert(response);
                var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                if(checkResponse(responseTex)){
//                    alert(JSON.stringify(responseText.data));
                    $scope.ysbList=responseTex.data.ysbList;
                    $scope.wsbList=responseTex.data.wsbList;
                    $scope.ssList=responseTex.data.sssqList;
                    for(var i=0;i<$scope.ysbList.length;i++){
                        $scope.ysbList[i].sbzl=converLongName($scope.ysbList[i].sbzl);
                    }
                }else{
                    Loading.commonAlert(responseTex.msg,null,null);
                    $scope.closeSJMXModal();
                }
            }, function(jqXHR, textStatus, errorThrown) {
                Loading.loadingHide();
                Loading.commonAlert(textStatus);
            })
    };
    var sjflag=0;
    $scope.gsgg=function(){
//        alert(qyxx.SWGLM);
        var data={
            swglm : qyxx.SWGLM,
            gljgDm : qyxx.GLJG_DM
        };
        var my = AppInfo.getUUID();
        var reqDatas = {
            jsonData : angular.toJson({
                blhName : "Yh001BLH",
                data : {
                    swglm : qyxx.SWGLM,
                    gljgDm : qyxx.GLJG_DM
                },
                yhwybz : AppInfo.getUUID().toString(),
                bizDataMw : formatStr(data.toString(),my),
                handleCode : "queryGsgg"
            })
        };
        var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
        Loading.loadingShow(cnt);
        AjaxPost.getData(reqDatas)
            .then(function(responseText, textStatus,
                           XMLHttpRequest) {
                Loading.loadingHide();
                var response = Decrypt(responseText.toString(),my);
//                alert(response);
                var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                if(checkResponse(responseTex)){
                    if(responseTex.data.list.length==0){
                        sjflag=1;
                        var now  = new Date().getFullYear()+""+new Date().getMonth();
                        if(now < 20165){
                            var sjcl=[{TITLE:'关于营业税纳税人尽快办理营改增信息核实手续的公告'}];
                            $scope.gsggList=sjcl;
                        }
                    }else{
                        $scope.gsggList=responseTex.data.list;
                    }
                }else{
                    Loading.commonAlert(responseTex.msg,null,null);
                }
            }, function(jqXHR, textStatus, errorThrown) {
                Loading.loadingHide();
                Loading.commonAlert(textStatus);
            })
    };
//    if(qyxx!==null){
//        $scope.chusihua();
//        $scope.gsgg();
//    }
    var tempService = null;
    if (!LocCache.load('usualService')) {
      tempService = AppModule.homeModules();
      LocCache.save('usualService', tempService);//缓存常用服务
    } else {
      tempService = LocCache.load('usualService');
    }
    $scope.commonService = tempService;

    $scope.toAddItems = function () {
      $state.go('tab.home_add');
    }

    $scope.open = function (item) {
    	if(item.moduleId=='dhzx'){
    		window.location.href='tel:12366';
    	}else{
    		Linking.linkShow(item.href);
    	}
    }

    $scope.openCkxq = function (id) {
        if($scope.ysbList.length==0 && id==1){
            Loading.loadingTimoutHide('无本月已申报信息！');
            return;
        }
        if($scope.wsbList.length==0 && id==2){
            Loading.loadingTimoutHide('无本月未申报信息！');
            return;
        }
        if($scope.ssList.length==0 && id==3){
            Loading.loadingTimoutHide('无本月涉税办理信息！');
            return;
        }
        $state.go('tab.home_detail',{'id':id});
    };
    $scope.openGsgg = function () {
        $state.go('tab.home_gsgg');
    }
//    $scope.deleteModule = function (moduleName, moduleId) {
//      if (tempService.length == 1 && tempService[0].length == 1 && tempService[0][0].length == 1) {
//        $ionicPopup.alert({
//          title: '请至少保留一个常用功能'
//        }).then(function (res) {
//
//        });
//      } else {
//        $ionicPopup.confirm({
//          title: '移出常用',
//          content: '将 ' + moduleName + ' 移出首页常用?',
//          cancelText: '取消',
//          okText: '确认'
//        }).then(function (res) {
//          if (res) {
//            var item;
//            var pageLen = tempService.length;
//            delModule:
//              for (var i = 0; i < tempService.length; i++) {
//                for (var j = 0; j < tempService[i].length; j++) {
//                  for (var k = 0; k < tempService[i][j].length; k++) {
//                    if (tempService[i][j][k].moduleId == moduleId) {
//                      item = tempService[i][j][k];
//                      tempService[i][j].splice(k, 1);
//                      if (tempService[i][j].length == 0) {
//                        tempService[i].splice(j, 1);
//                      }
//                      if (tempService[i].length == 0) {
//                        tempService.splice(i, 1);
//                      }
//                      var lineLen = tempService[pageLen - 1].length;
//                      if (i == pageLen - 1 && lineLen == 2) {
//                        var lastLen = tempService[pageLen - 1][lineLen - 1].length;
//                        var lastItem = tempService[pageLen - 1][lineLen - 1][lastLen - 1];
//                        tempService[i][j].push(lastItem);
//                        tempService[pageLen - 1][lineLen - 1].splice(lastLen - 1, 1);
//                        if (tempService[pageLen - 1][lineLen - 1].length == 0) {
//                          tempService[pageLen - 1].splice(lineLen - 1, 1);
//
//                        }
//                        if (tempService[pageLen - 1].length == 0) {
//                          tempService.splice(pageLen - 1, 1);
//
//                        }
//                      }
//                      if (i < pageLen - 1) {
//                        var lineLen = tempService[pageLen - 1].length;
//                        var lastLen = tempService[pageLen - 1][lineLen - 1].length;
//                        var lastItem = tempService[pageLen - 1][lineLen - 1][lastLen - 1];
//                        tempService[i][j].push(lastItem);
//                        tempService[pageLen - 1][lineLen - 1].splice(lastLen - 1, 1);
//                        if (tempService[pageLen - 1][lineLen - 1].length == 0) {
//                          tempService[pageLen - 1].splice(lineLen - 1, 1);
//                        }
//                        if (tempService[pageLen - 1].length == 0) {
//                          tempService.splice(pageLen - 1, 1);
//
//                        }
//                      }
//                      break delModule;
//                    }
//                  }
//                }
//              }
//                        for(var i=0;i<tempService.length;i++){
//                            for(var j=0;j<tempService[i].length;j++){
//                                if(tempService[i][j].moduleId == moduleId ){
//                                    item = tempService[i][j];
//                                    tempService[i].splice(j,1);
//                                    if(tempService[i].length == 0){
//                                        tempService.splice(i,1);
//                                    }
//                                    if(i<outLen-1 ){
//                                        //排序
//                                        var inLen = tempService[i].length;//当前循环长度
//                                        var lastLen = tempService[outLen-1].length;//最后一条的长度
//                                        var lastItem = tempService[outLen-1][lastLen-1];
//                                        tempService[i].push(lastItem);
//                                        tempService[outLen-1].splice(lastLen-1,1);
//                                        if(tempService[outLen-1].length == 0){
//                                            tempService.splice(outLen-1,1);
//                                        }
//                                    }
//                                    break delModule;
//                                }
//                            }
//                        }
//            $scope.commonService = tempService;
//            LocCache.save('usualService', tempService);
//            if (LocCache.load('moreService')) {
//              var tempMoreService = LocCache.load('moreService');
//              tempMoreService.push(item);
//              LocCache.save('moreService', tempMoreService);
//              tempMoreService = null;
//            }
//          } else {
//            //
//          }
//        });
//
//      }
//    }
  })
  //更多功能
  .controller('HomeAddCtrl', function ($scope, $ionicPopup, AppModule, LocCache, Linking, Loading, $ionicNavBarDelegate, $rootScope) {
    $rootScope.hideTabs = 'tabs-item-hide';
//        var obj={
//            template: '加载中',
//            duration:1000
//        };
//        Loading.loadingTimoutHide(obj);
    $scope.tempService = LocCache.load('usualService');
    if (!LocCache.load('moreService')) {
      $scope.allModules = AppModule.allModules();
      LocCache.save('moreService', $scope.allModules);
    } else {
      $scope.allModules = LocCache.load('moreService');
    }

    $scope.data = {
      showReorder: true  //显示添加服务按钮
    };
    $scope.back = function () {
      $ionicNavBarDelegate.back();
      $rootScope.hideTabs = '';
    };
    //添加
    $scope.addItem = function (item) {
      if (item.mode == 'ion-plus-circled') {
        var tsnr = ' 添加到首页常用?';
      } else {
        var tsnr = ' 移出首页常用?';
      }
      $ionicPopup.confirm({
        title: '添加常用',
        content: '将 ' + item.name + tsnr,
        cancelText: '取消',
        okText: '确认'
      }).then(function (res) {
        if (res) {
          if (item.mode == 'ion-plus-circled') {
            //添加 处理
            item.mode = 'ion-minus-circled';
            var pagelen = $scope.tempService.length;
            var linelen = $scope.tempService[pagelen - 1].length;
            var wordlen = $scope.tempService[pagelen - 1][linelen-1].length;
            var gdgn = $scope.tempService[pagelen - 1][linelen-1][wordlen-1];
            $scope.tempService[pagelen-1][linelen-1].splice(wordlen-1, 1);
            if ($scope.tempService[pagelen - 1][linelen - 1].length < 4) {
              $scope.tempService[pagelen - 1][linelen - 1].push(item);
            } else {
              if (linelen == 1) {
                $scope.tempService[pagelen - 1].push([item]);
              }
              if (linelen == 2) {
                $scope.tempService.push([[item]]);
              }
            }
              if ($scope.tempService[pagelen - 1][linelen - 1].length < 4) {
                  $scope.tempService[pagelen - 1][linelen - 1].push(gdgn);
              } else {
                  if (linelen == 1) {
                      $scope.tempService[pagelen - 1].push([gdgn]);
                  }
                  if (linelen == 2) {
                      $scope.tempService.push([[gdgn]]);
                  }
              }
            LocCache.save('usualService', $scope.tempService);
            LocCache.save('moreService', $scope.allModules);//缓存其余服务
            return;
          } else {
            if ($scope.tempService.length == 1 && $scope.tempService[0].length == 1 && $scope.tempService[0][0].length == 2) {
              $ionicPopup.alert({
                title: '请至少保留一个常用功能'
              }).then(function (res) {
                return;
              });
            } else {
              item.mode = 'ion-plus-circled';
              //var item;
                //移除“更多功能”
                var pagele = $scope.tempService.length;
                var linele = $scope.tempService[pagele - 1].length;
                var wordle = $scope.tempService[pagele - 1][linele-1].length;
                var gdgn = $scope.tempService[pagele - 1][linele-1][wordle-1];
                $scope.tempService[pagele-1][linele-1].splice(wordle-1, 1);
                if ($scope.tempService[pagele-1][linele-1].length == 0) {
                    $scope.tempService[pagele-1].splice(linele-1, 1);
                }
                if ($scope.tempService[pagele-1].length == 0) {
                    $scope.tempService.splice(pagele-1, 1);
                }
//                alert(JSON.stringify($scope.tempService));
                //执行删除功能块操作
              delModule:
                for (var i = 0; i < $scope.tempService.length; i++) {
                  for (var j = 0; j < $scope.tempService[i].length; j++) {
                    for (var k = 0; k < $scope.tempService[i][j].length; k++) {
                      if ($scope.tempService[i][j][k].moduleId == item.moduleId) {
                        // item = $scope.tempService[i][j][k];
                        $scope.tempService[i][j].splice(k, 1);
                        if ($scope.tempService[i][j].length == 0) {
                          $scope.tempService[i].splice(j, 1);
                        }
                        if ($scope.tempService[i].length == 0) {
                          $scope.tempService.splice(i, 1);
                        }
                        var pageLen = $scope.tempService.length;
                        var lineLen = $scope.tempService[pageLen - 1].length;
                        if (i == pageLen - 1 && lineLen == 2) {
                          var lastLen = $scope.tempService[pageLen - 1][lineLen - 1].length;
                          var lastItem = $scope.tempService[pageLen - 1][lineLen - 1][lastLen - 1];
                          $scope.tempService[i][j].push(lastItem);
                          $scope.tempService[pageLen - 1][lineLen - 1].splice(lastLen - 1, 1);
                          if ($scope.tempService[pageLen - 1][lineLen - 1].length == 0) {
                            $scope.tempService[pageLen - 1].splice(lineLen - 1, 1);

                          }
                          if ($scope.tempService[pageLen - 1].length == 0) {
                            $scope.tempService.splice(pageLen - 1, 1);

                          }
                        }
                        if (i < pageLen - 1) {
                          var lineLen = $scope.tempService[pageLen - 1].length;
                          var lastLen = $scope.tempService[pageLen - 1][lineLen - 1].length;
                          var lastItem = $scope.tempService[pageLen - 1][lineLen - 1][lastLen - 1];
                          $scope.tempService[i][j].push(lastItem);
                          $scope.tempService[pageLen - 1][lineLen - 1].splice(lastLen - 1, 1);
                          if ($scope.tempService[pageLen - 1][lineLen - 1].length == 0) {
                            $scope.tempService[pageLen - 1].splice(lineLen - 1, 1);
                          }
                          if ($scope.tempService[pageLen - 1].length == 0) {
                            $scope.tempService.splice(pageLen - 1, 1);

                          }
                        }
                        break delModule;
                      }
                    }
                  }
                }
//添加“更多功能”
                var pageleng = $scope.tempService.length;
                var lineleng = $scope.tempService[pageleng - 1].length;
                var wordleng = $scope.tempService[pageleng - 1][lineleng-1].length;
                if ($scope.tempService[pageleng - 1][lineleng - 1].length < 4) {
                    $scope.tempService[pageleng - 1][lineleng - 1].push(gdgn);
                } else {
                    if (lineleng == 1) {
                        $scope.tempService[pageleng - 1].push([gdgn]);
                    }
                    if (lineleng == 2) {
                        $scope.tempService.push([[gdgn]]);
                    }
                }
              LocCache.save('usualService', $scope.tempService);
              LocCache.save('moreService', $scope.allModules);//缓存其余服务
              return;
            }
          }
        }
      });
    };
    $scope.openDetail = function (item) {
      if ($scope.data.showReorder) {
        return;
      }
      Linking.linkShow(item.href);
    };
//        $scope.moveItem = function(item, fromIndex, toIndex) {
//            $scope.allModules.splice(fromIndex, 1);
//            $scope.allModules.splice(toIndex, 0, item);
//            LocCache.save('moreService',$scope.allModules);
//        };
//        $scope.$on('$destroy',function(){
//            $rootScope.hideTabs='';
//        });
  })
    //首页详细信息
    .controller('HomeDetailCtrl',function(AppInfo,Loading,AjaxPost,$stateParams,$scope,$timeout,Linking,$rootScope,$ionicNavBarDelegate,$ionicSlideBoxDelegate){
        $rootScope.hideTabs = 'tabs-item-hide';
        $scope.back = function () {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs = '';
        };
        var qyxx=findSxQyByLocal();
        var id = $stateParams.id;
        if(id==1){
            $scope.bt = '本月已申报详情';
            $scope.play1=true;
            $scope.play2=false;
            $scope.play3=false;
        }else if(id==2){
            $scope.bt = '本月未申报详情';
            $scope.play1=false;
            $scope.play2=true;
            $scope.play3=false;
        }else{
            $scope.bt = '本月涉税办理详情';
            $scope.play1=false;
            $scope.play2=false;
            $scope.play3=true;
        };
        $scope.chusihua=function(){
//            alert(qyxx.SWGLM);
//            alert(qyxx.GLJG_DM);
            var data={
                swglm : qyxx.SWGLM,
                gljgdm : qyxx.GLJG_DM
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "ZBfwBLH",
                    data : {
                        swglm : qyxx.SWGLM,
                        gljgdm : qyxx.GLJG_DM
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
                        //alert(JSON.stringify(responseText.data));
                        $scope.ysbList=responseTex.data.ysbList;
                        $scope.wsbList=responseTex.data.wsbList;
                        $scope.ssList=responseTex.data.sssqList;
                        for(var i=0;i<$scope.ysbList.length;i++){
                            $scope.ysbList[i].sbzl=converLongName($scope.ysbList[i].sbzl);
                        }
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeSJMXModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.chusihua();


    })
  //公共服务
  .controller('PublicServiceCtrl', function ($scope, $timeout, Linking, $rootScope, $ionicSlideBoxDelegate) {
      $rootScope.hideTabs = '';
      //公共服务页面滑动方法
      $scope.slideChange = function (index) {
        $scope.publiChangeTab(index);
      };
      $scope.showlink = function (ljdz) {
        Linking.linkShow(ljdz);
      };
      $scope.publiChangeTab = function (index) {
        var a = document.getElementById('sub_header_list').getElementsByTagName('a');
        a[0].className = "button button-clear ion-loop";
        a[1].className = "button button-clear ion-navicon-round";
        a[2].className = "button button-clear ion-help-buoy";
        //鎶婄偣鍑荤殑閭ｄ釜鏄剧ず鍑烘潵
        a[index].className = a[index].className + " sub_button_select";
      };
      $scope.changeTab = function (index) {
        $scope.publiChangeTab(index);
        $ionicSlideBoxDelegate.$getByHandle('publicSlideBox').slide(index);
      };

      //拨打电话
      $scope.tellPhone =  function(){
          window.location.href='tel:12366';
      };
      $scope.wdnjrzIf = $.evalJSON(localStorage.getItem(appStorageName.curArea)).DS_SWDM  == '23201'? true : false;


  })
  //办税服务
  .controller('TaxServiceCtrl', function ($scope, $rootScope, $ionicModal, Linking, $rootScope, $ionicSlideBoxDelegate) {
    $rootScope.hideTabs = '';
    $scope.page = 0;
    $scope.showlink = function (ljdz) {
      Linking.linkShow(ljdz);
    };
    //页面滑动事件
    $scope.slideChange = function (index) {
      $scope.publiChangeTab(index);
    };
    $scope.publiChangeTab = function (index) {
      var a = document.getElementById('sub_header_list2').getElementsByTagName('a');
      a[0].className = "button button-clear ion-clipboard";
      a[1].className = "button button-clear ion-compose";
      a[2].className = "button button-clear ion-funnel";
      a[index].className = a[index].className + " sub_button_select";

    };
    $scope.changeTab = function (index) {
      $scope.publiChangeTab(index);
      $ionicSlideBoxDelegate.$getByHandle('taxSlideBox').slide(index);
    };

  })
 //首页公示公告
.controller('HomeGsggCtrl', function (AppInfo,$state,AjaxPost,Loading,$scope,$rootScope,$ionicNavBarDelegate) {
        $rootScope.hideTabs = 'tabs-item-hide';
        $scope.back = function () {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs = '';
        };
        $scope.gsgg={
            dqqy:'',
            gjz:'',
            yxyf:''
        };
        var qyxx = findSxQyByLocal();
        var qyxxList = findAllQyByLocal();
        for (var i = 0; i < qyxxList.length; i++) {
            $("#QySelect").append("<option value='" + qyxxList[i].SWGLM + "," + qyxxList[i].GLJG_DM + "'>" + converLongName(qyxxList[i].MC) + "</option>");
        }
//        $scope.gsgg.dqqy=qyxx.SWGLM + "," + qyxx.GLJG_DM;
        $scope.gsggCx=function(){
            var data={
                swglm : $scope.gsgg.dqqy.split(",")[0],
                gljgDm : $scope.gsgg.dqqy.split(",")[1],
                gjz : $scope.gsgg.gjz,
                yxYf : $scope.gsgg.yxyf
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Yh001BLH",
                    data : {
                        swglm : $scope.gsgg.dqqy.split(",")[0],
                        gljgDm : $scope.gsgg.dqqy.split(",")[1],
                        gjz : $scope.gsgg.gjz,
                        yxYf : $scope.gsgg.yxyf
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "queryGsggByParam"
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
                       // alert(JSON.stringify(responseText));
                        $scope.gsggList=responseTex.data.list;
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.gsggMx=function(xh,mxxh){
            var cs= xh+ "," + mxxh + ","+ $scope.gsgg.dqqy.split(",")[0];
            $state.go('tab.home_gsggcon',{'cs':cs});
        };
})
 //首页公示公告明细
.controller('HomeGsggconCtrl', function (AppInfo,AjaxPost,Loading,$stateParams,$rootScope,$ionicNavBarDelegate,$scope) {
        $rootScope.hideTabs = 'tabs-item-hide';
        $scope.back = function () {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs = '';
        };
        $scope.gsggfjShow=false;
        var cs = $stateParams.cs;
//        alert(cs.split(",")[0]);
//        alert(cs.split(",")[1]);
//        alert(cs.split(",")[2]);
        var data={
            swglm : cs.split(",")[2],
            xh : cs.split(",")[0],
            mxXh : cs.split(",")[1]
        };
        var my = AppInfo.getUUID();
        var reqDatas = {
            jsonData : angular.toJson({
                blhName : "Yh001BLH",
                data : {
                    swglm : cs.split(",")[2],
                    xh : cs.split(",")[0],
                    mxXh : cs.split(",")[1]
                },
                yhwybz : AppInfo.getUUID().toString(),
                bizDataMw : formatStr(data.toString(),my),
                handleCode : "queryGsggContext"
            })
        };
        var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
        Loading.loadingShow(cnt);
        AjaxPost.getData(reqDatas)
            .then(function(responseText, textStatus,
                           XMLHttpRequest) {
                Loading.loadingHide();
                var response = Decrypt(responseText.toString(),my);
//                alert(response);
                var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                if(checkResponse(responseTex)){
//                    alert(JSON.stringify(responseText));
                    $scope.title=responseTex.data.contentInfo.TITLE;
                    $scope.yxyf=responseTex.data.contentInfo.YXYF;
                    $("#gsgg001_Content").html(responseTex.data.contentInfo.CONTENT);
                    if (responseTex.data.fileInfo.length > 0) {
                        $scope.gsggfjShow=true;
                        $scope.gsggcontent=responseTex.data.fileInfo;
                    }
                }else{
                    Loading.commonAlert(responseTex.msg,null,null);
                }
            }, function(jqXHR, textStatus, errorThrown) {
                Loading.loadingHide();
                Loading.commonAlert(textStatus);
            })
        $scope.download=function (url) {
            cordova.InAppBrowser.open(url, '_system', 'location=yes');
        }
})
  //减免税申请
  .controller('JmssqCtrl', function ($scope) {
    $scope.name = 'JmssqCtrl';
  })
