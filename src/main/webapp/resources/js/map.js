$(document).ready(function() {

	//  내 정보 갖고와서 우리집 주소 좌표 얻어오기 위함
	var locate , userNm
	//전역변수 선언하기
	 var marker, infowindow

	 $.ajax({
		url :"userCheck" , 
		async:false
	}).done(function(data) {
		 var d = JSON.parse(data)
		 locate= d["addr"]; 
		 userNm = d['userName']
	});
	
	// 지도그리기
	 var map = new daum.maps.Map(document.getElementById('mapView'), { // 지도를 표시할 div
		 	center : new daum.maps.LatLng(37.524071, 127.02179), // 지도의 중심좌표 
	        level : 5// 지도의 확대 레벨 
	  });
	 
	// 주소-좌표 변환 객체를 생성합니다
	 var geocoder = new daum.maps.services.Geocoder();

	 // 주소로 좌표를 검색합니다
	 geocoder.addressSearch(locate, function(result, status) {
	     // 정상적으로 검색이 완료됐으면 주소의 좌표를  coords에 담기
	      if (status === daum.maps.services.Status.OK) {
	    	 var coords = new daum.maps.LatLng(result[0].y, result[0].x)

	         // 결과값으로 받은 위치를 마커로 표시합니다
	         marker = new daum.maps.Marker({
	             map: map,
	             position: coords
	         });

	         // 인포윈도우로 장소에 대한 설명을 표시합니다
	         infowindow = new daum.maps.InfoWindow({
	             content: '<div id = "infowindow" style="font-size:12px;">'+ userNm +'님 주소는 여긴가요</div>'
//	             ,removable : true
	         });
	         infowindow.open(map, marker);

	         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	         map.setCenter(coords);
	     } 
	 });
	
	 // list 갖고오기
	selectList();
	
    // jquery 이용하여 데이터를 가져와 마커를 생성하기
   	$.get("resources/data/seoulbicylce.json").done(function (data) {
   		var markers = $(data.DATA).map(function (i, position) {
   			// 마커 생성하기
   			marker = new daum.maps.Marker({
   				map: map,	 // 마커를 표시할 지도
   			 	position : new daum.maps.LatLng(data.DATA[i].latitude, data.DATA[i].longitude)
   			});

   			// 마커에 표시할 인포윈도우를 생성합니다 
   	   	    infowindow = new daum.maps.InfoWindow({
   	   	    		 content: "<div id = 'infowindow' style ='font-size:13px;'> " + data.DATA[i].content_nm + "</div>"// 인포윈도우에 표시할 내용
   	   	    });

   	   	    // 마우스 올리고 아웃되었을때, 이벤트를 추가하는 기능
   	   	    daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
   	   	    daum.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
   	   	    return marker;
   		});
   	});
	
   	
 // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
   	function makeOverListener(map, marker, infowindow) {
   	    return function() {
   	        infowindow.open(map, marker);
   	    };
   	}

   	// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
   	function makeOutListener(infowindow) {
   	    return function() {
   	        infowindow.close();
   	    };
   	}

	// 위치 이동시키기
	function panTo(lat, lng) {
	    // 이동할 위도 경도 위치를 생성합니다 
	    var moveLatLon = new daum.maps.LatLng(lat, lng);
	    
	    // 지도 중심을 부드럽게 이동시킵니다
	    map.panTo(moveLatLon); 
	    map.setLevel(3);	//mapLevel을 3으로 맞추기
	}
	
	// 현재 위치 찾아 지도에 뿌리기
	$("#geolocate").on("click", function() {
		
		// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
		if (navigator.geolocation) {
		    
		    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
		    navigator.geolocation.getCurrentPosition(function(position) {
		        
		        var lat = position.coords.latitude, // 위도
		            lon = position.coords.longitude; // 경도
		        
		        var locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
		                message = '<div id = "infowindow">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
		        
		        // 마커와 인포윈도우를 표시합니다
		        displayMarker(locPosition, message);
		            
		      });
		    
		} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
		    
		    var locPosition = new daum.maps.LatLng(33.450701, 126.570667),    
		        message = 'geolocation을 사용할수 없어요..'
		    displayMarker(locPosition, message);
		}

		// 지도에 마커와 인포윈도우를 표시하는 함수입니다
		function displayMarker(locPosition, message) {

		    // 마커를 생성합니다
		    marker = new daum.maps.Marker({  
		        map: map, 
		        position: locPosition
		    }); 

		    // 인포윈도우를 생성합니다
		    infowindow = new daum.maps.InfoWindow({
		        content : message
//		        ,removable : true
		    });
		    
		    // 인포윈도우를 마커위에 표시합니다 
		    infowindow.open(map, marker);
		    
		    // 지도 중심좌표를 접속위치로 변경합니다
		    map.setCenter(locPosition);      
		}    
		
	});
	
	
	function selectList(){
	    // 서울시의 지역구를 배열로 지정
			var area = ["지역구 선택하기","강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
	     
	    // select박스 안의 option 값 추가하기
	     $.each(eval(area), function() {   $("#gu").append("<option value='"+this+"'>"+this+"</option>");  });
	     
	     // select에서 option값을 바뀔때마다 변경되게 하기
	     $("#gu").on("change", function() {

	     	$("#m_ul").empty();
	         var guVal = this.value;

	         if (guVal == "지역구 선택하기"){
	        	 map.setLevel(3);	
	     	}else{
		         $.ajax({
		         	url : "resources/data/seoulbicylce.json"            	
		         }).done(function(data){
		        	 console.log(data)
		        	// [선택한 구]이름이 같을 때-> 해당되는 '구'의 대여소명 리스트  
		        	for(var i = 0; i < data.DATA.length; i++){
		             	if(guVal == data.DATA[i].addr_gu){                		
		             		$("#m_ul").append("<li class='m_li' data-value='" + data.DATA[i].content_id + "'> "+  data.DATA[i].content_nm +"</li>");
		             		$("#m_ul").append("<span> "+data.DATA[i].new_addr+"</span>");
		             	} 
		         	}
		        	
		        	panTo(data.DATA[2].latitude ,data.DATA[2].longitude)
		         	// 리스트 클릭했을 때, 해당 위치로 옮기기(panTo())
		        	// id 값 받아서 처리 하기
		        	var content_id ;
		         	$(".m_li").off().on("click",function(){
		         		$("#rentContain").removeClass('display_none');
		         		$("#rentName").empty();
		         		$("#rentaddr").empty();
		         		$("#cradel_cnt").empty();
		         		
		         		// for문과 비슷하다고 보면 됨 , data.DATA 속의 value값을 갖고오고, id값이 동일한 경우 원하는 value값을 받아오려함
		         		content_id = $(this).attr("data-value");	// 대여소 아이디값
		         		
		         		$.each(data.DATA, function( key, value ) {
		         			    if(value.content_id == content_id){
		         				  panTo( value.latitude,  value.longitude);
		         				  
		         				$("#rentName").append(value.content_nm);
		         				$("#cradel_cnt").append(value.cradle_count);
		         				$("#rentaddr").append(value.new_addr);
		         			  }	
		         		});	// 리스트 클릭했을 때, 행해지는 function
		     		});// 리스트 클릭했을때
		        	
		        	
		        	 $(".rentbtn").on("click",function(){
      			    	console.log("clikd  - -"+ $(this).text());
      			    	var year =  $(this).text();
      			    	$.ajax({
      			    		type : "post",
 		         			url:"/mrMapCall",
 		         			data : {"rentID" :content_id, "year" : year},
 		        			beforeSend:function() {
 		        				$(".overlay").removeClass('display_none');
 		        			},
 		        			error : function(error) {
 		        		        alert("Error!"); 
 		        		    }
 		        		}).done(function(data) {
 		         			$.ajax({
 		         				url  : "/getResult",
 		        				data : {"mrName" : data.name}	// 리듀스 된 파일명
 		         			}).done(function(data) {
 		         				$(".overlay").addClass('display_none');
 		         				
 		         				var result = data.result;
	    		    				google.charts.load('current', {'packages':['corechart','bar']});
	    		    			    google.charts.setOnLoadCallback(drawChart);
	    		    			    
	    		    			    function drawChart() {
	    		    			    	var chartData = new google.visualization.DataTable();
	    		    			    	
	    		    			    	// 차트 컬럼 설정
	    		    			    	chartData.addColumn("string", "Option");
	    		    		  			chartData.addColumn("number", "이용건수");
	    		    				
	    		    		  			// 차트 데이터 설정
	    		    			  		$.each(result, function(index, value) {
	    		    			  			var row = [];
	    		    			  			for(var i = 0; i < 2; i++){
	    		    			  				row[i] = (i != 0) ? Number(value[i]) : value[i];
	    		    			  				console.log(row[i])
	    		    			  			}
	    		    			  				chartData.addRows([ row ]);
	    		    			  			});
	    		    					
	    		    			  		var option = {
	    		    				   			    chartType: 'BarChart',
	    		    				   			 	dataTable: chartData,
	    		    				   			    options: {	vAxis: {title: "월별"},
	    		    							   			   	hAxis: {title: "이용건수"}
	    		    				   			    		},
	    		    				   			    containerId : 'rentContent'
	    		    				   			  };
	    		    			  		var wrapper = new google.visualization.ChartWrapper(option);
	    		    			  		wrapper.draw();
	    		    			     };	//drawChart 
								}) ;
								});
 		         			
      			    }); // 2017,2018 눌렀을때
	         		
		         });// ajax
	     	}
		});// select_Option 값에 따라 리스트 변경하기
	 }
	
});