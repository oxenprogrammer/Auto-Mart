/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import request from 'request';
import jsonwebtoken from 'jsonwebtoken';
import server from '../server';

describe('Server', () => {
    let ser;
    beforeAll(() => {
        ser = server;
    });

    afterAll(() => {
        ser.close();
    });
    
    describe('GET', () => {
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
            
        const token = jsonwebtoken.sign({ id: user.id, is_admin: user.is_admin, user_class: user.user_class }, 'supertopsecret', { expiresIn: '24h' });

        let data = {};
        beforeAll((done) => {

            const options = {
                url: 'http://127.0.0.1:3000/api/v1/car',
                headers: {
                    'x-auth-token': token
                }
            };

            request.get(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it('should return 200', () => {
            expect(data.status).toBe(200);
        }); 
   
    });
});
