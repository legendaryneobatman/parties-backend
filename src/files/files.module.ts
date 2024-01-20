import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from '../parties/party.entity';
import { FilesService } from './files.service';
import { Files } from './files.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Party, Files])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [TypeOrmModule],
})
export class FilesModule {}
