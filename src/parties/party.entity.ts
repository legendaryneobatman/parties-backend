import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Files } from '../files/files.entity';

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

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
}
