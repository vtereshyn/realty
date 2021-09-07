import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RentStatus, RoomsCount } from '../common/enums';

import { Location } from '../common/graphql';
import { Client, Realtor } from '../user/user.object';

@ObjectType()
export class Apartment {
  @Field()
  public id!: string;

  @Field()
  public name!: string;

  @Field(() => RentStatus)
  public status!: RentStatus;

  @Field()
  public description!: string;

  @Field(() => [String])
  public pictures!: string[];

  @Field()
  public size!: number;

  @Field()
  public price!: number;

  @Field(() => RoomsCount)
  public roomsCount!: RoomsCount;

  @Field(() => Location)
  public location!: Location;

  @Field(() => Realtor)
  public realtor!: Realtor;

  @Field(() => Client)
  public client!: Client;
}

@ObjectType()
export class PaginatedApartments {
  @Field(() => Int)
  public total!: number;

  @Field(() => [Apartment])
  public items!: Apartment[];
}
