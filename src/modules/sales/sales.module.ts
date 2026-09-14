import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from '../assets/assets.module.js';
import { AssetOrmEntity } from '../assets/infrastructure/persistence/entities/asset.orm-entity.js';
import { SALE_REPOSITORY_TOKEN } from './domain/repositories/sale.repository.interface.js';
import { CreateSaleUseCase } from './application/use-cases/create-sale.use-case.js';
import { GetSalesUseCase } from './application/use-cases/get-sales.use-case.js';
import { GetSaleByIdUseCase } from './application/use-cases/get-sale-by-id.use-case.js';
import { SaleOrmEntity } from './infrastructure/persistence/entities/sale.orm-entity.js';
import { SaleItemOrmEntity } from './infrastructure/persistence/entities/sale-item.orm-entity.js';
import { SaleTypeOrmRepository } from './infrastructure/persistence/repositories/sale.typeorm.repository.js';
import { SaleController } from './infrastructure/http/controllers/sale.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleOrmEntity, SaleItemOrmEntity, AssetOrmEntity]),
    AssetsModule,
  ],
  controllers: [SaleController],
  providers: [
    CreateSaleUseCase,
    GetSalesUseCase,
    GetSaleByIdUseCase,
    {
      provide: SALE_REPOSITORY_TOKEN,
      useClass: SaleTypeOrmRepository,
    },
  ],
  exports: [CreateSaleUseCase, GetSalesUseCase, GetSaleByIdUseCase],
})
export class SalesModule {}
