const express = require('express');
const router = express.Router();




const createRouter = (db) => {

    router.get('/', (req, res) => {
        res.send(db.getData())
    });

    router.post('/', (req, res) => {
        const message = req.body;
        db.addMessage(message).then(result => {
            res.send(result);
        })
    });

    return router;
};

module.exports = createRouter;
