/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonwebtoken from 'jsonwebtoken';
import server from '../server';
import order from '../models/order';
import model from '../db/db';
import user from '../models/user';
import car from '../models/car';


// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Car Adert Purchase Order', () => {
    let token;
    let myUser;
    before(() => {
        myUser = user.buyer;
        token = jsonwebtoken.sign({ id: myUser.id, is_admin: myUser.is_admin, user_class: myUser.user_class }, 'supertopsecret', { expiresIn: '24h' });
    });

    describe('GET Car Advert Order', () => {
        describe('GET /', () => {
            it('should get all purchase orders', (done) => {
                chai.request(server)
                    .get('/api/v1/order')
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

    describe('POST Purchase Order', () => {
        let myOrder;
        beforeEach((done) => {

            model.car.push(car.goodCar);
            myOrder = order.goodOrder;

            done();
        });

        afterEach((done) => {
            model.car = [];
            model.order = [];
            done();
        });

        it('should post purchase order', (done) => {
            chai.request(server)
                .post('/api/v1/order')
                .send(myOrder)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.status.should.equal(201);
                    res.body.data.should.be.an('object');
                    done();
                });
        });

        it('should return 400 for purchase order', (done) => {
            delete myOrder.car_id;
            chai.request(server)
                .post('/api/v1/order')
                .send(myOrder)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.status.should.equal(400);
                    res.body.error.should.be.a('string');
                    done();
                });
        });

        it('should return 404 for purchase order', (done) => {
            myOrder.car_id = 2;
            chai.request(server)
                .post('/api/v1/order')
                .send(myOrder)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.status.should.equal(404);
                    res.body.error.should.be.a('string');
                    done();
                });
        });
    });

    describe('Update Purchase Order', () => {
        let amount;

        beforeEach((done) => {

            model.order.push(order.goodOrder);
            amount = {amount: 219.5};

            done();
        });

        afterEach((done) => {
            model.order = [];
            done();
        });

        it('should update purchase order price', (done) => {
            const order_id = 1;
            chai.request(server)
                .patch(`/api/v1/order/${order_id}/price`)
                .send(amount)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.equal(200);
                    res.body.data.should.be.an('object');
                    done();
                });
        });

        it('should return 400 for failed purchase order', (done) => {
            delete amount.amount;
            const order_id = 1;
            chai.request(server)
                .patch(`/api/v1/order/${order_id}/price`)
                .send(amount)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.status.should.equal(400);
                    res.body.error.should.be.a('string');
                    done();
                });
        });

        it('should return 404 for no purchase order', (done) => {
            const order_id = 2;
            chai.request(server)
                .patch(`/api/v1/order/${order_id}/price`)
                .send(amount)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.status.should.equal(404);
                    res.body.error.should.be.a('string');
                    done();
                });
        });

        describe('ACCEPTED/REJECTED', () => {
            beforeEach((done) => {
                order.goodOrder.status = 'accepted';
                model.order.push(order.goodOrder);
                done();
            });

            afterEach((done) => {
                model.order = [];
                done();
            });

            it('should return 404 for already accepted/rejected', (done) => {
                const order_id = 1;
                chai.request(server)
                    .patch(`/api/v1/order/${order_id}/price`)
                    .send(amount)
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

    describe('Accept/Reject Purchase Order', () => {
        let acceptReject;
        let seller;

        beforeEach((done) => {
            model.car.push(car.goodCar);

            model.order = [
                {
                    id: 1,
                    buyer: 2,
                    car_id: 1,
                    created_on: Date.now(),
                    amount: 200.05,
                    status: 'pending',
                    date_modified: Date.now(),
                }
            ];
            acceptReject = {status: 'accepted'};

            seller = user.user;
                
            token = jsonwebtoken.sign({ id: seller.id, is_admin: seller.is_admin, user_class: seller.user_class }, 'supertopsecret', { expiresIn: '24h' });

            done();
        });

        afterEach((done) => {
            model.order = [];
            model.car = [];
            done();
        });

        it('should accept/reject purchase order', (done) => {
            const order_id = 1;
            chai.request(server)
                .patch(`/api/v1/order/${order_id}/status`)
                .send(acceptReject)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.equal(200);
                    res.body.data.should.be.an('object');
                    done();
                });
        });

        it('should return 400 for failed reject/accept', (done) => {
            delete acceptReject.status;
            const order_id = 1;
            chai.request(server)
                .patch(`/api/v1/order/${order_id}/status`)
                .send(acceptReject)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.status.should.equal(400);
                    res.body.error.should.be.a('string');
                    done();
                });
        });

        it('should return 404 for no car', (done) => {
            const order_id = 2;
            chai.request(server)
                .patch(`/api/v1/order/${order_id}/status`)
                .send(acceptReject)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.status.should.equal(404);
                    res.body.error.should.be.a('string');
                    done();
                });
        });

        it('should return 403 for not car owner', (done) => {
            const order_id = 1;
            token = jsonwebtoken.sign({ id: 2, is_admin: seller.is_admin, user_class: seller.user_class }, 'supertopsecret', { expiresIn: '24h' });
            chai.request(server)
                .patch(`/api/v1/order/${order_id}/status`)
                .send(acceptReject)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.status.should.equal(403);
                    res.body.error.should.be.a('string');
                    done();
                });
        });

        describe('CAR ALREADY SOLD/REJECTED', () => {
            beforeEach((done) => {
                model.order = [{
                    id: 1,
                    buyer: 2,
                    car_id: 1,
                    created_on: Date.now(),
                    amount: 200.05,
                    status: 'accepted',
                    date_modified: Date.now(),
                }];
                done();
            });

            afterEach((done) => {
                model.order = [];
                done();
            });

            it('should return 400 for no pending car', (done) => {
                const order_id = 1;
                chai.request(server)
                    .patch(`/api/v1/order/${order_id}/status`)
                    .send(acceptReject)
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
});
