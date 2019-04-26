var grid;
var moduleData;
var bcData;

$(function () {
    mini.parse();
    grid = mini.get("grid");
    grid.setUrl("/question/get");
    grid.load();
});



function save() {
    var rows = grid.getChanges();
    platformUtil.net.asyncAjaxData("/question/update", {data: rows},
        function (result) {
            if (result.data === "success") {
                showTips("保存成功", "success");
                grid.reload();
            }
        })
}

function del() {
    var rows = grid.getSelecteds();
    if (rows.length > 0) {
        var ids = new Array();
        $.each(rows, function (i) {
            ids[i] = rows[i].id;
        });
    console.log(ids)
        platformUtil.net.asyncAjaxData("/question/del", {ids: ids}, function (result) {
            if (result.data === "success") {
                showTips("删除成功", "success");
                grid.reload();
            }
        })
    } else {
        showTips("请选择至少一条记录", "fail");
    }
}

function insertUser() {

    platformUtil.net.asyncAjaxData("/question/insert", {},
        function (result) {
            if (result.data === "success") {
                grid.reload();
            }
        })
}

function search() {
    var key = mini.get("key").getValue();
    grid.load({key:key});
}
function onKeyEnter(e) {
    search();
}



function showTips(content, state) {
    mini.showTips({
            content: content,
            state: state,
            x: "center",
            y: "center",
            timeout: 500
        }
    )
}
