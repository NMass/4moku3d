/*----------------------
FILENAME: index.js
AUTHOR:   MakTak
ABOUT:    フロントエンドの振る舞いを定義
UPDATE:   2018/7/9
-----------------------*/
'use strict';

let slider;
let board;

function getBoard() {
    const request = new XMLHttpRequest();
    request.open("get", 'http://127.0.0.1:3000/api/get/board', false);
    request.send(null);
    board = JSON.parse(request.responseText);
}

function commandInput(userCommand) {
    const request = new XMLHttpRequest();
    request.open("post", 'http://127.0.0.1:3000/api/put/stone', false);
    request.send(userCommand-1);
    const res = JSON.parse(request.responseText);
    if(Array.isArray(res)){
        if(res.findIndex(function(element, index, array) { return element.indexOf(0) >= 0; })){
            board = res;
        }else{
            let doc = document.getElementById("result");
            doc.style.color = 'red';
            doc.innerText = 'DRAW!';
            board = res;
        }
    }else{
        getBoard();
        let doc = document.getElementById("result");
        doc.style.color = 'red';
        if(res == 1) {
            doc.innerText = 'You Win!';
        }else if(res == 2) {
            doc.innerText = 'CPU Win!';
        }
    }

}

function updateBoard(board, layer) {
    clear();
    let grid = 0;
    for(let y=0; y <= 3; y++){
        for(let x=0; x <= 3; x++){
            if(board && layer){
                if(board[layer][grid] == 1) {
                    fill('#bfbfbf');
                    ellipse((x+1)*80, (y+1)*80, 80, 80);
                }else if(board[layer][grid] == 2) {
                    fill('#222222');
                    ellipse((x+1)*80, (y+1)*80, 80, 80);
                }else {
                    ellipse((x+1)*80, (y+1)*80, 80, 80);
                }
            }else {
                ellipse((x+1)*80, (y+1)*80, 80, 80);
            }
            grid++;
        }
    }
}

function setup() {
    const canvas = createCanvas(500, 420);
    canvas.parent("board");
    slider = createSlider(0, 4, 0, 1);
    slider.position(40, 420);
    slider.style('width', '330px');
    for(let y=0; y <= 3; y++){
        for(let x=0; x <= 3; x++){
            ellipse((x+1)*80, (y+1)*80, 80, 80);
        }
    }
}

function draw() {
    let layer = slider.value();
    updateBoard(board, layer);
}
