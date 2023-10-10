import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ArchiveArticleInput {

  @Field(() => String)
  id: string;
}
