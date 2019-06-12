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

describe('Auth', () => {
    let user;
    let token;
    beforeEach((done) => {
        user = {
            first_name: 'emanuel',
            last_name: 'okello',
            email: 'ox@gmail.com',
            password: '12345',
            address: 'uganda',
            user_class: 'BUYER',
        };
        token = jsonwebtoken.sign({ id: user.id, is_admin: user.is_admin, user_class: user.user_class }, 'supertopsecret', { expiresIn: '24h' });
        done();
    });

    afterEach((done) => {
        model.user = [];
        done();
    });

    describe('USER SIGNUP', () => {
        it('should create new user', (done) => {
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(user)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });
});

