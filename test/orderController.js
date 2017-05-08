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

describe('Order', () => {
    beforeEach((done) => { // Before each test, empty the database
        mock.clearAllData().then(() => {
            done();
        });
    });

    describe('/GET order', () => {
        it('it should get all order by storeId', (done) => {
            mock.createOrder().then((response) => {
                const payload = {
                    id: response.store._id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .get(`/panel/order/`)
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);

                        res.body.data[0].should.have.property('_id').eql(`${response.order._id}`);

                        res.body.data[0].should.have.property('item');
                        res.body.data[0].item.should.have.property('_id').eql(`${response.boardgame._id}`);
                        res.body.data[0].item.should.have.property('title').eql('Boardgame title');
                        res.body.data[0].item.should.have.property('description').eql('Boardgame description');
                        res.body.data[0].item.should.have.property('photoUrl').eql('1492762998005-photo.jpg');
                        res.body.data[0].item.should.have.property('player').eql('2-6');
                        res.body.data[0].item.should.have.property('time').eql('2+ hours');
                        res.body.data[0].item.should.have.property('ages').eql('1-5');
                        res.body.data[0].item.should.have.property('price').eql(20);

                        res.body.data[0].should.have.property('buyer');
                        res.body.data[0].buyer.should.have.property('_id').eql(`${response.user._id}`);
                        res.body.data[0].buyer.should.have.property('email').eql('test@test.com');
                        res.body.data[0].buyer.should.have.property('firstName').eql('Hai');
                        res.body.data[0].buyer.should.have.property('lastName').eql('Phan');

                        done();
                    });
            });
        });

        it('it should get all order by userId', (done) => {
            mock.createOrder().then((response) => {
                const payload = {
                    id: response.user._id
                };
                const token = jwt.sign(payload, passportConfig.jwt.secret);
                chai.request(server)
                    .get(`/api/order/`)
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(200);
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);

                        res.body.data[0].should.have.property('_id').eql(`${response.order._id}`);

                        res.body.data[0].should.have.property('item');
                        res.body.data[0].item.should.have.property('_id').eql(`${response.boardgame._id}`);
                        res.body.data[0].item.should.have.property('title').eql('Boardgame title');
                        res.body.data[0].item.should.have.property('description').eql('Boardgame description');
                        res.body.data[0].item.should.have.property('photoUrl').eql('1492762998005-photo.jpg');
                        res.body.data[0].item.should.have.property('player').eql('2-6');
                        res.body.data[0].item.should.have.property('time').eql('2+ hours');
                        res.body.data[0].item.should.have.property('ages').eql('1-5');
                        res.body.data[0].item.should.have.property('price').eql(20);

                        res.body.data[0].should.have.property('seller');
                        res.body.data[0].seller.should.have.property('_id').eql(`${response.store._id}`);
                        res.body.data[0].seller.should.have.property('email').eql('store@store.com');
                        res.body.data[0].seller.should.have.property('name').eql('Store name');
                        res.body.data[0].seller.should.have.property('address').eql('store address, finland');

                        done();
                    });
            });
        });
    });
});
