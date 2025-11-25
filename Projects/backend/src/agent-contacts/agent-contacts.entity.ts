import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

import { User } from '../users/users.entity';

@Entity('agent_contacts')
@Index(['user'])
@Index(['target_type', 'target_id'])
export class AgentContact {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 50 })
  target_type: 'property' | 'project' | 'land';

  @Column({ type: 'int' })
  target_id: number;

  @CreateDateColumn()
  contact_date: Date;
}
