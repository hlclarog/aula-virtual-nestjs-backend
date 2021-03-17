import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Clients {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: true })
  user_id: string;

  @Column()
  socket: string;

  @Column()
  channel: string;
}
