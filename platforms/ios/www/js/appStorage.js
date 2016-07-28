function userInfo() {
    this.UUID = "";
    this.SJHM = "";
    this.SFZMLX_DM = "";
    this.SFZHM = "";
    this.XM = "";
    this.LOGPASS = "";
    this.LOGPASS_MD5 = "";
}

function qyxxVO() {
    this.UUID = "";
    this.SWGLM = "";
    this.NSRSBH = "";
    this.MC = "";
    this.EJYH_LOGINID = "";
    this.BD_RQ = "";
    this.DJLX_DM = "";
    this.SX_BJ = "";
    this.GLJG_DM = "";
    this.JCJG_DM = "";
    this.FWJG_DM = "";
    this.ZSJG_DM = "";
    this.JIANCJG_DM = "";
    this.SKSSJG_DM = "";
}

function areaInfo(){
    this.DS_CSDM = "";
    this.DS_SWDM = "";
    this.DS_MC = "";
}

var appStorageName = {
    localAppQyList : "localAppQyList", //缓存绑定的企业信息
    curSkin : "curSkin", //默认皮肤
    user : "user", //当前用户信息
    lastLoginDate : "lastLoginDate",//最后一次登陆日期
    curArea : "curArea",
    mrQyxx  : 'mrQyxx'
};

/**
 *获取当前用户
 */
function findUserByLocal() {
    if (null != localStorage.getItem(appStorageName.user)) {
        return $.evalJSON(localStorage.getItem(appStorageName.user));
    }
    return null;
}

/**
 *获取所有绑定的企业信息
 */
function findAllQyByLocal() {
    if (null != localStorage.getItem(appStorageName.localAppQyList)) {
        var arr = $.evalJSON(localStorage.getItem(appStorageName.localAppQyList));
        return arr;
    }
    return null;
}

/**
 * 根据税务管理查找企业信息
 * @param {Object} swglm 税务管理码
 * return{Object} qyxxVO 企业信息
 */
function findQyBySwglm(swglm) {
    if (null != localStorage.getItem(appStorageName.localAppQyList)) {
        var arr = $.evalJSON(localStorage.getItem(appStorageName.localAppQyList));
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].SWGLM == swglm) {
                return arr[i];
            }
        }
    }
    return null;
}

/**
 *获取首选企业信息
 */
function findSxQyByLocal() {
    if (null != localStorage.getItem(appStorageName.localAppQyList)) {
        var index=-1;
        var arr = $.evalJSON(localStorage.getItem(appStorageName.localAppQyList));
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].SX_BJ == "1") {
                index = i;
                return arr[i];
            }
        }
        if(index==-1){
            return arr[0];
        }else{
            return arr[index];
        }
    }
    return null;
}

var DSINFO_LIST =
    [{
        "DS_CSDM" : "NJ",
        "DS_SWDM" : "23201",
        "DS_MC" : "南京"
    },{
        "DS_CSDM" : "WX",
        "DS_SWDM" : "23202",
        "DS_MC" : "无锡"
    },{
        "DS_CSDM" : "XZ",
        "DS_SWDM" : "23203",
        "DS_MC" : "徐州"
    },{
        "DS_CSDM" : "CZ",
        "DS_SWDM" : "23204",
        "DS_MC" : "常州"
    },{
        "DS_CSDM" : "SZ",
        "DS_SWDM" : "23205",
        "DS_MC" : "苏州"
    },{
        "DS_CSDM" : "NT",
        "DS_SWDM" : "23206",
        "DS_MC" : "南通"
    },{
        "DS_CSDM" : "LYG",
        "DS_SWDM" : "23207",
        "DS_MC" : "连云港"
    },{
        "DS_CSDM" : "HA",
        "DS_SWDM" : "23208",
        "DS_MC" : "淮安"
    },{
        "DS_CSDM" : "YC",
        "DS_SWDM" : "23209",
        "DS_MC" : "盐城"
    },{
        "DS_CSDM" : "YZ",
        "DS_SWDM" : "23210",
        "DS_MC" : "扬州"
    },{
        "DS_CSDM" : "ZJ",
        "DS_SWDM" : "23211",
        "DS_MC" : "镇江"
    },{
        "DS_CSDM" : "TZ",
        "DS_SWDM" : "23212",
        "DS_MC" : "泰州"
    },{
        "DS_CSDM" : "SQ",
        "DS_SWDM": "23213",
        "DS_MC" : "宿迁"
    },{
        "DS_CSDM": "SZYQ",
        "DS_SWDM" : "23217",
        "DS_MC" : "苏州工业园区"
    },{
        "DS_CSDM": "ZJGBSQ",
        "DS_SWDM" : "23216",
        "DS_MC" : "张家港保税区"
    },{
        "DS_CSDM" : "SZSJ",
        "DS_SWDM" : "23298",
        "DS_MC" : "省直属局"
    }];

function checkConnection() {
    if (navigator.connection.type == Connection.NONE) {
        return false;
    }
    return true;
}

function checkResponse(responseText) {
    try {
        if ("0" == responseText.code) {
            return true;
        }
    } catch(e) {
        return false;
    }
    return false;
}

function NullTOEmpty(str) {
    if (str == null) {
        return "";
    } else {
        return str;
    }
}

function afuiConfig() {
    $.afui.useOSThemes = false;
    $.afui.loadDefaultHash = true;
    $.afui.autoLaunch = false;
    $.afui.animateHeader(true);
    loadCurSkin();
    $.afui.launch();
}



/**
 *判断是否已经登录
 * return: true  已经登录
 *             false 未登录
 */
function checkLogin() {
    var userInfo = findUserByLocal();
    if (userInfo == null) {
        return false;
    }
    return true;
}

/**
 *判断是否已经绑定企业信息
 * return: true  已经绑定
 *             false 未绑定
 */
function checkBdxx() {
    var qyxx = findAllQyByLocal();
    if (qyxx == null) {
        return false;
    } else if(qyxx == ''){
        return false;
    }
    return true;
}

/**
 *切换企业
 * fn:表示点击后调用的方法名，传入参数为税务管理码
 */
function exchangeCompany(fn) {
    var arr = findAllQyByLocal();
    var as = "";
    for (var i = 0; i < arr.length; i++) {
        as += "<a style='font-size:12px' onclick=" + fn + "('" + arr[i].SWGLM + "')>" + converLongName(arr[i].MC) + "</a>";
    }
    $.afui.actionsheet(as);
}

/**
 * 办税服务初始化
 * 主要包括：1、页面初始化<br/>
 * <p>2、根据标记判断是否有绑定的企业或是否已经登录，如果没有返回主页</p>
 * flag 0表示判断是否有绑定企业 1表示是否已经登录
 */
function taxServiceInit(flag, url) {
    baseInit(url);
    if (flag == "0") {
        //判断是否有绑定的企业，如果没有返回主页
        if (checkBdxx() == false) {
            afui_alert("此功能需要绑定企业信息!", function() {
                backMain(url);
            });
        }
    } else {
        //判断是否已经登录，如果没有返回主页
        if (checkLogin() == false) {
            afui_alert("此功能需要登录!", function() {
                backMain(url);
            });
        }
    }
}

/**
 *  名称过长显示......
 */
function converLongName(str) {
    if (str.length > 12) {
        return str.substr(0, 12) + "..";
    } else {
        return str;
    }
}

/**
 * 上传图片时 ：
 *自然人： AES加密 + 去掉base64前缀
 * */
function formatBase64Str(str) {
    str=str.replace(/data:image\/jpeg;base64,/ig,"");
    var key = CryptoJS.enc.Utf8.parse("0102030405060708");
    var iv  = CryptoJS.enc.Utf8.parse('0102030405060708');
    var srcs = CryptoJS.enc.Utf8.parse(str);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
    return encrypted.toString();
}
//去掉base64前缀
function cutBase64Str(str) {
  return str.replace(/data:image\/jpeg;base64,/ig,"");
}

/**
 *提交data请求加密
 * */
function formatStr(str,my) {
    var key = CryptoJS.enc.Utf8.parse(my.toString());
    var iv  = CryptoJS.enc.Utf8.parse(my.toString());
    var srcs = CryptoJS.enc.Utf8.parse(str);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
    return encrypted.toString();
//    var decrypted = CryptoJS.AES.decrypt(str, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Iso10126});
//    return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 *返回data解密方法
 * */
function Decrypt(srcs,my){
    var key = CryptoJS.enc.Utf8.parse(my.toString());
    var iv  = CryptoJS.enc.Utf8.parse(my.toString());
    var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
     return decodeURI(CryptoJS.enc.Utf8.stringify(decrypt).toString());
//    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
//    var encrypted = CryptoJS.AES.encrypt(srcs, key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Iso10126});
//    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}



