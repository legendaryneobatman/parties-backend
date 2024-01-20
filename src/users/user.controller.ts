import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../interceptors/transformInterceptor';
import { User } from './user.entity';

@Controller('user')
@UseInterceptors(TransformInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('User')
export class UserController {
  constructor(private usersService: UserService) {}

  // @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/findMe')
  @ApiOperation({ summary: 'Get active user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  findMe(@Request() req): Promise<User> {
    return this.usersService.findOne({ id: req.user.id });
  }
}
