var platform = {};

platform.user = {};

platform.app = {};

platform.user.login = function (loginName, password) {
    var param = {
        first: loginName,
        pwd: password
    };
    platformUtil.net.ajaxData(platformUtil.util.url.getURL() + "/user/login", param, 'post', false, function (data) {
        console.log(data);
        if (data.status) {
            window.location = platformUtil.util.url.getURL() + "/login.html";
        } else {
            alert("登录失败！" + data.data)
        }
    });
};

platform.user.logout = function() {
    platformUtil.net.ajaxData(platformUtil.util.url.getURL()+"/logout", {}, 'post', false,function (data) {
        if (true) {
            window.location = platformUtil.util.url.getURL() + "/login.html";
        }
    })
};

platform.user.getCurrentUser = function () {
    return platformUtil.net.syncAjaxData("/user/get-current-user", {}).user;
};

platform.app.getInfo = function () {
    return platformUtil.net.syncAjaxData("/binfo_sys/app/get_by_appid", {});
};