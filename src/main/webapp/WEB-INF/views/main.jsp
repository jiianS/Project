<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" href="resources/css/web.css">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script type="text/javascript" src = "resources/js/mail.js"></script>
    
    <title>따릉따릉이</title>
</head>

<body>

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
          <i class="fa fa-envelope"></i> CONTACT</a>
	  <a href="/main#contact" class="bar-item button">
          <i class="fa fa-envelope"></i> CONTACT</a>      
    </div>
  </div>
</div>


<!-- header Img -->
<header class="bgImg bg1">
  <div class="left startDiv">
    <span> 따르릉 따르릉 비켜주세요 ~ </span><br>
    <span>서울 공공자전거</span>
    <span style="color: forestgreen"> 따릉이</span><br>
    <span>지나갑니다 ~</span>
    <p style="margin: 20px 0;">
    <a href="/main#about" id="goAbout" class="button left"
            style="font-size:20px; background-color: #f4f4f4">
    About 따릉따릉이 >></a></p>
    
  </div> 
  
  <div class="icon" style="left:5px; bottom:5px;">
    <i class="fa fa-facebook-official"></i>
    <i class="fa fa-instagram w3-hover-opacity"></i>    
    <i class="fa fa-twitter w3-hover-opacity"></i>

  </div>
</header>

<!--about-->
<div id="about" class="center">
  <h2>ABOUT CIBA</h2>
  <p class="center gray" style="font-size: 15px; color: #606060; margin:30px 0 ;">
     <span> 자전거와 함께하는 건강한 도시, 세계적인 자전거 도시 SEOUL</span><br>       
     <span>서울 자전거 따릉이는 누구나, 언제나, 어디서나 쉽고 편리하게 이용할 수 있는 무인대여 시스템입니다.</span><br>
      <span>
          <span style="font-weight: bold; color: #555555">따릉따릉이</span>는 서울 공공자전거 대여소 위치를 보여주고 이용정보를 분석하고자 만들었습니다.
      </span>
  </p>
  
  <div class="center aboutDiv">    
    <div class="left aboutItem">     
      <i class="fa fa- fa-bicycle" ></i>
        <p style="font-size: 16px;font-weight: bold">where</p>
      <p class="txtLeft">대여소는 지하철 출입구,버스정류장, 주택단지, 관공서, 학교, 은행 등 생활내 통행장소를 중심으로 설치되어 운영중에 있습니다.</p>
      <p class="txtLeft">서울자전거 이용자는 장소에 구애받지 않고 대여소가 설치된 곳이면 어디에서나 자전거를 대여하고 반납할 수 있습니다.  </p>
    </div>
    
     
    <div class="left aboutItem">
      <i class="fa fa-question" ></i>
       <p style="font-size: 16px;font-weight: bold">We Can</p>
      <p class="center">
          대여소의 위치 조회를 할 수 있습니다
      </p>
      <p class="txtLeft">따릉이 이용하는 사람들의 성별 및 연령대별로 분석할 수 있습니다</p>  
    </div>
    
    <div class="left aboutItem">
      <i class="fa fa-cog"></i>
      <p style="font-size: 16px;font-weight: bold">REFERENCE</p>
      <p> <a href="https://www.bikeseoul.com/main.do#bike_info">서울자전거따릉이</a> <br>
      <a href="http://data.seoul.go.kr/dataList/datasetList.do">서울열린데이터광장</a><br>
      <a href="https://developers.kakao.com/">카카오지도API</a>
    </div>
  </div>
  
</div>

<!--contect-->
<div class="overlay display_none">
	<img src="resources/img/loading.gif">
</div>
<div class="center" id ="contact">
  <h1 class="center">Contact</h1>
  <p class="center">
  		<em>Contact me!</em>
  </p>
   <div>
    <div class="contact_col left contact_info">
      <p><span class='contact_icon'><img src="resources/img/placeholder.svg"> </span>
      	SEOUL, KOREA</p>
      <p><span class='contact_icon'><img src="resources/img/smartphone-call.svg"></span>
      	 Phone: +82 010 2489 3767</p>
      <p><span class='contact_icon'><img src="resources/img/mail.svg"></span>      
      		Email: jiianiii1028@gmail.com</p> 
    </div>
    
    <div class="contact_col left">
      <div>
        <div class="form_div left">
          <input class="form_input" id="con_name" name="con_name"  type="text" value=" ${sessionScope.user.userName}" required>
        </div>
        <div class="form_div left">
          <input class="form_input" id="con_mail" name="con_mail" type="email" value=" ${sessionScope.user.userEmail}" required>
        </div>
      </div>
       
        <textarea id="con_comments" name="con_comments" placeholder="Comment" rows="5" required></textarea>
        
        <div class="row">
          <button id="contact_btn" class="contact_btn" type="submit">Send</button>
      </div> 
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="center">
 
  <a href="#" class="button" style="font-size:18px">
      <i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
  <div>
    <i class="fa fa-facebook-official opacity"></i>
    <i class="fa fa-instagram opacity"></i>
    <i class="fa fa-twitter opacity"></i>
    <i class="fa fa-github opacity"></i>
  </div>
  <p>Copyright by jiianiii</p>
</footer>


</body>
</html>
