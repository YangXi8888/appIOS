/**
 * Created by Administrator on 2016/3/23.
 * 12w js
 */
angular.module('sbns001.controllers',[])

  .config(function($stateProvider){
    $stateProvider
      //12w申报首页
      .state('tab.sbns001_1', {
        url: '/sbns001_1',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/001/sbns001_1.html',
            controller: 'Sbns001Ctrl1'
          }
        }
      })
    //申报页
      .state('tab.sbns001_2', {
        url: '/sbns001_2',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/001/sbns001_2.html',
            controller: 'Sbns001Ctrl2'
          }
        }
      })
      //已申报明细
      .state('tab.sbns001_3', {
        url: '/sbns001_3?pzxh',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/001/sbns001_3.html',
            controller: 'Sbns001Ctrl3'
          }
        }
      })
      //申报
      .state('tab.sbns001_4', {
        url: '/sbns001_4',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/001/sbns001_4.html',
            controller: 'Sbns001Ctrl4'
          }
        }
      })
      //新增申报
      .state('tab.sbns001_5', {
        url: '/sbns001_5',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/001/sbns001_5.html',
            controller: 'Sbns001Ctrl5'
          }
        }
      })
      //扣款方式
      .state('tab.sbns001_6', {
        url: '/sbns001_6?url&ZFBUrl',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/001/sbns001_6.html',
            controller: 'Sbns001Ctrl6'
          }
        }
      })
      //扣款
      .state('tab.sbns001_7', {
        url: '/sbns001_7?url&payTitle',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/001/sbns001_7.html',
            controller: 'Sbns001Ctrl7'
          }
        }
      })
  })

//12w 首页
  .controller('Sbns001Ctrl1',['$scope','$state','$rootScope','$ionicNavBarDelegate',
      '$timeout','$ionicHistory','Loading','AjaxPost','AppInfo',
        function($scope,$state,$rootScope,$ionicNavBarDelegate,$timeout,
                                      $ionicHistory,Loading,AjaxPost,AppInfo){
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
      $rootScope.hideTabs='';
      $rootScope.sbns001 = null;
    };

    $rootScope.sbns001 = {};
    $rootScope.sbns001.localUser = {};
    $rootScope.sbns001.sbns001_swglm = "";
    $rootScope.sbns001.sbns001_gljgmc = "";
    $rootScope.sbns001.sbns001_zspmList = [];
    $rootScope.sbns001.sbns001_hzList = [];
    $rootScope.sbns001.sbns001_tbrq = "";
    $rootScope.sbns001.sbns001_ssqs = "";
    $rootScope.sbns001.sbns001_ssqz = "";
    $rootScope.sbns001.sbns001_sbqx = "";
    $rootScope.sbns001.sbns001_mxxx = [];//原有税目明细
    $rootScope.sbns001.sbns001_mxxx_add = [];//新增的税目明细
    $rootScope.sbns001.ybtsehj = 0;//应补退税额合计
    $rootScope.sbns001.ybtsehjAdd = 0;//应补退新增

    var sbns001_user = findUserByLocal()==null?{}:findUserByLocal();
    $rootScope.sbns001.localUser = sbns001_user ;
    //去申报
    $scope.shenbao = function () {
      var loadzsjgList = function(){
        Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data={
              zjlxdm : sbns001_user.SFZMLX_DM,
              zjhm : sbns001_user.SFZHM
          };
          var my = AppInfo.getUUID();
          AjaxPost.getData({
          jsonData : angular.toJson({
            blhName : "Sbns001BLH",
            data : {
              zjlxdm : sbns001_user.SFZMLX_DM,
              zjhm : sbns001_user.SFZHM
            },
              yhwybz : AppInfo.getUUID().toString(),
              bizDataMw : formatStr(data.toString(),my),
            handleCode : "queryZrrList"
          })
        }).then(function(responseText, textStatus,
                         XMLHttpRequest) {
            Loading.loadingHide();
              var response = Decrypt(responseText.toString(),my);
//              alert(response);
              var responseTex = JSON.parse(AjaxPost.change(response.toString()));
            if(checkResponse(responseTex)){
              var zrrxxList = responseTex.data.zrrxxList;
              if(zrrxxList.length == 0){
                Loading.commonAlert('没有征收机关');
                return;
              }
              if(zrrxxList.length == 1){
                $rootScope.sbns001.sbns001_swglm = zrrxxList[0].swglm;
                $rootScope.sbns001.sbns001_gljgmc = zrrxxList[0].gljgmc;
              }else{
                var sbns001_options = "";
                for (var i = 0; i < zrrxxList.length; i++) {
                  sbns001_options += "<option value='" + zrrxxList[i].swglm + "'>" + zrrxxList[i].gljgmc + "</option>";
                }
                Loading.commonAlert("<select style='height:50px;width: 100%' id='sbns001_swglmSelect'>" + sbns001_options + "</select>",function(){
                  $rootScope.sbns001.sbns001_swglm = $('#sbns001_swglmSelect').val();
                  $rootScope.sbns001.sbns001_gljgmc = $("#sbns001_swglmSelect").find("option:selected").text();
                },'请选择一个征收机关') ;
              }
              $state.go('tab.sbns001_2');
            }else{
              Loading.commonAlert(responseTex.msg);
            }
          }, function(jqXHR, textStatus, errorThrown) {
            Loading.loadingHide();
            Loading.commonAlert(textStatus);
          })
      }
      loadzsjgList();
    }

//已申报列表
    var loadPageList = function(){
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
        var data={
            zjlxdm : sbns001_user.SFZMLX_DM,
            zjhm : sbns001_user.SFZHM
        };
        var my = AppInfo.getUUID();
        AjaxPost.getData({
        jsonData : angular.toJson({
          blhName : "Sbns001BLH",
          data : {
            zjlxdm : sbns001_user.SFZMLX_DM,
            zjhm : sbns001_user.SFZHM
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode : "querySbList"
        })
      })
        .then(function(responseText, textStatus,
                       XMLHttpRequest) {
          Loading.loadingHide();
                var response = Decrypt(responseText.toString(),my);
//                alert(response);
                var responseTex = JSON.parse(AjaxPost.change(response.toString()));
          if(checkResponse(responseTex)){
            $scope.sbList = responseTex.data.sbList;
            $scope.canShenBao = false;
          }else{
            $scope.canShenBao = true;
            Loading.commonAlert(responseTex.msg);
          }
        }, function(jqXHR, textStatus, errorThrown) {
          Loading.loadingHide();
          $scope.canShenBao = true;
          Loading.commonAlert(textStatus);
        })
    }
    loadPageList();

    $scope.reLoadPageList = function(){
      loadPageList();
      $scope.$broadcast("scroll.refreshComplete");
    }

    $scope.openDetail = function (pzxh) {
        $state.go('tab.sbns001_3',{'pzxh':pzxh});
    }

    $scope.payAgain = function (pzxh) {
      Loading.commonConfirm('进行重新扣款吗？', function (res) {
        if (res) {
          var paySbAgain = function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
              var data={
                  pzxh : pzxh
              };
              var my = AppInfo.getUUID();
              AjaxPost.getData({
              jsonData : angular.toJson({
                blhName : "Sbns001BLH",
                data : {
                  pzxh : pzxh
                },
                  yhwybz : AppInfo.getUUID().toString(),
                  bizDataMw : formatStr(data.toString(),my),
                handleCode : "queryKkUrl"
              })
            })
              .then(function(responseText, textStatus,
                             XMLHttpRequest) {
                Loading.loadingHide();
                      var response = Decrypt(responseText.toString(),my);
//                      alert(response);
                      var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                if(checkResponse(responseTex)){
                  if (responseTex.data.url != null) {
                    var url = responseTex.data.url;
                    //支付页
                    $state.go('tab.sbns001_6',{'url':url});
                  } else {
                    Loading.commonAlert(responseTex.msg, function() {
                      //已申报页
                      loadPageList();
                    });
                  }
                }else{
                  Loading.commonAlert(responseTex.msg);
                }
              }, function(jqXHR, textStatus, errorThrown) {
                Loading.loadingHide();
                Loading.commonAlert(textStatus);
              })
          }();
        }
      })
    }

    $scope.deleteRecord = function (pzxh) {
      Loading.commonConfirm('删除这条记录吗？', function (res) {
        if (res) {
          var deleteSbRecord = function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
              var data={
                  pzxh : pzxh
              };
              var my = AppInfo.getUUID();
              AjaxPost.getData({
              jsonData : angular.toJson({
                blhName : "Sbns001BLH",
                data : {
                  pzxh : pzxh
                },
                  yhwybz : AppInfo.getUUID().toString(),
                  bizDataMw : formatStr(data.toString(),my),
                handleCode : "deleteSbInfo"
              })
            })
              .then(function(responseText, textStatus,
                             XMLHttpRequest) {
                Loading.loadingHide();
                      var response = Decrypt(responseText.toString(),my);
//                      alert(response);
                      var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                if(checkResponse(responseTex)){
                  Loading.commonAlert(responseTex.msg, function () {
                    loadPageList();
                  });
                }else{
                  Loading.commonAlert(responseTex.msg);
                }
              }, function(jqXHR, textStatus, errorThrown) {
                Loading.loadingHide();
                Loading.commonAlert(textStatus);
              })
          }();
        }
      })
    }

  }])
  //已纳税页面
  .controller('Sbns001Ctrl2',['$scope','$state','$rootScope','$ionicNavBarDelegate',
      '$timeout','$ionicHistory','Loading','AjaxPost','$ionicModal','AppInfo',
        function($scope,$state,$rootScope,$ionicNavBarDelegate,$timeout,
                                      $ionicHistory,Loading,AjaxPost,$ionicModal,AppInfo) {
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
    };
    //实例化明细模态窗口
    $ionicModal.fromTemplateUrl('ynseMx.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.ynseMx = modal;
    });

    var sbns001_mxList = null;//已纳税额明细
    var sbns001_user = $rootScope.sbns001.localUser;
    var loadInitList = function(){
      $scope.hasSbList = true;
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
        var data={
            zjlxdm : sbns001_user.SFZMLX_DM,
            zjhm : sbns001_user.SFZHM
        };
        var my = AppInfo.getUUID();
        AjaxPost.getData({
        jsonData : angular.toJson({
          blhName : "Sbns001BLH",
          data : {
            zjlxdm : sbns001_user.SFZMLX_DM,
            zjhm : sbns001_user.SFZHM
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode : "initDataNew",
          xm : sbns001_user.XM
        })
      }).then(function(responseText, textStatus,
                       XMLHttpRequest) {
        Loading.loadingHide();
        $scope.nsrMc = sbns001_user.XM ;
        $scope.zjHm = sbns001_user.SFZHM ;
            var response = Decrypt(responseText.toString(),my);
//            alert(response);
            var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if(checkResponse(responseTex)){
          $scope.hasSbList = false;
          $rootScope.sbns001.sbns001_zspmList = responseTex.data.zspmList;//新增时 ：品目选项
          $rootScope.sbns001.sbns001_hzList = responseTex.data.sbhzList;//汇总
          $rootScope.sbns001.sbns001_tbrq = responseTex.data.tbrq;
          $rootScope.sbns001.sbns001_ssqs = responseTex.data.ssqs;
          $rootScope.sbns001.sbns001_ssqz = responseTex.data.ssqz;
          $rootScope.sbns001.sbns001_sbqx = responseTex.data.sbqxz;
          $scope.sdnf = responseTex.data.sdnf;
          sbns001_mxList = responseTex.data.sbmxList;
          if(responseTex.data.sbhzList == null || responseTex.data.zspmList == null){
            $scope.hasSbList = true;
            Loading.loadingTimoutHide('没有数据');
            return ;
          }
          if( sbns001_mxList != null ){
            //合计已纳税额明细
            var sbns001_dm_je = {},ynseHj = [];
            for (var i=0; i < sbns001_mxList.length; i++) {
              var zspm = sbns001_mxList[i].zspm_dm + "#" + sbns001_mxList[i].zspm_mc;
              var ynse = sbns001_mxList[i].ybtse_je;
              if (!( zspm in sbns001_dm_je)) {
                sbns001_dm_je[zspm] = parseFloat(ynse).toFixed(2);
              } else {
                sbns001_dm_je[zspm] = (parseFloat(sbns001_dm_je[zspm]) + parseFloat(ynse)).toFixed(2);
              }
            }
            for (var k in sbns001_dm_je) {
              ynseHj.push({'zspm_dm':k.split("#")[0],'zspm_mc':k.split("#")[1],'ybtse_je':sbns001_dm_je[k]});
            }
          }
          $scope.ynseHj = ynseHj;
        }else{
          $scope.hasSbList = true;
          Loading.commonAlert(responseTex.msg);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus);
      })
    }
    loadInitList();
    $scope.loadInitList = function(){
      loadInitList();
      $scope.$broadcast("scroll.refreshComplete");
    }

    $scope.openMxModal = function (zspmDm) {
      var ynseMxList = []; //已纳税额明细
      for (var i = 0; i < sbns001_mxList.length; i++) {
        if (sbns001_mxList[i].zspm_dm == zspmDm) {
          ynseMxList.push({'ssq':sbns001_mxList[i].sfssqq + "~" + sbns001_mxList[i].sfssqz,
            'ybtse_je':sbns001_mxList[i].ybtse_je,'kjdw_mc':sbns001_mxList[i].kjdw_mc,
            'zsjg_mc':sbns001_mxList[i].zsjg_mc,'gljg_mc':sbns001_mxList[i].gljg_mc});
        }
      }
      $scope.ynseMxList = ynseMxList ;
      $scope.ynseMx.show();
    }

    $scope.closeMxModal = function () {
      $scope.ynseMx.hide();
    }

    $scope.goSb = function(){
      $state.go('tab.sbns001_4');
    }

  }])
  //已申报明细页
  .controller('Sbns001Ctrl3',['$scope','$state','$rootScope','$ionicNavBarDelegate',
      '$timeout','$ionicHistory','Loading','AjaxPost','$stateParams','$ionicScrollDelegate','AppInfo',
        function($scope,$state,$rootScope,$ionicNavBarDelegate,$timeout,
                                      $ionicHistory,Loading,AjaxPost,$stateParams,$ionicScrollDelegate,AppInfo) {
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
    };

    var sbns001_cal = null, sbns001_arrCal = new Array(),emptyArr = new Array();
    emptyArr.push("sbns001_ybTse");
    sbns001_arrCal.push({
      GS : "sbns001_nsdhHj = sbns001_nsdhJw + sbns001_nsdhJn",
      GSLX : "X"
    }, {
      GS : "sbns001_nsdhJn_hj = sbns001_nsdhJn",
      GSLX : "Y"
    }, {
      GS : "sbns001_nsdhJw_hj = sbns001_nsdhJw",
      GSLX : "Y"
    }, {
      GS : "sbns001_nsdhHj_hj = sbns001_nsdhHj",
      GSLX : "Y"
    }, {
      GS : "sbns001_ynssde_hj = sbns001_ynssde",
      GSLX : "Y"
    }, {
      GS : "sbns001_ynse_hj = sbns001_ynse",
      GSLX : "Y"
    }, {
      GS : "sbns001_yjKse_hj = sbns001_yjKse",
      GSLX : "Y"
    }, {
      GS : "sbns001_dkse_hj = sbns001_dkse",
      GSLX : "Y"
    }, {
      GS : "sbns001_jmse_hj = sbns001_jmse",
      GSLX : "Y"
    }, {
      GS : "sbns001_ybTse_hj = sbns001_ybTse",
      GSLX : "Y"
    });
            var data={
                pzxh : $stateParams.pzxh
            };
            var my = AppInfo.getUUID();
    var reqDatas = {
      jsonData : angular.toJson({
        blhName : "Sbns001BLH",
        data : {
          pzxh : $stateParams.pzxh
        },
          yhwybz : AppInfo.getUUID().toString(),
          bizDataMw : formatStr(data.toString(),my),
        handleCode : "querySbmxList"
      })
    };
    var loadSbmxList = function(){
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
      AjaxPost.getData(reqDatas)
        .then(function(responseText, textStatus,
                       XMLHttpRequest) {
          Loading.loadingHide();
              var response = Decrypt(responseText.toString(),my);
//              alert(response);
              var responseTex = JSON.parse(AjaxPost.change(response.toString()));
          if(checkResponse(responseTex)){
            $scope.sbmxList = responseTex.data.sbmxList;
            if($scope.sbmxList == 0){
              Loading.commonAlert('没有查询到详细数据');
              return ;
            }
            $scope.sdNf = $scope.sbmxList[0].ssqz.substr(0, 4);
            $scope.tbRq = responseTex.data.tbrq;
            $timeout(function () {
              $('#sbns001_table1').footable();
              //公式计算
              sbns001_cal = null;
              sbns001_cal = new caltb("sbns001_table1");
              sbns001_cal.setEmptyArr(emptyArr);
              sbns001_cal.setRules(sbns001_arrCal);
              initCalTable(sbns001_cal);
              caltbF(sbns001_cal);
              sbns001_cal.customrulesEnd=function(){
                  calHj();
              }
            },0)
          }else{
            Loading.commonAlert(responseTex.msg);
          }
        }, function(jqXHR, textStatus, errorThrown) {
          Loading.loadingHide();
          Loading.commonAlert(textStatus);
        })
    }
    loadSbmxList();

    function calHj(){
      var hj = document.getElementsByName("sbns001_ybTse_hj")[0];
      var ybtse = document.getElementsByName("sbns001_ybTse");
      var temp = 0;
      for(var i=0;i<ybtse.length;i++){
        if(ybtse[i].value>0 && ybtse[i].value<1){
          ybtse[i].value = (0).toFixed(2);
        }
        temp += parseFloat(ybtse[i].value);
      }
      hj.value = temp.toFixed(2);
    }

    $scope.resizeScrollY = function () {
      $ionicScrollDelegate.resize();
    }
  }])
//申报
  .controller('Sbns001Ctrl4',['$scope','$state','$rootScope','$ionicNavBarDelegate',
      '$timeout','$ionicHistory','Loading','AjaxPost','$ionicModal','$ionicScrollDelegate','AppInfo',
        function($scope,$state,$rootScope,$ionicNavBarDelegate,$timeout,
                                      $ionicHistory,Loading,AjaxPost,$ionicModal,$ionicScrollDelegate,AppInfo) {
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.back = function () {
      $ionicHistory.goBack();
    };
    //实例化新增模态窗口
    $ionicModal.fromTemplateUrl('addModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.addModal = modal;
    });
    var sbns001_cal = null, sbns001_arrCal = new Array(),emptyArr = new Array();
    emptyArr.push("sbns001_ybTse");
    sbns001_arrCal.push({
      GS : "sbns001_nsdhHj = sbns001_nsdhJw + sbns001_nsdhJn",
      GSLX : "X"
    }, {
      GS : "sbns001_ybTse = sbns001_ynse - sbns001_yjKse - sbns001_dkse - sbns001_jmse",
      GSLX : "X"
    }, {
      GS : "sbns001_nsdhJn_hj = sbns001_nsdhJn",
      GSLX : "Y"
    }, {
      GS : "sbns001_nsdhJw_hj = sbns001_nsdhJw",
      GSLX : "Y"
    }, {
      GS : "sbns001_nsdhHj_hj = sbns001_nsdhHj",
      GSLX : "Y"
    }, {
      GS : "sbns001_ynssde_hj = sbns001_ynssde",
      GSLX : "Y"
    }, {
      GS : "sbns001_ynse_hj = sbns001_ynse",
      GSLX : "Y"
    }, {
      GS : "sbns001_yjKse_hj = sbns001_yjKse",
      GSLX : "Y"
    }, {
      GS : "sbns001_dkse_hj = sbns001_dkse",
      GSLX : "Y"
    }, {
      GS : "sbns001_jmse_hj = sbns001_jmse",
      GSLX : "Y"
    }, {
      GS : "sbns001_ybTse_hj = sbns001_ybTse",
      GSLX : "Y"
    });
    $scope.sdNf = $rootScope.sbns001.sbns001_ssqz.substr(0, 4);
    $scope.hzList = $rootScope.sbns001.sbns001_hzList ;
    $timeout(function () {
      $('#sbns001_table3').footable();
      sbns001_cal = null;
      sbns001_cal = new caltb("sbns001_table3");
      sbns001_cal.setEmptyArr(emptyArr);
      sbns001_cal.setRules(sbns001_arrCal);
      initCalTable(sbns001_cal);
      caltbF(sbns001_cal);
      sbns001_cal.customrulesEnd=function(){
        calHj();
      }
    },0);

    function calHj(){
      var hj = document.getElementsByName("sbns001_ybTse_hj")[0];
      var ybtse = document.getElementsByName("sbns001_ybTse");
      var temp = 0;
      for(var i=0;i<ybtse.length;i++){
        if(ybtse[i].value>0 && ybtse[i].value<1){
          ybtse[i].value = (0).toFixed(2);
        }
        temp += parseFloat(ybtse[i].value);
      }
      hj.value = temp.toFixed(2);
    }

      function sbns001ValidateMxxx(){
        caltbF(sbns001_cal);
        var sbns001_mxxx = [];
        var zspm = document.getElementsByName('sbns001_zspm');
        var nsdhJn = document.getElementsByName('sbns001_nsdhJn');
        var nsdhJw = document.getElementsByName('sbns001_nsdhJw');
        var ynssde = document.getElementsByName('sbns001_ynssde');
        var ynse = document.getElementsByName('sbns001_ynse');
        var yjKse = document.getElementsByName('sbns001_yjKse');
        var dkse = document.getElementsByName('sbns001_dkse');
        var jmse = document.getElementsByName('sbns001_jmse');
        var ybTse = document.getElementsByName('sbns001_ybTse');
        var nsdeHj = parseFloat(document.getElementsByName('sbns001_nsdhHj_hj').item(0).value);
        var ynssdeHj = parseFloat(document.getElementsByName('sbns001_ynssde_hj').item(0).value);

        if (zspm.length == 0) {
          return false;
        }
        if (nsdeHj < 120000) {
          Loading.commonAlert('"年所得额合计"应大于等于12万!');
          return false;
        }
        if (parseFloat(ynssdeHj) > parseFloat(nsdeHj)) {
          Loading.commonAlert('"应纳税所得额"之和应小于等于"年所得额"之和!');
          return false;
        }
        for (var i = 0; i < zspm.length; i++) {
          var sub_zspmdm = zspm[i].getAttribute("data-zspmdm");
          var sub_zspmmc = zspm[i].innerText;
          var sub_nsdhJn = nsdhJn[i].value;
          if (sub_nsdhJn == "") {
            Loading.commonAlert(sub_zspmmc + "中,'境内收入'未填写!");
            return false;
          }
          if (parseFloat(sub_nsdhJn) < 0) {
            Loading.commonAlert(sub_zspmmc + "中,'境内收入'应大于等于零!");
            return false;
          }
          var sub_nsdhJw = nsdhJw[i].value;
          if (parseFloat(sub_nsdhJw) < 0) {
            Loading.commonAlert(sub_zspmmc + "中,'境外收入'应大于等于零!");
            return false;
          }
          var sub_ynssde = ynssde[i].value;
          var sub_ynse = ynse[i].value;
          if (sub_ynse == "" || sub_ynssde == "") {
            Loading.commonAlert(sub_zspmmc + "中,'应纳税额'或'应纳税所得额'未填写!");
            return false;
          }
          if (parseFloat(sub_ynse) > parseFloat(sub_ynssde)) {
            Loading.commonAlert(sub_zspmmc + "中,'应纳税额'应小于等于'应纳税所得额'!");
            return false;
          }
          var sub_yjKse = yjKse[i].value;
          var sub_dkse = dkse[i].value;
          var sub_jmse = jmse[i].value;
          if (parseFloat(sub_dkse) + parseFloat(sub_jmse) > parseFloat(sub_ynse)) {
            Loading.commonAlert(sub_zspmmc + "中,'应纳税额'应大于等于'抵扣税额'和'减免税额'之和!");
            return false;
          }
          var sub_ybTse = ybTse[i].value;
          sbns001_mxxx.push({
            zspmdm : sub_zspmdm,
            jnsde : sub_nsdhJn,
            jwsde : sub_nsdhJw,
            ynssde : sub_ynssde,
            ynse : sub_ynse,
            yjkse : sub_yjKse,
            dkse : sub_dkse,
            jmse : sub_jmse,
            ybtse : sub_ybTse
          });
        }
        $rootScope.sbns001.sbns001_mxxx = sbns001_mxxx ;
        $rootScope.sbns001.ybtsehj = document.getElementById("sbns001_ybTse_hj").value;
        console.log("试算的应补退税额合计:"+$rootScope.sbns001.ybtsehj );
        console.log("试算的税额明细:"+angular.toJson($rootScope.sbns001.sbns001_mxxx));
        return true;
      }
//直接提交
    $scope.goSubmit = function(){
      if(!sbns001ValidateMxxx())
          return ;
      //提交
      var submitSbList = function(){
        Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data={
              mxxx : $rootScope.sbns001.sbns001_mxxx,
              ssqq : $rootScope.sbns001.sbns001_ssqs,
              ssqz : $rootScope.sbns001.sbns001_ssqz,
              swglm : $rootScope.sbns001.sbns001_swglm,
              tbrq : $rootScope.sbns001.sbns001_tbrq,
              sbqx : $rootScope.sbns001.sbns001_sbqx,
              ybtsehj : $rootScope.sbns001.ybtsehj
          };
          var my = AppInfo.getUUID();
          AjaxPost.getData( {
          jsonData : angular.toJson({
            blhName : "Sbns001BLH",
            data : {
            	mxxx : $rootScope.sbns001.sbns001_mxxx,
                ssqq : $rootScope.sbns001.sbns001_ssqs,
                ssqz : $rootScope.sbns001.sbns001_ssqz,
                swglm : $rootScope.sbns001.sbns001_swglm,
                tbrq : $rootScope.sbns001.sbns001_tbrq,
                sbqx : $rootScope.sbns001.sbns001_sbqx,
                ybtsehj : $rootScope.sbns001.ybtsehj
            },
              yhwybz : AppInfo.getUUID().toString(),
              bizDataMw : formatStr(data.toString(),my),
            handleCode : "saveData"
          })
        })
          .then(function(responseText, textStatus,
                         XMLHttpRequest) {
            Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),my);
//                  alert(response);
                  var responseTex = JSON.parse(AjaxPost.change(response.toString()));
            if(checkResponse(responseTex)){
              console.log("url链接 :"+angular.toJson(responseTex.data));
              if (responseTex.data.url != null || responseTex.data.ZFBUrl != null) {
                var url = responseTex.data.url;
                var ZFBUrl = responseTex.data.ZFBUrl;
               //支付页
                $state.go('tab.sbns001_6',{'url':url,'ZFBUrl':ZFBUrl});
              } else {
                Loading.commonAlert(responseTex.msg, function() {
                  //已申报页
                  $state.go('tab.sbns001_1');
                });
              }
            }else{
              Loading.commonAlert(responseTex.msg);
            }
          }, function(jqXHR, textStatus, errorThrown) {
            Loading.loadingHide();
            Loading.commonAlert(textStatus);
          })
      }
      Loading.commonConfirm('确定提交申报？', function (res) {
        if (res) {
          submitSbList();
        }
      })
    }

    $scope.addRecord = function () {
      //调用验证
      if(!sbns001ValidateMxxx())
        return ;

      $scope.addModal.show();
      $scope.currentRecord = {};
    }
    $scope.closeAddModal = function () {
      $scope.addModal.hide();
    }

    $scope.saveRecord = function (currentRecord) {
      var sdxm = $("#sbns001_4_sdxm");
      var nsdeHj = document.getElementById("sbns001_4_nsdehj");
      var ybtse = document.getElementById("sbns001_4_ybtse");
      if(sdxm.val()==''){
        Loading.commonAlert('请选择所得项目');
        return ;
      }
      if (parseFloat(currentRecord.nsdejn) < 0 || parseFloat(currentRecord.nsdejw) < 0) {
        Loading.commonAlert("'境内(外)收入'应大于等于零!");
        return;
      }
      if (parseFloat(currentRecord.ynse) > parseFloat(currentRecord.ynssde)) {
        Loading.commonAlert("'应纳税额'应小于等于'应纳税所得额'!");
        return;
      }
      if (parseFloat(currentRecord.dkse) + parseFloat(currentRecord.jmse) > parseFloat(currentRecord.ynse)) {
        Loading.commonAlert("'应纳税额'应大于等于'抵扣税额'和'减免税额'之和!");
        return;
      }

     $rootScope.sbns001.sbns001_mxxx_add.push({'zspm_dm':sdxm.val(),
       'zspm_mc':sdxm.find("option:selected").text(),'nsdeHj':parseFloat(nsdeHj.value==''?0:nsdeHj.value).toFixed(2),
       'ybtse_je':parseFloat(ybtse.value).toFixed(2),'hjsre_je':parseFloat(currentRecord.nsdejn==undefined?0:currentRecord.nsdejn).toFixed(2),
       'jwsre_je':parseFloat(currentRecord.nsdejw==undefined?0:currentRecord.nsdejw).toFixed(2),'ynssde_je':parseFloat(currentRecord.ynssde==undefined?0:currentRecord.ynssde).toFixed(2),
       'ynse_je':parseFloat(currentRecord.ynse==undefined?0:currentRecord.ynse).toFixed(2),'yjkse_je':parseFloat(currentRecord.yjkse==undefined?0:currentRecord.yjkse).toFixed(2),
       'dkse_je':parseFloat(currentRecord.dkse==undefined?0:currentRecord.dkse).toFixed(2),'misse_je':parseFloat(currentRecord.jmse==undefined?0:currentRecord.jmse).toFixed(2)});

      $rootScope.sbns001.ybtsehjAdd = 0;
      var sbns001_mxxx_add = $rootScope.sbns001.sbns001_mxxx_add;
      for(var i=0;i<sbns001_mxxx_add.length;i++){
        $rootScope.sbns001.ybtsehjAdd =  parseFloat($rootScope.sbns001.ybtsehjAdd)+parseFloat(sbns001_mxxx_add[i].ybtse_je);
      }
      console.log("当前新增的记录为 ："+angular.toJson(currentRecord));
      Loading.commonConfirm('继续新增税目？', function (res) {
        if (res) {
          //清空后继续新增税目
          $scope.currentRecord = {};
        }else {
          $scope.addModal.hide();
          $state.go('tab.sbns001_5');
        }
      })
    }

    $scope.resizeScrollY = function () {
      $ionicScrollDelegate.resize();
    }
  }])
  //新增列表
  .controller('Sbns001Ctrl5',['$scope','$state','$rootScope','$ionicNavBarDelegate','$ionicActionSheet',
      '$timeout','$ionicHistory','Loading','AjaxPost','$ionicModal','AppInfo',
        function($scope,$state,$rootScope,$ionicNavBarDelegate,$ionicActionSheet,
                                      $timeout,$ionicHistory,Loading,AjaxPost,$ionicModal,AppInfo) {
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.back = function () {
      $ionicHistory.goBack();
    };
    //实例化新增模态窗口
    $ionicModal.fromTemplateUrl('editModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.editModal = modal;
    });
    $ionicModal.fromTemplateUrl('addModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.addModal = modal;
    });
    $scope.addList = $rootScope.sbns001.sbns001_mxxx_add ;

    /**暂时不用 ，直接提交 ，不进行二次新增税目**/
   /* $scope.openMenus = function () {
      var hideSheet = $ionicActionSheet.show({
        titleText : '',
        buttons : [{text:'提交'},{text:'新增税目'}],
        buttonClicked : function(index){
          if(index==0){
            goSubmit();
          }
          if(index==1){
            $scope.addModal.show();
          }
          return true;
        },
        cancalText:'取消',
        cancal : function(){}
      });
      $timeout(function() {
        hideSheet();
      }, 3000);
    }*/
      //add
    $scope.closeAddModal = function () {
      $scope.addModal.hide();
    }
    $scope.saveAddRecord = function () {
      $scope.addModal.hide();
    }
    //edit
    $scope.editItem = function (item) {
      $scope.item = item ;
      $scope.editModal.show();
    }
    $scope.closeEditModal = function () {
      $scope.editModal.hide();
    }
    /*$scope.saveEditRecord = function () {
      //保存编辑
      $scope.editModal.hide();
    }*/
    $scope.deleteItem = function (item) {
      $scope.addList.splice($scope.addList.indexOf(item),1);
      $rootScope.sbns001.ybtsehjAdd = $rootScope.sbns001.ybtsehjAdd-item.ybtse_je ;
      $rootScope.sbns001.ybtsehjAll = parseFloat($rootScope.sbns001.ybtsehjAdd)+parseFloat($rootScope.sbns001.ybtsehj);
    }
    var addListwatch = $scope.$watch('addList', function (n,o) {
      if(n.length == 0){
        $scope.hasAddList = false;
      }else{
        $scope.hasAddList = true;
      }
    },true) ;

    $rootScope.sbns001.ybtsehjAll = parseFloat($rootScope.sbns001.ybtsehjAdd)+parseFloat($rootScope.sbns001.ybtsehj);

    //提交
    var submitAllSbList = function(mxxx,ybtsehj){
      var nsdeHje = 0;
      for(var i=0;i<mxxx.length;i++){
        nsdeHje = parseFloat(nsdeHje) + parseFloat(mxxx[i].hjsre_je)+parseFloat(mxxx[i].jwsde);
      }
      if(nsdeHje<120000){
        Loading.commonAlert('"年所得额合计"应大于等于12万!');
        return ;
      }
      console.log("最终提交时ybtsehj :"+ybtsehj+",add :"+$rootScope.sbns001.ybtsehjAdd+",old :"+$rootScope.sbns001.ybtsehj);
      console.log("最终提交时明细数据 :"+angular.toJson(mxxx));
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
        var data={
            mxxx : mxxx,
            ssqq : $rootScope.sbns001.sbns001_ssqs,
            ssqz : $rootScope.sbns001.sbns001_ssqz,
            swglm : $rootScope.sbns001.sbns001_swglm,
            tbrq : $rootScope.sbns001.sbns001_tbrq,
            sbqx : $rootScope.sbns001.sbns001_sbqx,
            ybtsehj : ybtsehj
        };
        var my = AppInfo.getUUID();
        AjaxPost.getData( {
        jsonData : angular.toJson({
          blhName : "Sbns001BLH",
          data : {
            mxxx : mxxx,
            ssqq : $rootScope.sbns001.sbns001_ssqs,
            ssqz : $rootScope.sbns001.sbns001_ssqz,
            swglm : $rootScope.sbns001.sbns001_swglm,
            tbrq : $rootScope.sbns001.sbns001_tbrq,
            sbqx : $rootScope.sbns001.sbns001_sbqx,
            ybtsehj : ybtsehj
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode : "saveData"
        })
      })
        .then(function(responseText, textStatus,
                       XMLHttpRequest) {
          Loading.loadingHide();
                var response = Decrypt(responseText.toString(),my);
//                alert(response);
                var responseTex = JSON.parse(AjaxPost.change(response.toString()));
          if(checkResponse(responseTex)){
            if (responseTex.data.url != null || responseTex.data.ZFBUrl != null) {
              addListwatch();
              var url = responseTex.data.url;
              var ZFBUrl = responseTex.data.ZFBUrl;
              //支付页
              $state.go('tab.sbns001_6',{'url':url,'ZFBUrl':ZFBUrl});
            } else {
              Loading.commonAlert(responseTex.msg, function() {
                addListwatch();
                //已申报页
                $state.go('tab.sbns001_1');
              });
            }
          }else{
            Loading.commonAlert(responseTex.msg);
          }
        }, function(jqXHR, textStatus, errorThrown) {
          Loading.loadingHide();
          Loading.commonAlert(textStatus);
        })
    }
    $scope.goSubmit = function(){
      var allSbList = [],msg = '';
      if($scope.addList.length == 0){
        msg = '没有新增税目记录了，直接提交吗？';
      }
      Loading.commonConfirm(msg==''?'确定提交申报？':msg, function (res) {
        if (res) {
          if($scope.addList.length == 0){
            //无新增项目  直接提交试算部分
            submitAllSbList($rootScope.sbns001.sbns001_mxxx,$rootScope.sbns001.ybtsehj);
          }else{
            //新增项目+试算
            for(var i=0;i<$scope.addList.length;i++){
              allSbList.push(
                {
                  zspmdm : $scope.addList[i].zspm_dm,
                  jnsde : $scope.addList[i].hjsre_je,
                  jwsde : $scope.addList[i].jwsre_je,
                  ynssde : $scope.addList[i].ynssde_je,
                  ynse : $scope.addList[i].ynse_je,
                  yjkse : $scope.addList[i].yjkse_je,
                  dkse : $scope.addList[i].dkse_je,
                  jmse : $scope.addList[i].misse_je,
                  ybtse : $scope.addList[i].ybtse_je
                }
              );
            }
            Array.prototype.push.apply(allSbList,$rootScope.sbns001.sbns001_mxxx);
            var ybtseHj = parseFloat($rootScope.sbns001.ybtsehjAdd)+parseFloat($rootScope.sbns001.ybtsehj) ;
            submitAllSbList(allSbList,ybtseHj.toFixed(2));
          }
        }
      })
    }
  }])
  //选择扣款方式
  .controller('Sbns001Ctrl6',['$scope','$state','$rootScope','$ionicNavBarDelegate','$stateParams','$timeout','$window',
      function($scope,$state,$rootScope,$ionicNavBarDelegate,$stateParams,$timeout,$window) {
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.closePayPage1 = function () {
      $window.location.href = 'index.html#/tab/taxService';
    }
    var url = $stateParams.url ;
    var ZFBUrl = $stateParams.ZFBUrl ;
    if(url != null){
      $scope.canYlpay = true;
    }
    if(ZFBUrl != null){
      $scope.canAlipay = true;
    }
    $scope.payOrder = function(type){
    	if(type==1){
    		$state.go('tab.sbns001_7',{'url':ZFBUrl,'payTitle':'支付宝支付'});
    	}
    	if(type==2){
    		$state.go('tab.sbns001_7',{'url':url,'payTitle':'银联支付'});
    	}
    }
  }])
  //扣款页
  .controller('Sbns001Ctrl7',['$scope','$state','$rootScope','$ionicNavBarDelegate','$stateParams','$timeout','$window','$ionicHistory',
      function($scope,$state,$rootScope,$ionicNavBarDelegate,$stateParams,$timeout,$window,$ionicHistory) {
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.back = function () {
       $ionicHistory.goBack();
    };
    $scope.closePayPage2 = function () {
      $window.location.href = 'index.html#/tab/taxService';
    }
    $scope.kkfs = $stateParams.payTitle ;
    $("#sbns001_iframe").css("height",window.innerHeight+"px");
    $("#sbns001_iframe").prop("src", $stateParams.url);
  }])

