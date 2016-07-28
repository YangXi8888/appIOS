function caltb(tabid) {
    this.tabid = tabid;
    this.rules = null;
    this.empty = null;
    this.negative = true;
    this.pasteEnable = true;
    this.emptyArr = null;
    this.setRules = function(rules) {
        this.rules = rules;
    }
    this.setEmpty = function(empty) {
        this.empty = empty;
    }
    this.customrules = function() {
    };
    this.customrulesEnd = function() {
    };
    this.setEmptyArr = function(emptyArr) {
        this.emptyArr = emptyArr;
    };
}

function initCalTable(calT) {
    for (var j = 0; j < document.getElementById(calT.tabid).getElementsByTagName("input").length; j++) {
        if (document.getElementById(calT.tabid).getElementsByTagName("input")[j].getAttribute("cal") == "true") {
            if (document.getElementById(calT.tabid).getElementsByTagName("input")[j].getAttribute("exception") == undefined || typeof (document.getElementById(calT.tabid).getElementsByTagName("input")[j].getAttribute("exception")) == "undefined" || document.getElementById(calT.tabid).getElementsByTagName("input")[j].getAttribute("exception") == null) {
                document.getElementById(calT.tabid).getElementsByTagName("input")[j].onchange = function() {
                    if ($.trim(this.value) != "") {
                        if (caltbCheckFloat(this.value) == false) {
                            this.value = "";
                        }
                        if (this.getAttribute("negative") == "false") {
                            if (parseFloat(this.value) < 0) {
                                this.value = "";
                            }
                        }
                        if (calT.negative == false && this.getAttribute("negative") != "true") {
                            if (parseFloat(this.value) < 0) {
                                this.value = "";
                            }
                        }
                    }
                    if ( typeof (this.getAttribute("calObj")) != "undefined" && this.getAttribute("calObj") != null) {
                        caltbF(eval(this.calObj));
                    } else {
                        caltbF(calT);
                    }
                }
            }
            if (calT.pasteEnable == false) {
                document.getElementById(calT.tabid)
                .getElementsByTagName("input")[j].onpaste = function() {
                    return false;
                }
            } else {
                document.getElementById(calT.tabid)
                .getElementsByTagName("input")[j].onpaste = function() {
                    this.value = caltbSetformat(this);
                }
            }
            document.getElementById(calT.tabid).getElementsByTagName("input")[j].value = sciToNumber(document
            .getElementById(calT.tabid).getElementsByTagName("input")[j].value);
            document.getElementById(calT.tabid).getElementsByTagName("input")[j].value = caltbSetformat(document
            .getElementById(calT.tabid).getElementsByTagName("input")[j]);
        }
    }
}

function runCalRule(calT){
	for (var i = 0; i < calT.rules.length; i++) {
        if (calT.rules[i].TYPE == "0") {
            runRulesForName(calT.rules[i], calT);
        } else if (calT.rules[i].TYPE == "1") {
            runRulesForID(calT.rules[i], calT);
        } else if (calT.rules[i].TYPE == "99") {
            var exeFun = calT.rules[i].GS + "()";
            eval(exeFun);
        } else {
            runRulesForName(calT.rules[i], calT);
        }
    }
}

function caltbF(calT) {
    calT.customrules();
    runCalRule(calT);
    calT.customrulesEnd();
    if (calT.emptyArr != null) {
        var sum = 0;
        for (var n = 0; n < calT.emptyArr.length; n++) {
            sum = parseFloat(document.getElementsByName(calT.emptyArr[n])[0].value) + parseFloat(sum);
        }
        if (sum < 1 && sum > 0) {
            for (var n = 0; n < calT.emptyArr.length; n++) {
                document.getElementsByName(calT.emptyArr[n])[0].value = 0;
                document.getElementsByName(calT.emptyArr[n])[0].value = caltbSetformat(document
                .getElementsByName(calT.emptyArr[n])[0]);
            }
        }
    }
}

function caltbTab() {
    var type;
    type = document.activeElement.type;
    if (type == "select-one") {
        if ((event.keyCode != 38) && (event.keyCode != 40)) {
            window.event.keyCode = 9;
        }
    } else {
        if (event.keyCode == 13) {
            window.event.keyCode = 9;
        }
    }
}

function runRulesForName(ruleInfo, calT) {
    var temp = ruleInfo.GS.split(" ");
    if (ruleInfo.GSLX == "X") {
        var setObj = document.getElementsByName(temp[0]);
        for (var j = 0; j < 2; j++) {
            temp.splice(0, 1);
        }
        for (var n = 0; n < setObj.length; n++) {
            var evalStr = "setObj[" + n + "].value= ";
            var cal = false;
            for (var m = 0; m < temp.length; m++) {
                if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
						&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
						&& temp[m] != ")" && caltbCheckFloat(temp[m]) == false
						&& temp[m] != "dcmAdd" && temp[m] != "dcmSbt"
						&& temp[m] != "dcmMul" && temp[m] != "dcmDiv"
						&& temp[m] != ",") {
                    var tempObj = eval("document.getElementsByName('" + temp[m] + "')[" + n + "]");
                    if (tempObj == null || typeof (tempObj) == "undefined") {
                        tempObj = eval("document.getElementsByName('" + temp[m] + "')[0]");
                        if (caltbTrim(tempObj.value) == "") {
                            evalStr = evalStr + "parseFloat(0.00)";
                        } else {
                            cal = true;
                            document.getElementsByName(temp[m])[0].value = sciToNumber(document
                            .getElementsByName(temp[m])[0].value);
                            document.getElementsByName(temp[m])[0].value = caltbSetformat(document
                            .getElementsByName(temp[m])[0]);
                            evalStr = evalStr + "parseFloat(document.getElementsByName('" + temp[m] + "')[0].value)";
                        }
                    } else {
                        if (caltbTrim(tempObj.value) == "") {
                            evalStr = evalStr + "parseFloat(0.00)";
                        } else {
                            cal = true;
                            document.getElementsByName(temp[m])[n].value = sciToNumber(document
                            .getElementsByName(temp[m])[n].value);
                            document.getElementsByName(temp[m])[n].value = caltbSetformat(document
                            .getElementsByName(temp[m])[n]);
                            evalStr = evalStr + "parseFloat(document.getElementsByName('" + temp[m] + "')[" + n + "].value)";
                        }
                    }
                } else {
                    evalStr = evalStr + " " + temp[m] + " ";
                }
            }
            if (cal) {
                eval(evalStr);
                setObj[n].value = caltbSetformat(setObj[n]);
                if (!calT.negative || setObj[n].getAttribute("negative") == "false") {
                    if (setObj[n].getAttribute("negative") != "true") {
                        if (setObj[n].value.indexOf("-") == 0) {
                            setObj[n].value = "0";
                        }
                    }
                }
                if (calT.empty != null) {
                    if (parseFloat(setObj[n].value) < 1 && parseFloat(setObj[n].value) > 0) {
                        for (var p = 0; p < calT.empty.length; p++) {
                            if (calT.empty[p] == setObj[n].name || calT.empty[p] == setObj[n].id) {
                                setObj[n].value = "0";
                                break;
                            }
                        }
                    }
                }
            } else {
                setObj[n].value = "";
            }
        }
    } else if (ruleInfo.GSLX == "Y") {
        var setObj = document.getElementsByName(temp[0])[0];
        if (setObj == null || typeof (setObj) == "undefined") {
            return;
        }
        for (var j = 0; j < 2; j++) {
            temp.splice(0, 1);
        }
        var evalStr = "setObj.value= ";
        var cal = false;
        for (var m = 0; m < temp.length; m++) {
            if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
						&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
						&& temp[m] != ")" && caltbCheckFloat(temp[m]) == false
						&& temp[m] != "dcmAdd" && temp[m] != "dcmSbt"
						&& temp[m] != "dcmMul" && temp[m] != "dcmDiv"
						&& temp[m] != ",") {
                var tempObjArr = eval("document.getElementsByName('" + temp[m] + "')");
                var eSum = 0;
                for (var n = 0; n < tempObjArr.length; n++) {
                    var tempObj = tempObjArr[n];
                    if (!caltbTrim(tempObj.value) == "") {
                        cal = true;
                        tempObj.value = sciToNumber(tempObj.value);
                        tempObj.value = caltbSetformat(tempObj);
                        eSum = eSum + parseFloat(tempObj.value);
                    }
                }
                evalStr = evalStr + eSum;
            } else {
                evalStr = evalStr + " " + temp[m] + " ";
            }
        }
        if (cal) {
            eval(evalStr);
            setObj.value = caltbSetformat(setObj);
            if (!calT.negative || setObj.getAttribute("negative") == "false") {
                if (setObj.getAttribute("negative") != "true") {
                    if (setObj.value.indexOf("-") == 0) {
                        setObj.value = "0";
                    }
                }
            }
            if (calT.empty != null) {
                if (parseFloat(setObj.value) < 1 && parseFloat(setObj.value) > 0) {
                    for (var p = 0; p < calT.empty.length; p++) {
                        if (calT.empty[p] == setObj.name || calT.empty[p] == setObj.id) {
                            setObj.value = "0";
                            break;
                        }
                    }
                }
            }
        } else {
            setObj.value = "";
        }

    }

}

function runRulesForID(ruleInfo, calT) {
    var temp = ruleInfo.GS.split(" ");
    var setObj = document.getElementById(temp[0]);
    for (var j = 0; j < 2; j++) {
        temp.splice(0, 1);
    }
    var evalStr = "setObj.value= ";
    var cal = false;
    if (temp.length == 1 && temp[0].indexOf("zdy") != -1) {
        evalStr = evalStr + " " + temp[0] + " ";
        cal = true;
    } else {
        for (var m = 0; m < temp.length; m++) {
            if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
						&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
						&& temp[m] != ")" && caltbCheckFloat(temp[m]) == false
						&& temp[m] != "dcmAdd" && temp[m] != "dcmSbt"
						&& temp[m] != "dcmMul" && temp[m] != "dcmDiv"
						&& temp[m] != ",") {
                var tempObj = eval("document.getElementById('" + temp[m] + "')");
                if (caltbTrim(tempObj.value) == "") {
                    evalStr = evalStr + "parseFloat(0.00)";
                } else {
                    cal = true;
                    document.getElementById(temp[m]).value = sciToNumber(document.getElementById(temp[m]).value);
                    document.getElementById(temp[m]).value = caltbSetformat(document.getElementById(temp[m]));
                    evalStr = evalStr + "parseFloat(document.getElementById('" + temp[m] + "').value)";
                }
            } else {
                evalStr = evalStr + " " + temp[m] + " ";
            }
        }
    }
    if (cal) {
        eval(evalStr.replace(/zdy/g, ""));
        setObj.value = caltbSetformat(setObj);
        if (!calT.negative || setObj.getAttribute("negative") == "false") {
            if (setObj.getAttribute("negative") != "true") {
                if (setObj.value.indexOf("-") == 0) {
                    setObj.value = "0";
                }
            }
        }
        if (calT.empty != null) {
            if (parseFloat(setObj.value) < 1 && parseFloat(setObj.value) > 0) {
                for (var p = 0; p < calT.empty.length; p++) {
                    if (calT.empty[p] == setObj.name || calT.empty[p] == setObj.id) {
                        setObj.value = "0";
                        break;
                    }
                }
            }
        }
    } else {
        setObj.value = "";
    }

}

function caltbIsexist(s) {
    try {
        eval(s);
    } catch (e) {
        return false;
    }
    return true;
}

function caltbFilterChar(calT) {
    if (window.event.srcElement.getAttribute("integer") == "true") {
        if (window.event.keyCode == 46) {
            window.event.keyCode = 0;
            return;
        }
    }
    if (window.event.srcElement.getAttribute("cal") == "true") {
        if (window.event.keyCode == 45 && calT.negative == false && window.event.srcElement.getAttribute("negative") != "true") {
            window.event.keyCode = 0;
            return;
        }
        if (window.event.keyCode == 45 && window.event.srcElement.getAttribute("negative") == "false") {
            window.event.keyCode = 0;
            return;
        }
        if (calT.pasteEnable == false) {
            if (window.event.keyCode == 45 && window.event.srcElement.value.length > 0) {
                window.event.keyCode = 0;
                return;
            }
        }
        if (!(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 46) || (window.event.keyCode == 45))) {
            window.event.keyCode = 0;
            return;
        }
        if (window.event.keyCode == 46 && window.event.srcElement.value.indexOf(".") > 0) {
            window.event.keyCode = 0;
            return;
        }
        if (calT.pasteEnable == false) {
            if (window.event.keyCode == 45 && window.event.srcElement.value.indexOf("-") > -1) {
                window.event.keyCode = 0;
                return;
            }
        }
        if (window.event.keyCode == 46 && window.event.srcElement.value == "") {
            window.event.keyCode = 0;
            return;
        }
    }
}

function caltbCheckFloat(obj) {
    if ( typeof (obj) == "object") {
        if (/^(\+|-)?\d+($|\.\d+$)/.test(caltbTrim(obj.value)) && caltbCheckFloatIn(obj.value)) {
            return true;
        }
    } else {
        if (/^(\+|-)?\d+($|\.\d+$)/.test(caltbTrim(obj)) && caltbCheckFloatIn(obj)) {
            return true;
        }
    }
    return false;
}

function caltbCheckFloatIn(str) {
    var n = eval("document.getElementsByName(str).length");
    if (n == 0) {
        return true;
    }
    if (str.indexOf(".") < 0) {
        if (str.length > 0) {
            if (str.substr(0, 1) == "0") {
                return false;
            }
        }
    }
    return true;
}

function caltbCheckEnglish(str) {
    if (/^[A-Za-z]+$/.test(validatorTrim(str))) {
        return true;
    }
    return false;
}

function caltbSetformat(obj) {
    if (obj.getAttribute("cal") == undefined || typeof (obj.getAttribute("cal")) == "undefined" || obj.getAttribute("cal") == null) {
        return obj.value;
    }

    if (caltbCheckFloat(obj) == false) {
        if (obj.value.indexOf("e") == -1 && obj.value.indexOf("E") == -1) {
            return "";
        }
    }

    switch (obj.getAttribute("cal")) {
    case "true":
        if (obj.getAttribute("format") != undefined) {
            if (parseInt(obj.getAttribute("format")) < 1) {
                if (obj.value.indexOf(".") != -1) {
                    return (parseFloat(obj.value.substr(0, obj.value.indexOf("."))));
                } else {
                    return obj.value;
                }
            }
        }
        var format = obj.getAttribute("format") || 2;
        return caltbNumloop(obj.value, parseInt(format));
    default:
        return obj.value;
    }
}

function caltbNumloop(num, n) {
    if (num == 0) {
        num = "0";
    }
    if (num == "") {
        return "";
    }
    num = (parseFloat(num) * 100) / 100;
    num = num.toString();
    if (num.indexOf(".") == "-1") {
        num = num + ".";
        for (var i = 0; i < n; i++) {
            num = num + "0";
        }
    } else if (num.split(".")[1] == "") {
        for (var i = 0; i < n; i++) {
            num = num + "0";
        }
    } else if (num.split(".")[1].length > n) {
        var num2xx = parseFloat(num).toFixed(n);
        num = Math.round(parseFloat(num) * Math.pow(10, parseInt(n))) / Math.pow(10, parseFloat(n));
        if (parseFloat(num) > num2xx) {
            return num;
        } else {
            return num2xx;
        }
    } else if (num.split(".")[1].length < n) {
        var tn = parseInt(n - num.split(".")[1].length);
        for (var i = 0; i < tn; i++) {
            num = num + "0";
        }
    }
    return num;
}


function runOnlyRuleForArr(temp, em) {
	if (temp.split(" ").length == 1) {
		var exeFun = temp + "()";
		eval(exeFun);
		return;
	}
	runOnlyRule(temp.split(" "), em);
}

function runOnlyRule(temp, em) {
	var setObj = document.getElementsByName(temp[0]);
	for (var j = 0; j < 2; j++) {
		temp.splice(0, 1);
	}
	for (var n = 0; n < setObj.length; n++) {
		var evalStr = "setObj[" + n + "].value= ";
		var cal = false;
		for (var m = 0; m < temp.length; m++) {
			if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
					&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
					&& temp[m] != ")" && caltbCheckFloat(temp[m]) == false
					&& temp[m] != "dcmAdd" && temp[m] != "dcmSbt"
					&& temp[m] != "dcmMul" && temp[m] != "dcmDiv"
					&& temp[m] != ",") {
				var tempObj = eval("document.getElementsByName('" + temp[m] + "')[" + n + "]");
				if (caltbTrim(tempObj.value).empty()) {
					evalStr = evalStr + "parseFloat(0.00)";
				} else {
					cal = true;
					document.getElementsByName(temp[m])[n].value = sciToNumber(document.getElementsByName(temp[m])[n].value);
					document.getElementsByName(temp[m])[n].value = caltbSetformat(document.getElementsByName(temp[m])[n]);
					evalStr = evalStr + "parseFloat(document.getElementsByName('" + temp[m] + "')["
							+ n + "].value)";
				}
			} else {
				evalStr = evalStr + " " + temp[m] + " ";
			}
		}
		if (cal) {
			eval(evalStr);
			setObj[n].value = caltbSetformat(setObj[n]);
			if (setObj[n].getAttribute("negative") == "false") {
				if (setObj[n].value.indexOf("-") == 0) {
					setObj[n].value = "0";
				}
			}
			if (em == true) {
				if (parseFloat(setObj[n].value) < 1
						&& parseFloat(setObj[n].value) > 0) {
					setObj[n].value = "0";
				}
			}
		} else {
			setObj[n].value = "";
		}
	}
}

function runOnlyRuleYForArr(temp, em) {
	if (temp.split(" ").length == 1) {
		var exeFun = temp + "()";
		eval(exeFun);
		return;
	}
	runOnlyRuleY(temp.split(" "), em);
}

function runOnlyRuleY(temp, em) {
	var setObj = $(temp[0]);
	for (var j = 0; j < 2; j++) {
		temp.splice(0, 1);
	}
	var evalStr = "setObj.value= ";
	var cal = false;
	for (var m = 0; m < temp.length; m++) {
		if (temp[m] != "+" && temp[m] != "-" && temp[m] != "*"
				&& temp[m] != "/" && temp[m] != "%" && temp[m] != "("
				&& temp[m] != ")" && caltbCheckFloat(temp[m]) == false
				&& temp[m] != "dcmAdd" && temp[m] != "dcmSbt"
				&& temp[m] != "dcmMul" && temp[m] != "dcmDiv" && temp[m] != ",") {
			var tempObjArr = eval("document.getElementsByName('" + temp[m] + "')");
			var eSum = 0;
			for (var n = 0; n < tempObjArr.length; n++) {
				var tempObj = tempObjArr[n];
				if (!caltbTrim(tempObj.value).empty()) {
					cal = true;
					tempObj.value = sciToNumber(tempObj.value);
					tempObj.value = caltbSetformat(tempObj);
					eSum = eSum + parseFloat(tempObj.value);
				}
			}
			evalStr = evalStr + eSum;
		} else {
			evalStr = evalStr + " " + temp[m] + " ";
		}
	}
	if (cal) {
		eval(evalStr);
		setObj.value = caltbSetformat(setObj);
		if (setObj.getAttribute("negative") == "false") {
			if (setObj.value.indexOf("-") == 0) {
				setObj.value = "0";
			}
		}
		if (em == true) {
			if (parseFloat(setObj.value) < 1 && parseFloat(setObj.value) > 0) {
				setObj.value = "0";
			}
		}
	} else {
		setObj.value = "";
	}
}

function caltbTrim(mystring) {
    try {
        var temp_string = mystring;
        while (temp_string.substring(0, 1) == " ")
        temp_string = temp_string.substring(1);
        while (temp_string.substring(temp_string.length - 1, temp_string.length) == " ")
        temp_string = temp_string.substring(0, temp_string.length - 1);
        return temp_string;
    } catch (e) {
        alert(e.message);
        return "";
    }
}

function sciToNumber(str) {
    if (str.indexOf("E") != -1) {
        str = str.split("E")[0] * Math.pow(10, str.substr(str.indexOf("E") + 1, str.length));
    }
    return str;
}

function calNum3du(num) {
	num = num + "";
	var re = /(-?\d+)(\d{3})/
	while (re.test(num)) {
		num = num.replace(re, "$1,$2")
	}
	return num;
}

function dcmAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m + arg2 * m) / m).toFixed(n);
}

function dcmSbt(arg1, arg2) {
	return dcmAdd(arg1, -arg2);
}

function dcmMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m);
}

function dcmDiv(arg1, arg2) {
	return dcmMul(arg1, 1 / arg2);
}