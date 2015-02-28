var APIEndPoint = "http://api.sunrise-sunset.org/json?"
var date;

$(document).ready(function() {
	// Put your code in here!

	updateTime();
	getLocation();
});

function updateTime() {
    date = new Date();
	time = date.getTime();
	time = Math.round(time / 1000);
	var dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	$("#date_section #day_of_week").text(dayArray[moment.unix(time).format("E")-1]);
	$("#date_section #date").text(moment.unix(time).format("MMMM DD, YYYY"));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getSunPosFromAPI);
    } else { 
    	displayError({ "errorTitle": "Sorry", "errorText": "Geolocation is not supported by this browser."});
    }
}

function showPosition(position) {

    var innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	

    $("#content").html("<h4>"+innerHTML+"<h4>");
}

function getSunPosFromAPI(position) {
    $.getJSON(APIEndPoint + "lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "&date=today" + "&callback=?")
    .done(parseData)
    .fail(getAPIError);
}

function getAPIError() {
    displayError({ "errorTitle": "Sorry", "errorText": "Refresh Me! - Service Temporarily Unavailable"});
}

function parseData(data) {
    $("#sun-rise .time").text(data["results"]["sunrise"]);
    $("#noon .time").text(data["results"]["solar_noon"]);
    $("#sun-set .time").text(data["results"]["sunset"]);
}

//helper functions
function displayError(errorInfo) {
    var item_html = $("#error-prototype").html();
    var innerHTML = Mustache.render(item_html, errorInfo);
    $("#content").html(innerHTML);
}