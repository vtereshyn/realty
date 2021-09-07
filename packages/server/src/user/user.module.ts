import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

import { ApartmentModule } from '../apartment/apartment.module';
import { ApartmentService } from '../apartment/apartment.service';
import { ApartmentEntity, UserEntity } from '../database/entities';

@Module({
  imports: [
    forwardRef(() => ApartmentModule),
    TypeOrmModule.forFeature([UserEntity, ApartmentEntity])
  ],
  providers: [UserResolver, UserService, ApartmentService]
})
export class UserModule {}
