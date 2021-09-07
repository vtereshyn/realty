import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApartmentService } from './apartment.service';
import { ApartmentResolver } from './apartment.resolver';

import {
  UserEntity,
  ClientEntity,
  RealtorEntity,
  ApartmentEntity
} from '../database/entities';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      UserEntity,
      RealtorEntity,
      ClientEntity,
      ApartmentEntity
    ])
  ],
  providers: [ApartmentResolver, ApartmentService, UserService]
})
export class ApartmentModule {}
