const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const jwt = require('jsonwebtoken');

const middleware = require('../middleware')


describe('auth', function () {
    let res = {};
    let next = {};
    const verifyMock = sinon.stub(jwt, 'verify');

    beforeEach(function () {
        res = {
            status: sinon.spy(),
            end: sinon.spy(),
            send: sinon.spy(),
        }
        next = sinon.spy();
        verifyMock.returns({ username: 'abc' });
    });

    it('should send 401 when req.headers and req.query missing', () => {
        const req = {}

        middleware.auth(req, res, next);

        expect(res.status.firstCall.args[0]).to.equal(401);
    });

    it('should send 401 when req.headers or req.query missing token', () => {
        const req = {
            headers: {},
            query: {}
        }

        middleware.auth(req, res, next);

        expect(res.status.firstCall.args[0]).to.equal(401);
    });

    it('should call next() when token is present in headers', () => {
        const req = {
            headers: { token: 'abc.def.ghi' },
            query: {}
        }

        middleware.auth(req, res, next);

        expect(next.calledOnce).to.be.true;
    });

    it('should call next() when token is present in query', () => {
        const req = {
            headers: {},
            query: { token: 'abc.def.ghi' }
        }

        middleware.auth(req, res, next);

        expect(next.calledOnce).to.be.true;
    });

    it('should send 401 when jwt.verify throws', () => {
        const req = {
            headers: {},
            query: { token: 'abc.def.ghi' }
        }
        verifyMock.throws();

        middleware.auth(req, res, next);

        expect(res.status.firstCall.args[0]).to.equal(401);
    });

});

describe('validateUrl', function () {
    let res = {};
    let next = {};

    beforeEach(function () {
        res = {
            status: sinon.spy(),
            send: sinon.spy(),
        }
        next = sinon.spy();
    });

    it('should send 400 when req.query.url missing', () => {
        const req = {
            query: {}
        }

        middleware.validUrl(req, res, next);

        expect(res.status.firstCall.args[0]).to.equal(400);
    });

    it('should call next when req.query.url is present', () => {
        const req = {
            query: {
                url: 'http://'
            }
        }

        middleware.validUrl(req, res, next);

        expect(next.calledOnce).to.be.true;
    });

});

describe('validateLogin', function () {
    let res = {};
    let next = {};

    beforeEach(function () {
        res = {
            status: sinon.spy(),
            send: sinon.spy(),
        }
        next = sinon.spy();
    });

    it('should send 400 when req.body.username missing', () => {
        const req = {
            body: {
                password: 'password'
            }
        }

        middleware.validateLogin(req, res, next);

        expect(res.status.firstCall.args[0]).to.equal(400);
    });

    it('should call next when req.body.username and req.body.password are present', () => {
        const req = {
            body: {
                username: 'user',
                password: 'password'
            }
        }

        middleware.validateLogin(req, res, next);

        expect(next.calledOnce).to.be.true;
    });

});