import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthenticateInput {
  @Field(() => String)
  initDataRaw: string;
}
