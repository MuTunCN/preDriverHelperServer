layui.use('table', function() {
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        , height: 312
        , url: '/question/getAll' //数据接口
        , method:'post'
        , page: true //开启分页
        , parseData: function(res){ //res 即为原始返回的数据
            return {
                "count": res.total, //解析数据长度
            };
        }
        , cols: [[ //表头
            {field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left'}
            , {field: 'title', title: '题目', width: 80}
            , {field: 'a', title: 'a', width: 80, sort: true}
            , {field: 'b', title: 'b', width: 80}
            , {field: 'c', title: 'c', width: 177}
            , {field: 'd', title: 'd', width: 80, sort: true}
            , {field: 'explainText', title: '答案解析', width: 80, sort: true}
            , {field: 'file', title: '图片地址', width: 80}
            , {field: 'qid', title: '题目ID', width: 135, sort: true}
            , {field: 'tikuType', title: '题目类型', width: 135, sort: true}
            , {field: 'val', title: '正确答案', width: 135, sort: true}
            , {field: 'type', title: '科目', width: 135, sort: true}
        ]]
    });
});
  