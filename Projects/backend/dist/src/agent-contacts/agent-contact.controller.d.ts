import { AgentContactService } from './agent-contact.service';
import { CreateAgentContactDto } from './dto/create-agent-contact.dto';
export declare class AgentContactController {
    private readonly agentContactService;
    constructor(agentContactService: AgentContactService);
    createContact(dto: CreateAgentContactDto, req: any): Promise<any>;
}
