/**
 * Created by huawei on 2018/10/25.
 */
(function ($) {
    let m_CurrentUser = {}, m_Server = "", m_RequestParam = {};

    $(function () {
        initCurrentUser();
        initLocalBase(loadInitData);
        addQtEventListener();

        $(document).on("click", ".user-ifo .cancellation", quitClient);//退出客户端
        //demo
        /*
         $(document).on("mousedown", ".main", onDragAreaMouseDown);//客户端拖动
         $(document).on("click", ".user-ifo .full-name", function () {
         NameSpace.Qt.DefaultQuery.sendAppointSignal("invokeNewsTips",
         JSON.stringify({
         type: 1,
         name: encodeURIComponent(encodeURIComponent("设备检修")),
         content: encodeURIComponent(encodeURIComponent("尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理." +
         "尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理." +
         "尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理." +
         "尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理." +
         "尽快到期处理,尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理.尽快到期处理")),
         openHandler: {
         wid: "xx",
         URL: "http://www.baidu.com",
         name: encodeURIComponent(encodeURIComponent("哈哈")),
         netstate: false,
         modal: false,
         width: 500,
         height: 400
         }
         })
         );
         });*/
    });

    // 初始化访问服务器请求数据
    function initLocalBase(completeEvent) {
        NameSpace.Qt.DefaultQuery.getRequestHeader(function (strHeader) {
            let requestModel = JSON.parse(strHeader);
            m_Server = requestModel["server"];
            delete requestModel["server"];
            m_RequestParam = requestModel;
            completeEvent();
        }, function () {
            alert("初始化客户端通信接口失败");
        });
    };

    function initCurrentUser() {
        NameSpace.Qt.DefaultQuery.getCurrentUser(function (strData) {
            m_CurrentUser = JSON.parse(strData);
        }, function () {
            alert("初始化客户端通信接口失败");
        });
    };

    function loadInitData() {
        countNotifyNum();
        countTaskNum();
    };

    function countNotifyNum() {
        countNotifyDraft();
        countNotifySend();
        countNotifyAccept();
        countNotifyUntreated();
    };

    function countTaskNum() {
        countTaskDraft();
        countTaskSend();
        countTaskAccept();
        countTaskUntreated();
    };

    function countNotifyDraft() {
        sendHttpClientInvoke("listNoDeployNotice", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-notify-draft").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function countNotifySend() {
        sendHttpClientInvoke("listDeployNotice", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-notify-send").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function countNotifyAccept() {
        sendHttpClientInvoke("listReadNotice", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-notify-accept").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function countNotifyUntreated() {
        sendHttpClientInvoke("listNoReadNotice", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-notify-untreated").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function countTaskDraft() {
        sendHttpClientInvoke("listNoDeployTask", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-task-draft").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function countTaskSend() {
        sendHttpClientInvoke("listDeployTask", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-task-send").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function countTaskAccept() {
        sendHttpClientInvoke("listReceiveTask", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-task-accept").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function countTaskUntreated() {
        sendHttpClientInvoke("listNoReceiveTask", "", function (result) {
            if (Boolean(result["status"])) {
                $(".count-task-untreated").html(result["data"].length);
            }
            else {
                alert(result["data"]);
            }
        });
    };

    function onDragAreaMouseDown(e) {
        let count = $(e.target).closest(".cancellation").length;
        if (count === 0) {
            NameSpace.Qt.invokeQtEvent(["onDragPage"]);
        }
    };

    // 增加任务监听
    function addQtEventListener() {
        NameSpace.Qt.addEventListener("countNotifyNum", function (p_Val) {
            countNotifyNum();
        });
        NameSpace.Qt.addEventListener("countTaskNum", function (p_Val) {
            countTaskNum();
        });
    };

    //向网厂服务器发送http接口调用
    function sendHttpClientInvoke(method, param, successFun) {
        let newJson = $.extend(true, {}, m_RequestParam);
        newJson["data"] = param;
        newJson["operation"] = method;
        NameSpace.AjaxUtils.sendPost(m_Server + "/core/client/invoke", JSON.stringify(newJson), function (data) {
            if (typeof successFun === "function")
                successFun(data);
        });
    };

    //退出客户端
    function quitClient() {
        NameSpace.Qt.DefaultQuery.sendAppointSignal("quitClient", []);
    };
})(jQuery);