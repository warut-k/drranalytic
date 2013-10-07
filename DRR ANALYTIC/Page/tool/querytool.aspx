<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="querytool.aspx.cs" Inherits="DRR_ANALYTIC.Page.tool.querytools" %>
<style>
    .btn_style {
        margin-top:3px;
    }
</style>
<script>

    $(document).ready(function () {
        initialDefaulLayer();
    });

    $("#layerType").kendoDropDownList({
        change: onLayerTypeSelect
    });

    function onLayerTypeSelect() {
        var value = $("#layerType").val();
        if (value == "DF") { initialDefaulLayer();
        } else if (value == "AL") {initialAnalyticLayer(); 
        } else if (value == "AM") { initialAddMoreLayer(); }
    };

    ///////////////////////////////////////////////////////////////////
    function initialDefaulLayer()
    {
        $("#targetQueryLayer").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "sid",
            dataSource: defaulServiceDataSources,
            change : readSubServiceOfDefaultLayers
        });

        $("#subLayerBox").css("display", "");
        $("#layerBox").css("display", "");
        readSubServiceOfDefaultLayers();
    }

    function initialAnalyticLayer() {
        //Implement here
        $("#layerBox").css("display", "none");
        $("#subTargetQueryLayer").kendoDropDownList({
            dataSource: null
        });
        //alert("Coming Soon AL");
        $("#subLayerBox").css("display", "");
    }

    function initialAddMoreLayer() {
        //Implement here
        $("#layerBox").css("display", "none");

        $("#subTargetQueryLayer").kendoDropDownList({
            dataSource: null
        });

        //alert("Coming Soon AM");
        $("#subLayerBox").css("display", "");
    }
    /////////////////////////////////////////////////////////////////////

    function readSubServiceOfDefaultLayers() {

        var rootServiceId = $("#targetQueryLayer").val();
        var result = getObjectsFormJson(defaulServiceDataSources, "sid", rootServiceId);
        subServiceList = result[0].items;

        $("#subTargetQueryLayer").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "sid",
            dataSource: subServiceList,
            change: function (e) {
                //$('#queryAttrtxt').attr("placeholder",e.dataTextField);
            }
        });

        $("#subLayerBox").css("display", "");
    }



</script>
<div style="padding:4px;background-color:#f6f6f6">
    <select id="layerType" style="width: 100%">
        <option value="DF">ชั้นข้อมูล-Default</option>
        <option value="AL">Analytic Layers</option>
        <option value="AM">Added Service Layers</option>
    </select>
    <div id="layerBox" ><input id="targetQueryLayer" style="width:100%"/></div>
    <div id="subLayerBox" style="display:none"><input id="subTargetQueryLayer" style="width:100%;"/></div>
</div>
<div style="margin-top:7px;padding:4px;background-color:#f6f6f6">
    <input type="text" placeholder="ระบุคำค้นหา" class="k-textbox" style="width:100%;margin-top:0px" id="queryAttrtxt" value="นคร"/>
    <button class="k-button btn_style" onclick="tb.activate(esri.toolbars.Draw.POLYGON);" title="POLYGON"><img class="imgIcon16" src="../../Assets/image/gisimg/polygon-icon.png" /></button>
    <button class="k-button btn_style" onclick="tb.activate(esri.toolbars.Draw.CIRCLE);" title="CIRCLE"><img class="imgIcon16" src="../../Assets/image/gisimg/circle-icon.png" /></button>
    <button class="k-button btn_style" onclick="tb.activate(esri.toolbars.Draw.EXTENT);" title="EXTENT"><img class="imgIcon16" src="../../Assets/image/gisimg/square-icon.png"   /></button>
    <button class="k-button btn_style" onclick="tb.activate(esri.toolbars.Draw.LINE);" title="LINE"><img class="imgIcon16" src="../../Assets/image/gisimg/line-icon.png"   /></button>
    <button class="k-button btn_style" onclick="tb.activate(esri.toolbars.Draw.POLYLINE);" title="POLYLINE"><img class="imgIcon16" src="../../Assets/image/gisimg/polyline-icon.png"   /></button>
    <button class="k-button btn_style" onclick="tb.activate(esri.toolbars.Draw.POINT);" title="POINT"><img class="imgIcon16" src="../../Assets/image/gisimg/point-icon.png"   /></button>
    <button class="k-button btn_style" onclick="tb.deactivate()" title="Defaul Cursor"><img class="imgIcon16" src="../../Assets/image/gisimg/pointer-icon.png"   /></button>
    <button class="k-button btn_style" onclick="resetNewQuery()" title="Reset"><img class="imgIcon16" src="../../Assets/image/gisimg/clear-icon.png"   /></button>
</div>

<div style="margin-top:7px;">
    <div style="display:inline">
        <button class="k-button btn_style" onclick="queryLayer()" style="height:33px"><span class="k-icon k-i-search"> </span> ค้นหา</button>
    </div>
    <div style="display:inline;display:none" id="result_tool_box">
        <button class="k-button btn_style" onclick="viewResuslAsTable()" id="view_table_btn"><img class="imgIcon16" src="../../Assets/image/gisimg/table-icon.png"   /></button>
        <button class="k-button btn_style" onclick="tableToExcel()"><img class="imgIcon16" src="../../Assets/image/gisimg/excel-icon.png"   /></button>
        <button class="k-button btn_style" onclick="addQueryRerultToAnyticLayer()"><img class="imgIcon16" src="../../Assets/image/gisimg/save-query-icon.png"   /></button>
    </div>
</div>