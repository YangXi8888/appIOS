/**
 * Created by gjh on 2016/3/24.
 * 手续费结报
 */
angular.module('ssbl006.controllers', [])

  .config(function ($stateProvider) {
    $stateProvider
      //联系方式变更首页
      .state('tab.ssbl006_1', {
        url: '/ssbl006_1',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/006/ssbl006_1.html',
            controller: 'Ssbl006Ctrl1'
          }
        }
      })
      //联系方式变更申请表
      .state('tab.ssbl006_2', {
        url: '/ssbl006_2',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/006/ssbl006_2.html',
            controller: 'Ssbl006Ctrl2'
          }
        }
      });
  })

  .controller('Ssbl006Ctrl1', function (AppInfo,$scope, $state, $rootScope, $ionicNavBarDelegate, $ionicActionSheet, $timeout, $cacheFactory, $ionicHistory, $ionicModal, Loading, AjaxPost) {
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
      currentQY.MC = "未绑定企业";
    }
    $scope.ssbl006_currentQY = currentQY;
    var jbxx = {};
    $scope.jbxx = jbxx;

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
          $scope.ssbl006_currentQY = currentQY;
          return true;
        },
        cancelText:'取消',
        cancel : function(){}
      });
      $timeout(function() {
        hideSheet();
      }, 3000);
    }

        var data={
            swglm: currentQY.SWGLM,
            sqlxdm: "SQQQQ"
        };
        var my = AppInfo.getUUID();
    //获取联系方式变更状态信息列表
    var reqDatas = {
      jsonData: angular.toJson({
        blhName: "ZBfwBLH",
        data: data,
          yhwybz : AppInfo.getUUID().toString(),
          bizDataMw : formatStr(data.toString(),my),
        handleCode: "search"
      })
    };
    var search = function () {
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">数据初始化中...</div></div>');
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

    $scope.lxfsbgsq = function () {
      $state.go("tab.ssbl006_2");
    }
    //查看受理意见
    $scope.querySlyj = function (lsh, bbzt, lcslh) {
      //获取受理意见信息
        var data={
            lsh:lsh,
            bbzt:bbzt,
            lcslh:lcslh
        };
        var my = AppInfo.getUUID();
      var reqDatas = {
        jsonData:angular.toJson({
          blhName:"ZBfwBLH",
          data:{
            lsh:lsh,
            bbzt:bbzt,
            lcslh:lcslh
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode:"querySlyj"
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
          var slyj = responseTex.data.slyjList;
          $scope.ssbl006_slyj = slyj;
          $scope.slyjModal.show();
        } else {
          Loading.commonAlert(responseTex.msg);
        }
      }, function (jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus);
      })


    }
    //查看联系方式变更申请信息
    $scope.queryData = function (lsh) {
        var data={
            lsh: lsh
        };
        var my = AppInfo.getUUID();
        var reqDatas = {
        jsonData: angular.toJson({
          blhName: "Ssbl006BLH",
          data: {
            lsh: lsh
          },
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
          jbxx.cwfzr_gddh = NullTOEmpty(responseTex.data.cwfzrgddhx1);
          jbxx.cwfzr_yddh = NullTOEmpty(responseTex.data.cwfzryddhx1);
          jbxx.bsry1_xm = NullTOEmpty(responseTex.data.bsryxmx1);
          jbxx.bsry1_zjzl = NullTOEmpty(responseTex.data.bsryzjlxx1);
          jbxx.bsry1_zjhm = NullTOEmpty(responseTex.data.bsryzjhx1);
          jbxx.bsry1_gddh = NullTOEmpty(responseTex.data.bsrygddhx1);
          jbxx.bsry1_yddh = NullTOEmpty(responseTex.data.bsryyddhx1);
          jbxx.bsry2_xm = NullTOEmpty(responseTex.data.bsryxmx2);
          jbxx.bsry2_zjzl = NullTOEmpty(responseTex.data.bsryzjlxx2);
          jbxx.bsry2_zjhm = NullTOEmpty(responseTex.data.bsryzjhx2);
          jbxx.bsry2_gddh = NullTOEmpty(responseTex.data.bsrygddhx2);
          jbxx.bsry2_yddh = NullTOEmpty(responseTex.data.bsryyddhx2);
          jbxx.bsry3_xm = NullTOEmpty(responseTex.data.bsryxmx3);
          jbxx.bsry3_zjzl = NullTOEmpty(responseTex.data.bsryzjlxx3);
          jbxx.bsry3_zjhm = NullTOEmpty(responseTex.data.bsryzjhx3);
          jbxx.bsry3_gddh = NullTOEmpty(responseTex.data.bsrygddhx3);
          jbxx.bsry3_yddh = NullTOEmpty(responseTex.data.bsryyddhx3);
          jbxx.sqly = NullTOEmpty(responseTex.data.sqly);
          var $inputValues = document.getElementsByName("inputValues");
          for (var i = 0; i < $inputValues.length; i++) {
            $inputValues[i].readOnly = true;
          }
          var $checkboxs = document.getElementsByName("checkboxs");
          for (var i = 0; i < $checkboxs.length; i++) {
            $checkboxs[i].disabled = "disabled";
          }
          $scope.mxListModal.show();
        } else {
          Loading.commonAlert(responseTex.msg, function () {
            $scope.mxListModal.hide();
          });
        }
      }, function (jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus, function () {
          $scope.mxListModal.hide();
        });
      })

    }

    $ionicModal.fromTemplateUrl('mxInfo.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.mxListModal = modal;
    });

    $scope.closeXyModal = function () {
      $scope.mxListModal.hide();
    }

    $ionicModal.fromTemplateUrl('slyj.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.slyjModal = modal;
    });

    $scope.closeSlyjModal = function () {
      $scope.slyjModal.hide();
    }
  })

  .controller('Ssbl006Ctrl2', function (AppInfo,$scope, $state, $rootScope, $ionicNavBarDelegate, $ionicActionSheet, $timeout, $cacheFactory, $ionicHistory, $ionicModal, Loading, AjaxPost) {
    $scope.back = function () {
      $ionicHistory.goBack();
    };
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
    $scope.ssbl006_currentQY = currentQY;
    var jbxx = {};
    $scope.jbxx = jbxx;
    //复选框选中事件
    var checkboxOnClick = function () {
      if ($(this).is(":checked")) {
        $(this).prev().attr("readonly", "readonly");
        $(this).prev().val($(this).prev().attr("tag"));
      } else {
        $(this).prev().removeAttr("readonly");
      }
    }
    $("input[name=checkboxs]").click(checkboxOnClick);

    //初始化页面
    var initForm = function () {
        var data={
            swglm: currentQY.SWGLM
        };
        var my = AppInfo.getUUID();
      var reqDatas = {
        jsonData: angular.toJson({
          blhName: "Ssbl006BLH",
          data: {
            swglm: currentQY.SWGLM
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode: "initForm"
        })
      };
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">正在加载...</div></div>');
      AjaxPost.getData(reqDatas).then(function (responseText, textStatus,
                                                XMLHttpRequest) {
        Loading.loadingHide();
          var response = Decrypt(responseText.toString(),my);
//                        alert(response);
          var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if (checkResponse(responseTex)) {
          jbxx.cwfzr_gddh = NullTOEmpty(responseTex.data.cwfzrgddhx1);
          jbxx.cwfzr_yddh = NullTOEmpty(responseTex.data.cwfzryddhx1);
          jbxx.bsry1_xm = NullTOEmpty(responseTex.data.bsryxmx1);
          jbxx.bsry1_zjzl = NullTOEmpty(responseTex.data.bsryzjlxx1);
          jbxx.bsry1_zjhm = NullTOEmpty(responseTex.data.bsryzjhx1);
          jbxx.bsry1_gddh = NullTOEmpty(responseTex.data.bsrygddhx1);
          jbxx.bsry1_yddh = NullTOEmpty(responseTex.data.bsryyddhx1);

          jbxx.bsry2_xm = NullTOEmpty(responseTex.data.bsryxmx2);
          jbxx.bsry2_zjzl = NullTOEmpty(responseTex.data.bsryzjlxx2);
          jbxx.bsry2_zjhm = NullTOEmpty(responseTex.data.bsryzjhx2);
          jbxx.bsry2_gddh = NullTOEmpty(responseTex.data.bsrygddhx2);
          jbxx.bsry2_yddh = NullTOEmpty(responseTex.data.bsryyddhx2);

          jbxx.bsry3_xm = NullTOEmpty(responseTex.data.bsryxmx3);
          jbxx.bsry3_zjzl = NullTOEmpty(responseTex.data.bsryzjlxx3);
          jbxx.bsry3_zjhm = NullTOEmpty(responseTex.data.bsryzjhx3);
          jbxx.bsry3_gddh = NullTOEmpty(responseTex.data.bsrygddhx3);
          jbxx.bsry3_yddh = NullTOEmpty(responseTex.data.bsryyddhx3);

          var $inputValues = document.getElementsByName("inputValues");
          for (var i = 0; i < $inputValues.length; i++) {
            $inputValues[i].readOnly = true;
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
    initForm();


    var submitSqbxx = function () {
        var data={
            swglm: currentQY.SWGLM,
            gljgdm: currentQY.GLJG_DM,
            nsrmc: currentQY.MC,
            cwfzrgddhx1: $("#ssbl006_cwfzr_gddh").val(),
            cwfzryddhx1: $("#ssbl006_cwfzr_yddh").val(),
            bsryxmx1: $("#ssbl006_bsry1_xm").val(),
            bsryzjhx1: $("#ssbl006_bsry1_zjhm").val(),
            bsrygddhx1: $("#ssbl006_bsry1_gddh").val(),
            bsryyddhx1: $("#ssbl006_bsry1_yddh").val(),
            bsryxmx2: $("#ssbl006_bsry2_xm").val(),
            bsryzjhx2: $("#ssbl006_bsry2_zjhm").val(),
            bsrygddhx2: $("#ssbl006_bsry2_gddh").val(),
            bsryyddhx2: $("#ssbl006_bsry2_yddh").val(),
            bsryxmx3: $("#ssbl006_bsry3_xm").val(),
            bsryzjhx3: $("#ssbl006_bsry3_zjhm").val(),
            bsrygddhx3: $("#ssbl006_bsry3_gddh").val(),
            bsryyddhx3: $("#ssbl006_bsry3_yddh").val(),
            sqly: $("#ssbl006_sqly").val()
        };
        var my = AppInfo.getUUID();
      var submitDatas = {
        jsonData: angular.toJson({
          blhName: "Ssbl006BLH",
          xm: currentUser.XM,
          sjHm: currentUser.SJHM,
          data: {
            swglm: currentQY.SWGLM,
            gljgdm: currentQY.GLJG_DM,
            nsrmc: currentQY.MC,
            cwfzrgddhx1: $("#ssbl006_cwfzr_gddh").val(),
            cwfzryddhx1: $("#ssbl006_cwfzr_yddh").val(),
            bsryxmx1: $("#ssbl006_bsry1_xm").val(),
            bsryzjhx1: $("#ssbl006_bsry1_zjhm").val(),
            bsrygddhx1: $("#ssbl006_bsry1_gddh").val(),
            bsryyddhx1: $("#ssbl006_bsry1_yddh").val(),
            bsryxmx2: $("#ssbl006_bsry2_xm").val(),
            bsryzjhx2: $("#ssbl006_bsry2_zjhm").val(),
            bsrygddhx2: $("#ssbl006_bsry2_gddh").val(),
            bsryyddhx2: $("#ssbl006_bsry2_yddh").val(),
            bsryxmx3: $("#ssbl006_bsry3_xm").val(),
            bsryzjhx3: $("#ssbl006_bsry3_zjhm").val(),
            bsrygddhx3: $("#ssbl006_bsry3_gddh").val(),
            bsryyddhx3: $("#ssbl006_bsry3_yddh").val(),
            sqly: $("#ssbl006_sqly").val()
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode: "submitData"
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
            $state.go("tab.ssbl006_1")
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

    //提交申请信息
    $scope.submitSqbxx = function () {
      var sqly = $("#ssbl006_sqly").val();
      if (sqly.trim().length == 0) {
        Loading.commonAlert("请填写申请理由！");
      } else {
        Loading.commonConfirm("提交后将不能修改，是否确认提交？", function (buttonIndex) {
          if (buttonIndex) {
            submitSqbxx();
          }
        })
      }
    }
  })
