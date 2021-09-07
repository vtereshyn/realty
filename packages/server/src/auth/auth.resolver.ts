import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  AdminCreateInput,
  ClientCreateInput,
  RealtorCreateInput
} from '../user/user.input';
import { User } from '../user/user.object';

import { LoginInput } from './auth.input';
import { AuthService } from './auth.service';

import { UserRole } from '../common/enums';
import { UserToken, UserWithToken } from '../common/graphql';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserToken)
  public async createClient(@Args('input') input: ClientCreateInput) {
    return this.authService.register(input, UserRole.client);
  }

  @Mutation(() => UserToken)
  public async createRealtor(@Args('input') input: RealtorCreateInput) {
    return this.authService.register(input, UserRole.realtor);
  }

  @Mutation(() => UserToken)
  public async createAdmin(@Args('input') input: AdminCreateInput) {
    return this.authService.register(input, UserRole.admin);
  }

  @Mutation(() => UserWithToken)
  public async login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }
}
