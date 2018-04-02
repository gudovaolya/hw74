const express = require('express');
const fileMessages = require('./fileMessages');
const messages= require('./app/messages');


const app = express();
const port = 8000;

app.use(express.json());

fileMessages.init(() => {

    app.use('/messages', messages(fileMessages));

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});







