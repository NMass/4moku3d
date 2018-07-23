'use strict';

const Enemy = require('./service/Enemy');
const Board = require('./entity/Board');

const gameBoard = new Board();
const gameEnemy = new Enemy();

gameBoard.inputBoard(1, 11);
console(gameBoard.showBoard());
gameBoard.inputBoard(2, gameEnemy.select(gameBoard.showBoard()));
console(gameBoard.showBoard());
