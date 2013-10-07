<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="added_layer.aspx.cs" Inherits="DRR_ANALYTIC.Page.layer.added_layer" %>


<script src="/Assets/js/jsquery/jquery-1.9.1.js"></script>
<script src="/Assets/js/jsquery/jquery-ui-1.10.3.custom.min.js"></script>


<script>
    $(document).ready(function () {
        for (i = 0; i < map.graphicsLayerIds.length; i++) {
            layer_id = map.graphicsLayerIds[i];
            htmls = '<li class="ui-state-default" idd="' + layer_id + '">' + layer_id + '</li>';
            $("#sortable").prepend(htmls);
        }
    });
</script>
<style>
  #sortable { list-style-type: none; margin: 10px 0px 0px 0px; padding: 0; width: 100%; }
  #sortable li { margin: 0 3px 3px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 18px; background-color:green }
  #sortable li span { position: absolute; margin-left: -1.3em; }
  </style>

<ul id="sortable">

</ul>
 