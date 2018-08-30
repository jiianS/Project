$(document).ready(function(){
    monthList();
    
	var options = {}

	// 분석하기 버튼 _ 클릭 이벤트
	$("#anl_btn").on("click", function () {
		$("#chart_body").empty();
		
		var op1 = $("#op1").val();	//	년월
		var op2 = $("#op2").val();	//	연령대    | 성별
		var op3 = $("#op3").val();	//	이용건수 | 이동시간
		var check = 0;
		
		if     (op2 == "연령대별" && op3 == "이용건수") { check = 1 }
		else if(op2 == "연령대별" && op3 == "이동거리") { check = 2 }
		else if(op2 == "연령대별" && op3 == "이동시간") { check = 3 }
		
		else if(op2 == "성별" && op3 == "이용건수")  { check = 4 }
		else if(op2 == "성별" && op3 == "이동거리")  { check = 5 }
		else if(op2 == "성별" && op3 == "이동시간")  { check = 6 }
		
		// 맵리듀스 돌리는 파트!
		$.ajax({
			type :"post",
			url : "/mrCall",
			data : {"path" : op1, "check":check},
			
			beforeSend:function() {
				$(".overlay").removeClass('display_none');
			}	//로딩
			
		}).done(function (data) {
			var mrName = data.name;
			
			// 리듀스 된 파일을 차트화 하기
			$.ajax({
				url  : "/getResult",
				data : {"mrName" : mrName}	// 리듀스 된 파일명
			}).done(function (data) {
				$(".overlay").addClass('display_none');
								
				var result = data.result;
				
				console.log(result)
				google.charts.load('current', {'packages':['corechart','bar']});
			    google.charts.setOnLoadCallback(drawChart);
			    
			    function drawChart() {
			    	var chartData = new google.visualization.DataTable();
			    	
			    	// 차트 컬럼 설정
			    	chartData.addColumn("string", "Option");
		  			chartData.addColumn("number", op3);
				
		  			// 차트 데이터 설정
			  		$.each(result, function(index, value) {
			  			var row = [];
			  			for(var i = 0; i < 2; i++){
			  				row[i] = (i != 0) ? Number(value[i]) : value[i];
			  			}
			  				chartData.addRows([ row ]);
			  			});
					
			  		var option = {
				   			    chartType: 'BarChart',
				   			 	dataTable: chartData,
				   			    options: {	vAxis: {title: op2},
							   			   	hAxis: {title: op3}
				   			    		},
				   			    containerId : 'chart_body'
				   			  };
			  		var wrapper = new google.visualization.ChartWrapper(option);
			  		wrapper.draw();
			     };	//drawChart 
			});

			$("#step4 #img_btn").on("click",function(){
			
//				html2canvas(document.querySelector("#wrap")).then(function(canvas){
//					$.ajax({
//						type: "post",
//						url: "/getImg",
//						data: {"imgData": canvas.toDataURL() , "fileNm" : mrName}
//					}).done(function(){ 
//						alert("저장되었습니다.")
//					});
//				});
				
				//바로 다운 가능하게 하는 
			      html2canvas(document.querySelector("#chart_body")).then(function(canvas) {
			            var url = canvas.toDataURL();
			            var filePath = window.prompt("Enter a file URL",url);
			              $('<a></a>').attr('download', "img.png").attr('href', url)[0].click();
			     });
			});
			
			$("#step4 #clear_btn").on("click",function(){
				$("#chart_body").empty();
			});
			
		});
	});// btn click
		
});	//document.ready

function monthList(){
    var mm = ["201701","201702","201703","201704","201705","201706","201707","201708","201708","201709","201710","201711","201712","201801","201802","201803","201804","201805","201806"];
    
    $.each(eval(mm), function() {
        $("#op1").append("<option value='"+this+"'>"+this+"</option>");
    });
}      
        
	      

