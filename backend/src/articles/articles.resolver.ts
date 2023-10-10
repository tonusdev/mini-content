import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";
import { ObjectId } from "mongodb";
import { UseGuards } from "@nestjs/common";
import { AppConfig } from "../app.config";
import { ArchiveArticleInput } from "./dto/archive-article.input";
import { Article } from "./entities/article.entity";
import { ArticleInput } from "./dto/article.input";
import { ArticlesInput } from "./dto/articles.input";
import { ArticlesService } from "./articles.service";
import { CreateArticleInput } from "./dto/create-article.input";
import { InjectJwtSubject } from "../auth/auth.decorators";
import { JwtAuthGuard } from "../auth/auth.guard";
import { JwtSubject } from "../auth/strategies/jwt.strategy";
import { UpdateArticleInput } from "./dto/update-article.input";

@Resolver()
export class ArticlesResolver {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async createArticle(
    @Args("input") input: CreateArticleInput,
    @InjectJwtSubject() user: JwtSubject,
  ) {
    return await this.articlesService.createArticle({
      content: input.content,
      premiumContent: input.premiumContent,
      title: input.title,
      author: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateArticle(
    @Args("input") input: UpdateArticleInput,
    @InjectJwtSubject() user: JwtSubject,
  ) {
   await this.articlesService.updateArticle({
      _id: new ObjectId(input.id),
      title: input.title,
      content: input.content,
      premiumContent: input.premiumContent,
      author: user.id,
    });
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async archiveArticle(
    @Args("input") input: ArchiveArticleInput,
    @InjectJwtSubject() user: JwtSubject,
  ) {
    await this.articlesService.archiveArticle({
      _id: new ObjectId(input.id),
      author: user.id,
    });
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Article], { name: "articles" })
  async getArticles(
    @Args("input") input: ArticlesInput,
    @InjectJwtSubject() user: JwtSubject,
  ) {
    return await this.articlesService.getMyArticles(user.id, input.archived);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Article, { name: "article", nullable: true })
  async getArticle(
    @Args("input") input: ArticleInput,
    @InjectJwtSubject() user: JwtSubject,
  ) {
    if (input.view === true) {
      let isPremium = user.is_premium ?? false;

      if (
        this.configService.get<AppConfig["NODE_ENV"]>("NODE_ENV") ===
        "development"
      ) {
        isPremium = true;
      }

      return await this.articlesService.getArticle(
        new ObjectId(input.id),
        isPremium,
      );
    }

    return await this.articlesService.getMyArticle(
      user.id,
     new ObjectId(input.id),
    );
  }
}
