import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/user.repository.interface.js';
import { UserOrmEntity } from './infrastructure/persistence/entities/user.orm-entity.js';
import { UserTypeOrmRepository } from './infrastructure/persistence/repositories/user.typeorm.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [USER_REPOSITORY_TOKEN],
})
export class UsersModule {}
