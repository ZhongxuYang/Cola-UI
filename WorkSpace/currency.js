cola(function (model) {
    model.dataType({
        //查询框数据
       name: "Condition",
        properties: {
            currencyId: {
                caption: "[(#{currencyId})]",
                dataType: "number"
            },
            typeId: {
                caption: "[(#{typeId})]",
                dataType: "string"
            },
            kind: {
                caption: "[(#{kind})]",
                dataType: "string"
            },
            name: {
                caption: "[(#{name})]",
                dataType: "string"
            },
            label: {
                caption: "[(#{label})]",
                dataType: "string"
            },
            symbol: {
                caption: "[(#{symbol})]",
                dataType: "string"
            },
            sourceType: {
                caption: "[(#{sourceType})]",
                dataType: "string"
            },
            source: {
                caption: "[(#{source})]",
                dataType: "string"
            },
            businessType: {
                caption: "[(#{businessType})]",
                dataType: "string"
            },
            isBook: {
                caption: "[(#{isBook})]",
                dataType: "boolean"
            },
            locale: {
                caption: "[(#{locale})]",
                dataType: "string"
            },
            displayFormat: {
                caption: "[(#{displayFormat})]",
                dataType: "string"
            },
        }
    });

    model.dataType({
        //查询结果数据
        name: "DataTypeItem",
        properties: {
            symbol: {
                caption: "[(#{symbol})]",
                dataType: "string"
            },
            source: {
                caption: "[(#{source})]",
                dataType: "string"
            },
            locale: {
                caption: "[(#{locale})]",
                dataType: "string"
            },
            isBook: {
                caption: "[(#{isBook})]",
                dataType: "boolean"
            },
            currencyId: {
                caption: "[(#{currencyId})]",
                dataType: "number"
            },
            displayFormat: {
                caption: "[(#{displayFormat})]",
                dataType: "string"
            },
            label: {
                caption: "[(#{label})]",
                dataType: "string"
            },
            sourceType: {
                caption: "[(#{sourceType})]",
                dataType: "string"
            },
            businessType: {
                caption: "[(#{businessType})]",
                dataType: "string"
            },
            typeId: {
                caption: "[(#{typeId})]",
                dataType: "string"
            },
            kind: {
                caption: "[(#{kind})]",
                dataType: "string"
            },
            name: {
                caption: "[(#{name})]",
                dataType: "string"
            },
            description: {
                caption: "[(#{description})]",
                dataType: "string"
            },
            schemaName: {
                caption: "[(#{schemaName})]",
                dataType: "string"
            },
            partitionId: {
                caption: "[(#{partitionId})]",
                dataType: "string"
            },
            tenantId: {
                caption: "[(#{tenantId})]",
                dataType: "string"
            },
            setId: {
                caption: "[(#{setId})]",
                dataType: "string"
            },
            structureId: {
                caption: "[(#{structureId})]",
                dataType: "string"
            },
            ownerUserId: {
                caption: "[(#{ownerUserId})]",
                dataType: "number"
            },
            createDate: {
                caption: "[(#{createDate})]",
                dataType: "date"
            },
            createUserId: {
                caption: "[(#{createUserId})]",
                dataType: "number"
            },
            updateDate: {
                caption: "[(#{updateDate})]",
                dataType: "date"
            },
            updateUserId: {
                caption: "[(#{updateUserId})]",
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
            url: "controller/type/currency/findPagination?from={{$from}}&limit={{$limit}}",
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
        cola.util.update("controller/type/currency/saveAll", entityList).then(function (){
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

    //setTimeout(function(){
    //    var top = cola.widget("currencyTable").get$Dom();//获取jq的dom节点
    //    console.log(top);
    //});

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