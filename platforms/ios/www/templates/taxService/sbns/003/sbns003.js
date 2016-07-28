/**
 * Created by Administrator on 2016/4/15.
 */
angular.module('sbns003.controllers',[])
    .config(function($stateProvider){
        $stateProvider
            //个人所得税自行纳税申报表（A表）
            .state('tab.sbns003', {
                url: '/sbns003',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003.html",
                        controller: 'GrsdszxnsCtrl'
                    }
                }
            })
            .state('tab.sbns003_1', {
                url: '/sbns003_1',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_1.html",
                        controller: 'Zxns_1Ctrl'
                    }
                }
            })
            //基础信息
            .state('tab.sbns003_1_1', {
                url: '/sbns003_1_1',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_1_1.html",
                        controller: 'Zxns_1_1Ctrl'
                    }
                }
            })
            .state('tab.sbns003_1_2', {
                url: '/sbns003_1_2',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_1_2.html",
                        controller: 'Zxns_1_2Ctrl'
                    }
                }
            })
            .state('tab.sbns003_1_3', {
                url: '/sbns003_1_3',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_1_3.html",
                        controller: 'Zxns_1_3Ctrl'
                    }
                }
            })
            .state('tab.sbns003_1_4', {
                url: '/sbns003_1_4',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_1_4.html",
                        controller: 'Zxns_1_4Ctrl'
                    }
                }
            })
            .state('tab.sbns003_2', {
                url: '/sbns003_2',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_2.html",
                        controller: 'Zxns_2Ctrl'
                    }
                }
            })
            .state('tab.sbns003_3', {
                url: '/sbns003_3',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_3.html",
                        controller: 'Zxns_3Ctrl'
                    }
                }
            })
            .state('tab.sbns003_4', {
                url: '/sbns003_4/:url:ZFBUrl',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_4.html",
                        controller: 'Zxns_4Ctrl'
                    }
                }
            })
            .state('tab.sbns003_5', {
                url: '/sbns003_5/:url:payTitle',
                views: {
                    'taxService': {
                      templateUrl: "templates/taxService/sbns/003/sbns003_5.html",
                      controller: 'Zxns_5Ctrl'
                    }
                }
            })
            //查看
            .state('tab.sbns003_6', {
                url: '/sbns003_6/:pzxh',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_6.html",
                        controller: 'Zxns_6Ctrl'
                    }
                }
            })
            //查看附表内容
            .state('tab.sbns003_6_1', {
                url: '/sbns003_6_1/:pzxh',
                views: {
                    'taxService': {
                        templateUrl: "templates/taxService/sbns/003/sbns003_6_1.html",
                        controller: 'Zxns_6_1Ctrl'
                    }
                }
            })
            //查看附表内容
          .state('tab.sbns003_6_1_1', {
            url: '/sbns003_6_1_1',
            views: {
              'taxService': {
                templateUrl: "templates/taxService/sbns/003/sbns003_6_1_1.html",
                controller: 'Zxns_6_1_1Ctrl'
              }
            }
          })
          //查看附表内容
          .state('tab.sbns003_6_1_2', {
            url: '/sbns003_6_1_2',
            views: {
              'taxService': {
                templateUrl: "templates/taxService/sbns/003/sbns003_6_1_2.html",
                controller: 'Zxns_6_1_2Ctrl'
              }
            }
          })
          //查看附表内容
          .state('tab.sbns003_6_1_3', {
            url: '/sbns003_6_1_3',
            views: {
              'taxService': {
                templateUrl: "templates/taxService/sbns/003/sbns003_6_1_3.html",
                controller: 'Zxns_6_1_3Ctrl'
              }
            }
          })
          //查看附表内容
          .state('tab.sbns003_6_1_4', {
            url: '/sbns003_6_1_4',
            views: {
              'taxService': {
                templateUrl: "templates/taxService/sbns/003/sbns003_6_1_4.html",
                controller: 'Zxns_6_1_4Ctrl'
              }
            }
          })

    })
    //个人所得税自行纳税申报表（A表）
    .controller('GrsdszxnsCtrl', function($scope,$window,$rootScope,$timeout,Loading,AjaxPost,taxFactory,$state,AppInfo,$ionicHistory) {
        var uuid = AppInfo.getUUID();
        $rootScope.hideTabs='tabs-item-hide';
        $scope.back =function() {
//            $window.location.href = 'index.html#/tab/taxService';
        	$ionicHistory.goBack();
            $rootScope.hideTabs='';
        };
        $scope.sbns003 = {
            nsrsbm : '',
            gljgdm : '',
            swglm : ''
        };
        var sbns003_user = findUserByLocal()==null?{}:findUserByLocal();
        $timeout(function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {zjlxdm : sbns003_user.SFZMLX_DM,zjhm : sbns003_user.SFZHM};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
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
                  if(checkResponse(responseTex)){
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
                          var sbns001_options = "";
                          for (var i = 0; i < zrrxxList.length; i++) {
                              sbns001_options += "<option  nsrsbm='"+zrrxxList[i].nsrsbm+"' gljgdm='"+zrrxxList[i].gljgdm+"' swglm='" + zrrxxList[i].swglm + "'>" + zrrxxList[i].gljgmc + "</option>";
                          }
                          Loading.commonAlert("<select style='height:50px;width: 100%' id='sbns003_swglmSelect'>" + sbns001_options + "</select>",function(){
                              var obj = document.getElementById('sbns003_swglmSelect');
                              var ind =obj.selectedIndex;
                              taxFactory.zxnssb.nsrsbm = $scope.sbns003.nsrsbm = obj.options[ind].getAttribute('nsrsbm');
                              taxFactory.zxnssb.gljgdm = $scope.sbns003.gljgdm = obj.options[ind].getAttribute('gljgdm');
                              taxFactory.zxnssb.swglm = $scope.sbns003.swglm = obj.options[ind].getAttribute('swglm');
                              //$rootScope.sbns001.sbns001_gljgmc = $("#sbns001_swglmSelect").find("option:selected").text();
                          },'请选择一个征收机关');
                      }
                  }else{
                      Loading.commonAlert(responseTex.msg,function(){
                          $rootScope.hideTabs='';
                          $window.location.href = 'index.html#/tab/taxService';
                      });
                  }
              }, function(jqXHR, textStatus, errorThrown){
                  Loading.loadingHide();
                  Loading.commonAlert(textStatus);
              })
            $scope.getNssqzt();
        },300);
        //查询纳税申报状态列表
        $scope.getNssqzt = function(){
            var data = {zjlxdm : sbns003_user.SFZMLX_DM,zjhm : sbns003_user.SFZHM};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
                    handleCode : "querySbList",
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
                    var sbList = responseTex.data.sbList;
                    if (checkResponse(responseTex)){
                        $scope.sbList =sbList;
                    }else{
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                },function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        };
        //下拉更新
        $scope.loadRefresh = function(){
            $scope.getNssqzt();
            $scope.$broadcast('scroll.refreshComplete');
        };
        //查看
        $scope.openDetail = function(pzxh){
            $state.go('tab.sbns003_6',{'pzxh':pzxh});
        };
        //扣款
        $scope.payAgain = function(pzxh,zsjg_dm){
            Loading.commonConfirm('进行重新扣款吗？', function (res) {
                if (res) {
                    Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
                    var data = { pzxh : pzxh, zsjgdm : zsjg_dm};
                    var reqDatas = {
                        jsonData : angular.toJson({
                            blhName : "Sbns003BLH",
                            handleCode : "queryAaginURL",
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
                            if (checkResponse(responseTex)){
                                if (responseTex.data.url != null) {
                                    var url = responseTex.data.url;
                                    //网银支付页
                                    $state.go('tab.sbns003_5',{'url':url,'payTitle':'网银支付'});
                                }else if(responseTex.data.ZFBUrl != null){
                                    var ZFBUrl = responseTex.data.ZFBUrl;
                                    //支付宝支付页
                                    $state.go('tab.sbns003_5',{'url':ZFBUrl,'payTitle':'支付宝支付'});
                                }
                            }else{
                                Loading.loadingTimoutHide(responseTex.msg);
                            }
                        },function(jqXHR, textStatus, errorThrown){
                            Loading.loadingHide();
                            Loading.loadingTimoutHide(textStatus);
                        });
                }
            })
        };
        //删除
        $scope.deleteRecord = function(pzxh){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">删除中...</div></div>');
            var data = { pzxh : pzxh};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
                    handleCode : "deleteSbInfo",
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
                    if (checkResponse(responseTex)){
                        Loading.loadingTimoutHide(responseTex.msg);
                        $scope.getNssqzt();
                    }else{
                        Loading.loadingTimoutHide(responseTex.msg);
                    }
                },function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        };
    })
    //附表
    .controller('Zxns_1Ctrl',function($scope,$ionicNavBarDelegate,$state,$timeout,Loading,AjaxPost,taxFactory,AppInfo){
        var uuid = AppInfo.getUUID();
        //点击返回
        $scope.back =function() {
            $state.go('tab.sbns003');
        };
        $scope.nsrlx ='';
        //附表初始化
        $scope.fbInit = function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {swglm :taxFactory.zxnssb.swglm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
                    handleCode : "initFormB",
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
                    $scope.contentB = responseTex.data;
                    //纳税人类型
                    var nsrlx = $scope.contentB.nsrlxList;
                    if(nsrlx){
                        var obj = document.getElementById('nsrlx');
                        var options = obj.options;
                        for(var i= 0,j=0;i < nsrlx.length; i++){
                            for(var j=0;j<options.length;j++){
                                if(nsrlx[i].nsrlxdm == options[j].value){
                                    obj.options[j].selected = true;
                                }
                            }

                        }
                    }
                    //jnlx三费一金缴纳情况
                    var jnlx = $scope.contentB.jnlxList;
                    if(jnlx){
                        var obj = document.getElementById('jnlx');
                        var options = obj.options;
                        for(var i=0 ;i<jnlx.length;i++){
                            for(var j=0;j<options.length;j++){
                                if(jnlx[i].jnlxdm == options[j].value){
                                    options[j].selected = 'selected';
                                }
                            }
                        }
                    }
                    //cjlxdm 残疾类型
                    var cjlx = $scope.contentB.cjlxList;
                    if(cjlx){
                        var obj = document.getElementById('cjlx');
                        var options = obj.options;
                        for(var i=0 ;i<cjlx.length;i++){
                            for(var j=0;j<options.length;j++){
                                if(cjlx[i].cjlxdm == options[j].value){
                                    options[j].selected = 'selected';
                                }
                            }
                        }
                    }
                    $scope.zwmc = responseTex.data.zwmc;
                    $scope.zjlx = responseTex.data.zjmc;
                    $scope.zj_hm = responseTex.data.zj_hm;
                    taxFactory.zxnssb.contentB = $scope.contentB;//基础信息
                    taxFactory.zxnssb.zbvo = $scope.contentB.zbvo;//基础信息
                    taxFactory.zxnssb.zbvo.zwmc = responseTex.data.zwmc;
                    taxFactory.zxnssb.zrrzyList = $scope.contentB.zrrzyList;//职业
                    taxFactory.zxnssb.zrrzwList = $scope.contentB.zrrzwList;//职务
                    taxFactory.zxnssb.zrrxlList = $scope.contentB.zrrxlList;//学历
                    taxFactory.zxnssb.jwvo = $scope.contentB.jwvo;//境外
                    taxFactory.zxnssb.dlwzsList = $scope.contentB.dlwzsList;//dlwzsList市
                    taxFactory.zxnssb.tzzlxList = $scope.contentB.tzzlxList;//投资者类型
                    taxFactory.zxnssb.tzvo = $scope.contentB.tzvo;//投资
                    taxFactory.zxnssb.zclxList = $scope.contentB.zclxList;//zclxList登记注册类型
                    taxFactory.zxnssb.jyhyxlList = $scope.contentB.jyhyxlList;//jyhyxlList行业
                    taxFactory.zxnssb.wzsvo = $scope.contentB.wzsvo;//无住所
                    taxFactory.zxnssb.mrGjdq = $scope.contentB.gjdq_dm;//默认国籍地区
                    taxFactory.zxnssb.gjdqList = $scope.contentB.gjdqList;//gjdqList国籍地区
                    taxFactory.zxnssb.next ={
                        zwmc : $scope.contentB.zwmc,
                        gjdqmc : $scope.contentB.gjdqmc,
                        zjmc : $scope.contentB.zjmc,
                        zj_hm : $scope.contentB.zj_hm,
                        ssqs : $scope.contentB.ssqs,
                        ssqz : $scope.contentB.ssqz
                    }; //下一步的个人信息
                    $scope.contentB.zbvo.rzdwnsrsbm = isNaN(parseInt( $scope.contentB.zbvo.rzdwnsrsbm)) ? '' : parseInt( $scope.contentB.zbvo.rzdwnsrsbm);
                }else{
                    Loading.commonAlert(responseTex.msg);
                }
            }, function(jqXHR, textStatus, errorThrown){
                Loading.loadingHide();
                Loading.commonAlert(textStatus);
            })
        };
        $scope.fbInit();
        //基础信息
        $scope.jcxx = function(){
            $state.go('tab.sbns003_1_1');
        };
        //境外所得纳税人
        $scope.jwsdnsr = function(){
            $state.go('tab.sbns003_1_2');
        };
        //投资人纳税人
        $scope.tzznsr = function(){
            $state.go('tab.sbns003_1_3');
        };
        //无住所纳税人
        $scope.wzsnsr = function(){
            $state.go('tab.sbns003_1_4');
        };

        $scope.next = function(){
            var tempnsrlx_flag = false;
            var nsrlxJg = [];//纳税人类型
            var jnlxJg = [];//三费一金缴纳代码
            var cjlxJg = [];//残疾类型代码
            var obj = document.getElementById('nsrlx');
            for(var i=0;i<obj.options.length;i++){
                if(obj.options[i].selected){
                    //alert(obj.options[i].value+''+obj.options[i].text);
                    nsrlxJg.push({
                        nsrlxdm:obj.options[i].value
                    });
                    tempnsrlx_flag = true;
                }
            }
            var jnlxObj = document.getElementById('jnlx');
            for(var i=0;i<jnlxObj.options.length;i++){
                if(jnlxObj.options[i].selected){
                    jnlxJg.push({
                        jnlxdm:jnlxObj.options[i].value
                    });
                }
            }
            var cjlxObj = document.getElementById('cjlx');
            for(var i=0;i<cjlxObj.options.length;i++){
                if(cjlxObj.options[i].selected){
                    cjlxJg.push({
                        cjlxdm:cjlxObj.options[i].value
                    });
                }
            }
            taxFactory.zxnssb.nsrlxJg = nsrlxJg;
            taxFactory.zxnssb.jnlxJg = jnlxJg;
            taxFactory.zxnssb.cjlxJg = cjlxJg;
            if (tempnsrlx_flag == false) {
                Loading.commonAlert('请选择【纳税人类型】！');
                return;
            }
            if (obj.options[2].selected) {
                if ("" == $.trim(taxFactory.zxnssb.tzvo.btzdwmc)) {
                    Loading.commonAlert('【被投资单位信息】中【名称】不能为空！');
                    return ;
                } else if ("" == $.trim(taxFactory.zxnssb.tzvo.btzdwswglm)) {
                    Loading.commonAlert('【被投资单位信息】中【扣缴义务人编码】不能为空！');
                    return ;
                } else if ("" == $.trim(taxFactory.zxnssb.tzvo.btzdwhydm)) {
                    Loading.commonAlert('【被投资单位信息】中【行业】不能为空！');
                    return;
                } else if ("" == $.trim(taxFactory.zxnssb.tzvo.btzdwsdszsfsdm)){
                    Loading.commonAlert('【被投资单位信息】中【所得税征收方式】不能为空！');
                    return;
                }
            }

            if (obj.options[3].selected){
                if ("" == $.trim(taxFactory.zxnssb.wzsvo.gjdqdm)){
                    Loading.commonAlert('【无住所纳税人信息】中【国籍】不能为空！');
                    return;
                } else if ("" == $.trim(taxFactory.zxnssb.wzsvo.xb)) {
                    Loading.commonAlert('【无住所纳税人信息】中【性别】不能为空！');
                    return;
                } else if ("" == $.trim(taxFactory.zxnssb.wzsvo.str_lhsj)) {
                    Loading.commonAlert('【无住所纳税人信息】中【来华时间】不能为空！');
                    return;
                }
            }
            $state.go('tab.sbns003_2');
            return true;
        };
    })
    //基础信息
    .controller('Zxns_1_1Ctrl',function($scope,$ionicNavBarDelegate,taxFactory,$timeout,Loading,AjaxPost,AppInfo){
        var uuid = AppInfo.getUUID();
        //点击返回
        $scope.back =function() {
            getResult();
            $ionicNavBarDelegate.back();
        };
        //返回取值
        function getResult(){
            taxFactory.zxnssb.zbvo.lxdzsqdm = $scope.jcxx.mrJcxxs.XZQHDS_DM;//默认市
            taxFactory.zxnssb.zbvo.lxdzxjdm =  $scope.jcxx.mrJcxxxq.XZQHXQ_DM;//默认县
            taxFactory.zxnssb.zbvo.lxdzxzdm =$scope.jcxx.mrJcxxjd.XZJD_DM;//默认街道
            taxFactory.zxnssb.zbvo.zydm = $scope.jcxx.mrZrrzy.ZY_DM;//默认职业
            taxFactory.zxnssb.zbvo.zwdm = $scope.jcxx.mrZrrzw.ZW_DM;//默认职务
            taxFactory.zxnssb.zbvo.xldm = $scope.jcxx.mrZrrxl.XL_DM;//默认学历
        }
        $scope.jcxx = {};
        $scope.zbvo = taxFactory.zxnssb.zbvo;
        $scope.zbvo.yzbm = isNaN(parseInt($scope.zbvo.yzbm)) ? '' : parseInt($scope.zbvo.yzbm);
        $scope.zbvo.sj = isNaN(parseInt($scope.zbvo.sj)) ? '' : parseInt($scope.zbvo.sj);
        $scope.zbvo.gh = isNaN(parseInt($scope.zbvo.gh)) ? '' : parseInt($scope.zbvo.gh);
        $scope.jcxx.mrJcxxs = {'XZQHDS_DM':taxFactory.zxnssb.zbvo.lxdzsqdm};//默认市
        $scope.jcxxs = taxFactory.zxnssb.dlwzsList;//市
        $scope.jcxx.mrJcxxxq = {'XZQHXQ_DM':taxFactory.zxnssb.zbvo.lxdzxjdm};//默认县
        $scope.jcxxsq = '';//县区
        $scope.jcxx.mrJcxxjd = {'XZJD_DM':taxFactory.zxnssb.zbvo.lxdzxzdm};//默认街道
        $scope.jcxxjd = '';//街道
        $scope.jcxxlxdz = taxFactory.zxnssb.zbvo.lxdz;//联系地址
        $scope.mrZrrzy = '';
        $scope.mrZrrzw = '';
        $scope.mrZrrxl = '';
        $scope.jcxx.mrZrrzy = {'ZY_DM':taxFactory.zxnssb.zbvo.zydm};//默认职业
        $scope.zrrzy = taxFactory.zxnssb.zrrzyList;//职业
        $scope.jcxx.mrZrrzw = {'ZW_DM':taxFactory.zxnssb.zbvo.zwdm};//默认职务
        $scope.zrrzw = taxFactory.zxnssb.zrrzwList;//职务
        $scope.jcxx.mrZrrxl = {'XL_DM':taxFactory.zxnssb.zbvo.xldm};//默认学历
        $scope.zrrxl = taxFactory.zxnssb.zrrxlList;//学历
        $timeout(function(){
            $scope.getXQ(taxFactory.zxnssb.zbvo.lxdzsqdm);
            $scope.getJd(taxFactory.zxnssb.zbvo.lxdzxjdm);
        },300);
        $scope.changeS = function(){
            $scope.getXQ($scope.jcxx.mrJcxxs.XZQHDS_DM);
        };
        $scope.changeXq = function(){
            $scope.getJd($scope.jcxx.mrJcxxxq.XZQHXQ_DM);
        };
        //得到县区的方法
        $scope.getXQ = function(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = { xzqhds_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
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
                    if(checkResponse(responseTex)){
                        $scope.jcxxsq = responseTex.data.xqList;
                    }else{
                        Loading.commonAlert(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        //得到街道的方法
        $scope.getJd = function(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = { xzqhxq_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
                    handleCode : "queryXZJD",
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
                        $scope.jcxxjd = responseTex.data.xzjdList;
                    }else{
                        Loading.commonAlert(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
    })
    //该栏仅由有境外所得纳税人填写
    .controller('Zxns_1_2Ctrl',function($scope,$ionicNavBarDelegate,taxFactory,$timeout,Loading,AjaxPost,AppInfo){
        var uuid = AppInfo.getUUID();
        //点击返回
        $scope.back =function() {
            getResult();
            $ionicNavBarDelegate.back();
        };
        //返回取值
        function getResult(){
            taxFactory.zxnssb.jwvo.lxdzsqdm = $scope.jwsdnsr.mrJws.XZQHDS_DM;//默认市
            taxFactory.zxnssb.jwvo.lxdzxjdm = $scope.jwsdnsr.mrJwxq.XZQHXQ_DM;//默认县区
            taxFactory.zxnssb.jwvo.lxdzxzdm = $scope.jwsdnsr.mrJwjd.XZJD_DM//默认街道
        }
        $scope.jwsdnsr = {};
        $scope.jwvo = taxFactory.zxnssb.jwvo;//境外
        $scope.jwvo.yzdm = isNaN(parseInt($scope.jwvo.yzdm)) ? '' : parseInt($scope.jwvo.yzdm);
        $scope.jwsdnsr.mrJws = {'XZQHDS_DM':taxFactory.zxnssb.jwvo.lxdzsqdm};//默认市
        $scope.jws = taxFactory.zxnssb.dlwzsList;//市
        $scope.jwsdnsr.mrJwxq = {'XZQHXQ_DM':taxFactory.zxnssb.jwvo.lxdzxjdm};//默认县区
        $scope.jwxq = '';//县区
        $scope.jwsdnsr.mrJwjd = {'XZJD_DM':taxFactory.zxnssb.jwvo.lxdzxzdm};//默认街道
        $scope.jwjd = '';//街道
        $scope.jwlxdz = taxFactory.zxnssb.jwvo.lxdz;//联系地址
        $timeout(function(){
            $scope.getXQ(taxFactory.zxnssb.jwvo.lxdzsqdm);
            $scope.getJd(taxFactory.zxnssb.jwvo.lxdzxjdm);
        },300);
        $scope.changeS = function(){
            $scope.getXQ($scope.jwsdnsr.mrJws.XZQHDS_DM);
        };
        $scope.changeXq = function(){
            $scope.getJd($scope.jwsdnsr.mrJwxq.XZQHXQ_DM);
        };
        //得到县区的方法
        $scope.getXQ = function(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {xzqhds_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
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
                    if(checkResponse(responseTex)){
                        $scope.jwxq = responseTex.data.xqList;
                    }else{
                        Loading.commonAlert(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        //得到街道的方法
        $scope.getJd = function(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {xzqhxq_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
                    handleCode : "queryXZJD",
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
                        $scope.jwjd = responseTex.data.xzjdList;
                    }else{
                        Loading.commonAlert(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
    })
    //该栏仅由投资者纳税人填写
    .controller('Zxns_1_3Ctrl',function($scope,$ionicNavBarDelegate,taxFactory){
        //点击返回
        $scope.back =function() {
            getResult();
            $ionicNavBarDelegate.back();
        };
        //返回取值
        function  getResult(){
            var tzzlxJg = [];//投资者类型代码
            var tzzlxObj = document.getElementById('tzzlx');
            for(var i=0;i<tzzlxObj.options.length;i++){
                if(tzzlxObj.options[i].selected){
                    tzzlxJg.push({
                        tzzlxdm:tzzlxObj.options[i].value
                    });
                }
            }
            taxFactory.zxnssb.tzzlxJg = tzzlxJg;
            taxFactory.zxnssb.tzvo.btzdwdjzclxdm = $scope.tzznsr.mrZclx.DJZCLX_DM;//默认登记注册类型
            taxFactory.zxnssb.tzvo.btzdwhydm = $scope.tzznsr.mrJyhyxl.JYHYXL_DM;//默认行业
        }
        //tzzlx 投资者类型
        var tzzlx = taxFactory.zxnssb.tzzlxList;
        if(!!tzzlx){
            if(!!taxFactory.zxnssb.tzzlxJg){
                tzzlx = taxFactory.zxnssb.tzzlxJg;
            }
            var obj = document.getElementById('tzzlx');
            var options = obj.options;
            for(var i=0 ;i<tzzlx.length;i++){
                for(var j=0;j<options.length;j++){
                    if(tzzlx[i].tzzlxdm == options[j].value){
                        options[j].selected = 'selected';
                    }
                }
            }
        }
        $scope.tzznsr = {};
        $scope.tzvo = taxFactory.zxnssb.tzvo//投资
        $scope.tzvo.btzdwswglm = isNaN(parseInt($scope.tzvo.btzdwswglm)) ? '' : parseInt($scope.tzvo.btzdwswglm);
        $scope.tzvo.btzdwyzbm = isNaN(parseInt($scope.tzvo.btzdwyzbm)) ? '' : parseInt($scope.tzvo.btzdwyzbm);
        $scope.tzvo.gstzje = parseFloat($scope.tzvo.gstzje);
        $scope.tzvo.grtzje = parseFloat($scope.tzvo.grtzje);
        $scope.tzznsr.mrZclx ={'DJZCLX_DM':taxFactory.zxnssb.tzvo.btzdwdjzclxdm};//默认登记注册类型
        $scope.zclx = taxFactory.zxnssb.zclxList;//zclxList登记注册类型
        $scope.tzznsr.mrJyhyxl = {'JYHYXL_DM':taxFactory.zxnssb.tzvo.btzdwhydm};//默认行业
        $scope.jyhyxl = taxFactory.zxnssb.jyhyxlList;//jyhyxlList行业
        $scope.sdszsfs = taxFactory.zxnssb.tzvo.btzdwsdszsfsdm;//所得税征收方式
        //数据格式化
        var sbns003_cal='';
        $scope.initCal = function(){
            sbns003_cal = new caltb("tzzList");
            initCalTable(sbns003_cal);
        };
        $scope.initCal();
    })
    //该栏仅由无住所纳税人填写
    .controller('Zxns_1_4Ctrl',function($scope,$ionicNavBarDelegate,taxFactory){
        //点击返回
        $scope.back =function() {
            getResult();
            $ionicNavBarDelegate.back();
        };
        //返回取值
        function getResult(){
            taxFactory.zxnssb.wzsvo.gjdqdm = $scope.wzsnsr.mrGjdq.GJDQ_DM;//默认国籍地区
            taxFactory.zxnssb.wzsvo.jnzwdm = $scope.wzsnsr.mrJnzw.ZW_DM;//wzsvo.jnzwdm   默认境内职务
            taxFactory.zxnssb.wzsvo.jwzwdm = $scope.wzsnsr.mrJwzw.ZW_DM;//wzsvo.jwzwdm   默认境外职务
            taxFactory.zxnssb.wzsvo.jwzwgb = $scope.wzsnsr.mrGwzwgb.GJDQ_DM;//默认境外支付国国别
        }
        $scope.wzsnsr = {};
        $scope.wzsvo = taxFactory.zxnssb.wzsvo;//无住所
        $scope.wzsvo.nsrsbm = isNaN(parseInt($scope.wzsvo.nsrsbm)) ? '' : parseInt($scope.wzsvo.nsrsbm);
        $scope.wzsvo.ldjyzhm = isNaN(parseInt($scope.wzsvo.ldjyzhm)) ? '' : parseInt($scope.wzsvo.ldjyzhm);
        $scope.wzsvo.rzdwswglm = isNaN(parseInt($scope.wzsvo.rzdwswglm)) ? '': parseInt($scope.wzsvo.rzdwswglm);
        $scope.wzsvo.rzdwyzbm = isNaN(parseInt($scope.wzsvo.rzdwyzbm)) ? "" : parseInt($scope.wzsvo.rzdwyzbm);
        $scope.wzsvo.qydwswglm = isNaN(parseInt($scope.wzsvo.qydwswglm)) ? '': parseInt($scope.wzsvo.qydwswglm);
        $scope.wzsvo.qydwyzbm = isNaN(parseInt($scope.wzsvo.qydwyzbm)) ? '' : parseInt($scope.wzsvo.qydwyzbm);
        $scope.wzsvo.str_csrq = new Date($scope.wzsvo.str_csrq);//出生日期
        $scope.wzsvo.str_lhsj = new Date($scope.wzsvo.str_lhsj);//来华时间
        $scope.wzsvo.str_rzqx = new Date($scope.wzsvo.str_rzqx);//任职期限
        $scope.wzsvo.str_ljrq = new Date($scope.wzsvo.str_ljrq);//预计离境时间
        $scope.wzsnsr.mrGjdq = {'GJDQ_DM':taxFactory.zxnssb.wzsvo.gjdqdm};//默认国籍地区
        $scope.gjdq = taxFactory.zxnssb.gjdqList;//gjdqList国籍地区
        $scope.wzsnsr.mrJnzw = {'ZW_DM':taxFactory.zxnssb.wzsvo.jnzwdm};//wzsvo.jnzwdm   默认境内职务
        $scope.jnzw = taxFactory.zxnssb.zrrzwList;//境内职务
        $scope.wzsnsr.mrJwzw = {'ZW_DM':taxFactory.zxnssb.wzsvo.jwzwdm};//wzsvo.jwzwdm   默认境外职务
        $scope.jwzw = taxFactory.zxnssb.zrrzwList;//境外职务
        $scope.wzsnsr.mrGwzwgb = {'GJDQ_DM':taxFactory.zxnssb.wzsvo.jwzwgb};//默认境外支付国国别
    })
    .controller('Zxns_2Ctrl',function($scope,$ionicNavBarDelegate,$state,taxFactory){
        //点击返回
        $scope.back =function() {
            $ionicNavBarDelegate.back();
        };
        $scope.next = function(){
            $state.go('tab.sbns003_3');
        };
        $scope.con = taxFactory.zxnssb.next;
    })
    .controller('Zxns_3Ctrl',function($scope,$ionicNavBarDelegate,$timeout,$compile,$state,Loading,AjaxPost,taxFactory,AppInfo){
        var uuid = AppInfo.getUUID();
        var index = null;
        //点击返回
        $scope.back =function() {
            $ionicNavBarDelegate.back();
        };
        $scope.footableOption = function(){
            $("#sbns003_tableDiv").html('');
            $("#sbns003_tableDiv").html('<table class="table table-bordered" id="sbns003_tableFootable">' + '<thead><tr><th data-toggle="true">纳税申报表</th><th data-hide="all">所得项目</th><th data-hide="all">收入额</th><th data-hide="all">免税所得</th><th data-hide="all">基本养老保险费</th><th data-hide="all">基本医疗保险费</th><th data-hide="all">失业保险费</th><th data-hide="all">住房公积金</th><th data-hide="all">财产原值</th><th data-hide="all">允许扣除的税费</th><th data-hide="all">其他</th><th data-hide="all">合计</th><th data-hide="all">减除费用</th><th data-hide="all">准予扣除的捐赠额</th><th data-hide="all">应纳税所得额</th><th data-hide="all">税率%</th><th data-hide="all">速算扣除数</th><th data-hide="all">应纳税额</th><th data-hide="all">减免税额</th><th data-hide="all">已缴税额</th><th data-hide="all">应补(退)税额</th><th data-sort-ignore="true" data-name="Delete"></th></tr></thead><tbody id="sbns003_tbody"></tbody></table>');
            $('.table-bordered').footable();
            //$('.add-row').unbind("click");
            $scope.getSdxm();
        };
        //删除行
        $scope.rowDelete = function(val){
            var row = $('.row-delete').parent('td').parent('.list'+val);
            var footable = $('#sbns003_tableFootable').data('footable');
            footable.removeRow(row);
        };
        //增加行
        $scope.addRow = function(){
            //e.preventDefault();
            var footable = $('#sbns003_tableFootable').data('footable');//$compile(sqjg)($scope);
            var newRow = $compile('<tr name="sbns003_lineinfos" class="list'+index+'"><td ng-click="ssbl002_toggleClick('+index+')">申报内容</td>' +
                '<td><select id="sbns003_sdxm_' + index + '" name="sbns003_sdxm"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%">'+options+'</select></td>' +
                '<td><input type="number" cal="true" name="sbns003_sre" id="sbns003_sre_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' +
                '<td><input type="number" cal="true" name="sbns003_mssd" id="sbns003_mssd_' + index + '" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' +
                '<td><input type="number" cal="true" name="sbns003_jbylbxf" id="sbns003_jbylbxf_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' +
                '<td><input type="number" cal="true" name="sbns003_hbylbxf" id="sbns003_hbylbxf_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' +
                '<td><input type="number" cal="true" name="sbns003_sybxf" id="sbns003_sybxf_' + index + '" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>' +
                '<td><input type="number" cal="true" name="sbns003_zfgjj" id="sbns003_zfgjj_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_ccyz" id="sbns003_ccyz_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_yxkcdsf" id="sbns003_yxkcdsf_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_qt" id="sbns003_qt_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_hj" id="sbns003_hj_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_jcfy" id="sbns003_jcfy_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_zykcdjze" id="sbns003_zykcdjze_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_ynssde" id="sbns003_ynssde_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_sl" id="sbns003_sl_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_sskcs" id="sbns003_sskcs_' + index + '" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_ynse" id="sbns003_ynse_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_jmse" id="sbns003_jmse_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_yjse" id="sbns003_yjse_' + index + '" style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td><input type="number" cal="true" name="sbns003_ybtse" id="sbns003_ybtse_' + index + '"  style="border:1px solid #9E9E9E;height:37px;margin-top:4px;text-align:right;width: 100%"></td>'+
                '<td style="vertical-align: middle;text-align: center" ><a class="row-delete calm" ng-click="rowDelete('+index+')">删除</a></td></tr>')($scope);
                footable.appendRow(newRow);
                $scope.changeSdxm(index);
                if(index==1){
                   footable.toggleDetail($("#sbns003_tbody tr").eq(0));
                }
                index++;
                //公式计算
                var sbns001_cal = null;
                sbns001_cal = new caltb("sbns003_tableFootable");
                //sbns001_cal.setEmptyArr(emptyArr);
                sbns001_cal.setRules(sbns001_arrCal);
                initCalTable(sbns001_cal);
                caltbF(sbns001_cal);
                calHj();
                sbns001_cal.customrulesEnd=function(){
                    ynssdeChange();
                }
        };
        //table表的隐藏显示切换
        $scope.ssbl002_toggleClick = function(val){
            var footable = $('#sbns003_tableFootable').data('footable');
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
/*        function toggleClick(obj) {
            var footable = $('#sbns003_tableFootable').data('footable');
            var $row = $(obj).parent();
            $("tbody tr").each(function() {
              footable.toggleDetail($(this));

            });
        }*/

        var sbns001_arrCal =new Array();
        sbns001_arrCal.push({
            GS : "sbns003_hj = sbns003_jbylbxf + sbns003_hbylbxf + sbns003_sybxf + sbns003_zfgjj + sbns003_ccyz + sbns003_yxkcdsf + sbns003_qt",
            GSLX : "X"
            }, {
              GS : "sbns003_ynssde = sbns003_sre - sbns003_mssd - sbns003_hj - sbns003_jcfy - sbns003_zykcdjze",
              GSLX : "X"
            }, {
              GS : "sbns003_ynse = sbns003_ynssde * sbns003_sl - sbns003_sskcs",
              GSLX : "X"
            }, {
              GS : "sbns003_ybtse = sbns003_ynse - sbns003_jmse - sbns003_yjse",
              GSLX : "X"
            }, {
              GS : "sbns003_ybtsehj = sbns003_ybtse",
              GSLX : "Y"
            });

        $timeout(function(){
            $scope.footableOption();
        },300);


        //获取所得项目内容
        var options ='';
        var slList = '';
        $scope.getSdxm = function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = { gljgdm : taxFactory.zxnssb.gljgdm, ssqq : taxFactory.zxnssb.next.ssqs, ssqz : taxFactory.zxnssb.next.ssqz};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
                    handleCode : "initFormA",
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
                        var list= responseTex.data.zspmList;
                        slList = responseTex.data.slList;
                        if(list){
                            list.unshift({'zsxmdm':'','zspmmc':'请选择'});
                            for(var i=0;i<list.length;i++){
                                options += '<option value='+list[i].zspmdm+ '>'+list[i].zspmmc+'</option>';
                            }
                        }
                    }else{
                        Loading.commonAlert(responseTex.msg);
                    }
                    index = 1;
                    $scope.addRow();
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };


        function ynssdeChange(){
            for(var i=1;i<index;i++){
                slList.forEach(function(obj, ind, array1){
                    if(obj.zspmdm ==$('#sbns003_sdxm_'+i).val() && parseFloat($('#sbns003_ynssde_'+i).val()) > parseFloat(obj.xx) && parseFloat($('#sbns003_ynssde_'+i).val()) <= obj.sx){
                        $('#sbns003_sl_'+i).val(obj.sl);
                        var sskc = (obj.sskc =='0' && '0.00') || obj.sskc;
                        $('#sbns003_sskcs_'+i).val(sskc);
                        return;
                    }
                });
            }
            //公式计算
            var sbns001_cal = null;
            sbns001_cal = new caltb("sbns003_tableFootable");
            sbns001_cal.setRules(sbns001_arrCal);
            caltbF(sbns001_cal);
            calHj();
        }

        //判断应补退税额小于1元时免征
        function calHj(){
            var hj = document.getElementsByName("sbns003_ybtsehj")[0];
            var ybtse = document.getElementsByName("sbns003_ybtse");
            var temp = 0;
            for(var i=0;i<ybtse.length;i++){
                if(ybtse[i].value>0 && ybtse[i].value<1){
                    ybtse[i].value = (0).toFixed(2);
                }
                if(ybtse[i].value!=''){
                    temp += parseFloat(ybtse[i].value);
                }
            }
            if(temp<0){
                temp=0;
            }
            hj.value = temp.toFixed(2);
        }

        $scope.changeSdxm = function(i){
            $('#sbns003_sdxm_'+i).bind('change',function(){
                var val = $(this).val();//find("option:selected") ///sbns003_ccyz_
                if(val=='090101'){
                    $('#sbns003_ccyz_'+i).attr('readonly',false);
                }else {
                    $('#sbns003_ccyz_'+i).attr('readonly',true);
                    $('#sbns003_ccyz_'+i).val('0.00');
                }
                ynssdeChange();
            });
           /* //合计
            $('#sbns003_jbylbxf_'+i).change(function(){
                alert(i);
                getHj(i);
            });
            $('#sbns003_hbylbxf_'+i).change(function(){
                getHj(i);
            });
            $('#sbns003_sybxf_'+i).change(function(){
                getHj(i);
            });
            $('#sbns003_zfgjj_'+i).change(function(){
                getHj(i);
            });
            $('#sbns003_ccyz_'+i).change(function(){
                getHj(i);
            });
            $('#sbns003_yxkcdsf_'+i).change(function(){
                getHj(i);
            });
            $('#sbns003_qt_'+i).change(function(){
                getHj(i);
            });
            //应纳税所得额
            $('#sbns003_sre_'+i).change(function(){
                getYnssde(i);
            });
            $('#sbns003_mssd_'+i).change(function(){
                getYnssde(i);
            });
            $('#sbns003_hj_'+i).change(function(){
                getYnssde(i);
            });
            $('#sbns003_jcfy_'+i).change(function(){
                getYnssde(i);
            });
            $('#sbns003_zykcdjze_'+i).change(function(){
                getYnssde(i);
            });*/
        };
          /*//得到合计方法
          var getHj = function(i){
              var jbylbxf = $('#sbns003_jbylbxf_'+i).val();
              var hbylbxf = $('#sbns003_hbylbxf_'+i).val();
              var sybxf = $('#sbns003_sybxf_'+i).val();
              var zfgjj = $('#sbns003_zfgjj_'+i).val();
              var ccyz = $('#sbns003_ccyz_'+i).val();
              var yxkcdsf = $('#sbns003_yxkcdsf_'+i).val();
              var qt = $('#sbns003_qt_'+i).val();
              jbylbxf = (jbylbxf == ''&& '0') || jbylbxf;
              hbylbxf = (hbylbxf == ''&& '0') || hbylbxf;
              sybxf = (sybxf == ''&& '0') || sybxf;
              zfgjj = (zfgjj == ''&& '0') || zfgjj;
              ccyz = (ccyz == ''&& '0') || ccyz;
              yxkcdsf = (yxkcdsf == ''&& '0') || yxkcdsf;
              qt = (qt == ''&& '0') || qt;
              var hj = parseFloat(jbylbxf) + parseFloat(hbylbxf) + parseFloat(sybxf) + parseFloat(zfgjj) + parseFloat(ccyz) + parseFloat(yxkcdsf) + parseFloat(qt);
              $('#sbns003_hj_'+i).val(hj);
          };
          //得到应纳税所得额方法
          var getYnssde = function(i){
              var sre = $('#sbns003_sre_'+i).val();
              var mssd = $('#sbns003_mssd_'+i).val();
              var hj = $('#sbns003_hj_'+i).val();
              var jcfy = $('#sbns003_jcfy_'+i).val();
              var zykcdjze = $('#sbns003_zykcdjze_'+i).val();
              sre = (sre == '' && '0')|| sre;
              mssd = (mssd == '' && '0')|| mssd;
              hj = (hj == '' && '0')|| hj;
              jcfy = (jcfy == '' && '0')|| jcfy;
              zykcdjze = (zykcdjze == '' && '0')|| zykcdjze;
              var jg = parseFloat(sre) - parseFloat(mssd) - parseFloat(hj) - parseFloat(jcfy) - parseFloat(zykcdjze);
              $('#sbns003_ynssde_'+i).val(jg);
          };*/
          //跳转到附表
        $scope.fb = function(){
            $state.go('tab.sbns003_1');
        };
        //保存
        $scope.bc = function(){
            var footable = $('#sbns003_tableFootable').data('footable');
            $("tbody tr").each(function() {
                if ($(this).hasClass('footable-detail-show')) {
                    footable.toggleDetail($(this));
                }
            });
            if(document.getElementsByName('sbns003_lineinfos').length=='0'){
                Loading.commonAlert('请添加行!');
                return;
            }

            for(var i=1;i<=document.getElementsByName('sbns003_lineinfos').length;i++){

                if(document.getElementsByName('sbns003_sdxm')[ i-1].value=='undefined'){
                    Loading.commonAlert('第'+i+'行征收品目不能为空!',function(){
                        //footable.toggleDetail($("#sbns003_tbody tr")[i-1]);
                    });
                    return;
                }
            }
            if (document.getElementsByName('sbns003_ybtsehj')[0].value =='') {
                Loading.commonAlert('请填写申报数据!');
                return;
            }

            Loading.commonConfirm('合计金额:&nbsp;<span style="font-size: 26px;color: red">'+document.getElementsByName('sbns003_ybtsehj')[0].value+'</span>元', function (res) {
                if(res){
                    var mxxx = [];//主表明细列表
                    var mxxxObj = document.getElementsByName('sbns003_lineinfos');
                    for(var i=0;i<mxxxObj.length;i++){
                        mxxx.push({
                            zspmdm:document.getElementsByName('sbns003_sdxm')[i].value,
                            sreje:document.getElementsByName('sbns003_sre')[i].value,
                            mssdeje:document.getElementsByName('sbns003_mssd')[i].value,
                            jbylbxfje:document.getElementsByName('sbns003_jbylbxf')[i].value,
                            hbylbxfje:document.getElementsByName('sbns003_hbylbxf')[i].value,
                            sybxfje:document.getElementsByName('sbns003_sybxf')[i].value,
                            zfgjjje:document.getElementsByName('sbns003_zfgjj')[i].value,
                            ccyzje:document.getElementsByName('sbns003_ccyz')[i].value,
                            yxkcdsfje:document.getElementsByName('sbns003_yxkcdsf')[i].value,
                            qtje:document.getElementsByName('sbns003_qt')[i].value,
                            hjje:document.getElementsByName('sbns003_hj')[i].value,
                            jcfyje:document.getElementsByName('sbns003_jcfy')[i].value,
                            zykcdjzeje:document.getElementsByName('sbns003_zykcdjze')[i].value,
                            ynssdeje:document.getElementsByName('sbns003_ynssde')[i].value,
                            sl:document.getElementsByName('sbns003_sl')[i].value,
                            sskcs:document.getElementsByName('sbns003_sskcs')[i].value,
                            ynseje:document.getElementsByName('sbns003_ynse')[i].value,
                            jmseje:document.getElementsByName('sbns003_jmse')[i].value,
                            yjseje:document.getElementsByName('sbns003_yjse')[i].value,
                            ybtsseje:document.getElementsByName('sbns003_ybtse')[i].value
                        });
                    }
                  Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">提交中...</div></div>');
                  var reqDatas = {
                    jsonData : angular.toJson({
                      blhName : "Sbns003BLH",
                      handleCode : "saveData",
                      data : {
                        swglm:taxFactory.zxnssb.swglm,
                        xm:taxFactory.zxnssb.zbvo.zwmc,
                        rzdwmc_zbvo:taxFactory.zxnssb.zbvo.rzdwmc,
                        rzdwnsrsbm:taxFactory.zxnssb.zbvo.rzdwnsrsbm,
                        dzyx:taxFactory.zxnssb.zbvo.dzyx,
                        lxdzsjdm_zbvo:'32',
                        lxdzsqdm_zbvo:taxFactory.zxnssb.zbvo.lxdzsqdm,
                        lxdzxjdm_zbvo:taxFactory.zxnssb.zbvo.lxdzxjdm,
                        lxdzxzdm_zbvo:taxFactory.zxnssb.zbvo.lxdzxzdm,
                        lxdz_zbvo:taxFactory.zxnssb.zbvo.lxdz,
                        yzbm_zbvo:taxFactory.zxnssb.zbvo.yzbm,
                        sj:taxFactory.zxnssb.zbvo.sj,
                        gh:taxFactory.zxnssb.zbvo.gh,
                        zydm:taxFactory.zxnssb.zbvo.zydm,
                        zwdm:taxFactory.zxnssb.zbvo.zwdm,
                        xldm:taxFactory.zxnssb.zbvo.xldm,
                        str_sfssqqsrq:taxFactory.zxnssb.next.ssqs,
                        str_sfssqzzrq:taxFactory.zxnssb.next.ssqz,
                        cjqk:taxFactory.zxnssb.zbvo.cjqk,
                        lxdzsjdm_jwvo:'32',
                        lxdzsqdm_jwvo:taxFactory.zxnssb.jwvo.lxdzsqdm,
                        lxdzxjdm_jwvo:taxFactory.zxnssb.jwvo.lxdzxjdm,
                        lxdzxzdm_jwvo:taxFactory.zxnssb.jwvo.lxdzxzdm,
                        lxdz_jwvo:taxFactory.zxnssb.jwvo.lxdz,
                        yzdm:taxFactory.zxnssb.jwvo.yzdm,
                        btzdwmc:taxFactory.zxnssb.tzvo.btzdwmc,
                        btzdwswglm:taxFactory.zxnssb.tzvo.btzdwswglm,
                        btzdwdz:taxFactory.zxnssb.tzvo.btzdwdz,
                        btzdwyzbm:taxFactory.zxnssb.tzvo.btzdwyzbm,
                        btzdwdjzclxdm:taxFactory.zxnssb.tzvo.btzdwdjzclxdm,
                        btzdwhydm:taxFactory.zxnssb.tzvo.btzdwhydm,
                        btzdwsdszsfsdm:taxFactory.zxnssb.tzvo.btzdwsdszsfsdm,
                        gstzje:taxFactory.zxnssb.tzvo.gstzje,
                        grtzje:taxFactory.zxnssb.tzvo.grtzje,
                        nsrsbm:taxFactory.zxnssb.wzsvo.nsrsbm,
                        gjdqdm_wzsvo:taxFactory.zxnssb.wzsvo.gjdqdm,
                        csd:taxFactory.zxnssb.wzsvo.csd,
                        xb:taxFactory.zxnssb.wzsvo.xb,
                        str_csrq:taxFactory.zxnssb.wzsvo.str_csrq,
                        ldjyzhm:taxFactory.zxnssb.wzsvo.ldjyzhm,
                        sfxddyg:taxFactory.zxnssb.wzsvo.sfxddyg,
                        jnzwdm:taxFactory.zxnssb.wzsvo.jnzwdm,
                        jwzwdm:taxFactory.zxnssb.wzsvo.jwzwdm,
                        str_lhsj:taxFactory.zxnssb.wzsvo.str_lhsj,
                        str_rzqx:taxFactory.zxnssb.wzsvo.str_rzqx,
                        str_ljrq:taxFactory.zxnssb.wzsvo.str_ljrq,
                        ljdd:taxFactory.zxnssb.wzsvo.ljdd,
                        rzdwmc_wzsvo:taxFactory.zxnssb.wzsvo.rzdwmc,
                        rzdwswglm_wzsvo:taxFactory.zxnssb.wzsvo.rzdwswglm,
                        rzdwdz_wzsvo:taxFactory.zxnssb.wzsvo.rzdwdz,
                        rzdwyzbm_wzsvo:taxFactory.zxnssb.wzsvo.rzdwyzbm,
                        qydwmc:taxFactory.zxnssb.wzsvo.qydwmc,
                        qydwswglm:taxFactory.zxnssb.wzsvo.qydwswglm,
                        qydwdz:taxFactory.zxnssb.wzsvo.qydwdz,
                        qydwyzbm:taxFactory.zxnssb.wzsvo.qydwyzbm,
                        pqdwmc:taxFactory.zxnssb.wzsvo.pqdwmc,
                        pqdwdz:taxFactory.zxnssb.wzsvo.pqdwdz,
                        zfd:taxFactory.zxnssb.wzsvo.zfd,
                        jwzwgb:taxFactory.zxnssb.wzsvo.jwzwgb,
                        nsrlxList:taxFactory.zxnssb.nsrlxJg,
                        tzzlxList:taxFactory.zxnssb.tzzlxJg,
                        jnlxList:taxFactory.zxnssb.jnlxJg,
                        cjlxList:taxFactory.zxnssb.cjlxJg,
                        mxxx:mxxx,
                        sbqx:taxFactory.zxnssb.contentB.sbqxz,
                        ybtsehj:document.getElementsByName('sbns003_ybtsehj')[0].value,
                        zxsbqx:$('#zxsbqx').val(),
                        tbrq:taxFactory.zxnssb.contentB.tbrq
                      },
                      yhwybz : uuid,
                      bizDataMw : formatStr('sljfslfj22323',uuid)
                    })
                  };
                  AjaxPost.getData(reqDatas)
                    .then(function(responseText, textStatus,XMLHttpRequest){
                      Loading.loadingHide();
                      var response = Decrypt(responseText.toString(),uuid);
                      var responseTex = JSON.parse(AjaxPost.change(response));
                      if(checkResponse(responseTex)){
                          if(responseTex.data.url==null && responseTex.data.ZFBUrl==null){
                              Loading.loadingTimoutHide(responseTex.msg);
                          }else {
                              var url = responseTex.data.url ==null ? '' : responseTex.data.url;
                              var ZFBUrl = responseTex.data.ZFBUrl==null ? '' : responseTex.data.ZFBUrl;
                              //支付页
                              $state.go('tab.sbns003_4',{'url':url,'ZFBUrl':ZFBUrl});
                          }
                      }else{
                        Loading.commonAlert(responseTex.msg);
                      }
                    }, function(jqXHR, textStatus, errorThrown){
                      Loading.loadingHide();
                      Loading.commonAlert(textStatus);
                    })
                }
            },'确定提交吗？');

        };
    })
    .controller('Zxns_4Ctrl',function($scope,$rootScope,$stateParams,$ionicHistory,$window,$state){
        $scope.closePayPage1 = function () {
            //$window.location.href = 'index.html#/tab/taxService';
            $ionicHistory.clearCache();
            $state.go('tab.taxService');
            $rootScope.hideTabs='';
        };
        var url = $stateParams.url ;
        var ZFBUrl = $stateParams.ZFBUrl ;
        $scope.canYlpay = false;
        $scope.canAlipay = false;
        if(url != ''){
            $scope.canYlpay = true;
        }
        if(ZFBUrl != ''){
            $scope.canAlipay = true;
        }
        $scope.payOrder = function(type){
            if(type==1){
                $state.go('tab.sbns003_5',{'url':ZFBUrl,'payTitle':'支付宝支付'});
            }
            if(type==2){
                $state.go('tab.sbns003_5',{'url':url,'payTitle':'银联支付'});
            }
        }
    })
    .controller('Zxns_5Ctrl',function($scope,$rootScope,$stateParams,$window,$ionicHistory,$state){
        $scope.back = function () {
            $ionicHistory.goBack();
        };
        $scope.closePayPage2 = function () {
            //$window.location.href = 'index.html#/tab/taxService';
            $ionicHistory.clearCache();
            $state.go('tab.taxService');
            $rootScope.hideTabs='';
        };
        $scope.kkfs = $stateParams.payTitle ;
        $("#sbns001_iframe").css("height",window.innerHeight+"px");
        $("#sbns001_iframe").prop("src", $stateParams.url);
    })
    .controller('Zxns_6Ctrl',function($scope,$ionicHistory,$timeout,$stateParams,AjaxPost,Loading,AppInfo,$state){
        var uuid = AppInfo.getUUID();
        $scope.back = function () {
            $ionicHistory.goBack();
        };
        $timeout(function(){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = {pzxh : $stateParams.pzxh};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
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
                    if (checkResponse(responseTex)){
                        $("#cx_jg_list").empty();
                        var sbmxList = responseTex.data.sbmxList;
                        $scope.tbrq =responseTex.data.tbrq;
                        $scope.str_sfssqqsrq = responseTex.data.zbvo.str_sfssqqsrq;
                        $scope.str_sfssqzzrq = responseTex.data.zbvo.str_sfssqzzrq;
                        for (var i = 0; i < sbmxList.length; i++) {
                            var zspmmc = sbmxList[i].zspmmc;
                            var sre =  NullTOEmpty(sbmxList[i].sre);
                            var mssd = NullTOEmpty(sbmxList[i].mssd);
                            var jbylbxf =  NullTOEmpty(sbmxList[i].jbylbxf);
                            var hbylbxf =  NullTOEmpty(sbmxList[i].hbylbxf);
                            var sybxf =  NullTOEmpty(sbmxList[i].sybxf);
                            var zfgjj =  NullTOEmpty(sbmxList[i].zfgjj);
                            var ccyz =  NullTOEmpty(sbmxList[i].ccyz);
                            var yxkcdsf =  NullTOEmpty(sbmxList[i].yxkcdsf);
                            var qt =  NullTOEmpty(sbmxList[i].qt);
                            var hj =  NullTOEmpty(sbmxList[i].hj);
                            var jcfy =  NullTOEmpty(sbmxList[i].jcfy);
                            var zykcdjze =  NullTOEmpty(sbmxList[i].zykcdjze);
                            var ynssde =  NullTOEmpty(sbmxList[i].ynssde);
                            var sl =  NullTOEmpty(sbmxList[i].sl);
                            var sskcs =  NullTOEmpty(sbmxList[i].sskcs);
                            var ynse =  NullTOEmpty(sbmxList[i].ynse);
                            var jmse =  NullTOEmpty(sbmxList[i].jmse);
                            var yjse =  NullTOEmpty(sbmxList[i].yjse);
                            var ybtse =  sbmxList[i].ybtse;
                            $("#cx_jg_list").append('<tr><td style="text-align: center">' + zspmmc + '</td><td style="text-align: center;border-left: hidden">查看详细</a></td><td><input class="myinput" type="text" value="'+zspmmc+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+sre+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+mssd+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+jbylbxf+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+hbylbxf+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+sybxf+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+zfgjj+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+ccyz+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+yxkcdsf+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+qt+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+hj+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+jcfy+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+zykcdjze+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+ynssde+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+sl+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+sskcs+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+ynse+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+jmse+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+yjse+'" readonly="readonly" ></td><td><input class="myinput" type="number" value="'+ybtse+'" readonly="readonly" ></td></tr>');
                        }
                        $('.table-bordered').footable();
                    }else{
                        Loading.loadingTimoutHide(responseText.msg);
                    }
                },function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.loadingTimoutHide(textStatus);
                });
        },300);
        //查看附表
        $scope.ck_fb = function(){
            $state.go('tab.sbns003_6_1',{'pzxh':$stateParams.pzxh});
        };
    })
    .controller('Zxns_6_1Ctrl',function($scope,$ionicHistory,$state,$timeout,Loading,AjaxPost,taxFactory,AppInfo,$stateParams){
        var uuid = AppInfo.getUUID();
        //点击返回
        $scope.back = function () {
            $ionicHistory.goBack();
        };
        $scope.nsrlx ='';
        //附表初始化
        $scope.fbInit = function(){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {pzxh : $stateParams.pzxh};
          var reqDatas = {
            jsonData : angular.toJson({
              blhName : "Sbns003BLH",
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
              if(checkResponse(responseTex)){
                $scope.contentB = responseTex.data;
                //纳税人类型
                var nsrlx = $scope.contentB.nsrlxList;
                if(nsrlx){
                  var obj = document.getElementById('nsrlx');
                  var options = obj.options;
                  for(var i= 0,j=0;i < nsrlx.length; i++){
                    for(var j=0;j<options.length;j++){
                      if(nsrlx[i].nsrlxdm == options[j].value){
                        obj.options[j].selected = true;
                      }
                    }

                  }
                }
                //jnlx三费一金缴纳情况
                var jnlx = $scope.contentB.jnlxList;
                if(jnlx){
                  var obj = document.getElementById('jnlx');
                  var options = obj.options;
                  for(var i=0 ;i<jnlx.length;i++){
                    for(var j=0;j<options.length;j++){
                      if(jnlx[i].jnlxdm == options[j].value){
                        options[j].selected = 'selected';
                      }
                    }
                  }
                }
                //cjlxdm 残疾类型
                var cjlx = $scope.contentB.cjlxList;
                if(cjlx){
                  var obj = document.getElementById('cjlx');
                  var options = obj.options;
                  for(var i=0 ;i<cjlx.length;i++){
                    for(var j=0;j<options.length;j++){
                      if(cjlx[i].cjlxdm == options[j].value){
                        options[j].selected = 'selected';
                      }
                    }
                  }
                }
                taxFactory.zxnssb.contentB = $scope.contentB;//基础信息
                taxFactory.zxnssb.zbvo = $scope.contentB.zbvo;//基础信息
                taxFactory.zxnssb.zrrzyList = $scope.contentB.zrrzyList;//职业
                taxFactory.zxnssb.zrrzwList = $scope.contentB.zrrzwList;//职务
                taxFactory.zxnssb.zrrxlList = $scope.contentB.zrrxlList;//学历
                taxFactory.zxnssb.jwvo = $scope.contentB.jwvo;//境外
                taxFactory.zxnssb.dlwzsList = $scope.contentB.dlwzsList;//dlwzsList市
                taxFactory.zxnssb.tzzlxList = $scope.contentB.tzzlxList;//投资者类型
                taxFactory.zxnssb.tzvo = $scope.contentB.tzvo;//投资
                taxFactory.zxnssb.zclxList = $scope.contentB.zclxList;//zclxList登记注册类型
                taxFactory.zxnssb.jyhyxlList = $scope.contentB.jyhyxlList;//jyhyxlList行业
                taxFactory.zxnssb.wzsvo = $scope.contentB.wzsvo;//无住所
                taxFactory.zxnssb.mrGjdq = $scope.contentB.gjdq_dm;//默认国籍地区
                taxFactory.zxnssb.gjdqList = $scope.contentB.gjdqList;//gjdqList国籍地区
                taxFactory.zxnssb.next ={
                  zwmc : $scope.contentB.zwmc,
                  gjdqmc : $scope.contentB.gjdqmc,
                  zjmc : $scope.contentB.zjmc,
                  zj_hm : $scope.contentB.zj_hm,
                  ssqs : $scope.contentB.ssqs,
                  ssqz : $scope.contentB.ssqz
                }; //下一步的个人信息

              }else{
                Loading.commonAlert(responseTex.msg);
              }
            }, function(jqXHR, textStatus, errorThrown){
              Loading.loadingHide();
              Loading.commonAlert(textStatus);
            })
        };
        $scope.fbInit();
        //基础信息
        $scope.jcxx = function(){
          $state.go('tab.sbns003_6_1_1');
        };
        //境外所得纳税人
        $scope.jwsdnsr = function(){
          $state.go('tab.sbns003_6_1_2');
        };
        //投资人纳税人
        $scope.tzznsr = function(){
          $state.go('tab.sbns003_6_1_3');
        };
        //无住所纳税人
        $scope.wzsnsr = function(){
          $state.go('tab.sbns003_6_1_4');
        };
    })
    //查看基础信息
    .controller('Zxns_6_1_1Ctrl',function($scope,$ionicNavBarDelegate,taxFactory,$timeout,Loading,AjaxPost,AppInfo){
        var uuid = AppInfo.getUUID();
        //点击返回
        $scope.back =function() {
            $ionicNavBarDelegate.back();
        };
        $scope.jcxx = {};
        $scope.zbvo = taxFactory.zxnssb.zbvo;
        $scope.zbvo.yzbm = parseInt($scope.zbvo.yzbm);
        $scope.jcxx.mrJcxxs = {'XZQHDS_DM':taxFactory.zxnssb.zbvo.lxdzsqdm};//默认市
        $scope.jcxxs = taxFactory.zxnssb.dlwzsList;//市
        $scope.jcxx.mrJcxxxq = {'XZQHXQ_DM':taxFactory.zxnssb.zbvo.lxdzxjdm};//默认县
        $scope.jcxxsq = '';//县区
        $scope.jcxx.mrJcxxjd = {'XZJD_DM':taxFactory.zxnssb.zbvo.lxdzxzdm};//默认街道
        $scope.jcxxjd = '';//街道
        $scope.jcxxlxdz = taxFactory.zxnssb.zbvo.lxdz;//联系地址
        $scope.mrZrrzy = '';
        $scope.mrZrrzw = '';
        $scope.mrZrrxl = '';
        $scope.jcxx.mrZrrzy = {'ZY_DM':taxFactory.zxnssb.zbvo.zydm};//默认职业
        $scope.zrrzy = taxFactory.zxnssb.zrrzyList;//职业
        $scope.jcxx.mrZrrzw = {'ZW_DM':taxFactory.zxnssb.zbvo.zwdm};//默认职务
        $scope.zrrzw = taxFactory.zxnssb.zrrzwList;//职务
        $scope.jcxx.mrZrrxl = {'XL_DM':taxFactory.zxnssb.zbvo.xldm};//默认学历
        $scope.zrrxl = taxFactory.zxnssb.zrrxlList;//学历
        $timeout(function(){
          $scope.getXQ(taxFactory.zxnssb.zbvo.lxdzsqdm);
          $scope.getJd(taxFactory.zxnssb.zbvo.lxdzxjdm);
        },300);
        $scope.changeS = function(){
          $scope.getXQ($scope.jcxx.mrJcxxs.XZQHDS_DM);
        };
        $scope.changeXq = function(){
          $scope.getJd($scope.jcxx.mrJcxxxq.XZQHXQ_DM);
        };
        //得到县区的方法
        $scope.getXQ = function(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = { xzqhds_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
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
                    if(checkResponse(responseTex)){
                        $scope.jcxxsq = responseTex.data.xqList;
                    }else{
                        Loading.commonAlert(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        //得到街道的方法
        $scope.getJd = function(dm){
            Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
            var data = { xzqhxq_dm : dm};
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Sbns003BLH",
                    handleCode : "queryXZJD",
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
                        $scope.jcxxjd = responseTex.data.xzjdList;
                    }else{
                        Loading.commonAlert(responseTex.msg);
                    }
                }, function(jqXHR, textStatus, errorThrown){
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
          };
    })
    .controller('Zxns_6_1_2Ctrl',function($scope,$ionicNavBarDelegate,taxFactory,$timeout,Loading,AjaxPost,AppInfo){
        var uuid = AppInfo.getUUID();
        //点击返回
        $scope.back =function() {
            $ionicNavBarDelegate.back();
        };
        $scope.jwsdnsr = {};
        $scope.jwvo = taxFactory.zxnssb.jwvo;//境外
        $scope.jwvo.yzdm = parseInt($scope.jwvo.yzdm);
        $scope.jwsdnsr.mrJws = {'XZQHDS_DM':taxFactory.zxnssb.jwvo.lxdzsqdm};//默认市
        $scope.jws = taxFactory.zxnssb.dlwzsList;//市
        $scope.jwsdnsr.mrJwxq = {'XZQHXQ_DM':taxFactory.zxnssb.jwvo.lxdzxjdm};//默认县区
        $scope.jwxq = '';//县区
        $scope.jwsdnsr.mrJwjd = {'XZJD_DM':taxFactory.zxnssb.jwvo.lxdzxzdm};//默认街道
        $scope.jwjd = '';//街道
        $scope.jwlxdz = taxFactory.zxnssb.jwvo.lxdz;//联系地址
        $timeout(function(){
          $scope.getXQ(taxFactory.zxnssb.jwvo.lxdzsqdm);
          $scope.getJd(taxFactory.zxnssb.jwvo.lxdzxjdm);
        },300);
        $scope.changeS = function(){
          $scope.getXQ($scope.jwsdnsr.mrJws.XZQHDS_DM);
        };
        $scope.changeXq = function(){
          $scope.getJd($scope.jwsdnsr.mrJwxq.XZQHXQ_DM);
        };
        //得到县区的方法
        $scope.getXQ = function(dm){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {xzqhds_dm : dm};
          var reqDatas = {
            jsonData : angular.toJson({
              blhName : "Sbns003BLH",
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
              if(checkResponse(responseTex)){
                $scope.jwxq = responseTex.data.xqList;
              }else{
                Loading.commonAlert(responseTex.msg);
              }
            }, function(jqXHR, textStatus, errorThrown){
              Loading.loadingHide();
              Loading.commonAlert(textStatus);
            })
        };
        //得到街道的方法
        $scope.getJd = function(dm){
          Loading.loadingShow('<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>');
          var data = {xzqhxq_dm : dm};
          var reqDatas = {
            jsonData : angular.toJson({
              blhName : "Sbns003BLH",
              handleCode : "queryXZJD",
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
                $scope.jwjd = responseTex.data.xzjdList;
              }else{
                Loading.commonAlert(responseTex.msg);
              }
            }, function(jqXHR, textStatus, errorThrown){
              Loading.loadingHide();
              Loading.commonAlert(textStatus);
            })
        };
    })
    .controller('Zxns_6_1_3Ctrl',function($scope,$ionicNavBarDelegate,taxFactory){
        //点击返回
        $scope.back =function() {
            $ionicNavBarDelegate.back();
        };
        //tzzlx 投资者类型
        var tzzlx = taxFactory.zxnssb.tzzlxList;
        if(tzzlx){
          var obj = document.getElementById('tzzlx');
          var options = obj.options;
          for(var i=0 ;i<tzzlx.length;i++){
            for(var j=0;j<options.length;j++){
              if(tzzlx[i].tzzlxdm == options[j].value){
                options[j].selected = 'selected';
              }
            }
          }
        }
        $scope.tzznsr = {};
        $scope.tzvo = taxFactory.zxnssb.tzvo//投资
        $scope.tzvo.btzdwyzbm = parseInt($scope.tzvo.btzdwyzbm);
        $scope.tzvo.gstzje = parseFloat($scope.tzvo.gstzje);
        $scope.tzvo.grtzje = parseFloat($scope.tzvo.grtzje);
        $scope.tzznsr.mrZclx ={'DJZCLX_DM':taxFactory.zxnssb.tzvo.btzdwdjzclxdm};//默认登记注册类型
        $scope.zclx = taxFactory.zxnssb.zclxList;//zclxList登记注册类型
        $scope.tzznsr.mrJyhyxl = {'JYHYXL_DM':taxFactory.zxnssb.tzvo.btzdwhydm};//默认行业
        $scope.jyhyxl = taxFactory.zxnssb.jyhyxlList;//jyhyxlList行业
        $scope.sdszsfs = taxFactory.zxnssb.tzvo.btzdwsdszsfsdm;//所得税征收方式
        //数据格式化
        var sbns003_cal='';
        $scope.initCal = function(){
          sbns003_cal = new caltb("tzzList");
          initCalTable(sbns003_cal);
        };
        $scope.initCal();
    })
    .controller('Zxns_6_1_4Ctrl',function($scope,$ionicNavBarDelegate,taxFactory){
        //点击返回
        $scope.back =function() {
            $ionicNavBarDelegate.back();
        };
        $scope.wzsnsr = {};
        $scope.wzsvo = taxFactory.zxnssb.wzsvo;//无住所
        $scope.wzsvo.qydwyzbm = parseInt($scope.wzsvo.qydwyzbm);
        $scope.wzsvo.str_csrq = new Date($scope.wzsvo.str_csrq);//出生日期
        $scope.wzsvo.str_lhsj = new Date($scope.wzsvo.str_lhsj);//来华时间
        $scope.wzsvo.str_rzqx = new Date($scope.wzsvo.str_rzqx);//任职期限
        $scope.wzsvo.str_ljrq = new Date($scope.wzsvo.str_ljrq);//预计离境时间
        $scope.wzsnsr.mrGjdq = {'GJDQ_DM':taxFactory.zxnssb.wzsvo.gjdqdm};//默认国籍地区
        $scope.gjdq = taxFactory.zxnssb.gjdqList;//gjdqList国籍地区
        $scope.wzsnsr.mrJnzw = {'ZW_DM':taxFactory.zxnssb.wzsvo.jnzwdm};//wzsvo.jnzwdm   默认境内职务
        $scope.jnzw = taxFactory.zxnssb.zrrzwList;//境内职务
        $scope.wzsnsr.mrJwzw = {'ZW_DM':taxFactory.zxnssb.wzsvo.jwzwdm};//wzsvo.jwzwdm   默认境外职务
        $scope.jwzw = taxFactory.zxnssb.zrrzwList;//境外职务
        $scope.wzsnsr.mrGwzwgb = {'GJDQ_DM':taxFactory.zxnssb.wzsvo.jwzwgb};//默认境外支付国国别
    });
