<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel='shortcut icon' href='resources/img/bike_Icon.png'>
    <link rel="stylesheet" type="text/css" href="resources/css/web.css">
    <link rel="stylesheet" href="resources/css/analysis.css">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="resources/js/html2canvas.min.js"></script>       
    <script type="text/javascript" src="resources/js/analysis.js"></script>
    
	<title> Analysis </title>
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

	<!--분석하는 부분!-->
	
	<div id="wrap">
		<h1> 내 멋대로 분석하기</h1>
	
	   	<div id="step1">
			<h3>CHOOSE DATA</h3>
			<div class="con_select">
			<select id="op1" class='op_select'></select>
			<select id="op2" class='op_select'>
			    <option>연령대별</option>
			    <option>성별</option>
			</select>
			<select id="op3" class='op_select'>
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
			    <button type="button" class="btn" id="anl_btn">분석하기</button>
		    </div>
			<hr>
		</div>
	
	
		<div id="step3">
			<h3>분석 결과</h3>
			<div id="chart_body">Chart 영역</div>
			<hr>
		</div>
		
		<div id="step4">
			<!-- 프로젝트 "resources/upload/" 경로에 현재 시간 이름으로 이미지 저장 -->
			<button type="button" id="img_btn" class="btn btn1">이미지 저장</button>
			<button type="button" id="clear_btn" class="btn btn1">초기화</button>
			<hr>
		</div>
				
	</div>

</body>
</html>
