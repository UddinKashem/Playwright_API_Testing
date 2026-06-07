import { test, expect } from '@playwright/test';

test.describe('Validate API Response', () => {
    const baseUrl = 'https://reqres.in/api';

    test('Validate headers from GET API response', async ({ request }) => {

        // Send API request
        const response = await request.get('https://reqres.in/api/');
        //`${baseUrl}`

        // Validate status
        expect(response.ok()).toBeTruthy();

        // Extract headers
        const headers = response.headers();
        const dateHeader = headers['date'];   // Example: "Sat, 06 Jun 2026 15:20:00 GMT"

        console.log("Date Header:", dateHeader);

        // Convert header date to JS Date object
        const serverDate = new Date(dateHeader);

        // Get today's date in UTC (server header is usually GMT/UTC)
        const todayUTC = new Date();
        const todayDay = todayUTC.getUTCDate();
        const todayMonth = todayUTC.getUTCMonth();
        const todayYear = todayUTC.getUTCFullYear();

        // Compare only the date portion (ignoring time)
        expect(serverDate.getUTCDate()).toBe(todayDay);
        expect(serverDate.getUTCMonth()).toBe(todayMonth);
        expect(serverDate.getUTCFullYear()).toBe(todayYear);

        console.log("✔ API Date header matches today's date (UTC)");

        // Example validations
        expect(headers['content-type']).toContain('application/json');
        //expect(headers['Connection']).toBeDefined();
        //expect(headers['Connection']).toContain('keep-alive');        
        expect(headers['cache-control']).toBeDefined();
        expect(headers['cache-control']).toContain('max-age=14400');
        expect(headers['transfer-encoding']).toBeDefined();
        expect(headers['transfer-encoding']).toContain('chunked');
        expect(headers['cross-origin-opener-policy']).toBeDefined();
        expect(headers['cross-origin-opener-policy']).toContain('same-origin');
        expect(headers['cross-origin-resource-policy']).toBeDefined();
        expect(headers['cross-origin-resource-policy']).toContain('same-origin');
        expect(headers['referrer-policy']).toBeDefined();
        expect(headers['referrer-policy']).toContain('strict-origin-when-cross-origin');
        // expect(headers['Strict-Transport-Security']).toBeDefined();
        // expect(headers['Strict-Transport-Security']).toContain('max-age=31536000; includeSubDomains');
        expect(headers['cf-cache-status']).toBeDefined();
        expect(headers['cf-cache-status']).toContain('HIT');


        //Get the Response Headerrs as Array:
        const resHeaderArray = response.headersArray();
        console.log(resHeaderArray);
        expect(resHeaderArray).toBeDefined();
        const contentTypeHd = resHeaderArray.find(h => h.name === 'Content-Type');
        expect(contentTypeHd).toBeDefined();
        expect(contentTypeHd.value).toContain('application/json; charset=utf-8');
    });

    test('Validate API Date header including hour and minutes', async ({ request }) => {

        // Send GET request
        const response = await request.get(`${baseUrl}`);
        expect(response.ok()).toBeTruthy();

        // Extract the Date header
        const headers = response.headers();
        const dateHeader = headers['date'];   // Example: "Sat, 06 Jun 2026 15:20:00 GMT"

        console.log("Date Header:", dateHeader);

        // Convert header date to JS Date object
        const serverDate = new Date(dateHeader);
        console.log(serverDate);

        // Get current UTC time (API Date header is usually GMT/UTC)
        const now = new Date();
        console.log(now);

        // Extract components
        const serverYear = serverDate.getUTCFullYear();
        const serverMonth = serverDate.getUTCMonth();
        const serverDay = serverDate.getUTCDate();
        const serverHour = serverDate.getUTCHours();
        const serverMinute = serverDate.getUTCMinutes();
        const serverSeconds = serverDate.getUTCSeconds();

        const nowYear = now.getUTCFullYear();
        const nowMonth = now.getUTCMonth();
        const nowDay = now.getUTCDate();
        const nowHour = now.getUTCHours();
        const nowMinute = now.getUTCMinutes();
        const nowSeconds = now.getUTCSeconds();
        console.log(nowSeconds);

        // Validate date (year, month, day)
        expect(serverYear).toBe(nowYear);
        expect(serverMonth).toBe(nowMonth);
        expect(serverDay).toBe(nowDay);

        // Validate hour and minute (allowing ±1 minute drift)
        expect(Math.abs(serverHour - nowHour)).toBeLessThanOrEqual(0);
        expect(Math.abs(serverMinute - nowMinute)).toBeLessThanOrEqual(1);
        expect(Math.abs(serverSeconds - nowSeconds)).toBeLessThanOrEqual(1);

        console.log("✔ API Date header matches today's date and current hour/minute (UTC)");
    });

    test('Validate Response Body JSON', async ({ request }) => {
        // Send GET request
        const response = await request.get(`${baseUrl}`);
        expect(response.ok()).toBeTruthy();

        //Get Response Body as JSON:
        const resJSON = await response.json();
        console.log("Response Body JSON:", resJSON);

        // Validate fields in the response body
        expect(resJSON).toHaveProperty('name');
        expect(resJSON).toHaveProperty('version');
        expect(resJSON).toHaveProperty('description');
        expect(resJSON).toHaveProperty('documentation');
        expect(resJSON).toHaveProperty('endpoints');
        expect(resJSON).toHaveProperty('features');


        // Validate actual values
        expect(resJSON.name).toBe('ReqRes API');
        expect(resJSON.version).toBe('1.0.0');
        expect(resJSON.description).toContain('Backend platform for frontend developers, testers,');
        expect(resJSON.documentation).toContain('/docs');

        // Validate "endpoints" exists
        expect(resJSON).toHaveProperty('endpoints');

        const endpoints = resJSON.endpoints;

        // Validate endpoints is an object
        expect(typeof endpoints).toBe('object');
        expect(Array.isArray(endpoints)).toBe(false);

        // Validate each key contains a string value
        for (const key of Object.keys(endpoints)) {
            expect(typeof endpoints[key]).toBe('string');
        }

        // Validate expected values
        expect(endpoints.free).toBe('/api/users');
        expect(endpoints.pro).toBe('/custom-endpoints');
        expect(endpoints.health).toBe('/health');

        // Validate "features" exists
        expect(resJSON).toHaveProperty('features');

        const features = resJSON.features;

        // Validate it's an array
        expect(Array.isArray(features)).toBeTruthy();

        // Validate each item is a string
        for (const item of features) {
            expect(typeof item).toBe('string');
        }

        // Validate expected values
        expect(features).toContain('Fake data generation');
        expect(features).toContain('Custom endpoints (Pro)');
        expect(features).toContain('Stripe subscriptions');

    });

});
