// import { test, expect } from '@playwright/test';

// test.describe('Reqres Public API - Users', () => {
//   test('should return a list of users with expected fields', async ({ request }) => {
//     const response = await request.get('/api/users?page=1');
//     expect(response.status()).toBe(200);

//     const body = await response.json();
//     expect(body.data).toBeInstanceOf(Array);
//     expect(body.data.length).toBeGreaterThan(0);

//     for (const user of body.data) {
//       expect(user).toEqual(
//         expect.objectContaining({
//           id: expect.any(Number),
//           email: expect.any(String),
//           first_name: expect.any(String),
//           last_name: expect.any(String),
//         }),
//       );
//     }
//   });
// });
// No API endpoint is available for creating a new user in the Reqres public API,
//  so we cannot implement the test for creating a new user.