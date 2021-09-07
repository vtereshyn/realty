import { Field, InputType } from '@nestjs/graphql';
import { Order, RentStatus, RoomsCount } from '../common/enums';
import { LocationInput, OrderArgs, PaginationArgs } from '../common/graphql';

@InputType()
export class ApartmentCreateInput {
  @Field()
  public name!: string;

  @Field()
  public description!: string;

  @Field({ defaultValue: RentStatus.available })
  public status!: RentStatus;

  @Field()
  public size!: number;

  @Field(() => [String], { defaultValue: [] })
  public pictures!: string[];

  @Field()
  public price!: number;

  @Field(() => RoomsCount)
  public roomsCount!: RoomsCount;

  @Field(() => LocationInput)
  public location!: LocationInput;

  @Field()
  public realtorId!: string;
}

@InputType()
export class ApartmentUpdateInput {
  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public status?: RentStatus;

  @Field({ nullable: true })
  public size?: number;

  @Field(() => [String])
  public pictures?: string[];

  @Field({ nullable: true })
  public price?: number;

  @Field(() => RoomsCount, { nullable: true })
  public roomsCount?: RoomsCount;

  @Field(() => LocationInput, { nullable: true })
  public location?: LocationInput;

  @Field({ nullable: true })
  public realtorId?: string;
}

@InputType()
export class ApartmentQueryInput {
  @Field({ nullable: true })
  public id?: string;

  @Field({ nullable: true })
  public size?: number;

  @Field({ nullable: true })
  public status?: RentStatus;

  @Field({ nullable: true })
  public price?: number;

  @Field(() => [RoomsCount], { nullable: true })
  public roomsCount?: RoomsCount[];

  @Field({ nullable: true })
  public realtorId?: string;

  @Field(() => PaginationArgs, { nullable: true, defaultValue: { take: 10 } })
  public pagination?: PaginationArgs;

  @Field(() => OrderArgs, {
    defaultValue: { field: 'updatedAt', direction: Order.Desc }
  })
  public order!: OrderArgs;
}
