import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity.js';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { UserOrmEntity } from '../entities/user.orm-entity.js';
import { UserMapper } from '../mappers/user.mapper.js';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    const found = await this.repository.findOne({ where: { id } });
    return found ? UserMapper.toDomain(found) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await this.repository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
    return found ? UserMapper.toDomain(found) : null;
  }

  async findByDocument(documentNumber: string, documentType?: string): Promise<UserEntity | null> {
    const whereCondition: any = { documentNumber: documentNumber.trim() };
    if (documentType) {
      whereCondition.documentType = documentType.toUpperCase().trim();
    }
    const found = await this.repository.findOne({ where: whereCondition });
    return found ? UserMapper.toDomain(found) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const list = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    return list.map(UserMapper.toDomain);
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    const orm = UserMapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return UserMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
