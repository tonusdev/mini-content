import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExampleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
