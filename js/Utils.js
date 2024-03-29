Utilities = (function() {
	var timer;
	var duration = 30000; // 30 seconds
	
	var init = function() {
        bindEvents();
    }
    
    var bindEvents = function() {
        $(document).on('click tap drag', '#intro', startTimeline);
        $(document).on('click tap drag', '#restart', startTimeline);
    }

    var resetInteractive = function() {
	    clearRestartTimer();
	    
		// RETURN TO ATTRACT SCREEN
		$('#intro').addClass('show');
		$('#outro').removeClass('show');
		$('aside').removeClass('show');
		
		Analytics.sendAnalyticsScreen('Screen: Introduction');
    }

    var resetBrowser = function() {
        location.reload();
    }
    
    var startTimeline = function() {
	    clearRestartTimer();
	    
	    // HIDE ATTRACT
	    $('#intro').removeClass('show');
	    $('#outro').removeClass('show');
	    $('aside').addClass('show');
	    
	    // RESET EVERYTHING
	    // START TIMELINE
	    Timeline.setTimelinePaused(false);
	    Timeline.resetTimeline();
	    Timeline.loopThroughDays();
	    UI.resetFilters();
	    
	    Analytics.sendAnalyticsScreen('Screen: Map Animation');
    }
    
    var endTimeline = function() {
	    $('#outro').addClass('show');
	    
	    Timeline.setTimelinePaused(true);
	    
	    Analytics.sendAnalyticsScreen('Screen: Conclusion');
    }
    
    var startRestartTimer = function() {
	    timer = setTimeout(function() {
		    resetInteractive();
		    Timeline.resetTimeline();
	    }, duration);
    }
    
    var clearRestartTimer = function() {
	    clearTimeout(timer);
	    timer = null;
    }
    
    return {
        init: init,
        startTimeline: startTimeline,
        endTimeline: endTimeline,
        resetInteractive: resetInteractive,
        startRestartTimer: startRestartTimer
    }

})();