import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Example {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
