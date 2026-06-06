<<<<<<< HEAD
// import { test, expect } from '@playwright/test';
// import exp from 'constants';
// //import { request } from 'https';
// //import { request } from 'http';
// //import { ClientRequest, request } from 'http';

// test('API Delete Request', async({request}) => {
//     const response = await request.delete('https://reqres.in/api/users/2')
//    // https://reqres.in/api/users/2
//    //https://reqres.in/api/users?page=2
//     expect(response.status()).toBe(204)

// });

// test('API PUT Request', async ({request}) => {
//     const response = await request.put('https://reqres.in/api/users/2', {
//         data: {
//             "name": "Saife",
//             "job": "Software"
//         }
//     })
//     expect(response.status()).toBe(200)

//     const text = await response.text();
//     expect(text).toContain('Saife')

//     console.log(await response.json());
=======
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
>>>>>>> 9892319686839ea5d1987240ea0a19d3c6ac978a

// })

// test('API POST Request', async({request}) => {
//     const response = await request.post('https://reqres.in/api/users', {
//         data: {
//             "name": "morpheus",
//             "job": "leader"
//         }
//     })
//     expect(response.status).toBe(201)

<<<<<<< HEAD
//     const text = await response.text();
//     expect(text).toContain('leader')

//     console.log(await response.json());
// })
=======
    const text = await response.text();
    expect(text).toContain('leader')
    console.log(await response.json());
})
>>>>>>> 9892319686839ea5d1987240ea0a19d3c6ac978a

// test('API Get Request', async({request}) => {
//     const response = await request.get('https://reqres.in/api/users/2')
//    // https://reqres.in/api/users/2
//    //https://reqres.in/api/users?page=2
//     expect(response.status()).toBe(200)

//     const text = await response.text();
//     expect(text).toContain('Janet')

//     console.log(await response.json());

// });

test.describe('Validate API Headers', () => {

  test('Validate headers from GET API response', async ({ request }) => {

    // Send API request
    const response = await request.get('https://reqres.in/api/users?page=2');

    // Validate status
    expect(response.ok()).toBeTruthy();

    // Get headers as an object
    const headers = response.headers();

    // Example validations
    expect(headers['content-type']).toContain('application/json');
    expect(headers['cache-control']).toBeDefined();

    console.log("Headers:", headers);

    // Get headers as an array (alternative)
    const headerArray = response.headersArray();
    console.log("Header Array:", headerArray);

    // Validate using array format
    const contentTypeHeader = headerArray.find(h => h.name === 'content-type');
    expect(contentTypeHeader.value).toContain('application/json');
  });

});
