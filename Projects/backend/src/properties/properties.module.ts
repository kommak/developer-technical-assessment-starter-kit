import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Property } from './properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
