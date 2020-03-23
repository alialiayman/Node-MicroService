const jwt = require('jsonwebtoken');

const JWTKEY = process.env.JWTKEY || 'supersecretkey';

function sign(input) {
    input.exp = Math.floor(Date.now() / 1000) + (60 * 60);
    return jwt.sign(input, JWTKEY, { algorithm: 'HS256' });
};

function validate(input) {

    input.exp = Math.floor(Date.now() / 1000) + (60 * 60);
    return jwt.sign(input, JWTKEY, { algorithm: 'HS256' });
};


module.exports = { sign, validate }