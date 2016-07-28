/*******************************************************************************
 * @author杨希
 * @version 1.0
 ******************************************************************************/

/*
 * 校验中文
 */
function f_check_chinese(obj) {
    if (/^[\u0391-\uFFE5]+$/.test(validatorTrim(obj.value))) {
        return true;
    }
    return false;
}

/*
 * 校验英文
 */
function f_check_english(obj) {
    if (/^[A-Za-z]+$/.test(validatorTrim(obj.value))) {
        return true;
    }
    return false;
}

/*
 * 判断是否为数字，是则返回true,否则返回false
 */
function f_check_number(obj) {
    if ( typeof (obj) == "object") {
        if (/^\d+$/.test(validatorTrim(obj.value))) {
            return true;
        }
    } else {
        if (/^\d+$/.test(validatorTrim(obj))) {
            return true;
        }
    }
    return false;
}

/*
 * 判断是否为数字，不能以0开头
 */
function f_check_numberze(obj) {
    if ( typeof (obj) == "object") {
        if (validatorTrim(obj.value).length > 1) {
            if (validatorTrim(obj.value).substr(0, 1) == '0') {
                return false;
            }
        }
        if (/^\d+$/.test(validatorTrim(obj.value))) {
            return true;
        }
    } else {
        if (validatorTrim(obj).length > 1) {
            if (validatorTrim(obj).substr(0, 1) == '0') {
                return false;
            }
        }
        if (/^\d+$/.test(validatorTrim(obj))) {
            return true;
        }
    }
    return false;
}

/*******************************************************************************
 * 要求：一、移动电话号码为11或12位，如果为12位,那么第一位为0 二、11位移动电话号码的第一位和第二位为"13"或"15"或"18"
 * 三、12位移动电话号码的第二位和第三位为"13"或"15"或"18" 用途：检查输入手机号码是否正确 返回： 如果通过验证返回true,否则返回false
 */
function f_check_mobile(obj) {
    var re13 = new RegExp(/(^[1][3][0-9]{9}$)|(^0[1][3][0-9]{9}$)/);
    var re14 = new RegExp(/(^[1][4][0-9]{9}$)|(^0[1][4][0-9]{9}$)/);
    var re15 = new RegExp(/(^[1][5][0-9]{9}$)|(^0[1][5][0-9]{9}$)/);
    var re17 = new RegExp(/(^[1][7][0-9]{9}$)|(^0[1][7][0-9]{9}$)/);
    var re18 = new RegExp(/(^[1][8][0-9]{9}$)|(^0[1][8][0-9]{9}$)/);
    if (re13.test(validatorTrim(obj.value))) {
        return true;
    } else if (re14.test(validatorTrim(obj.value))) {
        return true;
    } else if (re15.test(validatorTrim(obj.value))) {
        return true;
    } else if (re17.test(validatorTrim(obj.value))) {
        return true;
    } else if (re18.test(validatorTrim(obj.value))) {
        return true;
    }
    return false;
}

/*******************************************************************************
 * 要求：一、电话号码由数字、"("、")"和"-"构成 二、电话号码为3到8位 三、如果电话号码中包含有区号，那么区号为三位或四位
 * 四、区号用"("、")"或"-"和其他部分隔开 用途：检查输入的电话号码格式是否正确 返回： 如果通过验证返回true,否则返回false
 */
function f_check_phone(obj) {
    var regu = /(^([0][1-9]{2,3}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0][1-9]{2,3}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/;
    var re = new RegExp(regu);
    if (re.test(validatorTrim(obj.value)) && parseInt(obj.value.length) >= 8) {
        return true;
    }
    return false;
}

/*******************************************************************************
 * 要求：一、电话号码由数字、"("、")"和"-"构成 二、电话号码为12到13位 三、电话号码中必须包含有区号，区号为三位或四位
 * 四、区号用"("、")"或"-"和其他部分隔开 用途：检查输入的电话号码格式是否正确 返回： 如果通过验证返回true,否则返回false
 */
function f_check_phone_mustqh(obj) {
    var regu = /(^([0][1-9]{2,3}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0][1-9]{2,3}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/;
    var re = new RegExp(regu);
    if (re.test(validatorTrim(obj.value)) && parseInt(obj.value.length) > 11) {
        return true;
    }
    return false;
}

/*******************************************************************************
 * 校验联系电话
 ******************************************************************************/
function f_check_mobileorphone(obj) {
    if (!f_check_mobile(obj) && !f_check_phone(obj)) {
        return false;
    }
    return true;
}

/*
 * 用途：校验ip地址的格式 输入：strIP：ip地址 返回：如果通过验证返回true,否则返回false；
 */
function f_check_IP(obj) {
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    // 匹配IP地址的正则表达式
    if (re.test(validatorTrim(obj.value))) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
            return true;
        }
    }
    return false;
}

/*
 * 用途：检查输入对象的值是否符合端口号格式 输入：str 输入的字符串 返回：如果通过验证返回true,否则返回false
 */
function f_check_port(obj) {
    if (!f_check_number(obj)) {
        return false;
    }
    if (obj.value < 65536) {
        return true;
    }
    return false;
}

/*
 * 功能：判断是否为日期(格式:yyyy年MM月dd日,yyyy-MM-dd,yyyy/MM/dd,yyyyMMdd)
 * 使用：f_check_date(obj) 返回：bool
 */
function f_check_date(obj) {
    var date = validatorTrim(obj.value);
    var format = obj.getAttribute("format");
    // 日期格式
    var year, month, day, datePat, matchArray;
    if (format == "yyyy-MM-dd" || format == "yyyy/MM/dd") {
        datePat = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    } else if (format == "yyyy年MM月dd日") {
        datePat = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;
    } else if (format == "yyyyMMdd") {
        datePat = /^(\d{4})(\d{2})(\d{2})$/;
    }
    if (format == "all") {
        matchArray = date.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (matchArray != null) {
            format = "yyyy-MM-dd"
        } else {
            matchArray = date.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);
            if (matchArray != null) {
                format = "yyyy年MM月dd日"
            } else {
                matchArray = date.match(/^(\d{4})(\d{2})(\d{2})$/);
                format = "yyyyMMdd";
            }
        }
        if (matchArray == null) {
            // 日期长度不对,或日期中有非数字符号
            return false;
        }
    } else {
        matchArray = date.match(datePat);
        if (matchArray == null) {
            // 日期长度不对,或日期中有非数字符号
            return false;
        }
    }
    if (/^(y{4})(-|\/)(M{1,2})\2(d{1,2})$/.test(format)) {
        year = matchArray[1];
        month = matchArray[3];
        day = matchArray[4];
    } else {
        year = matchArray[1];
        month = matchArray[2];
        day = matchArray[3];
    }
    if (month < 1 || month > 12) {
        // 月份应该为1到12的整数
        return false;
    }
    if (day < 1 || day > 31) {
        // 每个月的天数应该为1到31的整数
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        // 该月不存在31号
        return false;
    }
    if (month == 2) {
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29) {
            // 2月最多有29天
            return false;
        }
        if ((day == 29) && (!isleap)) {
            // 闰年2月才有29天
            return false;
        }
    }
    return true;
}

/*
 * 功能：校验的格式为yyyy年MM月dd日HH时mm分ss秒,yyyy-MM-dd HH:mm:ss,yyyy/MM/dd
 * HH:mm:ss,yyyyMMddHHmmss 使用：f_check_datetime(obj) 返回：bool
 */
function f_check_datetime(obj) {
    var datetime = validatorTrim(obj.value);
    var format = obj.getAttribute("format");
    var datePat, matchArray, year, month, day, hour, minute, second;
    if (format == "yyyy-MM-dd HH:mm:ss" || format == "yyyy/MM/dd HH:mm:ss") {
        datePat = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    } else if (format == "yyyy年MM月dd日HH时mm分ss秒") {
        datePat = /^(\d{4})年(\d{1,2})月(\d{1,2})日(\d{1,2})时(\d{1,2})分(\d{1,2})秒$/;
    } else if (format == "yyyyMMddHHmmss") {
        datePat = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
    }
    if (format == "all") {
        matchArray = datetime.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (matchArray != null) {
            format = "yyyy-MM-dd HH:mm:ss"
        } else {
            matchArray = datetime.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日(\d{1,2})时(\d{1,2})分(\d{1,2})秒$/);
            if (matchArray != null) {
                format = "yyyy年MM月dd日HH时mm分ss秒"
            } else {
                matchArray = datetime.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
                format = "yyyyMMddHHmmss";
            }
        }
        if (matchArray == null) {
            // 日期长度不对,或日期中有非数字符号
            return false;
        }
    } else {
        matchArray = datetime.match(datePat);
        if (matchArray == null) {
            return false;
        }
    }

    if (/^(y{4})(-|\/)(M{1,2})\2(d{1,2}) (HH:mm:ss)$/.test(format)) {
        year = matchArray[1];
        month = matchArray[3];
        day = matchArray[4];
        hour = matchArray[5];
        minute = matchArray[6];
        second = matchArray[7];
    } else {
        year = matchArray[1];
        month = matchArray[2];
        day = matchArray[3];
        hour = matchArray[4];
        minute = matchArray[5];
        second = matchArray[6];
    }
    if (month < 1 || month > 12) {
        // 月份应该为1到12的整数
        return false;
    }
    if (day < 1 || day > 31) {
        // 每个月的天数应该为1到31的整数
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        // 该月不存在31号
        return false;
    }
    if (month == 2) {
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29) {
            // 2月最多有29天
            return false;
        }
        if ((day == 29) && (!isleap)) {
            // 闰年2月才有29天
            return false;
        }
    }
    if (hour < 0 || hour > 23) {
        // 小时应该是0到23的整数
        return false;
    }
    if (minute < 0 || minute > 59) {
        // 分应该是0到59的整数
        return false;
    }
    if (second < 0 || second > 59) {
        // 秒应该是0到59的整数
        return false;
    }
    return true;
}

/**
 * 时间 提供两种格式 hh:mm hh:mm:ss
 */
function f_check_time(obj) {
    var format = obj.getAttribute("format");
    // 时间格式
    if (format == "hh:mm") {
        if (/^((\d|1\d|2[0-3]):([0-5]\d))?$/.test(validatorTrim(obj.value))) {
            return true;
        }
    } else if (format == "hh:mm:ss") {
        if (/^((\d|1\d|2[0-3]):([0-5]\d):([0-5]\d))?$/.test(validatorTrim(obj.value))) {
            return true;
        }
    } else {
        if (/^((\d|1\d|2[0-3]):([0-5]\d))?$/.test(validatorTrim(obj.value))) {
            return true;
        }
        if (/^((\d|1\d|2[0-3]):([0-5]\d):([0-5]\d))?$/.test(validatorTrim(obj.value))) {
            return true;
        }
    }
    return false;
}

/**
 * 网站地址校验
 */
function f_check_weburl(obj) {
    if (/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(validatorTrim(obj.value))) {
        return true;
    }
    return false;
}

/*
 * 用途：检查输入对象的值是否符合E-Mail格式
 */
function f_check_email(obj) {
    var myReg = /^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if (myReg.test(validatorTrim(obj.value))) {
        return true;
    }
    return false;
}

/*
 * 判断是否为实数，是则返回true,否则返回false
 */
function f_check_float(obj) {
    if ( typeof (obj) == "object") {
        if (/^(\+|-)?\d+($|\.\d+$)/.test(validatorTrim(obj.value)) && f_check_floatIn(validatorTrim(obj.value))) {
            return true;
        }
    } else {
        if (/^(\+|-)?\d+($|\.\d+$)/.test(validatorTrim(obj)) && f_check_floatIn(validatorTrim(obj))) {
            return true;
        }
    }
    return false;
}

function f_check_floatIn(str) {
    if (str.indexOf(".") < 0) {
        if (str.length > 0) {
            if (str.substr(0, 1) == "0") {
                return false;
            }
        }
    }
    return true;
}

/*
 * 判断是否为整数，是则返回true,否则返回false
 */
function f_check_integer(obj) {
    if ( typeof (obj) == "object") {
        if (/^(\+|-)?\d+$/.test(validatorTrim(obj.value))) {
            return true;
        }
    } else {
        if (/^(\+|-)?\d+$/.test(validatorTrim(obj))) {
            return true;
        }
    }
    return false;
}

/**
 * 校验浮点数,如果小数位不为空则必须符合规定的位数,默认2位
 */
function f_check_rolefloat(obj) {
    if (!f_check_float(obj)) {
        return false;
    } else {
        if (obj.value.indexOf(".") > 0) {
            var len = obj.getAttribute("format") || 2;
            var str = validatorTrim(obj.value);
            if (str.substr(str.indexOf(".") + 1, str.length).length > len) {
                return false;
            }
        }
    }
    return true;
}

/*******************************************************************************
 * 校验字符长度
 ******************************************************************************/
function f_check_strlen(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    if (!f_check_integer(to.split("-")[0])) {
        return false;
    }
    var operator = obj.getAttribute("operator");
    if (to.split("-").length == 1) {
        switch (operator) {
        case "notEqual" :
            return (obj.value.length != to);
        case "greaterThan" :
            return (obj.value.length > to);
        case "greaterThanEqual" :
            return (obj.value.length >= to);
        case "lessThan" :
            return (obj.value.length < to);
        case "lessThanEqual" :
            return (obj.value.length <= to);
        case "equal" :
            return (obj.value.length == to);
        default :
            return false;
        }
    } else {
        var f = parseInt(to.split("-")[0]);
        var e = parseInt(to.split("-")[1]);
        switch (operator) {
        case "include" :
            if (obj.value.length >= f && obj.value.length <= e) {
                return true;
            }
            break;
        case "includeF" :
            if (obj.value.length >= f && obj.value.length < e) {
                return true;
            }
            break;
        case "includeE" :
            if (obj.value.length > f && obj.value.length <= e) {
                return true;
            }
            break;
        case "barring" :
            if (obj.value.length > f && obj.value.length < e) {
                return true;
            }
            break;
        default :
            return false;
        }
    }
    return false;
}

/*******************************************************************************
 * 校验整数大小
 ******************************************************************************/
function f_check_intlen(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    if (!f_check_integer(to.split("-")[0]) || !f_check_integer(obj)) {
        return false;
    }
    var operator = obj.getAttribute("operator");
    var intValue = parseInt(validatorTrim(obj.value));
    if (to.split("-").length == 1) {
        switch (operator) {
        case "notEqual" :
            return (intValue != to);
        case "greaterThan" :
            return (intValue > to);
        case "greaterThanEqual" :
            return (intValue >= to);
        case "lessThan" :
            return (intValue < to);
        case "lessThanEqual" :
            return (intValue <= to);
        case "equal" :
            return (intValue == to);
        default :
            return false;
        }
    } else {
        var f = parseInt(to.split("-")[0]);
        var e = parseInt(to.split("-")[1]);
        switch (operator) {
        case "include" :
            if (intValue >= f && intValue <= e) {
                return true;
            }
            break;
        case "includeF" :
            if (intValue >= f && intValue < e) {
                return true;
            }
            break;
        case "includeE" :
            if (intValue > f && intValue <= e) {
                return true;
            }
            break;
        case "barring" :
            if (intValue > f && intValue < e) {
                return true;
            }
            break;
        default :
            return false;
        }
    }
    return false;
}

/*******************************************************************************
 * 整数对象比较
 ******************************************************************************/
function f_check_intobj(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    var operator = obj.getAttribute("operator");
    if (!f_check_integer(obj)) {
        return false;
    }
    // 如果要比较对象为NULL或者值为空则不再比较
    if ($(to) == null || validatorTrim($F(to)).empty()) {
        return true;
    }
    // 如果要比较对象不符合整数规则不再比较
    if (!f_check_integer($(to))) {
        return true;
    }
    var intValue = parseInt(validatorTrim(obj.value));
    var toObjValue = parseFloat(validatorTrim($F(to)));
    switch (operator) {
    case "notEqual" :
        return (intValue != toObjValue);
    case "greaterThan" :
        return (intValue > toObjValue);
    case "greaterThanEqual" :
        return (intValue >= toObjValue);
    case "lessThan" :
        return (intValue < toObjValue);
    case "lessThanEqual" :
        return (intValue <= toObjValue);
    case "equal" :
        return (intValue == toObjValue);
    default :
        return false;
    }
    return false;
}

/*******************************************************************************
 * 校验文件类型
 ******************************************************************************/
function f_check_filetype(obj) {
    var arr = obj.value.split("\\");
    if (arr[arr.length - 1].split(".").length > 2) {
        return false;
    }
    var arrType = arr[arr.length - 1].split(".")[1].toLowerCase();
    if (obj.filetype == null) {
        return false;
    }
    var temp = obj.filetype.split(",");
    var flag = false;
    for (var i = 0; i < temp.length; i++) {
        if (arrType == temp[i]) {
            flag = true;
            break;
        }
    }
    if (flag == false) {
        return false;
    }
    return true;
}

/*******************************************************************************
 * 单选框校验
 ******************************************************************************/
function f_check_radio(obj) {
    var radioArr = $ES(obj.name);
    var flag = false;
    for (var i = 0; i < radioArr.length; i++) {
        if (radioArr[i].checked == true) {
            flag = true;
        }
    }
    return flag;
}

/*******************************************************************************
 * 复选框校验
 ******************************************************************************/
function f_check_checkbox(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    var operator = obj.getAttribute("operator");
    var checkBoxArr = $ES(obj.name);
    var flag = 0;
    for (var i = 0; i < checkBoxArr.length; i++) {
        if (checkBoxArr[i].checked == true) {
            flag++;
        }
    }
    if (to.split("-").length == 1) {
        switch (operator) {
        case "notEqual" :
            return (flag != to);
        case "greaterThan" :
            return (flag > to);
        case "greaterThanEqual" :
            return (flag >= to);
        case "lessThan" :
            return (flag < to);
        case "lessThanEqual" :
            return (flag <= to);
        case "equal" :
            return (flag == to);
        default :
            return false;
        }
    } else {
        var f = parseInt(to.split("-")[0]);
        var e = parseInt(to.split("-")[1]);
        switch (operator) {
        case "include" :
            if (flag >= f && flag <= e) {
                return true;
            }
            break;
        case "includeF" :
            if (flag >= f && flag < e) {
                return true;
            }
            break;
        case "includeE" :
            if (flag > f && flag <= e) {
                return true;
            }
            break;
        case "barring" :
            if (flag > f && flag < e) {
                return true;
            }
            break;
        default :
            return false;
        }
    }
    return false;
}

/*******************************************************************************
 * 校验浮点数大小
 ******************************************************************************/
function f_check_doulen(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    var operator = obj.getAttribute("operator");

    if (!f_check_float(to.split("-")[0]) || !f_check_rolefloat(obj)) {
        return false;
    }

    var floatValue = parseFloat(validatorTrim(obj.value));
    if (to.split("-").length == 1) {
        switch (operator) {
        case "notEqual" :
            return (floatValue != to);
        case "greaterThan" :
            return (floatValue > to);
        case "greaterThanEqual" :
            return (floatValue >= to);
        case "lessThan" :
            return (floatValue < to);
        case "lessThanEqual" :
            return (floatValue <= to);
        case "equal" :
            return (floatValue == to);
        default :
            return false;
        }
    } else {
        var f = parseFloat(to.split("-")[0]);
        var e = parseFloat(to.split("-")[1]);
        switch (operator) {
        case "include" :
            if (floatValue >= f && floatValue <= e) {
                return true;
            }
            break;
        case "includeF" :
            if (floatValue >= f && floatValue < e) {
                return true;
            }
            break;
        case "includeE" :
            if (floatValue > f && floatValue <= e) {
                return true;
            }
            break;
        case "barring" :
            if (floatValue > f && floatValue < e) {
                return true;
            }
            break;
        default :
            return false;
        }
    }
    return false;
}

/*******************************************************************************
 * 浮点数对象比较
 ******************************************************************************/
function f_check_douobj(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    var operator = obj.getAttribute("operator");
    if (!f_check_rolefloat(obj)) {
        return false;
    }
    // 如果要比较对象为NULL或者值为空则不再比较
    if ($(to) == null || validatorTrim($F(to)).empty()) {
        return true;
    }
    // 如果要比较对象不符合自然数则不再比较
    if (!f_check_rolefloat($(to))) {
        return true;
    }
    var douValue = parseFloat(validatorTrim(obj.value));
    var toObjValue = parseFloat(validatorTrim($F(to)));
    switch (operator) {
    case "notEqual" :
        return (douValue != toObjValue);
    case "greaterThan" :
        return (douValue > toObjValue);
    case "greaterThanEqual" :
        return (douValue >= toObjValue);
    case "lessThan" :
        return (douValue < toObjValue);
    case "lessThanEqual" :
        return (douValue <= toObjValue);
    case "equal" :
        return (douValue == toObjValue);
    default :
        return false;
    }
    return false;
}

/*******************************************************************************
 * 校验自然数大小
 ******************************************************************************/
function f_check_numlen(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    var operator = obj.getAttribute("operator");
    if (!f_check_numberze(to.split("-")[0]) || !f_check_numberze(obj)) {
        return false;
    }
    var numValue = parseInt(validatorTrim(obj.value));
    if (to.split("-").length == 1) {
        switch (operator) {
        case "notEqual" :
            return (numValue != to);
        case "greaterThan" :
            return (numValue > to);
        case "greaterThanEqual" :
            return (numValue >= to);
        case "lessThan" :
            return (numValue < to);
        case "lessThanEqual" :
            return (numValue <= to);
        case "equal" :
            return (numValue == to);
        default :
            return false;
        }
    } else {
        var f = parseInt(to.split("-")[0]);
        var e = parseInt(to.split("-")[1]);
        switch (operator) {
        case "include" :
            if (numValue >= f && numValue <= e) {
                return true;
            }
            break;
        case "includeF" :
            if (numValue >= f && numValue < e) {
                return true;
            }
            break;
        case "includeE" :
            if (numValue > f && numValue <= e) {
                return true;
            }
            break;
        case "barring" :
            if (numValue > f && numValue < e) {
                return true;
            }
            break;
        default :
            return false;
        }
    }
    return false;
}

/*******************************************************************************
 * 自然数对象比较
 ******************************************************************************/
function f_check_numobj(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    var operator = obj.getAttribute("operator");
    if (!f_check_numberze(obj)) {
        return false;
    }
    // 如果要比较对象为NULL或者值为空则不再比较
    if ($(to) == null || validatorTrim($F(to)).empty()) {
        return true;
    }
    // 如果要比较对象不符合自然数则不再比较
    if (!f_check_numberze($(to))) {
        return true;
    }
    var numValue = parseInt(validatorTrim(obj.value));
    var toObjValue = parseInt(validatorTrim($F(to)));
    switch (operator) {
    case "notEqual" :
        return (numValue != toObjValue);
    case "greaterThan" :
        return (numValue > toObjValue);
    case "greaterThanEqual" :
        return (numValue >= toObjValue);
    case "lessThan" :
        return (numValue < toObjValue);
    case "lessThanEqual" :
        return (numValue <= toObjValue);
    case "equal" :
        return (numValue == toObjValue);
    default :
        return false;
    }
    return false;
}

/*******************************************************************************
 * 年月对象比较
 ******************************************************************************/
function f_check_nyobj(obj) {
    if (obj.getAttribute("to") == null || obj.getAttribute("operator") == null || obj.getAttribute("format") == null) {
        return false;
    }
    var to = obj.getAttribute("to");
    // 如果要比较对象为NULL或者值为空则不再比较
    if ($(to) == null || validatorTrim($F(to)).empty()) {
        return true;
    }
    var operator = obj.getAttribute("operator");
    var format = obj.getAttribute("format");
    var datePat, matchArray, ny, toNy, year, month;
    if (format == "yyyy-MM" || format == "yyyy/MM") {
        datePat = /^(\d{4})(-|\/)(\d{1,2})$/;
    } else if (format == "yyyy年MM月") {
        datePat = /^(\d{4})年(\d{1,2})月$/;
    } else if (format == "yyyyMM") {
        datePat = /^(\d{4})(\d{2})$/;
    }

    if (format == "all") {
        matchArray = validatorTrim(obj.value).match(/^(\d{4})(-|\/)(\d{1,2})$/);
        if (matchArray != null) {
            format = "yyyy-MM"
        } else {
            matchArray = validatorTrim(obj.value).match(/^(\d{4})年(\d{1,2})月$/);
            if (matchArray != null) {
                format = "yyyy年MM月"
            } else {
                matchArray = validatorTrim(obj.value).match(/^(\d{4})(\d{2})$/);
                format = "yyyyMM";
            }
        }
        if (matchArray == null) {
            // 日期长度不对,或日期中有非数字符号
            return false;
        }
    } else {
        matchArray = validatorTrim(obj.value).match(datePat);
        if (matchArray == null) {
            // 日期长度不对,或日期中有非数字符号
            return false;
        }
    }

    if (/^(y{4})(-|\/)(M{1,2})$/.test(format)) {
        year = matchArray[1];
        month = matchArray[3];
    } else {
        year = matchArray[1];
        month = matchArray[2];
    }
    ny = parseInt(year + month);
    matchArray = validatorTrim($F(to)).match(datePat);
    if (matchArray == null) {
        // 比较对象的日期长度不对,或日期中有非数字符号
        return false;
    }
    if (/^(y{4})(-|\/)(M{1,2})$/.test(format)) {
        year = matchArray[1];
        month = matchArray[3];
    } else {
        year = matchArray[1];
        month = matchArray[2];
    }
    toNy = parseInt(year + month);
    switch (operator) {
    case "notEqual" :
        return (ny != toNy);
    case "greaterThan" :
        return (ny > toNy);
    case "greaterThanEqual" :
        return (ny >= toNy);
    case "lessThan" :
        return (ny < toNy);
    case "lessThanEqual" :
        return (ny <= toNy);
    case "equal" :
        return (ny == toNy);
    default :
        return false;
    }
    return false;
}

/*******************************************************************************
 * 判断对象是否存在
 ******************************************************************************/
function validatorIsexist(s) {
    try {
        eval(s);
    } catch (e) {
        return false;
    }
    return true;
}



/**
 * 判断当前对象是否可见
 */
function validatorIsVisible(obj) {
    var visAtt, disAtt;
    try {
        disAtt = obj.style.display;
        visAtt = obj.style.visibility;
    } catch (e) {
    }
    if (disAtt == "none" || visAtt == "hidden")
        return false;
    return true;
}

/**
 * 判断当前对象及其父对象是否可见
 */
function validatorCheckPrVis(obj) {
    var pr = obj.parentNode;
    do {
        if (pr == undefined || pr == "undefined")
            return true;
        else {
            if (!validatorIsVisible(pr))
                return false;
        }
    } while (pr = pr.parentNode);
    return true;
}

/*******************************************************************************
 * 去掉字符串两端的空格,字符串若全为空格则返回一个空串
 */
function validatorTrim(mystring) {
    try {
        return $.trim(mystring);
    } catch (e) {
        alert(e.message);
        return "";
    }
}
