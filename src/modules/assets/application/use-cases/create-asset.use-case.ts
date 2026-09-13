import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import { AssetEntity } from '../../domain/entities/asset.entity.js';
import {
  ASSET_REPOSITORY_TOKEN,
  type IAssetRepository,
} from '../../domain/repositories/asset.repository.interface.js';
import { CreateAssetInput } from '../dtos/create-asset.dto.js';
import { AssetResponseDto, AssetResponseMapper } from '../dtos/asset-response.dto.js';

@Injectable()
export class CreateAssetUseCase implements IUseCase<CreateAssetInput, AssetResponseDto> {
  constructor(
    @Inject(ASSET_REPOSITORY_TOKEN)
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(input: CreateAssetInput): Promise<AssetResponseDto> {
    const asset = AssetEntity.create({
      name: input.name,
      type: input.type,
      acquisitionValue: input.acquisitionValue,
      description: input.description,
    });

    const savedAsset = await this.assetRepository.save(asset);
    return AssetResponseMapper.fromDomain(savedAsset);
  }
}
