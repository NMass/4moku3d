/*----------------------
FILENAME: index.js
AUTHOR:   MakTak
ABOUT:    フロントエンドの振る舞いを定義
UPDATE:   2018/7/9
-----------------------*/
'use strict';

let slider;
let board;
let layer = 0;

getBoard();

function getBoard() {
    const request = new XMLHttpRequest();
    request.open("get", 'http://127.0.0.1:3000/api/get/board', false);
    request.send(null);
    board = JSON.parse(request.responseText);
}

function commandInput(userCommand) {
    const request = new XMLHttpRequest();
    request.open("get", 'http://127.0.0.1:3000/api/put/stone/'+String(userCommand-1), false);
    request.send(null);
    console.log(request.responseText);
    const res = JSON.parse(request.responseText);
    if(Array.isArray(res)){
        board = res;
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
    const map = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]];
    let grid = 0;
    while(grid < 4){
        for(let y=0; y < 4; y++){
            for(let x=0; x < 4; x++){
                if(board[layer][map[y][x]] == 1) {
                    fill('#bfbfbf');
                    ellipse((x+1)*80, (y+1)*80, 80, 80,1);
                }else if(board[layer][map[y][x]] == 2) {
                    fill('#222222');
                    ellipse((x+1)*80, (y+1)*80, 80, 80,1);
                }else {
                    fill('#FFFFFF');
                    ellipse((x+1)*80, (y+1)*80, 80, 80,1);
                }
            }
        }
        grid++;
    }
}

function setup() {
    const canvas = createCanvas(500, 420);
    canvas.parent("board");
    slider = createSlider(0, 3, 0, 1);
    slider.position(40, 420);
    slider.style('width', '330px');
    for(let y=0; y < 4; y++){
        for(let x=0; x < 4; x++){
            ellipse((x+1)*80, (y+1)*80, 80, 80,0);
        }
    }
}

function draw() {
    layer = slider.value();
    updateBoard(board, layer);
}
