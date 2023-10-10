import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import mongooseLong from "mongoose-long";

mongooseLong(mongoose);

export type ArticleDocument = mongoose.HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Object })
  content?: object;

  @Prop({ type: Object })
  premiumContent?: object;

  @Prop({ type: mongoose.Types.Long, required: true })
  author: number;

  @Prop({ type: Number })
  views: number;

  @Prop({ type: Number })
  premiumViews: number;

  @Prop({ type: Boolean, required: true, index: true })
  archived: boolean;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
