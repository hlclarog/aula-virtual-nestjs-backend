import { Injectable } from '@nestjs/common';
import {
  UserLoaderInterface,
  UserInterface,
  InvalidUserException,
} from '@switchit/nestjs-oauth2-server';

@Injectable()
export class UserLoader implements UserLoaderInterface {
  async load(userId: string): Promise<UserInterface> {
    // Load the user from the database
    // ...
    // or throw and
    throw InvalidUserException.withId(userId);
  }
}
