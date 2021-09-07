import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { config } from '../config';

import { SeederService } from './seeder.service';

const db = config.postgres({});

@Module({
  imports: [TypeOrmModule.forRoot(db), AuthModule],
  providers: [SeederService]
})
export class SeederModule {}
