/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentContactService } from './agent-contact.service';
import { AgentContact } from './agent-contacts.entity';

describe('AgentContactService', () => {
  let service: AgentContactService;
  let repo: Repository<AgentContact>;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentContactService,
        {
          provide: getRepositoryToken(AgentContact),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AgentContactService>(AgentContactService);
    repo = module.get<Repository<AgentContact>>(
      getRepositoryToken(AgentContact),
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and save agent contact request successfully', async () => {
    const dto = { target_type: 'project', target_id: 5 };
    const userId = 10;

    const createdEntity = {
      id: 1,
      target_type: dto.target_type,
      target_id: dto.target_id,
      user: { id: userId },
    };

    mockRepo.create.mockReturnValue(createdEntity);
    mockRepo.save.mockResolvedValue(createdEntity);

    const result = await service.createContact(dto as any, userId);

    expect(repo.create).toHaveBeenCalledWith({
      target_type: dto.target_type,
      target_id: dto.target_id,
      user: { id: userId },
    });

    expect(repo.save).toHaveBeenCalledWith(createdEntity);
    expect(result).toEqual(createdEntity);
  });

  it('should throw BadRequestException with error message when save fails', async () => {
    const dto = { target_type: 'project', target_id: 5 };
    const userId = 99;

    mockRepo.create.mockReturnValue({});
    mockRepo.save.mockRejectedValue(new Error('DB failed'));

    await expect(service.createContact(dto as any, userId)).rejects.toThrow(
      'DB failed' + userId,
    );
  });

  it('should throw generic BadRequestException for non-error object', async () => {
    const dto = { target_type: 'project', target_id: 5 };
    const userId = 22;

    mockRepo.create.mockReturnValue({});
    mockRepo.save.mockRejectedValue('random string');

    await expect(service.createContact(dto as any, userId)).rejects.toThrow(
      'Failed to create agent contact',
    );
  });
});
