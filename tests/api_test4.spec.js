import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Testing Suite', () => {
  const baseUrl = 'https://reqres.in/api';
  //'https://typicode.com';

  // 1. GET Request
  test('Should fetch users', async ({ request }) => {
    const response = await request.get(`${baseUrl}`);
        //users`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    // const users = await response.json();
    // expect(users.length).toBeGreaterThan(0);
  });

  // 2. POST Request
  test('Should create a new post', async ({ request }) => {
    const response = await request.post(`${baseUrl}/posts`, {
      data: { title: 'Test Post', body: 'Content', userId: 1 }
    });
    expect(response.status()).toBe(201);
    expect((await response.json()).title).toBe('Test Post');
  });
});
