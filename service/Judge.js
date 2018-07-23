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

        let lineList = new Array(76);
        lineList[0]=[0,1,2,3];
        lineList[1]=[4,5,6,7];
        lineList[2]=[8,9,10,11];
        lineList[3]=[12,13,14,15];
        lineList[4]=[16,17,18,19];
        lineList[5]=[20,21,22,23];
        lineList[6]=[24,25,26,27];
        lineList[7]=[28,29,30,31];
        lineList[8]=[32,33,34,35];
        lineList[9]=[36,37,38,39];
        lineList[10]=[40,41,42,43];
        lineList[11]=[44,45,46,47];
        lineList[12]=[48,49,50,51];
        lineList[13]=[52,53,54,55];
        lineList[14]=[56,57,58,59];
        lineList[15]=[60,61,62,63];
        lineList[16]=[0,16,32,48];
        lineList[17]=[1,17,33,49];
        lineList[18]=[2,18,34,50];
        lineList[19]=[3,19,35,51];
        lineList[20]=[4,20,36,52];
        lineList[21]=[5,21,37,53];
        lineList[22]=[6,22,38,54];
        lineList[23]=[7,23,39,55];
        lineList[24]=[8,24,40,56];
        lineList[25]=[9,25,41,57];
        lineList[26]=[10,26,42,58];
        lineList[27]=[11,27,43,59];
        lineList[28]=[12,28,44,60];
        lineList[29]=[13,29,45,61];
        lineList[30]=[14,30,46,62];
        lineList[31]=[15,31,47,63];
        lineList[32]=[0,4,8,12];
        lineList[33]=[1,5,9,13];
        lineList[34]=[2,6,10,14];
        lineList[35]=[3,7,11,15];
        lineList[36]=[16,20,24,28];
        lineList[37]=[17,21,25,29];
        lineList[38]=[18,22,26,30];
        lineList[39]=[19,23,27,31];
        lineList[40]=[32,36,40,44];
        lineList[41]=[33,37,41,45];
        lineList[42]=[34,38,42,46];
        lineList[43]=[35,39,43,47];
        lineList[44]=[48,52,56,60];
        lineList[45]=[49,53,57,61];
        lineList[46]=[50,54,58,62];
        lineList[47]=[51,55,59,63];
        lineList[48]=[0,17,34,51];
        lineList[49]=[4,21,38,55];
        lineList[50]=[8,25,42,59];
        lineList[51]=[12,29,46,63];
        lineList[52]=[3,18,33,48];
        lineList[53]=[7,22,37,52];
        lineList[54]=[11,26,41,56];
        lineList[55]=[15,30,45,60];
        lineList[56]=[0,20,40,60];
        lineList[57]=[1,21,41,61];
        lineList[58]=[2,22,42,62];
        lineList[59]=[3,23,43,63];
        lineList[60]=[12,24,36,48];
        lineList[61]=[13,25,37,49];
        lineList[62]=[14,26,38,50];
        lineList[63]=[15,27,39,51];
        lineList[64]=[0,5,10,15];
        lineList[65]=[16,21,26,31];
        lineList[66]=[32,37,42,47];
        lineList[67]=[48,53,58,63];
        lineList[68]=[3,6,9,12];
        lineList[69]=[19,22,25,28];
        lineList[70]=[35,38,41,44];
        lineList[71]=[51,54,57,60];
        lineList[72]=[0,21,42,63];
        lineList[73]=[3,22,41,60];
        lineList[74]=[12,25,38,51];
        lineList[75]=[15,26,37,48];

        for (let depth = 0; depth < 4; depth++) {
            for (let cell = 0; cell < 16; cell++) {
                if(board[depth][cell] !== 0){
                    for (let i of lineList) {
                        if(i[0] === (depth*16 + cell)){
                            let stone = board[Math.floor(i[0]/16)][i[0]%16];
                            let count = 0;
                            for (let j = 1; j < 4; j++){
                                if(board[Math.floor(i[j]/16)][i[j]%16] === stone){
                                    count++;
                                }
                            }
                            if(count === 3)
                                return stone;
                            else
                                return 0;
                        }
                    }
                }
            }
        }
    }
};
