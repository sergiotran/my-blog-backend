import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import ArticleService from './article.service';
import ArticleCreateDto from './dtos/article-create.dto';
import ArticleUpdateDto from './dtos/article-update.dto';

@Controller('article')
export default class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get('list')
  async findAll() {
    return await this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: ArticleCreateDto) {
    return await this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/update')
  async update(@Param('id') id: string, @Body() dto: ArticleUpdateDto) {
    return await this.service.update(id, dto);
  }
}
