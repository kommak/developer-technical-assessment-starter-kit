import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LandsService } from './lands.service';
import { Land } from './lands.entity';

@Controller('land')
export class LandsController {
  constructor(private readonly landsService: LandsService) {}

  @Get()
  findAll(): Promise<Land[]> {
    return this.landsService.findAll();
  }

  @Get('top-viewed')
  getTopViewed(): Promise<Land[]> {
    return this.landsService.findTopViewed(6);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Land | null> {
    return this.landsService.findOne(id);
  }

  @Post()
  create(@Body() land: Partial<Land>): Promise<Land> {
    return this.landsService.create(land);
  }
}
