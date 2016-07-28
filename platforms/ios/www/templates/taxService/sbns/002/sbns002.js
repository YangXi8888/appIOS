/**
 * Created by Administrator on 2016/3/23.
 * 社保申报js
 */
angular.module('sbns002.controllers',[])

.config(function($stateProvider){
    $stateProvider
      //社保-申报首页
      .state('tab.sbns002_1', {
        url: '/sbns002_1',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/002/sbns002_1.html',
            controller: 'Sbns002Ctrl1'
          }
        }
      })
      //社保-应申报
      .state('tab.sbns002_2', {
        url: '/sbns002_2?MC&SWGLM&NSRSBH&GLJG_DM',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/002/sbns002_2.html',
            controller: 'Sbns002Ctrl2'
          }
        }
      })
      //社保-已申报
      .state('tab.sbns002_3', {
        url: '/sbns002_3?MC&SWGLM&NSRSBH&GLJG_DM',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/002/sbns002_3.html',
            controller: 'Sbns002Ctrl3'
          }
        }
      })
      //社保-已申报明细
      .state('tab.sbns002_4', {
        url: '/sbns002_4?pzxh',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/002/sbns002_4.html',
            controller: 'Sbns002Ctrl4'
          }
        }
      })
      //社保-应申报-进入申报页
      .state('tab.sbns002_5', {
        url: '/sbns002_5?SWGLM&isCk&NSRSBH&MC&DM&ST&ET',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/sbns/002/sbns002_5.html',
            controller: 'Sbns002Ctrl5'
          }
        }
      })
})

//社保申报首页
.controller('Sbns002Ctrl1',['$scope','$state','$rootScope','$ionicNavBarDelegate','$ionicActionSheet',
    '$timeout','$ionicHistory','Loading',
      function($scope,$state,$rootScope,$ionicNavBarDelegate,$ionicActionSheet,
                                    $timeout,$ionicHistory,Loading){
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
    	$ionicHistory.goBack();
      $rootScope.hideTabs='';
      $rootScope.sbns002 = null;
    };
    $rootScope.sbns002 = {};
    $rootScope.sbns002.yingSbMx = {};

    //取得缓存的首选企业
    var sbns002_currQy = findSxQyByLocal();
    if(sbns002_currQy!=null){
      sbns002_currQy.MC = converLongName(sbns002_currQy.MC);
    }else{
      sbns002_currQy = {};
      sbns002_currQy.MC = '没有企业信息' ;
    }
    $scope.sbns002_currQy = sbns002_currQy;
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
              sbns002_currQy = qyxxList[index] ;
              sbns002_currQy.MC = converLongName(sbns002_currQy.MC);
              $scope.sbns002_currQy = sbns002_currQy;
              return true;
            }
        });
    	$timeout(function() {
    	   hideSheet();
    	}, 3000);
    }

    $scope.yingSbLb = function(){
      $state.go('tab.sbns002_2',{"MC":sbns002_currQy.MC,"SWGLM":sbns002_currQy.SWGLM,"NSRSBH":sbns002_currQy.NSRSBH,"GLJG_DM":sbns002_currQy.NSRSBH});
    }
    $scope.yiSbLb = function(){
      $state.go('tab.sbns002_3',{"MC":sbns002_currQy.MC,"SWGLM":sbns002_currQy.SWGLM,"NSRSBH":sbns002_currQy.NSRSBH,"GLJG_DM":sbns002_currQy.NSRSBH});
    }

}])
 //社保申报-应申报
.controller('Sbns002Ctrl2',['$scope','$state','$rootScope','$ionicNavBarDelegate','$ionicHistory',
    '$stateParams','AjaxPost','Loading','AppInfo',
      function($scope,$state,$rootScope,$ionicNavBarDelegate,$ionicHistory,
                                    $stateParams,AjaxPost,Loading,AppInfo){
	$rootScope.hideTabs='tabs-item-hide';
	$scope.back =function() {
		$ionicHistory.goBack();
  };

  var sbns002_currQy = {};
  sbns002_currQy.MC = $stateParams.MC;
  sbns002_currQy.SWGLM = $stateParams.SWGLM;
  sbns002_currQy.NSRSBH = $stateParams.NSRSBH;
  sbns002_currQy.GLJG_DM = $stateParams.GLJG_DM;
  $scope.sbns002_currQy = sbns002_currQy;

  var loadSbList = function(){
    Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
      var data={
          swglm : sbns002_currQy.SWGLM
      };
      var my = AppInfo.getUUID();
      AjaxPost.getData({
      jsonData : angular.toJson({
        blhName : "Sbns002BLH",
        data : {
          swglm : sbns002_currQy.SWGLM
        },
          yhwybz : AppInfo.getUUID().toString(),
          bizDataMw : formatStr(data.toString(),my),
        handleCode : "querySblb"
      })
    })
      .then(function(responseText, textStatus,
                     XMLHttpRequest) {
        Loading.loadingHide();
              var response = Decrypt(responseText.toString(),my);
//                        alert(response);
              var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if(checkResponse(responseTex)){
          $scope.wsbList = responseTex.data.wsbList;
          if($scope.wsbList.length == 0){
            Loading.loadingTimoutHide('没有应申报信息');
          }
        }else{
          Loading.commonAlert(responseTex.msg);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus);
      })
  }
  loadSbList();

  $scope.reLoadSbList = function(){
    loadSbList();
    $scope.$broadcast("scroll.refreshComplete");
  }
//应申报明细
  $scope.shenbao = function (dm,startTime,endTime) {
    Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
      var data={
          sbDm : dm,
          ssQq : startTime,
          ssQz : endTime,
          gljgDm : sbns002_currQy.GLJG_DM
      };
      var my = AppInfo.getUUID();
      AjaxPost.getData({
      jsonData : angular.toJson({
        blhName : "Sbns002BLH",
        data : {
          sbDm : dm,
          ssQq : startTime,
          ssQz : endTime,
          gljgDm : sbns002_currQy.GLJG_DM
        },
          yhwybz : AppInfo.getUUID().toString(),
          bizDataMw : formatStr(data.toString(),my),
        handleCode : "querySbmx"
      })
    })
      .then(function(responseText, textStatus,
                     XMLHttpRequest) {
        Loading.loadingHide();
              var response = Decrypt(responseText.toString(),my);
//                        alert(response);
              var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if(checkResponse(responseTex)){
          if ( typeof (responseTex.data.cqTs) != "undefined") {
            Loading.commonAlert(responseTex.data.cqTs);
          }
          var isCk = responseTex.data.csz;
          $rootScope.sbns002.yingSbMx = responseTex.data.dataList;
          $state.go('tab.sbns002_5',{'SWGLM':sbns002_currQy.SWGLM,'isCk':isCk,'MC':sbns002_currQy.MC,
            'NSRSBH':sbns002_currQy.NSRSBH,'DM':dm,'ST':startTime,'ET':endTime});
        }else{
          Loading.commonAlert(responseTex.msg);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus);
      })
  }
}])
 //社保申报-已申报
.controller('Sbns002Ctrl3',['$scope','$state','$rootScope','$ionicNavBarDelegate','$ionicHistory',
    '$stateParams','AjaxPost','Loading','AppInfo',
      function($scope,$state,$rootScope,$ionicNavBarDelegate,$ionicHistory,
                                    $stateParams,AjaxPost,Loading,AppInfo){
	$rootScope.hideTabs='tabs-item-hide';
	$scope.back =function() {
		$ionicHistory.goBack();
  };

  var sbns002_currQy = {};
  sbns002_currQy.MC = $stateParams.MC;
  sbns002_currQy.SWGLM = $stateParams.SWGLM;
  sbns002_currQy.NSRSBH = $stateParams.NSRSBH;
  sbns002_currQy.GLJG_DM = $stateParams.GLJG_DM;
  $scope.sbns002_currQy = sbns002_currQy;

  var loadPageList = function(){
    Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
      var data={
          swglm : sbns002_currQy.SWGLM
      };
      var my = AppInfo.getUUID();
      AjaxPost.getData({
      jsonData : angular.toJson({
        blhName : "Sbns002BLH",
        data : {
          swglm : sbns002_currQy.SWGLM
        },
          yhwybz : AppInfo.getUUID().toString(),
          bizDataMw : formatStr(data.toString(),my),
        handleCode : "queryYsbLb"
      })
    })
      .then(function(responseText, textStatus,
                     XMLHttpRequest) {
        Loading.loadingHide();
              var response = Decrypt(responseText.toString(),my);
//                        alert(response);
              var responseTex = JSON.parse(AjaxPost.change(response.toString()));
        if(checkResponse(responseTex)){
          $scope.ysbList = responseTex.data.ysbList;
          if($scope.ysbList.length == 0){
            Loading.loadingTimoutHide('没有已申报信息');
          }
        }else{
          Loading.commonAlert(responseTex.msg);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus);
      })
  }
  loadPageList();

  $scope.reLoadPageList = function(){
    loadPageList();
    $scope.$broadcast("scroll.refreshComplete");
  }

  $scope.detail = function (pzxh) {
    $state.go('tab.sbns002_4',{"pzxh":pzxh});
  }
}])
 //社保申报-已申报明细
.controller('Sbns002Ctrl4',['$scope','$state','$rootScope','$ionicNavBarDelegate','$ionicHistory',
    '$stateParams','AjaxPost','Loading','$timeout','AppInfo',
      function($scope,$state,$rootScope,$ionicNavBarDelegate,$ionicHistory,
                                    $stateParams,AjaxPost,Loading,$timeout,AppInfo) {
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.back = function () {
      $ionicHistory.goBack();
    };
    var loadPageDetail = function(){
      Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
        var data={
            pzXh : $stateParams.pzxh
        };
        var my = AppInfo.getUUID();
      AjaxPost.getData({
        jsonData : angular.toJson({
          blhName : "Sbns002BLH",
          data : {
            pzXh : $stateParams.pzxh
          },
            yhwybz : AppInfo.getUUID().toString(),
            bizDataMw : formatStr(data.toString(),my),
          handleCode : "queryData"
        })
      })
        .then(function(responseText, textStatus,
                       XMLHttpRequest) {
          Loading.loadingHide();
              var response = Decrypt(responseText.toString(),my);
//                        alert(response);
              var responseTex = JSON.parse(AjaxPost.change(response.toString()));
          if(checkResponse(responseTex)){
            $scope.dataList = responseTex.data.dataList;
            $timeout(function () {
              $('#sbns002_table1').footable();
            },0)
          }else{
            Loading.commonAlert(responseTex.msg);
          }
        }, function(jqXHR, textStatus, errorThrown) {
          Loading.loadingHide();
          Loading.commonAlert(textStatus);
        })
    }
   //加载已申报明细
    loadPageDetail();

  }])
//申报页
  .controller('Sbns002Ctrl5',['$scope','$state','$rootScope','$ionicNavBarDelegate','$ionicHistory',
    '$stateParams','AjaxPost','Loading','$window','AppInfo',
    function($scope,$state,$rootScope,$ionicNavBarDelegate,$ionicHistory,
             $stateParams,AjaxPost,Loading,$window,AppInfo) {
      $rootScope.hideTabs = 'tabs-item-hide';
      $scope.back = function () {
        $ionicHistory.goBack();
      };

      var dm = $stateParams.DM;
      var startTime = $stateParams.ST;
      var endTime = $stateParams.ET;
      var swglm = $stateParams.SWGLM;
      var isCk = $stateParams.isCk;//是否可选
      $scope.nsrsbh = $stateParams.NSRSBH;
      $scope.mc = $stateParams.MC;
      $scope.yingSbMx = $rootScope.sbns002.yingSbMx;
      $scope.hjje = 0;
      for(var i=0;i<$scope.yingSbMx.length;i++){
        $scope.hjje = parseFloat($scope.hjje) + parseFloat($scope.yingSbMx[i].SJ_JE);
      }
      $scope.isDisable = true;
      if(isCk == '1'){
        $scope.isDisable = false;
      }
//勾选时计算合计
      $scope.calHj = function ($event) {
        var $this = $event.target;
        if($this.checked){
          $scope.hjje = parseFloat($scope.hjje) + parseFloat($this.value);
        }else{
          $scope.hjje = parseFloat($scope.hjje) - parseFloat($this.value);
        }
      }
//提交
      $scope.goSubmit = function () {
        var subFlag = false;//存在选中项标记
        var xhList = [];//序号数组
        var cks = document.getElementsByName('sbns002_checkbox');
        for(var i=0;i<cks.length;i++){
          if(cks[i].checked){
            subFlag = true;
            xhList.push({
              XH :　cks[i].getAttribute('data-xh')
            });
          }
        }
        if(subFlag){
          Loading.commonConfirm('确定提交吗？', function (res) {
            if (res) {
              Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
                var data={
                    dataList : xhList,
                    sbDm : dm,
                    ssQq : startTime,
                    ssQz : endTime,
                    swglm : swglm
                };
                var my = AppInfo.getUUID();
                AjaxPost.getData({
                jsonData : angular.toJson({
                  blhName : "Sbns002BLH",
                  data : {
                    dataList : xhList,
                    sbDm : dm,
                    ssQq : startTime,
                    ssQz : endTime,
                    swglm : swglm
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
//                        alert(response);
                        var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                  if(checkResponse(responseTex)){
                    Loading.commonAlert(responseTex.msg, function () {
                      $window.location.href = 'index.html';
                    });
                  }else{
                    Loading.commonAlert(responseTex.msg);
                  }
                }, function(jqXHR, textStatus, errorThrown) {
                  Loading.loadingHide();
                  Loading.commonAlert(textStatus);
                })
            }
          });
        }else{
          Loading.commonAlert('请至少选择一条记录提交！');
          return;
        }
      }
    }])
