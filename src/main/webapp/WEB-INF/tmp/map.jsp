<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel='shortcut icon' href='resources/img/bike_Icon.png'>
    <link rel="stylesheet" type="text/css" href="resources/css/web.css">
    <link rel="stylesheet" type="text/css" href="resources/css/map.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2a6f7408c186c46a63cc30d539f1e1d9&libraries=services,clusterer,drawing"></script>
	<script type="text/javascript" src = "resources/js/map.js"></script>
	
<title> map </title>
</head>

<body>
 <!-- overlay -->
<div class="overlay display_none">
	<img src="resources/img/loading.gif">
</div>

<!-- Nav bar -->
<div class="top">
  <div class="bar white" id="navBar">
    <a href="/" class="left wide button">따릉따릉이</a>
    
    <div class="right">
      <a href="/main#about" class="bar-item button">
     	 <i class="fa fa-bicycle"></i>ABOUT</a>
      <a href="/map" class="bar-item button">
          <i class="fa fa-map-marker"></i> 따릉이는 어디에?</a>
      <a href="/analysis" class="bar-item button">
          <i class="fa fa-pie-chart"></i> ANALYSIS</a>
      <a href="/#contact" class="bar-item button">
          <i class="fa fa-envelope"></i> CONTACT</a>s  
    </div>
  </div>
</div>

<div id="mapContainer">
   <h2>따릉이 대여소는 어디에?</h2>

   <div id="mapView" class="left"></div>    
   <div id="mapContent">
       <div id="mapForm">
           <h3>원하는 지역구를 선택하세요</h3>
           <button type="button" class="contact_btn" id="geolocate"> 나 어디있게? </button>	
           <select name="gu" id="gu" title="원하는 지역구를 선택합니다."></select>
       </div>
       <div id="mapDetail">
       		<ul id="m_ul"> </ul>
       </div>
   </div>
 </div>
          
<div id ="rentContain" class ="display_none">
    <h2 >자세히 알아보기</h2>
    <div id ="rentTitle">
        <span>대여소명</span>
        <span id ="rentName" class="rentSpan"> </span><br>
        <span>거치대수</span>
        <span id ="cradel_cnt" class="rentSpan"> </span><br>
        <span>대여소위치</span> <span id="rentaddr" class="rentSpan"></span>
        <hr>
        
        <div id="rentcheck">
            <p> 
	            <span>2017, 2018년 월별 이용건수 분석</span><br>
	            <span>해당 데이터는 [2017.01 - 2018.06] 입니다  </span><br>
            </p>
            
            <button type="button" class="rentbtn contact_btn">2017</button>
            <button type="button" class="rentbtn contact_btn">2018</button>
         <hr>
        </div>  
      </div>

    <div id="rentContent" style="background-color: aliceblue"> </div>
</div>
   
</body>
</html>
