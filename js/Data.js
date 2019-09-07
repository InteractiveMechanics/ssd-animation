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
			{ "date": "1918-10-31", "count": 20 },
			{ "date": "1918-11-01", "count": 20 },
			{ "date": "1918-11-02", "count": 20 },
			{ "date": "1918-11-03", "count": 20 },
			{ "date": "1918-11-04", "count": 20 },
			{ "date": "1918-11-05", "count": 20 },
			{ "date": "1918-11-06", "count": 20 },
			{ "date": "1918-11-07", "count": 20 },
			{ "date": "1918-11-08", "count": 20 },
			{ "date": "1918-11-09", "count": 20 },
			{ "date": "1918-11-10", "count": 20 },
			{ "date": "1918-11-11", "count": 20 },
			{ "date": "1918-11-12", "count": 20 },
			{ "date": "1918-11-13", "count": 20 },
			{ "date": "1918-11-14", "count": 20 },
			{ "date": "1918-11-15", "count": 20 },
			{ "date": "1918-11-16", "count": 20 },
			{ "date": "1918-11-17", "count": 20 },
			{ "date": "1918-11-18", "count": 20 },
			{ "date": "1918-11-19", "count": 20 },
			{ "date": "1918-11-20", "count": 20 },
			{ "date": "1918-11-21", "count": 20 },
			{ "date": "1918-11-22", "count": 20 },
			{ "date": "1918-11-23", "count": 20 },
			{ "date": "1918-11-24", "count": 20 },
			{ "date": "1918-11-25", "count": 20 },
			{ "date": "1918-11-26", "count": 20 },
			{ "date": "1918-11-27", "count": 20 },
			{ "date": "1918-11-28", "count": 20 },
			{ "date": "1918-11-29", "count": 20 },
			{ "date": "1918-11-30", "count": 20 },
			{ "date": "1918-12-01", "count": 20 },
			{ "date": "1918-12-02", "count": 20 },
			{ "date": "1918-12-03", "count": 20 },
			{ "date": "1918-12-04", "count": 20 },
			{ "date": "1918-12-05", "count": 20 },
			{ "date": "1918-12-06", "count": 20 },
			{ "date": "1918-12-07", "count": 20 },
			{ "date": "1918-12-08", "count": 20 },
			{ "date": "1918-12-09", "count": 20 },
			{ "date": "1918-12-10", "count": 20 },
			{ "date": "1918-12-11", "count": 20 },
			{ "date": "1918-12-12", "count": 20 },
			{ "date": "1918-12-13", "count": 20 },
			{ "date": "1918-12-14", "count": 20 },
			{ "date": "1918-12-15", "count": 20 },
			{ "date": "1918-12-16", "count": 20 },
			{ "date": "1918-12-17", "count": 20 },
			{ "date": "1918-12-18", "count": 20 },
			{ "date": "1918-12-19", "count": 20 },
			{ "date": "1918-12-20", "count": 20 },
			{ "date": "1918-12-21", "count": 20 },
			{ "date": "1918-12-22", "count": 20 },
			{ "date": "1918-12-23", "count": 20 },
			{ "date": "1918-12-24", "count": 20 },
			{ "date": "1918-12-25", "count": 20 },
			{ "date": "1918-12-26", "count": 20 },
			{ "date": "1918-12-27", "count": 20 },
			{ "date": "1918-12-28", "count": 20 },
			{ "date": "1918-12-29", "count": 20 },
			{ "date": "1918-12-30", "count": 20 },
			{ "date": "1918-12-31", "count": 20 },
			{ "date": "1919-01-01", "count": 20 },
			{ "date": "1919-01-02", "count": 20 },
			{ "date": "1919-01-03", "count": 20 },
			{ "date": "1919-01-04", "count": 20 },
			{ "date": "1919-01-05", "count": 20 },
			{ "date": "1919-01-06", "count": 20 },
			{ "date": "1919-01-07", "count": 20 },
			{ "date": "1919-01-08", "count": 20 },
			{ "date": "1919-01-09", "count": 20 },
			{ "date": "1919-01-10", "count": 20 },
			{ "date": "1919-01-11", "count": 20 },
			{ "date": "1919-01-12", "count": 20 },
			{ "date": "1919-01-13", "count": 20 },
			{ "date": "1919-01-14", "count": 20 },
			{ "date": "1919-01-15", "count": 20 },
			{ "date": "1919-01-16", "count": 20 },
			{ "date": "1919-01-17", "count": 20 },
			{ "date": "1919-01-18", "count": 20 },
			{ "date": "1919-01-19", "count": 20 },
			{ "date": "1919-01-20", "count": 20 },
			{ "date": "1919-01-21", "count": 20 },
			{ "date": "1919-01-22", "count": 20 },
			{ "date": "1919-01-23", "count": 20 },
			{ "date": "1919-01-24", "count": 20 },
			{ "date": "1919-01-25", "count": 20 },
			{ "date": "1919-01-26", "count": 20 },
			{ "date": "1919-01-27", "count": 20 },
			{ "date": "1919-01-28", "count": 20 },
			{ "date": "1919-01-29", "count": 20 },
			{ "date": "1919-01-30", "count": 20 },
			{ "date": "1919-01-31", "count": 20 },
			{ "date": "1919-02-01", "count": 20 },
			{ "date": "1919-02-02", "count": 20 },
			{ "date": "1919-02-03", "count": 20 },
			{ "date": "1919-02-04", "count": 20 },
			{ "date": "1919-02-05", "count": 20 },
			{ "date": "1919-02-06", "count": 20 },
			{ "date": "1919-02-07", "count": 20 },
			{ "date": "1919-02-08", "count": 20 },
			{ "date": "1919-02-09", "count": 20 },
			{ "date": "1919-02-10", "count": 20 },
			{ "date": "1919-02-11", "count": 20 },
			{ "date": "1919-02-12", "count": 20 },
			{ "date": "1919-02-13", "count": 20 },
			{ "date": "1919-02-14", "count": 20 },
			{ "date": "1919-02-15", "count": 20 },
			{ "date": "1919-02-16", "count": 20 },
			{ "date": "1919-02-17", "count": 20 },
			{ "date": "1919-02-18", "count": 20 },
			{ "date": "1919-02-19", "count": 20 },
			{ "date": "1919-02-20", "count": 20 },
			{ "date": "1919-02-21", "count": 20 },
			{ "date": "1919-02-22", "count": 20 },
			{ "date": "1919-02-23", "count": 20 },
			{ "date": "1919-02-24", "count": 20 },
			{ "date": "1919-02-25", "count": 20 },
			{ "date": "1919-02-26", "count": 20 },
			{ "date": "1919-02-27", "count": 20 },
			{ "date": "1919-02-28", "count": 20 }
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
