	
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

            $.ajax({
            	url : "resources/data/seoulbicylce.json"            	
            }).done(function(data){
            	console.log(data)
            	var guNm;
            	
            	for(var i = 0; i < data.DATA.length; i++){
            		guNm = data.DATA[i].addr_gu;
            		
                	if(guVal == guNm){                		
//                		$("#m_ul").append("<li class='m_li' data-value='" + data.DATA[i].content_id + "'> "+data.DATA[i].content_nm+"</li>");
                		$("#m_ul").append("<li class='m_li' id='" + data.DATA[i].content_id + "'> "+data.DATA[i].content_nm+"</li>");
                	}              
            	}
            	
            	// 리스트 클릭했을 때, 주소 추가하기
            	$(".m_li").off().on("click",function(){
            		var content_id = $(this).attr("id");

            		// for문과 비슷하다고 보면 됨 , data.DATA 속의 value값을 갖고오고, id값이 동일한 경우 원하는 value값을 받아오려함
            		$.each(data.DATA, function( key, value ) {
            			  if(value.content_id == content_id){
            				  console.log(content_id, value.new_addr);
            				  $('#'+content_id ).append("<li> "+value.new_addr+ "</li>");
            			  	}
            		});
            		// 내가 선택한 m_li 의 index값을 받고, 그것에 대한 data 속의 new_addr 을 찾는다
//            		var new_addr =  data.DATA[$(".m_li").index(this)].new_addr
//        			$(this).append("<li> "+new_addr+ "</li>");
//        			console.log(new_addr)                			
        		});
            	
            });
            
		});
    }           