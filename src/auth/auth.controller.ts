import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class TokenResponse {
  @ApiProperty({ type: String })
  token: string;
}

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign-in in app and get token' })
  @ApiResponse({
    status: 200,
    description: 'Token generated successfully',
    type: TokenResponse,
  })
  @ApiBearerAuth()
  login(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @Post('/sign-up')
  @ApiOperation({ summary: 'Sign-up in app and get token' })
  @ApiResponse({
    status: 200,
    description: 'Token generated successfully',
    type: TokenResponse,
  })
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}
