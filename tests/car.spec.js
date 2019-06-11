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

    describe('GET Car Available Advert Happy Path', () => {
        beforeEach((done) => {
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
            done();
        });

        afterEach((done) => {
            model.car.length = 0;
            done();
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

    describe('GET Car Available Advert Unhappy Path', () => {
        beforeEach((done) => {
            model.car = [
                {
                    id: 1,
                    owner: 1,
                    status: 'sold',
                    state: 'new',
                    created_on: Date.now(),
                    price: 200.5,
                    model: 'vs4-emmisteel',
                    body_type: 'car',
                    date_modified: Date.now(),
                    
                },
            ];
            done();
        });

        afterEach((done) => {
            model.car.length = 0;
            done();
        });
        
        describe('GET /available not', () => {
            it('should return 404 for no car', (done) => {
                chai.request(server)
                    .get('/api/v1/car?status=available')
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.length.should.be.equal(0);
                        done();
                    });
            });
        });

        describe('GET /not within range', () => {
            it('should return 404 for no car within range', (done) => {
                chai.request(server)
                    .get('/api/v1/car?status=available&min_price=100&max_price=300')
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.length.should.be.equal(0);
                        done();
                    });
            });
        });
    });

    describe('GET Specific Car Advert', () => {
        let car_id;
        beforeEach((done) => {
            model.car = [
                {
                    id: 1,
                    owner: 1,
                    status: 'sold',
                    state: 'new',
                    created_on: Date.now(),
                    price: 200.5,
                    model: 'vs4-emmisteel',
                    body_type: 'car',
                    date_modified: Date.now(),
                    
                },
            ];
            done();
        });

        afterEach((done) => {
            model.car = [];
            done();
        });
        
        describe('GET /${id}', () => {
            it('should return 200 if car exists', (done) => {
                car_id = 1;
                chai.request(server)
                    .get(`/api/v1/car/${car_id}`)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.should.be.an('object');
                        done();
                    });
            });
        });

        describe('GET /${id} not found', () => {
            it('should return 404 for no specific car', (done) => {
                car_id = 2;
                chai.request(server)
                    .get(`/api/v1/car/${car_id}`)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.status.should.equal(404);
                        res.body.error.should.be.a('string');
                        done();
                    });
            });
        });
    });

    describe('POST Car Advert', () => {
        describe('POST car Advert', () => {
            let car;
            beforeEach((done) => {
                car = {
                    id: 1,
                    owner: 1,
                    status: 'sold',
                    state: 'new',
                    created_on: Date.now(),
                    price: 200.5,
                    model: 'vs4-emmisteel',
                    body_type: 'car',
                    date_modified: Date.now(), 
                    manufacturer: 'toyota',  
                };
                done();
            });

            afterEach((done) => {
                model.car = [];
                done();
            });

            it('should post car', (done) => {
                chai.request(server)
                    .post('/api/v1/car')
                    .send(car)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.status.should.equal(201);
                        res.body.data.should.be.an('object');
                        done();
                    });
            });

            it('should return 400', (done) => {
                delete car.price;
                chai.request(server)
                    .post('/api/v1/car')
                    .send(car)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.status.should.equal(400);
                        res.body.error.should.be.a('string');
                        done();
                    });
            });
        });
    });

    describe('PATCH Car Advert', () => {
        describe('MARK CAR ADVERT AS SOLD && UPDATE PRICE', () => {
            let car_id;
            let sold;
            let newPrice;
            beforeEach((done) => {
                model.car = [{
                    id: 1,
                    owner: 1,
                    status: 'available',
                    state: 'new',
                    created_on: Date.now(),
                    price: 200.5,
                    model: 'vs4-emmisteel',
                    body_type: 'car',
                    date_modified: Date.now(), 
                    manufacturer: 'toyota',  
                }];
                sold = {status: 'sold'};
                newPrice = {price: 300};
                done();
            });

            afterEach((done) => {
                model.car = [];
                done();
            });

            it('should mark car as sold', (done) => {
                car_id = 1;
                chai.request(server)
                    .patch(`/api/v1/car/${car_id}/status`)
                    .send(sold)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.should.be.an('object');
                        done();
                    });
            });

            it('should return 400 for bad sold status', (done) => {
                delete sold.status;
                chai.request(server)
                    .patch(`/api/v1/car/${car_id}/status`)
                    .send(sold)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.status.should.equal(400);
                        res.body.error.should.be.a('string');
                        done();
                    });
            });

            it('should return 404 if car doesn\'t exist', (done) => {
                car_id = 2;
                chai.request(server)
                    .patch(`/api/v1/car/${car_id}/status`)
                    .send(sold)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.status.should.equal(404);
                        res.body.error.should.be.a('string');
                        done();
                    });
            });

            it('should update car price', (done) => {
                car_id = 1;
                chai.request(server)
                    .patch(`/api/v1/car/${car_id}/price`)
                    .send(newPrice)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.status.should.equal(200);
                        res.body.data.should.be.an('object');
                        done();
                    });
            });

            it('should return 400 for bad price', (done) => {
                car_id = 1;
                delete newPrice.price;
                chai.request(server)
                    .patch(`/api/v1/car/${car_id}/price`)
                    .send(newPrice)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.status.should.equal(400);
                        res.body.error.should.be.a('string');
                        done();
                    });
            });

            it('should return 404 if car does not exist', (done) => {
                car_id = 2;
                chai.request(server)
                    .patch(`/api/v1/car/${car_id}/price`)
                    .send(newPrice)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.status.should.equal(404);
                        res.body.error.should.be.a('string');
                        done();
                    });
            });

        });
    });

    describe('DELETE Car Advert', () => {
        describe('DELETE car Advert', () => {
            let car;
            let car_id;
            beforeEach((done) => {
                model.car = [{
                    id: 1,
                    owner: 1,
                    status: 'sold',
                    state: 'new',
                    created_on: Date.now(),
                    price: 200.5,
                    model: 'vs4-emmisteel',
                    body_type: 'car',
                    date_modified: Date.now(), 
                    manufacturer: 'toyota',  
                }];
                done();
            });

            afterEach((done) => {
                model.car = [];
                done();
            });

            it('should delete car advert', (done) => {
                car_id = 1;
                chai.request(server)
                    .delete(`/api/v1/car/${car_id}`)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(202);
                        res.body.status.should.equal(202);
                        res.body.data.should.be.a('string');
                        done();
                    });
            });

            it('should return 404 if car is not exist', (done) => {
                car_id = 2;
                chai.request(server)
                    .delete(`/api/v1/car${car_id}/`)
                    .set('x-auth-token', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.status.should.equal(404);
                        done();
                    });
            });
        });
    });
});
