import { validate } from 'class-validator';
import { CreateAgentContactDto } from './create-agent-contact.dto';

describe('CreateAgentContactDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = new CreateAgentContactDto();
    dto.target_type = 'property';
    dto.target_id = 123;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if target_type is invalid', async () => {
    const dto = new CreateAgentContactDto();
    // @ts-expect-error testing invalid value
    dto.target_type = 'invalid';
    dto.target_id = 123;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should fail if target_id is not an integer', async () => {
    const dto = new CreateAgentContactDto();
    dto.target_type = 'project';
    // @ts-expect-error testing invalid type
    dto.target_id = 'abc';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });
});
