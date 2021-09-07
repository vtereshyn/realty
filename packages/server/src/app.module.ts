import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from './config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApartmentModule } from './apartment/apartment.module';

const db = config.postgres({});

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    GraphQLModule.forRoot({
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql'
    }),
    AuthModule,
    UserModule,
    ApartmentModule
  ]
})
export class AppModule {}
