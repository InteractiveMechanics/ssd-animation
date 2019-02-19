Timeline = (function() {
	var startDate = -1622664000000; // August 1, 1918
	var endDate = -1599115653600; // April 30, 1919
	var currentDate = -1622664000000; // August 1, 1918
	
	var day = 86400000; // 1 day in milliseconds
	var speed = 250; // 1/4 second per day
	
	var timelineInterval;	
	var isPaused = true;
	

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
					    
					    // EACH DAY, WRITE THE DATA
					    UI.writeFrame(currentDate);
					    
					    // SET THE DATE UP BY ONE
					    currentDate = currentDate + day;
				    } else {
					    // AT THE END OF THE TIMELINE
					    // SET OUTRO SCREENS					    
					    Utilities.endTimeline();
					    Utilities.startRestartTimer();
					    
					    // CLEAR THE INTERVAL TIMER AND RESTART TIMER		
						clearInterval(timelineInterval);
				    }
				}, speed);
			}
		}
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
        getStartDate: getStartDate,
        getCurrentDate: getCurrentDate,
        getEndDate: getEndDate,
        setCurrentDate: setCurrentDate,
        setTimelinePaused: setTimelinePaused,
        loopThroughDays: loopThroughDays,
        resetTimeline: resetTimeline
    }

})();