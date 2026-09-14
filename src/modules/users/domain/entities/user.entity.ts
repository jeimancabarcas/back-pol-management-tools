import { BaseEntity } from '../../../../core/domain/entity.base.js';

export interface UserProps {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  documentType: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity extends BaseEntity<string> {
  private _email: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _documentNumber: string;
  private _documentType: string;
  private _isActive: boolean;

  private constructor(props: UserProps) {
    super(props.id ?? crypto.randomUUID(), props.createdAt, props.updatedAt);
    this._email = props.email;
    this._password = props.password;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._documentNumber = props.documentNumber;
    this._documentType = props.documentType;
    this._isActive = props.isActive ?? true;
  }

  public static create(props: UserProps): UserEntity {
    if (!props.email || !props.email.includes('@')) {
      throw new Error('El correo electrónico es obligatorio y debe tener un formato válido.');
    }
    if (!props.password || props.password.length < 6) {
      throw new Error('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
    }
    if (!props.firstName || props.firstName.trim().length === 0) {
      throw new Error('El nombre es obligatorio.');
    }
    if (!props.lastName || props.lastName.trim().length === 0) {
      throw new Error('El apellido es obligatorio.');
    }
    if (!props.documentNumber || props.documentNumber.trim().length === 0) {
      throw new Error('El número de documento es obligatorio.');
    }
    if (!props.documentType || props.documentType.trim().length === 0) {
      throw new Error('El tipo de documento es obligatorio.');
    }

    return new UserEntity({
      ...props,
      email: props.email.toLowerCase().trim(),
      firstName: props.firstName.trim(),
      lastName: props.lastName.trim(),
      documentNumber: props.documentNumber.trim(),
      documentType: props.documentType.toUpperCase().trim(),
      isActive: props.isActive ?? true,
    });
  }

  public static restore(props: UserProps): UserEntity {
    return new UserEntity(props);
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`.trim();
  }

  get documentNumber(): string {
    return this._documentNumber;
  }

  get documentType(): string {
    return this._documentType;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  public changePassword(hashedPassword: string): void {
    if (!hashedPassword) {
      throw new Error('El hash de la nueva contraseña no puede estar vacío.');
    }
    this._password = hashedPassword;
    this.touch();
  }

  public deactivate(): void {
    this._isActive = false;
    this.touch();
  }
}
