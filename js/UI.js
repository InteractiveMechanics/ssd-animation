UI = (function() {
	
	/*
		Right now, the way we build data isn't efficient.
		We need to know daily totals and daily filtered totals.
		We need to be able to update past data when filters happen.
		We need to update the chart, map, and other interface each day and time a change is made.
		
		So, we need to write the frame daily with the latest data and filters.
		We need to have a way to get past data per day when filters change to update the chart.
	*/
	
	// STORE THE FILTER VALUES
	var filterGender = '';
	var filterAgeMin = '';
	var filterAgeMax = '';
	var filterRace = '';
	
	// STORE THE COUNTS
	var totalCount = 0;
	var filteredTotalCount = 0;
	
	var dailyDeaths = 0;
	var dailyFilteredDeaths = 0;
	
	// STORE RENDERING FOR CHART AND MAP
	var map;
	var ctx;
	var chart;
	
	var init = function() {
		
		// BUILD THE BASIC MAP
		// SET THE INITIAL ZOOM AND LOCATION
		mapboxgl.accessToken = 'pk.eyJ1IjoiaW50ZXJhY3RpdmVtZWNoIiwiYSI6InJlcUtqSk0ifQ.RUwHuEkBbXoJ6SgOnXmYFg';
		map = new mapboxgl.Map({
		    container: 'map',
		    style: 'mapbox://styles/mapbox/light-v9',
		    zoom: 12,
			center: [-75.1204122, 39.9550073]
		});
		
		// WHEN THE MAP LOADS
		map.on('load', function () {
			// LOAD THE GEOJSON FROM DATA.CLEANDATA
			map.addSource('deaths', {
				"type": "geojson",
				"data": Data.cleanData
			});
			
			// ADD THE DATA AS A LAYER
			// AND STYLE THE POINTS
			map.addLayer({
				'id': 'death-circles',
				'type': 'circle',
				'source': 'deaths',
				'paint': {
					'circle-color': '#FF0000',
					'circle-opacity': 0.5,
					'circle-radius': 6
				}
			});
			
			// SET THE MAP FILTERS INITIALLY
			updateMapFilters();
		});
		
		// BUILD THE CHART
		ctx = document.getElementById("graph").getContext('2d');
		chart = new Chart(ctx, {
		    type: 'line',
		    data: {
			    datasets: [
				    {
						label: 'All Flu Deaths',
						fill: false,
						borderColor: '#FF0000',
						pointRadius: 0,
						spanGaps: true,
						data: [],
					}, {
						label: 'Filtered Flu Deaths',
						fill: false,
						borderColor: '#CCC',
						pointRadius: 0,
						spanGaps: true,
						data: [],
					}
				]
		    },
		    options: {
			    legend: {
				    display: false
			    },
			    scales: {
				    yAxes: [{
					    display: false,
					    offset: true,
					    scaleLabel: {
					    	drawBorder: false,
							zeroLineWidth: false
						},
						ticks: {
							min: 0
						}
				    }],
				    xAxes: [{
					    type: 'time',
					    time: {
						    unit: 'month'
					    },
					    scaleLabel: {
					    	fontColor: '#CCC'
					    }
				    }]
			    }
		    }
		});
		
        bindEvents();
    }
    
    var bindEvents = function() {
	    
		// BIND THE FILTER BUTTON EVENTS
        $(document).on('click tap', 'input[name="filter-group-age"]', filterByAge);
        $(document).on('click tap', 'input[name="filter-group-race"]', filterByRace);
        $(document).on('click tap', 'input[name="filter-group-gender"]', filterByGender);
        
        $(document).on('click tap', '#show-all-deaths', resetFilters);
    }
    
    var filterByAge = function() {
	    filterAgeMin = $(this).attr('data-age-min');
	    filterAgeMax = $(this).attr('data-age-max');
	    
	    $('input[name="filter-group-age"]').removeClass('active');
	    $(this).addClass('active');
	    
	    updateFilterCount();
	    updateCountTitle();
	    updateMapFilters();
	    enableResetFilterButton();
    }
    var filterByRace = function() {
	    filterRace = $(this).attr('data-race');
	    
	    $('input[name="filter-group-race"]').removeClass('active');
	    $(this).addClass('active');
	    
	    updateFilterCount();
	    updateCountTitle();
	    updateMapFilters();
	    enableResetFilterButton();
    }
    var filterByGender = function() {
	    filterGender = $(this).attr('data-gender');
	    
	    $('input[name="filter-group-gender"]').removeClass('active');
	    $(this).addClass('active');
	    
	    updateFilterCount();
	    updateCountTitle();
	    updateMapFilters();
	    enableResetFilterButton();
    }
    
    var updateFilterCount = function() {
	    // SET UP A QUERY TO GET ALL RECORDS FOR A FILTER SET
	    var query = '';
	    var results;
	    
	    if (filterGender || filterAgeMin || filterAgeMax || filterRace){
		    query += '[date <= ' + (parseInt(Timeline.getCurrentDate()) + 86400) + ']';
		    
		    if (filterGender){
			    query += '[sex="' + filterGender + '"]';
		    }
		    if (filterRace){
			    query += '[race="' + filterRace + '"]';
		    }
		    if (filterAgeMin && filterAgeMax){
			    query += '[age>="' + filterAgeMin + '"][age<="' + filterAgeMax + '"]';
		    }
		    results = defiant.search(Data.cleanData, '//features/properties' + query);
		    
		    // CHANGE FILTERED TOTAL COUNT
		    filteredTotalCount = results.length;
		    
		    // UPDATE THE TOTAL COUNT UI ON DISPLAY
			updateTotalCount();
		}
    }
    
    var updateMapFilters = function() {
	    // SET UP MAPBOX FILTERING
		var filters = [
			'all',
			['<', "date", parseInt(Timeline.getCurrentDate())]
		];
		
		if (filterGender) {
			var gender = ['==', "sex", filterGender];
			filters.push(gender);
		}
		if (filterRace) {
			var race = ['==', "race", filterRace];
			filters.push(race);
		}
		if (filterAgeMin && filterAgeMax) {
			var ageMin = ['>=', "age", parseInt(filterAgeMin)];
			var ageMax = ['<=', "age", parseInt(filterAgeMax)];
			filters.push(ageMin);
			filters.push(ageMax);
		}
		
		// SET MAP FILTERS FOR CIRCLE LAYER
		map.setFilter('death-circles', filters);
    }
    
    var addRecordData = function(value) {
	    // UPDATE TOTAL COUNT BY ONE
	    totalCount++;
	    dailyDeaths++;
	   		    
	    // IF THERE IS A FILTER SET
	    if (filterGender || filterAgeMin || filterAgeMax || filterRace) {
		    
		    // MAKE SURE THE FILTERS MATCH		    
		    if (
		    	(filterGender == '' || value.properties.sex == filterGender) &&
		    	(filterRace == '' || value.properties.race == filterRace) &&
				(filterAgeMin == '' || value.properties.age >= filterAgeMin && value.properties.age <= filterAgeMax)) {
				
					// ADD IT TO THE FILTERED COUNTS
					filteredTotalCount++;
					dailyFilteredDeaths++;
		    }
		}
    }
    
	var writeFrame = function(currentDate) {
		// EACH FRAME OF THE TIMELINE
		updateTotalCount();
		updateMapFilters();
		
		if (filterGender || filterAgeMin || filterAgeMax || filterRace){
			setGraphData(currentDate, dailyDeaths, dailyFilteredDeaths);
		} else {
			setGraphData(currentDate, dailyDeaths, null);
		}
		
		dailyDeaths = 0;
		dailyFilteredDeaths = 0;
	}
    
    var setGraphData = function(currentDate, dailyDeaths, dailyFilteredDeaths) {
	    // UPDATE EACH AVAILABLE LINE CHART
	    // WITH APPROPRIATE DATA FOR THIS DAY
	    	    
	    chart.data.labels.push(currentDate);
	    chart.data.datasets[0].data.push({t: currentDate, y: dailyDeaths});
	    
	    if (dailyFilteredDeaths){
	    	chart.data.datasets[1].data.push({t: currentDate, y: dailyFilteredDeaths});
	    }   
	    chart.update();
    }
    
    var updateCountTitle = function() {
	    var text = '';
	    
	    if (!filterGender && !filterAgeMin && !filterAgeMax && !filterRace){
		    text = "ALL FLU-RELATED DEATHS";
		} else {
			text = "TOTAL ";
		}
		
		if (filterGender){
			if (filterGender == "M"){
				text += "MALE";
			} else if (filterGender == "F"){
				text += "FEMALE";	
			}
		}
		
		if (filterRace){
			if (filterGender){
				text += ",";	
			}
			
			if (filterRace == "B"){
				text += " BLACK";
			} else if (filterRace == "W"){
				text += " WHITE";
			}
		}
		
		if (filterAgeMin){
			if (filterGender || filterRace){
				text += ", ";	
			}
			
			if (filterAgeMin == 0){
				text += " UNDER 13 ";
			} else if (filterAgeMin == 13){
				text += " 13&ndash;18 ";
			} else if (filterAgeMin == 19){
				text += " 19&ndash;35 ";
			} else if (filterAgeMin == 36){
				text += " 36&ndash;45 ";
			} else if (filterAgeMin == 46){
				text += " 46&ndash;55 ";
			} else if (filterAgeMin == 56){
				text += " OVER 55 ";
			}
		}
		
		if (filterGender || filterAgeMin || filterAgeMax || filterRace){
			text += " FLU-RELATED DEATHS";	
		}
	    
	    $('.count-title').html(text);
	}
        
    var updateTotalCount = function() {
	    if (filterGender || filterAgeMin || filterAgeMax || filterRace){
	    	$('#count .count-total').text(filteredTotalCount);
	    } else {
		    $('#count .count-total').text(totalCount);
	    }
    }
    
    var moveMapToLatLon = function(lat, lon, zoom) {
	    map.flyTo({
		    // These options control the ending camera position: centered at
			// the target, at zoom level 9, and north up.
			center: [lon, lat],
			zoom: zoom,
			bearing: 0,
			 
			// These options control the flight curve, making it move
			// slowly and zoom out almost completely before starting
			// to pan.
			speed: 1,
			curve: 1,
			 
			// This can be any easing function: it takes a number between
			// 0 and 1 and returns another number between 0 and 1.
			easing: function (t) { return t; }
		});
    }
    
    var resetFilters = function() {
	    filterGender = '';
		filterAgeMin = '';
		filterAgeMax = '';
		filterRace = '';
		filteredTotalCount = 0;
		
		$('input[name="filter-group-race"]').addClass('active');
	    $('input[name="filter-group-gender"]').addClass('active');
	    $('input[name="filter-group-age"]').addClass('active');
	    
	    updateCountTitle();
	    updateMapFilters();
	    disableResetFilterButton();
	    resetFilterChartData();
	}
    
    var resetTotalCount = function() {
	    totalCount = 0;
	    filteredTotalCount = 0;
	    
	    updateTotalCount();
    }
    
    var resetFilterChartData = function() {
	    chart.data.datasets[1].data = [];
    }
    
    var resetChartData = function() {
	    chart.data.datasets[0].data = [];
	    chart.data.datasets[1].data = [];
    }
    
    var enableResetFilterButton = function() {
	    $('#show-all-deaths').prop("disabled", false).removeClass('disabled');
    }
    var disableResetFilterButton = function() {
	    $('#show-all-deaths').prop("disabled", true).addClass('disabled');
    }
    
    return {
        init: init,
        filterGender: filterGender,
        filterAgeMin: filterAgeMin,
        filterAgeMax: filterAgeMax,
        filterRace: filterRace,
        addRecordData: addRecordData,
        writeFrame: writeFrame,
        resetTotalCount: resetTotalCount,
        resetChartData: resetChartData,
        resetFilters: resetFilters,
        moveMapToLatLon: moveMapToLatLon
    }

})(mapboxgl);
