import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Number, { name: 'id' })
  _id: number;

  @Field()
  firstName: string;
}
