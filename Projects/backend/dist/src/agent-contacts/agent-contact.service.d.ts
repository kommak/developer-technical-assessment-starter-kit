import { Repository } from 'typeorm';
import { AgentContact } from './agent-contacts.entity';
import { CreateAgentContactDto } from './dto/create-agent-contact.dto';
export declare class AgentContactService {
    private readonly agentContactRepo;
    constructor(agentContactRepo: Repository<AgentContact>);
    createContact(dto: CreateAgentContactDto, userId: number): Promise<AgentContact>;
}
