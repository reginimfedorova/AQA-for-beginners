import {test, expect} from '@playwright/test';
import {apiDataPost, apiDataPatch, apiDataPut} from '../data/testData';

test.describe ('API project', () => {
    test('Get posts', async({request}) => {
        const response = await request.get('/posts/1');
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    });

    test('Post posts', async({request}) => {
        const response = await request.post('/posts', {
            data: apiDataPost
        });
        expect (response.status()).toBe(201);
        const body = await response.json();
        console.log(body);

    });

    // test('Delete posts', async({request}) => {
    //     const response = await request.delete('/posts/1');
    //     expect (response.status()).toBe(200);
    //     const body = await response.json();
    //     console.log(body);        
    // });

    test('Patch posts', async({request}) => {
        const response = await request.patch('/posts/1', {
            data: apiDataPatch
        });
        expect (response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    });

    test('Put posts', async({request}) => {
        const response = await request.put('/posts/1', {
        data: apiDataPut
    });
        expect (response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    });

    test('Get non-existent post', async({request}) => {
        const response = await request.get('/posts/9999');
        expect(response.status()).toBe(404);
        const body = await response.json();
        console.log(body);       

    })


})