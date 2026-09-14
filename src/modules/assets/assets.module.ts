import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ASSET_REPOSITORY_TOKEN } from './domain/repositories/asset.repository.interface.js';
import { CreateAssetUseCase } from './application/use-cases/create-asset.use-case.js';
import { GetAssetsUseCase } from './application/use-cases/get-assets.use-case.js';
import { GetAssetByIdUseCase } from './application/use-cases/get-asset-by-id.use-case.js';
import { AssetOrmEntity } from './infrastructure/persistence/entities/asset.orm-entity.js';
import { AssetTypeOrmRepository } from './infrastructure/persistence/repositories/asset.typeorm.repository.js';
import { AssetController } from './infrastructure/http/controllers/asset.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([AssetOrmEntity])],
  controllers: [AssetController],
  providers: [
    CreateAssetUseCase,
    GetAssetsUseCase,
    GetAssetByIdUseCase,
    {
      provide: ASSET_REPOSITORY_TOKEN,
      useClass: AssetTypeOrmRepository,
    },
  ],
  exports: [
    CreateAssetUseCase,
    GetAssetsUseCase,
    GetAssetByIdUseCase,
    ASSET_REPOSITORY_TOKEN,
  ],
})
export class AssetsModule {}
