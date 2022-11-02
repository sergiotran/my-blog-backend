import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ArticleModule from './articles/article.module';
import AuthModule from './modules/auth/auth.module';
import CategoryModule from './modules/categories/category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ArticleModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
