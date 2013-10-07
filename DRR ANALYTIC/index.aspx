<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="DRR_ANALYTIC.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>GIS Analytic</title>
    <meta charset="utf-8">
    <!-- CSS -->
    <link href="/Assets/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="/Assets/styles/kendo.metro.min.css" rel="stylesheet" />  
 	<link rel="stylesheet" href="http://js.arcgis.com/3.6/js/esri/css/esri.css">
    <link href="/Assets/styles/gis.css" rel="stylesheet" />

    <!-- JavaScript -->
    <script src="/Assets/js/jquery.min.js"></script>
    <script src="/Assets/js/kendo.web.min.js"></script>    
	<script src="http://js.arcgis.com/3.6/"></script>
    <script src="/Page/data/defualservice.js"></script>    
    <script src="/Assets/js/gis.js"></script>
    <script src="/Assets/js/gis_querytool.js"></script>
    <script src="/Assets/js/layer.js"></script>
    <script src="/Assets/js/analyticlayer.js"></script>
    <script src="/Assets/js/intersect.js"></script>    
</head>
<body>
    <div id="header_logo">
        <div style="float:left"><img src="assets/image/gisimg/header-logo.jpg" /></div>
        <div style="float:right"></div>
        <div style="clear:both"></div>
    </div>
    <div id="main_left_window" title="Overlay"></div>
    <div id="main_right_window" title="เครื่องมือวิเคราะห์"></div>
    <div id="common_window" style="display:none" title="ผลการค้นหา"></div>
    <button id="left_window_btn" style="position:absolute;z-index:1;display:none" class="k-button">Layer</button>
    <button id="right_window_btn" style="position:absolute;z-index:1;display:none" class="k-button">Tools</button>
    <div id="basemap_box" style="position:absolute;top:40px"></div>
</body>
</html>

