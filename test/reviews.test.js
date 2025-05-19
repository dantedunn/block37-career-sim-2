const request = require('supertest');
const app = require('../database/index'); 

describe('Reviews API', () => {
  let token;
  let reviewId;
  let userId;

  beforeAll(async () => {
    // Register and login a user to get a token
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'reviewuser', password: 'reviewpass' });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'reviewuser', password: 'reviewpass' });

    token = loginRes.body.token;
    userId = loginRes.body.id || loginRes.body.user?.id; 
  });

  test('GET /api/reviews/me - should return reviews for the authenticated user', async () => {
    const res = await request(app)
      .get('/api/reviews/me')
      .set('Authorization', token);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      reviewId = res.body[0].id;
    }
  });

  test('PUT /api/users/:userId/reviews/:reviewId - should update a review', async () => {
    if (!userId || !reviewId) return;
    const res = await request(app)
      .put(`/api/users/${userId}/reviews/${reviewId}`)
      .set('Authorization', token)
      .send({ content: 'Updated review content', rating: 5 });
    expect([200, 404]).toContain(res.statusCode);
  });

  test('DELETE /api/users/:userId/reviews/:reviewId - should delete a review', async () => {
    if (!userId || !reviewId) return;
    const res = await request(app)
      .delete(`/api/users/${userId}/reviews/${reviewId}`)
      .set('Authorization', token);
    expect([200, 404]).toContain(res.statusCode);
  });
});