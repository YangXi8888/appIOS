/**
 * Created by Administrator on 2016/3/23.
 */
angular.module('bsdh005.controllers',[])

    .config(function($stateProvider){
        $stateProvider
            //税款计算
            .state('tab.bsdh005', {
                url: '/bsdh005',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/005/bsdh005.html",
                        controller: 'SkjsCtrl'
                    }
                }
            })
    })
    //税款计算
    .controller('SkjsCtrl', function($scope,$rootScope,$stateParams,$ionicModal,$ionicPopup,$ionicNavBarDelegate,$rootScope) {
        $rootScope.hideTabs='tabs-item-hide';
        $scope.showAlert = function(tsxx) {
            $ionicPopup.alert({
                title: "提示",
                template: tsxx
            })
                .then(function(res) {
                    $scope.status = "";
                });
        };

        $ionicModal.fromTemplateUrl("gzxj.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openGZXJModal = function() {
            $scope.modal1.show();
        };
        $scope.closeGZXJModal = function() {
            $scope.modal1.hide();
        };

        $ionicModal.fromTemplateUrl("lwbc.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
        $scope.openLWBCModal = function() {
            $scope.modal2.show();
        };
        $scope.closeLWBCModal = function() {
            $scope.modal2.hide();
        };

        $ionicModal.fromTemplateUrl("znj.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal3 = modal;
        });
        $scope.openZNJModal = function() {
            $scope.modal3.show();
        };
        $scope.closeZNJModal = function() {
            $scope.modal3.hide();
        };

        $ionicModal.fromTemplateUrl("yys.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal4 = modal;
        });
        $scope.openYYSModal = function() {
            $scope.modal4.show();
        };
        $scope.closeYYSModal = function() {
            $scope.modal4.hide();
        };

        $ionicModal.fromTemplateUrl("yhs.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal5 = modal;
        });
        $scope.openYHSModal = function() {
            $scope.modal5.show();
        };
        $scope.closeYHSModal = function() {
            $scope.modal5.hide();
        };

        $scope.skjs1={
            fykcbz:3500,
            sqxzze:'',
            ynsdse:'',
            shgzze:''
        };
        $scope.gzxjCount=function() {
            // console.log($scope.skjs1.sqxzze);
            if (!$scope.skjs1.sqxzze) {
                $scope.showAlert("请您输入税前薪资！");
                return;
            }
            $scope.jsxz = $scope.skjs1.sqxzze-$scope.skjs1.fykcbz;
            if($scope.jsxz<0){
                $scope.jsxz=0;
            }
            $scope.skjs1.ynsdse = Math.round($scope.gettax($scope.jsxz)*100)/100;
            $scope.skjs1.shgzze = $scope.skjs1.sqxzze - $scope.skjs1.ynsdse;

        }
//工资，薪金所得税计算
        $scope.gettax=function ( pretax ){
            $scope.taxrate;
            $scope.deduct;
            if(pretax<=1500){
                $scope.taxrate=0.03;
                $scope.deduct=0;}
            if (pretax>1500 && pretax<=4500){
                $scope.taxrate=0.1;
                $scope.deduct=105;}
            if (pretax>4500 && pretax<=9000){
                $scope.taxrate=0.2;
                $scope.deduct=555;}
            if (pretax>9000 && pretax<=35000){
                $scope.taxrate=0.25;
                $scope.deduct=1005;}
            if (pretax>35000 && pretax<=55000){
                $scope.taxrate=0.3;
                $scope.deduct=2755;}
            if (pretax>55000 && pretax<=80000){
                $scope.taxrate=0.35;
                $scope.deduct=5505;}
            if (pretax>80000){
                $scope.taxrate=0.45;
                $scope.deduct=13505;}
            return (pretax*$scope.taxrate-$scope.deduct);
        }

        $scope.skjs2={
            sqlwbc1:'',
            shlwbc1:'',
            ynsdse1:'',
            sqlwbc2:'',
            shlwbc2:'',
            ynsdse2:''
        };
        $scope.lwbcCount1=function(){
            if (!$scope.skjs2.sqlwbc1) {
                $scope.showAlert("请您输入税前劳务报酬！");
                return;
            }
            $scope.shxc = $scope.skjs2.sqlwbc1;
            if ( $scope.shxc<4000){
                $scope.shxc = $scope.shxc - 800
            }else{
                $scope.shxc = $scope.shxc * 0.8
            }

            if($scope.shxc<0){$scope.shxc=0}
            $scope.skjs2.ynsdse1= Math.round($scope.getrewardtax($scope.shxc)*100)/100;
            $scope.skjs2.shlwbc1=$scope.skjs2.sqlwbc1-$scope.skjs2.ynsdse1;
        }
//税前劳务报酬计算税后
        $scope.getrewardtax=function(prereward){
            $scope.taxrate;
            $scope.deduct;
            if(prereward<20000){
                $scope.taxrate=0.2;
                $scope.deduct=0;}
            if (prereward>=20000 && prereward<50000){
                $scope.taxrate=0.3;
                $scope.deduct=2000;}
            if (prereward>=50000){
                $scope.taxrate=0.4;
                $scope.deduct=7000;}
            return (prereward*$scope.taxrate-$scope.deduct);
        }
        $scope.lwbcCount2=function(){
            if (!$scope.skjs2.shlwbc2) {
                $scope.showAlert("请您输入税后劳务报酬！");
                return;
            }
            $scope.sqxc = Math.abs($scope.gotrewardtax($scope.skjs2.shlwbc2));
            if($scope.sqxc<0){$scope.sqxc=0}
            console.log($scope.sqxc);
            $scope.skjs2.ynsdse2= Math.round($scope.getrewardtax($scope.sqxc)*100)/100;
            $scope.skjs2.sqlwbc2=$scope.skjs2.shlwbc2+$scope.skjs2.ynsdse2;
        }
        //税后劳务报酬计算税前
        $scope.gotrewardtax=function(afterreward){
            $scope.taxrate;
            $scope.deduct;
            if (afterreward<21000){
                $scope.taxrate=0.2;
                $scope.deduct=0;}
            if (afterreward>=21000 && afterreward<49500){
                $scope.taxrate=0.3;
                $scope.deduct=2000;}
            if(afterreward>=49500){
                $scope.taxrate=0.4;
                $scope.deduct=7000;}
            if(afterreward<3360){
                return (afterreward-800)/(1-$scope.taxrate);
            }else{
                return (afterreward-$scope.deduct)*(1-0.2)/(1-$scope.taxrate*(1-0.2));
            }
        }

        $scope.skjs3={
            znskje:'',
            znjQsrq:'',
            znjJzrq:'',
            znts:'',
            yjzznj:''
        };
        $scope.znjCount=function(){
            if (!$scope.skjs3.znskje) {
                $scope.showAlert("请您输入滞纳的税款金额！");
                return;
            }
            if (!$scope.skjs3.znjQsrq) {
                $scope.showAlert("请您输入滞纳金计算的起始日期！");
                return;
            }
            if (!$scope.skjs3.znjJzrq) {
                $scope.showAlert("请您输入滞纳金计算的截止日期！");
                return;
            }
            if ($scope.skjs3.znjJzrq<$scope.skjs3.znjQsrq) {
                $scope.showAlert("起始日期应早于截止日期！");
                return;
            }
            console.log($scope.skjs3.znjQsrq);

            var days = ($scope.skjs3.znjJzrq-$scope.skjs3.znjQsrq)/(24*60*60*1000);
            $scope.skjs3.yjzznj=Math.round($scope.accountznjtax($scope.skjs3.znjQsrq,$scope.skjs3.znjJzrq,$scope.skjs3.znskje)*100)/100;
            $scope.skjs3.znts=days;
        }
//滞纳金计算
        $scope.accountznjtax=function(date1,date2,znskjec){
            Endday = new Date(date2);
            StartDay = new Date(date1);
            timeold = (Endday.getTime() - StartDay.getTime());
            sectimeold = timeold/1000 ;
            secondsold = Math.floor(sectimeold);
            msPerDay = 24 * 60 * 60 * 1000  ;
            timeold = (Endday.getTime() - StartDay.getTime());
            e_daysold = timeold / msPerDay;
            daysold = Math.floor(e_daysold);
            var sum;
            var znskjec = znskjec;
            if (daysold >= 0){
                if (StartDay < 20010501 && Endday < 20010501)
                {
                    sum = znskjec*0.002*daysold;
                }
                else if (StartDay >= 20010501 && Endday >= 20010501)
                {
                    sum = znskjec*0.0005*daysold;
                }
                else if (StartDay < 20010501 && Endday >= 20010501)
                {
                    MidDay = new Date("2001-5-1");
                    timeold = (MidDay.getTime() - StartDay.getTime());
                    e_daysold = timeold / msPerDay;
                    secondsold = Math.floor(e_daysold);
                    zsbTime1 = znskjec*0.002*secondsold;

                    timeold = (Endday.getTime() - MidDay.getTime());
                    e_daysold = timeold / msPerDay;
                    secondsold = Math.floor(e_daysold);
                    zsbTime2 = znskjec*0.0005*secondsold;

                    sum = zsbTime1 + zsbTime2;
                }
            }
            else{
                $scope.showAlert("数据有误，请核实！");
            }
            return (sum);

        }


        $scope.skjs4={
            fdyye:'',
            ynyyse:'',
            yyssm:'01',
            yyssl:'0.03',
            yyszsfwxm:"陆路运输、水路运输、航空运输、管道运输、装卸搬运"
        };
        $scope.changeyysm=function(){
            switch ($scope.skjs4.yyssm) {
                case "01":
                    $scope.skjs4.yyszsfwxm="陆路运输、水路运输、航空运输、管道运输、装卸搬运";
                    $scope.skjs4.yyssl=0.03;
                    break;
                case "02":
                    $scope.skjs4.yyszsfwxm="建筑、安装、修缮、装饰及其他工程作业";
                    $scope.skjs4.yyssl=0.03;
                    break;
                case "03":
                    $scope.skjs4.yyszsfwxm="金融业包括融资租赁、金融商品转让、贷款、金融经纪业、其他金融业务；（农村信用社除外）保险业";
                    $scope.skjs4.yyssl=0.05;
                    break;
                case "04":
                    $scope.skjs4.yyszsfwxm="农村信用社";
                    $scope.skjs4.yyssl=0.03;
                    break;
                case "05":
                    $scope.skjs4.yyszsfwxm="邮政、电信";
                    $scope.skjs4.yyssl=0.03;
                    break;
                case "06":
                    $scope.skjs4.yyszsfwxm="文化业：表演、播映、其他文化业；体育业";
                    $scope.skjs4.yyssl=0.03;
                    break;
                case "07":
                    $scope.skjs4.yyszsfwxm="歌厅、舞厅、卡拉OK歌舞厅（包括夜总会、练歌房、恋歌房）、音乐茶座（包括酒吧）、高尔夫球、游艺（如射击、狩猎、跑马、游戏机、蹦极、卡丁车、热气球、动力伞、射箭、飞镖等）";
                    $scope.skjs4.yyssl=0.2;
                    break;
                case "08":
                    $scope.skjs4.yyszsfwxm="台球、保龄球";
                    $scope.skjs4.yyssl=0.05;
                    break;
                case "09":
                    $scope.skjs4.yyszsfwxm="代理业、旅店业、饮食业、旅游业、仓储业、租赁业、广告业、其他服务业 ";
                    $scope.skjs4.yyssl=0.05;
                    break;
                case "10":
                    $scope.skjs4.yyszsfwxm="转让土地使用权、转让商标权、转让专利权、转让非专利权、转让著作权、转让商誉 ";
                    $scope.skjs4.yyssl=0.05;
                    break;
                case "11":
                    $scope.skjs4.yyszsfwxm="销售建筑物或构筑物、销售其他土地附着物 ";
                    $scope.skjs4.yyssl=0.05;
                    break;
                default :
                    $scope.showAlert("未找到税额信息！");
            }
        }
        $scope.yysCount=function(){
            if (!$scope.skjs4.fdyye) {
                $scope.showAlert("请您输入法定营业额！");
                return;
            }
            $scope.skjs4.ynyyse=Math.round($scope.skjs4.fdyye*$scope.skjs4.yyssl*100)/100;
        }

        $scope.skjs5={
            jehjs:'',
            ynyhse:'',
            yhssm:'01',
            yhssl:'0.0003',
            yhszsfwxm:'供应、预购、采购、购销结合及协作、调剂、补偿、易货等合同'
        };
        $scope.changeyhsm=function(){
            switch ($scope.skjs5.yhssm) {
                case "01":
                    $scope.skjs5.yhszsfwxm="供应、预购、采购、购销结合及协作、调剂、补偿、易货等合同";
                    $scope.skjs5.yhssl=0.0003;
                    break;
                case "02":
                    $scope.skjs5.yhszsfwxm="加工、定做、修理、修缮、印刷、广告、测绘、测试等合同";
                    $scope.skjs5.yhssl=0.0005;
                    break;
                case "03":
                    $scope.skjs5.yhszsfwxm="勘察设计合同";
                    $scope.skjs5.yhssl=0.0005;
                    break;
                case "04":
                    $scope.skjs5.yhszsfwxm="建筑安装工程承包合同";
                    $scope.skjs5.yhssl=0.0003;
                    break;
                case "05":
                    $scope.skjs5.yhszsfwxm="租赁房屋、船舶、飞机、机动车辆、机械、器具、设备等合同";
                    $scope.skjs5.yhssl=0.001;
                    break;
                case "06":
                    $scope.skjs5.yhszsfwxm="民用航空、铁路运输、海上运输、内河运输、公路运输和联运合同";
                    $scope.skjs5.yhssl=0.0005;
                    break;
                case "07":
                    $scope.skjs5.yhszsfwxm="仓储、保管合同";
                    $scope.skjs5.yhssl=0.001;
                    break;
                case "08":
                    $scope.skjs5.yhszsfwxm="银行及其它金融组织和借款人（不包括银行同业拆借）所签订的借款合同";
                    $scope.skjs5.yhssl=0.00005;
                    break;
                case "09":
                    $scope.skjs5.yhszsfwxm="财产、责任、保证、信用、等保险合同";
                    $scope.skjs5.yhssl=0.001;
                    break;
                case "10":
                    $scope.skjs5.yhszsfwxm="技术开发、转让、咨询、服务等合同  ";
                    $scope.skjs5.yhssl=0.0003;
                    break;
                case "11":
                    $scope.skjs5.yhszsfwxm="财产所有权和版权、商标专用权、专用权、专有技术使用权等转移书据 ";
                    $scope.skjs5.yhssl=0.0005;
                    break;
                case "12":
                    $scope.skjs5.yhszsfwxm="生产经营用账簿：资金";
                    $scope.skjs5.yhssl=0.0005;
                    break;
                case "13":
                    $scope.skjs5.yhszsfwxm="生产经营用账簿：非资金 ";
                    $scope.skjs5.yhssl=5;
                    break;
                case "14":
                    $scope.skjs5.yhszsfwxm="政府部门发给的房屋产权证、工商营业执照、商标注册证、专利证、土地使用证 ";
                    $scope.skjs5.yhssl=5;
                    break;
                default :
                    $scope.showAlert("未找到税额信息！");
            }
        }
        $scope.yhsCount=function(){
            if (!$scope.skjs5.jehjs) {
                $scope.showAlert("请您输入金额或件数！");
                return;
            }
            if($scope.skjs5.yhssl == 5){
                if(!(parseInt($scope.skjs5.jehjs) == $scope.skjs5.jehjs)){
                    $scope.showAlert("请确定您输入的件数是整数！");
                    return;
                }
            }
            $scope.skjs5.ynyhse=Math.round($scope.skjs5.jehjs*$scope.skjs5.yhssl*100)/100;
        }
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
        };
    })