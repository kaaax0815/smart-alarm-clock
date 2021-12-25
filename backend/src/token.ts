import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

class JWT {
  private privateKey: string;
  constructor() {
    this.privateKey = readFileSync('./private-key.pem').toString('utf-8');
  }
  public sign(payload: any): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: 'RS256',
      audience: 'de:kaaaxcreators:smartalarmclock:devices',
      issuer: 'de:kaaaxcreators:smartalarmclock:backend',
      expiresIn: '24h'
    });
  }
  public verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.privateKey, {
      algorithms: ['RS256'],
      audience: 'de:kaaaxcreators:smartalarmclock:devices',
      issuer: 'de:kaaaxcreators:smartalarmclock:backend'
    });
  }
}

export default JWT;
