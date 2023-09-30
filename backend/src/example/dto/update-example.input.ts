import { CreateExampleInput } from './create-example.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExampleInput extends PartialType(CreateExampleInput) {
  @Field(() => Int)
  id: number;
}
