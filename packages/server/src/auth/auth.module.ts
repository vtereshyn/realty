import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import {
  AdminEntity,
  ClientEntity,
  RealtorEntity,
  UserEntity
} from '../database/entities';

import { config } from '../config';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: {
        expiresIn: '1h'
      }
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      AdminEntity,
      RealtorEntity,
      ClientEntity
    ])
  ],
  providers: [AuthService, AuthResolver, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
