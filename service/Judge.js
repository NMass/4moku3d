/*----------------------
FILENAME: Judge.js
AUTHOR:   Kohei_Sakai
ABOUT:    勝敗判定
UPDATE:   2018/7/23
-----------------------*/
'use strict';

module.exports = class Judge {
    constructor() {
        //なにか使いたい変数がある場合はここに"this.~"の形で定義する(entity/Board.jsを参考に)
    }
    static judgement(board) {
        /*---------------
        board(盤面状態の配列)を引数として受け取り、
        どちらが勝ったのかを返す
        return 0; => 引き分けor決着がまだ付いていない
        return 1; => Playerの勝利
        return 2; => CPUの勝利
        ---------------*/
    }
};
