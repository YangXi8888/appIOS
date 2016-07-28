/**
 * Created by Administrator on 2016/4/15.
 */
/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('sqhd005.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //预约服务
            .state('tab.sqhd005', {
                url: '/sqhd005',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/sqhd/005/sqhd005.html",
                        controller: 'YyfwCtrl'
                    }
                }
            })
            //预约服务通知书
            .state('tab.sqhd005_1', {
                url: '/sqhd005_1',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/sqhd/005/sqhd005_1.html",
                        controller: 'Yyfw_1Ctrl'
                    }
                }
            })
            //预约服务内容
            .state('tab.sqhd005_2', {
                url: '/sqhd005_2',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/sqhd/005/sqhd005_2.html",
                        controller: 'Yyfw_2Ctrl'
                    }
                }
            })
            //预约服务内容
            .state('tab.sqhd005_3', {
                url: '/sqhd005_3/:lsh',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/sqhd/005/sqhd005_3.html",
                        controller: 'Yyfw_3Ctrl'
                    }
                }
            })
    })
    //预约服务
    .controller('YyfwCtrl',function($scope,$rootScope,$ionicNavBarDelegate,AppInfo,Loading,AjaxPost,$timeout,taxFactory,$state){
        $rootScope.hideTabs='tabs-item-hide';
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
        };
        var uuid = AppInfo.getUUID();
        var userInfo = findUserByLocal();//userInfo
        $timeout(function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {zjlxdm : userInfo.SFZMLX_DM,zjhm:userInfo.SFZHM};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd005BLH",
                    handleCode : "queryZrrList",
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
                        var zrrxxList = responseTex.data.zrrxxList;
                        if(zrrxxList.length == 0){
                            Loading.commonAlert('没有征收机关');
                            return;
                        }
                        if(zrrxxList.length == 1){
                            taxFactory.zxnssb.nsrsbm =zrrxxList[0].nsrsbm;
                            taxFactory.zxnssb.gljgdm =zrrxxList[0].gljgdm;
                            taxFactory.zxnssb.swglm = zrrxxList[0].swglm;
                        }else{
                            var sqhd005_options = "";
                            for (var i = 0; i < zrrxxList.length; i++) {
                                sqhd005_options += "<option  nsrsbm='"+zrrxxList[i].nsrsbm+"' gljgdm='"+zrrxxList[i].gljgdm+"' swglm='" + zrrxxList[i].swglm + "'>" + zrrxxList[i].gljgmc + "</option>";
                            }
                            Loading.commonAlert("<select style='height:50px;width: 100%' id='sqhd005_swglmSelect'>" + sqhd005_options + "</select>",function(){
                                var obj = document.getElementById('sqhd005_swglmSelect');
                                var ind =obj.selectedIndex;
                                taxFactory.zxnssb.nsrsbm = obj.options[ind].getAttribute('nsrsbm');
                                taxFactory.zxnssb.gljgdm = obj.options[ind].getAttribute('gljgdm');
                                taxFactory.zxnssb.swglm = obj.options[ind].getAttribute('swglm');
                              //$rootScope.sbns001.sbns001_gljgmc = $("#sbns001_swglmSelect").find("option:selected").text();
                            },'请选择一个征收机关');
                        }
                    }else {
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
            $scope.getYyfwzt();
        },300);

        //下拉更新
        $scope.loadRefresh = function(){
            $scope.getYyfwzt();
            $scope.$broadcast('scroll.refreshComplete');
        };
        //预约服务状态查询
        $scope.getYyfwzt = function(){
            var data = {lxr : userInfo.XM ,lxdh : userInfo.SJHM , sqlxdm:'SQ096'};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd005BLH",
                    handleCode : "queryYyList",
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
                        $scope.ztList = responseTex.data.ZtList;
                    }else {
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        };

        //查看
        $scope.ck = function(lsh){
            $state.go('tab.sqhd005_3',{'lsh':lsh});
        };
    })
    //预约服务通知书
    .controller('Yyfw_1Ctrl',function($scope,$ionicNavBarDelegate,AppInfo,Loading,AjaxPost,$state){
        $scope.back =function() {
          $ionicNavBarDelegate.back();
        };
        $scope.disAgree=function(){
            $scope.back();
        };
        $scope.agree=function(){
            $state.go('tab.sqhd005_2');
        };

    })
    //预约服务内容
    .controller('Yyfw_2Ctrl', function($scope,$rootScope,$ionicHistory,AppInfo,Loading,AjaxPost,$timeout,taxFactory,$ionicActionSheet,$state,$window) {
        var uuid = AppInfo.getUUID();
        $scope.back = function () {
            $ionicHistory.goBack();
        };
        $timeout(function(){
            $scope.init();
        },300);
        $scope.yyfw={
            xm:'',
            sjhm:'',
            dwmc:'',
            zcdz:'',
            nsrsbh:'',
            mrfwtds : {XZQHDS_DM:'',MC:''},
            mrfwtqx:{XZQHXQ_DM:'',MC:''},
            mryybsfwt:{FWT_DM:'',MC:''},
            yyrq:'',
            mryysj : {},
            jtywms:'',
            bzxx:''
        };
        //企业预约
        $scope.qyyy = function(){
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
            var  actionSheet = $ionicActionSheet.show({
                titleText :'切换企业',
                buttons : con,
                buttonClicked : function(index){
                    var glm = swglm[index].swglm;
                    initForm(glm);
                    return true;
                }
            });
            $timeout(function() {
                actionSheet();
            }, 3000);
        };
        var userInfo = findUserByLocal();//userInfo
        //初始化方法
        $scope.init = function(){
            $scope.yyfw.xm = userInfo.XM;
            $scope.yyfw.sjhm =parseInt(userInfo.SJHM);
            $scope.yyfw.nsrsbh =parseInt(taxFactory.zxnssb.nsrsbm);
            initForm('');
        };
        function initForm(swglm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {swglm : swglm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd005BLH",
                    handleCode : "initForm",
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
                    var options = '';
                    if (checkResponse(responseTex)) {
                        if(responseTex.data.szds!=undefined){
                            $scope.yyfw.mrfwtds.XZQHDS_DM = responseTex.data.szds;//默认地市
                            $scope.yyfw.dwmc = responseTex.data.NSR_MC;
                            $scope.yyfw.zcdz = responseTex.data.ZCDZ;
                        }else{
                            $scope.yyfw.mrfwtds.XZQHDS_DM = taxFactory.zxnssb.swglm.substring(0,4);
                        }
                        $scope.fwtds = responseTex.data.szdsList;//地市
                        $scope.yysj = responseTex.data.bssjList;//时间
                        var sxlx = responseTex.data.sxlxList;//事项类型
                        for(var i=0;i<sxlx.length;i++){
                            options += '<option value='+sxlx[i].SX_DM+'>'+sxlx[i].MC+'</option>';
                        }
                        $('#yysxlx').append(options);
                        if(!($scope.yyfw.mrfwtds.XZQHDS_DM ==''|| $scope.yyfw.mrfwtds.XZQHDS_DM==null)){
                            getXQ($scope.yyfw.mrfwtds.XZQHDS_DM);
                        }
                    }else {
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        };
        $scope.changeDS = function(){
            getXQ($scope.yyfw.mrfwtds.XZQHDS_DM);
        };
        function getXQ(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {xzqhds_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd005BLH",
                    handleCode : "queryXQ",
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
                          $scope.fwtqx = responseTex.data.xqList;
                    }else {
                      Loading.loadingTimoutHide(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        }
        $scope.changeQX = function(){
            getYybsfwt($scope.yyfw.mrfwtqx.XZQHXQ_DM);
        };
        function getYybsfwt(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {xzqhxq_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd005BLH",
                    handleCode : "queryFWT",
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
                        $scope.yybsfwt = responseTex.data.xqList;
                    }else {
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        }
        $scope.clear=function(){
            for( var i in $scope.yyfw){
                $scope.yyfw[i] = '';
            }
            var obj = document.getElementById('yysxlx');
            for(var i=0;i<obj.options.length;i++){
                if(!!obj.options[i].selected){
                    obj.options[i].selected =false;
                }
            }
        };
        //时间判断
        $scope.checkTime = function(){
            var sjxz = $scope.yyfw.yyrq;//document.getElementsByName("vo.str_yyrq")[0];
            var sysTime = new Date();
            var sjc = sjxz-sysTime;
            if(sjc<="0"){
                Loading.commonAlert("请重新选择预约日期（必须选择当前日期1个工作日之后）");
                $scope.yyfw.yyrq = "";
                return false;
            }
            var zj = sjxz.getDay();
            if(zj=="0"||zj=="6"){
                Loading.commonAlert("请重新选择预约日期（不能选择周末）");
                $scope.yyfw.yyrq = "";
                return false;
            }
        };
        //预约信息提交
        $scope.tijiao = function(){
            var reg=/^\d+(\.\d+)?$/;
            if($scope.yyfw.xm==''){
               return Loading.loadingTimoutHide('请填写预约人姓名!');
            }
            if($scope.yyfw.sjhm ==null){
                return Loading.loadingTimoutHide('请填写手机号码!');
            }else if(!reg.test($scope.yyfw.sjhm.toString())||$scope.yyfw.sjhm.toString().length!=11){
                return Loading.loadingTimoutHide('请填写正确的手机号码!');
            }
            if( $scope.yyfw.yyrq ==''){
                return Loading.loadingTimoutHide('请选择预约日期!');
            }
            if($scope.yyfw.mryysj.CXDM ==undefined){
                return Loading.loadingTimoutHide('请选择预约时间!');
            }
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
            var obj = document.getElementById('yysxlx');
            var sxdm = [];
            var j = 0;
            for(var i=0;i<obj.options.length;i++){
                if(!!obj.options[i].selected){
                    sxdm[j] = obj.options[i].value;
                    j++;
                }
            }
            var year =$scope.yyfw.yyrq.getFullYear();
            var month = $scope.yyfw.yyrq.getMonth()+1;
            var d = $scope.yyfw.yyrq.getDate();
            var data = {
                yyrmc : $scope.yyfw.xm,
                sjhm : $scope.yyfw.sjhm,
                dwmc : $scope.yyfw.dwmc,
                zcdz : $scope.yyfw.zcdz,
                nsrsbh : $scope.yyfw.nsrsbh,
                yyds : $scope.yyfw.mrfwtds.XZQHDS_DM,
                yyqx : $scope.yyfw.mrfwtqx.XZQHXQ_DM,
                yyfwt : $scope.yyfw.mryybsfwt.FWT_DM,
                yysxdm :sxdm.join(','),
                yyrq : year+'/'+month+'/'+d,
                yysj :  $scope.yyfw.mryysj.CXDM,
                ywms : $scope.yyfw.jtywms,
                bzxx :  $scope.yyfw.bzxx,
                gljgdm : taxFactory.zxnssb.gljgdm
            };
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd005BLH",
                    handleCode : "saveData",
                    xm : userInfo.XM,
                    sjHm : userInfo.SJHM,
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
                        $window.location.href = 'index.html#/tab/publicService';
                        $rootScope.hideTabs = '';
                    }else {
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        };
    })
    .controller('Yyfw_3Ctrl',function($scope,$stateParams,$ionicNavBarDelegate,AppInfo,Loading,AjaxPost,$timeout){
        var uuid = AppInfo.getUUID();
        $scope.back =function() {
            $ionicNavBarDelegate.back();
        };
        //查看内容
        $timeout(function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {lsh : $stateParams.lsh};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sqhd005BLH",
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
                    var options = '';
                    if (checkResponse(responseTex)) {
                        $scope.yyfw = responseTex.data;
                        for(var i=0;i<$scope.yyfw.sxlx.length;i++){
                            options += '<option value='+$scope.yyfw.sxlx[i].SX_DM+'>'+$scope.yyfw.sxlx[i].MC+'</option>';
                        }
                        $('#yysxlx').append(options);
                        var sxArr =  $scope.yyfw.YYSXDM.split(',');
                        var obj = document.getElementById('yysxlx');
                        var optionLength = obj.options.length;
                        for(var j = 0;j<optionLength;j++){
                            for(var i=0;i<sxArr.length;i++){
                                if(sxArr[i] ==obj.options[j].value){
                                    obj.options[j].selected = 'selected';
                                }
                            }
                        }

                    }else {
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        },300);
    });
