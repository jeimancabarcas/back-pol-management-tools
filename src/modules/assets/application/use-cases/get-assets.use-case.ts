import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  ASSET_REPOSITORY_TOKEN,
  type IAssetRepository,
} from '../../domain/repositories/asset.repository.interface.js';
import { AssetResponseDto, AssetResponseMapper } from '../dtos/asset-response.dto.js';

@Injectable()
export class GetAssetsUseCase implements IUseCase<void, AssetResponseDto[]> {
  constructor(
    @Inject(ASSET_REPOSITORY_TOKEN)
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(): Promise<AssetResponseDto[]> {
    const assets = await this.assetRepository.findAll();
    return assets.map(AssetResponseMapper.fromDomain);
  }
}
