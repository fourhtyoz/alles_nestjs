import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Query('age') age: number, @Query('breed') breed: string): string {
    if (!age && !breed) {
      return 'This action returns all cats';
    }
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }

  @Get(':id')
  findOne(@Param() params: { id: number }): string {
    console.log(params);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    const { name, age, breed } = createCatDto;
    console.log(name, age, breed);
    return 'This action creates a new cat';
  }
}
