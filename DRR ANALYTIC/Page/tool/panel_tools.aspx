<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="panel_tools.aspx.cs" Inherits="DRR_ANALYTIC.Page.panel_tools" %>

<style>
    .toolArea {width:90%;background-color:gray;margin:0px auto}
</style>

<ul id="tool_panel">
    <li>
        เครื่องมือค้นหา
        <div id="query_tool" style="margin:8px;padding-bottom:8px">
            กำลังโหลดเครื่องมือ...
        </div>
    </li>
    <li class="">
        การรวมขอบเขต (Union)
        <div id="union_tool" style="margin:8px;padding-bottom:8px">
            กำลังโหลดเครื่องมือ...
        </div>
    </li>
    <li >
        ขอบเขตที่ซ้ำซ้อนกัน (Intersect)
        <div id="intersect_tool" style="margin:8px;padding-bottom:8px">
            กำลังโหลดเครื่องมือ...
        </div>
    </li>
    <li class="">
        ขยาย/ลดขอบเขต (Buffer)
        <div id="buffer_tool" style="margin:8px;padding-bottom:8px">
            กำลังโหลดเครื่องมือ...
        </div>
    </li>
</ul>               
        
<script>
    $(document).ready(function () {

        //Set initial tool panel style
        $("#tool_panel").kendoPanelBar({
            expandMode: "single"
        });

        //Load Tool
        loadQueryTool();
        loadUnionTool();
        loadIntersectTool();
        loadBufferTool();
    });

    function loadQueryTool() {
        $.get("Page/tool/querytool.aspx", function (data) {
            $("#query_tool").html(data);
        });
    }

    function loadUnionTool() {
        $.get("Page/tool/uniontool.aspx", function (data) {
            $("#union_tool").html(data);
        });
    }

    function loadIntersectTool() {
        $.get("Page/tool/intersecttool.aspx", function (data) {
            $("#intersect_tool").html(data);
        });
    }

    function loadBufferTool() {
        $.get("Page/tool/buffertool.aspx", function (data) {
            $("#buffer_tool").html(data);
        });
    }
</script>
