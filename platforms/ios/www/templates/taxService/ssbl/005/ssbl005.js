/**
 * Created by gjh on 2016/3/24.
 * 手续费结报
 */
angular.module('ssbl005.controllers', [])

  .config(function ($stateProvider) {
    $stateProvider
      //手续费结报首页
      .state('tab.ssbl005_1', {
        url: '/ssbl005_1',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/005/ssbl005_1.html',
            controller: 'Ssbl005Ctrl1'
          }
        }
      })

      //手续费结报申报
      .state('tab.ssbl005_2', {
        url: '/ssbl005_2',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/005/ssbl005_2.html',
            controller: 'Ssbl005Ctrl2'
          }
        }
      })

      //查看手续费申报信息
      .state('tab.ssbl005_3', {
        url: '/ssbl005_3?lsh',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/005/ssbl005_3.html',
            controller: 'Ssbl005Ctrl3'
          }
        }
      });
  })

  .controller('Ssbl005Ctrl1', function (AppInfo,$scope, $state, $rootScope, $ionicNavBarDelegate, $ionicActionSheet, $timeout, $cacheFactory, $ionicHistory, $ionicModal, Loading, AjaxPost) {
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.back = function () {
      $ionicHistory.goBack();
      $rootScope.hideTabs = '';
    };

    //获取缓存的首选企业
    var currentQY = findSxQyByLocal();
    if (null != currentQY) {
      currentQY.MC = converLongName(currentQY.MC);
    } else {
      currentQY = {};
      currentQY.MC = "未绑定企业"
    }
    $scope.ssbl005_currentQY = currentQY;

    //切换企业的方法
    var qyxxListButtons = [];
    var qyxxList = findAllQyByLocal()==null?[]:findAllQyByLocal();
    for(var i=0;i<qyxxList.length;i++){
      qyxxListButtons.push({text:qyxxList[i].MC});
    }
    $scope.exchangeQY = function(){
      if(qyxxListButtons.length ==0){
        Loading.loadingTimoutHide('没有企业信息');
        return ;
      }
      var hideSheet = $ionicActionSheet.show({
        titleText : '切换企业',
        buttons : qyxxListButtons,
        buttonClicked : function(index){
          currentQY = qyxxList[index] ;
          currentQY.MC = converLongName(currentQY.MC);
          $scope.ssbl005_currentQY = currentQY;
          return true;
        },
        cancelText:'取消',
        cancel : function(){}
      });
      $timeout(function() {
        hideSheet();
      }, 3000);
    }

    var search = function () {
      //获取手续费结报状态信息列表
        var data={
            swglm: currentQY.SWGLM,
            sqlxdm: "SQ077"
        };
        var my = AppInfo.getUUID();
      var reqDatas = {
        jsonData: angular.toJson({
          blhName: "ZBfwBLH",
          data: {
            swglm: currentQY.SWGLM,
            sqlxdm: "SQ077"
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode: "search"
        })
      };
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">查询中...</div></div>');
      AjaxPost.getData(reqDatas).then(function (responseText, textStatus,
                                                XMLHttpRequest) {
        Loading.loadingHide();
          var response = Decrypt(responseText.toString(),my);
//                        alert(response);
          var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if (checkResponse(responseTex)) {
          $scope.ztList = responseTex.data.ZtList;
        } else {
          Loading.commonAlert(responseTex.msg, function () {
            $scope.back();
          });
        }
      }, function (jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus, function () {
          $scope.back();
        });
      })
    }
    search();

    //下拉刷新
    $scope.reLoadPageList = function(){
      search();
      $scope.$broadcast("scroll.refreshComplete");
    }

    $scope.sxfjbsb = function () {
      $state.go("tab.ssbl005_2");
    }

    $scope.queryData = function (lsh) {
      $state.go("tab.ssbl005_3", {"lsh": lsh});
    }
  })

  .controller('Ssbl005Ctrl2', function (AppInfo,$scope, $state, $rootScope, $ionicNavBarDelegate, $cacheFactory, $ionicHistory, $stateParams, $ionicModal, Loading, AjaxPost) {
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.back = function () {
      $ionicHistory.goBack();
      $rootScope.hideTabs = '';
    };

    var ssbl005_yhdm = new Array();
    var ssbl005_yhmc = new Array();
    var ssbl005_yhzh = new Array();
    var ssbl005_rksjq = new Array();
    var ssbl005_rksjz = new Array();
    var ListJkxx = new Array();
    var jbxx = {};
    //获取用户信息
    var currentUser = findUserByLocal();
    //获取缓存的首选企业
    var currentQY = findSxQyByLocal();
    if (null != currentQY) {
      currentQY.MC = converLongName(currentQY.MC);
    } else {
      currentQY = {};
      currentQY.MC = "未绑定企业"
    }
    $scope.ssbl005_currentQY = currentQY;
    $scope.jbxx = jbxx;
    $scope.ssbl005_yhdm = ssbl005_yhdm;
    $scope.ssbl005_yhmc = ssbl005_yhmc;
    $scope.ssbl005_yhzh = ssbl005_yhzh;
        var data={
            swglm: currentQY.SWGLM
        };
        var my = AppInfo.getUUID();
        var reqDatas = {
      jsonData: angular.toJson({
        blhName: "Ssbl005BLH",
        data: {
          swglm: currentQY.SWGLM
        },
          yhwybz : AppInfo.getUUID().toString(),
          bizDataMw : formatStr(data.toString(),my),
        handleCode: "getJbxx"
      })
    };
    //手续费结报申请表填报
    var getJbxx = function () {
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">查询中...</div></div>');
      AjaxPost.getData(reqDatas).then(function (responseText, textStatus,
                                                XMLHttpRequest) {
        Loading.loadingHide();
          var response = Decrypt(responseText.toString(),my);
//                        alert(response);
          var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if (checkResponse(responseTex)) {
          if (typeof(responseTex.data.rkhj_je) != "undefined") {
            var ListYhxx = responseTex.data.listYhxx;
            ListJkxx = responseTex.data.listJkxx;
            $scope.listJkxx = ListJkxx;
            jbxx.rksjq = ListYhxx[0].rksjq;
            jbxx.rksjz = ListYhxx[0].rksjz;
            jbxx.nsrmc = converLongName(responseTex.data.nsr_mc);
            jbxx.yhdm = ListYhxx[0].yh_dm;
            jbxx.yhmc = ListYhxx[0].mc;
            jbxx.yhzh = ListYhxx[0].yh_zh;
            jbxx.rkhj = responseTex.data.rkhj_je;
            jbxx.tkhj = responseTex.data.tkhj_je;
            jbxx.skhj = responseTex.data.skhj_je;
            jbxx.sxfhj = responseTex.data.sxfhj_je;

            for (var i = 0; i < ListYhxx.length; i++) {
              ssbl005_yhdm[i] = ListYhxx[i].yh_dm;
              ssbl005_yhmc[i] = ListYhxx[i].mc;
              ssbl005_yhzh[i] = ListYhxx[i].yh_zh;
              ssbl005_rksjq[i] = ListYhxx[i].rksjq;
              ssbl005_rksjz[i] = ListYhxx[i].rksjz;
            }
          } else {
            Loading.commonAlert("无待结报的数据", function () {
              $scope.back();
            });
          }
        } else {
          Loading.commonAlert(responseTex.msg, function () {
            $scope.back();
          });
        }
      }, function (jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus, function () {
          $scope.back();
        });
      })
    }
    getJbxx();

    $ionicModal.fromTemplateUrl('listJkxx.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.mxListModal = modal;
    });

    $scope.showMxList = function () {
      $scope.mxListModal.show();
    }

    $scope.closeXyModal = function () {
      $scope.mxListModal.hide();
    }



    //手续费结报申请表提交方法
    var submitSqbxx = function () {
        var data={
            swglm: currentQY.SWGLM,
            yd_dm: jbxx.yhdm,
            yh_mc: jbxx.yhmc,
            yh_zh: jbxx.yhzh,
            gljgdm: currentQY.GLJG_DM,
            listmxxx: ListJkxx
        };
        var my = AppInfo.getUUID();
      var submitDatas = {
        jsonData: angular.toJson({
          blhName: "Ssbl005BLH",
          xm: currentUser.XM,
          sjHm: currentUser.SJHM,
          data: {
            swglm: currentQY.SWGLM,
            yd_dm: jbxx.yhdm,
            yh_mc: jbxx.yhmc,
            yh_zh: jbxx.yhzh,
            gljgdm: currentQY.GLJG_DM,
            listmxxx: ListJkxx
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode: "submitSqbxx"
        })
      };
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">数据提交中...</div></div>');
      AjaxPost.getData(submitDatas).then(function (responseText, textStatus,
                                                   XMLHttpRequest) {
        Loading.loadingHide();
          var response = Decrypt(responseText.toString(),my);
//                        alert(response);
          var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if (checkResponse(responseTex)) {
          Loading.commonAlert(responseTex.msg, function () {
            $state.go("tab.ssbl005_1")
          });
        } else {
          Loading.commonAlert(responseTex.msg, function () {
            $scope.back();
          });
        }
      }, function (jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus, function () {
          $scope.back();
        });
      })
    }

    $scope.submitSqbxx = function () {
      if (0 > jbxx.sxfhj) {
        Loading.commonAlert("应结手续费有错误");
      //} else if (ListJkxx.length < 1) {
      //  Loading.commonAlert("无税款详细信息");
      } else {
        Loading.commonConfirm("提交后将不能修改，是否确认提交？", function (buttonIndex) {
          if (buttonIndex) {
            submitSqbxx();
          }
        })
      }
    }

  })
  .controller('Ssbl005Ctrl3', function ($scope, $state, $rootScope, $ionicNavBarDelegate, $cacheFactory, $ionicHistory, $stateParams, $ionicModal, Loading, AjaxPost,AppInfo) {
    $scope.back = function () {
      $ionicHistory.goBack();
    };

    var ssbl005_yhdm = new Array();
    var ssbl005_yhmc = new Array();
    var ssbl005_yhzh = new Array();
    var jbxx = {};
    //获取缓存的首选企业
    var currentQY = findSxQyByLocal();
    if (null != currentQY) {
      currentQY.MC = converLongName(currentQY.MC);
    } else {
      currentQY = {};
      currentQY.MC = "未绑定企业"
    }
    $scope.currentQY = currentQY;
    //$scope.jbxx = jbxx;
    $scope.ssbl005_yhdm = ssbl005_yhdm;
    $scope.ssbl005_yhmc = ssbl005_yhmc;
    $scope.ssbl005_yhzh = ssbl005_yhzh;
    //手续费结报申请表填报
    var queryData = function () {
        var data={
            lsh: $stateParams.lsh
        };
        var my = AppInfo.getUUID();
        var reqDatas = {
            jsonData: angular.toJson({
                blhName: "Ssbl005BLH",
                data: data,
                yhwybz : AppInfo.getUUID().toString(),
                bizDataMw : formatStr(data.toString(),my),
                handleCode: "queryData"
            })
        };
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">查询中...</div></div>');
      AjaxPost.getData(reqDatas).then(function (responseText, textStatus,
                                                XMLHttpRequest) {
        Loading.loadingHide();
          var response = Decrypt(responseText.toString(),my);
//                        alert(response);
          var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if (checkResponse(responseTex)) {
          jbxx = responseTex.data;
          jbxx.nsrmc = converLongName(currentQY.MC);
          $scope.jbxx = jbxx;
          $scope.mxList = responseTex.data.mxList;
        } else {
          Loading.commonAlert(responseTex.msg, function () {
            $scope.back();
          });
        }
      }, function (jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus, function () {
          $scope.back();
        });
      })
    };
    queryData();

    $ionicModal.fromTemplateUrl('mxList.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.mxListModal = modal;
    });

    $scope.showMxList = function () {
      $scope.mxListModal.show();
    }

    $scope.closeXyModal = function () {
      $scope.mxListModal.hide();
    }
  })
