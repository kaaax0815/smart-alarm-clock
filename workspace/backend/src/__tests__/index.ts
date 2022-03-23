import { stopServer } from '../index';

describe('index', () => {
  it('should stop server', async () => {
    const result = await stopServer();
    expect(result).toBeTrue();
  });
  it('shouldnt stop  server', async () => {
    await expect(stopServer()).rejects.toThrow('Server is not running.');
  });
});
