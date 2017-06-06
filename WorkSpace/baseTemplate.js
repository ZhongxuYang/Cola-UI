cola(function (model) {
    model.dataType({
        //查询框数据
        name: "Condition",
        properties: {
            code: {
                caption: "code"
            },
            typeId: {
                caption: "类型",
                dataType: "string"
            },
            name: {
                caption: "名称",
                dataType: "string"
            },
            template: {
                caption: "template",
                dataType: "string"
            },
            status: {
                caption: "状态",
                dataType: "string"
            },
            baseTemplateId: {
                caption: "baseTemplateId",
                dataType: "number"
            }
        }
    });

    model.dataType({
        //查询结果数据
        name: "DataTypeItem",
        properties: {
            baseTemplateId: {
                caption: "baseTemplateId",
                dataType: "number"
            },
            code: {
                caption: "code"
            },
            typeId: {
                caption: "类型",
                dataType: "string"
            },
            name: {
                caption: "名称",
                dataType: "string"
            },
            template: {
                caption: "template",
                dataType: "string"
            },
            status: {
                caption: "状态",
                dataType: "string"
            },
            ownerUserId: {
                caption: "所有者编号",
                dataType: "number"
            },
            createDate: {
                caption: "创建日期",
                dataType: "date"
            },
            createUserId: {
                caption: "创建用户编号",
                dataType: "number"
            },
            updateDate: {
                caption: "最近修改日期",
                dataType: "date"
            },
            updateUserId: {
                caption: "修改用户编号",
                dataType: "number"
            }
        }
    });

    model.describe("condition","Condition");
    model.set("condition",{});
    model.describe("dataTypeItem",{
        dataType: "DataTypeItem",
        provider: {
            name: "providerItems",
            url: "controller/type/baseTemplate/findPagination?from={{$from}}&limit={{$limit}}",
            pageSize: 10,
            sendJson: true,
            method: "POST",
            parameter: "{{condition}}",
            ajaxOptions: {
                contentType: "application/json",
                sendJson: true
            }
        }
    });

    function saveCurrency() {
        //把本地数据上传服务器
        var entityList = model.get("dataTypeItem");
        cola.util.update("controller/type/baseTemplate/saveAll", entityList).then(function (){
            cola.NotifyTipManager.info({
                message: "系统消息",
                description: "校验器列表保存成功!",
                showDuration: 5000
            });
        }).fail(function (result) {
            if (result === "NO_DATA") {
                cola.alert("没有需要提交的数据!");
            }
        })
    }

    model.action({
        query: function () {
            //查询
            model.flush("dataTypeItem");//flush-刷新
        },
        reset: function () {
            //重置
            model.set("condition", {});
        },
        add: function () {
            //添加
            var entity =  model.get("dataTypeItem");//获取当前项
            entity.insert({});
        },
        del: function () {
            //删除
            var entityList = model.get("dataTypeItem");
            cola.confirm("确认删除已选校验器?",function () {
                entityList.each(function (entity) {
                    if (entity.get("selected")) {
                        entity.remove();
                    }
                });
                saveCurrency();
            });
        },
        edit: function () {
            //编辑
            cola.widget("dialog").show();
        },
        back: function () {
            //返回
            cola.widget("dialog").hide();
        },
        save: function () {
            //保存
            saveCurrency();
        }
    });
})