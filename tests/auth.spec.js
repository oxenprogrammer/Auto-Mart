/* eslint-disable no-undef */
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
  beforeEach(done => {
    user = {
      first_name: 'emanuel',
      last_name: 'okello',
      email: 'ox@gmail.com',
      password: '12345',
      address: 'uganda',
      user_class: 'BUYER',
      is_admin: false
    };
    token = jsonwebtoken.sign(
      { id: user.id, is_admin: user.is_admin, user_class: user.user_class },
      'supertopsecret',
      { expiresIn: '24h' }
    );
    done();
  });

  afterEach(done => {
    model.user = [];
    done();
  });

  describe('USER SIGNUP', () => {
    it('should create new user', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.equal(201);
          res.body.data.token.should.be.a('string');
          done();
        });
    });

    it('should create return 400', done => {
      delete user.email;
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.error.should.be.a('string');
          done();
        });
    });

    describe('EMAIL must be unique', () => {
      beforeEach(done => {
        model.user = [
          {
            first_name: 'emanuel',
            last_name: 'okello',
            email: 'ox@gmail.com',
            password: '12345',
            address: 'uganda',
            user_class: 'BUYER',
            is_admin: false
          }
        ];
        done();
      });

      afterEach(done => {
        model.user = [];
        done();
      });

      it('should create return 409', done => {
        chai
          .request(server)
          .post('/api/v1/auth/signup')
          .send(user)
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.status.should.equal(409);
            res.body.error.should.be.a('string');
            done();
          });
      });
    });
  });

  describe('USER SIGNIN', () => {
    beforeEach(done => {
      user = {
        first_name: 'emanuel',
        last_name: 'okello',
        email: 'ox@gmail.com',
        password: '12345',
        address: 'uganda',
        user_class: 'BUYER',
        is_admin: false
      };

      user = { email: 'ox@gmail.com', password: '12345' };
      done();
    });

    it('should return 400', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(user)
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
