const request = require('supertest');
const app = require('../index'); 

describe('Auth API', () => {
  let token;

  test('POST /api/auth/register - should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpass123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  test('POST /api/auth/login - should login and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpass123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /api/auth/me - should return user info when authenticated', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });
});