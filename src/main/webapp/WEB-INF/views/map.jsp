<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" href="resources/css/web.css">
    <link rel="stylesheet" href="resources/css/map.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2a6f7408c186c46a63cc30d539f1e1d9"></script>
	<script src="resources/js/map.js"></script>
	
	<script type="text/javascript">
	$(document).ready(function () {		
		drawMap();
	});
		
	</script>

	<title> map </title>
</head>

<body>

<!-- Nav bar -->
<div class="top">
  <div class="bar white" id="navBar">
    <a href="/web" class="left wide button">따릉따릉이</a>
    
    <div class="right">
      <a href="/web#about" class="bar-item button">
     	 <i class="fa fa-bicycle"></i>ABOUT</a>
      <a href="/web/map" class="bar-item button">
          <i class="fa fa-map-marker"></i> 따릉이위치는?</a>
      <a href="/web/analysis" class="bar-item button">
          <i class="fa fa-pie-chart"></i> ANALYSIS</a>
      <a href="#contact" class="bar-item button">
          <i class="fa fa-envelope"></i> CONTACT</a>
    </div>
  </div>
</div>

<div id="mapContainer">
   <h2>따릉이 대여소는 어디에?</h2>
   <div id="mapView" class="left"></div>    
   <div id="mapselect" class="left"></div>
</div>
</body>
</html>
