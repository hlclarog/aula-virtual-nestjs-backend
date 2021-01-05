import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Testtwo } from '../testtwo/entities/testtwo.entity';

@Entity('test', { schema: 'public' })
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'text', nullable: true })
  file: string;

  @Column({ type: 'text', nullable: true })
  file_name: string;

  @Column({ type: 'text', nullable: true })
  file_name_two: string;

  @Column('int')
  state: number;

  @Column()
  active: boolean;

  @OneToMany(() => Testtwo, (testtwo) => testtwo.test)
  testtwo: Testtwo[];
}
