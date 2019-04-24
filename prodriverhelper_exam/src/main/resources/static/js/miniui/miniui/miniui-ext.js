/**
 * Created by tian_ on 2017-04-01.
 */
mini.addControl = function (control, name) {
    ol01(control, name);
};
mini.addColumnType = function (name, columnType) {
    mini.o11O1[columnType._type] = function (_) {
        return mini.copyTo(columnType, _);
    };
};
mini.createControl = function (newcontrol, params) {
    oOo0o1(newcontrol, ooolo0, params);
};

mini.doDelegate = function (delegate, param) {
    if (delegate && delegate.length > 0) {
        for (var i = 0; i < delegate.length > 0; i++) {
            param["sender"] = delegate[i][1];
            delegate[i][0](param);
        }
    }
};
var singleFile = function () {
    singleFile["superclass"]["constructor"].apply(this, arguments);
    this["_create"]();
    this["_initEvents"]();
};
mini.createControl(singleFile, {
    "uiCls": "mini-singlefile", "iconcls": "", "field": "", "value": "", "formField": true, "enabled": true
});
var siglepro = singleFile["prototype"];
siglepro["_create"] = function () {
    this.el = document.createElement("div");
    this.el.className = "mini-custom-singlefile";
    var aref = '<a href="javascript:void(0)" title="" class="alink" style="text-align: left;float: left;width: 40%;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow: ellipsis;"></a>';
    var add = '<a class="mini-button"  iconCls="icon-add">上传</a>';
    var del = '<a class="mini-button"  iconCls="icon-remove" >删除</a>';
    var file = '<input type="file" rowIndex="" columnIndex="" name="file" style="display: none;" id=""   />';
    this.el.innerHTML = '<span class="mini-buttonedit-border"><div style="width: 100%;height:24px;line-height:24px;">' + aref + '<div style="position: absolute;right:0px;white-space:nowrap;margin:0 auto;">' + add + del + file + '</div></div></span>';

};
siglepro["_initEvents"] = function () {
    var that = this;
    this.el.addEventListener('click',
        function (ev) {
            var html = $(ev.target);
            var css = html.attr("class");
            var text = html.text();
            var event = {"el": this, "sender": that}
            if ("上传" == text || (css && css.indexOf("icon-add") >= 0)) {
                event["type"] = "onAddClick";
                that.onAddClick(event);
            }
            else if ("删除" == text || (css && css.indexOf("icon-remove") >= 0)) {
                event["type"] = "onDelClick";
                that.onDelClick(event);
            }
            else if ((css && css.indexOf("alink") >= 0)) {
                event["type"] = "onLinklClick";
                that.onLinklClick(event);
            }
        }
    );
};
siglepro["getAttrs"] = function (_) {
    var attr = {};
    var data = $(_);

    attr.field = data.attr("field");


    attr.name = data.attr("name");

    attr.iconcls = data.attr("iconcls");

    if (data.attr("id")) {
        attr.id = data.attr("id");
    }
    else {
        attr.id = this.id;
    }
    attr.onaddclick = data.attr("onaddclick");

    attr.ondelclick = data.attr("ondelclick");

    attr.onlinkclick = data.attr("onlinkclick");

    return attr;
};
siglepro["destroy"] = function (_) {
    if (this.el) {
        this.el.onclick = null;
        this.el.onmousedown = null
    }
    singleFile["superclass"]["destroy"]["call"](this, $);
};
siglepro["doUpdate"] = function () {
    $(this.el).find(".alink").text(this.value);
    if (!this.getEnabled()) {
        $(this.el).find(".mini-button").css("display", "none");
    }
    else {
        $(this.el).find(".mini-button").css("display", "");
    }
};
siglepro.o1o1 = function ($) {
};
siglepro["set"] = function ($) {
    if (typeof $ == "string")return this;
    singleFile["superclass"]["set"]["call"](this, $);
    this.events = this.Ol10l;
    this["doUpdate"]();
    return this;
};
siglepro["setEnabled"] = function (_) {
    this.enabled = _;
    this["doUpdate"]();
};
siglepro["getEnabled"] = function () {
    return this.enabled;
};
siglepro["render"] = function (_) {
    alert(1);
};
siglepro["setValue"] = function (_) {
    this.value = _;
    this["doUpdate"]();
};
siglepro["getValue"] = function () {
    return this.value;
};
siglepro["setName"] = function (_) {
    this.name = _;
    this["doUpdate"]();
};
siglepro["getName"] = function () {
    return this.name;
};
siglepro["onAddClick"] = function (_) {
    if (this.events.addclick) {
        mini.doDelegate(this.events.addclick, _);
    }
};
siglepro["onDelClick"] = function (_) {
    if (this.events.delclick) {
        mini.doDelegate(this.events.delclick, _);
    }
};
siglepro["onLinklClick"] = function (_) {
    if (this.events.linkclick) {
        mini.doDelegate(this.events.linkclick, _);
    }
};
mini.addControl(singleFile, "singlefile");


mini.addColumnType("singlefilecolumn", {
    _type: "singlefilecolumn", editMode: "inline", getCheckId: function (c, b) {
        return this._gridUID + "singlefilecolumn" + c[this._rowIdField] + "$" + b._id;
    },
    "init": function (e) {
        function click(_) {
            if ("singlefilecolumn" != _.column.type) {
                return;
            }

            if (_.column == this) {
                var j = this.getCheckId(_.record, _.column);
                var html = $(_.htmlEvent.target);
                var css = html.attr("class");
                var childrenclass = html.children().attr("class");
                if ((css && css.indexOf("icon-add") >= 0) || (childrenclass && childrenclass.indexOf("icon-add"))) {
                    if ((j + "add") != _.htmlEvent.target.id) {
                        return;
                    }
                    if (!_.sender.getAllowCellEdit()) {
                        return;
                    }
                    _["type"] = "addclick";
                    _["value"] = $(_).parent().parent().parent().find('a[class=alink]').text();
                    _.sender["fire"]("cellbeginedit", _);

                }
                else if ((css && css.indexOf("icon-remove") >= 0) || (childrenclass && childrenclass.indexOf("icon-remove"))) {
                    if ((j + "remove") != _.htmlEvent.target.id) {
                        return;
                    }
                    if (!_.sender.getAllowCellEdit()) {
                        return;
                    }
                    _["type"] = "delclick";
                    _["value"] = $(_.htmlEvent.target).parent().parent().parent().find("a[class=alink]").text();
                    _.sender["fire"]("cellbeginedit", _);
                }
                else if ((css && css.indexOf("alink") >= 0)) {
                    if ((j + "alink") != _.htmlEvent.target.id) {
                        return;
                    }
                    _["type"] = "linkclick";
                    _["value"] = $(_.htmlEvent.target).parent().parent().parent().find("a[class=alink]").text();
                    _.sender["fire"]("cellbeginedit", _);
                }
            }
        }

        e["on"]("cellclick", click, this);
    }
    ,
    "renderer": function (e) {
        var display = "display:none;";
        var linkwidth = "80%";
        var id = this.getCheckId(e.record, e.column);
        if (e.sender.getAllowCellEdit()) {
            display = "";
            linkwidth = "40%";
        }
        var aref = '<a href="javascript:void(0)" id="' + id + 'alink" class="alink" title="' + e.record[e.field] + '" style="text-align: left;float: left;width: ' + linkwidth + ';overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow: ellipsis;" >' + e.record[e.field] + '</a>';
        var add = '<a href="javascript:void(0)" style="width:15px;height: 15px;' + display + '"  class="mini-button" type="button"  ><span id="' + id + 'add" class="mini-button-icon icon-add" style="position: absolute;left:0px;top:60%;width:15px;height: 15px;"  ></span></a>';
        var del = '<a href="javascript:void(0)" style="width:15px;height: 15px;' + display + '"  class="mini-button" type="button"   ><span id="' + id + 'remove" class="mini-button-icon icon-remove" style="position: absolute;left:0px;top:60%;width:15px;height: 15px;" ></span></a>';
        return '<div style="width: 100%;    ">' + aref + '<div style="float: right;white-space:nowrap;">' + add + del + '</div></div>';//+file
    }

});

mini.addColumnType("multiplefilecolumn", {
    _type: "multiplefilecolumn", editMode: "inline", getCheckId: function (c, b) {
        return this._gridUID + "multiplefilecolumn" + c[this._rowIdField] + "$" + b._id;
    },
    "init": function (e) {
        function click(_) {
            if ("multiplefilecolumn" != _.column.type) {
                return;
            }
            var j = this.getCheckId(_.record, _.column);
            var html = $(_.htmlEvent.target);
            var css = html.attr("class");
            if (css && css.indexOf("icon-folder") >= 0) {
                if ((j + "folder") != _.htmlEvent.target.id) {
                    return;
                }
                _["type"] = "multiplefileclick";
                _.sender["fire"]("cellbeginedit", _);
            }
        }

        e["on"]("cellclick", click, this);

    },
    "renderer": function (e) {
        var id=this.getCheckId(e.record, e.column);
        return '<div style="width: 100%;"><a href="javascript:void(0)" style="width:15px;height: 15px;"  class="mini-button" type="button"  ><span id="'+id+'folder" class="mini-button-icon icon-folder" style="position: absolute;left:0px;top:60%;width:15px;height: 15px;"  ></span></a></div>';//+file
    }

});
mini.addColumnType("imagecolumn", {
    _type: "imagecolumn", editMode: "inline",getCheckId: function (c, b) {
        return this._gridUID + "imagecolumn" + c[this._rowIdField] + "$" + b._id;
    },
    "init": function (e) {
        function click(_) {
            if ("imagecolumn" != _.column.type) {
                return;
            }
            var j = this.getCheckId(_.record, _.column);
            var html = $(_.htmlEvent.target);
            var css = html.attr("class");
            var childrenclass = html.children().attr("class");
            if ((css && css.indexOf("icon-noimage") >= 0) || (childrenclass && childrenclass.indexOf("icon-folder"))) {
                if ((j + "noimage") != _.htmlEvent.target.id) {
                    return;
                }
                _["type"] = "imageclick";
                _.sender["fire"]("cellbeginedit", _);
            }
        }

        e["on"]("cellclick", click, this);

    },
    "renderer": function (e) {
        var id=this.getCheckId(e.record, e.column);
        return '<div style="width: 100%;"><a href="javascript:void(0)" style="width:15px;height: 15px;"  class="mini-button " type="button"  ><span id="'+id+'noimage" class="mini-button-icon icon-noimage" style="position: absolute;left:0px;top:60%;width:15px;height: 15px;"  ></span></a></div>';//+file
    }

});
mini.addColumnType("kindeditorcolumn", {
    _type: "kindeditorcolumn", editMode: "inline",getCheckId: function (c, b) {
        return this._gridUID + "kindeditorcolumn" + c[this._rowIdField] + "$" + b._id;
    },
    "init": function (e) {
        function click(_) {
            if ("kindeditorcolumn" != _.column.type) {
                return;
            }
            var j = this.getCheckId(_.record, _.column);
            var html = $(_.htmlEvent.target);
            var css = html.attr("class");
            var childrenclass = html.children().attr("class");
            if ((css && css.indexOf("icon-edit") >= 0) || (childrenclass && childrenclass.indexOf("icon-edit"))) {
                if ((j + "edit") != _.htmlEvent.target.id) {
                    return;
                }
                _["type"] = "kindeditorclick";
                _.sender["fire"]("cellbeginedit", _);
            }
        }

        e["on"]("cellclick", click, this);

    },
    "renderer": function (e) {
        var id=this.getCheckId(e.record, e.column);
        return '<div style="width: 100%;"><a href="javascript:void(0)" style="width:15px;height: 15px;"  class="mini-button " type="button"  ><span id="'+id+'edit" class="mini-button-icon icon-edit" style="position: absolute;left:0px;top:60%;width:15px;height: 15px;"  ></span></a></div>';//+file
    }

});