$(document).ready(function(){
	var lat;
	var long;
	$('#heatmap').hide();

	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success);
	} else {
	  error('Geo Location is not supported');
	}

	function success(position) {
	     lat = position.coords.latitude;
	     long = position.coords.longitude;
		 console.log(lat+" "+long);
	}

	/////////////////////////////////////// map test

		function showmap(){
			var map, pointarray, heatmap;

			var taxiData = [
			  new google.maps.LatLng(37.782551, -122.445368),
			  new google.maps.LatLng(37.782745, -122.444586),
			  new google.maps.LatLng(37.782842, -122.443688),
			  new google.maps.LatLng(37.782919, -122.442815),
			  new google.maps.LatLng(37.782992, -122.442112)
			];
			function initialize() {
			  var mapOptions = {
			    zoom: 13,
			    center: new google.maps.LatLng(37.774546, -122.433523),
			    mapTypeId: google.maps.MapTypeId.SATELLITE
			  };

			  map = new google.maps.Map(document.getElementById('heatmap'),
			      mapOptions);

			  var pointArray = new google.maps.MVCArray(taxiData);

			  heatmap = new google.maps.visualization.HeatmapLayer({
			    data: pointArray
			  });

			  heatmap.setMap(map);
			}

			function toggleHeatmap() {
			  heatmap.setMap(heatmap.getMap() ? null : map);
			}

			function changeGradient() {
			  var gradient = [
			    'rgba(0, 255, 255, 0)',
			    'rgba(0, 255, 255, 1)',
			    'rgba(0, 191, 255, 1)',
			    'rgba(0, 127, 255, 1)',
			    'rgba(0, 63, 255, 1)',
			    'rgba(0, 0, 255, 1)',
			    'rgba(0, 0, 223, 1)',
			    'rgba(0, 0, 191, 1)',
			    'rgba(0, 0, 159, 1)',
			    'rgba(0, 0, 127, 1)',
			    'rgba(63, 0, 91, 1)',
			    'rgba(127, 0, 63, 1)',
			    'rgba(191, 0, 31, 1)',
			    'rgba(255, 0, 0, 1)'
			  ]
			  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
			}

			function changeRadius() {
			  heatmap.set('radius', heatmap.get('radius') ? null : 20);
			}

			function changeOpacity() {
			  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
			}

			google.maps.event.addDomListener(window, 'load', initialize);
		};




	////////////////////////////////////////////////map test end


	current_page = 0;
		// current_page = 1; quick-complain-form
		// current_page = 2; new-complain-form
		// current_page = 3; view-nearby-complains
		// current_page = 4; show heatmap

		// page vars start
	$first_page = $('.first-page');
	$quick_complain_form = $('#quick-complain-form');
	$new_complain_form = $('#new-complain-form');
		// page vars end
		// input vars start

	$quick_complain_title = $('#quick-complain-title');

		//input vars end

		// button vars start
	$quick_complain = $('#quick-complain');
	$post_quick_complain = $('#post-quick-complain');
	$new_complain = $('#new-complain');
	$near_by_complains = $('#near-by-complains');
	$show_heatmap = $('#show-heatmap');
		// button vars end

	$first_page.show();
	$quick_complain_form.hide();
	$new_complain_form.hide();

		// click event starts
	// quick-complain click start
	$quick_complain.on('click', function(){
		current_page = 1;
		$first_page.hide(300);
		$quick_complain_form.show(300);

		$post_quick_complain.on('click', function(){
			$.ajax({
				url: 'http://localhost:3000/complains',
				type: 'POST',
				data: {
					complain: {
						title: $quick_complain_title.val(),
						latitude: lat,
						longitude: long
					}
				},
				success: function(response){
					console.log(response);
				}
			});
		});
	});
	// quick-complain click end
	// new complain click start
	$new_complain.on('click', function(){
		current_page = 2;
		$first_page.hide(300);
		$new_complain_form.show(300);
	});
	// new complain click end
	// show heatmap start
	$show_heatmap.on('click', function(){
		current_page = 4;
		$first_page.hide(300);
		$('#heatmap').show(300);
		showmap();
		google.maps.event.trigger(map,'resize');

		// var coords = new google.maps.LatLng(lat, long);
  
		//   var options = {
		//     zoom: 15,
		//     center: coords,
		//     mapTypeControl: false,
		//     navigationControlOptions: {
		//     	style: google.maps.NavigationControlStyle.SMALL
		//     },
		//     mapTypeId: google.maps.MapTypeId.ROADMAP
		//   };
		//   var map = new google.maps.Map(document.getElementById("heatmap"), options);

		//   var marker = new google.maps.Marker({
		//       position: coords,
		//       map: map,
		//       title:"You are here!"
		//   });




	});
	// show heatmap end

		// click event end



});