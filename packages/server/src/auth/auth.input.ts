import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
