var pos = [];
var playerNames = [];
var isGameFinished = false;

$(document).ready(function() {
	// Put your code in here!

	$("body").keyup(keyPressed);
	$("a#race_btn").click(startRace);
	$("select#num_of_players").change(numOfPlayerChanged);

});

function keyPressed(key) {
	if (!isGameFinished) {
		var keyCode = key.keyCode;
		var numOfPlayer = playerNames.length;
		if ((numOfPlayer >= 1) && (keyCode === 97 || keyCode === 65)) {
			advancePlayer(1);
		}
		if ((numOfPlayer >= 2) && (keyCode === 108 || keyCode === 76)) {
			advancePlayer(2);
		}
		if ((numOfPlayer >= 3) && (keyCode === 99 || keyCode === 67)) {
			advancePlayer(3);
		}
		if ((numOfPlayer >= 4) && (keyCode === 110 || keyCode === 78)) {
			advancePlayer(4);
		}
		if ((numOfPlayer >= 5) && (keyCode === 187)) {
			advancePlayer(5);
		}
	}

}

function startRace () {
	var body = $("body");
	var numOfPlayer = $("select#num_of_players").val();

	var htmlText = "";

	playerNames = [];

	for (var i = 1; i <= numOfPlayer; i++) {
		var currentPlayerTag = "#player"+i+"_name";
		var currentPlayerName = $(currentPlayerTag).val();

		var key = "";

		pos[i-1] = "1";

		if (currentPlayerName.length) {
			playerNames[playerNames.length] = currentPlayerName;
		} else {
			playerNames[playerNames.length] = "Player" + i;
		}

		if (i==1) {
			key = "A";
		} else if (i==2) {
			key = "L";
		} else if (i==3) {
			key = "C";
		} else if (i==4) {
			key = "N";
		} else if (i==5) {
			key = "=";
		}

		htmlText +=	(
						"<h5>"+playerNames[i-1]+", Press ["+key+"] to advance</h5>" +
						"<table>" +
							"<tr class='player-"+i+"'>" +
								"<td class='active'></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
								"<td></td>  <td></td>  <td></td>  <td></td>  <td></td>" +
							"</tr>" +
						"</table>"
					);
	}
	body.html("");
	body.append(htmlText);
}

function numOfPlayerChanged (event) {
	var numOfPlayer = $("select#num_of_players").val();
	var playerNameInputs = $("div#player_name_inputs");
	playerNameInputs.html("");
	for (var i = 1; i <= numOfPlayer; i++) {
		var htmlText = 	(
							"<input type='text' id='player"+i+"_name' placeholder='Player"+i+" Name'><br>"
						)
		playerNameInputs.append(htmlText);
	}
}

function advancePlayer(player) {
	var totalCellClassTag = ".player-"+player+" td";
	var	activeCellClassTag = ".player-"+player+" td.active";

	var localPos = pos[player-1];

	var totalCellCount = ($(totalCellClassTag)).length;

	if (localPos === totalCellCount) {
		playerWin(playerNames[player-1]);
	} else {
		$(activeCellClassTag).removeClass();
		$(totalCellClassTag).eq(localPos++).addClass("active");
	}

	pos[player-1] = localPos;
}

function playerWin(name) {
	isGameFinished = true;
	var htmlText = "<h1>"+name+", You are the winner!</h1>";
	$("body").prepend(htmlText);
	$("h1").css("text-align", "center");
}