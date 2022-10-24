import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Article } from './../articles/article.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  name: string;

  @Prop({
    type: SchemaTypes.String,
    required: false,
    default: '',
  })
  description: string;

  @Prop({
    type: SchemaTypes.String,
    slug: 'name',
    unique: true,
  })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
