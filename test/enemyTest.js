'use strict';

const Enemy = require('../service/Enemy');
const Board = require('../entity/Board');

const gameBoard = new Board();
const gameEnemy = new Enemy();

gameBoard.inputBoard(1, 11);
console.log(gameBoard.showBoard());
let board = JSON.parse(JSON.stringify(gameBoard.showBoard()));
console.log(gameEnemy.select(board));
gameBoard.inputBoard(2, gameEnemy.select(board));
console.log(gameBoard.showBoard());
