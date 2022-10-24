import { Body, Controller, Get, Post } from '@nestjs/common';
import CategoryService from './category.service';
import CategoryCreateDto from './dtos/category-create.dto';

@Controller('category')
export default class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('list')
  async findAll() {
    return await this.service.findAll();
  }

  @Post('create')
  async create(@Body() dto: CategoryCreateDto) {
    console.log('dto', dto);
    return await this.service.create(dto);
  }
}
