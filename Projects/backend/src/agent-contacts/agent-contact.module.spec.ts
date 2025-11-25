import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgentContactModule } from './agent-contact.module';
import { AgentContactService } from './agent-contact.service';
import { AgentContactController } from './agent-contact.controller';
import { AgentContact } from './agent-contacts.entity';

describe('AgentContactModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AgentContactModule],
    })
      .overrideProvider(getRepositoryToken(AgentContact))
      .useValue({})
      .compile();
  });

  it('should compile the AgentContactModule', () => {
    expect(module).toBeDefined();
  });

  it('should provide AgentContactService', () => {
    const service = module.get<AgentContactService>(AgentContactService);
    expect(service).toBeDefined();
  });

  it('should have AgentContactController', () => {
    const controller = module.get<AgentContactController>(
      AgentContactController,
    );
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});
