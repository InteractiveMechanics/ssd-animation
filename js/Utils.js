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
		$('aside').removeClass('show');
		
		// HIDE / SHOW NAV SCREENS
	    $('.nav-intro').addClass('show');
	    $('.nav-outro').removeClass('show');
	    $('.nav-options').removeClass('show');
    }

    var resetBrowser = function() {
        location.reload();
    }
    
    var startTimeline = function() {
	    clearRestartTimer();
	    
	    // HIDE ATTRACT
	    $('#intro').removeClass('show');
	    $('aside').addClass('show');
	    	    
	    // HIDE / SHOW NAV SCREENS
	    $('.nav-intro').removeClass('show');
	    $('.nav-outro').removeClass('show');
	    $('.nav-options').addClass('show');
	    
	    // RESET EVERYTHING
	    // START TIMELINE
	    Timeline.setTimelinePaused(false);
	    Timeline.resetTimeline();
	    Timeline.loopThroughDays();
	    UI.resetFilters();
    }
    
    var endTimeline = function() {	    
	    // HIDE / SHOW NAV SCREENS
	    $('.nav-intro').removeClass('show');
	    $('.nav-outro').addClass('show');
	    $('.nav-options').removeClass('show');
	    
	    Timeline.setTimelinePaused(true);
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