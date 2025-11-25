import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentContactService } from './agent-contact.service';
import { AgentContactController } from './agent-contact.controller';
import { AgentContact } from './agent-contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgentContact])],
  providers: [AgentContactService],
  controllers: [AgentContactController],
})
export class AgentContactModule {}
