import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import ArticleCreateDto from './dtos/article-create.dto';
import ArticleUpdateDto from './dtos/article-update.dto';

@Injectable()
export default class ArticleService {
  constructor(
    @InjectModel(Article.name) private readonly model: Model<ArticleDocument>,
  ) {}

  async findAll() {
    const articles = await this.model.find().exec();
    if (!articles.length) {
      throw new HttpException('No article found.', HttpStatus.NOT_FOUND);
    }
    return articles;
  }

  async findOne(id: string) {
    const article = await this.model.findOne({
      _id: id,
    });

    if (!article) {
      throw new HttpException('Article is not found.', HttpStatus.NOT_FOUND);
    }

    return article;
  }

  async create(dto: ArticleCreateDto) {
    try {
      const newArticle = new this.model(dto);

      return await newArticle.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, dto: ArticleUpdateDto) {
    const articleObjectId = new Types.ObjectId(id);
    try {
      await this.model.updateOne(
        {
          _id: articleObjectId,
        },
        {
          $set: dto,
        },
      );
      const updatedArticle = await this.model
        .findOne({
          _id: articleObjectId,
        })
        .exec();

      return updatedArticle;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
