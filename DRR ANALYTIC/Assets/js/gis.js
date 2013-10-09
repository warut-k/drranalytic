var map;
var right_window;
var window_right_object;
var currentQueryGeometry = null; 
var madalLoading;
var common_window;
$(document).ready(function () {

    
    

    listerWindowResize();

    //Control Map Layout
    iniMapLayout();

    //Load Defaul map
    loadDefaulMap();

    iniModalLoading();


});


function iniModalLoading() {
    madalLoading = $('#modalLoading').kendoWindow({
        modal: true,
        actions: {},
    }).data("kendoWindow").close();
}

function showModalLoading() {
    madalLoading.center();
    madalLoading.open();
}

function hideModalLoading() {
    madalLoading.close();
}


function showModalInfo() {
    $('#modalInfo').kendoWindow({
        modal: true
    });

    var win = $("#modalInfo").data("kendoWindow");
    win.center();
    win.open();
}

function hideModalInfo() {

    var win = $("#modalInfo").data("kendoWindow");
    win.close();
}



function listerWindowResize() {
    $(window).resize(function () {
        iniMapLayout();
        //loadLeftWindow();
        //loadRightWindow();
    });
}

function iniMapLayout() {
    basemap_box = $('#basemap_box');
    basemap_box.css('width', window.innerWidth);
    basemap_box.css('height', window.innerHeight-40);
    basemap_box.css('background-color', 'white');
}


function loadDefaulMap() {
    require(["esri/map", "esri/layers/FeatureLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/wms", "esri/toolbars/draw", "esri/tasks/FeatureSet", "esri/tasks/BufferParameters", "esri/tasks/GeometryService", "esri/layers/KMLLayer", "esri/layers/TimeReference", "dojo/domReady!"], function (Map) {
        /*
        map = new Map("basemap_box", {
            center: [99, 11.35],
            zoom: 6,
            slider:false,
            basemap: "streets"
        });*/
        map = new esri.Map("basemap_box", { zoom: 5, slider: false });
        var layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.3.177:6080/arcgis/rest/services/BaseMap/BaseMapWorldStreetMapNo/MapServer");
        map.addLayer(layer);
        console.log(map);        var resizeTimer;
        dojo.connect(map, 'onLoad', function (theMap) {
            dojo.connect(dijit.byId('map'), 'resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    map.resize();
                    map.reposition();
                }, 500);
            });
            iniGraphicBar(map),
            loadLeftWindow(),
            loadRightWindow(),
            loadPanelLayer(),
            loadPanelTools(),
            loadCommonWindow()
        });
    });
}

function iniGraphicBar(map) {
    //dojo.require("esri.toolbars.draw");
    tb = new esri.toolbars.Draw(map);
    dojo.connect(tb, "onDrawEnd", addQueryGraphic);
}

function addQueryGraphic(geometry) {
    //var geometryww = geometry.geometry;
    console.log(geometry.type);
    switch (geometry.type) {
        case "point":
            var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 0]), 1), new dojo.Color([0, 0, 0, 1]));
            break;
        case "polyline":
            var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 0]), 2);
            break;
        case "polygon":
            var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
            break;
        case "extent":
            var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
            break;
    }

    var graphic = new esri.Graphic(geometry, symbol);
    map.graphics.add(graphic);

    //Set new GEOMETRY to current geometer
    currentQueryGeometry = geometry;

    //Disable Drawing
    tb.deactivate();
}








function loadLeftWindow() {

    var left_window = $("#main_left_window"),
      layer_btn = $("#left_window_btn").bind("click", function () {
          left_window.data("kendoWindow").open();
          layer_btn.hide();
      });

    var onClose = function () { layer_btn.show(); }

    basemap_box = $('#basemap_box').height() - 60;

    left_window.kendoWindow({
        title: "Overlay",
        close: onClose,
        width: "260px",
        height: "auto",
        maxHeight: basemap_box + "px",
        actions: [ "Minimize", "Maximize","Close"],
        position: { top: 50, left: 10 }
    });

    $("#left_window_btn").css("top", "50px");
    $("#left_window_btn").css("left", "10px");
}

function loadRightWindow() {

    right_window = $("#main_right_window");
    var tool_btn = $("#right_window_btn").bind("click", function () {
                        right_window.data("kendoWindow").open();
                        tool_btn.hide();
                    });

    var onClose = function () { tool_btn.show(); }

    basemap_box_height = $('#basemap_box').height() - 60;
    basemap_box_width = $('#basemap_box').width() - 245;
  
    window_right_object = right_window.kendoWindow({
        title: "Analyze Tools",
        close: onClose,
        width: "233px",
        height: "auto",
        maxHeight: basemap_box_height + "px",
        actions: ["Minimize", "Maximize", "Close"],
        position: { top: 50, left: basemap_box_width },
    });

    $("#right_window_btn").css("top", "50px");
    $("#right_window_btn").css("right", "10px");
}


function loadPanelTools() {
    $.get("Page/tool/panel_tools.aspx", function (data) {
        $("#main_right_window").html(data);
    });
}

function loadPanelLayer() {
    $.get("Page/layer/panel_layer.aspx", function (data) {
        $("#main_left_window").html(data);
    });
}




function getObjectsFormJson(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjectsFormJson(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

function loadCommonWindow() {

    
    common_window = $("#common_window");

    
    var view_table_btn = $("#view_table_btn").bind("click", function () {
        common_window.data("kendoWindow").open();
        view_table_btn.attr("disabled", "disabled");
    });

    var onClose = function () { view_table_btn.removeAttr("disabled"); }

    basemap_box_height = $('#basemap_box').height() - 60;
    basemap_box_width = $('#basemap_box').width() - 600;
    p_left = ($('#basemap_box').width() - basemap_box_width) / 2;

    common_window_object = common_window.kendoWindow({
        title: "Query Result",
        close: onClose,
        width: basemap_box_width,
        height: "auto",
        maxHeight: basemap_box_height + "px",
        actions: ["Minimize", "Maximize", "Close"],
        position: { top: 50, left: p_left },
        
    });

    //$("#right_window_btn").css("top", "50px");
    //$("#right_window_btn").css("right", "10px");
}


function checkURL(value) {
    var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.|http:\/\/|https:\/\/){1}([0-9A-Za-z]+\.)");
    if (urlregex.test(value)) {
        return (true);
    }
    return (false);
}