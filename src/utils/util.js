import md5 from 'js-md5';
import CryptoJS from 'crypto-js';

// 获取Url参数
export function getQueryString(name) {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	const r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return unescape(r[2]);
	}
	return null;
}

// 获取接口通用的特殊参数
export function getSpecialParams(url) {
	const time = Date.now();
	// token是根据接口url和时间戳计算的
	const token = getApiToken(url, time);
	// 接口url会在最后加上一个时间戳
	const process = processUrl(url, time);

	return {
		url: process,
		time,
		token,
	};
}

// 给url增加_t时间戳参数
function processUrl(url, time) {
	url += url.match(/\?/) ? '&' : '?';
	url += '_t=' + time;
	return url;
}

// 根据url、time以及之前登录的加密账号（如有）计算token
function getApiToken(url, time) {
	if (url.startsWith('http')) {
		url = url.substring(url.indexOf('//') + 2, url.length);
		url = url.substring(url.indexOf('/'), url.length);
	}
	if (url.indexOf('?') !== -1) {
		url = url.substring(0, url.indexOf('?'));
	}
	if (!url.startsWith('/')) {
		url = '/' + url;
	}

	let salt = 'FORP' + time;
	const account = window.localStorage.getItem('ibs-qx-current-encrypt-account');
	if (!!account && account !== 'null') {
		salt = salt + account;
	}

	// 使用的是js-md5的方法
	return md5(salt + url);
}

// 账号密码des加密工具
export function encrypt(data, key) {
	const realKey = getKey(key);
	const encrypt = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(realKey), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypt.ciphertext.toString(CryptoJS.enc.Base64);
}

export function decrypt(data, key) {
	const realKey = getKey(key);
	const decrypt = CryptoJS.AES.decrypt(
		{
			ciphertext: CryptoJS.enc.Base64.parse(data),
		},
		CryptoJS.enc.Hex.parse(realKey),
		{
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		}
	);
	return decrypt.toString(CryptoJS.enc.Utf8);
}

/**
 * 获取key,由于后台采用 SHA1PRNG 算法重新计算了key，前端要把原始秘钥经过两次sha1加密，最后取其字符串前32位
 * @param key
 * @returns {*}
 */
function getKey(key) {
	let realKey = CryptoJS.SHA1(key);
	realKey = CryptoJS.SHA1(realKey).toString().substring(0, 32); // 真正的key
	return realKey;
}

// 是否是线上环境
export function isProd() {
	return (
		window.location.host === 'ibs.cicc.group' ||
		window.location.host === '10.104.129.66'
	);
}

// 是否是本地
export function isLocal() {
	return (
		window.location.host.startsWith('localhost') ||
		window.location.host.startsWith('127.0.0.1')
	);
}

// 是否是测试环境
export function isTest() {
	// 目前测试环境只有IBCI
	return window.location.host === 'ibci.cicc.group';
}

// 打开外链
export function openHref(href) {
	// 以后需要换成openWebView
	window.location.href = href;
}

// 获取标准时间格式，入参为Date对象
export function getStandardTime(date) {
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	if (month < 10) {
		month = `0${month}`;
	}
	let day = date.getDate();
	if (day < 10) {
		day = `0${day}`;
	}

	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let seconds = date.getSeconds();
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/* eslint-disable sonarjs/cognitive-complexity */
// 获取系统版本
export function getOsVersion() {
	const u = window.navigator.userAgent;
	let version = '';
	if (u.indexOf('Mac OS X') > -1) {
		// ios
		const regStrSaf = /OS [\d._]*/gi;
		const verinfo = u.match(regStrSaf);
		version =
			'iOS' + (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
	} else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		// android
		version =
			'Android' +
			u.substr(
				u.indexOf('Android') + 8,
				u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8
			);
	} else if (u.indexOf('BB10') > -1) {
		// 黑莓bb10系统
		version =
			'blackberry' +
			u.substr(
				u.indexOf('BB10') + 5,
				u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5
			);
	} else if (u.indexOf('IEMobile') > -1) {
		// windows phone
		version =
			'winphone' +
			u.substr(
				u.indexOf('IEMobile') + 9,
				u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9
			);
	} else {
		const userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('windows nt 5.0') > -1) {
			version = 'Windows 2000';
		} else if (
			userAgent.indexOf('windows nt 5.1') > -1 ||
			userAgent.indexOf('windows nt 5.2') > -1
		) {
			version = 'Windows XP';
		} else if (userAgent.indexOf('windows nt 6.0') > -1) {
			version = 'Windows Vista';
		} else if (
			userAgent.indexOf('windows nt 6.1') > -1 ||
			userAgent.indexOf('windows 7') > -1
		) {
			version = 'Windows 7';
		} else if (
			userAgent.indexOf('windows nt 6.2') > -1 ||
			userAgent.indexOf('windows 8') > -1
		) {
			version = 'Windows 8';
		} else if (userAgent.indexOf('windows nt 6.3') > -1) {
			version = 'Windows 8.1';
		} else if (
			userAgent.indexOf('windows nt 6.2') > -1 ||
			userAgent.indexOf('windows nt 10.0') > -1
		) {
			version = 'Windows 10';
		} else {
			version = 'Unknown';
		}
	}
	return version;
}
/* eslint-enable sonarjs/cognitive-complexity */

// 获取QQ浏览器版本（企信内部用的都是QQ浏览器的WebView）
export function getQQBrowserVersion() {
	const u = window.navigator.userAgent;
	if (!u.includes('QQBrowser/')) {
		return 'unknown';
	}
	return u.split('QQBrowser/')[1].split(' ')[0];
}

// 安全的数字运算
// 加法
export function accAdd(arg1, arg2) {
	let r1, r2;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	const m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}
// 减法
export function accSub(arg1, arg2) {
	let r1, r2;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	const m = Math.pow(10, Math.max(r1, r2));
	// 动态控制精度长度
	const n = r1 >= r2 ? r1 : r2;
	return Number.parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
}
// 乘法
export function accMul(arg1, arg2) {
	let m = 0;
	const s1 = arg1.toString();
	const s2 = arg2.toString();
	try {
		m += s1.split('.')[1].length;
	} catch (e) {
		console.log(e);
	}
	try {
		m += s2.split('.')[1].length;
	} catch (e) {
		console.log(e);
	}
	return (
		(Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
		Math.pow(10, m)
	);
}
// 除法
export function accDiv(arg1, arg2) {
	let t1 = 0;
	let t2 = 0;
	try {
		t1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		console.log(e);
	}
	try {
		t2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		console.log(e);
	}
	const r1 = Number(arg1.toString().replace('.', ''));
	const r2 = Number(arg2.toString().replace('.', ''));
	return (r1 / r2) * Math.pow(10, t2 - t1);
}
// 选中input的所有内容，需要传入该input一个原生的事件
export function selectInputAllValue(event) {
	const input = event.currentTarget;
	if (!input || !input.value) {
		return;
	}
	const len = input.value.length;
	if (
		len !== 0 &&
		typeof input.selectionStart === 'number' &&
		typeof input.selectionEnd === 'number'
	) {
		input.selectionStart = 0;
		input.selectionEnd = len;
	}
}
