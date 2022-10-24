import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ArticleModule from './modules/articles/article.module';
import CategoryModule from './modules/categories/category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ArticleModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
