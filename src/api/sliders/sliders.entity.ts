import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { SLIDERS_ENTITY } from './sliders.dto';
import { Banners } from '../banners/banners.entity';

@Entity({ name: SLIDERS_ENTITY })
export class Sliders extends Base {
  @ManyToOne(() => Banners, (banners) => banners.sliders)
  @JoinColumn({ name: 'banner_id' }) banners: Banners;
  @RelationId((sliders: Sliders) => sliders.banners)
  @Column({ type: 'int' }) banner_id: number;

  @Column({ type: 'text' }) content: string;
  @Column({ type: 'text' }) link: string;
  @Column({ type: 'text' }) image: string;
  @Column({ type: 'int' }) order: number;
}
