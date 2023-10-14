let pred = "r";
let pyellow = "y";
let gameOver = false;
let board;
let currRow = []
let currplayer = pred;

window.onload = function () {
    setGame();
}

function setGame() {
    board = []
    currRow = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < 6; r++) {
        let rows= []
        for (let c = 0; c < 7; c++) {
            rows.push(" ");
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tiles");
            document.getElementsByClassName('board')[0].append(tile);
        }
        board.push(rows);
    }
}

let b = document.getElementsByClassName('board')[0]
b.addEventListener('click', function (e) {
    if (gameOver) { 
        return;
    }
    if(e.target.classList.contains('tiles')){
        let t_id = e.target.id
        let coords=t_id.split("-")
        console.log(coords)
        let c = parseInt(coords[1])
        console.log(c)
        let r = currRow[c];
        console.log(r)
        if(r<0){return;}

        let tile=document.getElementById(r.toString() + "-" + c.toString());

        board[r][c] = currplayer;

        if (currplayer == pred) {
            tile.classList.add('bg-red')
            currplayer = pyellow;
        }
        else {
            tile.classList.add('bg-yellow')
            currplayer = pred;
        }
        r-=1;
        currRow[c]=r;

        checkWinner();
    }else{return;}
})

let row=6;
let col=7;
function checkWinner(){
    //horizontal
    for(let r=0;r<row;r++){
        for(let c=0;c<col-3;c++){
            if(board[r][c]!=" "){
                if(board[r][c]==board[r][c+1] && board[r][c+1]==board[r][c+2] && board[r][c+2]==board[r][c+3]){
                    for(let x=c;x<c+4;x++){
                        let t=document.getElementById(r.toString() + "-" + x.toString());

                        t.innerHTML="\u00d7";
                    }
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //vertical
    for(let c=0;c<col;c++){
        for(let r=0;r<row-3;r++){
            if(board[r][c]!=" "){
                if(board[r][c]==board[r+1][c] && board[r+1][c]==board[r+2][c] && board[r+2][c]==board[r+3][c]){
                    for(let x=r;x<r+4;x++){
                        let t=document.getElementById(x.toString() + "-" + c.toString());

                        t.innerHTML="\u00d7";
                    }
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //anti-diagonal
    for(let r=0;r<row-3;r++){
        for(let c=0;c<col-3;c++){
            if(board[r][c]!=" "){
                if(board[r][c]==board[r+1][c+1] && board[r+1][c+1]==board[r+2][c+2] && board[r+2][c+2]==board[r+3][c+3]){
                    for(let x=r;x<r+4;x++){
                        let t=document.getElementById(x.toString() + "-" + (c+(x-r)).toString());
                        t.innerHTML="\u00d7";             
                    }
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //diagonal
    for(let r=3;r<row;r++){
        for(let c=0;c<col-3;c++){
            if(board[r][c]!=" "){
                if(board[r][c]==board[r-1][c+1] && board[r-1][c+1]==board[r-2][c+2] && board[r-2][c+2]==board[r-3][c+3]){
                    for(let x=r;x>r-4;x--){
                        let t=document.getElementById(x.toString() + "-" + (c+(r-x)).toString());
                        t.innerHTML="\u00d7";
                    }
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r,c){
    let win=document.getElementById('winner');
    if(board[r][c]== pred){
        win.innerHTML="<p><strong>RED</strong> wins. Reload to play again</p>"
    }else{
        win.innerHTML="<p><strong>YELLOW</strong> wins. Reload to play again</p>"
    }
    gameOver=true;
}