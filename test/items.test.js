const request = require('supertest');
const app = require('../index'); 

describe('Items API', () => {
  let itemId;

  test('GET /api/items - should return an array of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      itemId = res.body[0].id; // Save an item ID for later tests
    }
  });

  test('GET /api/items/:itemId - should return a single item or 404', async () => {
    if (!itemId) {
      return; // Skip if no items exist
    }
    const res = await request(app).get(`/api/items/${itemId}`);
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('id', itemId);
    }
  });


});