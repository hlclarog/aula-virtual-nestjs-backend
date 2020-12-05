import { Injectable } from '@nestjs/common';
import { SHA512 } from 'crypto-js';

@Injectable()
export class CryptoService {
  public hashPassword(password: string) {
    const hashDigest = SHA512(password).toString();
    return hashDigest;
  }
}
