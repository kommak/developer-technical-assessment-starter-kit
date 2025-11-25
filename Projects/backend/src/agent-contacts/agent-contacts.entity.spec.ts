import { AgentContact } from './agent-contacts.entity';
import { User } from '../users/users.entity';

describe('AgentContact Entity', () => {
  let agentContact: AgentContact;
  let mockUser: User;

  beforeEach(() => {
    mockUser = {
      id: 1,
      email: 'komai@example.com',
      first_name: 'Komai',
      last_name: 'Makarem',
      created_at: new Date(),
      updated_at: new Date(),
    } as User;

    agentContact = new AgentContact();
    agentContact.id = 1;
    agentContact.user = mockUser;
    agentContact.target_type = 'property';
    agentContact.target_id = 101;
    agentContact.contact_date = new Date('2025-11-25T10:00:00Z');
  });

  it('should create an AgentContact instance', () => {
    expect(agentContact).toBeDefined();
    expect(agentContact).toBeInstanceOf(AgentContact);
  });

  it('should have correct user', () => {
    expect(agentContact.user).toEqual(mockUser);
    expect(agentContact.user.id).toBe(1);
  });

  it('should have correct target_type and target_id', () => {
    expect(agentContact.target_type).toBe('property');
    expect(agentContact.target_id).toBe(101);
  });

  it('should have a contact_date', () => {
    expect(agentContact.contact_date).toBeInstanceOf(Date);
    expect(agentContact.contact_date.toISOString()).toBe(
      '2025-11-25T10:00:00.000Z',
    );
  });
});
