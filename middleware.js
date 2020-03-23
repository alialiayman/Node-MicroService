const jwt = require('jsonwebtoken');

const JWTKEY = process.env.JWTKEY || 'supersecretkey';

function auth(req, res, next) {
    if ((!req.headers || !req.headers.token) && (!req.query || !req.query.token)) {
        res.status(401);
        return res.end()
    }

    try {
        const decoded = jwt.verify(req.headers.token || req.query.token, JWTKEY, { algorithm: 'HS256' });
        if (decoded) {
            next();
        }
    } catch (err) {
        //Log the error
        res.status(401);
        res.end()
    }
};

function validUrl(req, res, next) {
    if (!req.query || !req.query.url) {
        res.status(400);
        return res.send('missing image url')
    }

    next();
};

function validateLogin(req, res, next) {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400);
        return res.send('Please provide username/password');
    }

    next();
};

function validDocument(req, res, next) {
    if (!req.body || !req.body.doc || !req.body.patch) {
        res.status(400);
        return res.send('Please provide username/password');
    }

    next();
};


module.exports = { auth, validUrl, validateLogin, validDocument };