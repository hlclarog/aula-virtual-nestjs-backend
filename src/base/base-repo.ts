import { Repository } from 'typeorm';

export abstract class BaseRepo<ENTITY> extends Repository<ENTITY> {}
