// import {test, expect} from '@playwright/test';

// test('Should display mocked user data', async ({page} ))
import { test, expect } from '@playwright/test';

test('should display mocked user data', async ({ page }) => {
  // 1. Set up the interception BEFORE navigating
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit' },
        { id: 2, name: 'qui est esse' },
        { body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'}
      ]),
    });
  });

  // 2. Trigger the network request
  await page.goto('https://jsonplaceholder.typicode.com/posts/');

  // 3. Assert on the UI using the mocked data
  await expect(page.getByText('qui est esse')).toBeVisible();
 // await expect(page.getByText('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto')).toBeVisible();
});
