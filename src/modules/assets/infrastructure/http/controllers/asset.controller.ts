import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAssetUseCase } from '../../../application/use-cases/create-asset.use-case.js';
import { GetAssetsUseCase } from '../../../application/use-cases/get-assets.use-case.js';
import { GetAssetByIdUseCase } from '../../../application/use-cases/get-asset-by-id.use-case.js';
import { CreateAssetRequestDto } from '../dtos/create-asset-request.dto.js';
import { AssetResponseDto } from '../../../application/dtos/asset-response.dto.js';

@ApiTags('Assets')
@Controller('assets')
export class AssetController {
  constructor(
    private readonly createAssetUseCase: CreateAssetUseCase,
    private readonly getAssetsUseCase: GetAssetsUseCase,
    private readonly getAssetByIdUseCase: GetAssetByIdUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar un nuevo bien',
    description: 'Crea un nuevo bien o activo en el inventario con sus datos técnicos y valor de adquisición.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El bien fue registrado exitosamente.',
    type: AssetResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos o faltantes.',
  })
  async create(@Body() createAssetDto: CreateAssetRequestDto): Promise<AssetResponseDto> {
    return this.createAssetUseCase.execute({
      name: createAssetDto.name,
      type: createAssetDto.type,
      acquisitionValue: createAssetDto.acquisitionValue,
      description: createAssetDto.description,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Consultar todos los bienes',
    description: 'Retorna la lista completa de todos los bienes registrados ordenados cronológicamente.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de bienes obtenida exitosamente.',
    type: [AssetResponseDto],
  })
  async findAll(): Promise<AssetResponseDto[]> {
    return this.getAssetsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar un bien por ID',
    description: 'Obtiene el detalle completo de un bien a partir de su identificador UUID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único UUID del bien',
    example: 'd9b2d63d-a233-4123-8478-f0923055f2d6',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle del bien encontrado.',
    type: AssetResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'El bien solicitado no existe en el sistema.',
  })
  async findById(@Param('id') id: string): Promise<AssetResponseDto> {
    return this.getAssetByIdUseCase.execute(id);
  }
}

