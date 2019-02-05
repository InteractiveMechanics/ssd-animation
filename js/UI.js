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
					'circle-opacity': 0.75,
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
						data: [],
					}, {
						label: 'All Deaths',
						fill: false,
						data: [],
					}, {
						label: 'Filtered Flu Deaths',
						fill: false,
						data: [],
					}
				]
		    },
		    options: {
			    legend: {
				    display: false
			    },
		        scales: {
		            xAxes: [{
		                type: 'category',
		                labels: ['Aug 1918', 'Sept 1918', 'Oct 1918', 'Nov 1918', 'Dec 1918', 'Jan 1919', 'Feb 1919', 'Mar 1919', 'Apr 1919'],
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
	    
	    // TODO:
	    // THIS ISN'T WORKING YET—NEEDS TO PULL ALL DATA
	    // AND UPDATE DATA FOR EACH DAY AS TIMELINE RUNS
	    // AND UPDATE ON DEMAND AS FILTERS CHANGE
	    var query = '';
	    
	    if (filterGender || filterAgeMin || filterAgeMax || filterRace){
		    query += '[date <= ' + Timeline.getCurrentDate() + ']';
		    
		    if (filterGender){
			    query += '[sex="' + filterGender + '"]';
		    }
		    if (filterRace){
			    query += '[race="' + filterRace + '"]';
		    }
		    if (filterAgeMin && filterAgeMax){
			    query += '[age>="' + filterAgeMin + '"][age<="' + filterAgeMax + '"]';
		    }
		    var results = defiant.search(Data.cleanData, '//features/properties' + query);
		    
		    // CHANGE FILTERED TOTAL COUNT
		    filteredTotalCount = results.length;
		}
		
		// UPDATE THE TOTAL COUNT UI ON DISPLAY
		updateTotalCount();
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
    }
    
	var writeFrame = function(prettyDateString) {
		// EACH FRAME OF THE TIMELINE
		updateTotalCount();
		updateMapFilters();
		
		// setGraphData(prettyDateString);
		
		dailyDeaths = 0;
		dailyFilteredDeaths = 0;
	}
    
    var setGraphData = function(label) {
	    // TODO:
	    // UPDATE EACH AVAILABLE LINE CHART
	    // WITH APPROPRIATE DATA FOR THIS DAY
	    
	    /*
	    chart.data.labels.push(label);
	    chart.data.datasets.forEach((dataset) => {
	        dataset.data.push(data);
	    });
	    chart.update();
	    */
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
	}
    
    var resetTotalCount = function() {
	    totalCount = 0;
	    filteredTotalCount = 0;
	    
	    updateTotalCount();
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
        resetTotalCount: resetTotalCount,
        addRecordData: addRecordData,
        writeFrame: writeFrame
    }

})(mapboxgl);