const jwt_secret = require('../config/passport.config').jwt.secret;
const mock = require('./mock-data');
// Require the dev-dependencies

const chai = require('chai');
const chaiJWT = require('chai-jwt');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiJWT);

describe('Store', () => {
    beforeEach((done) => { // Before each test, empty the database
        mock.clearStore().then(() => {
            done();
        });
    });

    describe('/POST store', () => {
        it('it should create new store', (done) => {
            const newStore = {
                name: 'Store name',
                password: 'storepassword',
                email: 'store@store.com',
                address: 'store address, finland'
            };
            chai.request(server)
                .post('/panel/auth/register')
                .send(newStore)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('data');
                    expect(res.body.data).to.be.a.jwt;
                    expect(res.body.data).to.be.signedWith(jwt_secret);
                    done();
                });
        });

        it('it should NOT create new store with existing email', (done) => {
            mock.createStore().then((response) => {
                const newStore = {
                    name: 'Store name',
                    password: 'storepassword',
                    email: 'store@store.com',
                    address: 'store address, finland'
                };
                chai.request(server)
                    .post('/panel/auth/register')
                    .send(newStore)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('description').eql('Email has been used.');
                        done();
                    });
            });
        });

        it('it should NOT create new store without store name', (done) => {
            const newStore = {
                password: 'storepassword',
                email: 'store@store.com',
                address: 'store address, finland'
            };
            chai.request(server)
                .post('/panel/auth/register')
                .send(newStore)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('description').eql('Invalid params');
                    done();
                });
        });

        it('it should NOT create new store without store password', (done) => {
            const newStore = {
                name: 'Store name',
                email: 'store@store.com',
                address: 'store address, finland'
            };
            chai.request(server)
                .post('/panel/auth/register')
                .send(newStore)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('description').eql('Invalid params');
                    done();
                });
        });

        it('it should NOT create new store without store email', (done) => {
            const newStore = {
                name: 'Store name',
                password: 'storepassword',
                address: 'store address, finland'
            };
            chai.request(server)
                .post('/panel/auth/register')
                .send(newStore)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('description').eql('Invalid params');
                    done();
                });
        });

        it('it should NOT create new store without store address', (done) => {
            const newStore = {
                name: 'Store name',
                password: 'storepassword',
                email: 'store@store.com'
            };
            chai.request(server)
                .post('/panel/auth/register')
                .send(newStore)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('description').eql('Invalid params');
                    done();
                });
        });

        it('it should NOT create new store without name, address, email, address', (done) => {
            const newStore = {};
            chai.request(server)
                .post('/panel/auth/register')
                .send(newStore)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('description').eql('Invalid params');
                    done();
                });
        });

        it('it should log in store', (done) => {
            mock.createStore().then((savedStore) => {
                chai.request(server)
                    .post('/panel/auth/login')
                    .send({
                        email: 'store@store.com',
                        password: 'storepassword'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.should.have.property('data');
                        expect(res.body.data).to.be.a.jwt;
                        expect(res.body.data).to.be.signedWith(jwt_secret);
                        done();
                    });
            });
        });

        it('it should NOT log in store with incorrect password', (done) => {
            mock.createStore().then((savedStore) => {
                chai.request(server)
                    .post('/panel/auth/login')
                    .send({
                        email: 'store@store.com',
                        password: 'incorrectPassword'
                    })
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('description').eql('Invalid params');
                        done();
                    });
            });
        });

        it('it should NOT log in store without email', (done) => {
            mock.createStore().then((savedStore) => {
                chai.request(server)
                    .post('/panel/auth/login')
                    .send({
                        password: 'incorrectPassword'
                    })
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('description').eql('Invalid params');
                        done();
                    });
            });
        });

        it('it should NOT log in store without password', (done) => {
            mock.createStore().then((savedStore) => {
                chai.request(server)
                    .post('/panel/auth/login')
                    .send({
                        email: 'store@store.com'
                    })
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('description').eql('Invalid params');
                        done();
                    });
            });
        });

        it('it should NOT log in store without email & password', (done) => {
            mock.createStore().then((savedStore) => {
                chai.request(server)
                    .post('/panel/auth/login')
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(400);
                        res.body.should.have.property('description').eql('Invalid params');
                        done();
                    });
            });
        });
    });
});
