import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
  .setTitle ('API - Parking Test')
  .setDescription('API for Parking')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document,{
    explorer: true,
    swaggerOptions: {
      filters: true,
      showRequestDuration: true
    },
  });
  
  await app.listen(AppModule.port);
}
bootstrap();

