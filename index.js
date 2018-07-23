'use strict';

const express = require('express');
const Board = require('./entity/Board');
const Enemy = require('./service/Enemy');
const Judge = require('./service/Judge');

const gameBoard = new Board();
const gameEnemy = new Enemy();

const app = express();
app.use(express.static('ui'));

const server = app.listen((process.env.PORT || 3000), () => {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

//WebPageHandlers
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/ui/main.html');
});

//APIHandlers
app.get('/api/get/board', (req, res) => {
    res.send(JSON.stringify(gameBoard.showBoard()));
});

app.post('/api/put/stone', (req, res) => {
    if(gameBoard.inputBoard(1, req.body.place)) {
        const judge_player = Judge.judgement(gameBoard.showBoard());
        if(judge_player !== 0){
            res.send(judge_player);
        }else {
            gameBoard.inputBoard(2, gameEnemy.select(gameBoard.showBoard()));
            const judge_enemy = Judge.judgement(gameBoard.showBoard());
            if(judge_enemy !== 0) {
                res.send(judge_enemy);
            }else {
                res.send(JSON.stringify(gameBoard.showBoard()));
            }
        }
    }else {
        res.send("Error: Place Filled!");
    }
});
