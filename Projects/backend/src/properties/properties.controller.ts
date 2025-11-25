import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Property } from './properties.entity';

@Controller('property')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  findAll(): Promise<Property[]> {
    return this.propertiesService.findAll();
  }

  @Get('top-viewed')
  getTopViewed(): Promise<Property[]> {
    return this.propertiesService.findTopViewed(6);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Property | null> {
    return this.propertiesService.findOne(id);
  }

  @Post()
  create(@Body() property: Partial<Property>): Promise<Property> {
    return this.propertiesService.create(property);
  }
}
