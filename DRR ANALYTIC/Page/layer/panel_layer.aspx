<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="panel_layer.aspx.cs" Inherits="DRR_ANALYTIC.Page.layer.panel_layer" %>


        <div id="tabstrip" style="border:0px">
            <ul>
                <li class="k-state-active">ชั้นข้อมูล</li>
                <li>AL</li>
                <li>KML</li>
                <li><span class="k-icon k-i-plus"></span></li>
                <li onClick="loadAddedLayerPanel()"><img src="../../Assets/image/gisimg/layer-icon.png"</li>
            </ul>
            <div>
                <div id="default_layer"></div>
            </div>
            <div>
                <div id="customize_layer"></div>
            </div>
            <div>
                <div id="add_kml_layer"></div>
            </div>
            <div>
                <div id="add_service_layer"></div>
            </div>            
            <div>
                <div id="added_layer"></div>
            </div>
        </div>
  

<script>
    $(document).ready(function () {
        $("#tabstrip").kendoTabStrip({
            animation: { open: { effects: "fadeIn" } }
        });

        loadDefaultLayer();
        loadCustomizeLayer();
        loadAddLayerServicepanel();
        loadKMLAddLayer();
    });



    function loadDefaultLayer() {
        $.get("Page/layer/default_layer.aspx", function (data) {
            $("#default_layer").html(data);
        });
    }

    function loadCustomizeLayer() {
        $.get("Page/layer/cutomize_layer.aspx", function (data) {
            $("#customize_layer").html(data);
        });
    }

    function loadAddLayerServicepanel() {
        $.get("Page/layer/add_service_layer.aspx", function (data) {
            $("#add_service_layer").html(data);
        });
    }

    function loadKMLAddLayer() {
        $.get("Page/layer/add_kml_layer.html", function (data) {
            $("#add_kml_layer").html(data);
        });
    }

    function loadAddedLayerPanel() {
        $.get("Page/layer/added_layer.aspx", function (data) {
            $("#added_layer").html(data);

            $("#sortable").sortable({
                stop: function (event, ui) {
                    //Read the array of new sort item
                    var item_position_list = $("#sortable").sortable("toArray", { attribute: "idd" });
                  
                    var revert_item_position_list = item_position_list.reverse();
                      
                    // gui_layer_index is original index in the GUI
                    var gui_layer_index = ui.item.index();
                    var new_revert_layer_index = ((revert_item_position_list.length) - 1 - gui_layer_index);
                    var revert_layer_id = revert_item_position_list[new_revert_layer_index];
                   
                    //Update position of layer in MAP ohject
                    updateLayerPosition(revert_layer_id, new_revert_layer_index);

                }
            });

            $("#sortable").disableSelection();
        });
    }

    
</script>

<style scoped>
    #tabstrip .k-content 
    {
       overflow:auto;
    }
</style>
