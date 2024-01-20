import { Files } from '../../files/files.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartyDto {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  readonly id: number;

  @ApiProperty({ example: 'НГ у темыча', description: 'Название тусовки' })
  readonly title: string;

  @ApiProperty({
    example: 'тут ваще круту, и тд тд',
    description: 'Описание тусовки',
  })
  readonly description: string;

  @ApiProperty({
    example: '2023-05-05',
    description: 'Дата проведения тусовки',
  })
  readonly date: Date;

  @ApiProperty({
    example: 'г.Пермь ул.Ленина д.1',
    description: 'Адрес проведения тусовки',
  })
  readonly address: string;

  @ApiProperty({
    example: 'img.jpg',
    description: 'Изображение тусовки',
  })
  readonly img?: string;

  @ApiProperty({
    example: 'img.jpg',
    description: 'Файлы тусовки тусовки',
  })
  readonly files?: Files[];
}
