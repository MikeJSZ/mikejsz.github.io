var APIEndPoint = "http://api.sunrise-sunset.org/json?"
var date;
var updateTimeInterval;
var getLocationInterval;

$(document).ready(function() {
	// Put your code in here!
    updateTime();
    getLocation();
    updateTimeInterval = window.setInterval(updateTime, 999);
    getLocationInterval = window.setInterval(getLocation, 1000*60);

    $("#setDateTimeBtn").click(clickSetTimeDateBtn);
});

function updateTime() {
    date = new moment();
    date.local();

	$("#date_section #day_of_week").text(moment(date).format("ddd. h:mm:ss A"));
	$("#date_section #date").text(moment(date).format("MMMM DD, YYYY"));
}

function clickSetTimeDateBtn(btn) {
    window.clearInterval(updateTimeInterval);
    window.clearInterval(getLocationInterval);

    $("#setTimeDate").html("<input id=\"datetime\" type=\"datetime-local\">" +
                            "<button type=\"button\" id=\"updateBtn\">Update</button>");

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
    $.getJSON(APIEndPoint + "lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "&date=" + date.format("YYYY-MM-DD") + "&callback=?")
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

    $("#content").css("display","inline");
    $("#loading").css("display","none");
}

function loadSunPos(sunriseDate, sunsetDate) {
    var timeNow = moment();
    timeNow.local();
    nowMinute = timeNow.hours() * 60 + timeNow.minutes();
    sunriseMinute = sunriseDate.hours() * 60 + sunriseDate.minutes();
    sunsetMinute = sunsetDate.hours() * 60 + sunsetDate.minutes();

    var progress = (((nowMinute - sunriseMinute) / (sunsetMinute - sunriseMinute)) * 87) + 3;

    if (progress < 3) {
        progress = 3;
    } else if (progress > 87) {
        position = 87;
    }

    $("#sun-img").css("margin-left", progress+"%");

    $
}

//helper functions
function displayError(errorInfo) {
    var item_html = $("#error-prototype").html();
    var innerHTML = Mustache.render(item_html, errorInfo);
    $("#content").html(innerHTML);
    $("#content").css("display","inline");
    $("#loading").css("display","none");
}

function getLocalDateFromUTCDate(utcDateString) {
    var offsetHours = date.zone() / 60;
    var localDate = new moment(utcDateString, "h:mm:ss A");

    localDate = localDate.add(-offsetHours, 'hours');

    return localDate;
}
