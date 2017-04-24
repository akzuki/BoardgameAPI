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

describe('User', () => {
    beforeEach((done) => { // Before each test, empty the database
        mock.clearUser().then(() => {
            done();
        });
    });

    describe('/POST user', () => {
        it('it should login user by using facebook', (done) => {
            chai.request(server)
                .post('/api/auth/facebookLogin')
                .send({
                    facebookId: '1248490201873498',
                    token: 'EAAC4sT93gqYBAO6pEKuMGHeHdYoBV18uV2sr2khtPQYRmTMnaQsHSt2gwh5HiKqmWemhbSUzzmlU2WTjYnaBeEaSor1SGBvZBnetxAbNc9ArnpWp0fvSANtbvfcvqmMc3bdgNlZBa9sBVdA1Cfi7P7uWZBA3LUKh9px3un5vAZDZD',
                    firstName: 'Hai',
                    lastName: 'Phan',
                    email: 'test@test.com'
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

        it('it should NOT login user by using facebook with incorrect facebookId', (done) => {
            chai.request(server)
                .post('/api/auth/facebookLogin')
                .send({
                    facebookId: 'incorrectFacebookId',
                    token: 'EAAC4sT93gqYBAO6pEKuMGHeHdYoBV18uV2sr2khtPQYRmTMnaQsHSt2gwh5HiKqmWemhbSUzzmlU2WTjYnaBeEaSor1SGBvZBnetxAbNc9ArnpWp0fvSANtbvfcvqmMc3bdgNlZBa9sBVdA1Cfi7P7uWZBA3LUKh9px3un5vAZDZD',
                    firstName: 'Hai',
                    lastName: 'Phan',
                    email: 'test@test.com'
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
});
