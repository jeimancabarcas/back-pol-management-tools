import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { databaseConfig, typeOrmAsyncConfig } from './config/database.config.js';
import { AssetsModule } from './modules/assets/assets.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AssetsModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'back-pol-management-tools',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


