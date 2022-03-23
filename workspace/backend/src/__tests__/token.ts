import JWT from '../token';

describe('token', () => {
  const jwt = new JWT();
  it('should sign and verify', () => {
    const payload = {
      id: '123',
      name: 'test'
    };
    const token = jwt.sign(payload);
    expect(token).toBeDefined();
    const verify = jwt.verify(token);
    expect(verify).toContainEntries([
      ['id', '123'],
      ['name', 'test']
    ]);
  });
});
