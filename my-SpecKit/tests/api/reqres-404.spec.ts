import { test, expect } from '@playwright/test';

test.describe('Reqres Public API - Non-existent user', () => {
  test('should return 404 for a non-existent user', async ({ request }) => {
    const response = await request.get('/api/users/99999');
    expect(response.status()).toBe(404);
  });
});
