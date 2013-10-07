var loadedLayer = new Array();
var allVisibilityLayers = new Array();

function handleLayerByCheckBox(serviceData) {

    if (serviceData.items[0].checked == true) {

        //add layer to all visible layer list
        //allVisibilityLayers.push("DF"+serviceData.items[0].sid);    

        //Read the interest service ID
        service_id = serviceData.items[0].sid;

        //Check whether service ID is already exist or not
        if (loadedLayer.indexOf(service_id) == -1) {
            //Does not load this service, yet
            //Then Load and Add layer to the Map Object
            if (serviceData.items[0].layerType == "DM") {
                addDynamicLayerToMap(serviceData);
            } else if (serviceData.items[0].layerType == "WMS") {
                addWMSLayerToMap(serviceData);
            } else if (serviceData.items[0].layerType == "F") {
                addFeatureLayerToMap(serviceData);
            }

            //console.log(map);
            //alert("load new");
        } else {
            //This service was loaded, so setting to visible
            setLayerVisibility(serviceData.items[0].sid);
            //alert("show");
        }
        
    } else {
       
        //targerArrayIndex = allVisibilityLayers.indexOf("DF" + serviceData.items[0].sid);
        //allVisibilityLayers.splice(targerArrayIndex, 1);

        //Set layer invisibility        
        setLayerVisibility(serviceData.items[0].sid);
       
    }
}

function addDynamicLayerToMap(serviceData) {
    url = serviceData.items[0].SURL;
    sid = serviceData.items[0].sid;

    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url, { id: sid });
    dynamicLayer.dynamicLayerInfo = new esri.layers.DynamicLayerInfo({ "hidedefault": "true" });

    map.addLayers([dynamicLayer]);

    //Add loaded history
    addLoadedLayer(sid);
}

var RISK_WEST;

function addFeatureLayerToMap(serviceData) {
    
    url = serviceData.items[0].SURL;
    sid = serviceData.items[0].sid;
    queryFieldsList = serviceData.items[0].queryFields;
    outFieldsList = serviceData.items[0].outFields;

     
    RISK_WEST = new esri.layers.FeatureLayer(url, { id: sid, mode: esri.layers.FeatureLayer.MODE_SNAPSHOT});
    RISK_WEST.dynamicLayerInfo = new esri.layers.DynamicLayerInfo({ "hidedefault": "true", queryFields: queryFieldsList, outFields: outFieldsList });
    console.log(RISK_WEST);
    map.addLayers([RISK_WEST]);

    //Add loaded history
    addLoadedLayer(sid);
}




    function addWMSLayerToMap(serviceData) {
        url = serviceData.items[0].SURL;
        sid = serviceData.items[0].sid;

        var layer1 = new esri.layers.WMSLayerInfo({ name: "1", title: "Rivers" });
        var layer2 = new esri.layers.WMSLayerInfo({ name: "2", title: "Cities" });
        var resourceInfo = {
            extent: new esri.geometry.Extent(-126.40869140625, 31.025390625, -109.66552734375, 41.5283203125, { wkid: 4326 }),
            layerInfos: [layer1, layer2]
        };
        var wmsLayer = new esri.layers.WMSLayer("http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer",
          {
              resourceInfo: resourceInfo,
              visibleLayers: ["1", "2"]
          }
        );
        map.addLayers([wmsLayer]);

        //Add loaded history
        addLoadedLayer(sid);
    }


    function addLoadedLayer(layerId) {
        loadedLayer.push(layerId);

        //console.log(map);
    }


    function setLayerVisibility(layerId) {
        var targetLayer = map.getLayer(layerId);
        targetLayer.setVisibility(!targetLayer.visible);
    }

    function updateLayerPosition(layer_id, layer_position) {
        targetlayer = map.getLayer(layer_id);
        map.reorderLayer(targetlayer, layer_position);
    }

    function queryTheLayerOnMap() {

        //Read the Checked Layer 
   
        // Create the query condition
        //var query = new esri.tasks.Query();
        // query.returnGeometry = true;
        // query.outFields = ["*"];
        //query.geometry = currenQueryGeometry;

        // Read the Active layer (Visible == True)
        //var queryTask = new esri.tasks.QueryTask("http://192.168.3.177:6080/arcgis/rest/services/DRR_5/Route56IntersectFlood55/MapServer/2");
        //queryTask.execute(query, addPointsToMap);

    }

    function sampleQueryAttr()
    {
        var keyword = $('#queryAttrtxt').val();
        
        var query = new esri.tasks.Query();
        query.returnGeometry = true;
        query.where = "PROV_NAM_T LIKE '%" + keyword + "%' ";
        query.outFields = ["*"];
        //query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

        var queryTask = new esri.tasks.QueryTask("http://192.168.3.177:6080/arcgis/rest/services/DRR_5/ThaiLandDefault/MapServer/0/query");

        queryTask.execute(query, addPointsToMap);
    }



    function sampleQuery(geometry) {
        var query = new esri.tasks.Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.geometry = geometry;
        //query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

        var queryTask = new esri.tasks.QueryTask("http://192.168.3.177:6080/arcgis/rest/services/DRR_5/Route56IntersectFlood55/MapServer/2");

        queryTask.execute(query, addPointsToMap);
    }

    function addPointsToMap(featureSet) {
        console.log(featureSet);
        
        var defaultSymbol = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([0, 0, 255]));
        var resultTemplate = new esri.InfoTemplate("${PROV_NAM_E}", "Name");

        dojo.forEach(featureSet.features, function (feature) {
            map.graphics.add(feature.setSymbol(defaultSymbol).setInfoTemplate(resultTemplate));
        });
        
    }

    function removeLoadedLayer() {
    }