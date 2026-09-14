import { IRepository } from '../../../../core/domain/repository.interface.js';
import { UserEntity } from '../entities/user.entity.js';

export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');

export interface IUserRepository extends IRepository<UserEntity, string> {
  findByEmail(email: string): Promise<UserEntity | null>;
  findByDocument(documentNumber: string, documentType?: string): Promise<UserEntity | null>;
}
