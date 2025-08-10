import jwt from 'jsonwebtoken';
import { tokenUserSign_I } from '../types/auth.type';

export class TokenService {
  static generateAccessToken(user: tokenUserSign_I): string {
    const secret = process.env.JWT_SECRET || '';

    if (!secret) {
      console.error('WARNING: JWT_SECRET is not set!');
    }
    //@ts-ignore
    return jwt.sign(user, secret, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  static verifyToken(token: string): any {
    try {
      const secret = process.env.JWT_SECRET || '';

      if (!secret) {
        console.error('ERROR: Cannot verify token without JWT_SECRET');
        return null;
      }
      const decoded = jwt.verify(token, secret);

      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}
