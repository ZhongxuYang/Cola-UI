cola(function (model) {
    model.dataType({
        //查询框数据
        name: "Condition",
        properties: {
            sessionPreferenceId: {
                caption: "sessionPreferenceId",
            },
            structureId: {
                caption: "公司机构编号"
            },
            locale: {
                caption: "国别语言"
            },
            partyId: {
                caption: "客户代码"
            },
            userId: {
                caption: "用户编号"
            },
            userName: {
                caption: "用户名"
            },
            charset: {
                caption: "charset"
            }
        }
    });

    model.dataType({
        //查询结果数据
        name: "DataTypeItem",
        properties: {
            sessionPreferenceId: {
                caption: "sessionPreferenceId",
                dataType: "number"
            },
            locale: {
                caption: "国别语言"
            },
            partyId: {
                caption: "客户代码"
            },
            structureId: {
                caption: "公司机构编号"
            },
            productId: {
                caption: "产品"
            },
            caseDefinitionId: {
                caption: "案卷定义编号"
            },
            partitionId: {
                caption: "分区码"
            },
            userName: {
                caption: "用户名"
            },
            userId: {
                caption: "用户编号"
            },
            tenantId: {
                caption: "客户公司编号"
            },
            entityManagerFactory: {
                caption: "entityManagerFactory"
            },
            currency: {
                caption: "币种"
            },
            theme: {
                caption: "theme"
            },
            charset: {
                caption: "charset"
            },
            clientDevice: {
                caption: "clientDevice"
            },
            viewType: {
                caption: "可视类型"
            },
            dataSource: {
                caption: "dataSource"
            },
            timestampFormatZone: {
                caption: "timestampFormatZone"
            },
            dateFormat: {
                caption: "dateFormat"
            },
            timeFormatZone: {
                caption: "timeFormatZone"
            },
            timeZone: {
                caption: "时区"
            },
            datetimeFormat: {
                caption: "datetimeFormat"
            },
            yearMonthFormat: {
                caption: "yearMonthFormat"
            },
            fiscalMonth: {
                caption: "fiscalMonth"
            },
            yearMonthFormatZone: {
                caption: "yearMonthFormatZone"
            },
            yearmonthFormat: {
                caption: "yearmonthFormat"
            }
        }
    });

    model.describe("condition","Condition");
    model.set("condition",{});
    model.describe("dataTypeItem",{
        dataType: "DataTypeItem",
        provider: {
            name: "providerItems",
            url: "controller/type/session/sessionPreference/findPagination?from={{$from}}&limit={{$limit}}",
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
        cola.util.update("controller/type/session/sessionPreference/saveAll", entityList).then(function (){
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