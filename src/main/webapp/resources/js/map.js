function drawMap() {
	var container = document.getElementById('mapView');
	var options = {
		center: new daum.maps.LatLng(37.505581, 127.024277),
		level: 3
	};

	var map = new daum.maps.Map(container, options);	
}