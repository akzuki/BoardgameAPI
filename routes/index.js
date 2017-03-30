const express = require('express');
const router = express.Router();
const Boardgame = require('../models/boardgame.model');

/* GET home page. */
router.get('/', (req, res) => {
    Boardgame.getAll().then(data => {
        res.json(data);
    });
});

router.get('/:boardgameId', (req, res) => {
    res.send(401);
});

module.exports = router;
