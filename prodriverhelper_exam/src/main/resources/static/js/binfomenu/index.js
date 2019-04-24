
$(function () {

    var appInfo = platform.app.getInfo();
    if (appInfo) {
        $('#app-name').html(appInfo.appName);
    }

    //menu
    var menu = new BinfoMenu("#mainMenu", {
        itemclick: function (item) {
            if (!item.children || 0 == item.children.length) {
                console.log(item);
                $('.menu-title').removeClass('selected');
                $('.menu-title[data-id="' + item.id + '"]').addClass('selected');
                activeTab(item);
            }
        }
    });

    $(".sidebar").mCustomScrollbar({autoHideScrollbar: true});

    new MenuTip(menu);

    var user = platform.user.getCurrentUser();

    if (user) {
        $('#user-name').html(user.last);
        platformUtil.net.asyncAjaxData("/menu/list?userId=" + user.id, null, function (result) {
            if (result.status) {
                menu.loadData(result.data);
            }
        });
    }

    //toggle
    $("#toggle, .sidebar-toggle").click(function () {
        $('body').toggleClass('compact');
        mini.layout();
    });

    //dropdown
    $(".dropdown-toggle").click(function (event) {
        $(this).parent().addClass("open");
        return false;
    });

    $(document).click(function (event) {
        $(".dropdown").removeClass("open");
    });
});

function activeTab(item) {
    var tabs = mini.get("mainTabs");
    var tab = tabs.getTab(item.id);
    if (!tab) {
        var url = item.resUrl;
        if (url && url.indexOf("http") < 0) {
            url = platformUtil.util.url.getURL() + url;
        }
        tab = {
            name: item.id,
            title: item.resName,
            url: url,
            iconCls: item.iconCls,
            showCloseButton: true
        };
        tab = tabs.addTab(tab);
    }
    tabs.activeTab(tab);
}