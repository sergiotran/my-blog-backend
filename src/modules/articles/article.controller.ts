import { Body, Controller, Get, Post } from '@nestjs/common';
import ArticleService from './article.service';
import ArticleCreateDto from './dtos/article-create.dto';

@Controller('article')
export default class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get('list')
  async findAll() {
    return await this.service.findAll();
  }

  @Post('create')
  async create(@Body() dto: ArticleCreateDto) {
    return await this.service.create(dto);
  }
}
