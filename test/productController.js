const passportConfig = require('../config/passport.config');
const mock = require('./mock-data');
// Require the dev-dependencies
const jwt = require('jsonwebtoken');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);


describe('Boardgame', () => {
    beforeEach((done) => { // Before each test, empty the database
        mock.clearAllData().then(() => {
            done();
        });
    });

    describe('/POST boardgame', () => {
        it('it should create new boardgame', (done) => {
            mock.createStore().then((savedStore) => {
                const payload = {
                    id: savedStore.id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .post('/panel/product/')
                    .set('Authorization', `JWT ${token}`)
                    .send({
                        'photoUrl': '1492762998005-photo.jpg',
                        'title': 'Boardgame title',
                        'description': 'Boardgame description',
                        'category': 'Card Game',
                        'player': '2-6',
                        'time': '2+ hours',
                        'ages': '1-5',
                        'price': 20
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);

                        expect(res.body.data).to.contain('Successfully created boardgame');
                        done();
                    });
            });
        });
    });

    describe('/PUT boardgame', () => {
        it('it should update existing boardgame', (done) => {
            mock.createBoardgame().then((response) => {
                const payload = {
                    id: response.store._id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .put(`/panel/product/${response.boardgame._id}`)
                    .set('Authorization', `JWT ${token}`)
                    .send({
                        'photoUrl': '1492762998005-photo.jpg',
                        'title': 'Boardgame title',
                        'description': 'Boardgame description',
                        'category': 'Card Game',
                        'player': '2-6',
                        'time': '2+ hours',
                        'ages': '1-5',
                        'price': 30
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);

                        expect(res.body.data).to.contain('Successfully updated boardgame');
                        done();
                    });
            });
        });
    });

    describe('/DELETE boardgame', () => {
        it('it should delete existing boardgame', (done) => {
            mock.createBoardgame().then((response) => {
                const payload = {
                    id: response.store._id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .delete(`/panel/product/`)
                    .set('Authorization', `JWT ${token}`)
                    .send({
                        'boardgameId': response.boardgame._id
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);

                        expect(res.body.data).to.contain('Successfully deleted boardgame');
                        done();
                    });
            });
        });
    });

    describe('/GET boardgame', () => {
        it('it should get boardgame by store id', (done) => {
            mock.createBoardgame().then((response) => {
                const payload = {
                    id: response.store._id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .get('/panel/product/')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);
                        res.body.data[0].should.have.property('_id').eql(`${response.boardgame._id}`);
                        res.body.data[0].should.have.property('title').eql('Boardgame title');
                        res.body.data[0].should.have.property('description').eql('Boardgame description');
                        res.body.data[0].should.have.property('photoUrl').eql('1492762998005-photo.jpg');
                        res.body.data[0].should.have.property('category').eql('Card Game');
                        res.body.data[0].should.have.property('player').eql('2-6');
                        res.body.data[0].should.have.property('time').eql('2+ hours');
                        res.body.data[0].should.have.property('ages').eql('1-5');
                        res.body.data[0].should.have.property('price').eql(20);
                        done();
                    });
            });
        });

        it('it should get all boardgames', (done) => {
            mock.createUserAndBoardgame().then((response) => {
                const payload = {
                    id: response.user._id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .get('/api/product/')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);
                        res.body.data[0].should.have.property('_id').eql(`${response.boardgame._id}`);
                        res.body.data[0].should.have.property('title').eql('Boardgame title');
                        res.body.data[0].should.have.property('description').eql('Boardgame description');
                        res.body.data[0].should.have.property('photoUrl').eql('1492762998005-photo.jpg');
                        res.body.data[0].should.have.property('category').eql('Card Game');
                        res.body.data[0].should.have.property('player').eql('2-6');
                        res.body.data[0].should.have.property('time').eql('2+ hours');
                        res.body.data[0].should.have.property('ages').eql('1-5');
                        res.body.data[0].should.have.property('price').eql(20);
                        res.body.data[0].should.have.property('store');
                        res.body.data[0].store.should.have.property('_id').eql(`${response.store._id}`);
                        res.body.data[0].store.should.have.property('address').eql('store address, finland');
                        res.body.data[0].store.should.have.property('email').eql('store@store.com');
                        done();
                    });
            });
        });

        it('it should get single boardgame by id', (done) => {
            mock.createUserAndBoardgame().then((response) => {
                const payload = {
                    id: response.user._id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .get(`/api/product/${response.boardgame._id}`)
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.data.should.be.a('object');

                        res.body.data.should.have.property('_id').eql(`${response.boardgame._id}`);
                        res.body.data.should.have.property('title').eql('Boardgame title');
                        res.body.data.should.have.property('description').eql('Boardgame description');
                        res.body.data.should.have.property('photoUrl').eql('1492762998005-photo.jpg');
                        res.body.data.should.have.property('category').eql('Card Game');
                        res.body.data.should.have.property('player').eql('2-6');
                        res.body.data.should.have.property('time').eql('2+ hours');
                        res.body.data.should.have.property('ages').eql('1-5');
                        res.body.data.should.have.property('price').eql(20);
                        res.body.data.should.have.property('store');

                        res.body.data.store.should.have.property('_id').eql(`${response.store._id}`);
                        res.body.data.store.should.have.property('address').eql('store address, finland');
                        res.body.data.store.should.have.property('email').eql('store@store.com');
                        done();
                    });
            });
        });
    });
});
