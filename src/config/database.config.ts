import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pol_management_db',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  ssl:
    process.env.DB_SSL === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
  autoLoadEntities: true,
}));

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: configService.get<string>('database.host', 'localhost'),
      port: configService.get<number>('database.port', 5432),
      username: configService.get<string>('database.username', 'postgres'),
      password: configService.get<string>('database.password', 'postgres'),
      database: configService.get<string>('database.database', 'pol_management_db'),
      synchronize: configService.get<boolean>('database.synchronize', true),
      logging: configService.get<boolean>('database.logging', true),
      ssl: configService.get('database.ssl', false),
      autoLoadEntities: true,
    };
  },
};
