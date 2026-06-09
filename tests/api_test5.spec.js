import { test, expect } from '@playwright/test';

test.describe('API Authentication with repeated calls', () => {

  let token;   // store token for reuse

  test.beforeAll(async ({ request }) => {

    // Step 1: Login to get token
    const loginResponse = await request.post('https://reqres.in/api/login', {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginBody = await loginResponse.json();
    token = loginBody.token;   // store token

    console.log("Auth Token:", token);
  });

  test('Call #1: Get user list using token', async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users?page=2', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log("Users Response:", body);

    expect(body.page).toBe(2);
  });

  test('Call #2: Create user using token', async ({ request }) => {

    const response = await request.post('https://reqres.in/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        name: "John Doe",
        job: "QA Engineer"
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log("Create User Response:", body);

    expect(body.name).toBe("John Doe");
  });

});