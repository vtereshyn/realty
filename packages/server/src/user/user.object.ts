import { Field, ObjectType } from '@nestjs/graphql';
import { Apartment } from '../apartment/apartment.object';

import { UserRole } from '../common/enums';

@ObjectType()
export class User {
  @Field()
  public id!: string;

  @Field(() => UserRole)
  public role!: UserRole;

  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;

  @Field()
  public email!: string;

  @Field()
  public password!: string;

  @Field()
  public updatedAt!: Date;

  @Field()
  public createdAt!: Date;
}

@ObjectType()
export class PaginatedUsers {
  @Field()
  public total!: number;

  @Field(() => [User])
  public items!: User[];
}

@ObjectType()
export class Client extends User {
  @Field(() => Apartment)
  public apartment!: Apartment;
}

@ObjectType()
export class Realtor extends User {
  @Field(() => [Apartment])
  public apartments!: Apartment;
}
