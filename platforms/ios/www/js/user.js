function AppUser(responseText) {
    this.qyList = [];
    this.user = new userInfo();
    this.user.UUID = responseText.data.UUID;
    this.user.SFZMLX_DM = responseText.data.SFZMLX_DM;
    this.user.SFZHM = responseText.data.SFZHM;
    this.user.XM = responseText.data.XM;
    this.user.SJHM = responseText.data.SJHM;
    this.user.LOGPASS = responseText.data.LOGPASS;
    this.user.LOGPASS_MD5 = responseText.data.LOGPASS_MD5;
    this.lastLoginDate = responseText.data.lastLoginDate;
    var qyxx;
    for (var i = 0; i < responseText.data.qyList.length; i++) {
        qyxx = new qyxxVO();
        qyxx.UUID = responseText.data.qyList[i].UUID;
        qyxx.SWGLM = responseText.data.qyList[i].SWGLM;
        qyxx.NSRSBH = responseText.data.qyList[i].NSRSBH;
        qyxx.MC = responseText.data.qyList[i].MC;
        qyxx.EJYH_LOGINID = responseText.data.qyList[i].EJYH_LOGINID;
        qyxx.BD_RQ = responseText.data.qyList[i].BD_RQ;
        qyxx.DJLX_DM = responseText.data.qyList[i].DJLX_DM;
        qyxx.SX_BJ = responseText.data.qyList[i].SX_BJ;
        qyxx.GLJG_DM = responseText.data.qyList[i].GLJG_DM;
        qyxx.JCJG_DM = responseText.data.qyList[i].JCJG_DM;
        qyxx.FWJG_DM = responseText.data.qyList[i].FWJG_DM;
        qyxx.ZSJG_DM = responseText.data.qyList[i].ZSJG_DM;
        qyxx.JIANCJG_DM = responseText.data.qyList[i].JIANCJG_DM;
        qyxx.SKSSJG_DM = responseText.data.qyList[i].SKSSJG_DM;
        this.qyList.push(qyxx);
    }
}

AppUser.prototype.addLocalUser = function() {
    localStorage.setItem(appStorageName.localAppQyList, $.toJSON(this.qyList));
    localStorage.setItem(appStorageName.user, $.toJSON(this.user));
    localStorage.setItem(appStorageName.lastLoginDate, this.lastLoginDate);
};

AppUser.prototype.getSxQy = function() {
    for (var i = 0; i < this.qyList.length; i++) {
        if (this.qyList[i].SX_BJ == "1") {
            return this.qyList[i];
        }
    }
    return null;
};

