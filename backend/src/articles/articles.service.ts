import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ProjectionType, UpdateQuery } from "mongoose";
import { ObjectId } from "mongodb";
import { Article } from "./models/article.model";

interface CreateArticleParams {
  author: number;
  title: string;
  content?: object;
  premiumContent?: object;
}

interface UpdateArticleParams extends CreateArticleParams {
  _id: ObjectId;
}

interface ArchiveArticleParams {
  _id: ObjectId;
  author: number;
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  async createArticle(params: CreateArticleParams) {
    const article = await this.articleModel.create({
      ...params,
      views: 0,
      premiumViews: 0,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return article;
  }

  async updateArticle(params: UpdateArticleParams) {
    return await this.articleModel
      .updateOne(
        { _id: params._id, author: params.author },
        {
          title: params.title,
          content: params.content,
          premiumContent: params.premiumContent,
          updatedAt: new Date(),
        },
      )
      .lean();
  }

  async archiveArticle(params: ArchiveArticleParams) {
    return await this.articleModel
      .updateOne(
        { _id: params._id, author: params.author },
        {
          archived: true,
          updatedAt: new Date(),
        },
      )
      .lean();
  }

  async getMyArticles(author: number, archived: boolean) {
    return await this.articleModel.find({ author, archived }, {}, {sort: {_id: -1}}).lean();
  }

  async getMyArticle(author: number, _id: ObjectId) {
    return await this.articleModel.findOne({ _id, author }).lean();
  }

  async getArticle(_id: ObjectId, premium?: boolean) {
    const update: UpdateQuery<Article> = { $inc: { views: 1 } };
    let projection: ProjectionType<Article> = {};

    if (premium === true) {
      update.$inc = { premiumViews: 1 };
    } else {
      projection.premiumContent = 0;
    }

    return await this.articleModel
      .findOneAndUpdate({ _id, archived: false }, update, {
        projection,
      })
      .lean();
  }
}
