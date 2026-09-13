/**
 * Clase base para todas las entidades del dominio en Clean Architecture.
 * El dominio es completamente agnóstico de frameworks y ORMs (como TypeORM).
 */
export abstract class BaseEntity<TId = string> {
  protected readonly _id: TId;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(id: TId, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }

  get id(): TId {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }

  public equals(object?: BaseEntity<TId>): boolean {
    if (object == null || object === undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    return this._id === object._id;
  }
}
