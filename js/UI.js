UI = (function() {
	
	// STORE THE FILTER VALUES
	var filterGender = '';
	var filterAgeMin = '';
	var filterAgeMax = '';
	var filterRace = '';
	var filterGen = '';
	
	// STORE THE COUNTS
	var totalCount = 0;
	var filteredTotalCount = 0;
	var allTotalCount = 0;
	
	var dailyDeaths = 0;
	var dailyTotalDeaths = 0;
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
		    zoom: 11.2,
			center: [-75.0810122, 39.9793073],
			minZoom: 11.2,
			maxZoom: 18,
			maxBounds: [
				[-75.37334745185173, 39.80731121765379], // Southwest coordinates {"lng":-75.37334745185173,"lat":39.80731121765379}
				[-74.74090421442446, 40.1510792131933]  // Northeast coordinates {"lng":-74.74090421442446,"lat":40.1510792131933}
			]
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
					'circle-opacity': 0.10,
					'circle-radius': 4
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
						label: 'Total Deaths',
						fill: false,
						borderColor: '#999999',
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
					    display: true,
					    offset: true,
					    scaleLabel: {
					    	drawBorder: true,
							zeroLineWidth: false
						},
						ticks: {
							min: 0,
							max: 1000,
							stepSize: 250,
							fontColor: 'rgba(255, 255, 255, 0.5)'
						},
						gridLines: {
						    color: 'rgba(255, 255, 255, 0.1)',
					    },
					    scaleLabel: {
					    	fontColor: 'rgba(255, 255, 255, 0.5)'
					    }
				    }],
				    xAxes: [{
					    type: 'time',
					    time: {
						    unit: 'month',
						    displayFormats: {
		                        month: 'MMM. YYYY'
		                    },
		                    min: -1619899200000,
		                    max: -1604386053600
					    },
					    gridLines: {
						    color: 'rgba(255, 255, 255, 0.35)',
						    borderDash: [4, 4]
					    },
					    ticks: {
						    fontColor: 'rgba(255, 255, 255, 0.5)'
					    },
					    scaleLabel: {
					    	fontColor: 'rgba(255, 255, 255, 0.5)'
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
        $(document).on('click tap', 'input[name="filter-group-gen"]', filterByImmigration);
        
        $(document).on('click tap', '#show-all-deaths', resetFilters);
        $(document).on('click tap', '#show-hide-filters', toggleFilterPanel);
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
	    toggleFilterPanel();
	    
	    Analytics.sendAnalyticsEvent('Filter', filterAgeMin + '–' + filterAgeMax, 'Age');
    }
    var filterByRace = function() {
	    filterRace = $(this).attr('data-race');
	    
	    $('input[name="filter-group-race"]').removeClass('active');
	    $(this).addClass('active');
	    
	    updateFilterCount();
	    updateCountTitle();
	    updateMapFilters();
	    enableResetFilterButton();
	    toggleFilterPanel();
	    
	    Analytics.sendAnalyticsEvent('Filter', filterRace, 'Race');
    }
    var filterByGender = function() {
	    filterGender = $(this).attr('data-gender');
	    
	    $('input[name="filter-group-gender"]').removeClass('active');
	    $(this).addClass('active');
	    
	    updateFilterCount();
	    updateCountTitle();
	    updateMapFilters();
	    enableResetFilterButton();
	    toggleFilterPanel();
	    
	    Analytics.sendAnalyticsEvent('Filter', filterGender, 'Sex');
    }
    var filterByImmigration = function() {
	    filterGen = $(this).attr('data-gen');
	    
	    $('input[name="filter-group-gen"]').removeClass('active');
	    $(this).addClass('active');
	    
	    updateFilterCount();
	    updateCountTitle();
	    updateMapFilters();
	    enableResetFilterButton();
	    toggleFilterPanel();
	    
	    Analytics.sendAnalyticsEvent('Filter', filterGen, 'Immigration Generation');
    }
    
    var updateFilterCount = function() {
	    // SET UP A QUERY TO GET ALL RECORDS FOR A FILTER SET
	    var query = '';
	    var results;
	    
	    if (filterGender || filterAgeMin || filterAgeMax || filterRace || filterGen){
		    query += '[date <= ' + (parseInt(Timeline.getCurrentDate()) + 86400) + ']';
		    
		    if (filterGender){
			    query += '[sex="' + filterGender + '"]';
		    }
		    if (filterRace){
			    query += '[race="' + filterRace + '"]';
		    }
		    if (filterGen){
			    query += '[gen="' + filterGen + '"]';
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
		if (filterGen) {
			var gen = ['==', "gen", filterGen];
			filters.push(gen);
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
	    if (filterGender || filterAgeMin || filterAgeMax || filterRace || filterGen) {
		    
		    // MAKE SURE THE FILTERS MATCH		    
		    if (
		    	(filterGender == '' || value.properties.sex == filterGender) &&
		    	(filterRace == '' || value.properties.race == filterRace) &&
		    	(filterGen == '' || value.properties.gen == filterGen) &&
				(filterAgeMin == '' || value.properties.age >= filterAgeMin && value.properties.age <= filterAgeMax)) {
				
					// ADD IT TO THE FILTERED COUNTS
					filteredTotalCount++;
					dailyFilteredDeaths++;
		    }
		}
    }
    
    var addDailyDataCount = function(count) {
	    allTotalCount = allTotalCount + count;
	    dailyTotalDeaths = count;
    }
    
	var writeFrame = function(currentDate) {
		// EACH FRAME OF THE TIMELINE
		updateTotalCount();
		updateMapFilters();
		
		setGraphData(currentDate, dailyDeaths, dailyTotalDeaths);
		
		/*
		if (filterGender || filterAgeMin || filterAgeMax || filterRace){
			setGraphData(currentDate, dailyDeaths, dailyFilteredDeaths);
		} else {
			setGraphData(currentDate, dailyDeaths, null);
		}
		*/
		
		dailyDeaths = 0;
		dailyTotalDeaths = 0;
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
	    
	    if (!filterGender && !filterAgeMin && !filterAgeMax && !filterRace && !filterGen){
		    text = "ALL FLU-RELATED DEATHS";
		} else {
			text = "TOTAL ";
		}
		
		if (filterGen){
			
			if (filterGen == "Abroad"){
				text += " BORN ABROAD";
			} else if (filterGen == "1g"){
				text += " FIRST GENERATION";
			} else if (filterGen == "2+"){
				text += " 2ND GENERATION OR MORE";
			} else if (filterGen == "U"){
				text += "";
			}
		}
		
		if (filterGender){
			if (filterGen){
				text += ",";	
			}
			
			if (filterGender == "M"){
				text += " MALE";
			} else if (filterGender == "F"){
				text += " FEMALE";	
			}
		}
		
		if (filterRace){
			if (filterGender || filterGen){
				text += ",";	
			}
			
			if (filterRace == "B"){
				text += " AFRICAN AMERICAN";
			} else if (filterRace == "W"){
				text += " EUROPEAN WHITE";
			} else if (filterRace == "A"){
				text += " ASIAN";
			} else if (filterRace == "L"){
				text += " LATINX";
			}
		}
		
		if (filterAgeMin){
			if (filterGender || filterRace || filterGen){
				text += ", ";	
			}
			
			if (filterAgeMin == 0){
				text += " UNDER 2 ";
			} else if (filterAgeMin == 3){
				text += " 3&ndash;12 ";
			} else if (filterAgeMin == 13){
				text += " 13&ndash;20 ";
			} else if (filterAgeMin == 21){
				text += " 21&ndash;35 ";
			} else if (filterAgeMin == 36){
				text += " 36&ndash;45 ";
			} else if (filterAgeMin == 46){
				text += " 46&ndash;55 ";
			} else if (filterAgeMin == 56){
				text += " 56&ndash;75 ";
			} else if (filterAgeMin == 76){
				text += " OVER 76 ";
			}
		}
		
		if (filterGender || filterAgeMin || filterAgeMax || filterRace || filterGen){
			text += " FLU-RELATED DEATHS";	
		}
	    
	    $('.count-title').html(text);
	}
        
    var updateTotalCount = function() {
	    if (filterGender || filterAgeMin || filterAgeMax || filterRace){
	    	$('#count .count-total').text(addCommasToNumbers(filteredTotalCount));
	    	$('#count .count-comparison-percentage').text(Math.ceil(filteredTotalCount/allTotalCount * 100));
	    } else {
		    $('#count .count-total').text(addCommasToNumbers(totalCount));
		    $('#count .count-comparison-percentage').text(Math.ceil(totalCount/allTotalCount * 100));
	    }
	    
	    $('#count .count-comparison-total').text(addCommasToNumbers(allTotalCount));
	    
    }
    
    var addCommasToNumbers = function(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    var moveMapToLatLon = function(lat, lon, zoom, bearing = 0, pitch = 0) {
	    map.easeTo({
		    // These options control the ending camera position: centered at
			// the target, at zoom level 9, and north up.
			center: [lon, lat],
			offset: [0, 0],
			zoom: zoom,
			bearing: bearing,
			 
			// These options control the flight curve, making it move
			// slowly and zoom out almost completely before starting
			// to pan.
			duration: 2000,
			pitch: pitch,
			 
			// This can be any easing function: it takes a number between
			// 0 and 1 and returns another number between 0 and 1.
			easing: function (t) { return t * (2 - t); }
		});
    }
    
    var showMessage = function(message) {
	    $('#message').text(message).addClass('show');
    }
    
    var hideMessage = function() {
	    $('#message').text('').removeClass('show');
    }
    
    var toggleFilterPanel = function() {
	    $('aside').toggleClass('filtersOpen');
	    if ( $('aside').hasClass('filtersOpen') ) {
		    $('#show-hide-filters').text('HIDE FILTERS');
		    Analytics.sendAnalyticsEvent('Panel', 'Open');
	    } else {
		    $('#show-hide-filters').text('SHOW FILTERS');
		    Analytics.sendAnalyticsEvent('Panel', 'Close');
	    }
    }
    
    var toggleFilterPanel = function() {
	    $('aside').removeClass('filtersOpen');
		$('#show-hide-filters').text('SHOW FILTERS');
		Analytics.sendAnalyticsEvent('Panel', 'Close');
    }
    
    var resetFilters = function() {
	    filterGender = '';
		filterAgeMin = '';
		filterAgeMax = '';
		filterRace = '';
		filterGen = '';
		filteredTotalCount = 0;
		
		$('input[name="filter-group-race"]').addClass('active');
	    $('input[name="filter-group-gender"]').addClass('active');
	    $('input[name="filter-group-age"]').addClass('active');
	    $('input[name="filter-group-gen"]').addClass('active');
	    
	    updateCountTitle();
	    updateMapFilters();
	    disableResetFilterButton();
	    resetFilterChartData();
	    closeFilterPanel()
	    
	    Analytics.sendAnalyticsEvent('Filter', 'Reset');
	}
    
    var resetTotalCount = function() {
	    totalCount = 0;
	    filteredTotalCount = 0;
	    allTotalCount = 0;
	    
	    $('aside').removeClass('filtersOpen');
	    $('#show-hide-filters').text('SHOW FILTERS');
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
        filterGen: filterGen,
        filterRace: filterRace,
        addRecordData: addRecordData,
        addDailyDataCount: addDailyDataCount,
        writeFrame: writeFrame,
        resetTotalCount: resetTotalCount,
        resetChartData: resetChartData,
        resetFilters: resetFilters,
        moveMapToLatLon: moveMapToLatLon,
        showMessage: showMessage,
        hideMessage: hideMessage
    }

})(mapboxgl);
