import { Category } from 'src/modules/categories/category.schema';

export default class ArticleCreateDto {
  title: string;
  content: string;
  categories?: Category[];
}
