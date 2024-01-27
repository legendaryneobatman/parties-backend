import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
