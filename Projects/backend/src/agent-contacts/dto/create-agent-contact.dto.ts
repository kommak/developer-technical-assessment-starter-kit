/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsIn } from 'class-validator';

export class CreateAgentContactDto {
  @IsIn(['property', 'project', 'land'])
  target_type: 'property' | 'project' | 'land';

  @IsInt()
  target_id: number;
}
