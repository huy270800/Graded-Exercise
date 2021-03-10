const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app');

const apiAddress = "http://localhost:3000/";

describe('Testing route /product', function () {

    it('Should return successfully response', function () {

        // prepare http request
        // send the request to our server
        chai.request(apiAddress).get('/products')
            .then(res => {
                expect(res).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
    })
    it('Should return successfully response', function () {

        // prepare http request
        // send the request to our server
        chai.request(apiAddress).get('/products/:productId')
            .then(res => {
                expect(res).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
    }),
    describe('for non-logged user', function() {
        it('Should return 400 status', function(){
            chai.request(apiAddress).post('/add-product')
                .then(res => {
                    expect(res).to.have.status(400)
                })
                .catch(error => {
                    throw error;
                })
        })
    }),
        describe('for logged user', function () { 
            it('Should return 400 status for an add product', function () {
                chai.request(apiAddress).post('/add-product')
                    .then(res => {
                        expect(res).to.have.status(400)
                    })
                    .catch(error => {
                        throw error;
                    })
            }),
                it('Should return 400 status for an update product', function () {
                    chai.request(apiAddress).post('/update-product')
                        .then(res => {
                            expect(res).to.have.status(400)
                        })
                        .catch(error => {
                            throw error;
                        })
                }),
                it('Should return 400 status for a delete-product', function () {
                    chai.request(apiAddress).post('/delete-product')
                        .then(res => {
                            expect(res).to.have.status(400)
                        })
                        .catch(error => {
                            throw error;
                        })
                })
        })
})
