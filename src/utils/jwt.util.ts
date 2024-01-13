import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { DecodedToken } from './types';

dotenv.config();

interface UserTokenData {
  email: string;
  id: number;
}

export class JwtUtil {
  static async generateToken(
    userData: UserTokenData,
    exp = '1y'
  ): Promise<string> {
    return JWT.sign(userData, process.env.JWT_SECRET!, { expiresIn: exp });
  }

  static async verifyToken(token: string): Promise<DecodedToken> {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as DecodedToken);
        }
        return decoded;
      });
    });
  }
}
