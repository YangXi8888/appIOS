angular.module('ssbl003.controllers',[])

  .config(function($stateProvider){
    $stateProvider
      .state('tab.ssbl003_1', {
        url: '/ssbl003_1',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/003/ssbl003_1.html',
            controller: 'Ssbl003Ctrl1'
          }
        }
      })
      .state('tab.ssbl003_2', {
        url: '/ssbl003_2',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/003/ssbl003_2.html',
            controller: 'Ssbl003Ctrl2'
          }
        }
      })
      .state('tab.ssbl003_3', {
        url: '/ssbl003_3',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/003/ssbl003_3.html',
            controller: 'Ssbl003Ctrl3'
          }
        }
      })
      .state('tab.ssbl003_4', {
        url: '/ssbl003_4',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/003/ssbl003_4.html',
            controller: 'Ssbl003Ctrl4'
          }
        }
      })
      .state('tab.ssbl003_5', {
        url: '/ssbl003_5?lsh',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/003/ssbl003_5.html',
            controller: 'Ssbl003Ctrl5'
          }
        }
      })
      .state('tab.ssbl003_6', {
        url: '/ssbl003_6',
        views: {
          'taxService': {
            templateUrl: 'templates/taxService/ssbl/003/ssbl003_6.html',
            controller: 'Ssbl003Ctrl6'
          }
        }
      })
  })
.controller('Ssbl003Ctrl1', ['$rootScope','$scope','$ionicHistory','$ionicActionSheet','Loading','AjaxPost',
    '$timeout','$ionicModal','$state','AppInfo',
      function($rootScope,$scope,$ionicHistory,$ionicActionSheet,Loading,AjaxPost,$timeout,$ionicModal,$state,AppInfo) {
        var uuid = AppInfo.getUUID();
        $rootScope.hideTabs='tabs-item-hide';
        $scope.back =function() {
          $ionicHistory.goBack();
          $rootScope.hideTabs='';
          $rootScope.ssbl003 = null;
        };
        $rootScope.ssbl003 = {};
        $rootScope.ssbl003.ssbl003_localUser = findUserByLocal()==null?{}:findUserByLocal();
        $rootScope.ssbl003.ssbl003_currQy = {};//当前企业信息
        $rootScope.ssbl003.ssbl003_ywsxdm = "";//业务事项代码
        $rootScope.ssbl003.ssbl003_dwSe = 0;//单位税额
        $rootScope.ssbl003.ssbl003_zsxm = "";//征收项目
        $rootScope.ssbl003.ssbl003_sqjmlx = [];//申请减免类型
        $rootScope.ssbl003.ssbl003_zcyj = [];//政策依据
        $rootScope.ssbl003.ssbl003_sqjmSm = [];//申请减免税目 add中的选项
        $rootScope.ssbl003.ssbl003_jmlx = [];//减免类型 add中的选项
//基本信息
        $rootScope.ssbl003.temp_jmLx = "";
        $rootScope.ssbl003.temp_zcYj = "";
        $rootScope.ssbl003.temp_zcYjMx = "";
        $rootScope.ssbl003.temp_jmqxQ = "";
        $rootScope.ssbl003.temp_jmqxZ = "";
        $rootScope.ssbl003.temp_sqly = "";
//行信息
        $rootScope.ssbl003.ssbl003_lineFileDate = [];
//明细信息
        $rootScope.ssbl003.mxlist = [];

        var ssbl003_currQy = findSxQyByLocal();
        if(ssbl003_currQy!=null){
          ssbl003_currQy.MC = converLongName(ssbl003_currQy.MC);
        }else{
          ssbl003_currQy = {};
          ssbl003_currQy.MC = '没有企业信息' ;
        }
        $rootScope.ssbl003.ssbl003_currQy = ssbl003_currQy;
        //受理意见模态实例化
        $ionicModal.fromTemplateUrl('slyjCx.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.slyjModal = modal;
        });

        var jmsList = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {swglm : ssbl003_currQy.SWGLM, sqlxdm : "SQ020"};
          AjaxPost.getData( {
            jsonData : angular.toJson({
              blhName : "ZBfwBLH",
              data : data,
              handleCode : "search",
              yhwybz : uuid,
              bizDataMw : formatStr(data.toString(),uuid)
            })
          })
            .then(function(responseText, textStatus,
                           XMLHttpRequest) {
              Loading.loadingHide();
              var response = Decrypt(responseText.toString(),uuid);
              var responseTex = JSON.parse(AjaxPost.change(response));
              if(checkResponse(responseTex)){
                $scope.ZtList = responseTex.data.ZtList;
              }else{
                Loading.commonAlert(responseTex.msg);
              }
            }, function(jqXHR, textStatus, errorThrown) {
              Loading.loadingHide();
              Loading.commonAlert(textStatus);
            })
        };
        jmsList();
        //切换企业
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
              ssbl003_currQy = qyxxList[index] ;
              ssbl003_currQy.MC = converLongName(ssbl003_currQy.MC);
              $rootScope.ssbl003.ssbl003_currQy = ssbl003_currQy;
              jmsList();
              return true;
            }
          });
          $timeout(function() {
            hideSheet();
          }, 3000);
        }
        //下拉刷新
        $scope.reLoadSqList = function(){
          jmsList();
          $scope.$broadcast("scroll.refreshComplete");
        }
        //受理意见
        $scope.querySlyj = function (lsh,lcslh,bbzt) {
          var slyjList = function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {lsh : lsh, bbzt :bbzt, lcslh : lcslh};
            AjaxPost.getData( {
              jsonData : angular.toJson({
                blhName : "ZBfwBLH",
                data : data,
                handleCode : "querySlyj",
                yhwybz : uuid,
                bizDataMw : formatStr(data.toString(),uuid)
              })
            })
              .then(function(responseText, textStatus,
                             XMLHttpRequest) {
                Loading.loadingHide();
                var response = Decrypt(responseText.toString(),uuid);
                var responseTex = JSON.parse(AjaxPost.change(response));
                if(checkResponse(responseTex)){
                  var slyjList = responseTex.data.slyjList;
                  for(var i=0;i<slyjList.length;i++){
                	  if(slyjList[i].blswjgmc.length>9){
                		  slyjList[i].blswjgmc = slyjList[i].blswjgmc.substr(0,9)+"..";
                	  }
                  }
                  $scope.slyjList = slyjList;
                  $scope.slyjModal.show();
                }else{
                  Loading.commonAlert(responseTex.msg);
                }
              }, function(jqXHR, textStatus, errorThrown) {
                Loading.loadingHide();
                Loading.commonAlert(textStatus);
              })
          }();
        }
        //查看已申请明细
        $scope.openDetail = function (lsh) {
          $state.go('tab.ssbl003_5',{'lsh':lsh});
        }
        $scope.closeSlyjCxModal = function () {
          $scope.slyjModal.hide();
        }
        //请求申请信息
        $scope.sssxSq = function () {
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {swglm :　ssbl003_currQy.SWGLM};
          AjaxPost.getData( {
            jsonData : angular.toJson({
              blhName : "Ssbl003BLH",
              data : data,
              handleCode : "initData",
              yhwybz : uuid,
              bizDataMw : formatStr(data.toString(),uuid)
            })
          })
            .then(function(responseText, textStatus,
                           XMLHttpRequest) {
              Loading.loadingHide();
              var response = Decrypt(responseText.toString(),uuid);
              var responseTex = JSON.parse(AjaxPost.change(response));
              if(checkResponse(responseTex)){
                if(typeof(responseTex.data.zhxxList)=="undefined"){
                  Loading.commonAlert(JSON.stringify(responseTex.data.jdTs));
                  return;
                }
                var sqjmsmList = responseTex.data.zhxxList;
                var zcyjList = responseTex.data.zcyjList;
                $rootScope.ssbl003.ssbl003_ywsxdm = zcyjList[0].ywsxdm;
                $rootScope.ssbl003.ssbl003_dwSe = parseFloat(sqjmsmList[0].dwse).toFixed(2) ;
                $rootScope.ssbl003.ssbl003_zsxm = sqjmsmList[0].zsxm_dm;//征收项目
                $rootScope.ssbl003.ssbl003_sqjmlx = responseTex.data.sqjmlxList;//申请减免类型
                $rootScope.ssbl003.ssbl003_zcyj = zcyjList;
                $rootScope.ssbl003.ssbl003_sqjmSm = sqjmsmList;//申请减免税目 add中的选项
                $rootScope.ssbl003.ssbl003_jmlx = responseTex.data.jmlxList;//减免类型 add中的选项

                $state.go('tab.ssbl003_2');
              }else{
                Loading.commonAlert(responseTex.msg);
              }
            }, function(jqXHR, textStatus, errorThrown) {
              Loading.loadingHide();
              Loading.commonAlert(textStatus);
            })
        }
      }])
  //涉税事项申请单1
  .controller('Ssbl003Ctrl2', ['$rootScope','$scope','$ionicHistory','$state','Loading','AjaxPost',
      function ($rootScope,$scope,$ionicHistory,$state,Loading,AjaxPost) {
      $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
    };
    $scope.nextPage1 = function () {
      //基础信息
      var temp_jmLx = $("#ssbl003_sqjmLx").val();
      var temp_zcYj = $("#ssbl003_zcYj").val();
      var temp_zcYjMx = $("#ssbl003_zcYj").text();
      var temp_jmqxQ = $.trim($("#ssbl003_jmqKs").val());
      var temp_jmqxZ = $.trim($("#ssbl003_jmqJs").val());
      var temp_sqly = $.trim($("#ssbl003_sqly").val());

      if(temp_jmqxQ=="" || temp_jmqxZ=="" || temp_zcYj==""){
        Loading.commonAlert("请填写减免期限");
        return ;
      }else if(!f_check_date(document.getElementById("ssbl003_jmqKs"))
                || !f_check_date(document.getElementById("ssbl003_jmqJs"))){
        Loading.commonAlert("日期格式不正确");
        return;
      }else if(temp_jmqxQ>temp_jmqxZ){
        Loading.commonAlert("开始日期不能大于结束日期");
        return;
      }else if(temp_sqly == "" ){
        Loading.commonAlert("请填写申请理由");
        return;
      }else{
        $rootScope.ssbl003.temp_jmLx = temp_jmLx;
        $rootScope.ssbl003.temp_zcYj = temp_zcYj;
        $rootScope.ssbl003.temp_zcYjMx =temp_zcYjMx;
        $rootScope.ssbl003.temp_jmqxQ = temp_jmqxQ;
        $rootScope.ssbl003.temp_jmqxZ = temp_jmqxZ;
        $rootScope.ssbl003.temp_sqly = temp_sqly;
        $state.go('tab.ssbl003_3');
      }
    }
  }])
  //涉税事项申请单2
  .controller('Ssbl003Ctrl3', ['$rootScope','$scope','$ionicHistory','$state','$compile','$ionicScrollDelegate',
    'Loading',
      function ($rootScope,$scope,$ionicHistory,$state,$compile,$ionicScrollDelegate,Loading) {
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
    };
    $("#ssbl003_table1").footable();
    var sqjmsmOptions = "";
    var jmlxOptions = "";
    var ssbl003_dwSe = $rootScope.ssbl003.ssbl003_dwSe;
    var sqjmsmList = $rootScope.ssbl003.ssbl003_sqjmSm;
    var jmlxList = $rootScope.ssbl003.ssbl003_jmlx;
    for(var i=0;i<sqjmsmList.length;i++){
      sqjmsmOptions += "<option value='"+sqjmsmList[i].zspm_dm+"'>"+sqjmsmList[i].zspm_mc+"</option>";
    }
    for(var i=0;i<jmlxList.length;i++){
      jmlxOptions += "<option value='"+jmlxList[i].jmlxdm+"'>"+jmlxList[i].jmlxmc+"</option>"
    }

    var index = 1,ssbl003_cal = null,ssbl003_arrCal = [];
    ssbl003_arrCal.push({
      GS : "ssbl003_name_nyNse = ssbl003_name_dwSe * ssbl003_name_ysMj",
      GSLX : "X"
    });
    ssbl003_cal = new caltb("ssbl003_table1");
    ssbl003_cal.setRules(ssbl003_arrCal);
    $scope.ssbl003AddRow = function () {
      var footable = $('#ssbl003_table1').data('footable');
      var newRow = $compile('<tr name="ssbl003_lineinfos" ng-click="resizeScorll()">' +
        '<td><select class="myselect" name="ssbl003_name_sqjmSm" style="width: 85%;height: 34px;">'+sqjmsmOptions+'</select></td>' +
        '<td style="text-align: center;vertical-align: middle"><a href="#" class="myhref" ng-click="deleteRow($event)" >删&nbsp;除</a></td>' +
        '<td><input type="number" style="text-align: right" class="myinput" name="ssbl003_name_zdMj" cal="true"></td>' +
        '<td><input type="number" style="text-align: right" class="myinput" name="ssbl003_name_ysMj" cal="true"></td>' +
        '<td><input type="number" style="text-align: right" readonly="readonly" name="ssbl003_name_dwSe" cal="true" class="myinput" value="'+ssbl003_dwSe+'"></td>' +
        '<td><input type="number" style="text-align: right" readonly="readonly" name="ssbl003_name_nyNse" cal="true" class="myinput"></td>' +
        '<td><input type="number" style="text-align: right" class="myinput" name="ssbl003_name_sqjmMj" cal="true"></td>' +
        '<td><input type="number" style="text-align: right" class="myinput" name="ssbl003_name_sqjmSe" cal="true"></td>' +
        '<td style="text-align: right"><select name="ssbl003_name_jmLx" style="width: 85%;height: 34px;">'+jmlxOptions+'</select></td>' +
        '</tr>')($scope);
      footable.appendRow(newRow);
      initCalTable(ssbl003_cal);
      index++;
    }
    $scope.resizeScorll = function () {
      $ionicScrollDelegate.resize();
    }
    $scope.deleteRow = function ($event) {
      var footable = $('#ssbl003_table1').data('footable');
      footable.removeRow($($event.target).parent().parent());
    }

    $scope.nextPage2 = function () {
      //table信息
      var errMsg = "";
      var errIndex = 0;//错误提示信息
      var temp_sqjmsm = [];
      var temp_zdmj = [];
      var temp_ysmj = [];
      var temp_dwse = [];
      var temp_nynse = [];
      var temp_sqjmmj = [];
      var temp_sqjmse = [];
      var temp_jmlx = [];
      var infoLength = $("[name='ssbl003_name_sqjmSm']").length;
      if(infoLength == 0 ){
        Loading.commonAlert("请增加申请单行信息");
        return;
      }
      $("[name='ssbl003_name_sqjmSm']").each(function(){
        temp_sqjmsm.push($(this).val());
      });
      //
      var ssbl003_name4_length = document.getElementsByName("ssbl003_name_zdMj");
      for(var i=0;i<ssbl003_name4_length.length;i++){
        var $this = $(ssbl003_name4_length[i]);
        if($.trim($this.val())==""){
          errMsg="请填写占地面积";
          errIndex =1 + i;
          Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
          return;
        }
        if(!f_check_rolefloat(ssbl003_name4_length[i])){
          errMsg="占地面积请填写数值类型";
          errIndex =1 + i;
          Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
        }
        temp_zdmj.push($.trim($this.val()));
        var ssbl003_name3_length = document.getElementsByName("ssbl003_name_ysMj");
        for(var i=0;i<ssbl003_name3_length.length;i++){
          var $this = $(ssbl003_name3_length[i]);
          if($.trim($this.val())==""){
            errMsg="请填写应税面积";
            errIndex = 1 + i;
            Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
            return;
          }
          if(!f_check_rolefloat(ssbl003_name3_length[i])){
            errMsg="应税面积请填写数值类型";
            errIndex = 1 + i;
            Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
            return;
          }
          var prevInputDiv = $this.parent().parent().prev().children()[1];
          var prevInput = $(prevInputDiv).children()[0];
          if(parseFloat($this.val())>parseFloat($(prevInput).val())){
            errMsg="应税面积不应大于占地面积";
            errIndex = 1 + i;
            Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
            return;
          }
          temp_ysmj.push($.trim($this.val()));
        }
      }
      //
      var ssbl003_name2_length = document.getElementsByName("ssbl003_name_sqjmMj");
      for(var i=0;i<ssbl003_name2_length.length;i++){
        var $this = $(ssbl003_name2_length[i]);
        if($.trim($this.val())==""){
          errMsg="请填写申请减免面积";
          errIndex = 1 + i;
          Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
          return;
        }
        if(!f_check_rolefloat(ssbl003_name2_length[i])){
          flag = false;
          errMsg="申请减免面积请填写数值类型";
          errIndex = 1 + i;
          Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
          return;
        }
        var ysMjInputDiv = $this.parent().parent().prev().prev().prev().children()[1];
        var ysMjInput = $(ysMjInputDiv).children()[0];
        if(parseFloat($this.val())>parseFloat($(ysMjInput).val())){
          errMsg = "申请减免面积不应大于应税面积";
          errIndex = 1 + i;
          Loading.commonAlert("第"+(errIndex)+"行信息中："+errMsg);
          return;
        }
        temp_sqjmmj.push($.trim($this.val()));
      }
      //
      var ssbl003_name1_length = document.getElementsByName("ssbl003_name_sqjmSe");
      for(var i=0;i<ssbl003_name1_length.length;i++){
        var $this = $(ssbl003_name1_length[i]);
        if($.trim($this.val())==""){
          errMsg="请填写申请减免税额";
          errIndex =1 + i;
          Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
          return;
        }else if(!f_check_rolefloat(ssbl003_name1_length[i])){
          errMsg="申请减免税额请填写数值类型";
          errIndex =1 + i;
          Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
          return;
        }
        var nyNseInputDiv =  $this.parent().parent().prev().prev().children()[1];
        var nyNseInput = $(nyNseInputDiv).children()[0];
        if(parseFloat($this.val())>parseFloat($(nyNseInput).val())){
          errMsg="申请减免税额不大于年应纳税额";
          errIndex =1 + i;
          Loading.commonAlert("第"+errIndex+"行信息中："+errMsg);
          return;
        }
        temp_sqjmse.push($.trim($this.val()));
      }
      //
      $("[name='ssbl003_name_dwSe']").each(function(){
        temp_dwse.push($(this).val());
      });
      $("[name='ssbl003_name_nyNse']").each(function(){
        temp_nynse.push($(this).val());
      });
      $("[name='ssbl003_name_jmLx']").each(function(){
        temp_jmlx.push($(this).val());
      });
      for(var i=0;i<infoLength;i++){
        $rootScope.ssbl003.ssbl003_lineFileDate.push({
          zsxmdm:$rootScope.ssbl003.ssbl003_zsxm,
          zspmdm:temp_sqjmsm[i],zdmj:temp_zdmj[i],
          ysmj:temp_ysmj[i],dwse:temp_dwse[i],nynse:temp_nynse[i],
          sqjmmj:temp_sqjmmj[i],sqjmse:temp_sqjmse[i],jmlxdm:temp_jmlx[i]});
      }
      $state.go('tab.ssbl003_4');
    }
  }])
  //涉税事项申请单3
  .controller('Ssbl003Ctrl4', ['$rootScope','$scope','$ionicHistory','Loading','AjaxPost','$cordovaCamera',
    '$ionicActionSheet','$timeout','$state','$window','AppInfo',
      function ($rootScope,$scope,$ionicHistory,Loading,AjaxPost,$cordovaCamera,$ionicActionSheet,$timeout,$state,$window,AppInfo) {
        var uuid = AppInfo.getUUID();
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
    };
    Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
    var data = {XMDM : $rootScope.ssbl003.ssbl003_ywsxdm};
        AjaxPost.getData( {
      jsonData : angular.toJson({
        blhName : "ZBfwBLH",
        data : data,
        handleCode : "queryFbzl",
        yhwybz : uuid,
        bizDataMw : formatStr(data.toString(),uuid)
      })
    })
      .then(function(responseText, textStatus,
                     XMLHttpRequest) {
        Loading.loadingHide();
        var response = Decrypt(responseText.toString(),uuid);
        var responseTex = JSON.parse(AjaxPost.change(response));
        if(checkResponse(responseTex)){
          $scope.fbzlList = responseTex.data.fbzlList;
        }else{
          Loading.commonAlert(responseTex.msg);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus);
      })
//照片配置
    var options = {
      quality : 20,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType : Camera.EncodingType.JPEG,
      popoverOptions : CameraPopoverOptions,
      saveToPhotoAlbum : false
    };
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

    $scope.goSubmit = function () {
      var ssbl003_imgLength = 0;
      var ssbl003_fileDate = [];
      var msg = '确定提交吗？';
      var imgEach = document.getElementsByName('imgContainter');
      for(var i=0;i<imgEach.length;i++){
        var imgList = imgEach[i].getElementsByTagName("img");
        if(imgList.length == 0){
          continue;
        }
        var zlBm = imgEach[i].getAttribute('id');
        var zlMc = imgEach[i].getAttribute('data-mc');
        for(var j=0;j<imgList.length;j++){
          var imgBase64 = cutBase64Str(imgList[j].getAttribute("src"));
          ssbl003_fileDate.push({zlBm:zlBm,zlMc:zlMc,type:"jpg",base64:imgBase64});
        }
        ssbl003_imgLength++;
      }
      if(ssbl003_imgLength==0){
        msg = "您没有上传附报资料,确定提交吗？";
      }
      Loading.commonConfirm(msg, function (res) {
        if (res) {
            var data = {
              swglm :$rootScope.ssbl003.ssbl003_currQy.SWGLM,
              sssqdl: "",
              sssqxl: $rootScope.ssbl003.ssbl003_ywsxdm,
              gljgDm: $rootScope.ssbl003.ssbl003_currQy.GLJG_DM,
              sqjmly: $rootScope.ssbl003.temp_sqly,
              sqjmlx: $rootScope.ssbl003.temp_jmLx,
              nsrMc: $rootScope.ssbl003.ssbl003_currQy.MC,
              jmxm: "",
              jmrqq: $rootScope.ssbl003.temp_jmqxQ,
              jmrqz: $rootScope.ssbl003.temp_jmqxZ,
              zcyj: $rootScope.ssbl003.temp_zcYj,
              zcyjxm:$rootScope.ssbl003.temp_zcYjMx,
              ywsxDm:$rootScope.ssbl003.ssbl003_ywsxdm,
              file:ssbl003_fileDate,
              mxxx:$rootScope.ssbl003.ssbl003_lineFileDate
            };
        	 var reqData = {
			 jsonData : angular.toJson({
				 xm: $rootScope.ssbl003.ssbl003_localUser.XM,
              	 sjHm: $rootScope.ssbl003.ssbl003_localUser.SJHM,
                 blhName : "Ssbl003BLH",
                 data : data,
                 handleCode : "insertSssxsq",
                 yhwybz : uuid,
                 bizDataMw : formatStr(data.toString(),uuid)
             })
	      };
         Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          AjaxPost.getData(reqData)
            .then(function(responseText, textStatus,
                           XMLHttpRequest) {
              Loading.loadingHide();
              var response = Decrypt(responseText.toString(),uuid);
              var responseTex = JSON.parse(AjaxPost.change(response));
              if(checkResponse(responseTex)){
                Loading.commonAlert(responseTex.msg, function () {
                  $window.location.href = 'index.html#/tab/taxService';
                });
              }else{
                Loading.commonAlert(responseTex.msg);
              }
            }, function(jqXHR, textStatus, errorThrown) {
              Loading.loadingHide();
              Loading.commonAlert(textStatus);
            })
        }
      })
    }

  }])
//已申请明细：基本信息
  .controller('Ssbl003Ctrl5', ['$rootScope','$scope','$ionicHistory','$stateParams','Loading','AjaxPost','$state','AppInfo',
                               	function ($rootScope,$scope,$ionicHistory,$stateParams,Loading,AjaxPost,$state,AppInfo) {
                                  var uuid = AppInfo.getUUID();
    $rootScope.hideTabs='tabs-item-hide';
    $scope.back =function() {
      $ionicHistory.goBack();
    };
    var lsh = $stateParams.lsh ;
    Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
    var data = {lsh : lsh};
                                  AjaxPost.getData({
    	jsonData : angular.toJson({
            blhName : "Ssbl003BLH",
            data : data,
            handleCode : "queryData",
            yhwybz : uuid,
            bizDataMw : formatStr(data.toString(),uuid)
        })
    })
      .then(function(responseText, textStatus,
                     XMLHttpRequest) {
        Loading.loadingHide();
        var response = Decrypt(responseText.toString(),uuid);
        var responseTex = JSON.parse(AjaxPost.change(response));
        if(checkResponse(responseTex)){
          $scope.jmxm = responseTex.data.ywsxmc;
          $scope.zcyj = responseTex.data.zcyjmc;
          $scope.sqly = responseTex.data.sqjmly;
          $scope.sqrmc = responseTex.data.sqrmc;
          $scope.jmrqq = responseTex.data.jmrqq;
          $scope.jmrqz = responseTex.data.jmrqz;
          var dataList = responseTex.data.dataList;
          $scope.sqjmlx = dataList[0].sqjmlxmc;
          $rootScope.ssbl003.mxlist = dataList;
        }else{
          Loading.commonAlert(responseTex.msg);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Loading.loadingHide();
        Loading.commonAlert(textStatus);
      })
      $scope.more = function () {
        $state.go('tab.ssbl003_6');
      }
  }])
  //已申请明细：行信息
  .controller('Ssbl003Ctrl6', ['$rootScope','$scope','$ionicHistory','Loading','$timeout',
    function ($rootScope,$scope,$ionicHistory,Loading,$timeout) {
      $rootScope.hideTabs='tabs-item-hide';
      $scope.back =function() {
        $ionicHistory.goBack();
      };
      $timeout(function () {
        $("#ssbl003_table2").footable();
      },0);
  }])
