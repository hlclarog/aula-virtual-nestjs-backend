import { Injectable } from '@nestjs/common';
import { SHA512, HmacSHA1 } from 'crypto-js';

@Injectable()
export class CryptoService {
  public hashPassword(password: string) {
    const hashDigest = SHA512(password).toString();
    return hashDigest;
  }
  public hashSecret(password: string, key: string) {
    const hashDigest = HmacSHA1(password, key).toString();
    return hashDigest;
  }
}
