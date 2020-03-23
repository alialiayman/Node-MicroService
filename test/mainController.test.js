const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const mainController = require('../mainController')


describe('login', function () {
    let res = {};
    beforeEach(function () {
        res = {
            send: sinon.spy()
        }
    });

    it('login sucessfully', () => {
        const req = {
            body: {
                username: 'user',
                password: 'pass'
            }
        }

        mainController.login(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(/^\w*\.\w*\.\w*/.test(res.send.firstCall.args[0].token)).to.be.true;
    });

});


describe('Document', function () {
    let res = {};
    beforeEach(function () {
        res = {
            send: sinon.spy()
        }
    });

    it('create', () => {
        const req = {
            body: {
                doc: {
                    baz: "qux",
                    foo: "bar"
                },
                patch: [
                    {
                        op: "replace",
                        path: "/baz",
                        value: "boo"
                    },
                    {
                        op: "add",
                        path: "/hello",
                        value: [
                            "world"
                        ]
                    },
                    {
                        op: "remove",
                        path: "/foo"
                    }
                ]
            }
        }

        mainController.createDocument(req, res);

        expect(res.send.calledOnce).to.be.true;
        const result = {
            baz: "boo",
            hello: [
                "world"
            ]
        };
        expect(res.send.firstCall.args[0].baz).to.equal(result.baz);
        expect(res.send.firstCall.args[0].hello[0]).to.equal(result.hello[0]);
    });

});
