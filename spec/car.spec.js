/* eslint-disable jasmine/no-suite-dupes */
/* eslint-disable jasmine/no-spec-dupes */
/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import request from 'request';
import jsonwebtoken from 'jsonwebtoken';
import model from '../db/db';
import server from '../server';

describe('SERVER', () => {
    let ser;
    let token;
    let data = {};
    let options;

    beforeAll(() => {
        ser = server;
    });

    afterAll(() => {
        ser.close();
    });

    describe('TEST CAR ADVERT', () => {
        let url;
        let user;
        beforeEach(() => {
            url = 'http://127.0.0.1:3000/api/v1/car'
            user = {
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

        describe('TEST ALL GETs', () => {
            describe('GET /', () => {
                beforeEach((done) => {
                    options = {
                        url: url,
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

                it('should content response', () => {
                    expect(data.body.status).toBe(200);
                });
            });
        
            describe('GET /available', () => {
                beforeEach((done) => {
                    options = {
                        url: url + '?status=available',
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
                    expect(data.body.status).toBe(200);
                });
            });
        
            describe('GET /available/min_price/max_price', () => {
                beforeEach((done) => {
                    options = {
                        url: url + '?status=available&min_price=2000&max_price=6000',
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
        
                it('should return 200 for available cars within price range', () => {
                    expect(data.status).toBe(200);
                    expect(data.body.status).toBe(200);
                });
            });
        
            describe('GET /available/min_price/max_price', () => {
                beforeEach((done) => {
                    options = {
                        url: url + '?status=available&min_price=6000&max_price=8000',
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
        
                it('should return 200 for available cars within price range', () => {
                    expect(data.status).toBe(200);
                    expect(data.body.data.length).toEqual(0);
                });
            });
        
            describe('GET /bad token', () => {
                beforeEach((done) => {
                    options = {
                        url: url + '?status=available&min_price=6000&max_price=8000',
                        headers: {
                            'x-auth-token': 'vyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNfYWRtaW4iOnRydWUsInVzZXJfY2xhc3MiOiJTRUxMRVIiLCJpYXQiOjE1NTkxNDg4NTYsImV4cCI6MTU1OTIzNTI1Nn0.N6Mi4Qgk0RPcCk6DedYPxHaf42syfGtTsL8QVgeb3s8'
                        }
                    };
        
                    request.get(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
        
                it('should return error message', () => {
                    expect(data.body.error.message).toBe('invalid token');
                    expect(data.body.error.name).toBe('JsonWebTokenError');
                });
        
                it('should return 401', () => {
                    expect(data.status).toBe(401);
                });
            });
        
            describe('GET /:id', () => {
                beforeEach((done) => {
                    let car = {
                        price: 2000.5,
                        manufacturer: 'toyota',
                        model: 'tv34',
                        body_type: 'van',
                        state: 'new'
                    };
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car',
                        headers: {
                            'x-auth-token': token
                        },
                        form: car,
                        jar: true
                    };
                    request.get(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });

                afterEach(() => {
                    model.car = [];
                });
        
                it('should return 200 for a specific car', () => {
                    expect(data.status).toBe(200);
                });    
            });
        
            describe('GET /', () => {
                beforeEach((done) => {
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
        
                it('should return invalid token', () => {
                    expect(data.body.error.message).toBe('invalid token');
                    expect(data.body.error.name).toBe('JsonWebTokenError');
                }); 
                
                it('should return 401', () => {
                    expect(data.status).toBe(401);
                });
            });
        
            describe('GET /:id', () => {
                beforeEach((done) => {
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car/0',
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
        });

        describe('POST /', () => {
            let car;
            describe('POST /happy path', () => {
                beforeEach((done) => {
                    car = {
                        price: 2000.5,
                        manufacturer: 'toyota',
                        model: 'tv34',
                        body_type: 'van',
                        state: 'new',
                    };
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car',
                        headers: {
                            'x-auth-token': token
                        },
                        form: car,
                        jar: true
                    };
                    request.post(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
    
                afterEach((done) => {
                    model.car = [];
                    done();
                });

                it('should return 201', () => {
                    expect(data.status).toBe(201);
                });
 
                it('should have 201 in body response status', () => {
                    expect(data.body.status).toBe(201);
                });
            });

            describe('POST /unhappy path', () => {
                beforeEach((done) => {
                    let car = {
                        price: 2000.5,
                        manufacturer: 'toyota',
                        model: 'tv34',
                        body_type: 'van',
                    };
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car',
                        headers: {
                            'x-auth-token': token
                        },
                        form: car,
                        jar: true
                    };
                    request.post(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
    
                afterEach((done) => {
                    model.car = [];
                    done();
                });
    
                it('should return 400', () => {
                    expect(data.status).toBe(400);
                });
 
                it('should have 400 in body response status', () => {
                    expect(data.body.status).toBe(400);
                });
            });
        });

        describe('PATCH /MARK AS SOLD', () => {
            let sold;
            describe('PATCH /happy path', () => {
                beforeEach((done) => {
                    model.car = [
                        {
                            id: 1,
                            status: 'available',
                            state: 'new',
                            price: 2000.5,
                            manufacturer: 'toyota',
                            model: 'tv34',
                            body_type: 'van',
                        },
                    ];
                    sold = {status: 'sold'};
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car/1/status',
                        headers: {
                            'x-auth-token': token
                        },
                        form: sold,
                        jar: true
                    };
    
                    request.patch(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
    
                afterEach((done) => {
                    model.car = [];
                    done();
                });
    
                it('should return 200', () => {
                    expect(data.status).toBe(200);
                    expect(data.body.status).toBe(200);
                }); 
            });

            describe('PATCH /unhappy path 404', () => {
                beforeEach((done) => {
                    model.car = [
                        {
                            id: 1,
                            status: 'available',
                            state: 'new',
                            price: 2000.5,
                            manufacturer: 'toyota',
                            model: 'tv34',
                            body_type: 'van',
                        },
                    ];
                    sold = {status: 'sold'}
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car/0/status',
                        headers: {
                            'x-auth-token': token
                        },
                        form: sold,
                        jar: true
                    };
                    request.patch(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
    
                afterEach((done) => {
                    model.car = [];
                    done();
                });
    
                it('should return 404', () => {
                    expect(data.status).toBe(404);
                    expect(data.body.status).toBe(404);
                }); 
            });

            describe('PATCH /unhappy path 400', () => {
                beforeEach((done) => {
                    model.car = [
                        {
                            id: 1,
                            status: 'available',
                            state: 'new',
                            price: 2000.5,
                            manufacturer: 'toyota',
                            model: 'tv34',
                            body_type: 'van',
                        },
                    ];
                    sold = {state: 'sold'}
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car/1/status',
                        headers: {
                            'x-auth-token': token
                        },
                        form: sold,
                        jar: true
                    };
                    request.patch(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
    
                afterEach((done) => {
                    model.car = [];
                    done();
                });
    
                it('should return 400', () => {
                    expect(data.status).toBe(400);
                    expect(data.body.status).toBe(400);
                }); 
            });
        });

        describe('DELETE /DELETE CAR', () => {
            describe('DELETE /happy path', () => {
                let car;
                beforeEach((done) => {
                    model.car = [
                        {
                            id: 1,
                            status: 'available',
                            state: 'new',
                            price: 2000.5,
                            manufacturer: 'toyota',
                            model: 'tv34',
                            body_type: 'van',
                        },
                    ];
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car/1/',
                        headers: {
                            'x-auth-token': token
                        },
                        jar: true
                    };
                    request.delete(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });

                afterEach((done) => {
                    model.car = [];
                    done();
                });
    
                it('should return 202', () => {
                    expect(data.status).toBe(202);
                    expect(data.body.status).toBe(202);
                }); 
            });

            describe('DELETE /unhappy path 400', () => {
                beforeEach((done) => {
                    options = {
                        url: 'http://127.0.0.1:3000/api/v1/car/0/',
                        headers: {
                            'x-auth-token': token
                        },
                        jar: true
                    };
                    request.delete(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
    
                it('should return 404', () => {
                    expect(data.status).toBe(404);
                    expect(data.body.status).toBe(404);
                }); 
            });
        });
    });

    describe('TEST CAR ORDER', () => {
        let url;
        let buyer;
        beforeEach(() => {
            url = 'http://127.0.0.1:3000/api/v1/order'
            buyer = {
                id: 2,
                email: 'hook@gmail.com',
                first_name: 'emanuel',
                last_name: 'okello',
                password: '123456',
                address: 'kampala',
                is_admin: true,
                user_class: 'BUYER',
              };
                
            token = jsonwebtoken.sign({ id: buyer.id, is_admin: buyer.is_admin, user_class: buyer.user_class }, 'supertopsecret', { expiresIn: '24h' });
        });

        describe('TEST ALL GETS', () => {
            // eslint-disable-next-line jasmine/no-suite-dupes
            describe('GET /', () => {
                beforeEach((done) => {
                    options = {
                        url: url,
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
                    expect(data.body.status).toBe(200);
                });

                // it('should content response', () => {
                //     expect(data.body.status).toBe(200);
                // });
            });

            describe('GET /bad token', () => {
                beforeEach((done) => {
                    options = {
                        url: url,
                        headers: {
                            'x-auth-token': 'vyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNfYWRtaW4iOnRydWUsInVzZXJfY2xhc3MiOiJTRUxMRVIiLCJpYXQiOjE1NTkxNDg4NTYsImV4cCI6MTU1OTIzNTI1Nn0.N6Mi4Qgk0RPcCk6DedYPxHaf42syfGtTsL8QVgeb3s8'
                        }
                    };
        
                    request.get(options, (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                    });
                });
        
                it('should return error message', () => {
                    expect(data.body.error.message).toBe('invalid token');
                    expect(data.body.error.name).toBe('JsonWebTokenError');
                });
        
                it('should return 401', () => {
                    expect(data.status).toBe(401);
                });
            });

            describe('POST /', () => {
                let order;
                describe('POST /happy path', () => {
                    beforeEach((done) => {
                        model.car = [
                            {
                                id: 1,
                                status: 'available',
                                state: 'new',
                                price: 2000.5,
                                manufacturer: 'toyota',
                                model: 'tv34',
                                body_type: 'van',
                                owner: 1,
                            },
                        ];

                        order = {
                            id: 1,
                            buyer: 2,
                            car_id: 1,
                            amount: 5576.00,
                            status: 'pending',
                            created_on: Date.now(),
                            date_modified: Date.now(),
                        };
                        options = {
                            url: 'http://127.0.0.1:3000/api/v1/order',
                            headers: {
                                'x-auth-token': token
                            },
                            form: order,
                            jar: true
                        };
                        request.post(options, (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = JSON.parse(body);
                            done();
                        });
                    });
        
                    afterEach((done) => {
                        model.car = [];
                        model.order = [];
                        done();
                    });

                    it('should return 201', () => {
                        expect(data.status).toBe(201);
                    });
 
                    it('should have 201 in body response status', () => {
                        expect(data.body.status).toBe(201);
                    });
                });

                describe('POST /unhappy path 404', () => {
                    beforeEach((done) => {
                        model.car = [
                            {
                                id: 2,
                                status: 'available',
                                state: 'new',
                                price: 2000.5,
                                manufacturer: 'toyota',
                                model: 'tv34',
                                body_type: 'van',
                                owner: 1,
                            },
                        ];

                        order = {
                            id: 1,
                            buyer: 2,
                            car_id: 1,
                            amount: 5576.00,
                            status: 'pending',
                            created_on: Date.now(),
                            date_modified: Date.now(),
                        };
                        options = {
                            url: 'http://127.0.0.1:3000/api/v1/order',
                            headers: {
                                'x-auth-token': token
                            },
                            form: order,
                            jar: true
                        };
                        request.post(options, (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = JSON.parse(body);
                            done();
                        });
                    });
        
                    afterEach((done) => {
                        model.car = [];
                        model.order = [];
                        done();
                    });

                    it('should return 404', () => {
                        expect(data.status).toBe(404);
                    });
 
                    it('should have 404 in body response status', () => {
                        expect(data.body.status).toBe(404);
                    });
                });
    
                describe('POST /unhappy path 400', () => {
                    beforeEach((done) => {
                        order = {
                            id: 1,
                            buyer: 2,
                            car_id: 1,
                            price: 5576.00,
                            status: 'pending',
                            created_on: Date.now(),
                            date_modified: Date.now(),
                        };
                        options = {
                            url: 'http://127.0.0.1:3000/api/v1/order',
                            headers: {
                                'x-auth-token': token
                            },
                            form: order,
                            jar: true
                        };
                        request.post(options, (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = JSON.parse(body);
                            done();
                        });
                    });
        
                    afterEach((done) => {
                        model.car = [];
                        done();
                    });
        
                    it('should return 400', () => {
                        expect(data.status).toBe(400);
                    });
 
                    it('should have 400 in body response status', () => {
                        expect(data.body.status).toBe(400);
                    });
                });
            });

            describe('PATCH /update purchase Order', () => {
                let newPrice;
                describe('PATCH /happy path', () => {
                    beforeEach((done) => {
                        model.order = [{
                            id: 1,
                            buyer: 2,
                            car_id: 1,
                            amount: 5576.00,
                            status: 'pending',
                            created_on: Date.now(),
                            date_modified: Date.now(),
                        }];
                        newPrice = {amount: 6000};
                        options = {
                            url: 'http://127.0.0.1:3000/api/v1/order/1/price',
                            headers: {
                                'x-auth-token': token
                            },
                            form: newPrice,
                            jar: true
                        };
        
                        request.patch(options, (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = JSON.parse(body);
                            done();
                        });
                    });
        
                    afterEach((done) => {
                        model.order = [];
                        done();
                    });
        
                    it('should return 200', () => {
                        expect(data.status).toBe(200);
                        expect(data.body.status).toBe(200);
                    }); 
                });
    
                describe('PATCH /unhappy path 404', () => {
                    beforeEach((done) => {
                        model.order = [{
                            id: 2,
                            buyer: 2,
                            car_id: 1,
                            amount: 5576.00,
                            status: 'pending',
                            created_on: Date.now(),
                            date_modified: Date.now(),
                        }];
                        newPrice = {amount: 6000};
                        options = {
                            url: 'http://127.0.0.1:3000/api/v1/order/1/price',
                            headers: {
                                'x-auth-token': token
                            },
                            form: newPrice,
                            jar: true
                        };
                        request.patch(options, (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = JSON.parse(body);
                            done();
                        });
                    });
        
                    afterEach((done) => {
                        model.order = [];
                        done();
                    });
        
                    it('should return 404', () => {
                        expect(data.status).toBe(404);
                        expect(data.body.status).toBe(404);
                    }); 
                });
    
                describe('PATCH /unhappy path 400', () => {
                    beforeEach((done) => {
                        model.order = [{
                            id: 1,
                            buyer: 2,
                            car_id: 1,
                            amount: 5576.00,
                            status: 'pending',
                            created_on: Date.now(),
                            date_modified: Date.now(),
                        }];
                        newPrice = {price: 6000};
                        options = {
                            url: 'http://127.0.0.1:3000/api/v1/order/1/price',
                            headers: {
                                'x-auth-token': token
                            },
                            form: newPrice,
                            jar: true
                        };
                        request.patch(options, (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = JSON.parse(body);
                            done();
                        });
                    });
        
                    afterEach((done) => {
                        model.order = [];
                        done();
                    });
        
                    it('should return 400', () => {
                        expect(data.status).toBe(400);
                        expect(data.body.status).toBe(400);
                    }); 
                });
            });
            
        });

    });
});