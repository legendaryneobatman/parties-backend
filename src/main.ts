import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Parties')
    .setDescription('The parties API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const POPT = '9876';

  await app.listen(9876, async () => {
    console.log(`Application running at http://localhost:${POPT}`);
    console.log(`Application docs at http://localhost:${POPT}/docs`);
  });
}
bootstrap();
