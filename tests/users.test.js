const request = require('supertest');
const app = require('../src/index');

describe('Users API', () => {
  it('should return empty users array initially', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.users).toEqual([]);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', id: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice');
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app).post('/users').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('Name is required');
  });

  it('should fetch a user by id', async () => {
    const created = await request(app).post('/users').send({ name: 'Bob' });
    const res = await request(app).get(`/users/${created.body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Bob');
  });

  it('should return 404 for an unknown user', async () => {
    const res = await request(app).get('/users/999');
    expect(res.statusCode).toBe(404);
  });
});
