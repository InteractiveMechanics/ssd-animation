Timeline = (function() {
	var startDate = -1619899200000; // September 1, 1918
	var endDate = -1604299653600; // February 28, 1919
	var currentDate = -1619899200000; // September 1, 1918

	var day = 86400000; // 1 day in milliseconds
	var speed = 300; // ~1/4 second per day
	
	var timelineInterval;
	var isPaused = true;;
	

	var init = function() {

    }
    
    var loopThroughDays = function() {
	    // IF THE INTERACTIVE IS NOT PAUSED (NOT ON THE ATTRACT)
	    if (!isPaused) {
		    
		    // IF THE TIMELINE INTERVAL HASN'T STARTED YET
		    if (!timelineInterval){
			    
			    // START THE TIMELINE INTERVAL
			    timelineInterval = setInterval(function(){
				    if (currentDate < endDate){
					    if (!isPaused){
						    // IF THE TIMELINE IS STILL RUNNING
						    // GENERATE THE PRETTY DATE STRING FOR TODAY
						    var prettyDate = new Date(currentDate);
						    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
						    var prettyDateString = months[prettyDate.getMonth()] + ' ' + prettyDate.getDate() + ', ' + prettyDate.getFullYear();
						    
						    $('#date').text(prettyDateString);
						   	
						   	// CHECK FOR EVERY NEW RECORD FOR THIS DAY
						    $.each(Data.cleanData["features"], function(index, value){
								if (value["properties"]["date"] >= currentDate && value["properties"]["date"] < currentDate + day){
									
									// IF THIS RECORD HAPPENED TODAY, ADD IT TO UI
									UI.addRecordData(value);
								}
						    });
						    					    
						    $.each(Data.dailyData["dates"], function(index, value){
							    var prettyDailyDate = new Date(value["date"]);
							    							    			    
							    if (prettyDailyDate.getTime() >= currentDate && prettyDailyDate.getTime() < currentDate + day){
								    UI.addDailyDataCount(value["count"]);
								    
								    if (value["date"] == "1918-09-08"){
									    pauseAndZoom(39.8923418, -75.1581446, 14, 0, 15, 
									    	"September 7: A ship from Boston carrying sailors with influenza arrives at the Philadelphia Naval Shipyard.");
								    }
								    if (value["date"] == "1918-09-29"){
									    pauseAndZoom(39.936878, -75.15842, 14, 0, 15, 
									    	"September 28: Fourth Liberty Loan parade; 200,000 people crowd onto Broad Street north and south of City Hall.");
								    }
								    if (value["date"] == "1918-10-06"){
									    pauseAndZoom(39.952102, -75.135475, 12, 0, 45, 
									    	"October 6: Flu deaths exceed 500 per day for the first time and continue to climb.");
								    }
								    if (value["date"] == "1918-10-13"){
									    pauseAndZoom(39.952102, -75.135475, 12, 5, 15, 
									    	"October 12: Deadliest day, with 837 flu deaths.");
								    }
								    if (value["date"] == "1918-10-27"){
									    pauseAndZoom(39.952102, -75.135475, 12, 0, 45, 
									    	"October 26: City lifts ban on public gatherings after deaths decline.");
								    }
								    if (value["date"] == "1918-11-28"){
									    pauseAndZoom(39.952102, -75.135475, 12, 5, 15, 
									    	"Flu deaths were concentrated in high-density neighborhoods and at hospitals. Areas with few or no deaths were mostly undeveloped in 1918.");
								    }
								    if (value["date"] == "1919-01-02"){
									    pauseAndZoom(39.952102, -75.135475, 12, 5, 15, 
									    	"Flu deaths rise slightly in New Year.");
								    }
							    }
						    });
						    
						    // EACH DAY, WRITE THE DATA
						    UI.writeFrame(currentDate);
						    
						    // SET THE DATE UP BY ONE
						    currentDate = currentDate + day;
						}
				    } else {
					    // AT THE END OF THE TIMELINE
					    // SET OUTRO SCREENS	    
					    Utilities.endTimeline();
					    Utilities.startRestartTimer();
					    UI.moveMapToLatLon(39.9793073, -75.0810122, 11.2);
					    
					    // CLEAR THE INTERVAL TIMER AND RESTART TIMER		
						clearInterval(timelineInterval);
				    }
				}, speed);
			}
		}
    }
    
    var pauseAndZoom = function(lat, lon, zoom, bearing, pitch, message) {
	    setTimelinePaused(true);
	    
	    UI.moveMapToLatLon(lat, lon, zoom, bearing, pitch);
		UI.showMessage(message);
	    
	    setTimeout(function() {
		    setTimelinePaused(false);
		    
		    UI.moveMapToLatLon(39.9793073, -75.0810122, 11.2);
		    UI.hideMessage();
	    }, 8000);
    }
    
    var resetTimeline = function() {		
		// RESET VARIABLES BACK TO BEGINNING
		timelineInterval = null;
		currentDate = startDate;
		
		// RESET UI COUNTS
		UI.resetTotalCount();
		UI.resetChartData();
    }
    
    var setTimelinePaused = function(value) {
	    isPaused = value;
    }
    var setCurrentDate = function(value) {
	    currentDate = value;
    }
    
    var getCurrentDate = function() {
	    return currentDate;
    }
    var getStartDate = function() {
	    return startDate;
    }
    var getEndDate = function() {
	    return endDate;
    }
    
    return {
        init: init,
        isPaused: isPaused,
        getStartDate: getStartDate,
        getCurrentDate: getCurrentDate,
        getEndDate: getEndDate,
        setCurrentDate: setCurrentDate,
        setTimelinePaused: setTimelinePaused,
        loopThroughDays: loopThroughDays,
        resetTimeline: resetTimeline
    }

})();