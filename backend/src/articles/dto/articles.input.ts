import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ArticlesInput {
  @Field(() => Boolean)
  archived: boolean;
}
