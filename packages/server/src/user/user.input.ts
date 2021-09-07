import { Field, InputType } from '@nestjs/graphql';
import { Order, UserRole } from '../common/enums';
import { OrderArgs, PaginationArgs } from '../common/graphql';

@InputType()
export class UserCreateInput {
  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;

  @Field()
  public email!: string;

  @Field()
  public password!: string;
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  public firstName?: string;

  @Field({ nullable: true })
  public lastName?: string;

  @Field({ nullable: true })
  public email?: string;

  @Field({ nullable: true })
  public password?: string;
}

@InputType()
export class UsersQueryInput {
  @Field(() => UserRole)
  public role!: UserRole;

  @Field(() => OrderArgs, {
    defaultValue: { field: 'updatedAt', direction: Order.Desc }
  })
  public order!: OrderArgs;

  @Field(() => PaginationArgs, { nullable: true, defaultValue: { take: 10 } })
  public pagination!: PaginationArgs;
}

@InputType()
export class UserDeleteInput {
  @Field()
  public id!: string;

  @Field(() => UserRole)
  public role!: UserRole;

  @Field({ nullable: true })
  public newRealtorId?: string;
}

@InputType()
export class AdminCreateInput extends UserCreateInput {}

@InputType()
export class ClientCreateInput extends UserCreateInput {}

@InputType()
export class RealtorCreateInput extends UserCreateInput {}
