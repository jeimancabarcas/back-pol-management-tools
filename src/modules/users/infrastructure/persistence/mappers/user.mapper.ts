import { UserEntity } from '../../../domain/entities/user.entity.js';
import { UserOrmEntity } from '../entities/user.orm-entity.js';

export class UserMapper {
  public static toDomain(orm: UserOrmEntity): UserEntity {
    return UserEntity.restore({
      id: orm.id,
      email: orm.email,
      password: orm.password,
      firstName: orm.firstName,
      lastName: orm.lastName,
      documentNumber: orm.documentNumber,
      documentType: orm.documentType,
      isActive: orm.isActive,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  public static toOrm(domain: UserEntity): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = domain.id;
    orm.email = domain.email;
    orm.password = domain.password;
    orm.firstName = domain.firstName;
    orm.lastName = domain.lastName;
    orm.documentNumber = domain.documentNumber;
    orm.documentType = domain.documentType;
    orm.isActive = domain.isActive;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
