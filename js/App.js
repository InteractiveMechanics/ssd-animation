/**
 * Loads data and initializes all functions
 * Data is scoped as a global variable
 */


var data = function(){};

$(function(){

	var uri = './cache/data.json';

	$.getJSON(uri, function(response, status, jqXHR) {
		data = response;

		Analytics.init();
		Utilities.init();
		Data.init();
		Timeline.init();
		UI.init();
		
	}, 'json');

});
