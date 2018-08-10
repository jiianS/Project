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
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2a6f7408c186c46a63cc30d539f1e1d9&libraries=services,clusterer,drawing"></script>

<script type="text/javascript">
	$(document).ready(function () {		
		drawMap();

	
		
	});
	
	function drawMap() {

		  var map = new daum.maps.Map(document.getElementById('mapView'), { // 지도를 표시할 div
		        center : new daum.maps.LatLng(37.524071, 127.02179), // 지도의 중심좌표 
		        level : 3// 지도의 확대 레벨 
		    });
		    
		    // 마커 클러스터러를 생성합니다 
		    var clusterer = new daum.maps.MarkerClusterer({
		        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
		        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
		        minLevel: 7 // 클러스터 할 최소 지도 레벨 
		    });
		 
		    // 데이터를 가져오기 위해 jQuery를 사용합니다
		    // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
		   	$.get("resources/data/seoulbicylce.json").done(function (data) {
		   		
		   		// 데이터에서 좌표 값을 가지고 마커를 표시합니다
		        // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
					var markers = $(data.DATA).map(function (i, position) {
			   			return new daum.maps.Marker({
			   			 	position : new daum.maps.LatLng(data.DATA[i].latitude, data.DATA[i].longitude)
			   			});
					});
		   		
		        // 클러스터러에 마커들을 추가합니다
		        clusterer.addMarkers(markers);			
		   	});
			
	}
		
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
