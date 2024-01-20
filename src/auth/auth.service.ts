import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

export interface ISignInResponse {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: CreateUserDto): Promise<ISignInResponse> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  async signUp(userDto: CreateUserDto): Promise<ISignInResponse> {
    const candidate = await this.userService.findOne({
      username: userDto.username,
    });
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    return {
      token: this.jwtService.sign({ ...user }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findOne({ username: userDto.username });
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный еиейл или пароль',
    });
  }
}
