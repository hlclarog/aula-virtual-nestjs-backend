import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from '../../test/test.entity';

@Entity('testtwo')
export class Testtwo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ type: 'text', nullable: true })
  file_name: string;

  @ManyToOne(() => Test, (test) => test.testtwo, { eager: true })
  @JoinColumn({ name: 'test_id' })
  test: Test;
}
