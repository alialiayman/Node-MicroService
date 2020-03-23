const jwt = require('./jwt');
const https = require('https');
const jsonpatch = require('jsonpatch');
const sharp = require('sharp');

let thumbnailTransformer = sharp();
thumbnailTransformer = thumbnailTransformer.toFormat('png').resize(50, 50);


function login(req, res) {

    // Username and password database access goes here
    const token = jwt.sign({ "username": req.body.username });
    res.send({ token });
};

function createDocument(req, res) {

    const target = jsonpatch.apply_patch(req.body.doc, req.body.patch);
    res.send(target);
};

async function createThumbnail(req, res) {

    res.type('image/png');
    https.get(req.query.url, (response) => {
        response.pipe(thumbnailTransformer).pipe(res);
    });
};

module.exports = { login, createDocument, createThumbnail }