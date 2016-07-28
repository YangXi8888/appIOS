/**
 * Created by Administrator on 2016/3/16.
 */
angular.module('settings.controllers',[])
    //系统设置
  //用户中心
  .controller('UserCtrl',function($scope,$ionicModal,$ionicActionSheet,$cordovaCamera,Settings,Loading,$rootScope,$state,$timeout,AppInfo){
      //系统设置的title
      $rootScope.settings ={
        title:'系统设置'
      };

    var appInfo = {
    		md5 : "",
    		zsxlh : ""
    };
    if(AppInfo.getPlatForm() != 'iOS' ) {    	
    	AppInfo.getSignInfo().then(function(result){
    		appInfo.md5 = result.md5 ;
    		appInfo.zsxlh = result.zsxlh ;
    		$rootScope.settings.appInfo = appInfo;
    	})
    }else{
    	$rootScope.settings.appInfo = appInfo;
    }

      if(findUserByLocal()!=null){
          $rootScope.settings.title = findUserByLocal().XM;
      }
      $scope.$watch('settings.title',function(newVal ,oldVal){
          $rootScope.settings.title = newVal;
      });
      //登录状态 0登录  1退出
      $scope.state = localStorage.getItem('loginState');
      if($scope.state==null){
          $rootScope.loginState = 0;
      }else{
          $rootScope.loginState = $scope.state;
      }

      //保存设置头像
      //$scope.zsbs_user =Settings.zsbs_user;
      if(!localStorage.getItem('avatar')){
          localStorage.setItem('avatar', Settings.zsbs_user.avatar);
      }else{
        Settings.zsbs_user.avatar =localStorage.getItem('avatar');
      }

      $scope.showAvatarActionsheet = function(){
          $ionicActionSheet.show({
              titleText :'<div align="center">更换头像</div>',
              buttons : [{text:'<div align="center">拍照</div>'},
                        {text:'<div align="center">从相册获取</div>'}],
              cancelText :'<div align="center">取消</div>',
              cancel : function(){
                  return true;
              },
              buttonClicked : function(index){
                  if(index ==0){
                      var options = {
                        quality:100,
                        destinationType:Camera.DestinationType.DATA_URL,
                        sourceType:Camera.PictureSourceType.CAMERA,
                        targetWidth: 150,
                        targetHeight: 150
                      };

                    $cordovaCamera.getPicture(options).then(function(imageData){
                        localStorage.setItem('avatar',"data:image/jpeg;base64," + imageData);
                        Settings.zsbs_user.avatar ="data:image/jpeg;base64," + imageData;
                        //$scope.$apply(function(){
                        //  $scope.zsbs_user.avatar = avatar;
                        //});
                    },function(err){
                        Loading.loadingTimoutHide(err+'拍照出错了！');
                    });
                  }else{
                      var option = {
                          quality:100,
                          destinationType:Camera.DestinationType.DATA_URL,
                          sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
                          targetWidth: 150,
                          targetHeight: 150,
                      };
                      $cordovaCamera.getPicture(option).then(function(imageData){
                          localStorage.setItem('avatar',"data:image/jpeg;base64," + imageData);
                          Settings.zsbs_user.avatar ="data:image/jpeg;base64," + imageData;
                          //$scope.$apply(function(){
                          //    $scope.zsbs_user.avatar = avatar;
                          //});
                      },function(err){
                          Loading.loadingTimoutHide(err+'打开相册取照片出错了！');
                      });
                  }
                  return true;
              }
          });
      };

      $scope.settingsInfo ={
          curPhone:'',
          curQyxx:'',
          curArea:''
      };
      //获取手机号码
      $scope.user = findUserByLocal();
      if($scope.user==null){
          //$scope.settingsInfo.curPhone = '未绑定';
    	  $('#curPhone').text('未绑定');
      }else{
          //$scope.settingsInfo.curPhone = $scope.user.SJHM;
    	  $('#curPhone').text($scope.user.SJHM);
      }

      //获取当前企业
      $scope.getQyxx = $.evalJSON(localStorage.getItem(appStorageName.mrQyxx));
      if($scope.getQyxx==null){
          $scope.settingsInfo.curQyxx = '未绑定';
      }else if($scope.getQyxx.MC.length>12){
          $scope.settingsInfo.curQyxx = $scope.getQyxx.MC.substr(0, 12)+'..';
      }else{
          $scope.settingsInfo.curQyxx = $scope.getQyxx.MC;
      }
      //获取选择的默认企业名称
      $rootScope.qyxxTag = $scope.settingsInfo.curQyxx;
      $scope.$watch('qyxxTag',function(newVal,oldVal){
        if(newVal.length>12){
          newVal = newVal.substr(0,12)+'..';
        }
        $scope.settingsInfo.curQyxx = newVal;
      });
      //获取当前用户的绑定企业信息
      $scope.qyxx = function(){
          var val = localStorage.getItem('loginState');
          if(val==0||val==null){
              Loading.loadingTimoutHide('请先登录！');
              return ;
          }
          if($scope.getQyxx==null){
              Loading.loadingTimoutHide('当前用户未绑定企业信息');
              return;
          }
          $state.go('tab.qhqy');
          var arr = findAllQyByLocal();
          Settings.qyxxCache = [];
          if(arr!=null){
              angular.forEach(arr,function(data,index){
                  Settings.qyxxCache.push({
                      UUID :data.UUID,
                      MC : data.MC,
                      SWGLM : data.SWGLM,
                      NSRSBH : data.NSRSBH
                  });
              });
          }
      };
      //模态窗口隐藏执行的方法
      $scope.$on('modal.hidden',function(){
          //获取手机号码
          $scope.user = findUserByLocal();
          if($scope.user==null){
              $scope.settingsInfo.curPhone = '未绑定';
          }else{
              $scope.settingsInfo.curPhone = $scope.user.SJHM;
          }
          //获取当前企业
          $scope.getQyxx = $.evalJSON(localStorage.getItem(appStorageName.mrQyxx));
          if($scope.getQyxx==null){
              $scope.settingsInfo.curQyxx = '未绑定';
          }else if($scope.getQyxx.MC.length>12){
              $scope.settingsInfo.curQyxx = $scope.getQyxx.MC.substr(0, 12)+'..';
          }else{
              $scope.settingsInfo.curQyxx = $scope.getQyxx.MC;
          }
      });

      //获取定位信息,修改当前城市
      $scope.area = {
          DS_SWDM:'',
          DS_MC:''
      };
      if (localStorage.getItem(appStorageName.curArea) == null) {
          Settings.getLocation();
      } else {
          $scope.settingsInfo.curArea = $.evalJSON(localStorage.getItem(appStorageName.curArea));
      }
      $scope.getLocation = function(){
          Settings.getLocation();
          Settings.cfmInfo.cfm.then(function(res){
           if(res){
               var obj = document.getElementById("areaId");
               $scope.area.DS_SWDM = obj[obj.selectedIndex].value;
               $scope.area.DS_MC = obj[obj.selectedIndex].text;
               localStorage.setItem(appStorageName.curArea, $.toJSON($scope.area));
               $scope.settingsInfo.curArea = $scope.area;
               if($scope.area.DS_SWDM == '23201'){
                    $('#wdnjrz').css('display','');
               }else {
                    $('#wdnjrz').css('display','none');
               }
           }
         });
          //$scope.areaInfo.curArea = $.evalJSON(localStorage.getItem(appStorageName.curArea));
      };

      $scope.zsbs_user = Settings.zsbs_user;
      $scope.userLoginModal = {};
      $scope.userRegisterModal = {};
      $ionicModal.fromTemplateUrl('userLogin_modal.html',function(modal){
          $scope.modal = modal;
      },{
          animation:'slide-in-up',
          focusFirstInput : true
      });
      //登录头像
      $scope.loginSrc ={
        src:Settings.zsbs_user.avatar
      };
      $scope.userLoginModal.show = function(val){
          $scope.modal.show();
          Settings.user.modalTag = val;//显示登录modal 0
          Settings.user.title= '登录';
      };
      $scope.userRegisterModal.show = function(val){
          $scope.modal.show();
          Settings.user.modalTag = val;//显示登录modal 1
          Settings.user.title= '注册';
          Loading.popupAlert($rootScope.title,$rootScope.con);
      };
      //修改密码
      $scope.xgmm = function(){
          var val = localStorage.getItem('loginState');
          if(val==0||val==null){
              Loading.loadingTimoutHide('请先登录！');
              return ;
          }
          $state.go('tab.xgmm');
      };
      //退出
      $scope.tcLogin = function(){
          localStorage.removeItem(appStorageName.localAppQyList);
          localStorage.removeItem(appStorageName.user);
          localStorage.removeItem(appStorageName.lastLoginDate);
          localStorage.removeItem(appStorageName.mrQyxx);
          //$scope.settingsInfo.curPhone = '';
          $('#curPhone').text('');
          $scope.settingsInfo.curQyxx = '';
          $rootScope.settings.title = '系统设置';
          $rootScope.loginState = 0;
          localStorage.setItem('loginState',0);
      };

  })
  //用户登录和注册
  .controller('userLoginModalCtrl',function($scope,$ionicPopup,Settings,AppInfo,Loading,$rootScope,$timeout,$interval,AjaxPost,$state){
      var uuid = AppInfo.getUUID();
      //注册须知提示警告弹出框
      $rootScope.title = "<img src='img/user_prompt.png' width='60px;'>";
      $rootScope.con ="<p>1.该功能仅提供给做过自然人登记的用户注册</p><p>2.为了确认用户信息，此处验证码会发送到自然人登记时使用的手机号码。</p>";
      $scope.userLoginModal = {};
      $scope.userLoginModal.hide = function(){
          //初始化获取验证码按钮
          $interval.cancel($scope.yzmInterval);
          $timeout.cancel($scope.yzmTimeout);
          $scope.user.yzmName = '获取验证码';
          $scope.user.yzmTimeOver = false;
          $scope.modal.hide();
      };
      $scope.user = Settings.user;
      $scope.showLogin = function(){
          $scope.user.modalTag = 0;//模块状态0显示当前模块，1则隐藏
          $scope.user.title= '登录';
      };
      $scope.zjlx = Settings.user_zjlx;//证件类型
      $scope.showRegister = function(){
          $scope.user.modalTag = 1;
          $scope.user.title='注册';
          Loading.popupAlert($rootScope.title , $rootScope.con);
      };
      //登录和注册滑动事件
      $scope.loginSwipeRight = function(){
          $scope.showRegister();
      };
      $scope.registerSwipeLeft = function(){
          $scope.showLogin();
      };

      $scope.user_zjlx = Settings.user_zjlx;
      $scope.user_gljg = Settings.user_gljg;
      $scope.user.zcZjlx = $scope.user_zjlx[0];
      $scope.user.zcGljg = $scope.user_gljg[0];

      $scope.registerPromptAlert = function(){
          Loading.popupAlert($rootScope.title , $rootScope.con);
      };
      //隐藏显示footer
      $scope.footerToggler = true;
      $scope.footerHide = function(){
          $scope.footerToggler = false;
      }
      $scope.footerShow = function(){
          $scope.footerToggler = true;
      };
      //登录方法
      $scope.login = function() {
          $scope.footerToggler = true;
          var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">登录中...</div></div>';
          Loading.loadingShow(cnt);
          var JsonReqData = {
              jsonData : angular.toJson({
              blhName : "Yh001BLH",
              passWord : $scope.user.password,
              sjHm : $scope.user.sjhm,
              platform : AppInfo.getPlatForm(),
              md5 : $rootScope.settings.appInfo.md5,
              cert : $rootScope.settings.appInfo.zsxlh,
              handleCode : "yhYz",
              yhwybz : uuid,
              bizDataMw : formatStr('lfjsljflsfjdslfjldsfjsdjf',uuid)
              })
          };
          AjaxPost.getData(JsonReqData)
              .then(function(responseText, textStatus, XMLHttpRequest) {
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      var appUser = new AppUser(responseTex);
                      appUser.addLocalUser();
                      Loading.loadingTimoutHide('登录成功!');
                      $rootScope.settings.title =findUserByLocal().XM;
                      $rootScope.loginState = 1;
                      localStorage.setItem('loginState',1);
                      //手机号码
                      $('#curPhone').text(findUserByLocal().SJHM);
                      var sxQyxx = findSxQyByLocal();//首选企业信息
                      if(sxQyxx!=null){
                          $scope.mrQyxx = {
                              UUID:sxQyxx.UUID,
                              MC : sxQyxx.MC,
                              SWGLM : sxQyxx.SWGLM,
                              NSRSBH : sxQyxx.NSRSBH
                          };
                          localStorage.setItem(appStorageName.mrQyxx,$.toJSON($scope.mrQyxx));
                      }
                      $scope.modal.hide();
                      $scope.user.password = '';
                      $scope.user.sjhm = '';
                  } else {
                      Loading.popupAlert('提示',responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown) {
                  Loading.loadingHide();
                  Loading.popupAlert('登录失败',errorThrown);
              });
      };
      //找回密码
      $scope.zhmm = function(){
          $state.go('tab.zhmm');
          $scope.modal.hide();
      };
      //获取验证码
      $scope.user.yzmName = '获取验证码';
      $scope.zcUser_yzmTimerTask = function(){
          $scope.yzmYxq_timeout = 180;
          $scope.yzmInterval = $interval(function(){
              $scope.user.yzmTimeOver = true;
              $scope.yzmYxq_timeout--;
              $scope.user.yzmName =($scope.yzmYxq_timeout + "秒后重新获取");
          }, 1000);
          $scope.yzmTimeout = $timeout(function(){
              $interval.cancel($scope.yzmInterval);
              $scope.user.yzmName="重新获取验证码";
              $scope.user.yzmTimeOver = false;
          }, 180000);
      };
      $scope.user.yzmTimeOver = false;
      $scope.hqyzm = function(){
          var zjHm = $.trim($scope.user.zcZjhm);
          if (zjHm == ""){
              Loading.loadingTimoutHide('请填写证件号码');
              return;
          }
          $scope.user.yzmTimeOver = true;
          var zjLx = $.trim($scope.user.zcZjlx.id);
          var glJg = $.trim($scope.user.zcGljg.id);
          var data = data || {zjlx : zjLx, zjhm : zjHm,gljgdm : glJg};
          var JsonReqData = {
              jsonData : angular.toJson({
                  blhName : "Yh001BLH",
                  handleCode : "hqYzm",
                  data : data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(JsonReqData)
              .then(function(responseText, textStatus, XMLHttpRequest) {
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if (checkResponse(responseTex)) {
                      //$scope.user.yzmTimeOver = true;
                      Loading.loadingTimoutHide('验证码已发送，请注意查收！');
                      $scope.zcUser_yzmTimerTask();
                  }else {
                      $scope.user.yzmTimeOver = false;
                      Loading.popupAlert('发送失败', responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown) {
                  $scope.user.yzmTimeOver = false;//验证码超时
                  Loading.loadingTimoutHide('数据出错,请重试！');
              });
      };
      //注册方法
      $scope.register = function(){
          if($scope.user.zcZjlx.id=='06' && !f_check_sfz(document.getElementById('user_zcZjhm'))){
              Loading.loadingTimoutHide('身份证件号码有误');
              return;
          }
          if($scope.user.zcSjhm.length > 11){
              Loading.loadingTimoutHide('用于登录的号码长度不能超过11位');
              return;
          }
          if($scope.user.zcPassword.length > 10){
              Loading.loadingTimoutHide('密码长度不能超过10位');
              return;
          }
          if($scope.user.zcPassword!=$scope.user.zcqrPassword){
              Loading.loadingTimoutHide('两次密码不一致');
              return;
          }
          Loading.loadingShow('正在注册...');
          var data = { zjlx : $scope.user.zcZjlx.id, zjhm : $scope.user.zcZjhm};
          var JsonReqData = {
              jsonData : angular.toJson({
                  passWord : $scope.user.zcPassword,
                  sjHm : $scope.user.zcSjhm,
                  xm : $scope.user.zcName,
                  sjYzm : $scope.user.zcYzm,
                  blhName : "Yh001BLH",
                  handleCode : "yhZc",
                  data :data,
                  yhwybz : uuid,
                  bizDataMw : formatStr(data.toString(),uuid)
              })
          };
          AjaxPost.getData(JsonReqData)
              .then(function(responseText, textStatus, XMLHttpRequest) {
                  Loading.loadingHide();
                  var response = Decrypt(responseText.toString(),uuid);
                  var responseTex = JSON.parse(AjaxPost.change(response));
                  if(checkResponse(responseTex)){
                      Loading.loadingTimoutHide('注册成功');
                      $scope.user.password = $scope.user.zcPassword;
                      $scope.user.sjhm = $scope.user.zcSjhm;
                      $timeout(function(){
                          $scope.login();
                      },1500);
                      $scope.user.zcName='';
                      $scope.user.zcZjhm='';
                      $scope.user.zcSjhm='';
                      $scope.user.zcPassword='';
                      $scope.user.zcqrPassword='';
                  }else{
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown) {
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //找回密码
  .controller('ZhmmCtrl',function($scope,$rootScope,$ionicNavBarDelegate,AjaxPost,Loading,Settings,AppInfo){
      var uuid = AppInfo.getUUID();
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.zhmm = {
          sjhm:'',
          zhGljg :''
      };
      $scope.zhmm_gljg = Settings.user_gljg;
      $scope.zhmm.zhGljg = $scope.zhmm_gljg[0];
      $scope.hqmm = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">获取中...</div></div>');
          var data = {gljgdm : $scope.zhmm.zhGljg.id};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Yh001BLH",
                  handleCode : "findPwd",
                  sjHm : $scope.zhmm.sjhm,
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
                  Loading.loadingTimoutHide(responseTex.msg);
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });

      };
  })
  //修改密码
  .controller('XgmmCtrl',function($scope,$rootScope,$ionicNavBarDelegate,AjaxPost,Loading,AppInfo){
      var uuid = AppInfo.getUUID();
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.xgmm = {
          ymm:'',
          xmm:'',
          qrmm:''
      };
      $scope.xgmm = function(){
          if($scope.xgmm.xmm !=$scope.xgmm.qrmm){
              Loading.loadingTimoutHide('新密码和确认密码不一致');
              $scope.xgmm.qrmm = '';
              return;
          }
          var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>';
          Loading.loadingShow(cnt);
          var userInfo = findUserByLocal();
          var sjhm = userInfo.SJHM;
          var data = {newpassword : $scope.xgmm.xmm};
          var reqDatas = {
              jsonData : angular.toJson({
                  blhName : "Yh001BLH",
                  handleCode : "mmxg",
                  sjHm : sjhm,
                  passWord : $scope.xgmm.ymm,
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
                      Loading.loadingTimoutHide(responseTex.msg);
                      $ionicNavBarDelegate.back();
                      $rootScope.hideTabs='';
                  }else {
                      Loading.loadingTimoutHide(responseTex.msg);
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.loadingTimoutHide(textStatus);
              });
      };
  })
  //切换企业
  .controller('QhqyCtrl',function($scope,$rootScope,$ionicNavBarDelegate,Settings,$timeout){
      $rootScope.hideTabs='tabs-item-hide';//footer隐藏
      //返回事件和footer显示
      $scope.back =function() {
          $ionicNavBarDelegate.back();
          $rootScope.hideTabs='';
      };
      $scope.qyxxSideList = Settings.qyxxCache;
      if($scope.qyxxSideList[0].MC==''){
          $scope.toggleShow = false;
      }else{
          $scope.toggleShow = true;
      }
      $scope.data = {
          qyxxSide: -1
      };
      if(localStorage.getItem(appStorageName.mrQyxx)!=null){
          $scope.data.qyxxSide = $.evalJSON(localStorage.getItem(appStorageName.mrQyxx)).SWGLM;
      }
      $scope.qyxxSideChange = function(item) {
          //console.log("Selected Serverside, text:", item.key, "value:", item.value);
          $scope.mrQyxx = {
              UUID : '',
              MC : '',
              SWGLM : '',
              NSRSBH : ''
          };
          $scope.mrQyxx.UUID = item.UUID;
          $scope.mrQyxx.MC = item.MC;
          $scope.mrQyxx.SWGLM = item.SWGLM;
          $scope.mrQyxx.NSRSBH = item.NSRSBH;
          $rootScope.qyxxTag = item.MC;
          localStorage.setItem(appStorageName.mrQyxx,$.toJSON($scope.mrQyxx));
      };
  });
