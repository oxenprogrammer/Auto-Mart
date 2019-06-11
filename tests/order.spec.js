/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonwebtoken from 'jsonwebtoken';
import server from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Car Adert Purchase Order', () => {
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
            user_class: 'BUYER',
          };
            
        token = jsonwebtoken.sign({ id: user.id, is_admin: user.is_admin, user_class: user.user_class }, 'supertopsecret', { expiresIn: '24h' });
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
});
