import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PartyService } from './party.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { JwtAuthGuard, RequestGuarded } from '../auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/parties')
@UseGuards(JwtAuthGuard)
@ApiTags('Parties')
export class PartyController {
  constructor(private partyService: PartyService) {}
  @Get('/')
  getAll(@Req() req: RequestGuarded) {
    return this.partyService.getAllParties(req);
  }

  @Get('/:id')
  getOne(@Req() req: RequestGuarded, @Param('id') id: string) {
    return this.partyService.getOneById(req, Number(id));
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create a new party' })
  @ApiBody({ type: CreatePartyDto })
  @ApiResponse({ status: 201, description: 'Party created successfully' })
  create(@Req() req: RequestGuarded, @Body() partyDto: CreatePartyDto) {
    return this.partyService.createParty(req, partyDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a party' })
  @ApiBody({ type: CreatePartyDto })
  update(
    @Req() req: RequestGuarded,
    @Param('id') id: string,
    @Body() partyDto: CreatePartyDto,
  ) {
    return this.partyService.update(req, Number(id), partyDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a party' })
  delete(@Req() req: RequestGuarded, @Param('id') id: number) {
    return this.partyService.delete(req, id);
  }
}
