import { NestFactory } from '@nestjs/core';

import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);

  try {
    await seeder.seed();
    console.log('Seeding complete!');
  } catch {
    console.error('Seeding failed');
  }

  app.close();
}

bootstrap();
