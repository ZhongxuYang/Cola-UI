cola(function (model) {
    model.dataType({
        //查询框数据
        name: "Condition",
        properties: {
            typeId: {
                caption: "类型",
                dataType: "string"
                //11001
            },
            name: {
                caption: "名称"
            },
            label: {
                caption: "标签"
            }
        }
    });

    model.dataType({
        //查询结果数据
        name: "DataTypeItem",
        properties: {
            labelId: {
                caption: "标签编号",
                dataType: "number"
            },
            typeId: {
                caption: "类型",
                dataType: "string"
                //11001
            },
            kind: {
                caption: "短名"
            },
            label: {
                caption: "标签"
            },
            name: {
                caption: "名称",
                dataType: "string"
            },
            tip: {
                caption: "提示信息"
            },
            description: {
                caption: "说明描述"
            },
            schemaName: {
                caption: "分表名称"
            },
            partitionId: {
                caption: "分区码"
            },
            tenantId: {
                caption: "客户公司编号"
            },
            setId: {
                caption: "配置集编号"
            },
            structureId: {
                caption: "公司机构编号"
            },
            ownerUserId: {
                caption: "所有者编号"
            },
            createDate: {
                caption: "创建日期",
                dataType: "date"
            },
            updateDate: {
                caption: "最近修改日期",
                dataType: "date"
            },
            createUserId: {
                caption: "创建用户编号",
                dataType: "number"
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
            url: "controller/type/languageLabel/findPagination?from={{$from}}&limit={{$limit}}",
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
        var entityList = model.get("dataTypeItem");
        cola.util.update("controller/type/languageLabel/saveAll", entityList).then(function (){
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