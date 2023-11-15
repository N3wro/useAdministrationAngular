import { OrderByEmailPipe } from './order-by-email.pipe';

describe('OrderByEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
