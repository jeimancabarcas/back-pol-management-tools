import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../users/domain/entities/user.entity.js';

export class UserProfileResponseDto {
  @ApiProperty({
    description: 'Identificador único UUID del usuario',
    example: 'd9b2d63d-a233-4123-8478-f0923055f2d6',
  })
  id: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'admin@polmanagement.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Carlos',
  })
  firstName: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Rodríguez',
  })
  lastName: string;

  @ApiProperty({
    description: 'Nombre completo',
    example: 'Carlos Rodríguez',
  })
  fullName: string;

  @ApiProperty({
    description: 'Número de documento de identidad',
    example: '1098765432',
  })
  documentNumber: string;

  @ApiProperty({
    description: 'Tipo de documento de identidad',
    example: 'CC',
  })
  documentType: string;

  @ApiProperty({
    description: 'Estado activo de la cuenta',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Fecha de creación del usuario',
    example: '2026-09-14T00:00:00.000Z',
  })
  createdAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token de acceso JWT (Bearer Token)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Tipo de token según el estándar OAuth 2.0',
    example: 'Bearer',
  })
  tokenType: string;

  @ApiProperty({
    description: 'Tiempo de expiración del token',
    example: '24h',
  })
  expiresIn: string;

  @ApiProperty({
    description: 'Información del usuario autenticado',
    type: UserProfileResponseDto,
  })
  user: UserProfileResponseDto;
}

export class UserProfileMapper {
  public static fromDomain(entity: UserEntity): UserProfileResponseDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      fullName: entity.fullName,
      documentNumber: entity.documentNumber,
      documentType: entity.documentType,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }
}
