import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { BANNERS_ENTITY } from './banners.dto';
import { Sliders } from '../sliders/sliders.entity';
import { Modules } from '../acl/modules/modules.entity';

@Entity({ name: BANNERS_ENTITY, schema: 'public' })
export class Banners extends Base {
  @Column({ type: 'text' }) description: string;

  @OneToMany(() => Sliders, (sliders) => sliders.banners)
  sliders: Sliders[];

  @OneToMany(() => Modules, (modules) => modules.banners)
  modules: Modules[];
}
