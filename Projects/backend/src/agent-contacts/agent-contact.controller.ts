/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AgentContactService } from './agent-contact.service';
import { CreateAgentContactDto } from './dto/create-agent-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('agent-contact')
export class AgentContactController {
  constructor(private readonly agentContactService: AgentContactService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createContact(@Body() dto: CreateAgentContactDto, @Req() req) {
    const userId: number = req.user.id;
    return this.agentContactService.createContact(dto, userId);
  }
}
