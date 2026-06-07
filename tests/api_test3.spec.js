import { test, expect } from '@playwright/test';

test.describe('API Testing with Playwright', () => {

  test('GET: Validate list of users', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
      //https://reqres.in/api/users?page=2');

    const body = await response.json();
    console.log(body);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // const body = await response.json();
    // console.log(body);

    expect(body.page).toBe(2);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('POST: Create a new user', async ({ request }) => {
    const payload = {
      name: "John Doe",
      job: "QA Engineer"
    };

    const response = await request.post('https://reqres.in/api/users', {
      data: payload
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log(body);

    expect(body.name).toBe("John Doe");
    expect(body.job).toBe("QA Engineer");
    expect(body.id).toBeTruthy();
  });

});
