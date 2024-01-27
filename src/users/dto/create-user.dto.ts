import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  readonly username: string;
  @ApiProperty({ example: 'john123@example.com', description: 'E-mail' })
  readonly email: string;
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  readonly password: string;
}

export class UpdateUserDto implements Partial<CreateUserDto> {
  @ApiProperty({ example: 'john123@example.com', description: 'E-mail' })
  readonly email: string;
  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  readonly firstName: string;
  @ApiProperty({ example: 'Doe', description: 'Фамилия пользователя' })
  readonly lastName: string;
  @ApiProperty({ example: 'avatar.jpg', description: 'Аватар пользователя' })
  readonly avatar?: string;
  @ApiProperty({
    example: '12 jan 2022',
    description: 'Дата рождения пользователя',
  })
  readonly birthdate?: Date;
  @ApiProperty({ example: 'Moscow', description: 'Адрес пользователя' })
  readonly address?: string;
  @ApiProperty({ example: 'I am a user', description: 'Описание пользователя' })
  readonly description?: string;
}
