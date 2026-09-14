import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'carlos.rodriguez@empresa.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string;

  @ApiProperty({
    description: 'Contraseña de acceso (mínimo 6 caracteres)',
    example: 'ClaveSegura2026*',
    minLength: 6,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Carlos',
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres.' })
  firstName: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Rodríguez',
    maxLength: 100,
  })
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @MaxLength(100, { message: 'El apellido no puede superar los 100 caracteres.' })
  lastName: string;

  @ApiProperty({
    description: 'Número de documento de identidad',
    example: '1098765432',
    maxLength: 50,
  })
  @IsString({ message: 'El documento debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El documento es obligatorio.' })
  @MaxLength(50, { message: 'El documento no puede superar los 50 caracteres.' })
  documentNumber: string;

  @ApiProperty({
    description: 'Tipo de documento (ej. CC, CE, NIT, PASAPORTE)',
    example: 'CC',
    maxLength: 20,
  })
  @IsString({ message: 'El tipo de documento debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipo de documento es obligatorio.' })
  @MaxLength(20, { message: 'El tipo de documento no puede superar los 20 caracteres.' })
  documentType: string;
}
