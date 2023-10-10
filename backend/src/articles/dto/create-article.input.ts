import { GraphQLJSON } from 'graphql-scalars';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  title: string;

  @Field(() => GraphQLJSON, { nullable: true })
  content?: object;

  @Field(() => GraphQLJSON, { nullable: true })
  premiumContent?: object;
}
