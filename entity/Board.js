/*----------------------
FILENAME: Board.js
AUTHOR:   MakTak
ABOUT:    盤面の状態の保持、入力受付、盤面の状態表示
UPDATE:   2018/7/9
-----------------------*/
'use strict';

module.exports = class Board {
    constructor() {
        this.board = Array.apply(null, Array(4)).map(() => Array(16).fill(0));
    }

    showBoard() {
        return this.board;
    }

    inputBoard(player, place) {
        for(let depth of this.board){
            if(depth[place] === 0) {
                depth[place] = player;
                return 1;
            }
        }
        return 0;
    }
};
