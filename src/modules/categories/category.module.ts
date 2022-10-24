import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Category, CategorySchema } from './category.schema';
import * as slug from 'mongoose-slug-generator';
import CategoryService from './category.service';
import CategoryController from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategorySchema;
          schema.plugin(slug);
          return schema;
        },
      },
    ]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export default class CategoryModule {}
