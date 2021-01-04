import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Clients {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  socket: string;

  @Column()
  channel: string;
}
