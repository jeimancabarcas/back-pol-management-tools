import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const apiPrefix = process.env.API_PREFIX || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors();

  // Swagger Documentation Setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('POL Management Tools API')
    .setDescription('API REST para la gestión de herramientas, bienes y activos empresariales.')
    .addTag('Auth', 'Autenticación de usuarios, registro y OAuth 2.0 con JWT')
    .addTag('Assets', 'Gestión, consulta y registro de bienes')
    .addTag('Sales', 'Gestión, historial y registro de venta de bienes')
    .addTag('Dashboard', 'Métricas consolidadas de inventario y ventas')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingrese su token JWT (formato Bearer <token>)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
  console.log(`📚 Swagger Documentation is available at: http://localhost:${port}/docs`);
}
await bootstrap();


