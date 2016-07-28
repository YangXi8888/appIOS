/**
 * Created by Administrator on 2016/3/30.
 */
angular.module('bsdh002.controllers',[])
    .config(function($stateProvider) {
        $stateProvider
            //办税时间
            .state('tab.bsdh002', {
                url: '/bsdh002',
                views: {
                    'publicService': {
                        templateUrl: "templates/publicService/bsdh/002/bsdh002.html",
                        controller: 'BssjCtrl'
                    }
                }
            })
    })
    //办税时间
    .controller('BssjCtrl', function (AppInfo,AjaxPost,Loading,$ionicPopover,$rootScope,$scope,$ionicNavBarDelegate,$ionicScrollDelegate) {
        $rootScope.hideTabs='tabs-item-hide';
        var zczn002_areaInfo = $.evalJSON(localStorage.getItem(appStorageName.curArea));
        $ionicPopover.fromTemplateUrl("ez-popover.html", {
            scope: $scope
        })
            .then(function(popover){
                $scope.popover = popover;
            })
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.bssjmx = function(cityid){
            $ionicScrollDelegate.scrollTop();
            $("#bssj").empty();
            var data={
                id : cityid
            };
            var my = AppInfo.getUUID();
            var reqDatas = {
                jsonData : angular.toJson({
                    blhName : "Bsdh002BLH",
                    data : {
                        id : cityid
                    },
                    yhwybz : AppInfo.getUUID().toString(),
                    bizDataMw : formatStr(data.toString(),my),
                    handleCode : "queryContent"
                })
            };
            var cnt = '<div class="loader"><ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner><div align="center">加载中...</div></div>';
            Loading.loadingShow(cnt);
            AjaxPost.getData(reqDatas)
                .then(function(responseText, textStatus,
                               XMLHttpRequest) {
                    Loading.loadingHide();
                    var response = Decrypt(responseText.toString(),my);
//                    alert(response);
                    var responseTex = JSON.parse(AjaxPost.change(response.toString()));
                    if(checkResponse(responseTex)){
                       setIonicScrollDelegate($ionicScrollDelegate);
                        for (var i = 0; i < responseTex.data.List.length; i++) {
                            var obj = responseTex.data.List[i];
                            for (var key in obj) {
                                $("#bssj").append('<div class="item item-divider" style="color:#999999;"  align="left" >'+
                                    '<i class="ion-android-arrow-dropright"></i> <a >'+ key+'</a></div>'+
                                    '<div id="bssjdz_'+i+'"></div>');
                                for (var j = 0; j < obj[key].length; j++) {
                                    var content = JSON.stringify(obj[key][j].content);
                                    var arr = content.split("$");

                                    $("#bssjdz_"+ i ).append('<div class="item item-icon-right" ng-click="" onclick="bssjClick('+i+','+j+
                                        ');" id="bssjdz_'+i+'_'+j+'">'+
                                        '<i class="icon ion-android-arrow-dropright-circle"></i></div>'+
                                        '<div class="padding" style="display: none;" id="bssjmx_'+i+'_'+j+'"></div>');
                                    $("#bssjdz_"+ i+"_"+j ).append(arr[0].split("\"")[1]);
                                    $("#bssjmx_"+ i+"_"+j ).append("<span class='calm' style='font-weight:bold;'>办理业务范围:</span>"+
                                        arr[1]+"<br><span class='calm' style='font-weight:bold;'>地址/邮编:</span>"+
                                        arr[2]+"<br><span class='calm' style='font-weight:bold;'>办税时间:</span>"+
                                        arr[3]+"<br><span class='calm' style='font-weight:bold;'>办税电话(025):</span>"+
                                        arr[4].split("\"")[0]+"<br><br>");
                                }
                            }
                        }
                    }else{
                        Loading.commonAlert(responseTex.msg,null,null);
                        $scope.closeSJMXModal();
                    }
                }, function(jqXHR, textStatus, errorThrown) {
                    Loading.loadingHide();
                    Loading.commonAlert(textStatus);
                })
        };
        $scope.bssjmx(zczn002_areaInfo.DS_SWDM);
        $scope.back =function() {
            $ionicNavBarDelegate.back();
            $rootScope.hideTabs='';
        };
    })
var ionicScrollDelegate =  null;
function setIonicScrollDelegate($ionicScrollDelegate) {
    ionicScrollDelegate = $ionicScrollDelegate;
}

function bssjClick(i,j){
    if(document.getElementById("bssjmx_"+i+"_"+j).style.display==""){
        document.getElementById("bssjmx_"+i+"_"+j).style.display="none";
        document.getElementById("bssjdz_"+i+"_"+j).getElementsByTagName('i')[0].className="icon ion-android-arrow-dropright-circle";
    }else{
        document.getElementById("bssjmx_"+i+"_"+j).style.display="";
        document.getElementById("bssjdz_"+i+"_"+j).getElementsByTagName('i')[0].className="icon ion-android-arrow-dropdown-circle";
    }
    ionicScrollDelegate.resize();
};