import { Repository } from 'typeorm';

export abstract class BaseRepo<E> extends Repository<E> {}
