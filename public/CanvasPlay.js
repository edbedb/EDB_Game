var thewidth=600, theheight=600; // dimensions of canvas for game
								 // note: must match width/height specifications in html!!
								 
var theboard;    // keeps track of the board state -- 9 element array, each element is:
				 // 0: empty spot
				 // X: x in spot
				 // O: o in spot
				 //   1 | 2 | 3
				 //   ---------
				 //   4 | 5 | 6
				 //   ---------
				 //   7 | 8 | 9
				 
var game_over;   // boolean to keep track of whether we hit a game-over condition

window.addEventListener('load',eventWindowLoaded,false);
			
function eventWindowLoaded() {
	canvasApp();
}

// after the page has loaded, we call canvasApp, the function that scopes all the action
function canvasApp() {
	var mouseX, mouseY;
	var x_move; // boolean keeps track of whether it is X's or O's turn
	var theCanvas=document.getElementById("canvas");
	var context = theCanvas.getContext("2d");
	var thebutton = document.getElementById("clearbutton");
	
	theCanvas.addEventListener("mousemove",onMouseMove, false);
	theCanvas.addEventListener("click",onMouseClick, false);
	thebutton.addEventListener("click",clearit,false);
	
	function clearit(e) { // start game over if button is clicked
		initGame();
	}
	
	function onMouseMove(e) { // keeps track of the x,y coords of mouse
		var rect = theCanvas.getBoundingClientRect();
		mouseX = e.clientX-rect.left;
		mouseY = e.clientY-rect.top;
	}
	
	function initGame() {
		// to initialize a game, we:
		// set it to be x's move
		// set theboard array to all 0's (no pieces played)
		// set game_over to false
		// clear the canvas to erase any moves from previous game
		// then draw the board, and then the game is ready to be played
		x_move = true;
		theboard = [0,0,0,0,0,0,0,0,0];
		game_over = false;
		context.clearRect(0,0,theCanvas.width,theCanvas.height);
		drawBoard();
	}
	
	function onMouseClick(e){
		// x starts game.  depending on whose turn it is, draws appropriate letter 
		// in position that was clicked.
		var stringtodraw;
		if (game_over == false){  // if game is over, don't allow anything to be drawn
			var thesect = whichsector(mouseX, mouseY); // determine which region the click was in.
			if (x_move) stringtodraw = "X";
			else stringtodraw = "O";
			if (drawLetter(stringtodraw,thesect)) { // if a letter was played (not played if clicked
													// in an already filled spot), we change whose move it is
													// and we see if the game has been won
					x_move = ! x_move;
					if (checkwin()) game_over = true;
			}
		}
	}
	
	function drawwinline(fromx,fromy,tox,toy){  // draws the win line
		context.beginPath();
		context.strokeStyle = "green";
		context.lineWidth=5;
		context.moveTo(fromx,fromy);
		context.lineTo(tox,toy);
		context.stroke();
		context.closePath();
	}
	
	function checkwin() { // check if there is a winning board and if so, draw the win line
		// TO DO: make this more efficient
		if (theboard[0] != 0 && theboard[0] == theboard[1] && theboard[0] == theboard[2]) {
			// first row
			drawwinline(0,theheight/6,thewidth,theheight/6);
			return true;
		}
		else if (theboard[3] != 0 && theboard[3] == theboard[4] && theboard[3] == theboard[5]) {
			// second row
			drawwinline(0,theheight/2,thewidth,theheight/2);
			return true;
		}
		else if (theboard[6] != 0 && theboard[6] == theboard[7] && theboard[6] == theboard[8]) {
			// third row
			drawwinline(0,theheight/6*5,thewidth,theheight/6*5);
			return true;
		}
		else if (theboard[0] != 0 && theboard[0] == theboard[3] && theboard[0] == theboard[6]) {
			// first column
			drawwinline(thewidth/6,0,thewidth/6,theheight);
			return true;
		}
		else if (theboard[1] != 0 && theboard[1] == theboard[4] && theboard[1] == theboard[7]) {
			// second column
			drawwinline(thewidth/2,0,thewidth/2,theheight);
			return true;
		}
		else if (theboard[2] != 0 && theboard[2] == theboard[5] && theboard[2] == theboard[8]) {
			// third column
			drawwinline(thewidth/6*5,0,thewidth/6*5,theheight);
			return true;
		}
		else if (theboard[0] != 0 && theboard[0] == theboard[4] && theboard[0] == theboard[8]) {
			// top left to bottom right
			drawwinline(0,0,thewidth,theheight);
			return true;
		}
		else if (theboard[2] != 0 && theboard[2] == theboard[4] && theboard[2] == theboard[6]) {
			// top right to bottom left
			drawwinline(thewidth,0,0,theheight);
			return true;
		}
		else return false;
	}
	
	function whichsector (x,y) { // TO DO: make this more efficient
		// determines which sector of the board the mouse click occurred in
		if (x< thewidth/3){  // 1,4,7
			if (y< theheight/3) { //1
				return 1;
			}
			else if (y< theheight*2/3){//4
				return 4;
			}
			else { //7
				return 7;
			}
		}
		else if (x < thewidth*2/3){ // 2,5,8
			if (y< theheight/3) { //2
				return 2;
			}
			else if (y< theheight*2/3){//5
				return 5;
			}
			else { //8
				return 8;
			}
		}
		else{ // 3,6,9
			if (y< theheight/3) { //3
				return 3;
			}
			else if (y< theheight*2/3){//6
				return 6;
			}
			else { //9
				return 9;
			}
		}
	}
	
	function drawBoard() {  // draws board (duh!)
		context.strokeStyle = "black";
		context.lineWidth=5;
		context.beginPath();
		context.moveTo(0,theheight/3);
		context.lineTo(thewidth,theheight/3);
		context.stroke();
		context.moveTo(0,theheight/3*2);
		context.lineTo(thewidth,theheight/3*2);
		context.stroke();
		context.moveTo(thewidth/3,0);
		context.lineTo(thewidth/3,theheight);
		context.stroke();
		context.moveTo(thewidth/3*2,0);
		context.lineTo(thewidth/3*2,theheight);
		context.stroke();
		context.closePath();
	}
	
	function drawLetter(theletter, theregion) { // TO DO: make more efficient
		context.font = "100px serif";
		context.fillStyle = "#505050";
		context.textAlign = "center";
		context.textBaseline = "middle";
		if (theboard[theregion-1] != 0) return false; // position already has a move so do nothing
		else {
			theboard[theregion-1] = theletter; // make move -- change state of board to reflect move
			switch (theregion){
				case 1:
					context.fillText(theletter,thewidth/6, theheight/6);
					break;
				case 2:
					context.fillText(theletter,thewidth/2, theheight/6);
					break;
				case 3:
					context.fillText(theletter,thewidth/6*5, theheight/6);
					break;
				case 4:
					context.fillText(theletter,thewidth/6, theheight/2);
					break;
				case 5:
					context.fillText(theletter,thewidth/2, theheight/2);
					break;
				case 6:
					context.fillText(theletter,thewidth/6*5, theheight/2);
					break;
				case 7:
					context.fillText(theletter,thewidth/6, theheight/6*5);
					break;
				case 8:
					context.fillText(theletter,thewidth/2, theheight/6*5);
					break;
				case 9:
					context.fillText(theletter,thewidth/6*5, theheight/6*5);
					break;
			}
			return true;
		}
	}
	
	initGame(); // first time playing, initialize the board

}