import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Party } from './party.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePartyDto } from './dto/create-party.dto';
import { RequestGuarded } from '../auth/jwt-auth.guard';
import { User } from '../users/user.entity';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getAllParties(req: RequestGuarded): Promise<Party[]> {
    return (
      await this.userRepository.findOne({
        where: { id: req.user.id },
        relations: { parties: true },
      })
    ).parties;
  }
  async getOneById(req, id: number): Promise<Party> {
    return await this.partyRepository.findOne({
      where: { id, userId: req.user.id },
      relations: { files: true },
    });
  }

  async createParty(req, party: CreatePartyDto): Promise<Party> {
    return await this.partyRepository.save({
      title: party.title,
      description: party.description,
      date: party.date,
      img: party.img,
      address: party.address,
      files: party.files,
      userId: req.user.id,
    });
  }

  async update(req, id: number, party: CreatePartyDto): Promise<Party> {
    return await this.partyRepository.save({
      id,
      title: party.title,
      description: party.description,
      date: party.date,
      img: party.img,
      address: party.address,
      files: party.files,
    });
  }

  async delete(req, id: number): Promise<DeleteResult> {
    return await this.partyRepository.delete({
      id: id,
    });
  }
}
