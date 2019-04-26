__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }

    serverpath="/"+ss[3]+"/";
    return path;
};
var serverpath="";
var bootPATH = __CreateJSPath("boot.js");

//debugger
mini_debugger = false;   


//miniui
if ('undefined' == typeof($)) {
    document.write('<script src="' + bootPATH + 'jquery-1.11.3.min.js" type="text/javascript"></script>');
}
document.write('<script src="' + bootPATH + 'miniui/miniui/miniui.js" type="text/javascript" ></script>');
document.write('<link href="' + bootPATH + 'miniui/miniui/themes/default/miniui.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'miniui/miniui/themes/icons.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'miniui/miniui/themes/pure/skin.css" rel="stylesheet" type="text/css" />');

document.write('<link href="' + bootPATH + 'toastr/toastr.min.css" rel="stylesheet" type="text/css" />');
document.write('<script src="' + bootPATH + 'toastr/toastr.min.js" type="text/javascript"></script>');

// 日期JS库
document.write('<script src="' + bootPATH + 'moment/moment.js" type="text/javascript"></script>');
// document.write('<script src="' + bootPATH + 'layer.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'json2.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'platformUtil.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'platform.js" type="text/javascript"></script>');
document.write('<link href="' + bootPATH + 'exam/miniui.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'exam/skin.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'iconfont/iconfont.css" rel="stylesheet" type="text/css" />');



