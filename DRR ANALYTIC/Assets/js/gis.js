var map;
var right_window;
var window_right_object;
var currentQueryGeometry = null;

$(document).ready(function () {

    
   
    listerWindowResize();

    //Control Map Layout
    iniMapLayout();

    //Load Defaul map
    loadDefaulMap();

    //Load left window
    //loadLeftWindow();

    //Load  right window
    //loadRightWindow();
    

    //Load Panel Tools
    loadPanelTools();

    //Load Panel Layer
    loadPanelLayer();
       
});



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
    require(["esri/map", "esri/layers/FeatureLayer", "esri/layers/wms", "esri/toolbars/draw", "esri/tasks/FeatureSet", "esri/layers/TimeReference", "dojo/domReady!"], function (Map) {
        map = new Map("basemap_box", {
            center: [99, 11.35],
            zoom: 5,
            slider:false,
            basemap: "streets"
        });

        dojo.connect(map, "onLoad", iniGraphicBar(map), loadLeftWindow(), loadRightWindow(),loadCommonWindow());
        
        
    });
}

function iniGraphicBar(map) {
    //dojo.require("esri.toolbars.draw");
    tb = new esri.toolbars.Draw(map);
    dojo.connect(tb, "onDrawEnd", addQueryGraphic);
}

function addQueryGraphic(geometry) {



    var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([56, 93, 138]), 1), new dojo.Color([0, 0, 0, 0.5]));

    if (symbol) {
        symbol = eval(symbol);
    }
    else {
        var type = geometry.type;
        if (type === "point" || type === "multipoint") {
            symbol = tb.markerSymbol;
        }
        else if (type === "line" || type === "polyline") {
            symbol = tb.lineSymbol;
        }
        else {
            symbol = tb.fillSymbol;
        }
    }

    map.graphics.add(new esri.Graphic(geometry, symbol));
    currentQueryGeometry = geometry;

    //Disable Drawing
    tb.deactivate();

    //console.log(map);
    console.log(geometry);
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
        position: { top: 50, left: basemap_box_width }
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
        position: { top: 50, left: p_left }
    });

    //$("#right_window_btn").css("top", "50px");
    //$("#right_window_btn").css("right", "10px");
}
