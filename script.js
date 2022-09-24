let selectet = null;
let currentlyColor = "w";
let board = [[[0, 0], "w_tower"],[[0, 1], "w_knight"],[[0, 2], "w_bishop"],[[0, 3], "w_queen"],[[0, 4], "w_king"],[[0, 5], "w_bishop"],[[0, 6], "w_knight"],[[0, 7], "w_tower"],
             [[1, 0], "w_pawnf"],[[1, 1], "w_pawnf"],[[1, 2], "w_pawnf"],[[1, 3], "w_pawnf"],[[1, 4], "w_pawnf"],[[1, 5], "w_pawnf"],[[1, 6], "w_pawnf"],[[1, 7], "w_pawnf"],
             [[2, 0], null],[[2, 1], null],[[2, 2], null],[[2, 3], null],[[2, 4], null],[[2, 5], null],[[2, 6], null],[[2, 7], null],
             [[3, 0], null],[[3, 1], null],[[3, 2], null],[[3, 3], null],[[3, 4], null],[[3, 5], null],[[3, 6], null],[[3, 7], null],
             [[4, 0], null],[[4, 1], null],[[4, 2], null],[[4, 3], null],[[4, 4], null],[[4, 5], null],[[4, 6], null],[[4, 7], null],
             [[5, 0], null],[[5, 1], null],[[5, 2], null],[[5, 3], null],[[5, 4], null],[[5, 5], null],[[5, 6], null],[[5, 7], null],
             [[6, 0], "b_pawnf"],[[6, 1], "b_pawnf"],[[6, 2], "b_pawnf"],[[6, 3], "b_pawnf"],[[6, 4], "b_pawnf"],[[6, 5], "b_pawnf"],[[6, 6], "b_pawnf"],[[6, 7], "b_pawnf"],
             [[7, 0], "b_tower"],[[7, 1], "b_knight"],[[7, 2], "b_bishop"],[[7, 3], "b_queen"],[[7, 4], "b_king"],[[7, 5], "b_bishop"],[[7, 6], "b_knight"],[[7, 7], "b_tower"]]

function select(e){
    let id = e.id;
    console.log(document.getElementById(id).classList);
    for (let i = 0; i < board.length; i++) {
        if(board[i][0][0].toString()+board[i][0][1].toString() == id){
            if(board[i][1]!=null){
                let figur = board[i][1].split("_");
                let color = figur[0];
                let name = figur[1];
                let board_coords = board[i][0];
                if(color == currentlyColor){
                    removeSelects();
                    move(name, board_coords);
                    e.classList.toggle("selectet-field");
                    selectet = i;
                }
                else if(selectet !=null && document.getElementById(id).classList[1] == "selectet"){
                    capture(i, board[i][1].split("_")[1]);
                    removeSelects();
                    if(currentlyColor == "w"){
                        currentlyColor = "b";
                    }else{
                        currentlyColor = "w";
                    }
                }
                break
            }else if(document.getElementById(id).classList[1] == "selectet"){
                if(board[selectet][1] == currentlyColor+"_pawnf"){
                    board[selectet][1] = currentlyColor+"_pawn";
                }
                board[i][1] = board[selectet][1];
                board[selectet][1] = null;
                selectet = null;
                updateBoard();
                removeSelects();
                if(currentlyColor == "w"){
                    currentlyColor = "b";
                }else{
                    currentlyColor = "w";
                }
            }else{
                console.log("null");
                removeSelects();
            }
        }
    }
}
function updateBoard(){
    for (let i = 0; i < board.length; i++) {
        let id = board[i][0][0].toString()+board[i][0][1].toString();
        let field = document.getElementById(id);
        field.innerHTML = "";
        if(board[i][1] != null){
            field.innerHTML = ('<img src="images/pieces/'+board[i][1]+'.png" alt="'+board[i][1]+'" width="40px"></img>');
        }
        
    }
}
function move(figur, coords){
    switch(figur){
        case "queen":
            console.log("queen move!")
            forward(coords);
            diagonal(coords);
            break;
        case "bishop": 
            console.log("bishop move!")
            diagonal(coords);
            break;
        case "tower":
            console.log("tower move!")
            forward(coords);
            break;
        case "pawnf":
            pawnMove(coords, true);
            console.log("pawn move!")
            break;
        case "pawn":
            pawnMove(coords, false);
            console.log("pawn move!")
            break;
        case "knight":
            knightMove(coords)
            console.log("knight move!")
            break;
        case "king":
            console.log("king move!");
            kingMove(coords);
            break;
    }
}
function capture(i, figur){
    console.log("capture");
    board[i][1] = board[selectet][1];
    board[selectet][1] = null;
    selectet = null;
    updateBoard();
    addToCaptureList(figur);
}
function forward(coords){
    for (let l = 0; l < 4; l++) {
        let change = 1;
        let changingCoord = "y";
        let border = 0;
        switch(l){
            case 0:
                border = 7-coords[1];
                break;
            case 1:
                change = -1;
                border = coords[1];
                break;
            case 2:
                changingCoord = "x";
                border = 7-coords[0];
                break;
            case 3:
                change = -1;
                changingCoord = "x";
                border = coords[0];
                break;
        }
        let i = 0;
        let figureInWay = false;
        let toggle = true;
        while(i < border && !figureInWay){
            let id = 0;
            i++;
            if(changingCoord == "y"){
                let y = coords[1]+i*change;
                id = coords[0].toString()+y.toString();
                let free = lookFree(id);
                toggle = free[0];
                figureInWay = free[1];
            }
            else if(changingCoord == "x"){
                let x = coords[0]+i*change;
                id = x.toString()+coords[1].toString();
                let free = lookFree(id);
                toggle = free[0];
                figureInWay = free[1];
            }
            if(toggle){
                document.getElementById(id).classList.toggle("selectet");
            }
        }

    }
}
function kingMove(coords){
    for (let i = 0; i < 8; i++) {
        let y = coords[1];
        let x = coords[0];
        switch(i){
            case 0:
                y++;
                break;
            case 1:
                y--;
                break;
            case 2:
                x++;
                break;
            case 3:
                x--;
                break;
            case 4:
                y++;
                x++;
                break;
            case 5:
                y--;
                x--;
                break;
            case 6:
                y++;
                x--;
                break;
            case 7:
                y--;
                x++;
                break;
        }
        let id = x.toString()+y.toString();
        if(lookFree(id)[0] && (x>-1 && x<8 && y>-1 && y<8)){
            document.getElementById(id).classList.toggle("selectet");
        }
    }
}

function diagonal(originalCoords){
    for (let i = 0; i < 4; i++) {
        let x = originalCoords[0];
        let y = originalCoords[1];
        let figureInWay = false;
        while(!figureInWay){
            switch(i){
            case 0:
                x++;
                y++;
                break;
            case 1:
                x--;
                y--;
                break;
            case 2:
                x--;
                y++;
                break;
            case 3: 
                x++;
                y--;
                break;
            }
            if(x > 7 || y > 7 || x < 0 || y < 0){
                break;
            }
            let id = x.toString()+y.toString();
            let free = lookFree(id);
                toggle = free[0];
                figureInWay = free[1];
            if(toggle){
                document.getElementById(id).classList.toggle("selectet");
            }
            
        }
        
    }
}
function pawnMove(coords, firstMove){
    border = 3;
    if(!firstMove){
        border = 2;
    }
    // move forward
    for (let i = 1; i < border; i++) {
            let id = 0;
            switch(currentlyColor){
                case "w":
                    id = (coords[0]+i).toString()+coords[1].toString();
                    break;
                case "b":
                    id = (coords[0]-i).toString()+coords[1].toString();
                    break;
            }
            if(!lookFree(id)[1]){
                document.getElementById(id).classList.toggle("selectet");
            }else{
                break;
            }
    }
    // capture
    let id = 0;
    switch(currentlyColor){
        case "w":{
            id = (coords[0]+1).toString()+(coords[1]+1).toString();
            break;
        }
        case "b":{
            id = (coords[0]-1).toString()+(coords[1]+1).toString();
        }
    }
    if(lookFree(id)[0] && lookFree(id)[1]){
        document.getElementById(id).classList.toggle("selectet");
    }
    id = 0;
    switch(currentlyColor){
        case "w":{
            id = (coords[0]+1).toString()+(coords[1]-1).toString();
            break;
        }
        case "b":{
            id = (coords[0]-1).toString()+(coords[1]-1).toString();
        }
    }
    if(lookFree(id)[0] && lookFree(id)[1]){
        document.getElementById(id).classList.toggle("selectet");
    }
}
function knightMove(coords){
    for (let i = 0; i < 8; i++) {
        let y = coords[1];
        let x = coords[0];
        switch(i){
            case 0:
                y = y+2;
                x--;
                break;
            case 1:
                y = y+2;
                x++;
                break;
            case 2:
                y = y-2;
                x++;
                break;
            case 3:
                y = y-2;
                x--;
                break;
            case 4:
                x = x +2;
                y++;
                break;
            case 5:
                x = x +2;
                y--;
                break;
            case 6:
                x = x -2;
                y--;
                break;
            case 7:
                x = x -2;
                y++;
                break;
        }
        let id = x.toString()+y.toString();
        if(lookFree(id)[0] && (x>-1 && x<8 && y>-1 && y<8)){
            document.getElementById(id).classList.toggle("selectet");
        }
    }
}
function lookFree(id){
    let toggle = true;
    let figureInWay =false;
    for (let i = 0; i < board.length; i++) {
        if(board[i][0][0].toString()+board[i][0][1].toString() == id && board[i][1]!=null){
            if(board[i][1].split("_")[0] == currentlyColor){
                toggle = false;
            }
            figureInWay = true;
        }
    }
    let free = [toggle, figureInWay];
    return free
}
function removeSelects(){
    for (let i = 0; i < board.length; i++) {
        let id = board[i][0][0].toString()+board[i][0][1].toString();
        let field = document.getElementById(id);
        field.classList = "field";
    }
}
function checkTest(coords){
    for (let i = 0; i < board.length; i++) {
        if(board[i][1] != null &&  board[i][1].split("_")[1] !== currentlyColor){
            move(board[i][1].split("_")[0], coords, true);
        }
    }
}

// header menu
let whiteCapturedFigurs = [["pawn", 0, 1], ["bishop", 0, 3], ["knight", 0, 3], ["tower", 0, 4], ["queen", 0, 9]];
let blackCapturedFigurs = [["pawn", 0, 1], ["bishop", 0, 3], ["knight", 0, 3], ["tower", 0, 4], ["queen", 0, 9]];
function addToCaptureList(figur){
    let id = 0;
    switch(figur){
        case "bishop":
            id = 1;
            break;
        case "knight":
            id = 2;
            break;
        case "tower":
            id = 3;
            break;
        case "queen":
            id = 4;
    }
    if(currentlyColor == "w"){
        whiteCapturedFigurs[id][1]++;
    }
    if(currentlyColor == "b"){
        blackCapturedFigurs[id][1]++;
    }
    updateMenu();
}

function updateMenu(){
    let whiteCount = document.getElementById("imagesp1");
    whiteCount.innerHTML = "";
    let figurNumber = 0;
    let margin = 0;
    let whiteWeight = 0;
    let blackWeight = 0;
    for (let i = 0; i < whiteCapturedFigurs.length; i++) {
        if(whiteCapturedFigurs[i][1] != 0){
            for (let amount = 0; amount < whiteCapturedFigurs[i][1]; amount++) {
                let left = 5*(figurNumber)+margin;
                whiteCount.innerHTML += '<img style="left: '+left+'px; z-index: '+figurNumber+';" src="images/pieces/b_'+whiteCapturedFigurs[i][0]+'.png" alt="b_'+whiteCapturedFigurs[i][0]+'" width="20px"></img>';
                figurNumber++;
                whiteWeight += whiteCapturedFigurs[i][2];
            }
            margin += 10;
        }
    }
    let blackCount = document.getElementById("imagesp2");
    blackCount.innerHTML = "";
    figurNumber = 0;
    margin = 0;
    for (let i = 0; i < blackCapturedFigurs.length; i++) {
        if(blackCapturedFigurs[i][1] != 0){
            for (let amount = 0; amount < blackCapturedFigurs[i][1]; amount++) {
                let left = 5*(figurNumber)+margin;
                blackCount.innerHTML += '<img style="left: '+left+'px; z-index: '+figurNumber+';" src="images/pieces/w_'+blackCapturedFigurs[i][0]+'.png" alt="w_'+blackCapturedFigurs[i][0]+'" width="20px"></img>';
                figurNumber++;
                blackWeight += blackCapturedFigurs[i][2];
            }
            margin += 10;
        }
    }
    let whiteCountNum = document.getElementById("whiteCount");
    let blackCountNum = document.getElementById("blackCount");
    whiteCountNum.innerHTML = "";
    blackCountNum.innerHTML = "";
    if(blackWeight>whiteWeight){
        blackCountNum.innerHTML = "+"+(blackWeight-whiteWeight);
    }
    else if(blackWeight<whiteWeight){
        whiteCountNum.innerHTML = "+"+(whiteWeight-blackWeight);
    }
}