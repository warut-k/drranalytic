<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="add_service_layer.aspx.cs" Inherits="DRR_ANALYTIC.Page.layer.add_service_layer" %>
<br />
ชื่อชั้นข้อมูล:<br />
<input type="text" style="width:100%" /><br />
Service URL:<br />
<input type="text" style="width:100%" />
<br>
Type:<br>
<select style="width:100%">
    <option>Dynamic Layer</option>
    <option>Feature Layer</option>
    <option>WMS Layer</option>
    <option>WFS Layer</option>
</select>
<br />
<button>เพิ่ม</button><br><br>

ชั้นข้อมูล<br>
<input type="checkbox" />ข้อมูลน้ำท่วม.(GISDA)<br>