'use strict';

const express = require('express');
const router = express.Router();
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
app.use('/', router);

router.get('/', (request, response) => {
    response.sendFile(__dirname + '/ui/main.html');
});

//APIHandlers
router.get('/api/get/board', (req, res) => {
    res.send(JSON.stringify(gameBoard.showBoard()));
});

router.get('/api/put/stone/:place', (req, res) => {
    if(gameBoard.inputBoard(1, req.params.place)) {
        const judge_player = Judge.judgement(gameBoard.showBoard());
        console.log(judge_player);
        if(judge_player !== 0){
            res.send(JSON.stringify(judge_player));
        }else {
            let board = JSON.parse(JSON.stringify(gameBoard.showBoard()));
            gameBoard.inputBoard(2, gameEnemy.select(board));
            const judge_enemy = Judge.judgement(gameBoard.showBoard());
            console.log(judge_enemy);
            if(judge_enemy !== 0) {
                res.send(JSON.stringify(judge_enemy));
            }else {
                res.send(JSON.stringify(gameBoard.showBoard()));
            }
        }
    }else {
        res.send("Error: Place Filled!");
    }
});
