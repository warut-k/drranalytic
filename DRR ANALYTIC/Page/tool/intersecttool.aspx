<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="intersecttool.aspx.cs" Inherits="DRR_ANALYTIC.Page.tool.intersecttool" %>
<style>
  #sortable { list-style-type: none; margin: 10px 0px 0px 0px; padding: 0; width: 100%; }
  #sortable li { margin: 0 3px 3px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 18px; background-color:green }
  #sortable li span { position: absolute; margin-left: -1.3em; }
</style>
<script>

    $(document).ready(function () {
        $("#queryToolColorPicker").kendoColorPicker({
            value: "#51d78b",
            buttons: false,
            select: preview
        });

        $("#insect1").kendoDropDownList({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "http://demos.kendoui.com/service/Products",
                    }
                }
            }
        });

        $("#insect2").kendoDropDownList({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "http://demos.kendoui.com/service/Products",
                    }
                }
            }
        });


    });

    function preview(e) {
        $("#background").css("background-color", e.value);
    }

    function displayAllVisibilityLayerrrrr() {
        
        var numOfIntersectItem = 0;
        var jsonObjFirst, jsonObjSecond, intersectResult;
        
        for (i = 0; i < map.graphicsLayerIds.length; i++) {

            layer_id = map.graphicsLayerIds[i];
            layerObj = map.getLayer(layer_id);

            //Show only the Visibility layer
            if (layerObj.visible)
            {

                //Using layerObj to get the JSON object
                if (numOfIntersectItem == 0) {
                    jsonObjFirst = getGeometryAsJSON(layerObj);
                    numOfIntersectItem = 1;
                    console.log(jsonObjFirst);
                    console.log('1');
                } else {
                   // jsonObjSecond = getGeometryAsJSON(layerObj);
                   // console.log(jsonObjSecond);
                    console.log('2');

                    //Send the Json Object to intersect
                    //intersectResult = intersectTheLayer(jsonObjFirst, jsonObjSecond);
                    //jsonObjFirst = intersectResult;
                    console.log('intersected 1');
                }
            }

         }
    }

    var geo1, geo2;

    function laodLayer1() {

        LAYEROBJ = map.getLayer("0201");
        var geometryType = LAYEROBJ.geometryType;
        var spatialReferenceWKID = LAYEROBJ.spatialReference.wkid;
        var jsonOfGegometries;


        if (geometryType == "esriGeometryPolygon") {

            var setOfPolygon = new Array();
            for (i = 0 ; i < LAYEROBJ.graphics.length; i++) {
                var eachPolygon = LAYEROBJ.graphics[i].geometry.rings;
                setOfPolygon.push(eachPolygon);
            }

            jsonOfGegometries = {
                "geometryType": geometryType,
                "spatialReference": { "wkid": spatialReferenceWKID },
                "geometry": { "rings": setOfPolygon }
            };

        } else if (geometryType == "esriGeometryPolyline") {

            var setOfLine = new Array();
            for (i = 0 ; i < LAYEROBJ.graphics.length; i++) {
                var eachLine = LAYEROBJ.graphics[i].geometry.paths;
                setOfLine.push(eachLine);
            }

            jsonOfGegometries = {
                "geometryType": geometryType,
                "spatialReference": { "wkid": spatialReferenceWKID },
                "geometry": { "paths": setOfLine }
            };
        }

        geo1 = jsonOfGegometries;
        console.log(geo1);
    }

    function laodLayer2() {

        LAYEROBJ = map.getLayer("02011");
        var geometryType = LAYEROBJ.geometryType;
        var spatialReferenceWKID = LAYEROBJ.spatialReference.wkid;
        var jsonOfGegometries;


        if (geometryType == "esriGeometryPolygon") {

            var setOfPolygon = new Array();
            for (i = 0 ; i < LAYEROBJ.graphics.length; i++) {
                var eachPolygon = LAYEROBJ.graphics[i].geometry.rings;
                setOfPolygon.push(eachPolygon);
            }

            jsonOfGegometries = {
                "geometryType": geometryType,
                "spatialReference": { "wkid": spatialReferenceWKID },
                "geometry": { "rings": setOfPolygon }
            };

        } else if (geometryType == "esriGeometryPolyline") {

            var setOfLine = new Array();
            for (i = 0 ; i < LAYEROBJ.graphics.length; i++) {
                var eachLine = LAYEROBJ.graphics[i].geometry.paths;
                setOfLine.push(eachLine);
            }

            jsonOfGegometries = {
                "geometryType": geometryType,
                "spatialReference": { "wkid": spatialReferenceWKID },
                "geometry": { "paths": setOfLine }
            };
        }

        geo2 = jsonOfGegometries;
        console.log(geo2);
    }


    function intersectNow()
    {
        console.log(geo1);
        console.log(geo2);

        geometry1 = JSON.stringify(geo1);
        geometry2 = JSON.stringify(geo2);

        $('#geometry1').html(geometry1);
        $('#geometry2').html(geometry2);
       
        /*
        geometry1 = '{"geometryType" : "esriGeometryPolygon","spatialReference" :{"wkid" : 4269},"geometries" :[{"rings" : [[[-75.48928066099995,39.714858219000064],[-75.4759742679999,39.720084384000074],[-75.47476845699993,39.741832093000085],[-75.46039411899994,39.763362027000085],[-74.73882472699995,40.17772564400008],[-74.9166543419999,39.17063854200006],[-75.01440707699993,39.198363837000045],[-75.11995811199995,39.18469178100008],[-75.4156722749999,39.374971842000036],[-75.55276303999995,39.49051430700007],[-75.5166888839999,39.56656841600005],[-75.57023418699993,39.61773496300009],[-75.48928066099995,39.714858219000064]]]}]}';
        geometry2 = '{"geometryType" : "esriGeometryPolygon","spatialReference" :{"wkid" : 4269},"geometry" :{"rings" : [[[-75.48928066099995,39.714858219000064],[-75.4759742679999,39.720084384000074],[-75.47476845699993,39.741832093000085],[-75.46039411899994,39.763362027000085],[-74.73882472699995,40.17772564400008],[-75.48928066099995,39.714858219000064]]]}}';
        
        $.post("http://192.168.3.177:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer/intersect", { f:"pjson", sr: "4269", geometries: geometry1, geometry: geometry2 })
          .done(function (data) {
              console.log("OK");
              //console.log(data);
               $('#geometry2').html(data);
        });*/
    }
</script>
<div style="margin-top:7px">
    <div style="float:left;margin-top:7px">เลือกสีผลลัพธ์ :</div>
    <div style="float:right"><input id="queryToolColorPicker" style="width:100%" /></div> 
    <div style="clear:both"></div>
</div>
<div>
    ชั้นข้อมูล 1 : <input id="insect1" style="width: 100%" /><br>
    ชั้นข้อมูล 2 :  <input id="insect2" style="width: 100%" />
</div>
<div style="margin-top:7px">
     <button style="width:100%" onclick="laodLayer1()">Layer 1</button>
     <button style="width:100%" onclick="laodLayer2()">Layer 2</button>
    <textarea id="geometry1" ></textarea>
    <textarea id="geometry2" ></textarea>

     <button class="k-button"  style="width:100%" onclick="intersectNow()">Intersect</button>
</div>
<div style="margin-top:7px">
     <button class="k-button"  style="width:100%">Intersect & Save</button>
</div>
 


    






 
