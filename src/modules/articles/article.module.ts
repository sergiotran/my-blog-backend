import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Article, ArticleSchema } from './article.schema';
import ArticleController from './article.controller';
import ArticleService from './article.service';
import * as slug from 'mongoose-slug-generator';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Article.name,
        useFactory: () => {
          const schema = ArticleSchema;
          schema.plugin(slug);
          return schema;
        },
      },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export default class ArticleModule {}
