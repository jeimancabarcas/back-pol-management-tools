import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUseCase } from '../../../application/use-cases/register.use-case.js';
import { LoginUseCase } from '../../../application/use-cases/login.use-case.js';
import { GetProfileUseCase } from '../../../application/use-cases/get-profile.use-case.js';
import { RegisterRequestDto } from '../dtos/register-request.dto.js';
import { LoginRequestDto } from '../dtos/login-request.dto.js';
import { AuthResponseDto, UserProfileResponseDto } from '../../../application/dtos/auth-response.dto.js';
import { JwtAuthGuard } from '../../security/jwt-auth.guard.js';
import { CurrentUser } from '../../security/current-user.decorator.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario con contraseña encriptada y retorna el token JWT de acceso.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario registrado exitosamente.',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos o incompletos.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El correo electrónico o documento ya se encuentra registrado.',
  })
  async register(@Body() dto: RegisterRequestDto): Promise<AuthResponseDto> {
    return this.registerUseCase.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión (OAuth 2.0 / JWT)',
    description: 'Autentica al usuario mediante correo y contraseña y genera un token JWT Bearer.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Autenticación exitosa. Retorna Bearer Token y datos de usuario.',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas o cuenta inactiva.',
  })
  async login(@Body() dto: LoginRequestDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Consultar perfil del usuario autenticado',
    description: 'Obtiene los datos del usuario correspondiente al token Bearer JWT enviado en la cabecera Authorization.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Datos del perfil obtenidos exitosamente.',
    type: UserProfileResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token no provisto, inválido o expirado.',
  })
  async getProfile(@CurrentUser('userId') userId: string): Promise<UserProfileResponseDto> {
    return this.getProfileUseCase.execute(userId);
  }
}
