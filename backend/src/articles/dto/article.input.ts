import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ArticleInput {
  @Field(() => String)
  id: string;

  @Field(() => Boolean, { nullable: true })
  view: boolean
}
