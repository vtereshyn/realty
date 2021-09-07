import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import * as path from 'path';
import * as env from 'env-var';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve('../server', '.env') });

export const config = {
  redis: {
    host: env.get('REDIS_HOST').default('localhost').asString(),
    port: env.get('REDIS_PORT').default('6379').asIntPositive(),
    password: env.get('REDIS_PASSWORD').asString(),
    showFriendlyErrorStack: true,
    retryStrategy: (times: number) => {
      const maxWaitMs = env
        .get('REDIS_RETRY_CONN_WAIT_MS')
        .default('2500')
        .asIntPositive();
      const delay = Math.min(times * 50, maxWaitMs);

      return delay || maxWaitMs;
    }
  },

  postgres: (
    options: Partial<PostgresConnectionOptions>
  ): PostgresConnectionOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: env.get('DB_USERNAME').default('postgres').asString(),
    password: env.get('DB_PASSWORD').default('db_password').asString(),
    database: 'rentals',
    logging: ['schema', 'error', 'warn', 'migration'],
    dropSchema: false,
    synchronize: false,
    uuidExtension: 'pgcrypto',
    cache: {
      type: 'redis',
      options: config.redis
    },
    entityPrefix: '',
    entities: ['dist/**/entities/**/*.js'],
    migrations: ['dist/**/migrations/**/*.js'],
    subscribers: ['dist/**/subscribers/**/*.js'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscribers'
    },
    ...options
  }),

  jwt: {
    secret: env.get('JWT_SECRET').required().asString()
  },

  unsplash: {
    accessKey: env.get('UNSPLASH_ACCESS_KEY').required().asString()
  }
};
