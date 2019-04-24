var grid;
var dbJob = [{id: "值长", text: "值长"}, {id: "主值", text: "主值"}, {id: "副值", text: "副值"}, {id: "实习", text: "实习"}];
var moduleData;
var bcData;

$(function () {
    mini.parse();
    grid = mini.get("grid");
    grid.setUrl(platformUtil.util.url.getURL() + "/user/getAllUser");
    grid.load();
    initModuleData();
    bcData = initComboBoxValue("bc");
});

var sf = [{ id: '是', text: '是' }, { id: '否', text: '否'},{id:"手动生成",text:"手动生成"},{id:"暂停执行",text:"暂停执行"}];


// function save() {
//     var rows = grid.getChanges();
//     $.each(rows, function (i) {
//         $.each(moduleData, function (j) {
//             if (rows[i].moduleName == moduleData[j].text) {
//                 rows[i].moduleId = moduleData[j].id;
//             }
//         })
//     });
//     platformUtil.net.asyncAjaxData("/timetask/updateTimeTask", {data: rows},
//         function (result) {
//             if (result.data = "success") {
//                 showTips("保存成功", "success");
//                 grid.reload();
//             }
//         })
// }
//
// function del() {
//     var rows = grid.getSelecteds();
//     if (rows.length > 0) {
//         var ids = new Array();
//         $.each(rows, function (i) {
//             ids[i] = rows[i].id;
//         });
//         platformUtil.net.asyncAjaxData("/timetask/delTimeTask", {ids: ids}, function (result) {
//             if (result.data = "success") {
//                 showTips("删除成功", "success");
//                 grid.reload();
//             }
//         })
//     } else {
//         showTips("请选择至少一条记录", "fail");
//     }
// }
//
// function create() {
//     platformUtil.net.asyncAjaxData("/timetask/insertTimeTask", {},
//         function (result) {
//             if (result.data = "success") {
//                 grid.reload();
//             }
//         })
// }
//
// function search() {
//     var key = mini.get("key").getValue();
//     grid.load({key:key});
// }
// function onKeyEnter(e) {
//     search();
// }
//
//
// function showTips(content, state) {
//     mini.showTips({
//             content: content,
//             state: state,
//             x: "center",
//             y: "center",
//             timeout: 500
//         }
//     )
// }

function initModuleData() {
    moduleData = platformUtil.net.syncAjaxData("/define/getComboboxValue", {});
}

function initComboBoxValue(enumName) {
    var result = platformUtil.net.syncAjaxData("/define/getEnumValue", {"enumName":enumName});
    return result;
}


function openRule() {
    var type = "时";
    mini.open({
        url: platformUtil.util.url.getURL() + "/views/app/cron/cron.html?type=" + type,
        title: '规则定义',
        width: '850px',
        height: "620px",
        showModal: true,
        ondestroy: function (action) {
            if ('ok' == action) {
                // grid.reload();
                var iframe = this.getIFrameEl();
                var dd = iframe.contentWindow;
                mini.get("rule").setValue(dd.document.getElementById("cron").value);
            }
        }
    })
}
