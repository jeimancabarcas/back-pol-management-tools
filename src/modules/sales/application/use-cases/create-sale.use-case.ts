import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  ASSET_REPOSITORY_TOKEN,
  type IAssetRepository,
} from '../../../assets/domain/repositories/asset.repository.interface.js';
import { SaleEntity, SaleItemEntity } from '../../domain/entities/sale.entity.js';
import {
  SALE_REPOSITORY_TOKEN,
  type ISaleRepository,
} from '../../domain/repositories/sale.repository.interface.js';
import { CreateSaleInput } from '../dtos/create-sale.dto.js';
import { SaleResponseDto, SaleResponseMapper } from '../dtos/sale-response.dto.js';

@Injectable()
export class CreateSaleUseCase implements IUseCase<CreateSaleInput, SaleResponseDto> {
  constructor(
    @Inject(SALE_REPOSITORY_TOKEN)
    private readonly saleRepository: ISaleRepository,
    @Inject(ASSET_REPOSITORY_TOKEN)
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(input: CreateSaleInput): Promise<SaleResponseDto> {
    if (!input.items || input.items.length === 0) {
      throw new BadRequestException('Debe incluir al menos un bien para procesar la venta.');
    }

    // Verificar que no haya IDs de bienes duplicados en la misma petición
    const assetIds = input.items.map((item) => item.assetId);
    const uniqueAssetIds = new Set(assetIds);
    if (uniqueAssetIds.size !== assetIds.length) {
      throw new BadRequestException('No se puede incluir el mismo bien más de una vez en la misma venta.');
    }

    // Validar existencia de cada bien en el inventario y recopilar información
    const saleItems: SaleItemEntity[] = [];
    for (const itemInput of input.items) {
      const asset = await this.assetRepository.findById(itemInput.assetId);
      if (!asset) {
        throw new NotFoundException(
          `El bien con ID "${itemInput.assetId}" no existe en el inventario o ya fue retirado/vendido.`,
        );
      }

      saleItems.push(
        new SaleItemEntity({
          assetId: asset.id,
          assetName: asset.name,
          salePrice: itemInput.salePrice,
        }),
      );
    }

    // Construir la entidad de dominio de la venta
    const sale = SaleEntity.create({
      buyerName: input.buyerName,
      buyerDocument: input.buyerDocument,
      saleDate: new Date(input.saleDate),
      saleReason: input.saleReason,
      items: saleItems,
    });

    // Guardar la venta y eliminar atómicamente los bienes del inventario activo
    const savedSale = await this.saleRepository.saveSaleAndRemoveAssets(sale, assetIds);

    return SaleResponseMapper.fromDomain(savedSale);
  }
}
