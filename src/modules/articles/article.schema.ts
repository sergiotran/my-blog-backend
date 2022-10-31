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
      index: {
        unique: false,
      },
    },
  ])
  categories: Category[];

  @Prop({
    type: SchemaTypes.String,
    unique: true,
    slug: 'title',
  })
  slug: string;

  @Prop({
    type: SchemaTypes.Date,
    default: new Date(),
  })
  created_at: Date;

  @Prop({
    type: SchemaTypes.Date,
  })
  updated_at: Date;

  @Prop({
    type: SchemaTypes.Date,
  })
  deleted_at: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
