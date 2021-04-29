import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { BANNERS_ENTITY } from './banners.dto';
import { Payments } from '../payments/payments.entity';
import { Sliders } from '../sliders/sliders.entity';

@Entity({ name: BANNERS_ENTITY })
export class Banners extends Base {
  @Column({ type: 'text' }) description: string;

  @OneToMany(() => Sliders, (sliders) => sliders.banners)
  sliders: Sliders[];
}
