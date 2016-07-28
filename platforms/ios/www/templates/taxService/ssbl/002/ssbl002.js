/**
 * Created by Administrator on 2016/3/30.
 */
angular.module('ssbl002.controllers',[])
  .config(function($stateProvider){
      $stateProvider
          //减免税申请首页
          .state('tab.ssbl002', {
              url: '/ssbl002',
              views: {
                  'taxService': {
                      templateUrl: 'templates/taxService/ssbl/002/ssbl002.html',
                      controller: 'Ssbl002Ctrl'
                  }
              }
          })
          //减免税申请
          .state('tab.ssbl002_1',{
              url:'/ssbl002_1',
              views:{
                  'taxService':{
                      templateUrl:'templates/taxService/ssbl/002/ssbl002_1.html',
                      controller:'Ssbl002_1Ctrl'
                  }
              }
          })
          //查看
          .state('tab.ssbl002_2',{
              url:'/ssbl002_2/:lsh',
              views:{
                  'taxService':{
                      templateUrl:'templates/taxService/ssbl/002/ssbl002_2.html',
                      controller:'Ssbl002_2Ctrl'
                  }
              }
          })
          //受理意见
          .state('tab.ssbl002_3',{
              url:'/ssbl002_3/:lsh:bbzt:lcslh',
              views:{
                  'taxService':{
                      templateUrl:'templates/taxService/ssbl/002/ssbl002_3.html',
                      controller:'Ssbl002_3Ctrl'
                  }
              }
          })
          //申请表信息下一步
          .state('tab.ssbl002_4',{
              url:'/ssbl002_4',
              views:{
                  'taxService':{
                      templateUrl:'templates/taxService/ssbl/002/ssbl002_4.html',
                      controller:'Ssbl002_4Ctrl'
                  }
              }
          })
          //附报资料
          .state('tab.ssbl002_5',{
              url:'/ssbl002_5',
              views:{
                  'taxService':{
                      templateUrl:'templates/taxService/ssbl/002/ssbl002_5.html',
                      controller:'Ssbl002_5Ctrl'
                  }
              }
          }) ;
  })
  .controller('Ssbl002Ctrl',function($scope,$rootScope,$ionicNavBarDelegate,$ionicActionSheet,Loading,$timeout,AjaxPost,$state,AppInfo){
      var uuid = AppInfo.getUUID();
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      //当前企业名称
      var mrQy = $.evalJSON(localStorage.getItem('mrQyxx'));
      if(mrQy ==null){
          $scope.curQymc ='';
      }else{
          $scope.curQymc =mrQy.MC;
          $rootScope.curQymc = mrQy.MC;
      }
      $scope.swglm =mrQy.SWGLM;
      $rootScope.swglm = mrQy.SWGLM;
      //查询减免申请状态列表
      $scope.getJmssqzt = function(){
          var data = {swglm : $scope.swglm, sqlxdm : "SQ019"};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "ZBfwBLH",
                  handleCode : "search",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  $("#ssbl002_cxlist").empty();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  var ztList = responseTex.data.ZtList;
                  if (checkResponse(responseTex)){
                      $scope.ztList =ztList;
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      $timeout(function(){
          $scope.getJmssqzt();
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
      },300);

      //下拉更新
      $scope.loadRefresh = function(){
          $scope.getJmssqzt();
          $scope.$broadcast('scroll.refreshComplete');
      };

      //切换企业的方法
      $scope.qhqyxx = function(){
          var arr = findAllQyByLocal();
          if(arr == null){
              Loading.loadingTimoutHide('没有企业信息');
              return false;
          }
          var con =[];//存放企业名称
          var swglm = [];//存放税务管理码
          for(var i=0;i<arr.length;i++){
              con.push({text:arr[i].MC});
              swglm.push({swglm:arr[i].SWGLM});
          }
          $ionicActionSheet.show({
              titleText :'切换企业',
              buttons : con,
              buttonClicked : function(index){
                  $scope.curQymc = con[index].text;
                  $scope.swglm = swglm[index].swglm;
                  $rootScope.curQymc = con[index].text;
                  $rootScope.swglm = swglm[index].swglm;
                  $scope.getJmssqzt();
                  return true;
              }
          });
      };
      //$scope.$watch('swglm',function(newVal,oldVal){
      //    if(newVal!=oldVal){
      //        $scope.getJmssqzt();
      //    }
      //});
      //查看
      $scope.ck = function(lsh){
          $state.go('tab.ssbl002_2',{'lsh':lsh});
      };
      //受理意见
      $scope.slyj = function(lsh,bbzt,lcslh){
          $state.go('tab.ssbl002_3',{'lsh':lsh,'bbzt':bbzt,'lcslh':lcslh});
      };
  })
  .controller('Ssbl002_1Ctrl',function($scope,$ionicNavBarDelegate,$ionicActionSheet,Loading,$timeout,AjaxPost,$state,taxFactory,$rootScope,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      //当前企业名称
      $scope.curQymc =$rootScope.curQymc;//$.evalJSON(localStorage.getItem('mrQyxx')).MC;

      $scope.jmlb = [];//减免类别
      //减免税申请--减免类别
      $scope.jumpToJmssq = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Ssbl002BLH",
                  handleCode : "querySsxmXl",
                  data : {},
                  yhwybz : uuid,
                  bizDataMw : formatStr('2123uou4sfslflsflsdsfsdfs',uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      for (var i = 0; i < responseTex.data.xlList.length; i++){
                          $scope.jmlb.push({mc:responseTex.data.xlList[i].MC,dm:responseTex.data.xlList[i].SSSQXL_DM});
                      }
                      $scope.mrJmlb = [];//默认减免类别
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      $timeout(function(){
          $scope.jumpToJmssq();
      },300);

      //请求减免项目
      $scope.requestJmxm = function(obj){
          $scope.mrJmlb = obj;
          taxFactory.jmssqCache.mrJmlb =obj;
          $scope.jmxm = [];//减免项目
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {SSSQXL_DM : obj.dm};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "ZBfwBLH",
                  handleCode : "queryYwsxByXl",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      for (var i = 0; i < responseTex.data.dataList.length; i++) {
                          $scope.jmxm.push({mc:responseTex.data.dataList[i].YWSX_MC,dm:responseTex.data.dataList[i].YWSX_DM});
                      }
                      $scope.mrJmxm = [];//默认减免项目
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };

      //请求政策依据
      $scope.requestZcyj = function(obj){
          $scope.mrJmxm = obj;
          taxFactory.jmssqCache.mrJmxm =obj;
          $scope.zcyj = [];//政策依据
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {YWSX_DM : obj.dm};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "ZBfwBLH",
                  handleCode : "queryZcyj",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      for (var i = 0; i < responseTex.data.zcyjList.length; i++) {
                          $scope.zcyj.push({mc:responseTex.data.zcyjList[i].WJMC,dm:responseTex.data.zcyjList[i].SXXM});
                      }
                      $scope.mrZcyj = [];//默认政策依据
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      //得到政策依据
      $scope.getZcyj = function(obj){
          $scope.mrZcyj = obj;
          taxFactory.jmssqCache.mrZcyj =obj;
      };
      var sqly = ''//申请理由
      //下一步
      $scope.next = function(){
          sqly = document.getElementById('sqly').value;
          if($scope.mrJmlb == ''){
              Loading.loadingTimoutHide('请选择减免类别');
              return;
          }
          if($scope.mrJmxm == ''){
              Loading.loadingTimoutHide('请选择减免项目');
              return ;
          }
          if($scope.mrZcyj == ''){
              Loading.loadingTimoutHide('请选择政策依据');
              return ;
          }
          if(sqly == ''){
              Loading.loadingTimoutHide('请填写申请理由');
              return ;
          }
          taxFactory.jmssqCache.sqly = sqly;
          $state.go('tab.ssbl002_4');
      };
  })
  .controller('Ssbl002_2Ctrl',function($scope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      $scope.back = function(){
          $ionicNavBarDelegate.back();
      };
      $scope.getCk = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {LSH : $stateParams.lsh};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Ssbl002BLH",
                  handleCode : "queryData",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      var jmlb = responseTex.data.dataList[0].JMLB_MC;//减免类别
                      var wjmc = responseTex.data.WJMC;//政策依据名称
                      var ywsx_mc = responseTex.data.YWSX_MC;//业务事项名称(非营利组织收入免征企业所得税)
                      var sqly = responseTex.data.SQJMLY;//申请理由
                      $('#cx_jg').empty();
                      $('#cx_jg').append('<tr><td style="text-align: center">减免类别</td><td style="text-align: center;border-left: hidden">查看详细</td><td>' + jmlb + '</td></tr><tr><td style="text-align: center">减免项目</td><td style="text-align: center;border-left: hidden">查看详细</td><td>' + ywsx_mc + '</td></tr><tr><td style="text-align: center">减免依据</td><td style="text-align: center;border-left: hidden">查看详细</td><td>' + wjmc + '</td></tr><tr><td style="text-align: center">申请理由</td><td style="text-align: center;border-left: hidden">查看详细</td><td>' + sqly + '</td></tr>');
                      $("#cx_jg_list").empty();
                      for (var i = 0; i < responseTex.data.dataList.length; i++) {
                          var zspm_dm = responseTex.data.dataList[i].ZSPM_DM;
                          //征收品目代码
                          var zcyjxm = responseTex.data.dataList[i].ZCYJXM;
                          //政策依据细目
                          var jmlx_dm = responseTex.data.dataList[i].JMLX_DM;
                          //减免类型代码
                          var sqjm_je = NullTOEmpty(responseTex.data.dataList[i].SQJM_JE);
                          //申请减免金额
                          var jmxm_dm = responseTex.data.dataList[i].JMXM_DM;
                          //减免项目代码
                          var sl = NullTOEmpty(responseTex.data.dataList[i].SL);
                          //税率
                          var zsxm_dm = responseTex.data.dataList[i].ZSXM_DM;
                          //征收项目代码
                          var zspm_mc = responseTex.data.dataList[i].ZSPM_MC;
                          //征收品目名称(城市)
                          var zsxm_mc = responseTex.data.dataList[i].ZSXM_MC;
                          //征收项目名称(城市维护建设)
                          var sqjmqx_qsrq = NullTOEmpty(responseTex.data.dataList[i].SQJMQX_QSRQ);
                          //申请减免期限（起始日期）
                          var sqjmqx_zzrq = NullTOEmpty(responseTex.data.dataList[i].SQJMQX_ZZRQ);
                          //申请减免期限（终止日期）
                          var sqjmfd = NullTOEmpty(responseTex.data.dataList[i].SQJMFD);
                          //申请减免比例
                          $("#cx_jg_list").append('<tr><td style="text-align: center">' + zsxm_mc + '</td><td style="text-align: center;border-left: hidden">查看详细</a></td><td>' + zspm_mc + '</td><td>' + sqjm_je + '</td><td>' + sl + '</td><td>' + sqjmfd + '</td><td>' + sqjmqx_qsrq + '</td><td>' + sqjmqx_zzrq + '</td></tr>');
                      }
                      $('.table-bordered').footable();
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      $timeout(function(){
          $scope.getCk();
      },300);

  })
  .controller('Ssbl002_3Ctrl',function($scope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $scope.slyj_if = false;
      $scope.slyj = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {
              lsh : $stateParams.lsh,
              bbzt :$stateParams.bbzt,
              lcslh : $stateParams.lcslh
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "ZBfwBLH",
                  handleCode : "querySlyj",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  $("#slyj_infos").empty();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      var dataList = responseTex.data.slyjList;
                      if(dataList.length>0){
                          $scope.slyj_if = true;
                      }
                      for(var i=0;i<dataList.length;i++){
                          $("#slyj_infos").append('<p>办理人员名称：<span>'+dataList[i].blrymc+'</span></p>'+
                            '<p>办理税务机关员名称：<span>'+dataList[i].blswjgmc+'</span></p>'+
                            '<p>录入时间：<span>'+dataList[i].lrsj+'</span></p>'+
                            '<p>审批依据：<span>'+dataList[i].shspyj+'</span></p>'+
                            '<p>环节名称：<span>'+dataList[i].wfhdmc+'</span></p>');
                      }
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      $timeout(function(){
          $scope.slyj();
      },300);
  })
  .controller('Ssbl002_4Ctrl',function($scope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost,$compile,$state,taxFactory,$rootScope,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      var data = new Array();
      var pmData = new Array();
      //保存ZSPM_DM的值
      var xmData = new Array();
      //保存ZSXM_DM的值
      var xm_pmData = new Array();
      $scope.put = function(key, value){
          data[key] = value;
      };
      $scope.get = function(key){
          if ( key in data) {
              return data[key];
          }
      };
      //请求申请内容
      var zsxmOption = "";
      $scope.requestSqnr = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          //var userInfo = findSxQyByLocal();
          //var swglm = userInfo.SWGLM;
          var data1 = {swglm : $rootScope.swglm};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Ssbl002BLH",
                  handleCode : "queryJdxx",
                  data : data1,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data1.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      for (var i = 0; i < responseTex.data.jdList.length; i++) {
                          $scope.put(responseTex.data.jdList[i].ZSXM_DM, responseTex.data.jdList[i].ZSXM_MC);
                          $scope.put(responseTex.data.jdList[i].ZSXM_DM + responseTex.data.jdList[i].ZSPM_DM, responseTex.data.jdList[i].ZSPM_MC);
                          xm_pmData[i] = responseTex.data.jdList[i].ZSXM_DM + responseTex.data.jdList[i].ZSPM_DM;
                          xmData[i] = responseTex.data.jdList[i].ZSXM_DM;
                          pmData[i] = responseTex.data.jdList[i].ZSPM_DM;
                      }
                      for (var i = 0; i < xmData.length; i++) {
                          for (var j = 1; j < xmData.length; j++) {
                              if (xmData[i] == xmData[j] && i != j) {
                                  xmData.splice(j, 1);
                              }
                          }
                      }
                      for (var i = 0; i < pmData.length; i++) {
                          for (var j = 0; j < pmData.length; j++) {
                              if (pmData[i] == pmData[j] && i != j) {
                                  pmData[j] = null;
                              }
                          }
                      }
                      for (var i = 0; i < xm_pmData.length; i++) {
                          for (var j = 1; j < xm_pmData.length; j++) {
                              if (xm_pmData[i] == xm_pmData[j] && i != j) {
                                  xm_pmData.splice(j, 1);
                              }
                          }
                      }
                      for (var i = 0; i < xm_pmData.length; i++) {
                          for (var j = 1; j < xm_pmData.length; j++) {
                              if (data[xm_pmData[i]] == data[xm_pmData[j]] && xm_pmData[i] != xm_pmData[j]) {
                                  data.splice(xm_pmData[j], 1);
                              }
                          }
                      }
                      zsxmOption = "<option>请选择申请减免税种</option>";
                      for (var i = 0; i < xmData.length; i++) {
                          var value = $scope.get(xmData[i]);
                          zsxmOption += '<option value=' + xmData[i] + '>' + value + '</option>';
                      }
                  }else {
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };

      $scope.footableOption = function(){
          $("#ssbl002_tableDiv").html('');
          $("#ssbl002_tableDiv").html('<table class="table table-bordered" id="ssbl002_tableFootable">' + '<thead><tr><th data-toggle="true">申请减免</th><th data-hide="all">申请减免税种</th><th data-hide="all">申请减免税目</th><th data-hide="all">减免税额</th><th data-hide="all">减免税率</th><th data-hide="all">减免比例</th><th data-hide="all">减免期起</th><th data-hide="all">减免期止</th><th data-sort-ignore="true" data-name="Delete"></th></tr></thead><tbody id="ssbl002_tbody"></tbody></table>');
          $('.table-bordered').footable();
          //$('.add-row').unbind("click");
      };
      //删除行
      $scope.rowDelete = function(val){
          var row = $('.row-delete').parent('td').parent('.list'+val);
          var footable = $('#ssbl002_tableFootable').data('footable');
          footable.removeRow(row);
      };
      //增加行
      var index = 1;
      $scope.addRow = function(e){
          //e.preventDefault();
          var footable = $('#ssbl002_tableFootable').data('footable');//$compile(sqjg)($scope);
          var newRow = $compile('<tr name="ssbl002_lineinfos" class="list'+index+'"><td ng-click="ssbl002_toggleClick('+index+')">申请内容</td>' + '<td ce><select id="ssbl002_sqjmsz_' + index + '" name="selectOption" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;width: 100%;cellspacing:10px">'+zsxmOption+'</select></td>' + '<td><select id="ssbl002_sqjmsm_' + index + '" name="selectOption1" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;width: 100%;cellspacing:10px"><option>请选择申请减免税目</option></select></td>' + '<td><input type="number" cal="true" name="ssbl002_jmse" id="ssbl002_jmse_' + index + '"  ng-blur="initCal()" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' + '<td><input type="number" cal="true" name="ssbl002_jmsl" id="ssbl002_jmsl_' + index + '" ng-blur="initCal()" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width:100%"></td>' + '<td><input type="number" cal="true" name="ssbl002_jmbl" id="ssbl002_jmbl_' + index + '" ng-blur="initCal()" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' + '<td><input type="date" name="ssbl002_jmqq" placeholder="yyyy-MM-dd" format="yyyy-MM-dd"  ng-blur="checkDate(this)" id="ssbl002_jmqq_' + index + '" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' + '<td><input type="date" name="ssbl002_jmqz" placeholder="yyyy-MM-dd" format="yyyy-MM-dd"  ng-blur="checkDate(this);"  id="ssbl002_jmqz_' + index + '" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' + '<td style="vertical-align: middle;text-align: center" ><a class="row-delete calm" ng-click="rowDelete('+index+')">删除</a></td></tr>')($scope);
          footable.appendRow(newRow);
          index++;
          $scope.changeContent();
      };
      //数据格式化
      var ssbl002_cal='';
      $scope.initCal = function(){
          ssbl002_cal = new caltb("ssbl002_tableFootable");
          initCalTable(ssbl002_cal);
      };

      //change事件取申请减免税目内容
      $scope.changeContent = function(){
          var v = 0;
          for (v; v < index; v++) {
              var sqjmsm = $("#ssbl002_sqjmsm_" + v);
              if (sqjmsm != null || sqjmsm != undefined) {
                  $("#ssbl002_sqjmsz_" + v).change(function() {
                      var val = $(this).val();
                      sqjmsm[0].options.length = 1;
                      var content = "";
                      for (var i = 0; i < pmData.length; i++) {
                          var key = val + pmData[i];
                          var value = $scope.get(key);
                          if (value != undefined) {
                              content += '<option value=' + pmData[i] + '>' + value + '</option>';
                          }
                      }
                      sqjmsm.append(content);
                  });
              }
          }
      };

      //table表的隐藏显示切换
      $scope.ssbl002_toggleClick = function(val){
          var footable = $('#ssbl002_tableFootable').data('footable');
          var $row = $('.list'+val);
          if (!$row.hasClass('footable-detail-show')) {
              //当前正在进行展开操作收起其他
              $row.addClass('current-tr');
              $("tbody tr").each(function() {
                  if ($(this).hasClass('footable-detail-show') && !$(this).hasClass('current-tr')) {
                      footable.toggleDetail($(this));
                  }
              });
              $row.removeClass('current-tr');
          }
      };

      $timeout(function(){
          $scope.requestSqnr();
          $scope.footableOption();
      },300);

      //下一步-》附报资料
      var idTag = new Array();
      var idTap = new Array();
      var imgAppend = new Array();
      var imgScroll = new Array();
      var errMsg = "";
      var errIndex = 0;
      $scope.nextStep = function(){
          taxFactory.jmssqCache.index = index;
          if ($("[name='ssbl002_lineinfos']").length == 0) {
            Loading.loadingTimoutHide("请添加行信息!");
            return false;
          }
          errMsg = "";
          errIndex = 0;
          var footable = $('#ssbl002_tableFootable').data('footable');
          $("tbody tr").each(function() {
              if ($(this).hasClass('footable-detail-show')) {
                  footable.toggleDetail($(this));
              }
          });
          var ssbl002_select0_length = document.getElementsByName("selectOption");
          for(var i = 0; i < ssbl002_select0_length.length; i++) {
              var $this = $(ssbl002_select0_length[i]);
              if($this.val() == "请选择申请减免税种"){
                  errMsg = "请选择申请减免税种";
                  errIndex = 1 + i;
                  Loading.popupAlert('系统提示',"第" + errIndex + "行信息中：" + errMsg).then(function(res){
                      if(res){
                          footable.toggleDetail($("#ssbl002_tbody tr").eq(i));
                          ssbl002_select0_length[i].focus();
                      }
                  });
                  return false;
              }
          }
          var ssbl002_select1_length = document.getElementsByName("selectOption1");
          for (var i = 0; i < ssbl002_select1_length.length; i++) {
              var $this = $(ssbl002_select1_length[i]);
              if ($this.val() == "请选择申请减免税目") {
                  errMsg = "请选择申请减免税目";
                  errIndex = 1 + i;
                  Loading.popupAlert('系统提示',"第" + errIndex + "行信息中：" + errMsg).then(function(res){
                      if(res){
                          footable.toggleDetail($("#ssbl002_tbody tr").eq(i));
                          ssbl002_select1_length[i].focus();
                      }
                  });
                  return false;
              }
          }
          var ssbl002_input1_length = document.getElementsByName("ssbl002_jmse");//减免税额
          var ssbl002_input2_length = document.getElementsByName("ssbl002_jmsl");//	税率
          var ssbl002_input3_length = document.getElementsByName("ssbl002_jmbl");//	比例
          errIndex = 0;
          for (var i = 0; i < ssbl002_input1_length.length; i++) {
              var $this = $(ssbl002_input1_length[i]);
              var $sl = $(ssbl002_input2_length[i]);
              var $bl = $(ssbl002_input3_length[i]);
              if ($this.val() == "" && $sl.val() == "" && $bl.val()=="") {
                  errMsg = "请至少填写减免税额(或税率、比例任一项)";
                  errIndex = 1 + i;
                  Loading.popupAlert('系统提示',"第" + errIndex + "行信息中：" + errMsg).then(function(res){
                     if(res){
                         footable.toggleDetail($("#ssbl002_tbody tr").eq(i));
                         ssbl002_input1_length[i].focus();
                     }
                  });
                  return false;
              }
          }

          var ssbl002_input4_length = document.getElementsByName("ssbl002_jmqq");
          for (var i = 0; i < ssbl002_input4_length.length; i++) {
              var $this = $(ssbl002_input4_length[i]);
              if ($this.val() == "") {
                  errMsg = "请输入减免期起";
                  errIndex = 1 + i;
                  Loading.popupAlert('系统提示',"第" + errIndex + "行信息中：" + errMsg).then(function(res){
                      if(res){
                          footable.toggleDetail($("#ssbl002_tbody tr").eq(i));
                          ssbl002_input4_length[i].focus();
                      }
                  });
                  return false;
              }
          }
          var ssbl002_input5_length = document.getElementsByName("ssbl002_jmqz");
          for (var i = 0; i < ssbl002_input5_length.length; i++) {
              var $this = $(ssbl002_input5_length[i]);
              if ($this.val() == "") {
                  errMsg = "请输入减免期止";
                  errIndex = 1 + i;
                  Loading.popupAlert('系统提示',"第" + errIndex + "行信息中：" + errMsg).then(function(res){
                      if(res){
                          footable.toggleDetail($("#ssbl002_tbody tr").eq(i));
                          ssbl002_input5_length[i].focus();
                      }
                  });
                  return false;
              }
          }
          var sqbxx = [];//申请表信息
          for(var i = 1; i < index; i++){
              var sqjmsz = $("#ssbl002_sqjmsz_" + i).val();
              var sqjmsm = $("#ssbl002_sqjmsm_" + i).val();
              var jmse = $("#ssbl002_jmse_" + i).val();
              var jmsl = $("#ssbl002_jmsl_" + i).val();
              var jmbl = $("#ssbl002_jmbl_" + i).val();
              var jmqq = $("#ssbl002_jmqq_" + i).val();
              var jmqz = $("#ssbl002_jmqz_" + i).val();
              sqbxx[i-1] = {sqjmsz:sqjmsz,sqjmsm:sqjmsm,jmse:jmse,jmsl:jmsl,jmbl:jmbl,jmqq:jmqq,jmqz:jmqz};
          }
          taxFactory.jmssqCache.sqbxx = sqbxx;
          $state.go('tab.ssbl002_5');
      }
  })
  .controller('Ssbl002_5Ctrl',function($scope,$ionicNavBarDelegate,$stateParams,$timeout,Loading,AjaxPost,$compile,taxFactory,$ionicActionSheet,$cordovaCamera,$rootScope,AppInfo,$window,$state){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
        $ionicNavBarDelegate.back();
      };
      //请求附报资料
      var fbzlContent = "";
      $scope.requestFbzl = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {XMDM : taxFactory.jmssqCache.mrJmxm.dm};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "ZBfwBLH",
                  handleCode : "queryFbzl",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if(checkResponse(responseTex)){
                      for (var i = 0; i < responseTex.data.fbzlList.length; i++) {
                          fbzlContent += '<ion-item class="item item-icon-right item-text-wrap"  ng-click="uploadPhone('+responseTex.data.fbzlList[i].FBZL_DM+')"><span class="imgContainter" id="ssbl002_mc_'+responseTex.data.fbzlList[i].FBZL_DM+'">'+ responseTex.data.fbzlList[i].MC + '</span><i class="icon ion-ios-plus-outline" ></i></ion-item><ion-item><ion-scroll direction="x"><div id="ssbl002_imgFileList_' + responseTex.data.fbzlList[i].FBZL_DM + '" style="width: 600px;height:160px;border-top: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee; "></div></ion-scroll></ion-item>';
                      }
                      fbzlContent = $compile(fbzlContent)($scope);
                      $("#ssbl002_picture_list").empty();
                      $("#ssbl002_picture_list").append(fbzlContent);
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      $timeout(function(){
          $scope.requestFbzl();
      },300);

      //选择图片
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
                      openCamera('ssbl002_imgFileList_'+buttonId);
                  }
                  if(index==1){
                      openPicture('ssbl002_imgFileList_'+buttonId);
                  }
                  return true;
              },
              cancalText:'取消',
              cancal : function(){}
          });
        $timeout(function() {
          hideSheet();
        }, 3000);
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
                      if(res){
                          currentImg.remove();
                      }
                  })
              }
              var currentScroll = document.getElementById(containerId);
              currentScroll.appendChild(currentImg);
          },function(err) {
              Loading.popupAlert('系统提示',err);
          });
      };

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
                      if(res){
                          currentImg.remove();
                      }
                  })
              }
              var currentScroll = document.getElementById(containerId);
              currentScroll.appendChild(currentImg);
          },function(err){
              Loading.popupAlert('系统提示',err);
          });
      };

      //提交
      var ssbl002_QyxxVO = findSxQyByLocal();//企业信息
      var fileDate = new Array();
      var mxxxData = new Array();
      var lsh = "";
      $scope.tiJiao = function(){
          //SWGLM
          var SWGLM = $rootScope.swglm;
          var GLJG_DM = ssbl002_QyxxVO.GLJG_DM;
          //减免类别
          var JMLB = taxFactory.jmssqCache.mrJmlb.dm;
          //减免项目
          var JMXM_DM = taxFactory.jmssqCache.mrJmxm.dm;
          //政策依据
          var SXXM = taxFactory.jmssqCache.mrZcyj.dm;
          //申请理由
          var SQJMLY = taxFactory.jmssqCache.sqly;
          var ssbl002_Info = findUserByLocal();
          var index = taxFactory.jmssqCache.index;
          mxxxData = [];
          for(var i = 0; i < index-1; i++) {
              var sqjmsz = taxFactory.jmssqCache.sqbxx[i].sqjmsz;
              var sqjmsm = taxFactory.jmssqCache.sqbxx[i].sqjmsm;
              var jmse = taxFactory.jmssqCache.sqbxx[i].jmse;
              var jmsl = taxFactory.jmssqCache.sqbxx[i].jmsl;
              var jmbl = taxFactory.jmssqCache.sqbxx[i].jmbl;
              var jmqq = taxFactory.jmssqCache.sqbxx[i].jmqq;
              var jmqz = taxFactory.jmssqCache.sqbxx[i].jmqz;
              mxxxData.push({
                  ZSPM_DM : sqjmsm,
                  ZSXM_DM : sqjmsz,
                  SQJM_JE : jmse,
                  SQJMFD : jmsl,
                  SL : jmbl,
                  SQJMQX_QSRQ : jmqq,
                  SQJMQX_ZZRQ : jmqz
              });
          }
          var imgEach = document.getElementsByClassName("imgContainter");
          fileDate = [];
          for (var i = 0; i < imgEach.length; i++) {
              var div = imgEach[i];
              var tag = div.getAttribute("id").substr(-6);
              var mc = $("#ssbl002_mc_" + tag).text();
              var imgList = document.getElementById("ssbl002_imgFileList_" + tag).getElementsByTagName("img");
              for (var j = 0; j < imgList.length; j++){
                  var base64 = $scope.formatBase64Str(imgList[j].getAttribute("src"));
                  fileDate.push({
                      zlBm : tag,
                      zlMc : mc,
                      type : "jpg",
                      base64 : base64
                  });
              }
          }
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
          var data = {
              swglm : SWGLM,
              gljgDm : GLJG_DM,
              ywsxDm : JMXM_DM,
              nsrMc : ssbl002_QyxxVO.MC,
              nsrSbh : ssbl002_QyxxVO.NSRSBH,
              JMLB : JMLB,
              SXXM : SXXM,
              SQJMLY : SQJMLY,
              mxxx : mxxxData,
              file : fileDate
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Ssbl002BLH",
                  handleCode : "insertJmssp",
                  xm : ssbl002_Info.XM,
                  sjHm : ssbl002_Info.SJHM,
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(reqDatas)
              .then(function(responseText, textStatus,XMLHttpRequest){
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if(checkResponse(responseTex)){
                      Loading.loadingTimoutHide(responseTex.msg);
                      $window.location.href = 'index.html#/tab/taxService';
                      $rootScope.hideTabs = '';
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              },function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.popupAlert('系统提示',textStatus);
              });
      };
      $scope.formatBase64Str = function(str){
          str = str.replace(/data:image\/jpeg;base64,/ig, "");
          return str;
      };
  });
