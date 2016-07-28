/**
 * Created by Administrator on 2016/3/23.
 * 自然人登记js
 */
angular.module('ssbl001.controllers',[])

  .config(function($stateProvider){
    $stateProvider
      //自然人登记首页
      .state('tab.ssbl001_1', {
        url: '/ssbl001_1',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/001/ssbl001_1.html',
            controller: 'Ssbl001Ctrl1'
          }
        }
      })
    //登记信息填写
      .state('tab.ssbl001_2', {
        url: '/ssbl001_2',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/001/ssbl001_2.html',
            controller: 'Ssbl001Ctrl2'
          }
        }
      })
    //附报资料
      .state('tab.ssbl001_3', {
        url: '/ssbl001_3',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/001/ssbl001_3.html',
            controller: 'Ssbl001Ctrl3'
          }
        }
      })
  })

  .directive('focusMe', function($timeout) {
    return {
      restrict : 'A',
      link : function(scope, element, attrs) {
        $timeout(function() {
          element[0].focus();
        }, 1000);
      }
    };
  })

//自然人登记首页
  .controller('Ssbl001Ctrl1',['$scope','$state','$rootScope','$ionicNavBarDelegate','$ionicActionSheet',
    '$timeout','$ionicHistory','$ionicModal','Loading','AjaxPost','AppInfo',
        function($scope,$state,$rootScope,$ionicNavBarDelegate,$ionicActionSheet,$timeout,
                 $ionicHistory,$ionicModal,Loading,AjaxPost,AppInfo){
          var uuid = AppInfo.getUUID();
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
      $rootScope.hideTabs='';
      $rootScope.zrrFormInfo = null;
    };

    $ionicModal.fromTemplateUrl('zrrDjXy.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.xyModal = modal;
    });

    $ionicModal.fromTemplateUrl('sqZtCx.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.cxModal = modal;
    });

    $scope.openXyModal = function(){
      $scope.xyModal.show();
    }

    var closeXyModal = function(){
      $scope.xyModal.hide();
    }
    $scope.closeXyModal = function(){
      closeXyModal();
    }
    $scope.disAgree = function () {
      closeXyModal();
    }

    $scope.openCxModal = function(){
      $scope.cxModal.show();
      $scope.queryInfo = {};
      $scope.resultInfo = {};
    }
    $scope.closeCxModal = function(){
      $scope.cxModal.hide();
    }

    $scope.queryZt = function(queryInfo){
      var lsh = queryInfo.lsh;
      var pwd = queryInfo.pwd;
      if($.trim(lsh)=="" || $.trim(pwd)=="" ){
        Loading.commonAlert('请完善查询信息');
      }else{
          var data={
              pwd:pwd,
              lsh:lsh
          };
          var my = AppInfo.getUUID();
        var reqDatas = {
          jsonData : angular.toJson({
            blhName : "Ssbl001BLH",
            data : {
              pwd:pwd,
              lsh:lsh
            },
              yhwybz : AppInfo.getUUID().toString(),
              bizDataMw : formatStr(data.toString(),my),
            handleCode : "search"
          })
        };

        function showBbzt(ztCode) {
          switch (ztCode) {
            case "0" :
              return "已暂存";
              break;
            case "1" :
              return "已提交";
              break;
            case "2" :
              return "已迁移";
              break;
            case "3" :
              return "审核通过";
              break;
            case "4" :
              return "审核不通过";
              break;
            case "5" :
              return "审核中";
              break;
            case "6" :
              return "被退回";
              break;
            case "7" :
              return "被退回";
              break;
            case "8" :
              return "迁移中";
              break;
            case "9" :
              return "审核中";
              break;
            case "10" :
              return "审核不通过";
              break;
            case "11" :
              return "已归档";
              break;
            default :
              return "状态错误";
              break;
          }
        }

        var loadSearch = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">查询中...</div></div>');
          AjaxPost.getData(reqDatas)
            .then(function(responseText, textStatus,
                           XMLHttpRequest) {
              Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                  var responseTex = JSON.parse(AjaxPost.change(response.toString()));
              var resultInfo = {};
              if(checkResponse(responseTex)){
                resultInfo.zt = showBbzt(responseTex.data.zt);
                resultInfo.mc = responseTex.data.mc;
              }else{
                resultInfo.zt = '未查询到相关数据';
                resultInfo.mc = '未查询到相关数据';
              }
              $scope.resultInfo = resultInfo;
            }, function(jqXHR, textStatus, errorThrown) {
              Loading.loadingHide();
              Loading.commonAlert(textStatus);
            })
        }
        loadSearch();
      }
    }

    $scope.agree = function(){
      closeXyModal();
      $state.go('tab.ssbl001_2');
    }
  }])
//申请表信息
.controller('Ssbl001Ctrl2',['$scope','$state','$rootScope','$ionicHistory','AjaxPost','Loading','AppInfo',
        function($scope,$state,$rootScope,$ionicHistory,AjaxPost,Loading,AppInfo){
    $rootScope.hideTabs='tabs-item-hide';
    $scope.closeZrrdj = function(){
      $state.go('tab.ssbl001_1');
    }
    $scope.nextPage = function(){
      var xm_zh = $.trim($("#ssbl001_xm_zh").val());
      var xm_en = $.trim($("#ssbl001_xm_en").val());
      var zjmc = $("#ssbl001_zjmc").val();
      var zjhm = $.trim($("#ssbl001_zjhm").val());
      var mm = $.trim($("#ssbl001_mm").val());
      var qrmm = $.trim($("#ssbl001_qrmm").val());
      var rzdwmc_zh = $.trim($("#ssbl001_rzdwmc_zh").val());
      var zgjnzz = $.trim($("#ssbl001_zgjnzz").val());
      var jntxdz = $.trim($("#ssbl001_jntxdz").val());
      var yddh = $.trim($("#ssbl001_yddh").val());
      var gddh = $.trim($("#ssbl001_gddh").val());
      var xq = $("#ssbl001_xq").val().substring(7);
      if(xm_zh==""|| zjhm==""|| mm==""|| qrmm==""|| zgjnzz==""|| yddh==""|| xq==""){
        Loading.commonAlert('请完善申请表必要信息');
      }else if(mm!=qrmm){
        Loading.commonAlert('俩次输入的密码不一致');
      }else if(mm.length != 6){
        Loading.commonAlert('密码长度有误');
      }else if(!f_check_chinese(document.getElementById("ssbl001_xm_zh"))){
        Loading.commonAlert('请填写中文名称');
      }else if(zjmc=="06"&&!f_check_sfz(document.getElementById("ssbl001_zjhm"))){
        Loading.commonAlert('身份证件号码填写有误');
      }else if(!f_check_mobile(document.getElementById("ssbl001_yddh"))){
        Loading.commonAlert('移动电话填写有误');
      }else{
        //检测自然人信息存在？
        Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">验证录入信息...</div></div>');
          var data={
              zjHm : zjhm,
              zjLx : zjmc
          };
          var my = AppInfo.getUUID();
          AjaxPost.getData({
          jsonData : angular.toJson({
            blhName : "Ssbl001BLH",
            data : {
              zjHm : zjhm,
              zjLx : zjmc
            },
              yhwybz : AppInfo.getUUID().toString(),
              bizDataMw : formatStr(data.toString(),my),
            handleCode : "zrrCheck"
          })
        })
          .then(function(responseText, textStatus,
                         XMLHttpRequest) {
            Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                  var responseTex = JSON.parse(AjaxPost.change(response.toString()));
            if(checkResponse(responseTex)){
              var formInfo = {'zwMc':xm_zh,'ywMc':xm_en,'zjLx':zjmc,'zjHm':zjhm,'mm':mm,'rzdwmc_zh':rzdwmc_zh,
                'jnZz':zgjnzz,'txDz':jntxdz,'ydDh':yddh,'gdDh':gddh,'xq':xq};
              $rootScope.zrrFormInfo = formInfo ;
              $state.go('tab.ssbl001_3');
            }else{
              Loading.commonAlert(responseTex.msg);
            }
          }, function(jqXHR, textStatus, errorThrown) {
            Loading.loadingHide();
            Loading.commonAlert(textStatus);
          })
      }

    }
            var data={};
            var my = AppInfo.getUUID();
    var reqDatas = {
      jsonData : angular.toJson({
        blhName : "Ssbl001BLH",
        data : {},
          yhwybz : AppInfo.getUUID().toString(),
          bizDataMw : formatStr(data.toString(),my),
        handleCode : "intform"
      })
    };
    var ssbl001_qx = []; //区县
    var loadForm = function(){
      Loading.loadingShow(' <div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
      AjaxPost.getData(reqDatas)
        .then(function(responseText, textStatus,
                       XMLHttpRequest) {
          Loading.loadingHide();
              var response = Decrypt(responseText.toString(),my);
//                        alert(response);
              var responseTex = JSON.parse(AjaxPost.change(response.toString()));
          if(checkResponse(responseTex)){
            var zjlx = responseTex.data.zjlxList;
            var dslist = responseTex.data.dsList;
            var qxlist = responseTex.data.xqList;
            $scope.zjInfo = zjlx ;
            $scope.dsInfo = dslist ;

            for(var k=0;k<qxlist.length;k++){
              ssbl001_qx.push({
                XZQHXQ_DM : qxlist[k].XZQHXQ_DM ,
                XQMC : qxlist[k].XQMC
              });
            }
            ssbl001_qx.push({
              XZQHXQ_DM : '321700',
              XQMC : '苏州工业园区'
            });
            ssbl001_qx.push({
              XZQHXQ_DM : '321600',
              XQMC : '张家港保税区'
            });

            var qxInfo = [];
            $scope.qxInfo = qxInfo ;

          }else{
            Loading.commonAlert(responseTex.msg);
          }
        }, function(jqXHR, textStatus, errorThrown) {
          Loading.loadingHide();
          Loading.commonAlert(textStatus);
        })
    };
    loadForm();

    $scope.changeCity = function (v) {
      var qxInfo = [];
      for(var i=0; i<ssbl001_qx.length;i++){
        if(ssbl001_qx[i].XZQHXQ_DM.substring(0,4)==v){
          qxInfo.push(ssbl001_qx[i]);
        }
      }
      $scope.qxInfo = qxInfo ;
    }
  }])
//附报资料
.controller('Ssbl001Ctrl3',['$scope','$state','$rootScope','$ionicHistory','Loading',
      '$ionicModal','$cordovaCamera','$ionicActionSheet','$timeout','AjaxPost','$window','AppInfo',
        function($scope,$state,$rootScope,$ionicHistory,Loading,$ionicModal,$cordovaCamera,
               $ionicActionSheet,$timeout,AjaxPost,$window,AppInfo){
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
    };

    var options = {
      quality : 20,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType : Camera.EncodingType.JPEG,
      popoverOptions : CameraPopoverOptions,
      saveToPhotoAlbum : false
    };

    $scope.uploadPhone = function(buttonId){
      var hideSheet = $ionicActionSheet.show({
        titleText : '上传图片',
        buttons : [{text:'拍照上传'},{text:'从相册获取'}],
        buttonClicked : function(index){
          if(index==0){
            openCamera(buttonId);
          }
          if(index==1){
            openPicture(buttonId);
          }
          return true;
        },
        cancalText:'取消',
        cancal : function(){}
      });
      $timeout(function() {
        hideSheet();
      }, 3000);
    }

    //摄像头
    var openCamera = function(containerId){
      options.sourceType = Camera.PictureSourceType.CAMERA ;
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var currentImg = document.createElement("img");
        currentImg.style.height = '160px';
        currentImg.style.width = '100px';
        currentImg.style.paddingRight = '2px';
        currentImg.src = 'data:image/jpeg;base64,'+imageData ;
        currentImg.onclick = function(){
          Loading.commonConfirm('删除照片？', function (res) {
            if (res) {
              currentImg.remove();
            }
          })
        }
        var currentScroll = document.getElementById(containerId);
        currentScroll.appendChild(currentImg);

      }, function(err) {
        Loading.commonAlert(err);
      });
    }
    //本地
    var openPicture = function(containerId){
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY ;
      $cordovaCamera.getPicture(options).then(function(imageURI) {
        var currentImg = document.createElement("img");
        currentImg.style.height = '160px';
        currentImg.style.width = '100px';
        currentImg.style.paddingRight = '2px';
        currentImg.src = 'data:image/jpeg;base64,'+imageURI ;
        currentImg.onclick = function(){
          Loading.commonConfirm('删除照片？', function (res) {
            if (res) {
              currentImg.remove();
            }
          })
        }
        var currentScroll = document.getElementById(containerId);
        currentScroll.appendChild(currentImg);

      }, function(err) {
        Loading.commonAlert(err);
      });
    }

    $scope.submitPage = function(){
      var imgBase64Arr_024055 = [],imgBase64Arr_024056 = [],imgBase64Arr_024057 = [],fileDate = [];;
      $("#ssbl001_imgFileList_024055").children().each(function(){
        imgBase64Arr_024055.push(formatBase64Str($(this).prop("src")));
      });
      $("#ssbl001_imgFileList_024056").children().each(function(){
        imgBase64Arr_024056.push(formatBase64Str($(this).prop("src")));
      });
      $("#ssbl001_imgFileList_024057").children().each(function(){
        imgBase64Arr_024057.push(formatBase64Str($(this).prop("src")));
      });
      if(imgBase64Arr_024055.length == 0 ){
        Loading.commonAlert("请上传附报资料");
        return ;
      }
      if(imgBase64Arr_024055.length != 0){
        for(var i=0;i<imgBase64Arr_024055.length;i++){
          fileDate.push({zlBm:"024055",zlMc:"身份证件复印件或军官证、士官证、护照复印件、台胞回乡证、港澳通行证复印件",type:"jpg",base64:imgBase64Arr_024055[i]});
        }
      }
      if(imgBase64Arr_024056.length != 0){
        for(var j=0;j<imgBase64Arr_024056.length;j++){
          fileDate.push({zlBm:"024056",zlMc:"总公司(总机构)出具的派遣书、任职证明文件或与任职、受雇企业签订的任职、受雇协议(在中国境内无住所而在一个纳税年度中在中国境内居住满1年的个人应提供的资料)",type:"jpg",base64:imgBase64Arr_024056[j]});
        }
      }
      if(imgBase64Arr_024057.length != 0){
        for(var k=0;k<imgBase64Arr_024057.length;k++){
          fileDate.push({zlBm:"024057",zlMc:"总公司(总机构)或任职、受雇企业支付和出具的工资、薪金证明(在中国境内无住所而在一个纳税年度中在中国境内居住满1年的个人应提供的资料)",type:"jpg",base64:imgBase64Arr_024057[k]});
        }
      }
        var data={
            zwMc : $rootScope.zrrFormInfo.zwMc,
            ywMc: $rootScope.zrrFormInfo.ywMc,
            zjLx :$rootScope.zrrFormInfo.zjLx,
            zjHm : $rootScope.zrrFormInfo.zjHm,
            mm : $rootScope.zrrFormInfo.mm,
            jnZz : $rootScope.zrrFormInfo.jnZz,
            txDz : $rootScope.zrrFormInfo.txDz,
            ydDh : $rootScope.zrrFormInfo.ydDh,
            gdDh : $rootScope.zrrFormInfo.gdDh,
            xq: $rootScope.zrrFormInfo.xq,
            file: fileDate,
            rzqk : {
                rzdwmc_zh : $rootScope.zrrFormInfo.rzdwmc_zh
            }
        };
        var my = AppInfo.getUUID();
      var reqDatas = {
        jsonData : angular.toJson({
          blhName : "Ssbl001BLH",
          data : {
            zwMc : $rootScope.zrrFormInfo.zwMc,
            ywMc: $rootScope.zrrFormInfo.ywMc,
            zjLx :$rootScope.zrrFormInfo.zjLx,
            zjHm : $rootScope.zrrFormInfo.zjHm,
            mm : $rootScope.zrrFormInfo.mm,
            jnZz : $rootScope.zrrFormInfo.jnZz,
            txDz : $rootScope.zrrFormInfo.txDz,
            ydDh : $rootScope.zrrFormInfo.ydDh,
            gdDh : $rootScope.zrrFormInfo.gdDh,
            xq: $rootScope.zrrFormInfo.xq,
            file: fileDate,
            rzqk : {
              rzdwmc_zh : $rootScope.zrrFormInfo.rzdwmc_zh
            }
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode : "zrrydjDecrypt"
        })
      };
      //console.log('*********'+JSON.stringify(reqDatas)+'*********');
      var upLoadFiles = function(){
        Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
        AjaxPost.getData(reqDatas)
          .then(function(responseText, textStatus,
                         XMLHttpRequest) {
            Loading.loadingHide();
                var response = Decrypt(responseText.toString(),my);
//                        alert(response);
                var responseTex = JSON.parse(AjaxPost.change(response.toString()));
            if(checkResponse(responseTex)){
              Loading.commonAlert('<p>请牢记您的登记流水号,该流水号可用于查询申请进度,并以短信形式发送到您的手机上了.</p>'+
                '<span>登记流水号:<br>'+responseTex.data.lsh+'</span>', function () {
                $rootScope.zrrFormInfo = null;
                $window.location.href = 'index.html#/tab/taxService';
              },responseTex.msg);
            }else{
              Loading.commonAlert('<p>请重试！</p>',function(){},responseTex==null?'请求超时':responseTex.msg);
            }
          }, function(jqXHR, textStatus, errorThrown) {
            Loading.loadingHide();
            Loading.commonAlert(textStatus);
          })
      }
      upLoadFiles();
    }
  }])

