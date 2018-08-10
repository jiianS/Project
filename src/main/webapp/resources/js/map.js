function drawMap() {
	var container = document.getElementById('mapView');
	var options = {
		center: new daum.maps.LatLng(37.558052, 127.040352),
		level: 3,
		marker: {
	           position : new daum.maps.LatLng(37.561447, 127.03492),// 좌표가 없으면 이미지 지도 중심에 마커가 표시된다.
	           text : '왕십리역 11번 출구 앞' // 지정하지 않으면 마커만 표시된다.
	     }  
	};

	var map = new daum.maps.Map(container, options);	
}