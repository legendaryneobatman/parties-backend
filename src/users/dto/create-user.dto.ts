import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  readonly username: string;
  @ApiProperty({ example: 'john123@example.com', description: 'E-mail' })
  readonly email: string;
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  readonly password: string;
}
