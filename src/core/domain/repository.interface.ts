/**
 * Interfaz genérica de repositorio del dominio (Puerto de salida).
 * Las implementaciones concretas (TypeORM, InMemory, etc.) residirán en la capa de infraestructura.
 */
export interface IRepository<T, TId = string> {
  findById(id: TId): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: TId): Promise<void>;
}
