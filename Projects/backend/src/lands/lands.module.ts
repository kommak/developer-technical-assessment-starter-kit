import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandsService } from './lands.service';
import { LandsController } from './lands.controller';
import { Land } from './lands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Land])],
  providers: [LandsService],
  controllers: [LandsController],
})
export class LandsModule {}
