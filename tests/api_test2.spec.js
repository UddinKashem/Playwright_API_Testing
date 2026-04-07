import { test, expect } from '@playwright/test';  

test.only('Demo API GET Test', async({request}) => { 

    const response = await request.get('https://reqres.in/api/users/2')

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Janet');

    console.log(await response.json());
 }) 