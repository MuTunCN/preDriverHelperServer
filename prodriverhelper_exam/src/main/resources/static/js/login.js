if (window.self != window.top) {
    window.top.location = location;
}

$(function () {
    var appInfo = platform.app.getInfo();
    if (appInfo) {
        $('#app-name').html(appInfo.appName);
    }
});

$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        if ('' == $("#username").val()) {
            $("#username").focus();
            return;
        }
        else if ('' == $("#password").val()) {
            $("#password").focus();
            return;
        }
        $("#login").trigger("click");
    }
});

function login() {
    var loginName = $('#username').val();
    var pwd = $('#password').val();
    platform.user.login(loginName, pwd);
}
