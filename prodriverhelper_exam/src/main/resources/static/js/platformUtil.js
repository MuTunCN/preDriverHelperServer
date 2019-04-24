var platformUtil = {};

platformUtil.net = {};

platformUtil.websocket = {};

platformUtil.util = {};

platformUtil.util.url = {};

platformUtil.util.string = {};

platformUtil.util.browser = {};

platformUtil.util.date = {};

platformUtil.util.img = {};

platformUtil.file = {};

platformUtil.laytpl = {};

/**
 * 异步请求
 * @param url 相对路径（不包含根路径）
 * @param data
 * @param successCall
 * @param errorCall
 */
platformUtil.net.asyncAjaxData = function (url, data, successCall) {
    this.async(url, "post", data, successCall);
};

/**
 * 异步请求
 * @param url
 * @param type get/post/put ...
 * @param data
 * @param successCall
 */
platformUtil.net.async = function(url, type, data, successCall) {
    this.ajaxData(url, data, type, true, successCall, function (msg) {
        alert("请求出错！" + msg);
    })
};

/**
 * 同步请求
 * @param url 相对路径
 * @param data
 * @param successCall
 */
platformUtil.net.syncAjaxData = function (url, data) {
    url = platformUtil.util.url.getURL() + url;
    var res;
    this.ajaxData(url, data, 'post', false, function (data) {
        if (data.status) {
            res = data.data;
        }
    }, function (msg) {
        alert("请求出错！" + msg);
    });
    return res;
};

/**
 * 同步请求 无提示信息
 * @param url 相对路径
 * @param data
 * @param successCall
 */
platformUtil.net.syncAjaxDataCallBack = function (url, data) {
    url = platformUtil.util.url.getURL() + url;
    var res;
    this.ajaxData(url, data, 'post', false, function (data) {
        if (data.status) {
            res = data.data;
        }
    }, function (msg) {
    });
    return res;
};



/**
 * ajax请求
 * @param url 请求完整路径
 * @param data 参数
 * @param type get/post
 * @param async 是否异步
 * @param successCall 成功回调
 * @param errorCall 失败回调
 */
platformUtil.net.ajaxData = function (url, data, type, async, successCall, errorCall) {
    $.ajax({
        url: url,
        type: type,
        contentType: 'application/json',
        async: async,
        data: JSON.stringify(data),
        success: successCall,
        error: errorCall
    })
};

/********** Websocket, 依赖于sockjs.min.js *********/

/**
 * 建立基于sockjs的Websocket
 * @param option
 */
platformUtil.websocket.open = function (option) {
    var url = option.url;
    url = platformUtil.util.url.getURL() + url;
    var sock = new SockJS(url);

    sock.onopen = option.onOpen;
    sock.onmessage = option.onMessage;
    sock.onclose = option.onClose;
    return sock;
};


/********** util ***********/

/**
 * 获取url根路径
 * @returns {string}
 */
platformUtil.util.url.getURL = function () {
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： cis/website/meun.htm
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080
    var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var rootPath = localhostPaht + projectName;
    return rootPath;
};

platformUtil.util.url.getContextPath = function () {
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： cis/website/meun.htm
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080
    var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return projectName;
};


/**
 * 获取url参数
 * @param name 参数名称
 * @returns {*}
 */
platformUtil.util.url.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
};

/**
 * 字符替换
 * 需要EM6支持
 * @param str, 模板文本，如 {{name}}很厉name害，才{{ age }}岁
 * @param content, 替换值，如 { name: "jawil", age: "15" }
 * @returns {boolean}
 */
// platformUtil.util.string.replace = function (str, content) {
//     return str.replace(/{{(.*?)}}/g, (match, key) => content[key.trim()]);
// };


platformUtil.util.date.getCurrentTime = function () {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    return year + "-" + month + "-" + day;
};

platformUtil.util.date.getYear = function () {
    var d = new Date();
    return d.getFullYear();
};

platformUtil.util.date.getLastYeatTime = function () {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear()-1;
    return year + "-" + month + "-" + day;
};

platformUtil.util.img.scale = function (width, height, max_width) {
    var bl = max_width / width;
    var res = {
        width: max_width,
        height: height * bl
    };
    return res;
};

var userAgent = navigator.userAgent.toLowerCase();
var browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
    safari: /webkit/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
};

platformUtil.util.browser.isIE = function () {
    return browser.msie;
};

platformUtil.util.browser.isIE8 = function () {
    return browser.msie && browser.version == '8.0';
};

platformUtil.util.browser.underIE9 = function () {
    return browser.msie && (eval(parseInt(browser.version)) < 9)
};

platformUtil.util.browser.isWebKit = function () {
    return browser.safari;
};

platformUtil.util.browser.downloadChrome = function() {
    window.open(platformUtil.util.url.getURL() + "/file/download_chrome");
};



/*************************** 文件下载 *************************************/

platformUtil.file.download = {};

platformUtil.file.download.fromServerDisk = function (fileId) {
    if (fileId) {
        window.open(platformUtil.util.url.getURL() + "/file/disk/download/" + fileId)
    }
};

/**
 * 附件下载
 * @param objId 附件ID
 */
platformUtil.file.download.fromDb = function (objId) {
    if (objId) {
        window.open(platformUtil.util.url.getURL() + "/file/db/download/" + objId)
    }
};

/*********** 组合控件，基于layui模板引擎, 需引入layui.all.js ****************/

/**
 * 在指定元素中生成筛选工具栏
 * 需在mini.parse()前调用
 * @param ele 元素的id
 * @param data 数据
 */
platformUtil.laytpl.filterToolbar = function (ele, data) {
    var tpl = '        <div class="my-grid-normal-filter-title">\n' +
        '            <div class="title-text">\n' +
        '                <i class="iconfont title-text-icon">&#xe622;</i>\n' +
        '                <div class="title-text-content">筛选查询</div>\n' +
        '            </div>\n' +
        '            <div class="title-btn">\n' +
        '                {{# layui.each(d.btnList,  function(index, item) { }}\n' +
        '                <button class="{{item.cls}}" onclick="{{item.click}}">{{item.name}}</button>\n' +
        '                {{# }); }}\n' +
        '                <button class="my-btn arrow" onclick="toggleFilterBar()"><i class="iconfont">&#xe62c;</i>&nbsp;收起筛选</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <ul class="my-grid-normal-filter-toolbar">\n' +
        '            {{# layui.each(d.inputlist, function(index, item) { }}\n' +
        '            <li><label class="my-grid-normal-filter-label">{{item.label}}</label>\n' +
        '            <input class="{{item.type}}" id="{{item.id}}" valueField="{{item.valueField}}"\n' +
        '                   textField="{{item.textField}}" width="{{item.width}}" value="" showNullItem="false" nullItemText="全部"/></li>\n' +
        '            {{# });}}\n' +
        '        </ul>';

    // 指定元素添加class, 绑定基础样式
    $('#' + ele).addClass('my-grid-normal-fiter-div');
    var laytpl = layui.laytpl;
    var html = laytpl(tpl).render(data);
    $('#' + ele).html(html);
};

function toggleFilterBar() {
    if ($('.my-grid-normal-fiter-div').hasClass('hide')) {
        $('.my-grid-normal-filter-toolbar').show();
        $('.my-grid-normal-fiter-div').removeClass('hide');
        $('button.arrow').html("<i class=\"iconfont\">&#xe62c;</i>&nbsp;收起筛选")
    } else {
        $('.my-grid-normal-filter-toolbar').hide();
        $('.my-grid-normal-fiter-div').addClass('hide');
        $('button.arrow').html("<i class=\"iconfont\">&#xe62d;</i>&nbsp;展开筛选")
    }
}


/*********** jQuery扩展 *************/

/**
 * 通用表单数据回显
 */
$.fn.loadForm = function (data) {
    if (Object.prototype.toString.call(data) === '[object String]') {
        data = eval('(' + data + ')');
    }
    var form = $(this);
    for (var name in data) {
        var value = data[name];
        var cc = form.find('input[name="' + name + '"][type=radio], input[name="' + name + '"][type=checkbox]');
        if (cc.length) {
            cc.each(function () {
                if (isChecked($(this).val(), value)) {
                    $(this).attr('checked', true);
                }
            });
        } else {
            form.find('input[name="' + name + '"]').val(value);
            form.find('textarea[name="' + name + '"]').val(value);
            form.find('select[name="' + name + '"]').val(value);
        }
    }

    function isChecked(val, value) {
        if (val == String(value) || $.inArray(val, $.isArray(value) ? value : [value]) >= 0) {
            return true;
        } else {
            return false;
        }
    }
};

/************** 其它 *******************/

function openMiniWindow(param) {
    if (window != window.top) {
        window.top.openMiniWindow(param);
    } else {
        mini.open(param);
    }
}

function CloseWindow(action) {
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
    else window.close();
}

function demo() {
    alert("功能紧急开发中！");
}
