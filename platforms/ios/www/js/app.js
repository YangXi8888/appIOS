// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','starter.config','starter.services','ngCordova'])

  .run(function($ionicPlatform,$location,Loading,$ionicHistory,Settings,$rootScope) {
      //隐藏splashscreen
      if(navigator && navigator.splashscreen){
          navigator.splashscreen.hide();
      }
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        //      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //      cordova.plugins.Keyboard.disableScroll(true);
        //
        //  }
        //  if (window.StatusBar) {
        //      // org.apache.cordova.statusbar required
        //      StatusBar.styleDefault();
        //  }
        //初始化当前区域
        var area = {};
        if (localStorage.getItem(appStorageName.curArea) == null) {
            Settings.getLocation();
            Settings.cfmInfo.cfm.then(function(res){
                if(res){
                    var obj = document.getElementById("areaId");
                    area.DS_SWDM = obj[obj.selectedIndex].value;
                    area.DS_MC = obj[obj.selectedIndex].text;
                    localStorage.setItem(appStorageName.curArea, $.toJSON(area));
                }
            });
        }
      });
      //注册backbutton事件，处理返回退出app功能
      function showConfirm(){
          Loading.popupConfirm('<b>退出掌办App</b>','您确定要退出吗').then(function(res){
            if(res){
                ionic.Platform.exitApp();
            }else {
            }
          });
      }
      $ionicPlatform.registerBackButtonAction(function(e){
          e.preventDefault();
          var path = $location.path();
          if( path== '/tab/home' || path == '/tab/publicService'|| path=='/tab/taxService' || path =='/tab/settings'){
              showConfirm();
          }else{
              $ionicHistory.goBack();
              var url = $ionicHistory.backView().url;
              if( url== '/tab/home' || url == '/tab/publicService'|| url=='/tab/taxService' || url =='/tab/settings'){
                  $rootScope.hideTabs='';
              }
          }
          return false;
      },101);
  })

    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
        $stateProvider

  // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtrl'
     })

  // Each tab has its own nav history stack:
    //首页
    .state('tab.home', {
        url: '/home',
        views: {
            'home': {
                templateUrl: 'templates/home/home.html',
                controller: 'HomeCtrl'
            }
         }
     })
    //更多功能
    .state('tab.home_add', {
        url: '/home_add',
        views: {
            'home': {
                templateUrl: 'templates/home/home_add.html',
                controller: 'HomeAddCtrl'
            }
        }
    })
    //首页详细信息
    .state('tab.home_detail', {
        url: '/home_detail?id',
        views: {
            'home': {
                templateUrl: 'templates/home/home_detail.html',
                controller: 'HomeDetailCtrl'
            }
        }
    })
    //首页公示公告
    .state('tab.home_gsgg', {
        url: '/home_gsgg',
        views: {
            'home': {
                templateUrl: 'templates/home/home_gsgg.html',
                controller: 'HomeGsggCtrl'
            }
        }
    })
    //首页公示公告明细
    .state('tab.home_gsggcon', {
        url: '/home_gsggcon?cs',
        views: {
            'home': {
                templateUrl: 'templates/home/home_gsggcon.html',
                controller: 'HomeGsggconCtrl'
            }
        }
    })
    //公共服务
    .state('tab.publicService', {
         url: '/publicService',
        views: {
            'publicService': {
                templateUrl: 'templates/publicService/publicService.html',
                controller: 'PublicServiceCtrl'
            }
        }
    })





    //电话咨询
    .state('tab.sqhd_dhzx', {
        url: '/sqhd_dhzx',
        views: {
            'publicService': {
                templateUrl: "templates/publicService/sqhd/sqhd_dhzx.html",
                controller: 'DhzxCtrl'
            }
        }
    })
    //在线咨询
    .state('tab.sqhd_zxzx', {
        url: '/sqhd_zxzx',
        views: {
            'publicService': {
                templateUrl: "templates/publicService/sqhd/001/sqhd001.html",
                controller: 'ZxzxCtrl'
            }
        }
    })
    //办税服务
    .state('tab.taxService', {
        url: '/taxService',
        views: {
            'taxService': {
                templateUrl: 'templates/taxService/taxService.html',
                controller: 'TaxServiceCtrl'
            }
        }
    })
    //减免税申请
    .state('tab.ssbl_jmssq', {
        url: '/ssbl_jmssq',
        views: {
            'taxService': {
                templateUrl: 'templates/taxService/ssbl/ssbl_jmssq.html',
                controller: 'JmssqCtrl'
            }
        }
    })
    //系统设置
    .state('tab.settings', {
        url: '/settings',
        views: {
            'settings': {
                templateUrl: 'templates/settings/user.html',
                controller: 'UserCtrl'
            }
        }
     })
    .state('tab.zhmm',{
        url:'/zhmm',
        views:{
            'settings':{
                templateUrl:'templates/settings/zhmm.html',
                controller:'ZhmmCtrl'
            }
        }
    })
    .state('tab.xgmm',{
        url:'/xgmm',
        views:{
            'settings':{
                templateUrl:'templates/settings/xgmm.html',
                controller:'XgmmCtrl'
            }
        }
    })
    .state('tab.qhqy',{
        url:'/qhqy',
        views:{
            'settings':{
              templateUrl:'templates/settings/qhqy.html',
              controller:'QhqyCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

});
