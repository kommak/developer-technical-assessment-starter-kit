import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentContact } from './agent-contacts.entity';
import { CreateAgentContactDto } from './dto/create-agent-contact.dto';

@Injectable()
export class AgentContactService {
  constructor(
    @InjectRepository(AgentContact)
    private readonly agentContactRepo: Repository<AgentContact>,
  ) {}

  async createContact(
    dto: CreateAgentContactDto,
    userId: number,
  ): Promise<AgentContact> {
    try {
      const contact = this.agentContactRepo.create({
        target_type: dto.target_type,
        target_id: dto.target_id,
        user: { id: userId },
      });

      return await this.agentContactRepo.save(contact);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message + userId);
      }
      throw new BadRequestException('Failed to create agent contact');
    }
  }
}
