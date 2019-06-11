/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonwebtoken from 'jsonwebtoken';
import server from '../server';
import model from '../db/db';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Car Adert', () => {
    let token;
    before(() => {
        const user = {
            id: 1,
            email: 'emmy1000okello@gmail.com',
            first_name: 'emanuel',
            last_name: 'okello',
            password: '123456',
            address: 'kampala',
            is_admin: true,
            user_class: 'SELLER',
          };
            
        token = jsonwebtoken.sign({ id: user.id, is_admin: user.is_admin, user_class: user.user_class }, 'supertopsecret', { expiresIn: '24h' });
    });
    describe('GET Car Advert', () => {
        describe('GET /', () => {
            it('should get all cars', (done) => {
                chai.request(server)
                    .get('/api/v1/car')
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.should.be.an('array');
                        done();
                    });
            });
        });
    });

    describe('GET Car Available Advert', () => {
        beforeEach(() => {
            model.car = [
                {
                    id: 1,
                    owner: 1,
                    status: 'available',
                    state: 'new',
                    created_on: Date.now(),
                    price: 200.5,
                    model: 'vs4-emmisteel',
                    body_type: 'car',
                    date_modified: Date.now(),
                    
                },
            ];
        });

        afterEach(() => {
            model.car = [];
        });

        describe('GET /available', () => {
            it('should get all available cars', (done) => {
                chai.request(server)
                    .get('/api/v1/car?status=available')
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.should.be.an('array');
                        done();
                    });
            });
        });

        describe('GET /available/min_price/max_price', () => {
            it('should get all available cars with price range', (done) => {
                chai.request(server)
                    .get('/api/v1/car?status=available&min_price=100&max_price=300')
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.should.be.an('array');
                        done();
                    });
            });
        });
    });
});
