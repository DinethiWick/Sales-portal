import CartService from '../service/cartService.js';
import { cartApi } from '../api/apiinstances.js';

import BffError from '../exceptions/BffError.js';
import BadRequestError from '../exceptions/BadRequestError.js';
import NotFoundError from '../exceptions/NotFoundError.js';

import {strict as assert} from 'assert'
import sinon from 'sinon';

describe('Sanity check', ()=>{
    it('should load', ()=>{
        assert.equal(true,true);
    })
})

describe('Cart Service - CRUD operations', ()=>{
    let cartService;
    let cartApiStub;

    beforeEach(() =>{
        cartService = new CartService();

        cartApiStub = sinon.stub(cartApi,'request')
    });

    afterEach(() =>{
        sinon.restore();
    });

    it('should get all carts', async ()=>{
        const mockResponse = { data: [{ id: 1, name: 'Cart 1' }] };
        cartApiStub.resolves({ data: mockResponse });

        const result = await cartService.getCarts();

        assert.deepEqual(result, mockResponse);
        
    });

    it('should create a cart', async ()=>{
        const mockResponse = { data: [{ id: 1, name: 'Cart 1' }] };
        cartApiStub.resolves({ data: mockResponse });

        const result = await cartService.createCart();

        assert.deepEqual(result, mockResponse);
        
    });

    

    it('should get carts by ID', async ()=>{
        const mockResponse = { data: [{ id: 1, name: 'Cart 1' }] };
        cartApiStub.resolves({ data: mockResponse });

        const result = await cartService.getCartById();

        assert.deepEqual(result, mockResponse);
        
    });

    

    it('should delete a specified cart', async ()=>{
        const mockResponse = { data: [{ id: 1, name: 'Cart 1' }] };
        cartApiStub.resolves({ data: mockResponse });

        const result = await cartService.deleteCartById();

        assert.deepEqual(result, mockResponse);
        
    });
});

describe('Cart Service - Error handling', ()=>{
    let cartService;
    let cartApiStub;

    beforeEach(() =>{
        cartService = new CartService();

        cartApiStub = sinon.stub(cartApi,'request')
    });

    afterEach(() =>{
        sinon.restore();
    });

    it('should throw error on failing to get carts', async () => {
        const mockError = new Error("error");
        cartApiStub.rejects(mockError);

        try {
            await cartService.getCarts();
            assert.fail('error not thrown');
        } catch (error) {
            assert.deepEqual(error.cause,'error getting cart list')
        }
    })

    it('should throw error on failing to create cart', async () => {
        const mockError = new Error("error");
        cartApiStub.rejects(mockError);

        try {
            await cartService.getCarts();
            assert.fail('error not thrown');
        } catch (error) {
            assert.deepEqual(error.cause,'error getting cart list')
        }
    })
})
