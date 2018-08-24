$(document).ready(function() {
	 var map = new daum.maps.Map(document.getElementById('mapView'), { // 지도를 표시할 div
		 	center : new daum.maps.LatLng(37.524071, 127.02179), // 지도의 중심좌표 
	        level : 10// 지도의 확대 레벨 
	    });
		
	 
	selectList();
	
	// 마커 클러스터러를 생성하기
    var clusterer = new daum.maps.MarkerClusterer({
        map: map,				 // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        averageCenter: true,	 // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        minLevel: 9			 // 클러스터 할 최소 지도 레벨 
    });
	
    // jquery 이용하여 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨주기
   	$.get("resources/data/seoulbicylce.json").done(function (data) {
   		
   		var markers = $(data.DATA).map(function (i, position) {
   			
   			// 마커 생성하기
   			var marker = new daum.maps.Marker({
   				map: map,	 // 마커를 표시할 지도
   			 	position : new daum.maps.LatLng(data.DATA[i].latitude, data.DATA[i].longitude)
   			});
   				
   			// 마커에 표시할 인포윈도우를 생성합니다 
   	   	    var infowindow = new daum.maps.InfoWindow({
   	   	    		 content: "<span style ='font-size:12px; text-align:center'>" + data.DATA[i].content_nm + "</span>"// 인포윈도우에 표시할 내용
   	   	    });
   	   	    
   	   	    // 마우스 올리고 아웃되었을때, 이벤트를 추가하는 기능
   	   	    daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
   	   	    daum.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
   	   	    return marker;
   		});
   		
   		// 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);			

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
	
	function selectList(){
	    // 서울시의 지역구를 배열로 지정
			var area = ["지역구 선택하기","강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
	     
	    // select박스 안의 option 값 추가하기
	     $.each(eval(area), function() {
	         $("#gu").append("<option value='"+this+"'>"+this+"</option>");
	     });
	     

	     // select에서 option값을 바뀔때마다 변경되게 하기
	     $("#gu").on("change", function() {

	     	$("#m_ul").empty();
	         var guVal = this.value;

	         if (guVal == "지역구 선택하기"){
	        	 map.setLevel(9);	//mapLevel을 3으로 맞추기
	     	}else{
		         $.ajax({
		         	url : "resources/data/seoulbicylce.json"            	
		         }).done(function(data){
	
		         	var guNm;         	
		         	for(var i = 0; i < data.DATA.length; i++){
		         		guNm = data.DATA[i].addr_gu;
		         		
		             	if(guVal == guNm){                		
		             		$("#m_ul").append("<li class='m_li' data-value='" + data.DATA[i].content_id + "'> "+data.DATA[i].content_nm+"</li>");
		             		$("#m_ul").append("<span> "+data.DATA[i].new_addr+"</span>");
		             	}              
		         	}
		         	
		         	// 리스트 클릭했을 때, 해당 위치로 옮기기(panTo()) 
		         	$(".m_li").off().on("click",function(){
		         		$("#rentContain").removeClass('display_none');
		         		//id 값 받아서 처리
		         		// for문과 비슷하다고 보면 됨 , data.DATA 속의 value값을 갖고오고, id값이 동일한 경우 원하는 value값을 받아오려함
		         		var content_id = $(this).attr("data-value");
		         		
		         		$.each(data.DATA, function( key, value ) {
		         			
		         			  if(value.content_id == content_id){
		         				  var lat = value.latitude;		// 위도
		         				  var lng = value.longitude;	// 경도            
		         				  panTo(lat, lng);
		         			  	} 
		         		});
		     		});// 리스트 클릭했을때
		         	
		         	
		         	
		         });// ajax
	     	}
		});// select_Option 값에 따라 리스트 변경하기
	 }
	
});