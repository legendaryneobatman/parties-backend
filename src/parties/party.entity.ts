import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Files } from '../files/files.entity';
import { User } from '../users/user.entity';

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  address: string;

  @Column({
    nullable: true,
  })
  img?: string;

  @OneToMany(() => Files, (files) => files.party)
  files: Files[];

  @ManyToOne(() => User, (user) => user.parties)
  user?: User[];
}
