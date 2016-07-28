/**
 * Created by Administrator on 2016/4/11.
 */
angular.module('sqhd004.controllers',[])
  .config(function($stateProvider){
      $stateProvider
          //投诉举报
          .state('tab.sqhd_tsjb', {
              url: '/sqhd_tsjb',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004.html",
                      controller: 'TsjbCtrl'
                  }
              }
          })
          //局长信箱
          .state('tab.sqhd_jzxx', {
              url: '/sqhd_jzxx',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1.html",
                      controller: 'JzxxCtrl'
                  }
              }
          })
          //局长信箱--我要写信
          .state('tab.sqhd_jzxx_wyxx', {
              url: '/sqhd_jzxx_wyxx',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1_1.html",
                      controller: 'Jzxx_wyxxCtrl'
                  }
              }
          })
          //局长信箱--你问我答
          .state('tab.sqhd_jzxx_nwwd', {
              url: '/sqhd_jzxx_nwwd',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1_2.html",
                      controller: 'Jzxx_nwwdCtrl'
                  }
              }
          })
          //局长信箱--回复公开
          .state('tab.sqhd_jzxx_hfgk', {
              url: '/sqhd_jzxx_hfgk/:sysid:handleCode',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1_3.html",
                      controller: 'Jzxx_hfgkCtrl'
                  }
              }
          })
          //局长信箱--回复公开内容
          .state('tab.sqhd_jzxx_hfgk_content', {
              url: '/sqhd_jzxx_hfgk_content/:id:handleCode',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1_3_1.html",
                      controller: 'Jzxx_hfgk_contentCtrl'
                  }
              }
          })
          //局长信箱--办理统计
          .state('tab.sqhd_jzxx_bltj', {
              url: '/sqhd_jzxx_bltj/:sysid:handleCode',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1_4.html",
                      controller: 'Jzxx_bltjCtrl'
                  }
              }
          })
          //局长信箱--查询回复
          .state('tab.sqhd_jzxx_cxhf', {
              url: '/sqhd_jzxx_cxhf/:id:code:tag:sysid:handleCode',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1_5.html",
                      controller: 'Jzxx_cxhfCtrl'
                  }
              }
          })
          //局长信箱--你问我答--我要咨询
          .state('tab.sqhd_jzxx_nwwd_wyzx', {
              url: '/sqhd_jzxx_nwwd_wyzx',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_1_2_1.html",
                      controller: 'Jzxx_nwwd_wyzxCtrl'
                  }
              }
          })
          //廉政行风投诉
          .state('tab.sqhd_lzxf', {
              url: '/sqhd_lzxf',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_2.html",
                      controller: 'LzxfCtrl'
                  }
              }
          })
          //廉政行风投诉--我要投诉
          .state('tab.sqhd_lzxf_wyts', {
              url: '/sqhd_lzxf_wyts',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_2_1.html",
                      controller: 'Lzxf_wytsCtrl'
                  }
              }
          })
          //发票违章
          .state('tab.sqhd_fpwz', {
              url: '/sqhd_fpwz',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_3.html",
                      controller: 'FpwzCtrl'
                  }
              }
          })
          //发票违章--我要举报
          .state('tab.sqhd_fpwz_wyjb', {
              url: '/sqhd_fpwz_wyjb',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_3_1.html",
                      controller: 'Fpwz_wyjbCtrl'
                  }
              }
          })
          //违法案件
          .state('tab.sqhd_wfaj', {
              url: '/sqhd_wfaj',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_4.html",
                      controller: 'WfajCtrl'
                  }
              }
          })
          //违法案件--我要举报
          .state('tab.sqhd_wfaj_wyjb', {
              url: '/sqhd_wfaj_wyjb',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_4_1.html",
                      controller: 'Wfaj_wyjbCtrl'
                  }
              }
          })
          //纳税服务
          .state('tab.sqhd_nsfw', {
              url: '/sqhd_nsfw',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_5.html",
                      controller: 'NsfwCtrl'
                  }
              }
          })
          //纳税服务--我要投诉
          .state('tab.sqhd_nsfw_wyts', {
              url: '/sqhd_nsfw_wyts',
              views: {
                  'publicService': {
                      templateUrl: "templates/publicService/sqhd/004/sqhd004_5_1.html",
                      controller: 'Nsfw_wytsCtrl'
                  }
              }
          })
  })
  .controller('TsjbCtrl',function($scope,$rootScope,$ionicNavBarDelegate,$state){
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.tsGo = function(type){
            switch (type){
                case 'sqhd_jzxx':
                    $state.go('tab.sqhd_jzxx');
                    break;
                case  'sqhd_lzxf':
                    $state.go('tab.sqhd_lzxf');
                    break;
                case  'sqhd_fpwz':
                    $state.go('tab.sqhd_fpwz');
                    break;
                case 'sqhd_wfaj':
                    $state.go('tab.sqhd_wfaj');
                    break;
                case 'sqhd_nsfw':
                    $state.go('tab.sqhd_nsfw');
                    break;
            }
      };
  })
  //局长信箱
  .controller('JzxxCtrl',function($scope,$ionicNavBarDelegate,$timeout,$ionicPopover,$state,Loading,$urlRouter){
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };      //'001','jzxx_bltj'
      $scope.slideMenu = [{name:'回复公开',url:'tab.sqhd_jzxx_hfgk'},{name:'办理统计',url:'tab.sqhd_jzxx_bltj'},{name:'查询回复',url:'tab.sqhd_jzxx_cxhf'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view style="width: 145px;height:130px;">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item item-icon-right sstzItem" ng-repeat="cbl in slideMenu" ng-click="qhfw(cbl.url)"><i class="icon ion-ios-arrow-right icon-accessory"></i>{{cbl.name}}</a></div></ion-content></ion-popover-view>';
      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openJzxxPopover = function($event){
          $scope.popover.show($event);
      };
      $scope.closeJzxxPopover = function(){
          $scope.popover.hide();
      };
      //我要写信
      $scope.wyxx = function(){
          $state.go('tab.sqhd_jzxx_wyxx');
      };
      //你问我答
      $scope.nwwd = function(){
          $state.go('tab.sqhd_jzxx_nwwd');
      };
      //切换服务
      $scope.qhfw = function(url){
          var handleCode ='';
          if(url=='tab.sqhd_jzxx_hfgk'){
              handleCode = 'jzxx_hfgk';
          }else if(url=='tab.sqhd_jzxx_bltj'){
              handleCode ='jzxx_bltj';
          }else{
              handleCode = 'jzxx_cxhf'
          }
          $state.go(url,{'sysid':'001','handleCode':handleCode});
          $scope.popover.hide();
      };
      //局长信箱 --我要写信的提交列表  //"001", "jzxx_cxhf"
      $timeout(function(){
          $scope.lb = $.evalJSON(localStorage.getItem("wyxx"));
      },300);
        //提交列表-详情
      $scope.tjlb_xq = function(id,code){
          $state.go('tab.sqhd_jzxx_cxhf',{'id':id,'code':code,'tag':'0','sysid':'001','handleCode':'jzxx_cxhf'});
      };
      //提交列表-删除
      $scope.tjlb_delete = function(id,code){
          Loading.popupConfirm('系统提示','确定要删除？').then(function(res){
              if(res){
                  var ns = $.evalJSON(localStorage.getItem("wyxx"));
                  for(var i=0;i<ns.length;i++){
                      if(ns[i].id==id && ns[i].code==code){
                        ns.splice(i,1);
                      }
                  }
                  localStorage.setItem("wyxx",$.toJSON(ns));
                  $scope.lb = $.evalJSON(localStorage.getItem("wyxx"));
              }
          });
      };
  })
  //我要写信
  .controller('Jzxx_wyxxCtrl',function($scope,$ionicNavBarDelegate,Loading,AjaxPost,$state,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      //我要写信的内容
      $scope.wyxx_con ={
          gk:'0',
          title:'',
          content:'',
          sjdw:'',
          name:'',
          lxdh :'',
          sjhm:'',
          email:''
      };
      //涉及的单位
      $scope.wyxx_sjdw = [{id:'-2',name:'请点选主要涉及单位*'},{id:'0031',name:'南京地税'},{id:'0030',name:'无锡地税'},
          {id:'0027',name:'徐州地税'},{id:'0029',name:'常州地税'},{id:'0014',name:'苏州地税'},{id:'0095',name:'南通地税'},
          {id:'0032',name:'连云港地税'},{id:'0045',name:'淮安地税'},{id:'0044',name:'盐城地税'},{id:'0038',name:'扬州地税'},
          {id:'0034',name:'镇江地税'},{id:'0008',name:'泰州地税'},{id:'0094',name:'宿迁地税'},{id:'0007',name:'苏州工业园区地税'},{id:'0033',name:'张家港保税区地税'}];
      //默认涉及的单位
      $scope.wyxx_con.sjdw =$scope.wyxx_sjdw[0];
      //我要写信--重置
      $scope.wyxx_cz = function(){
          var p='';
          for(p in $scope.wyxx_con){
              $scope.wyxx_con[p]='';
              if(p=='gk'){
                  $scope.wyxx_con[p]='0';
              }
              if(p=='sjdw'){
                  $scope.wyxx_con[p]=$scope.wyxx_sjdw[0];
              }
          }
      };
      //我要写信--提交
      $scope.wyxx_tj = function(){
          if ($scope.wyxx_con.title == "") {
              Loading.loadingTimoutHide("请输入主题");
              return;
          }
          if ($scope.wyxx_con.content == "") {
              Loading.loadingTimoutHide("请输入内容");
              return;
          }
          if ($scope.wyxx_con.sjdw.id == "-2") {
              Loading.loadingTimoutHide("请点选您反映情况主要涉及的单位");
              return;
          }
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
          var data = {
              gk : $scope.wyxx_con.gk,
              bt : $scope.wyxx_con.title,
              content : $scope.wyxx_con.content,
              dw : $scope.wyxx_con.sjdw.id,
              name : $scope.wyxx_con.name,
              tel : $scope.wyxx_con.lxdh,
              phone : $scope.wyxx_con.sjhm,
              email : $scope.wyxx_con.email,
              sysid : "001"
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : "jzxx_wyxx",
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
                      var arr;
                      if (localStorage.getItem("wyxx") == null) {
                          arr = new Array();
                      }else {
                          arr = $.evalJSON(localStorage.getItem("wyxx"));
                      }
                      var ns ={id:'',code :'', title:''};
                      ns.id = responseTex.data.id;
                      ns.code = responseTex.data.code;
                      ns.title = $scope.wyxx_con.title;
                      arr.push(ns);
                      localStorage.setItem("wyxx", $.toJSON(arr));
                      Loading.loadingTimoutHide(responseTex.msg);
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //你问我答
  .controller('Jzxx_nwwdCtrl',function($scope,$ionicNavBarDelegate,$state,$timeout,Loading){
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $scope.wyxx = function(){
          $state.go('tab.sqhd_jzxx_nwwd_wyzx');
      };
      //局长信箱 --你问我答的咨询列表  //"001", "jzxx_cxhf"
      $timeout(function(){
          $scope.lb = $.evalJSON(localStorage.getItem("nwwd"));
      },300);
      //咨询列表-详情
      $scope.zxlb_xq = function(id,code){
          $state.go('tab.sqhd_jzxx_cxhf',{'id':id,'code':code,'tag':'0','sysid':'003','handleCode':'nwwd_cxhf'});
      };
      //咨询列表-删除
      $scope.zxlb_delete = function(id,code){
          Loading.popupConfirm('系统提示','确定要删除？').then(function(res){
              if(res){
                  var ns = $.evalJSON(localStorage.getItem("nwwd"));
                  for(var i=0;i<ns.length;i++){
                      if(ns[i].id==id && ns[i].code==code){
                          ns.splice(i,1);
                      }
                  }
                  localStorage.setItem("nwwd",$.toJSON(ns));
                  $scope.lb = $.evalJSON(localStorage.getItem("nwwd"));
              }
          });
      };
  })
  //局长信箱—回复公开
  .controller('Jzxx_hfgkCtrl',function($scope,$ionicNavBarDelegate,$timeout,Loading,AjaxPost,$state,$stateParams,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      //局长信箱--公开回复列表
      $scope.fanYe = false;
      $scope.previous = '上一页';
      $scope.next = '下一页';
      var currentPage = 1;
      $timeout(function(){
          $scope.hfgk_public(currentPage);
      },300);
      $scope.previousPage = function(){
          $scope.hfgk_public(--currentPage);
      };
      $scope.nextPage = function(){
          $scope.hfgk_public(++currentPage);
      };
      $scope.hfgk_public = function(curPage){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {
              currentPage : curPage + "",
              orderfield  : '1',
              sysid : $stateParams.sysid
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : $stateParams.handleCode,
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
                      for (var i = 0; i < responseTex.data.List.length; i++) {
                          if (responseTex.data.List[i].endtime == "") {
                              responseTex.data.List[i].endtime = "<br>";
                          }
                          if (responseTex.data.List[i].title == "") {
                              responseTex.data.List[i].title = "<br>";
                          }
                          if (responseTex.data.List[i].endtime == "") {
                              responseTex.data.List[i].endtime = "<br>";
                          }
                          //$(appendListId).append('<li name=' + name + '><div style="display: inline-block">' + '<div style="float:left;width:30%">办件编号</div><div style="float:left;width:70%">' + responseText.data.List[i].vc_mailnumber + '</div>' + '<div style="float:left;width:30%">办件类型</div><div style="float:left;width:70%">' + responseText.data.List[i].vc_mailpropertyname + '</div>' + '<div style="float:left;width:30%">主题</div><div style="float:left;width:70%"><span style="color:#8BC1F0" target=' + responseText.data.List[i].vc_id + ' name="public_hfgkList">' + responseText.data.List[i].title + '</span></div>' + '<div style="float:left;width:30%">处理情况</div><div style="float:left;width:70%">' + responseText.data.List[i].state + '</div>' + '<div style="float:left;width:30%">来信时间</div><div style="float:left;width:70%">' + responseText.data.List[i].dt_sendtime + '</div>' + '<div style="float:left;width:30%">受理时间</div><div style="float:left;width:70%">' + responseText.data.List[i].endtime + '</div>' + '<div style="float:left;width:30%">点击次数</div><div style="float:left;width:70%">' + responseText.data.List[i].i_pointnum + '</div></div></li>');
                      }
                      $scope.hfgk_list = responseTex.data.List;
                      var len = responseTex.data.List.length;
                      if(len < 10 && currentPage ==1){
                          $scope.fanYe = false;
                      }else {
                          $scope.fanYe = true;
                      }
                      if(len <10){
                          $scope.next = '没有了';
                          $scope.nextDisplay = false;
                      }else{
                          $scope.next = '下一页';
                          $scope.nextDisplay = true;
                      }
                      if(currentPage == 1){
                          $scope.previous = '没有了';
                          $scope.previousDisplay = false;
                      }else{
                          $scope.previous = '上一页';
                          $scope.previousDisplay = true;
                      }
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });

      };
      //回复公开内容
      $scope.gkhf_content = function(id){
          $state.go('tab.sqhd_jzxx_hfgk_content',{'id':id,'handleCode':'jzxx_hfgkmx'});
      };
  })
  //局长信箱-回复公开内容
  .controller('Jzxx_hfgk_contentCtrl',function($scope,$ionicNavBarDelegate,$timeout,Loading,AjaxPost,$stateParams,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $timeout(function(){
          $scope.gkhf_content();
      },300);
      $scope.hfgkCon = false;
      //回复公开 -- 详情查看
      $scope.gkhf_content = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {vc_id : $stateParams.id};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : $stateParams.handleCode,
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
                      $scope.hfgkCon = true;
                      $scope.hfgk_content = responseTex.data;
                      if(responseTex.data.replay==''){
                          $scope.clqk =false;
                      }else{
                          $scope.clqk =true;
                      }
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //局长信箱-办理统计
  .controller('Jzxx_bltjCtrl',function($scope,$ionicNavBarDelegate,$timeout,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $("#jzxx_tj_years").empty();
      var year = new Date().getFullYear();
      var content = '<option>' + year + '</option><option>' + (year - 1) + '</option><option>' + (year - 2) + '</option><option>' + (year - 3) + '</option>';
      $("#jzxx_tj_years").append(content);
      $scope.jzxx_tj = false;
      //统计
      $scope.tj = function(){
          var curYear = $("#jzxx_tj_years").val();
          $scope.mrYear =curYear;
          $scope.tj_public(curYear,'001','jzxx_bltj');
      };
      //公共的办理统计方法
      $scope.tj_public = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {
              year : arguments[0] + "",
              sysid : arguments[1]
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : arguments[2],
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
                      $scope.jzxx_tj = true;
                      $scope.tj_content = responseTex.data;
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //局长信箱-查询回复
  .controller('Jzxx_cxhfCtrl',function($scope,$ionicNavBarDelegate,Loading,AjaxPost,$stateParams,$timeout,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $scope.jzxx_slbh = '';
      $scope.jzxx_cxm = '';
      $scope.jzxx_cxhf_if = false;
      //查询回复--查询
      console.log($scope.jzxx_slbh);
      $scope.cxhf_cx = function(){
          if($scope.jzxx_slbh=='' || $scope.jzxx_cxm==''){
              Loading.loadingTimoutHide('请输入受理编号或查询码');
              return;
          }
          //$scope.cxhf_public($scope.jzxx_slbh,$scope.jzxx_cxm);
      };
      $scope.cxhf_public = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {
              slbh : arguments[0],
              cxm : arguments[1],
              sysid : $stateParams.sysid
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : $stateParams.handleCode,
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
                      $scope.jzxx_cxhf_if = true;
                      $scope.jzxx_cxhf_con = responseTex.data;
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
      //我要写信的提交列表详情
      $timeout(function(){
          if($stateParams.tag =='0'){
              $scope.cx_if = false;
              $scope.cxhf_public($stateParams.id,$stateParams.code);
          }else{
              $scope.cx_if = true;
          }
      },300);
  })
  //局长信箱-你问我答-我要咨询
  .controller('Jzxx_nwwd_wyzxCtrl',function($scope,$ionicNavBarDelegate,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $scope.wyzx_con={
          swjg:'',
          title:'',
          content:'',
          gk:'1'
      };
      $scope.wyzx_swjg = [{id:'0',name:'请选择主管税务机关*'},{id:'0006',name:'江苏地税直属税务局'},{id:'0031',name:'南京地税局'},{id:'0030',name:'无锡地税局'},
        {id:'0027',name:'徐州地税局'},{id:'0029',name:'常州地税局'},{id:'0014',name:'苏州地税局'},{id:'0095',name:'南通地税局'},
        {id:'0032',name:'连云港地税局'},{id:'0045',name:'淮安地税局'},{id:'0044',name:'盐城地税局'},{id:'0038',name:'扬州地税局'},
        {id:'0034',name:'镇江地税局'},{id:'0008',name:'泰州地税局'},{id:'0094',name:'宿迁地税局'},{id:'0007',name:'苏州工业园区地税局'},];
      $scope.wyzx_con.swjg = $scope.wyzx_swjg[0];
      //重置
      $scope.wyzx_cz = function(){
          var p='';
          for(p in $scope.wyzx_con){
              $scope.wyzx_con[p] = '';
              if(p=='gk'){
                  $scope.wyzx_con[p]='1';
              }
              if(p=='swjg'){
                  $scope.wyzx_con[p] =$scope.wyzx_swjg[0];
              }
          }
      };
      //提交
      $scope.wyzx_tj = function(){
          if($scope.wyzx_con.swjg.id=='0'){
              Loading.loadingTimoutHide('请选择主管税务机关');
              return;
          }
          if($scope.wyzx_con.title==''){
              Loading.loadingTimoutHide('请输入主题');
              return;
          }
          if($scope.wyzx_con.content==''){
              Loading.loadingTimoutHide('请输入内容');
              return;
          }
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
          var data = {
              gk : $scope.wyzx_con.gk,
              bt : $scope.wyzx_con.title,
              content : $scope.wyzx_con.content,
              dw : $scope.wyzx_con.swjg.id,
              sysid : "003"
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : "nwwd_wyzx",
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
                      var arr;
                      if (localStorage.getItem("nwwd") == null) {
                          arr = new Array();
                      } else {
                          arr = $.evalJSON(localStorage.getItem("nwwd"));
                      }
                      var ns = {id:'',code :'', title:''};
                      ns.id = responseTex.data.id;
                      ns.code = responseTex.data.code;
                      ns.title = $scope.wyzx_con.title;
                      arr.push(ns);
                      localStorage.setItem("nwwd", $.toJSON(arr));
                      Loading.loadingTimoutHide(responseTex.msg);
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //廉政行风
  .controller('LzxfCtrl',function($scope,$ionicNavBarDelegate,$ionicPopover,$state,Loading,$timeout){
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $scope.slideMenu = [{name:'办理统计',url:'tab.sqhd_jzxx_bltj'},{name:'查询回复',url:'tab.sqhd_jzxx_cxhf'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view style="width: 145px;height:90px;">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item item-icon-right sstzItem" ng-repeat="cbl in slideMenu" ng-click="qhfw(cbl.url)"><i class="icon ion-ios-arrow-right icon-accessory"></i>{{cbl.name}}</a></div></ion-content></ion-popover-view>';
      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openLzxfPopover = function($event){
          $scope.popover.show($event);
      };
      //切换服务
      $scope.qhfw = function(url){
          var handleCode ='';
          if(url=='tab.sqhd_jzxx_bltj'){
              handleCode ='lzfx_bltj';
          }else{
              handleCode = 'lzfx_cxhf'
          }
          $state.go(url,{'sysid':'002','handleCode':handleCode});
          $scope.popover.hide();
      };
      //我要投诉
      $scope.wyts=function(){
          $state.go('tab.sqhd_lzxf_wyts');
      };

      //廉政行风 --投诉列表
      $timeout(function(){
          $scope.lb = $.evalJSON(localStorage.getItem("lzxf"));
      },300);
      //咨询列表-详情
      $scope.tslb_xq = function(id,code){
          $state.go('tab.sqhd_jzxx_cxhf',{'id':id,'code':code,'tag':'0','sysid':'002','handleCode':'lzfx_cxhf'});
      };
      //咨询列表-删除
      $scope.tslb_delete = function(id,code){
          Loading.popupConfirm('系统提示','确定要删除？').then(function(res){
              if(res){
                  var ns = $.evalJSON(localStorage.getItem("lzxf"));
                  for(var i=0;i<ns.length;i++){
                      if(ns[i].id==id && ns[i].code==code){
                          ns.splice(i,1);
                      }
                  }
                  localStorage.setItem("lzxf",$.toJSON(ns));
                  $scope.lb = $.evalJSON(localStorage.getItem("lzxf"));
              }
          });
      };
  })
  //廉政行风--我要投诉
  .controller('Lzxf_wytsCtrl',function($scope,$ionicNavBarDelegate,$state,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function() {
          $ionicNavBarDelegate.back();
      };
      $scope.wyts_con ={
          gk:'0',
          bts_name:'',
          bts_dwjzw:'',
          title:'',
          content:'',
          ts_name:'',
          ts_lxdh:'',
          ts_dwjzw:''
      };
      //我要投诉--重置
      $scope.wyts_cz = function(){
          var p = '';
          for(p in $scope.wyts_con){
              $scope.wyts_con[p] = '';
              if(p=='gk'){
                 $scope.wyts_con[p] = '0';
              }
          }
      };
      //我要投诉--提交
      $scope.wyts_tj = function(){
          if ($scope.wyts_con.bts_name == "") {
              Loading.loadingTimoutHide("请输入被投诉者姓名");
              return;
          }
          if($scope.wyts_con.bts_dwjzw == "") {
              Loading.loadingTimoutHide("请输入被投诉者单位及职务");
              return;
          }
          if($scope.wyts_con.title == "") {
              Loading.loadingTimoutHide("请输入主题");
              return;
          }
          if ($scope.wyts_con.content == "") {
              Loading.loadingTimoutHide("请输入内容");
              return;
          }
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
          var data = {
              gk : $scope.wyts_con.gk,
              vc_zipcode : $scope.wyts_con.bts_name,
              vc_papersnumber : $scope.wyts_con.bts_dwjzw,
              bt : $scope.wyts_con.title,
              content : $scope.wyts_con.content,
              name : $scope.wyts_con.ts_name,
              tel : $scope.wyts_con.ts_lxdh,
              vc_targetgroupname : $scope.wyts_con.ts_dwjzw,
              sysid : "002"
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : "lzfx_wyts",
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
                      var arr;
                      if (localStorage.getItem("lzxf") == null) {
                          arr = new Array();
                      } else {
                          arr = $.evalJSON(localStorage.getItem("lzxf"));
                      }
                      var ns = {id:'',code :'', title:''};
                      ns.id = responseTex.data.id;
                      ns.code = responseTex.data.code;
                      ns.title = $scope.wyts_con.title;
                      arr.push(ns);
                      localStorage.setItem("lzxf", $.toJSON(arr));
                      Loading.loadingTimoutHide(responseTex.msg);
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //发票违章
  .controller('FpwzCtrl',function($scope,$ionicNavBarDelegate,$ionicPopover,$state,$timeout,Loading){
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $scope.slideMenu = [{name:'回复公开',url:'tab.sqhd_jzxx_hfgk'},{name:'办理统计',url:'tab.sqhd_jzxx_bltj'},{name:'查询回复',url:'tab.sqhd_jzxx_cxhf'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view style="width: 145px;height:130px;">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item item-icon-right sstzItem" ng-repeat="cbl in slideMenu" ng-click="qhfw(cbl.url)"><i class="icon ion-ios-arrow-right icon-accessory"></i>{{cbl.name}}</a></div></ion-content></ion-popover-view>';
      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openFpwzPopover = function($event){
          $scope.popover.show($event);
      };
      //切换服务
      $scope.qhfw = function(url){
          var handleCode ='';
          if(url=='tab.sqhd_jzxx_bltj'){
              handleCode ='fpwz_bltj';
          }else if(url=='tab.sqhd_jzxx_hfgk'){
              handleCode = 'fpwz_hfgk';
          }else{
              handleCode = 'fpwz_cxhf'
          }
          $state.go(url,{'sysid':'089','handleCode':handleCode});
          $scope.popover.hide();
      };
      //我要举报
      $scope.wyjb = function(){
          $state.go('tab.sqhd_fpwz_wyjb');
      };
      //廉政行风 --投诉列表
      $timeout(function(){
          $scope.lb = $.evalJSON(localStorage.getItem("fpwz"));
      },300);
      //咨询列表-详情
      $scope.jblb_xq = function(id,code){
          $state.go('tab.sqhd_jzxx_cxhf',{'id':id,'code':code,'tag':'0','sysid':'089','handleCode':'fpwz_cxhf'});
      };
      //咨询列表-删除
      $scope.jblb_delete = function(id,code){
          Loading.popupConfirm('系统提示','确定要删除？').then(function(res){
              if(res){
                  var ns = $.evalJSON(localStorage.getItem("fpwz"));
                  for(var i=0;i<ns.length;i++){
                      if(ns[i].id==id && ns[i].code==code){
                          ns.splice(i,1);
                      }
                  }
                  localStorage.setItem("fpwz",$.toJSON(ns));
                  $scope.lb = $.evalJSON(localStorage.getItem("fpwz"));
              }
          });
      };
  })
  //发票违章--我要举报
  .controller('Fpwz_wyjbCtrl',function($scope,$ionicNavBarDelegate,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $scope.wyjb_con = {
          gk:'0',
          title:'',
          content:'',
          name:'',
          lxdh:'',
          sjhm:'',
          email:''
      };
      //重置
      $scope.wyjb_cz = function(){
          var p ='';
          for(p in  $scope.wyjb_con){
              $scope.wyjb_con[p] = '';
              if(p=='gk'){
                  $scope.wyjb_con[p] = '0';
              }
          }
      };
      //提交
      $scope.wyjb_tj = function(){
          if ($scope.wyjb_con.title == ""){
              Loading.loadingTimoutHide("请输入主题");
              return;
          }
          if ($scope.wyjb_con.content == ""){
              Loading.loadingTimoutHide("请输入内容");
              return;
          }
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
          var data = {
              gk : $scope.wyjb_con.gk,
              bt : $scope.wyjb_con.title,
              content : $scope.wyjb_con.content,
              name : $scope.wyjb_con.name,
              tel : $scope.wyjb_con.lxdh,
              phone : $scope.wyjb_con.sjhm,
              email : $scope.wyjb_con.email,
              sysid : "089"
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : "fpwz_wyjb",
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
                      var arr;
                      if (localStorage.getItem("fpwz") == null) {
                          arr = new Array();
                      } else {
                          arr = $.evalJSON(localStorage.getItem("fpwz"));
                      }
                      var ns = {id:'',code :'', title:''};
                      ns.id = responseTex.data.id;
                      ns.code = responseTex.data.code;
                      ns.title = $scope.wyjb_con.title;
                      arr.push(ns);
                      localStorage.setItem("fpwz", $.toJSON(arr));
                      Loading.loadingTimoutHide(responseTex.msg);
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //违法案件
  .controller('WfajCtrl',function($scope,$ionicNavBarDelegate,$ionicPopover,$state,$timeout,Loading){
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $scope.slideMenu = [{name:'回复公开',url:'tab.sqhd_jzxx_hfgk'},{name:'办理统计',url:'tab.sqhd_jzxx_bltj'},{name:'查询回复',url:'tab.sqhd_jzxx_cxhf'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view style="width: 145px;height:130px;">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item item-icon-right sstzItem" ng-repeat="cbl in slideMenu" ng-click="qhfw(cbl.url)"><i class="icon ion-ios-arrow-right icon-accessory"></i>{{cbl.name}}</a></div></ion-content></ion-popover-view>';
      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openWfajPopover = function($event){
          $scope.popover.show($event);
      };
      //切换服务
      $scope.qhfw = function(url){
          var handleCode ='';
          if(url=='tab.sqhd_jzxx_bltj'){
              handleCode ='wfaj_bltj';
          }else if(url=='tab.sqhd_jzxx_hfgk'){
              handleCode = 'wfaj_hfgk';
          }else{
              handleCode = 'wfaj_cxhf'
          }
          $state.go(url,{'sysid':'013','handleCode':handleCode});
          $scope.popover.hide();
      };
      //违法案件--我要举报
      $scope.wyjb = function(){
          $state.go('tab.sqhd_wfaj_wyjb');
      };
      //违法案件 --举报列表
      $timeout(function(){
          $scope.lb = $.evalJSON(localStorage.getItem("wfaj"));
      },300);
      //举报列表-详情
      $scope.jblb_xq = function(id,code){
          $state.go('tab.sqhd_jzxx_cxhf',{'id':id,'code':code,'tag':'0','sysid':'013','handleCode':'wfaj_cxhf'});
      };
      //举报列表-删除
      $scope.jblb_delete = function(id,code){
          Loading.popupConfirm('系统提示','确定要删除？').then(function(res){
              if(res){
                  var ns = $.evalJSON(localStorage.getItem("wfaj"));
                  for(var i=0;i<ns.length;i++){
                      if(ns[i].id==id && ns[i].code==code){
                          ns.splice(i,1);
                      }
                  }
                  localStorage.setItem("wfaj",$.toJSON(ns));
                  $scope.lb = $.evalJSON(localStorage.getItem("wfaj"));
              }
          });
      };
  })
  //违法案件--我要举报
  .controller('Wfaj_wyjbCtrl',function($scope,$ionicNavBarDelegate,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $scope.wyjb_con = {
          name:'',
          lxdh:'',
          sjhm:'',
          email:'',
          lxdz:'',
          xb:'1',
          yzbm:'',
          zjlx:'1',
          zjhm:'',
          age:'',
          gk:'1',
          title:'',
          content:''
      };
      //重置
      $scope.wyjb_cz = function(){
          var p='';
          for(p in $scope.wyjb_con){
              $scope.wyjb_con[p] = '';
              if(p == 'xb'||p=='zjlx'||p=='gk'){
                  $scope.wyjb_con[p] = '1';
              }
          }
      };
      //提交
      $scope.wyjb_tj = function(){
          if ($scope.wyjb_con.title == "") {
              Loading.loadingTimoutHide("请输入主题");
              return;
          }
          if ($scope.wyjb_con.content == "") {
              Loading.loadingTimoutHide("请输入内容");
              return;
          }
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
          var data = {
              name : $scope.wyjb_con.name,
              tel : $scope.wyjb_con.lxdh,
              phone : $scope.wyjb_con.sjhm,
              email : $scope.wyjb_con.email,
              vc_relationaddr : $scope.wyjb_con.lxdz,
              vc_sex : $scope.wyjb_con.xb,
              vc_zipcode :  $scope.wyjb_con.yzbm,
              vc_paperstype :  $scope.wyjb_con.zjlx,
              vc_papersnumber :  $scope.wyjb_con.zjhm,
              i_age :  $scope.wyjb_con.age,
              gk : $scope.wyjb_con.gk,
              bt : $scope.wyjb_con.title,
              content : $scope.wyjb_con.content,
              sysid : "013"
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : "wfaj_wyjb",
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
                      var arr;
                      if (localStorage.getItem("wfaj") == null) {
                          arr = new Array();
                      } else {
                          arr = $.evalJSON(localStorage.getItem("wfaj"));
                      }
                      var ns ={id:'',code :'', title:''};
                      ns.id = responseTex.data.id;
                      ns.code = responseTex.data.code;
                      ns.title = $scope.wyjb_con.title;
                      arr.push(ns);
                      localStorage.setItem("wfaj", $.toJSON(arr));
                      Loading.loadingTimoutHide(responseTex.msg);
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //纳税服务
  .controller('NsfwCtrl',function($scope,$ionicNavBarDelegate,$ionicPopover,$state,$timeout,Loading){
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $scope.slideMenu = [{name:'回复公开',url:'tab.sqhd_jzxx_hfgk'},{name:'办理统计',url:'tab.sqhd_jzxx_bltj'},{name:'查询回复',url:'tab.sqhd_jzxx_cxhf'}];
      var template = '<div style="float: right;margin:26px 9px 0px 0px;">'+
          '<i class="icon ion-arrow-up-b"></i></div><ion-popover-view style="width: 145px;height:130px;">'+
          '<ion-content align="center" class="zxzxContent">'+
          '<div class="list"><a class="item item-icon-right sstzItem" ng-repeat="cbl in slideMenu" ng-click="qhfw(cbl.url)"><i class="icon ion-ios-arrow-right icon-accessory"></i>{{cbl.name}}</a></div></ion-content></ion-popover-view>';
      $scope.popover = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
      $scope.openNsfwPopover = function($event){
          $scope.popover.show($event);
      };
      //切换服务
      $scope.qhfw = function(url){
          var handleCode ='';
          if(url=='tab.sqhd_jzxx_bltj'){
              handleCode ='nffw_bltj';
          }else if(url=='tab.sqhd_jzxx_hfgk'){
              handleCode = 'nffw_hfgk';
          }else{
              handleCode = 'nffw_cxhf'
          }
          $state.go(url,{'sysid':'086','handleCode':handleCode});
          $scope.popover.hide();
      };
      //违法案件--我要举报
      $scope.wyts = function(){
          $state.go('tab.sqhd_nsfw_wyts');
      };

      //纳税服务 --投诉列表
      $timeout(function(){
          $scope.lb = $.evalJSON(localStorage.getItem("nsfw"));
      },300);
      //投诉列表-详情
      $scope.tslb_xq = function(id,code){
          $state.go('tab.sqhd_jzxx_cxhf',{'id':id,'code':code,'tag':'0','sysid':'086','handleCode':'nffw_cxhf'});
      };
      //投诉列表-删除
      $scope.tslb_delete = function(id,code){
          Loading.popupConfirm('系统提示','确定要删除？').then(function(res){
              if(res){
                  var ns = $.evalJSON(localStorage.getItem("nsfw"));
                  for(var i=0;i<ns.length;i++){
                      if(ns[i].id==id && ns[i].code==code){
                          ns.splice(i,1);
                      }
                  }
                  localStorage.setItem("nsfw",$.toJSON(ns));
                  $scope.lb = $.evalJSON(localStorage.getItem("nsfw"));
              }
          });
      };

  })
  //纳税服务--我要投诉
  .controller('Nsfw_wytsCtrl',function($scope,$ionicNavBarDelegate,Loading,AjaxPost,AppInfo){
      var uuid = AppInfo.getUUID();
      //返回事件
      $scope.back =function(){
          $ionicNavBarDelegate.back();
      };
      $scope.wyts_con = {
          gk:'1',
          title:'',
          content:'',
          name:'',
          lxdh:'',
          sjhm:'',
          email:''
      };
      //重置
      $scope.wyts_cz = function(){
          var p='';
          for(p in $scope.wyts_con){
              $scope.wyts_con[p] = '';
              if(p=='gk'){
                  $scope.wyts_con[p] = '1';
              }
          }
      };
      //提交
      $scope.wyts_tj = function(){
          if ($scope.wyts_con.title == "") {
              Loading.loadingTimoutHide("请输入主题");
              return;
          }
          if ($scope.wyts_con.content == "") {
              Loading.loadingTimoutHide("请输入内容");
              return;
          }
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
          var data = {
              gk : $scope.wyts_con.gk,
              bt : $scope.wyts_con.title,
              content : $scope.wyts_con.content,
              name : $scope.wyts_con.name,
              tel : $scope.wyts_con.lxdh,
              phone : $scope.wyts_con.sjhm,
              email : $scope.wyts_con.email,
              sysid : "086"
          };
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Sqhd004BLH",
                  handleCode : "nffw_nfts",
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
                      var arr;
                      if (localStorage.getItem("nsfw") == null) {
                          arr = new Array();
                      } else {
                          arr = $.evalJSON(localStorage.getItem("nsfw"));
                      }
                      var ns = {id:'',code :'', title:''};
                      ns.id = responseTex.data.id;
                      ns.code = responseTex.data.code;
                      ns.title = $scope.wyts_con.title;
                      arr.push(ns);
                      localStorage.setItem("nsfw", $.toJSON(arr));
                      Loading.loadingTimoutHide(responseTex.msg);
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  });
