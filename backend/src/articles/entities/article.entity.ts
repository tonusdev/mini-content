import { GraphQLJSON } from 'graphql-scalars';
import { ObjectType, Field } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class Article {
  @Field(() => String, { name: 'id' })
  _id: Schema.Types.ObjectId;

  @Field()
  title: string;

  @Field(() => GraphQLJSON, {nullable: true})
  content: object;

  @Field(() => GraphQLJSON, {nullable: true})
  premiumContent: object;

  @Field()
  views: number;

  @Field()
  premiumViews: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
