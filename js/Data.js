Data = (function() {	
	var cleanData = {
		"type": "FeatureCollection",
		"features": []
	};
	var dailyData = {
		"dates": [
			{ "date": "1918-09-01", "count": 20 },
			{ "date": "1918-09-02", "count": 20 },
			{ "date": "1918-09-03", "count": 20 },
			{ "date": "1918-09-04", "count": 20 },
			{ "date": "1918-09-05", "count": 20 },
			{ "date": "1918-09-06", "count": 20 },
			{ "date": "1918-09-07", "count": 20 },
			{ "date": "1918-09-08", "count": 20 },
			{ "date": "1918-09-09", "count": 20 },
			{ "date": "1918-09-10", "count": 20 },
			{ "date": "1918-09-11", "count": 20 },
			{ "date": "1918-09-12", "count": 20 },
			{ "date": "1918-09-13", "count": 20 },
			{ "date": "1918-09-14", "count": 20 },
			{ "date": "1918-09-15", "count": 20 },
			{ "date": "1918-09-16", "count": 20 },
			{ "date": "1918-09-17", "count": 20 },
			{ "date": "1918-09-18", "count": 20 },
			{ "date": "1918-09-19", "count": 20 },
			{ "date": "1918-09-20", "count": 20 },
			{ "date": "1918-09-21", "count": 20 },
			{ "date": "1918-09-22", "count": 20 },
			{ "date": "1918-09-23", "count": 20 },
			{ "date": "1918-09-24", "count": 20 },
			{ "date": "1918-09-25", "count": 20 },
			{ "date": "1918-09-26", "count": 20 },
			{ "date": "1918-09-27", "count": 20 },
			{ "date": "1918-09-28", "count": 20 },
			{ "date": "1918-09-29", "count": 20 },
			{ "date": "1918-09-30", "count": 20 },
			{ "date": "1918-10-01", "count": 20 },
			{ "date": "1918-10-02", "count": 20 },
			{ "date": "1918-10-03", "count": 20 },
			{ "date": "1918-10-04", "count": 20 },
			{ "date": "1918-10-05", "count": 20 },
			{ "date": "1918-10-06", "count": 20 },
			{ "date": "1918-10-07", "count": 20 },
			{ "date": "1918-10-08", "count": 20 },
			{ "date": "1918-10-09", "count": 20 },
			{ "date": "1918-10-10", "count": 20 },
			{ "date": "1918-10-11", "count": 20 },
			{ "date": "1918-10-12", "count": 20 },
			{ "date": "1918-10-13", "count": 20 },
			{ "date": "1918-10-14", "count": 20 },
			{ "date": "1918-10-15", "count": 20 },
			{ "date": "1918-10-16", "count": 20 },
			{ "date": "1918-10-17", "count": 20 },
			{ "date": "1918-10-18", "count": 20 },
			{ "date": "1918-10-19", "count": 20 },
			{ "date": "1918-10-20", "count": 20 },
			{ "date": "1918-10-21", "count": 20 },
			{ "date": "1918-10-22", "count": 20 },
			{ "date": "1918-10-23", "count": 20 },
			{ "date": "1918-10-24", "count": 20 },
			{ "date": "1918-10-25", "count": 20 },
			{ "date": "1918-10-26", "count": 20 },
			{ "date": "1918-10-27", "count": 20 },
			{ "date": "1918-10-28", "count": 20 },
			{ "date": "1918-10-29", "count": 20 },
			{ "date": "1918-10-30", "count": 20 },
			{ "date": "1918-10-31", "count": 20 }
		]
	}
	
	var init = function() {
		rewriteData();
    }
    
    var rewriteData = function() {
	    
	    // TRANSFORM OUR DATA INTO GEOJSON FORMAT
	    // AND SET IT AS DATA.CLEANDATA INSTEAD
	    $.each(data, function(index, value){
		    var lat;
		    var lon;
		    
		    var date = Date.parse(value.death_date);
		    var age = parseInt(value.age);
		    
		    if (value.lat) {
			    lat = value.lat;
		    } else {
			    lat = value.alt_lat;
		    }
		    
		    if (value.long) {
			    lon = value.long;
		    } else {
			    lon = value.alt_long;
		    }
		    
		    var newData = {
			    "type": "Feature",
			    "properties": {
				    "date": date,
				    "age": age,
				    "race": value.rabe,
				    "sex": value.sex,
				    "status": value.status,
				    "gen": value.gen
			    },
			    "geometry": {
				    "type": "Point",
				    "coordinates": [lon, lat]
			    }
		    };
		    
		    cleanData["features"].push(newData);
	    });
    }
    
    return {
        init: init,
        cleanData: cleanData,
        dailyData: dailyData
    }

})();
