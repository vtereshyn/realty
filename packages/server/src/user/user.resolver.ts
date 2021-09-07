import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/auth.guard';

import { UserService } from './user.service';
import { User, PaginatedUsers } from './user.object';
import {
  UserDeleteInput,
  UsersQueryInput,
  UserUpdateInput
} from './user.input';

import { UserRole } from '../common/enums';
import { CurrentUser } from '../common/decorators';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  public me(@CurrentUser() currentUser: User) {
    return this.userService.getOne(currentUser.id);
  }

  @Query(() => PaginatedUsers)
  public usersByQuery(
    @CurrentUser() currentUser: User,
    @Args('input')
    input: UsersQueryInput
  ) {
    return this.userService.getByQuery(input, currentUser);
  }

  @Mutation(() => User)
  public async updateUser(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args({ name: 'role', type: () => UserRole }) role: UserRole,
    @Args('input') input: UserUpdateInput
  ) {
    await this.userService.update(id, role, input, user);
    return this.userService.getOne(id);
  }

  @Mutation(() => Boolean)
  public async deleteUser(
    @CurrentUser() user: User,
    @Args('input') input: UserDeleteInput
  ) {
    await this.userService.delete(input, user);
    return true;
  }
}
