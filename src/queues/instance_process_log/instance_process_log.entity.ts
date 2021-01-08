import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class IntanceProcessLog {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  tenant: string;

  @Column()
  date: string;

  @Column({ nullable: true })
  status_register: boolean;

  @Column({ nullable: true })
  status_subdomain: boolean;

  @Column({ nullable: true })
  status_virtualhost: boolean;

  @Column({ nullable: true })
  status_schema: boolean;

  @Column({ nullable: true })
  status_migrations: boolean;

  @Column({ nullable: true })
  status_seeders: boolean;
}
