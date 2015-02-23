//Ready
$(document).ready(function() {
	// Put your code in here!

	$("#grayButton").click(touchGrayBtn);
	$("#whiteButton").click(touchWhiteBtn);
	$("#blueButton").click(touchBlueBtn);
	$("#yellowButton").click(touchYellowBtn);
});

//UI Events
function touchGrayBtn() {
	changeBackgroundColor("gray");
	changeSearchAncher("Search for a Grey Hound.",
						"https://duckduckgo.com/?q=gray+hound");
}

function touchWhiteBtn() {
	changeBackgroundColor("white");
	changeSearchAncher("Search for a White Dog.",
						"https://duckduckgo.com/?q=white+dog");
}

function touchBlueBtn() {
	changeBackgroundColor("blue");
	changeSearchAncher("Search for a Blue Jay.",
						"https://duckduckgo.com/?q=blue+jay");
}

function touchYellowBtn() {
	changeBackgroundColor("yellow");
	changeSearchAncher("Search for a Yellow Angry Bird.",
						"https://duckduckgo.com/?q=yellow+angry+bird");
}

//Functions
function changeBackgroundColor(color) {
	$("body").removeClass();
	$("body").addClass(color);
}

function changeSearchAncher(text, link) {
	$("a").text(text);
	$("a").attr("href", link);
}