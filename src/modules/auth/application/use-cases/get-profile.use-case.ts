import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../../users/domain/repositories/user.repository.interface.js';
import { UserProfileMapper, UserProfileResponseDto } from '../dtos/auth-response.dto.js';

@Injectable()
export class GetProfileUseCase implements IUseCase<string, UserProfileResponseDto> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`El usuario con ID "${userId}" no fue encontrado.`);
    }

    return UserProfileMapper.fromDomain(user);
  }
}
