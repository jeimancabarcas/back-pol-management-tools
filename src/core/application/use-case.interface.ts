/**
 * Interfaz base para los casos de uso de la capa de aplicación.
 * Cada caso de uso representa una única acción u orquestación de negocio.
 */
export interface IUseCase<IInput = void, IOutput = void> {
  execute(input: IInput): Promise<IOutput> | IOutput;
}
