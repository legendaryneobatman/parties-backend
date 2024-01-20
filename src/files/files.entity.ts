import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Party } from '../parties/party.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Files {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'Тусовка объект', type: Party })
  @ManyToOne(() => Party, (party) => party.files)
  party: Party;
  @ApiProperty({ example: 'img.jpg', description: 'Прикрепленный файл' })
  @Column()
  fileName: string;
}
