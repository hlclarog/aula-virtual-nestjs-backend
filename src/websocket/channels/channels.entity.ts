import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Channels {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  name: string;

  @Column()
  clients: string[];
}
