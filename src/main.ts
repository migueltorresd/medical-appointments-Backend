import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Medical-Appointments')
    .setDescription('The Medical-Appointments API description')
    .setVersion('1.0')
    .addTag('Miguel Angel Torres Diaz')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
  app.useGlobalPipes(new ValidationPipe());
  console.log(
    `🚀 Application is running on: ${await app.getUrl()} - MEDICAL-APPOINTMENTS🚀`,
  );
}
bootstrap();
