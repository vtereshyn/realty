import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginInput } from './auth.input';
import {
  UserEntity,
  AdminEntity,
  ClientEntity,
  RealtorEntity
} from '../database/entities';

import { UserRole } from '../common/enums';
import { baseCreate } from '../common/crud';
import { AuthHelper } from '../common/helpers/auth.helper';
import { UserCreateInput } from '../user/user.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(RealtorEntity)
    private realtorRepository: Repository<RealtorEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private jwtService: JwtService
  ) {}

  private repositoryByRole = {
    [UserRole.client]: this.clientRepository,
    [UserRole.realtor]: this.realtorRepository,
    [UserRole.admin]: this.adminRepository
  };

  public async validateUser(userId: string) {
    return this.userRepository.findOne(userId);
  }

  public async register(input: UserCreateInput, role: UserRole) {
    const user = await this.userByEmail(input.email);

    if (user) {
      throw new Error('User with such email already exist');
    }

    const password = await AuthHelper.hash(input.password);

    const created = await baseCreate(this.repositoryByRole[role], {
      ...input,
      password,
      role
    });

    return {
      user: created,
      token: this.jwtService.sign({ id: created.id })
    };
  }

  public async login(input: LoginInput) {
    const user = await this.userByEmail(input.email);

    if (!user) {
      throw new Error(`Invalid email or password`);
    }

    const passwordValid = await AuthHelper.validate(
      input.password,
      user.password
    );

    if (!passwordValid) {
      throw new Error(`Invalid email or password`);
    }

    return {
      token: this.jwtService.sign({ id: user.id }),
      user
    };
  }

  private async userByEmail(email: string) {
    const [user] = await this.userRepository.find({ where: { email } });
    return user;
  }
}
