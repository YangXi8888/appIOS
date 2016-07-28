/*******************************************************************************
 * @author杨希
 * @version 1.0
 * @see 很费解
 ******************************************************************************/
var sfzyyyy;
var sfzmm;
var sfzdd;
var birthday;
var sfzsex;

function getSfzYear() {
	return sfzyyyy;
}
function getSfzMonth() {
	return sfzmm;
}
function getSfzDate() {
	return sfzdd;
}
function getBirthday() {
	return birthday;
}
function getSex() {
	return sfzsex;
}

function getAge() {
	var sfzmm = getSfzMonth();
	if (sfzmm < 10)
		sfzmm = sfzmm.substring(1, 2);
	return Math.floor((parseInt(_getSfzYear()) * 12 + parseInt(_getSfzMonth())
			- parseInt(getSfzYear()) * 12 - parseInt(sfzmm))
			/ 12);
}

// 判断是否大龄,男50,女40
function isBigAge() {
	if (parseInt(getAge()) >= 40 && parseInt(getSex()) == 2)
		return "1";
	if (parseInt(getAge()) >= 50 && parseInt(getSex()) == 1)
		return "1";
	return "0";
}

// 校验身份证号码
function f_check_sfz(idCard) {
	var id = idCard.value;
	var id_length = id.length;
	if (id_length == 0) {
		return false;
	}
	if (id_length != 15 && id_length != 18) {
		return false;
	}
	if (id_length == 15) {
		sfzyyyy = "19" + id.substring(6, 8);
		sfzmm = id.substring(8, 10);
		sfzdd = id.substring(10, 12);
		if (sfzmm > 12 || sfzmm <= 0) {
			return false;
		}
		if (sfzdd > 31 || sfzdd <= 0) {
			return false;
		}
		birthday = sfzyyyy + "-" + sfzmm + "-" + sfzdd;
		if ("13579".indexOf(id.substring(14, 15)) != -1) {
			sfzsex = "1";
		} else {
			sfzsex = "2";
		}
	} else if (id_length == 18) {
		if (id.indexOf("X") > 0 && id.indexOf("X") != 17 || id.indexOf("x") > 0
				&& id.indexOf("x") != 17) {
			return false;
		}

		sfzyyyy = id.substring(6, 10);
		if (sfzyyyy > 2200 || sfzyyyy < 1900) {
			return false;
		}

		sfzmm = id.substring(10, 12);
		if (sfzmm > 12 || sfzmm <= 0) {
			return false;
		}

		sfzdd = id.substring(12, 14);
		if (sfzdd > 31 || sfzdd <= 0) {
			return false;
		}

		// if (id.charAt(17)=="x" || id.charAt(17)=="X")
		// {
		// if ("x"!=GetVerifyBit(id) && "X"!=GetVerifyBit(id)){
		// return false;
		// }
		//
		// }
		// else{
		// if (id.charAt(17)!=GetVerifyBit(id)){
		// return false;
		// }
		// }

		birthday = id.substring(6, 10) + "-" + id.substring(10, 12) + "-"
				+ id.substring(12, 14);
		if ("13579".indexOf(id.substring(16, 17)) > -1) {
			sfzsex = "1";
		} else {
			sfzsex = "2";
		}
	}
	return true;
}

// 15位转18位中,计算校验位即最后一位
function GetVerifyBit(id) {
	var result;
	var nNum = eval(id.charAt(0) * 7 + id.charAt(1) * 9 + id.charAt(2) * 10
			+ id.charAt(3) * 5 + id.charAt(4) * 8 + id.charAt(5) * 4
			+ id.charAt(6) * 2 + id.charAt(7) * 1 + id.charAt(8) * 6
			+ id.charAt(9) * 3 + id.charAt(10) * 7 + id.charAt(11) * 9
			+ id.charAt(12) * 10 + id.charAt(13) * 5 + id.charAt(14) * 8
			+ id.charAt(15) * 4 + id.charAt(16) * 2);
	nNum = nNum % 11;
	switch (nNum) {
		case 0 :
			result = "1";
			break;
		case 1 :
			result = "0";
			break;
		case 2 :
			result = "X";
			break;
		case 3 :
			result = "9";
			break;
		case 4 :
			result = "8";
			break;
		case 5 :
			result = "7";
			break;
		case 6 :
			result = "6";
			break;
		case 7 :
			result = "5";
			break;
		case 8 :
			result = "4";
			break;
		case 9 :
			result = "3";
			break;
		case 10 :
			result = "2";
			break;
	}
	// document.write(result);
	return result;
}
// 15位转18位
function Get18(idCard) {
	var id = idCard;
	var id18 = id;
	if (id.length == 0) {
		return false;
	}
	if (id.length == 15) {
		if (id.substring(6, 8) > 20) {
			id18 = id.substring(0, 6) + "19" + id.substring(6, 15);
		} else {
			id18 = id.substring(0, 6) + "20" + id.substring(6, 15);
		}

		id18 = id18 + GetVerifyBit(id18);
	}
	return id18;
}