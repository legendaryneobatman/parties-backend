import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  Post,
  Req, Put
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RequestGuarded } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../interceptors/transformInterceptor';
import { User } from './user.entity';

@Controller('user')
@UseInterceptors(TransformInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('User')
export class UserController {
  constructor(private usersService: UserService) {}

  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get active user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  findMe(@Request() req): Promise<User> {
    return this.usersService.findOne({ id: req.user.id });
  }

  @Put('/')
  @ApiOperation({ summary: 'Edit user' })
  @ApiResponse({ status: 200, description: 'User edited successfully' })
  editUser(@Req() req: RequestGuarded, @Body() dto: UpdateUserDto) {
    return this.usersService.editUser(req, dto);
  }
}
