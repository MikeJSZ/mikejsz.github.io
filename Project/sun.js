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
    var sunriseDate = getLocalDateFromUTCDate(data["results"]["sunrise"]);
    var noonDate = getLocalDateFromUTCDate(data["results"]["solar_noon"]);
    var sunsetDate = getLocalDateFromUTCDate(data["results"]["sunset"]);

    $("#sun-rise .time").text(moment(sunriseDate).format("h:mm:ss A"));
    $("#noon .time").text(moment(noonDate).format("h:mm:ss A"));
    $("#sun-set .time").text(moment(sunsetDate).format("h:mm:ss A"));

    loadSunPos(sunriseDate, sunsetDate);
}

function loadSunPos(sunriseDate, sunsetDate) {
    var timeNow = moment();
    timeNow.local();
    nowMinute = timeNow.hours() * 60 + timeNow.minutes();
    sunriseMinute = sunriseDate.hours() * 60 + sunriseDate.minutes();
    sunsetMinute = sunsetDate.hours() * 60 + sunsetDate.minutes();

    var progress = ((nowMinute - sunriseMinute) / (sunsetMinute - sunriseMinute)) * 95;

    if (progress < 0) {
        progress = 0;
    } else if (progress > 95) {
        position = 95;
    }

    $("#sun-img").css("margin-left", progress+"%");
}

//helper functions
function displayError(errorInfo) {
    var item_html = $("#error-prototype").html();
    var innerHTML = Mustache.render(item_html, errorInfo);
    $("#content").html(innerHTML);
}

function getLocalDateFromUTCDate(utcDateString) {
    var offsetHours = date.getTimezoneOffset() / 60;
    var localDate = new moment(utcDateString, "h:mm:ss A");

    localDate = localDate.add(-offsetHours, 'hours');

    return localDate;
}
