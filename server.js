const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');
const mainController = require('./mainController');


const middleware = require('./middleware');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.Server(app);

app.post('/login', middleware.validateLogin, mainController.login);

app.post('/document', [middleware.validDocument, middleware.auth], mainController.createDocument);

app.get('/thumbnail', [middleware.validUrl, middleware.auth], mainController.createThumbnail);

server.listen(port, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    else {
        console.log('server started!');
    }
});


module.exports = server;