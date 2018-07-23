/*----------------------
FILENAME: Enemy.js
AUTHOR:   Masamitsu_Yakushiji
ABOUT:    CPUの振る舞いを定義
UPDATE:   2018/7/23
-----------------------*/
'use strict';

const Judge = require('./Judge');

module.exports = class Enemy {
    constructor() {
        //なにか使いたい変数がある場合はここに"this.~"の形で定義する(entity/Board.jsを参考に)
	    //石・ライン対応リスト
	    const lineList = new Array(64);
	    lineList[0]=[0,16,32,48,56,64,72];
	    lineList[1]=[0,17,33,57];
	    lineList[2]=[0,18,34,58];
        lineList[3]=[0,19,35,52,59,68,73];
        lineList[4]=[1,20,32,49];
        lineList[5]=[1,21,33,64];
        lineList[6]=[1,22,34,68];
        lineList[7]=[1,23,35,53];
        lineList[8]=[2,24,32,50];
        lineList[9]=[2,25,33,68];
        lineList[10]=[2,26,34,64];
        lineList[11]=[2,27,35,54];
        lineList[12]=[3,28,32,51,60,68,74];
        lineList[13]=[3,29,33,61];
        lineList[14]=[3,30,34,62];
        lineList[15]=[3,31,35,55,63,64,75];
        lineList[16]=[4,16,36,65];
        lineList[17]=[4,17,37,48];
        lineList[18]=[4,18,38,52];
        lineList[19]=[4,19,39,69];
        lineList[20]=[5,20,36,56];
        lineList[21]=[5,21,37,49,57,65,72];
        lineList[22]=[5,22,38,53,58,69,73];
	    lineList[23]=[5,23,39,59];
        lineList[24]=[6,24,36,60];
        lineList[25]=[6,25,37,50,61,69,74];
        lineList[26]=[6,26,38,54,62,65,75];
        lineList[27]=[6,27,39,63];
        lineList[28]=[7,28,36,69];
        lineList[29]=[7,29,37,51];
        lineList[30]=[7,30,38,55];
        lineList[31]=[7,31,39,65];
        lineList[32]=[8,16,40,66];
        lineList[33]=[8,17,41,52];
        lineList[34]=[8,18,42,48];
        lineList[35]=[8,19,43,70];
        lineList[36]=[9,20,40,60];
        lineList[37]=[9,21,41,53,61,66,75];
        lineList[38]=[9,22,42,49,62,70,74];
        lineList[39]=[9,23,43,63];
        lineList[40]=[10,24,40,56];
        lineList[41]=[10,25,41,54,57,70,73];
        lineList[42]=[10,26,42,50,58,66,72];
        lineList[43]=[10,27,43,59];
        lineList[44]=[11,28,40,70];
        lineList[45]=[11,29,41,55];
        lineList[46]=[11,30,42,51];
        lineList[47]=[11,31,43,66];
        lineList[48]=[12,16,44,52,60,67,75];
        lineList[49]=[12,17,45,61];
        lineList[50]=[12,18,46,62];
        lineList[51]=[12,19,47,48,63,71,74];
        lineList[52]=[13,20,44,53];
        lineList[53]=[13,21,45,67];
        lineList[54]=[13,22,46,71];
        lineList[55]=[13,23,47,49];
        lineList[56]=[14,24,44,54];
        lineList[57]=[14,25,45,71];
        lineList[58]=[14,26,46,67];
        lineList[59]=[14,27,47,50];
        lineList[60]=[15,28,44,55,56,71,73];
        lineList[61]=[15,29,45,57];
        lineList[62]=[15,30,46,58];
        lineList[63]=[15,31,47,51,59,67,72];

        let stoneLine = Array.apply(null, Array(64)).map(() => Array(76).fill(0));

        for(let index in lineList) {
            for(let cell of lineList[index]) {
                stoneLine[index][cell] = 1;
            }
		}

        this.lineList = lineList;
        this.stoneLine = stoneLine;
	}


    select(board) {
        /*---------------
        board(盤面状態の配列)を引数として受け取り、
        CPU側の次の手を返す
        return hoge => 次の手(ここではhoge)を返す
        ---------------*/
        let boardCount = (new Array(16)).fill(0);
	    let legal = (new Array(16)).fill(0);
	    for(let i = 0; i < 4; i++) {
		    for(let j = 0; j < 16; j++) {
	            if(board[i][j] === 1 || board[i][j] === 2) {
                    boardCount[j]++;
                }

                if( boardCount[j] < 3 ){
                    legal[i] = true;
                }else{
                    legal[i] = false;
                }
            }
		}

	    let stone = new Array(64);

	    for (let i = 0; i < 4; i++) {
		    for(let j = 0; j < 16; j++) {
				stone[i*16+j] = board[i][j];
            }
        }
        //自陣と敵の有効ラインリスト
        //board状態から自陣有効ラインリスト生成
        //board状態から敵陣有効ラインリスト生成
        let myLine = new Array(76);
        myLine.forEach(value => value = true);

        let enemyLine = new Array(76);
        enemyLine.forEach(value => value = true);

        for(let i = 0; i < 76; i++) {
            if(stone[i] === 1) this.lineList[i].forEach(value => myLine[value] = false);
            if(stone[i] === 2) this.lineList[i].forEach(value => enemyLine[value] = false);
        }

        //最優秀手順保存配列
        //最優秀評価保存変数
        //自他有効ラインリストコピー用

        //次手の合法手最大16個について勝利条件を満たすか否かチェック
        //満たすなら即座にその手を0~15で返して終了
	    for(let i = 0;i < 16; i++) {
            if(legal[i] === true){
                let instBoard = board;
                instBoard[i][boardCount[i]] = 2;
                //ジャッジに投げる
                //自分が勝ちならその手
                if(Judge.judgement(instBoard) === 2) {
                    return i;
                }
            }
        }

        //長さnの「手順を入れる」配列を用意
        //盤面評価値を入れる変数を用意
        //有効ラインリストをコピー
        //n手先を見るforのn（深さ）重ループか再帰
        //合法手か否かチェック
        //合法手なら石番号を参照してコピー有効ラインリストを消す
        //有効ラインリストの数の差=盤面評価値を出す
        //評価値が最大なら手順配列と評価値変数を現ループ内容で上書き

        let pointList = Array.apply(null, Array(16)).map(() => Array(16).fill(0));
	    let minPoint = 1000;
        let maxPoint = -100;
        let point = 0;
        let instBoard = board;
        let nowBoardCount = boardCount;

        for(let i = 0; i < 16; i++) {
            for(let j = 0; j < 16; j++){
                point = 0;
                nowBoardCount = boardCount;
                if(nowBoardCount[i] === 4) {
                    point = -1000;
                }else {
				    instBoard[nowBoardCount[i]][i] = 2;
                    nowBoardCount[i]++;
                }
                for(let line in this.lineList[j+nowBoardCount[j]*16]) {
                    if(this.stoneLine[line][i+nowBoardCount[i]*16] && enemyLine[line]) point++;
			    }

			    if(nowBoardCount[j] === 4) {
                    point = -1000;
                }else {
                    instBoard[nowBoardCount[j]][j] = 1;
                    nowBoardCount[j]++;
                }

                for(let line in this.lineList[j+nowBoardCount[j]*16]) {
                    if(this.stoneLine[j+nowBoardCount[j]*16][line] && myLine[line]) point--;
				}

                if(Judge.judgement(instBoard) === 1) point = -10000;

			    //instBoardをジャッジに投げて負けてたらマイナスひゃくおくまんてん
                pointList[i][j]=point;
            }
        }
	    let hand = (new Array(16)).fill(0);
	    for(let i = 0; i < 16; i++) {
		    for(let j = 0; j < 16; j++) {
                if(minPoint > pointList[i][j]) {
                    minPoint = pointList[i][j];
                    hand[i] = minPoint;
                }
            }
        }
        let fin;
        for(let i = 0; i < 16; i++) {
            if(maxPoint < hand[i]) {
                maxPoint = hand[i];
                fin = i;
            }
        }
        return fin;
    }
}
