import { IsOptional, Max, Min } from 'class-validator';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/user.object';
import { Order } from '../enums';

@InputType()
export class CoordinatesInput {
  @Field()
  public lat!: number;

  @Field()
  public lng!: number;
}

@ObjectType()
export class Coordinates {
  @Field()
  public lat!: number;

  @Field()
  public lng!: number;
}

@InputType()
export class LocationInput {
  @Field()
  public address!: string;

  @Field(() => CoordinatesInput)
  public coordinates!: CoordinatesInput;
}

@ObjectType()
export class Location {
  @Field()
  public address!: string;

  @Field(() => Coordinates)
  public coordinates!: Coordinates;
}

@ObjectType()
export class UserToken {
  @Field()
  public token!: string;
}

@ObjectType()
export class UserWithToken extends UserToken {
  @Field(() => User)
  public user!: User;
}

@InputType()
export class PaginationArgs {
  @IsOptional()
  @Min(0)
  @Field(() => Int, { defaultValue: 0 })
  public skip!: number;

  @IsOptional()
  @Min(0)
  @Max(100)
  @Field(() => Int, { defaultValue: 10 })
  public take!: number;
}

@InputType()
export class OrderArgs {
  @Field({ defaultValue: 'updatedAt' })
  public field!: string;

  @Field(() => Order, { defaultValue: Order.Desc })
  public direction!: Order;
}
