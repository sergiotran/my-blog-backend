import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Category } from '../categories/category.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  title: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  content: string;

  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: Category,
    },
  ])
  categories: Category[];

  @Prop({
    type: SchemaTypes.String,
    unique: true,
    slug: 'title',
  })
  slug: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
