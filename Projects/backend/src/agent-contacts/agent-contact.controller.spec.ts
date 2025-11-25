/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AgentContactController } from './agent-contact.controller';
import { AgentContactService } from './agent-contact.service';
import { CreateAgentContactDto } from './dto/create-agent-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AgentContactController', () => {
  let controller: AgentContactController;
  let service: AgentContactService;

  const mockAgentContactService = {
    createContact: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = { id: 42 }; // mock logged-in user
      return true;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentContactController],
      providers: [
        { provide: AgentContactService, useValue: mockAgentContactService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<AgentContactController>(AgentContactController);
    service = module.get<AgentContactService>(AgentContactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createContact', () => {
    it('should call AgentContactService.createContact with correct parameters', async () => {
      const dto: CreateAgentContactDto = {
        //user_id will be taken from auth
        target_type: 'property',
        target_id: 123,
      };
      const mockResult = {
        id: 1,
        target_type: dto.target_type,
        target_id: dto.target_id,
        user: { id: 42 },
        contact_date: new Date(),
      };

      mockAgentContactService.createContact.mockResolvedValue(mockResult);

      const result = await controller.createContact(dto, { user: { id: 42 } });

      expect(service.createContact).toHaveBeenCalledWith(dto, 42);
      expect(result).toEqual(mockResult);
    });
  });
});
