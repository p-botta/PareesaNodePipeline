const request = require('supertest');
const app = require('../src/index');

describe('GET /version', () => {
  it('should report dev when no version is set', async () => {
    const res = await request(app).get('/version');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ version: 'dev' });
  });
});
