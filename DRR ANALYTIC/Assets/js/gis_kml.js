var kmlLayerRunning = 0;
var kmlLayerURLList = new Array();


function setKMLLayerToVisibility(obj) {
    kmlLayerId = obj.id;
    setLayerVisibility(kmlLayerId);
}

function addKMLLayerByURL() {

    kmlUrl = $('#kmlUrlTxt').val();

    if (checkURL(kmlUrl)) {

        showModalLoading();

        htmls = '';
        htmls += '   <div class="analyticLayerItem" id="layer_box_kml_' + kmlLayerRunning + '">';
        htmls += '        <div style="float:left;"><input type="checkbox" onClick="setKMLLayerToVisibility(this)" id="KM' + kmlLayerRunning + '" name="kmlLayerList[]" checked/></div>';
        htmls += '        <div style="float:left;padding-left:3px"><input type="text" id="kml_txt_' + kmlLayerRunning + '" placeholder="ใส่ชื่อชั้นข้อมูล" class="analyticName" ></div>';
        htmls += '        <div style="float:right;"><input type="hidden" value="' + kmlUrl + '" id="kml_url_' + kmlLayerRunning + '"></div>';
        htmls += '        <div style="clear:both"></div>';
        htmls += '   </div>';

        //kmlLayerURLList.push(["KM" + kmlLayerRunning, kmlUrl]);
        //var kmlUrl = "http://dl.dropbox.com/u/2654618/kml/Wyoming.kml";
        var kml = new esri.layers.KMLLayer(kmlUrl, { id: "KM" + kmlLayerRunning });

        map.addLayer(kml);

        dojo.connect(kml, "onLoad",
            hideModalLoading(),
             $('#kmlLayerNoBox').css("display", "none"),
            $("#kmlLayerItemBox").append(htmls),
            $('#kml_txt_' + kmlLayerRunning).focus(),
            kmlLayerRunning++
        );

        $('#kmlUrlTxt').val("");

    } else {
        alert("กรุณาตรวจสอบ URL ให้ถูกต้อง")
    }
}

// ยังไม่มีส่วนการตรวจ URL ว่ามีไฟล์หรือไม่