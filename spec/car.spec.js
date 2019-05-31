/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import request from 'request';
import jsonwebtoken from 'jsonwebtoken';
import server from '../server';

describe('Server', () => {
    let ser;
    let token;
    let options;
    let data = {};
    beforeAll(() => {
        ser = server;
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

    afterAll(() => {
        ser.close();
    });
    
    describe('GET CAR', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car',
                headers: {
                    'x-auth-token': token
                }
            };
            request.get(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });

        it('should return 200', () => {
            expect(data.status).toBe(200);
        }); 

        it('should return response body', () => {
            expect(data.body.status).toEqual(200);
            expect(data.body.data).toEqual(
                [ 
                    Object(
                        { 
                            id: 1, 
                            owner: 1, 
                            created_on: '05-22-2019', 
                            state: 'new', 
                            status: 'available', 
                            price: 5676.55, 
                            manufacturer: 'toyota', 
                            model: '1992', 
                            body_type: 'car', 
                            date_modified: '05-28-2019' 
                        }
                    ) 
                ]
            );
        });
   
    });

    describe('GET CAR /available', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car?status=available',
                headers: {
                    'x-auth-token': token
                }
            };
            request.get(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });

        it('should return 200 for available cars', () => {
            expect(data.status).toBe(200);
            expect(data.body.data).toEqual(
                [ 
                    Object(
                        { 
                            id: 1, 
                            owner: 1, 
                            created_on: '05-22-2019', 
                            state: 'new', 
                            status: 'available', 
                            price: 5676.55, 
                            manufacturer: 'toyota', 
                            model: '1992', 
                            body_type: 'car', 
                            date_modified: '05-28-2019' 
                        }
                    ) 
                ]
            );
        });    
    });

    describe('GET CAR  /available/max_price/min_price', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car?status=available&min_price=2000&max_price=6000',
                headers: {
                    'x-auth-token': token
                }
            };
            request.get(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });

        it('should return 200 if car is available within price range', () => {
            expect(data.status).toBe(200);
            expect(data.body.data).toEqual(
                [ 
                    Object(
                        { 
                            id: 1, 
                            owner: 1, 
                            created_on: '05-22-2019', 
                            state: 'new', 
                            status: 'available', 
                            price: 5676.55, 
                            manufacturer: 'toyota', 
                            model: '1992', 
                            body_type: 'car', 
                            date_modified: '05-28-2019' 
                        }
                    ) 
                ]
            );
        });    
    });

    describe('GET CAR /available/max_price/min_price no price range', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car?status=available&min_price=90000&max_price=100000',
                headers: {
                    'x-auth-token': token
                }
            };
            request.get(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });

        it('should return an empty array of length 0', () => {
            expect(data.status).toBe(200);
            expect(data.body.data.length).toEqual(0);
        });    
    });

    describe('GET CAR /', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car',
                headers: {
                    'x-auth-token': 'vyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNfYWRtaW4iOnRydWUsInVzZXJfY2xhc3MiOiJTRUxMRVIiLCJpYXQiOjE1NTkxNDg4NTYsImV4cCI6MTU1OTIzNTI1Nn0.N6Mi4Qgk0RPcCk6DedYPxHaf42syfGtTsL8QVgeb3s8',
                }
            };
            request.get(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });

        it('should return invalid token', () => {
            expect(data.body.error.message).toBe('invalid token');
            expect(data.body.error.name).toBe('JsonWebTokenError');
        });
        
        it('should return 401', () => {
            expect(data.status).toBe(401);
        });
    });

    describe('GET CAR /:id', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car/1',
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

        it('should return 200 for a specific car', () => {
            expect(data.status).toBe(200);
        });    
    });

    describe('GET CAR / without auth', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car/1',
                headers: {
                    'x-auth-token': 'vyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNfYWRtaW4iOnRydWUsInVzZXJfY2xhc3MiOiJTRUxMRVIiLCJpYXQiOjE1NTkxNDg4NTYsImV4cCI6MTU1OTIzNTI1Nn0.N6Mi4Qgk0RPcCk6DedYPxHaf42syfGtTsL8QVgeb3s8',
                }
            };
            request.get(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });

        it('should return invalid token on specific car', () => {
            expect(data.body.error.message).toBe('invalid token');
            expect(data.body.error.name).toBe('JsonWebTokenError');
        }); 
        
        it('should return 401 if not authorized', () => {
            expect(data.status).toBe(401);
        });
    });

    describe('GET CAR /:id no specific car', () => {
        beforeAll((done) => {
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car/2',
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

        it('should return 404 for a no specific car', () => {
            expect(data.status).toBe(404);
        });    
    });

    describe('POST CAR', () => {
        let car;
        beforeAll(() => {
            car = {
                state: 'new',
                price: 26000000,
                manufacturer: 'toyota',
                model: 'f45',
                body_type: 'car'
            };
    
            options = {
                url: 'http://127.0.0.1:3000/api/v1/car',
                headers: {
                    'x-auth-token': token
                }
            };
        });

        it('should post car ad', () => {
            request.post(options, {json: car}, (error, response, body) => {
                if (error) {
                    console.log('response', response);
                    console.log('error here', error);
                    return error;
                } else if (response === null || response === undefined) {
                    return new Error('an error occured', error);
                }
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                // done();
                expect(data.status).toBe(200);
            });
        });

    });
});

