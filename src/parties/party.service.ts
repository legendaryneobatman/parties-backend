import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Party } from './party.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePartyDto } from './dto/create-party.dto';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
  ) {}
  async getAllParties(): Promise<Party[]> {
    const parties = await this.partyRepository.find();
    if (parties.length) {
      return parties;
    }
    return [];
  }
  async getOneById(id: number): Promise<Party> {
    return await this.partyRepository.findOne({
      where: { id },
      relations: { files: true },
    });
  }

  async createParty(party: CreatePartyDto): Promise<Party> {
    return await this.partyRepository.save({
      title: party.title,
      description: party.description,
      date: party.date,
      img: party.img,
      address: party.address,
      files: party.files,
    });
  }

  async update(id: number, party: CreatePartyDto): Promise<Party> {
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

  async delete(id: number): Promise<DeleteResult> {
    return await this.partyRepository.delete({
      id: id,
    });
  }
}
