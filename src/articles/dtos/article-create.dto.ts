import { Category } from 'src/categories/category.schema';

export default class ArticleCreateDto {
  title: string;
  content: string;
  categories?: Category[];
}
