var Border;
const Player='O';
const aiPlayer='X';
const winnercombo=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]
const cells = document.querySelectorAll('.cell');
startgame();

function startgame(){
    document.querySelector(".endgame").style.display="none";
    Border=Array.from(Array(9).keys());
    for (var i=0; i<cells.length; i++){
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnclick, false)
    }
}

function turnclick(square){
    if (typeof Border[square.target.id]== 'number'){
        turn(square.target.id, Player);
        if(!checktie()) turn(spot(),aiPlayer);
    }
    
}
function turn(squareID,player){
    Border[squareID]=player;
    document.getElementById(squareID).innerText=player;
    let gamewon= checkWin(Border,player)
    if(gamewon) gameover(gamewon)
}

function checkWin(board,player){
    let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
    let gamewon=null;
    for (let [index, win] of winnercombo.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gamewon = {index: index, player: player};
            break;
        }
    }
    
    return gamewon;
}

function gameover(gamewon){
    for(let index of winnercombo[gamewon.index]){
        document.getElementById(index).style.backgroundColor=
        gamewon.player == Player ? "green" : "brown";
        
    }
    for (var i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', turnclick, false);
    }
    declarewinner(gamewon.player== Player ? "congrats you win!": "you lose")
}

function emptysquare(){
    return Border.filter(s=> typeof s == 'number');
}

function spot(){
    return minimax(Border,aiPlayer).index;
}

function checktie(){
    if(emptysquare().length == 0){
        for(var x=0; x<cells.length; x++){
            cells[x].style.backgroundColor="blue";
            cells[x].removeEventListener('click',turnclick, false);
        }
        declarewinner("Tie Game !")
        return true;
    }
    return false;
}

function declarewinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function minimax(newBoard, player){
    var avaspots = emptysquare(newBoard);

    if(checkWin(newBoard,player)){
        return{score:-10};
    } 
    else if(checkWin(newBoard, aiPlayer)){
        return{score:10};
    } 
    else if(avaspots.length===0){
        return{score:0};
    }

    var moves = [];
	for (var i = 0; i < avaspots.length; i++) {
		var move = {};
		move.index = newBoard[avaspots[i]];
		newBoard[avaspots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, Player);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[avaspots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} 
    else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}