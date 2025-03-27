import jwt from 'jsonwebtoken';
import { tokenUserSign_I } from '../types/auth.type';

export class TokenService {
  static generateAccessToken(user: tokenUserSign_I): string {
    //@ts-ignore
    return jwt.sign(user, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || '');
    } catch (error) {
      return null;
    }
  }
}
