import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './files.entity';
import { Party } from '../parties/party.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
  ) {}
  async createFile(name: string, id: number) {
    const party = await this.partyRepository.findOne({ where: { id } });
    if (!party) {
      fs.unlinkSync(path.join('./uploads', name));
      throw new HttpException(
        'Вечеринки с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.filesRepository.save({
      fileName: name,
      party,
    });
  }
}
