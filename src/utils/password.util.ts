import * as argon2 from 'argon2';

export class PasswordUtil {
  static async toHash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  static async compareHash(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
