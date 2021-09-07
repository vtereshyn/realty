import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { Client, Realtor, User } from '../user/user.object';

import { Apartment, PaginatedApartments } from './apartment.object';
import { ApartmentService } from './apartment.service';
import {
  ApartmentCreateInput,
  ApartmentQueryInput,
  ApartmentUpdateInput
} from './apartment.input';

import { GqlAuthGuard } from '../auth/auth.guard';

import { CurrentUser } from '../common/decorators';
import { ApartmentEntity } from '../database/entities';

@Resolver(() => Apartment)
@UseGuards(GqlAuthGuard)
export class ApartmentResolver {
  constructor(
    private readonly userService: UserService,
    private readonly apartmentService: ApartmentService
  ) {}

  @Query(() => Apartment)
  public apartment(@Args('id') id: string) {
    return this.apartmentService.getOne(id);
  }

  @Query(() => PaginatedApartments)
  public apartmentsByQuery(
    @CurrentUser() user: User,
    @Args('input') input: ApartmentQueryInput
  ) {
    return this.apartmentService.getByQuery(input, {
      id: user.id,
      role: user.role
    });
  }

  @Mutation(() => Apartment)
  public createApartment(
    @CurrentUser() user: User,
    @Args('input') input: ApartmentCreateInput
  ) {
    return this.apartmentService.create(input, user);
  }

  @Mutation(() => Boolean)
  public async updateApartment(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('input') input: ApartmentUpdateInput
  ) {
    await this.apartmentService.update(id, input, user);
    return true;
  }

  @Mutation(() => Boolean)
  public async deleteApartment(
    @CurrentUser() user: User,
    @Args('id') id: string
  ) {
    await this.apartmentService.delete(id, user);
    return true;
  }

  @ResolveField(() => Realtor)
  public realtor(@Parent() { realtorId }: ApartmentEntity) {
    return this.userService.getOne(realtorId);
  }

  @ResolveField(() => Client)
  public client(@Parent() { clientId }: ApartmentEntity) {
    if (!clientId) {
      return null;
    }

    return this.userService.getOne(clientId);
  }
}
