import { Column, Entity } from 'typeorm';
import { CURRENCY_ENTITY } from './currency.dto';
import { Base } from '../../base/base.entity';

@Entity({ name: CURRENCY_ENTITY })
export class Currencies extends Base {
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'varchar' })
  code: string;
  @Column({ type: 'varchar' })
  symbol: string;
  @Column({ type: 'int' })
  decimals: number;
}
