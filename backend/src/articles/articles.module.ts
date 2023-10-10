import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./models/article.model";
import { ArticlesResolver } from "./articles.resolver";
import { ArticlesService } from "./articles.service";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}
