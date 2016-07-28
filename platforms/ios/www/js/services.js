/**
 * Created by Administrator on 2016/2/23.
 */
angular.module("starter.services",[])
    //加载效果
    .factory('Loading',function($ionicLoading,$timeout,$ionicActionSheet,$ionicPopup,$cordovaNetwork  ){
        return{
            //载入指示器
            loadingShow : function(con){
                $ionicLoading.show({
                    template: con
                });
            },
            //载入指示器设定时间隐藏
            loadingTimoutHide : function(con){
                $ionicLoading.show({
                    template : con,
                    duration : 1500
                });
            },
            //载入指示器隐藏
            loadingHide : function(){
                $ionicLoading.hide();
            },
            //actionSheet
            actionSheetShow : function(){
                $ionicActionSheet.show({
                    titleText : '操作当前文章',
                    buttons : [{text:'<b>分享</b>文章'},{text:'移动到...'}],
                    buttonClicked : function(index){
                        alert(index);
                        return true;
                    },
                    cancalText:'取消',
                    cancal : function(){

                    }
                });
            },
            //alert警告弹出框
            popupAlert : function(title,con){
                var alt = $ionicPopup.alert({
                    title : title,//String,弹窗的标题
                    template: con,//放在弹窗body内的html模板
                    okText : '确定'//按钮的文字
                });
                return alt;
            },
            //confirm确认弹出框
            popupConfirm : function(title,con){
                var cfm = $ionicPopup.confirm({
                    title : title,//标题
                    template : con,
                    cancelText : '取消',
                    okText : '确定'
                });
                return cfm;
            },
            //prompt输入提示弹出框
            popupPrompt : function(obj){
                var ppt = $ionicPopup.prompt({
                    title : obj.title,
                    template : obj.template,
                    inputType : obj.inputType,//默认：text
                    inputPlaceholder : obj.inputPlaceholder,
                    cancelText : '取消',//默认cancel
                    okText : '确定'
                });
                return ppt;
            },
            //判断当前网络状态,true可用，false不可用
            checkConnection : function(){
                return $cordovaNetwork.isOnline();
            },
            commonAlert : function(msg,fn,title){
              $ionicPopup.alert({
                title: title==undefined?'系统提示':title,
                content: msg,
                okText: '确定'
              }).then(fn)
            },
            commonConfirm : function(msg,fn,title){
              $ionicPopup.confirm({
                title: title==undefined?'系统提示':title,
                content: msg,
                cancelText: '取消',
                okText: '确定'
              }).then(fn);
            }
        };
    })
    //后台请求
    .factory('AjaxPost',function(AppConfig, $http, $q) {
        var reqUrl = AppConfig.appServer_Url ;
        var reqTimout = AppConfig.appServer_TimeOut ;
        return {
            getData : function(JsonReqData) {
                var deferred=$q.defer();
                $http({
                    method : 'post',
                    url : reqUrl ,
                    data : JsonReqData,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    timeout : reqTimout
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                    deferred.resolve(data);
                })
                return deferred.promise;
            },
            change : function(responseText){
                var s1 = responseText.replace(/\%3A/g, ":");
                s1 = s1.replace(/\%2C/g,",");
                s1 = s1.replace(/\%2F/g,"/");
                s1 = s1.replace(/\%3D/g,"=");
                s1 = s1.replace(/\%3B/g,";");
                s1 = s1.replace(/\+/g," ");
                s1 = s1.replace(/\%24/g,"$");
                s1 = s1.replace(/\%26/g,"&");
                s1 = s1.replace(/\%3F/gi,"?");
                return s1;
            }
        };
    })
    //页面跳转
    .factory('Linking',function($state,Loading){
        return{
            linkShow : function(ljdz){
                switch (ljdz){
                    case "home_add":
                        $state.go('tab.home_add');
                        break;
                    case "bsdh003":
                        $state.go('tab.bsdh003');
                        break;
                    case "bsdh001":
                        $state.go('tab.bsdh001');
                        break;
                    case "bsdh002":
                        $state.go('tab.bsdh002');
                        break;
                    case "bsdh004":
                        $state.go('tab.bsdh004');
                        break;
                    case "bsdh008":
                        $state.go('tab.bsdh008');
                        break;
                    case "bsdh005":
                        $state.go('tab.bsdh005');
                        break;
                    case "bsdh006":
                        $state.go('tab.bsdh006');
                        break;
                    case "sqhd_dhzx":
                        $state.go('tab.sqhd_dhzx');
                        break;
                    case "sqhd_dswb":
                        $state.go('tab.sqhd_dswb');
                        break;
                    case "sqhd_dswx":
                        $state.go('tab.sqhd_dswx');
                        break;
                    case "sqhd_wdnjrz":
                        var curArea = $.evalJSON(localStorage.getItem(appStorageName.curArea));
                        if(curArea.DS_SWDM == '23201'){
                            $state.go('tab.sqhd_wdnjrz');
                        }else{
                            Loading.loadingTimoutHide('非南京用户');
                        }
                        break;
                    case "sqhd_nsrxt":
                        $state.go('tab.sqhd_nsrxt');
                        break;
                    case "sqhd_sstz":
                        $state.go('tab.sqhd_sstz');
                        break;
                    case "sqhd_tsjb":
                        $state.go('tab.sqhd_tsjb');
                        break;
                    case "sqhd005":
                        if(findUserByLocal()!==null){
                            $state.go('tab.sqhd005');
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "sqhd_zxzx":
                        $state.go('tab.sqhd_zxzx');
                        break;
                    case "zczn_12366zsk":
                        $state.go('tab.zczn_12366zsk');
                        break;
                    case "zczn_ssxxyb":
                        $state.go('tab.zczn_ssxxyb');
                        break;
                    case "zczn_yhxz":
                        $state.go('tab.zczn_yhxz');
                        break;
                    case "sbns001_1":
                        if(findUserByLocal()!==null){
                            $state.go('tab.sbns001_1');
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "sbns002_1":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.sbns002_1');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "ssbl003_1":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.ssbl003_1');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "ssbl_jmssq":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.ssbl_jmssq');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "ssbl006_1":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.ssbl006_1');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "ssbl001_1":
                        $state.go('tab.ssbl001_1');
                        break;
                    case "ssbl002":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.ssbl002');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "ssbl005_1":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.ssbl005_1');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "cxfw003":
                        $state.go('tab.cxfw003');
                        break;
                    case "cxfw005":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.cxfw005');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "cxfw001":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.cxfw001');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "cxfw004":
                        if(findUserByLocal()!==null) {
                            if (localStorage.getItem(appStorageName.mrQyxx) !== null) {
                                $state.go('tab.cxfw004');
                            } else {
                                Loading.loadingTimoutHide('此功能需要绑定企业信息');
                            }
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "cxfw002":
                        if(findUserByLocal()!==null){
                            $state.go('tab.cxfw002');
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                    case "sbns003":
                        if(findUserByLocal()!==null){
                            $state.go('tab.sbns003');
                        }else{
                            Loading.loadingTimoutHide('请先登录！');
                        }
                        break;
                }
            }
        };
   })
    //功能常量
    .factory('AppModule', function() {
        //所有模块，剔除首页默认4个
        var allModules = [{
            'src' : 'img/tax_fpyz.png',
            'mode' : 'ion-minus-circled',
            'name' : '发票验证',
            'moduleId' : 'fpyz',
            'href' : 'cxfw003'
        }, {
            'src' : 'img/tax_wdss.png',
            'mode' : 'ion-minus-circled',
            'name' : '我的税收',
            'moduleId' : 'wdss',
            'href' : 'cxfw002'
        }, {
            'src' : 'img/tax_gs12wsb.png',
            'mode' : 'ion-minus-circled',
            'name' : '个税12万',
            'moduleId' : 'gs12wsb',
            'href' : 'sbns001_1'
        }, {
            'src' : 'img/tax_zrrdj.png',
            'mode' : 'ion-minus-circled',
            'name' : '自然人登记',
            'moduleId' : 'zrrdj',
            'href' : 'ssbl001_1'
        },{
            'src' : 'img/public_dhzx.png',
            'mode' : 'ion-plus-circled',
            'name' : '电话咨询',
            'moduleId' : 'dhzx',
            'href' : 'tel:12366'
        }, {
            'src' : 'img/public_zxzx.png',
            'mode' : 'ion-plus-circled',
            'name' : '在线咨询',
            'moduleId' : 'zxzx',
            'href' : 'sqhd_zxzx'
        }, {
            'src' : 'img/public_sstz.png',
            'mode' : 'ion-plus-circled',
            'name' : '涉税通知',
            'moduleId' : 'sstz',
            'href' : 'sqhd_sstz'
        }, {
            'src' : 'img/public_nsrxt.png',
            'mode' : 'ion-plus-circled',
            'name' : '纳税人学堂',
            'moduleId' : 'nsrxt',
            'href' : 'sqhd_nsrxt'
        }, {
            'src' : 'img/public_tsjb.png',
            'mode' : 'ion-plus-circled',
            'name' : '投诉举报',
            'moduleId' : 'tsjb',
            'href' : 'sqhd_tsjb'
        }, {
            'src' : 'img/public_yyfw.png',
            'mode' : 'ion-plus-circled',
            'name' : '预约服务',
            'moduleId' : 'yyfw',
            'href' : 'sqhd005'
        }, {
            'src' : 'img/public_dswx.png',
            'mode' : 'ion-plus-circled',
            'name' : '地税微信',
            'moduleId' : 'dswx',
            'href' : 'sqhd_dswx'
        }, {
            'src' : 'img/public_dswb.png',
            'mode' : 'ion-plus-circled',
            'name' : '地税微博',
            'moduleId' : 'dswb',
            'href' : 'sqhd_dswb'
        }, {
            'src' : 'img/public_12366zsk.png',
            'mode' : 'ion-plus-circled',
            'name' : '12366知识库',
            'moduleId' : '12366zsk',
            'href' : 'zczn_12366zsk'
        }, {
            'src' : 'img/public_ssyb.png',
            'mode' : 'ion-plus-circled',
            'name' : '涉税月报',
            'moduleId' : 'ssyb',
            'href' : 'zczn_ssyb'
        }, {
            'src' : 'img/public_yhxz.png',
            'mode' : 'ion-plus-circled',
            'name' : '优惠须知',
            'moduleId' : 'yhxz',
            'href' : 'zczn_yhxz'
        }, {
            'src' : 'img/public_bsrl.png',
            'mode' : 'ion-plus-circled',
            'name' : '办税日历',
            'moduleId' : 'bsrl',
            'href' : 'bsdh001'
        }, {
            'src' : 'img/public_bssj.png',
            'mode' : 'ion-plus-circled',
            'name' : '办税时间',
            'moduleId' : 'bssj',
            'href' : 'bsdh002'
        }, {
            'src' : 'img/public_bsdt.png',
            'mode' : 'ion-plus-circled',
            'name' : '办税地图',
            'moduleId' : 'bsdt',
            'href' : 'bsdh003'
        }, {
            'src' : 'img/public_bstgzzt.png',
            'mode' : 'ion-plus-circled',
            'name' : '办税厅工作状态',
            'moduleId' : 'bstgzzt',
            'href' : 'bsdh004'
        }, {
            'src' : 'img/public_skjs.png',
            'mode' : 'ion-plus-circled',
            'name' : '税款计算',
            'moduleId' : 'skjs',
            'href' : 'bsdh005'
        }, {
            'src' : 'img/public_szsl.png',
            'mode' : 'ion-plus-circled',
            'name' : '税种税率',
            'moduleId' : 'szsl',
            'href' : 'bsdh006'
        }, {
            'src' : 'img/public_bszn.png',
            'mode' : 'ion-plus-circled',
            'name' : '办税指南',
            'moduleId' : 'bszn',
            'href' : 'bsdh008'
        }, {
            'src' : 'img/tax_jmssq.png',
            'mode' : 'ion-plus-circled',
            'name' : '减免税申请',
            'moduleId' : 'jmssq',
            'href' : 'ssbl_jmssq'
        }, {
            'src' : 'img/tax_cztdjm.png',
            'mode' : 'ion-plus-circled',
            'name' : '城镇土地减免',
            'moduleId' : 'cztdjm',
            'href' : 'ssbl003_1'
        }, {
            'src' : 'img/tax_sxfjb.png',
            'mode' : 'ion-plus-circled',
            'name' : '手续费结报',
            'moduleId' : 'sxfjb',
            'href' : 'ssbl005_1'
        }, {
            'src' : 'img/tax_lxfsbg.png',
            'mode' : 'ion-plus-circled',
            'name' : '联系方式变更',
            'moduleId' : 'lxfsbg',
            'href' : 'ssbl006_1'
        }, {
            'src' : 'img/tax_sbsb.png',
            'mode' : 'ion-plus-circled',
            'name' : '社保申报',
            'moduleId' : 'sbsb',
            'href' : 'sbns002_1'
        }, {
            'src' : 'img/tax_qyxxcx.png',
            'mode' : 'ion-plus-circled',
            'name' : '企业信息查询',
            'moduleId' : 'qyxxcx',
            'href' : 'cxfw001'
        }, {
            'src' : 'img/tax_sbfcx.png',
            'mode' : 'ion-plus-circled',
            'name' : '社保费查询',
            'moduleId' : 'sbfcx',
            'href' : 'cxfw004'
        }, {
            'src' : 'img/tax_nsxycx.png',
            'mode' : 'ion-plus-circled',
            'name' : '纳税信用查询',
            'moduleId' : 'nsxycx',
            'href' : 'cxfw005'
        },{
            'src' : 'img/tax_grsdssb.png',
            'mode' : 'ion-plus-circled',
            'name' : '个人所得税自行纳税申报表（A表）',
            'moduleId' : 'grsdssb',
            'href' : 'sbns003'
        }] ;
        //首页默认4个显示模块
        var homeModules = [[[{
            'src' : 'img/tax_fpyz.png',
            'mode' : 'ion-minus-circled',
            'name' : '发票验证',
            'moduleId' : 'fpyz',
            'href' : 'cxfw003'
        }, {
            'src' : 'img/tax_wdss.png',
            'mode' : 'ion-minus-circled',
            'name' : '我的税收',
            'moduleId' : 'wdss',
            'href' : 'cxfw002'
        }, {
            'src' : 'img/tax_gs12wsb.png',
            'mode' : 'ion-minus-circled',
            'name' : '个税12万',
            'moduleId' : 'gs12wsb',
            'href' : 'sbns001_1'
        }, {
            'src' : 'img/tax_zrrdj.png',
            'mode' : 'ion-minus-circled',
            'name' : '自然人登记',
            'moduleId' : 'zrrdj',
            'href' : 'ssbl001_1'
        }],[{
            'src' : 'img/home_gdgn.png',
            'mode' : 'ion-minus-circled',
            'name' : '更多功能',
            'moduleId' : 'gdgn',
            'href' : 'home_add'
        }]]] ;

        return {
            allModules: function() {
                return allModules;
            },
            homeModules: function() {
                return homeModules;
            }
        };
    })
    //缓存信息
    .factory('LocCache',function(){
        var data = {};
        return {
            save : function(key,val){
                try {
                    data[key] = {
                        'val' : val
                    };
                    localStorage[key] = JSON.stringify(data[key]);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            load : function(key){
                try{
                    data[key] = JSON.parse(localStorage[key]);
                    return data[key].val ;
                }catch(e){
                    return false;
                }
            },
            clearAll : function(){
                localStorage.clear();
                return true;
            },
            clearOneKey : function(key){
                localStorage.removeItem(key);
                return true;
            }
        };
    })

    //设置
  .factory('Settings',function(AppConfig,Loading,$timeout){
      //证件类型
      var user_zjlx =[{id:'06',value:'身份证'},{id:'01',value:'护照'},{id:'02',value:'通行证'},{id:'03',value:'回乡证'},{id:'04',value:'台胞证'},{id:'05',value:'旅行证'},{id:'07',value:'军官证'},{id:'90',value:'其他'}];/*证件类型*/
      //管理机关
      var user_gljg = [{id:'23201',value:'南京市'},{id:'23202',value:'无锡市'},{id:'23203',value:'徐州市'}
          ,{id:'23204',value:'常州市'},{id:'23205',value:'苏州市'},{id:'23206',value:'南通市'}
          ,{id:'23207',value:'连云港市'},{id:'23208',value:'淮安市'},{id:'23209',value:'盐城市'}
          ,{id:'23210',value:'扬州市'},{id:'23211',value:'镇江市'},{id:'23212',value:'泰州市'}
          ,{id:'23213',value:'宿迁市'},{id:'23216',value:'张家港保税区'},{id:'23217',value:'苏州园区'},{id:'23298',value:'省直属局'}];/*管理机关*/
      var user = {title:'登录',sjhm:'',password:'',zcName:'',zjlx:'',zcZjhm:'',gljg:'',zcSjhm:'',zcPassword:'',zcqrPassword:'',zcYzm:'',zcZjlx:'',zcGljg:'',modalTag:0};
      //保存初始化头像
      var zsbs_user = {avatar:'img/icon_touxiang.png'};
      //保存设置当前区域的cfm对象
      var cfmInfo={};
      //保存当前用户的绑定企业信息
      var qyxxCache = [];//{UUID:'',MC:'',SWGLM:'',NSRSBH:''}
      return {
          getLocation : function(){
              var areaOptions = "";
              //areaInfo = {};/*$.evalJSON(localStorage.getItem(appStorageName.curArea));*/
              for (var i = 0; i < DSINFO_LIST.length; i++) {
                  areaOptions += "<option value='" + DSINFO_LIST[i].DS_SWDM + "'>" + DSINFO_LIST[i].DS_MC + "</option>";
              }
              var cityChoose = '<select style="width: 100%;height: 40px" id="areaId">'+areaOptions+'</select>';
              cfmInfo.cfm = Loading.popupConfirm('请选择区域',cityChoose);
          },
          user_zjlx : user_zjlx,
          user_gljg : user_gljg,
               user : user,
          zsbs_user : zsbs_user,
            cfmInfo : cfmInfo,
          qyxxCache : qyxxCache
      };
  })
  //获取APK签名信息 ： 证书序列号 、MD5
  .factory('AppInfo',function($q){
    return {
      getPlatForm : function(){
        return device.platform ;
      },
        getUUID : function(){
            var uuid =  device.uuid;
            if(uuid.length <16){
                for ( var i=0; i<uuid.length;i++){
                    uuid+=i;
                    if(uuid.length==16){
                        return uuid;
                    }
                }
            }
            if(uuid.length>16){
                return uuid.substring(0,16);
            }
            return uuid ;
        },
      getSignInfo : function(){
        var signInfo = {};
        var deferred=$q.defer();
        if(this.getPlatForm != 'iOS'){
          gov.jslt.app.plugin.signinfo.getSignInfo(function(result){
            if (result.code == "0") {
              var resArr = result.msg.split("--");
              var zsxlh = resArr[1].split("signNum:")[1];
              var md5 = result.msg.split("md5:")[1];
              signInfo.zsxlh = zsxlh;
              signInfo.md5 = md5;
              deferred.resolve(signInfo);
            }
          });
          return deferred.promise;
        }
      }
    }
  })
  //办税服务存储数据
  .factory('taxFactory',function(){
      var jmssqCache = {};//减免税申请存储数据
      var zxnssb = {};//个人所得税自行纳税申报
      return {
          jmssqCache :jmssqCache,
          zxnssb : zxnssb
      }
  })
