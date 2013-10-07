function getGeometryAsJSON(LAYEROBJ) {
    // console.log(RISK_WEST.geometry);
    //var sk = new esri.Graphic(RISK_WEST);
    //console.log(sk.geometry.graphics[0].geometry.paths[0]);
    //console.log(RISK_WEST.graphics[0].geometry.rings);

    //Read type of Geometry

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

        return jsonOfGegometries;

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

        return jsonOfGegometries;

    } else if (geometryType == "esriGeometryPoint") {
        /*
        var setOfPoint = new Array();
        for (i = 0 ; i < RISK_WEST.graphics.length; i++) {
            var eachLine = RISK_WEST.graphics[i].geometry.paths;
            setOfPoint.push(eachLine);
        }

        jsonOfGegometries = {
            "geometryType": geometryType,
            "spatialReference": { "wkid": spatialReferenceWKID },
            "geometry": { "paths": setOfPoint }
        };*/

        /*
        {
        "points" : [ [-97.06138,32.837], [-97.06133,32.836], [-97.06124,32.834], [-97.06127,32.832] ],
        "spatialReference" : {"wkid" : 4326}
        }*/
      

    }  
}