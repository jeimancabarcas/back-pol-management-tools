import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import { UserEntity } from '../../../users/domain/entities/user.entity.js';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../../users/domain/repositories/user.repository.interface.js';
import { RegisterInput } from '../dtos/register.dto.js';
import { AuthResponseDto, UserProfileMapper } from '../dtos/auth-response.dto.js';

@Injectable()
export class RegisterUseCase implements IUseCase<RegisterInput, AuthResponseDto> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: RegisterInput): Promise<AuthResponseDto> {
    const existingEmail = await this.userRepository.findByEmail(input.email);
    if (existingEmail) {
      throw new ConflictException(`El correo electrónico "${input.email}" ya se encuentra registrado.`);
    }

    const existingDoc = await this.userRepository.findByDocument(input.documentNumber, input.documentType);
    if (existingDoc) {
      throw new ConflictException(
        `El documento "${input.documentType} ${input.documentNumber}" ya se encuentra registrado.`,
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(input.password, saltRounds);

    const user = UserEntity.create({
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      documentNumber: input.documentNumber,
      documentType: input.documentType,
    });

    const savedUser = await this.userRepository.save(user);

    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      fullName: savedUser.fullName,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      user: UserProfileMapper.fromDomain(savedUser),
    };
  }
}
