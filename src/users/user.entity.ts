import { Exclude } from '@nestjs/class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Party } from '../parties/party.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Column({ nullable: true })
  avatar?: string;
  @Column({ nullable: true })
  birthdate?: Date;
  @Column({ nullable: true })
  address?: string;
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Party, (party) => party.user)
  parties: Party[];
}
