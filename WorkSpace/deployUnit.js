cola(function (model) {
    model.dataType({
        name: "Condition",
        properties: {
            deployUnitId: {
                caption: "部署单元编号",
                dataType: "number"
            },
            typeId: {
                caption: "类型"
            },
            kind: {
                caption: "短名"
            },
            name: {
                caption: "名称"
            }
        }
    });

    model.dataType({
        name: "DeployUnit",
        properties: {
            deployUnitId: {
                caption: "部署单元编号"
            },
            typeId: {
                caption: "类型"
            },
            kind: {
                caption: "短名"
            },
            name: {
                caption: "名称"
            },
            ip: {
                caption: "IP地址"
            },
            port: {
                caption: "端口"
            },
            domainName: {
                caption: "域名"
            },
            contextName: {
                caption: "环境名称"
            },
            startPage: {
                caption: "起始页"
            },
            testPage: {
                caption: "测试页"
            },
            checkString: {
                caption: "验证码"
            },
            hostname: {
                caption: "hostname"
            },
            tickTime: {
                caption: "tickTime"
            },
            dataDir: {
                caption: "dataDir"
            },
            clientPort: {
                caption: "clientPort"
            },
            initLimit: {
                caption: "initLimit"
            },
            syncLimit: {
                caption: "syncLimit"
            },
            description: {
                caption: "说明描述"
            },
            ownerUserId: {
                caption: "所有者编号"
            },
            tenantId: {
                caption: "租户编号"
            },
            partitionId: {
                caption: "分区码"
            },
            createDate: {
                caption: "创建日期"
            },
            updateDate: {
                caption: "最近修改时间"
            },
            createUserId: {
                caption: "创建用户编号"
            },
            updateUserId: {
                caption: "修改用户编号"
            },
            key: {
                caption: "流程键值"
            },
            deploynode: {
                provider: {
                    url: "controller/esb/deployNode/deploynode.findObjectsByUnitId?deployUnitId={{@deployUnitId}}",
                    beforeSend: function (self,arg) {
                        var deployUnitId = model.get("deployUnit.deployUnitId");
                        if (!deployUnitId) {
                            return false;
                        }
                    }
                },
                dataType: {
                    properties: {
                        deployNodeId: {
                            caption: "部署节点编号"
                        },
                        status: {
                            caption: "状态"
                        },
                        statusDate: {
                            caption: "状态日期"
                        },
                        statusReason: {
                            caption: "状态原因"
                        },
                        deployUnitId: {
                            caption: "部署单元编号",
                        },
                        typeId: {
                            caption: "类型"
                        },
                        kind: {
                            caption: "短名"
                        },
                        name: {
                            caption: "名称"
                        },
                        ip: {
                            caption: "IP地址"
                        },
                        port: {
                            caption: "端口"
                        },
                        domainName: {
                            caption: "域名"
                        },
                        contextName: {
                            caption: "环境名称"
                        },
                        description: {
                            caption: "说明描述"
                        },
                        ownerUserId: {
                            caption: "所有者编号"
                        },
                        tenantId: {
                            caption: "租户编号"
                        },
                        partitionId: {
                            caption: "分区码"
                        },
                        createDate: {
                            caption: "创建日期"
                        },
                        updateDate: {
                            caption: "最近修改时间"
                        },
                        createUserId: {
                            caption: "创建用户编号"
                        },
                        updateUserId: {
                            caption: "修改用户编号"
                        }
                    }
                }
            }
        }
    });

    model.describe("condition","Condition");
    model.set("condition",{});
    model.describe("deployUnit",{
        dataType: "DeployUnit",
        provider: {
            url: "controller/esb/deployUnit/findPagination?from={{$from}}&limit={{$limit}}",
            name: "deployUnitProvider",
            pageSize: 10,
            method: "POST",
            parameter: "{{condition}}",
            ajaxOptions: {
                contentType: "application/json",
                sendJson: true
            }
        }
    })

    function saveDeployUnit() {
        var entityList = model.get("deployUnit");
        cola.util.update("controller/esb/deployUnit/saveAll",entityList).then(function (){
            cola.NotifyTipManager.info({
                message: "系统消息",
                description: "校验器列表保存成功!",
                showDuration: 5000
            });
        }).fail(function (result) {
            if (result === "NO_DATA") {
                cola.alert("没有需要提交的数据!")
            }
        })
    };

    function saveDeploynode() {
        var entityList = model.get("deployUnit.deploynode");
        cola.util.update("controller/esb/deploynode/saveAll",entityList).then(function (){
            cola.NotifyTipManager.info({
                message: "系统消息",
                description: "校验器列表保存成功!",
                showDuration: 5000
            });
        }).fail(function (result) {
            if (result === "NO_DATA") {
                cola.alert("没有需要提交的数据!")
            }
        })
    };

    model.action({
        query: function () {
            model.flush("deployUnit");
        },
        reset: function () {
            model.set("condition", {});
        },
        add: function () {
            var entityList = model.get("deployUnit");
            entityList.insert({});
        },
        del: function () {
            var entityList = model.get("deployUnit");
            cola.confirm("确认删除已选?", function () {
                entityList.each(function (entity) {
                    if (entity.get("selected")) {
                        entity.remove();
                    }
                })
                saveDeployUnit();
            })
        },
        edit: function () {
            cola.widget("attributeDialog1").show();
        },
        back: function () {
            cola.widget("attributeDialog1").hide();
        },
        save: function () {
            saveDeployUnit();
        },
        dis: function () {
            cola.widget("dis").show();
        },
        disBack: function () {
            cola.widget("dis").hide();
        },
        addChild: function () {
            var entityList = model.get("deployUnit.deploynode");
            entityList.insert({});
        },
        delChild: function () {
            var entityList = model.get("deployUnit.deploynode");
            cola.confirm("确认删除已选?", function () {
                entityList.each(function (entity) {
                    if (entity.get("selected")) {
                        entity.remove();
                    }
                })
                saveDeployUnit();
            })
        },
        editChild: function () {
            cola.widget("attributeDialog2").show();
        },
        backChild: function () {
            cola.widget("attributeDialog2").hide();
        },
        saveChild: function () {
            saveDeploynode();
        }
    });
});
