var currentResultFeature;
var currentTableHTML = "";
var currentServiceURL = "";

function queryLayer() {

    keyword = $("#queryAttrtxt").val();

    if (currentQueryGeometry == null && keyword == "") {
        alert("กรุณาใส่คำค้นหา หรือเลือกพื้นที่บนแผนที่ฐานโดยใช้เครื่องมือวาด")
    } else {
        if ($("#subTargetQueryLayer").val() == "") {
            alert("กรุณาเลือกชั้นข้อมูล");
        } else {
            

            layerId = $("#subTargetQueryLayer").val();
            layerPrefix = layerId.substr(0, 2);


            if (layerPrefix == "AL") {
                newLayerId = layerId.substr(2);
                layerObject = map.getLayer(newLayerId);

            } else if (layerPrefix == "AM") {
                newLayerId = layerId.substr(2);
                layerObject = map.getLayer(newLayerId);

            } else {// Default Layer                
                
                
                rootServiceId = $("#targetQueryLayer").val();
                serviceId = $("#subTargetQueryLayer").val();


                resultRootService = getObjectsFormJson(defaulServiceDataSources, "sid", rootServiceId);
                subServiceList = resultRootService[0].items;

                subServiceDetail = getObjectsFormJson(subServiceList, "sid", serviceId);

                service_url = subServiceDetail[0].SURL;
                outFieldsList = subServiceDetail[0].outFields;
                queryFieldsList = subServiceDetail[0].queryFields;
                currentServiceURL = service_url;
                
                //Cread the WHERE condition string
                var where = "";
                for (j = 0; j < queryFieldsList.length; j++) {
                    if (j == (queryFieldsList.length) - 1) {where += queryFieldsList[j] + " LIKE '%" + keyword + "%' ";
                    } else { where += queryFieldsList[j] + " LIKE '%" + keyword + "%' OR ";}
                }

                var outFields = "";
                for (k = 0; k < outFieldsList.length; k++) {
                    if (k == (outFieldsList.length) - 1) { outFields += outFieldsList[k];
                    } else {outFields += outFieldsList[k] + ","; }
                }

                queryTheResultFromServices(service_url, where, outFields);
            }
        }
    }

 
}


function queryTheResultFromServices(url, whereCondition, outFields) {
    
    var query = new esri.tasks.Query();
    query.returnGeometry = true;
    query.where = whereCondition;
    query.outFields = [outFields];

    if (currentQueryGeometry != null) {
        query.geometry = currentQueryGeometry;
    }
   
    var queryTask = new esri.tasks.QueryTask(url+"/query");

    queryTask.execute(query, drawResultOnMap);
}

function drawResultOnMap(featureSet) {
    resetNewQuery();
    currentResultFeature = featureSet;

    var defaultSymbol = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([0, 0, 255]));
    var resultTemplate = new esri.InfoTemplate("${PROV_NAM_E}", "Name");

    dojo.forEach(featureSet.features, function (feature) {
        map.graphics.add(feature.setSymbol(defaultSymbol).setInfoTemplate(resultTemplate));
    });


    //Display the result tools
    showTheResultTool();
}





function viewResuslAsTable() {
    console.log(currentResultFeature);
    if (currentTableHTML == "") {
        generateHTMLTable();
    }
   
    var htmls_component = "";
    htmls_component += "<div>";
    htmls_component += "    <div style='float:left;margin-bottom:7px;font-size:22px;font:weight:bolder;'>";
    htmls_component += "        ผลการค้นหา <a href='" + currentServiceURL + "' target='_blank' style='text-decoration:none'>(Ref. Serivce)</a>"; target = "_self"
    htmls_component += "    </div>";
    htmls_component += "    <div style='float:right;margin-bottom:7px;'>";
    htmls_component += "        <button class='k-button' onclick='tableToExcel()' title='Export as Excel file'><img class='imgIcon16' src='../../Assets/image/gisimg/excel-icon.png'/></button>";
    htmls_component += "        <button class='k-button' title='จัดเก็บผลการค้นหาชั่วคราว' ><img class='imgIcon16' src='../../Assets/image/gisimg/save-query-icon.png'/></button>";
    htmls_component += "    </div>";
    htmls_component += "    <div style='clear:both'></div>";
    htmls_component += "</div>";

    $("#common_window").html(htmls_component + currentTableHTML);
    
    $("#resutlAsTableGrid").kendoGrid({
       sortable: true,
       dataSource: {
           pageSize: 100
       },
       pageable: {
           pageSizes: true
       },
       height: 430,
       resizable: true,
       scrollable: true,
       filterable: true,
    });
}

function generateHTMLTable() {
    var htmls = "";

    htmls += "<table id='resutlAsTableGrid' name='resutlAsTableGrid'";
    //htmls += "<thead>";
    htmls += "      <tr>";
    htmls += "          <th > No. </th>";
    for (i = 0; i < currentResultFeature.fields.length; i++) {
        htmls += "      <th >" + currentResultFeature.fields[i].name + "</th>";
    }

    htmls += "      </tr>";
    //htmls += "</thead>";
    //htmls += "<tbody>";
    for (i = 0; i < currentResultFeature.features.length; i++) {

        htmls += "      <tr>";
        htmls += "            <td>" + (i + 1) + "</td>";
        for (j = 0; j < currentResultFeature.fields.length; j++) {
            fieldsName = currentResultFeature.fields[j].name;
            htmls += "        <td>" + currentResultFeature.features[i].attributes[fieldsName] + "</td>";
        }

        htmls += "      </tr>";
    }
    //htmls += "</tbody>";
    htmls += "<table>";
    currentTableHTML = htmls;
}


var tableToExcel = (function (e) {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>{table}</body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function () {

        if (currentTableHTML == "") {
            generateHTMLTable();
        }

        name = "ผลการค้นหา";

        var ctx = { worksheet: name || 'Worksheet', table: currentTableHTML}
        window.location.href = uri + base64(format(template, ctx));
    }
})()



function resetNewQuery() {
    map.graphics.clear();
    currentQueryGeometry = null;
    currentResultFeature = null;
    currentTableHTML = "";
    currentServiceURL = "";
    hideTheResultTool();
}


function showTheResultTool() {
    $("#result_tool_box").css("display", "inline");
}
function hideTheResultTool() {
    $("#result_tool_box").css("display", "none");
}