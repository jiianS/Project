<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="resources/css/web.css">
    <link rel="stylesheet" href="resources/css/analysis.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<!--     <script src="resources/js/html2canvas.min.js"></script> -->
       
    <script>
    	
        $(document).ready(function(){
            monthList();
    	    	
    		var options = {}
            // choose data _ select 순서대로 op1, op2, op3으로 지정    	    
			

			// 분석하기 버튼 _ 클릭 이벤트
	    	$("#anl_btn").on("click", function () {
	    		var op1 = $("#op1").val();
	    		var op2 = $("#op2").val();
	    		var op3 = $("#op3").val();
	    		var check = 0;
				
	    		console.log(op1 +";"+op2 +";"+op3)
				if(op2 == "연령대별" &&  op3 == "이용건수")  { check = 1 }
				else if(op2 == "연령대별" &&  op3 == "이동시간")  { check = 2 }
				if(op2 == "성별"  &&  op3 == "이용건수")  { check = 3 }
				if(op2 == "성별"  &&  op3 == "이동시간")  { check = 4 }
				
				console.log(check)
				
				$.ajax({
// 					type :"post",
					url : "/web/mrCall",
					data : {"path" : op1, "check":check} 
				}).always(function data() {
					console.log(data)
				});
			});// btn click
				
        });	//document.ready
        
        function monthList(){
            var mm = ["201701","201702","201703","201704","201705","201706","201707","201708","201708","201709","201710","201711","201712","201801","201802","201803","201804","201805","201806"];
            
            $.each(eval(mm), function() {
                $("#op1").append("<option value='"+this+"'>"+this+"</option>");
            });
        }      
        

 
    </script>
	<title> Title </title>
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
          <i class="fa fa-map-marker"></i> 따릉이는 어디에?</a>
      <a href="/web/analysis" class="bar-item button">
          <i class="fa fa-pie-chart"></i> ANALYSIS</a>
      <a href="#contact" class="bar-item button">
          <i class="fa fa-envelope"></i> CONTACT</a>
    </div>
  </div>
</div>

<!--분석하는 부분!-->

	<div id="wrap">
		<h1> Data Analysis</h1>
	
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
			<!-- 선택된 내용을 모두 초기화 하고 step1번 내용만 다시 보여주기 (step2 ~ step5는 화면 숨기기) -->
			<button type="button" id="clear_btn" class="btn btn1">초기화</button>
			<hr>
		</div>
<!--		<h3>분석 진행률</h3>
		<div id="bar_body">
			<div id="bar_div">100%</div>
		</div>
		-->
	</div>

</body>
</html>
