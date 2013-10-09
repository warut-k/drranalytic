<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="cutomize_layer.aspx.cs" Inherits="DRR_ANALYTIC.Page.layer.cutomize_layer" %>
<style>
    .analyticLayerItem {
        width:100%;padding:5px 3px 3px 0px;border-bottom:1px solid #f6f6f6;margin-top:4px
    }

    .analyticLayerItem:hover {
        cursor:pointer;
        background-color:rgb(126,167,0);
        color:white;
    }

    .analyticName {
        border:0;
        border-radius:5px;
    }

    .analyticName:focus {
        border-bottom:1px dashed gray;
        border-radius:0;
    }
</style>
<h3>ชั้นข้อมูล</h3>
<div style="width:100%;margin-bottom:10px" id="analyticLayerItemBox" >
    <div id="analyticLayerNoBox">Analytic layer not available</div>
</div>



