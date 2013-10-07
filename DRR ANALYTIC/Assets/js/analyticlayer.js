var analyticLayerIdRunning = 1;
var analyticLayerFeatureObjectList = new Array();
function addQueryRerultToAnyticLayer() {
   
    newIndex = analyticLayerFeatureObjectList.length;

    //Add the resutl of query (features object) to the AL list    
    analyticLayerName = "ชื่อชั้นข้อมูล";
    htmls = '';
    htmls += '   <div class="analyticLayerItem" id="layer_box_' + analyticLayerIdRunning + '">';
    htmls += '        <div style="float:left;"><input type="checkbox" onClick="setAnalyticLayerToVisibility(this)" id="AL' + analyticLayerIdRunning + '" name="anlyticLayerList[]"/></div>';
    htmls += '        <div style="float:left;padding-left:3px">' + analyticLayerName + '</div>';
    htmls += '        <div style="float:right;"></div>';
    htmls += '        <div style="clear:both"></div>';
    htmls += '   </div>';

    
    //[currentResultFeature, "AL" + analyticLayerIdRunning]
    analyticLayerFeatureObjectList.push(["AL"+ analyticLayerIdRunning, currentResultFeature ]);

    $("#analyticLayerItemBox").append(htmls);
    analyticLayerIdRunning++;
}

function setAnalyticLayerToVisibility(obj) {

    //Read the AL id
    analyticLayerId = obj.id;

    if (obj.checked == true) {


        if (loadedLayer.indexOf(analyticLayerId) == -1) {
            //Does not this analytic layer
            //Then Load and Add layer to the Map Object
            

            var targetAnalyticLayerObject;
            for (i = 0; i < analyticLayerFeatureObjectList.length; i++) {
                var obj = analyticLayerFeatureObjectList[i];

                if (obj[0] == analyticLayerId) {

                    targetAnalyticLayerObject = analyticLayerFeatureObjectList[i];
                    break;
                }
            }


            var features = targetAnalyticLayerObject[1];

            //Clear all graphics (Graphics Layer)
            map.graphics.clear();

            var featureCollection = {
                layerDefinition: {
                    "geometryType": targetAnalyticLayerObject[1].geometryType,
                    "fields": targetAnalyticLayerObject[1].fields,
                },
                featureSet: features
            };

            var featureLayer = new esri.layers.FeatureLayer(featureCollection, {
                mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
                id: analyticLayerId
            });

            map.addLayers([featureLayer]);

            //Add loaded history
            addLoadedLayer(analyticLayerId);
        } else {

            //This Analytic Layer is exist , so setting to visible
            setLayerVisibility(analyticLayerId);
        }
    } else {
        // Hide Analytic Layer
        setLayerVisibility(analyticLayerId);
    }
}
