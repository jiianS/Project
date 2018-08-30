<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

<!-- css -->
<link rel='shortcut icon' href='resources/img/bike_Icon.png'>
<link rel="stylesheet" href="resources/css/web.css">
<link rel="stylesheet" href="resources/css/map.css">
<link rel="stylesheet" href="resources/css/analysis.css">



<link rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Raleway">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


<!-- js -->
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2a6f7408c186c46a63cc30d539f1e1d9&libraries=services,clusterer,drawing"></script>
<script type="text/javascript"
	src="https://www.gstatic.com/charts/loader.js"></script>
<script src="resources/js/html2canvas.min.js"></script>
<script type="text/javascript" src="resources/js/map.js"></script>
<script type="text/javascript" src="resources/js/analysis.js"></script>
<script type="text/javascript" src="resources/js/mail.js"></script>

<title>따릉따릉이</title>
</head>

<body>
	<!-- Nav bar -->
		<div class="top">
		<div class="bar white" id="navBar">
			<a href="/" class="left wide button">따릉따릉이</a>

			<div class="right">
				<a href="/main" class="bar-item button"> <i
					class="fa fa-bicycle"></i>HELLO
				</a>
				<a href="/main#about" class="bar-item button"> <i
					class="fa fa-bicycle"></i>ABOUT
				</a> <a href="/main#mapsection" class="bar-item button"> <i
					class="fa fa-map-marker"></i> 따릉이는 어디에?
				</a> <a href="/main#analSection" class="bar-item button"> <i
					class="fa fa-pie-chart"></i> ANALYSIS
				</a> <a href="/main#contact" class="bar-item button"> <i
					class="fa fa-envelope"></i> CONTACT
				</a>
				<a href="/" class="bar-item button"> 
					<i class="fa fa-user-circle-o" style="font-size: 25px;"></i>
				</a>
			</div>
		</div>
	</div>

	<!-- header Img -->
	<header class="bgImg bg1">
		<div class="left startDiv">
			<span> 따르릉 따르릉 비켜주세요 ~ </span><br> <span>서울 공공자전거</span> <span
				style="color: forestgreen"> 따릉이</span> <span>지나갑니다 ~</span>
			<p style="margin: 20px 0;">
				<a href="/main#about" id="goAbout" class="button left"
					style="font-size: 20px; background-color: #f4f4f4"> About 따릉따릉이
					>></a>
			</p>
		</div>

		<div class="icon" style="left: 5px; bottom: 5px;">
			<i class="fa fa-facebook-official"></i> 
			<i class="fa fa-instagram w3-hover-opacity"></i> 
			<i class="fa fa-twitter w3-hover-opacity"></i>
		</div>
	</header>

	<!--about-->
	<section id="about" class="center">
		<h2>ABOUT CIBA</h2>
		<p class="center gray"
			style="font-size: 15px; color: #606060; margin: 30px 0;">
			<span> 자전거와 함께하는 건강한 도시, 세계적인 자전거 도시 SEOUL</span><br> <span>서울
				자전거 따릉이는 누구나, 언제나, 어디서나 쉽고 편리하게 이용할 수 있는 무인대여 시스템입니다.</span><br> <span>
				<span style="font-weight: bold; color: #555555">따릉따릉이</span>는 서울
				공공자전거 대여소 위치를 보여주고 이용정보를 분석하고자 만들었습니다.
			</span>
		</p>

		<div class="center aboutDiv">
			<div class="left aboutItem">
				<i class="fa fa- fa-bicycle"></i>
				<p style="font-size: 16px; font-weight: bold">where</p>
				<p class="txtLeft">대여소는 지하철 출입구,버스정류장, 주택단지, 관공서, 학교, 은행 등 생활내
					통행장소를 중심으로 설치되어 운영중에 있습니다.</p>
				<p class="txtLeft">서울자전거 이용자는 장소에 구애받지 않고 대여소가 설치된 곳이면 어디에서나
					자전거를 대여하고 반납할 수 있습니다.</p>
			</div>


			<div class="left aboutItem">
				<i class="fa fa-question"></i>
				<p style="font-size: 16px; font-weight: bold">We Can</p>
				<p class="center">대여소의 위치 조회를 할 수 있습니다</p>
				<p class="txtLeft">따릉이 이용하는 사람들의 성별 및 연령대별로 분석할 수 있습니다</p>
			</div>

			<div class="left aboutItem">
				<i class="fa fa-cog"></i>
				<p style="font-size: 16px; font-weight: bold">REFERENCE</p>
				<p>
					<a href="https://www.bikeseoul.com/main.do#bike_info">서울자전거따릉이</a>
					<br> <a href="http://data.seoul.go.kr/dataList/datasetList.do">서울열린데이터광장</a><br>
					<a href="https://developers.kakao.com/">카카오지도API</a>
			</div>
		</div>
	</section>

	<!--overlay-->
	<div class="overlay display_none">
		<img src="resources/img/loading.gif">
	</div>

	<!-- map -->
	<section id="mapsection">
		<div id="mapContainer">
			<h2>따릉이 대여소는 어디에?</h2>

			<div id="mapView" class="left"></div>
			<div id="mapContent" class="left">
				<div id="mapForm">
					<h3>원하는 지역구를 선택하세요</h3>
					<button type="button" class="contact_btn rentbtn " id="geolocate">
						나 어디있게?</button>
					<select name="gu" id="gu" title="원하는 지역구를 선택합니다."></select>
				</div>
				<div id="mapDetail">
					<ul id="m_ul">
					</ul>
				</div>
			</div>
		</div>

		<div id="rentContain" class="display_none">
			<h2>자세히 알아보기</h2>
			<div id="rentTitle">
				<span>대여소명</span> <span id="rentName" class="rentSpan"> </span><br>
				<span>거치대수</span> <span id="cradel_cnt" class="rentSpan"> </span><br>
				<span>대여소위치</span> <span id="rentaddr" class="rentSpan"></span>
				<hr>

				<div id="rentcheck">
					<p>
						<span>2017, 2018년 월별 이용건수 분석</span><br> <span>해당 데이터는
							[2017.01 - 2018.06] 입니다 </span><br>
					</p>

					<button type="button" class="contact_btn rentbtn ">2017</button>
					<button type="button" class="contact_btn rentbtn">2018</button>
					<hr>
				</div>
			</div>

			<div id="rentContent"></div>
		</div>
	</section>

	<!-- ananlysis -->
	<section id="analSection">
		<div id="wrap">
			<h2 class="">내 멋대로 분석하기</h2>
			<div id="step1">
				<h3>CHOOSE DATA</h3>
				<div class="con_select">
					<select id="op1" class='op_select'></select> <select id="op2"
						class='op_select'>
						<option>연령대별</option>
						<option>성별</option>
					</select> <select id="op3" class='op_select'>
						<option>이용건수</option>
						<option>이동거리</option>
						<option>이동시간</option>
					</select>
				</div>
				<hr>
			</div>

			<div id="step2">
				<!-- 버튼를 클릭 시 step2에서 생성된 파일를 step4에 PieChart로 표현하기 -->
				<h3>분석 시작</h3>
				<div>
					<span> choose data를 선택한 후 버튼을 눌러주세요 </span>
					<button type="button" class="contact_btn rentbtn" id="anl_btn">분석하기</button>
				</div>
				<hr>
			</div>

			<div id="step3">
				<h3>분석 결과</h3>
				<div id="chart_body"></div>
			</div>

			<div id="step4">
				<!-- 프로젝트 "resources/upload/" 경로에 현재 시간 이름으로 이미지 저장 -->
				<button type="button" id="img_btn"   class="contact_btn rentbtn">이미지 저장</button>
				<button type="button" id="clear_btn" class="contact_btn rentbtn">초기화</button>
				<hr>
			</div>
		</div>
	</section>

	<!--contect-->
	<section class="center" id="contact">
		<h1 class="center">Contact</h1>
		<p class="center">
			<em>Contact me!</em>
		</p>
		<div>
			<div class="contact_col left contact_info">
				<p>
					<span class='contact_icon'><img
						src="resources/img/placeholder.svg"> </span> SEOUL, KOREA
				</p>
				<p>
					<span class='contact_icon'><img
						src="resources/img/smartphone-call.svg"></span> Phone: +82 010 2489
					3767
				</p>
				<p>
					<span class='contact_icon'><img src="resources/img/mail.svg"></span>
					Email: jiianiii1028@gmail.com
				</p>
			</div>

			<div class="contact_col left">
				<div>
					<div class="form_div left">
						<input class="form_input" id="con_name" name="con_name"
							type="text" value=" ${sessionScope.user.userName}" required>
					</div>
					<div class="form_div left">
						<input class="form_input" id="con_mail" name="con_mail"
							type="email" value=" ${sessionScope.user.userEmail}" required>
					</div>
				</div>

				<textarea id="con_comments" name="con_comments"
					placeholder="Comment" rows="5" required></textarea>

				<div class="row">
					<button id="contact_btn" class="contact_btn" type="submit">Send</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="center">

		<a href="#" class="button" style="font-size: 18px"> <i
			class="fa fa-arrow-up w3-margin-right"></i>To the top
		</a>
		<div>
			<i class="fa fa-facebook-official opacity"></i> <i
				class="fa fa-instagram opacity"></i> <i
				class="fa fa-twitter opacity"></i> <i class="fa fa-github opacity"></i>
		</div>
		<p>Copyright by jiianiii</p>
	</footer>


</body>
</html>
