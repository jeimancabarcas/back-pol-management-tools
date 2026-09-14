import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateSaleItemRequestDto {
  @ApiProperty({
    description: 'ID (UUID) del bien que se desea vender/retirar del inventario',
    example: 'd9b2d63d-a233-4123-8478-f0923055f2d6',
  })
  @IsUUID('4', { message: 'El ID del bien debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del bien es obligatorio.' })
  assetId: string;

  @ApiProperty({
    description: 'Precio individual de venta acordado para este bien',
    example: 950.0,
    minimum: 0.01,
  })
  @IsNumber({}, { message: 'El precio de venta debe ser un número válido.' })
  @IsPositive({ message: 'El precio de venta debe ser mayor a 0.' })
  @Min(0.01, { message: 'El precio de venta debe ser mayor a 0.' })
  salePrice: number;
}

export class CreateSaleRequestDto {
  @ApiProperty({
    description: 'Nombre completo o razón social del comprador',
    example: 'Carlos Alberto Rodríguez Pérez',
    maxLength: 150,
  })
  @IsString({ message: 'El nombre del comprador debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del comprador es obligatorio.' })
  @MaxLength(150, { message: 'El nombre del comprador no puede superar los 150 caracteres.' })
  buyerName: string;

  @ApiProperty({
    description: 'Número de documento de identidad, RUT o NIT del comprador',
    example: 'CC 1098765432',
    maxLength: 50,
  })
  @IsString({ message: 'El documento del comprador debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El documento del comprador es obligatorio.' })
  @MaxLength(50, { message: 'El documento del comprador no puede superar los 50 caracteres.' })
  buyerDocument: string;

  @ApiProperty({
    description: 'Fecha en la que se realiza la venta (formato ISO 8601 o YYYY-MM-DD)',
    example: '2026-09-14',
  })
  @IsDateString({}, { message: 'La fecha de venta debe tener un formato de fecha válido (ISO 8601).' })
  @IsNotEmpty({ message: 'La fecha de la venta es obligatoria.' })
  saleDate: string;

  @ApiProperty({
    description: 'Motivo o justificación de la venta y desincorporación del inventario',
    example: 'Renovación de equipos tecnológicos por ciclo de vida',
    maxLength: 300,
  })
  @IsString({ message: 'El motivo de venta debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El motivo de venta es obligatorio.' })
  @MaxLength(300, { message: 'El motivo de venta no puede superar los 300 caracteres.' })
  saleReason: string;

  @ApiProperty({
    description: 'Lista de bienes que forman parte de la venta con sus respectivos precios',
    type: [CreateSaleItemRequestDto],
  })
  @IsArray({ message: 'La lista de bienes debe ser un arreglo.' })
  @ArrayMinSize(1, { message: 'Debe incluir al menos un bien para procesar la venta.' })
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemRequestDto)
  items: CreateSaleItemRequestDto[];
}
