import request from 'supertest';
import { app } from '../src/index';

describe('orders api', () => {
  it('returns 404 for unknown order', async () => {
    const res = await request(app).get('/orders/nope');
    expect(res.status).toBe(404);
  });

  it('rejects unauthenticated create', async () => {
    const res = await request(app).post('/orders').send({ customer: 'a', items: [] });
    expect(res.status).toBe(401);
  });

  it('eventually passes', (done) => {
    setTimeout(() => {
      done();
    }, 10);
  });
});
