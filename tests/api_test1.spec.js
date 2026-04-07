import { test, expect } from '@playwright/test';
import exp from 'constants';
//import { request } from 'https';
//import { request } from 'http';
//import { ClientRequest, request } from 'http';

test('API Delete Request', async({request}) => {
    const response = await request.delete('https://reqres.in/api/users/2')
   // https://reqres.in/api/users/2
   //https://reqres.in/api/users?page=2
    expect(response.status()).toBe(204)

});

test('API PUT Request', async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Saife",
            "job": "Software"
        }
    })
    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain('Saife')

    console.log(await response.json());

})

test('API POST Request', async({request}) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "morpheus",
            "job": "leader"
        }
    })
    expect(response.status).toBe(201)

    const text = await response.text();
    expect(text).toContain('leader')

    console.log(await response.json());
})

test('API Get Request', async({request}) => {
    const response = await request.get('https://reqres.in/api/users/2')
   // https://reqres.in/api/users/2
   //https://reqres.in/api/users?page=2
    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain('Janet')

    console.log(await response.json());

});