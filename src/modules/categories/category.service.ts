import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import CategoryCreateDto from './dtos/category-create.dto';

@Injectable()
export default class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<CategoryDocument>,
  ) {}

  async findAll() {
    const categories = await this.model.find();
    if (!categories.length) {
      throw new HttpException('No category found.', HttpStatus.NOT_FOUND);
    }
    return categories;
  }

  async create(dto: CategoryCreateDto) {
    try {
      const newCategory = new this.model(dto);
      return await newCategory.save();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
