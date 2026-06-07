import { test, expect } from '@playwright/test';

test.describe('API Response Validation', () => {
   const baseUrl = 'https://jsonplaceholder.typicode.com/posts/1';

   test('Validate API Headers', async ({ request }) => {

      const res = await request.get(`${baseUrl}`);

      expect(res.ok()).toBeTruthy();

      //Get the Response Headers:
      const resHeaders = res.headers();
      console.log(resHeaders);
      expect(resHeaders).toHaveProperty("content-type", "application/json; charset=utf-8");
      expect(resHeaders).toHaveProperty('transfer-encoding', 'chunked');

      //Get the Response Headerrs as Array:
      const resHeaderArray = res.headersArray();
      console.log(resHeaderArray);
      expect(resHeaderArray).toBeDefined();
      const contentTypeHd = resHeaderArray.find(h => h.name === 'Content-Type');
      expect(contentTypeHd).toBeDefined();
      expect(contentTypeHd.value).toContain('application/json; charset=utf-8');
      //expect(resHeaderArray.values).toContain('application/json; charset=utf-8');


      const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");
      //'https://typicode.com');
      await expect(response).toBeOK(); // Asserts status code is between 200-299

      // 3. Extract the headers object (Returns keys in lowercase)
      const headers = response.headers();

      // --- Approach A: Specific Header Key-Value Validation ---

      // Validate Content-Type contains 'application/json'
      expect(headers['content-type']).toContain('application/json');

      // Validate the caching strategy header
      expect(headers['cache-control']).toBe('max-age=43200');

      // Verify the existence of a custom or security header
      expect(headers['x-powered-by']).toBeDefined();


      // --- Approach B: Validate using headersArray() ---
      // Useful if you need case-sensitive names or need to check duplicate headers (like Set-Cookie)
      const headersArray = await response.headersArray();

      // Find a specific header from the array mapping
      const contentTypeHeader = headersArray.find(h => h.name === 'Content-Type');

      expect(contentTypeHeader).toBeDefined();
      expect(contentTypeHeader.value).toContain('application/json')

   });

   test('Validate Get API Response JSON', async ({ request }) => {
      const res = await request.get(`${baseUrl}`);

      expect(res.ok()).toBeTruthy();

      //Get the Response Status code
      const resStatus = res.status();
      console.log(resStatus);
      expect(resStatus).toBe(200);

      //Get the Response Status Text
      const resStatusText = res.statusText();
      console.log(resStatusText);
      expect(resStatusText).toBe('OK');

      //Get the respose body as Json
      const resJson = await res.json();
      //console.log(resJson);
      expect(resJson).toHaveProperty("userId", 1);
      expect(resJson).toHaveProperty("id", 1);
      expect(resJson).toHaveProperty("title", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
      expect(resJson.body).toContain("quia et suscipit");

   });

});