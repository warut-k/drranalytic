<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default_layer.aspx.cs" Inherits="DRR_ANALYTIC.Page.layer.default_layer" %>

<h3>ชั้นข้อมูล</h3>
<input type="checkbox" checked="checked"/>แผนที่ฐาน (L7018) <a href="#">เปลี่ยน</a>
<div id="treeview"></div>

    <script>
        $("#treeview").kendoTreeView({
            checkboxes: {
                checkChildren: false
            },
            dataSource: defaulServiceDataSources
        });

        $("#treeview").data("kendoTreeView").dataSource.bind("change", function (e) {       
            var serviceId = e.items[0].sid;
            if (serviceId.indexOf("ROOT") < 0) {
                handleLayerByCheckBox(e);                
            }
        });

        // function that gathers IDs of checked nodes
        function checkedNodeIds(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].checked) {
                    checkedNodes.push(nodes[i].sid);
                }

                if (nodes[i].hasChildren) {
                    checkedNodeIds(nodes[i].children.view());
                }
            }
        }

        // show checked node IDs on datasource change
        function showChecked() {
            var treeView = $("#treeview").data("kendoTreeView");

            checkedNodeIds(treeView.dataSource.view());
        }
    </script>

