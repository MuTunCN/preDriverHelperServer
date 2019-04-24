/**
 * Created by 33041 on 2018/11/1.
 */
function quitClient() {
    NameSpace.Qt.DefaultQuery.sendAppointSignal("quitClient", []);
}



function initCurrentUser(callback) {
    NameSpace.Qt.DefaultQuery.getCurrentUser(function (strData) {
        userInfo = JSON.parse(strData);
        callback(userInfo);
    }, function () {
        //$element.messagebox.error("初始化客户端通信接口失败");
    });
}



function onDragAreaMouseDown(e) {
    //NameSpace.Qt.invokeQtEvent(["onDragPage"]);

     let count = $(e.target).closest(".nodraw").length;//示例：.cancellation内元素忽略被拖曳
     if (count === 0) {
           NameSpace.Qt.invokeQtEvent(["onDragPage"]);
     }

};