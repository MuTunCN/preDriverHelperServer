/**
 * Created by huawei on 2018-04-10.
 */
var NameSpace = window.NameSpace || {};

NameSpace.Qt = new function () {
    var self = this;

    /**
     * js 直接调用 qt, 由 Qt 拦截请求方法
     * @param pArgs 请求方法名 + 请求参数列表
     */
    self.invokeQtEvent = function (pArgs) {
        if (existQtEnvi()) {
            QCefClient.invokeMethod.apply(this, pArgs);
        }
    };

    /**
     * 注册 js 事件名, 由 qt 触发 js 事件
     * @param pMethod   本地事件名称
     * @param pCallback 回调函数:返回JSONObject [text:"custom"]
     */
    self.addEventListener = function (pMethod, pCallback) {
        if (existQtEnvi()) {
            QCefClient.addEventListener(pMethod, pCallback);
        }
    };

    /**
     * 调用 Qt 已内置的Query方法
     * @param pArgs     请求参数列表
     * @param success   成功回调事件
     * @param failure   失败回调事件
     */
    self.executeQuery = function (pArgs, success, failure) {
        if (existQtEnvi()) {
            var query = {
                request: pArgs,
                onSuccess: function (response) {
                    if (typeof success === "function") {
                        success(response);
                    }
                },
                onFailure: function (error_code, error_message) {
                    if (typeof failure === "function") {
                        failure(error_code, error_message);
                    }
                    else {
                        alert("Method: executeQuery, ErrorCode: " + error_code + ", ErrorMsg: " + error_message);
                    }
                }
            };
            window.QCefQuery(query);
        }
    };

    /**
     * 检查运行环境
     * @returns {boolean}
     */
    function existQtEnvi() {
        return ((typeof QCefClient !== "undefined"));
    }
};

NameSpace.URL = new function () {
    var self = this;
    self.getQueryString = function () {
        if (arguments.length == 1) {
            return _getQueryString(window.location.search, arguments[0]);
        }
        else if (arguments.length == 2) {
            return _getQueryString(arguments[0], arguments[1]);
        }
        return null;
    };

    function _getQueryString(location, name) {
        let index = location.indexOf("?");
        if (index === -1)
            return null;
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = location.substr(index + 1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    };
};
//---------------------------------------------------------------------------------------------------------//!日期函数
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/*** 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

//---------------------------------------------------------------------------------------------------------//!Vue常用工具类
//---------------------------------------------------------------------------------------------------------//!常用工具类
NameSpace.Utils = new function () {
    const self = this;

    self.createGUID = function () {//创建UUID
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    self.throttle = function (method, context) {//重置窗口
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 100);
    };

    self.delayExecute = function (method, time) {//延迟执行
        if (typeof time === "undefined" || !time) {
            time = 5;
        }
        setTimeout(method, time);
    };
};

//---------------------------------------------------------------------------------------------------------//!JQuery Utils
NameSpace.AjaxUtils = new function () {
    let self = this;
    self.sendPost = function (pUrl, pData, successFun, failObj, completeFun) {
        $.ajax({
            url: pUrl,
            type: "POST",
            cache: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: pData,
            success: function (result, textStatus) {
                if (typeof successFun === "function") {
                    successFun(result);
                }
            },
            error: function (e) {
                if (typeof failObj === "function") {
                    failObj(e);
                }
                else {
                    alert("请求错误，原因:" + e.message);
                }
            },
            complete: function () {
                if (typeof completeFun === "function") {
                    completeFun();
                }
            }
        });
    };
};

//---------------------------------------------------------------------------------------------------------//!文件大小__单位转换
NameSpace.TransfUtils = new function () {
    var self = this;
    self.getFileSize = function (fileSize) {    // 计算文件大小
        if (!fileSize) {
            return "0B";
        }
        var unit = ["B", "KB", "MB", "G"];
        var retVal = fileSize + unit[0];
        var _fileSize = fileSize;
        var i = 1;
        while (_fileSize > 1000) {
            _fileSize = _fileSize / 1024;
            retVal = Math.round(_fileSize * 100) / 100 + unit[i];
            ++i;
        }
        return retVal;
    };
};

//---------------------------------------------------------------------------------------------------------//!默认提供的公共调用方法::delete NoUse
NameSpace.Qt.DefaultQuery = new function () {
    let self = this;
    self.getRequestHeader = function (sucFun, failFun) {
        NameSpace.Qt.executeQuery(JSON.stringify({method: "Fixed_GetRequestHeader"}), sucFun, failFun);
    };
    self.getCurrentUser = function (sucFun, failFun) {
        NameSpace.Qt.executeQuery(JSON.stringify({method: "Fixed_GetCurrentUser"}), sucFun, failFun);
    };
    self.sendPageSignal = function (evtName, value) {//page -> page
        if (typeof evtName !== "undefined" && evtName)
            NameSpace.Qt.invokeQtEvent(["Fixed_QExecute", "sendPageSignal", evtName, value]);
    };
    self.sendAppointSignal = function (signalName, params) {//"", []
        NameSpace.Qt.invokeQtEvent(["Fixed_QExecute", signalName].concat(params));
    };
};