import { forwardRef, Module } from '@nestjs/common';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './party.entity';
import { Files } from '../files/files.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Party, Files, User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PartyController],
  providers: [PartyService, JwtService],
  exports: [PartyService, TypeOrmModule],
})
export class PartyModule {}
