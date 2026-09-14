import { describe, expect, it } from 'vitest';
import { UserEntity } from './user.entity.js';

describe('UserEntity', () => {
  it('debe crear un usuario válido con todos los datos requeridos', () => {
    const user = UserEntity.create({
      email: 'carlos.rodriguez@empresa.com',
      password: 'hashedpassword123',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      documentNumber: '1098765432',
      documentType: 'CC',
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('carlos.rodriguez@empresa.com');
    expect(user.firstName).toBe('Carlos');
    expect(user.lastName).toBe('Rodríguez');
    expect(user.fullName).toBe('Carlos Rodríguez');
    expect(user.documentNumber).toBe('1098765432');
    expect(user.documentType).toBe('CC');
    expect(user.isActive).toBe(true);
  });

  it('debe lanzar error si el email es inválido', () => {
    expect(() =>
      UserEntity.create({
        email: 'correo-invalido',
        password: 'password123',
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        documentNumber: '1098765432',
        documentType: 'CC',
      }),
    ).toThrow('El correo electrónico es obligatorio y debe tener un formato válido.');
  });

  it('debe lanzar error si la contraseña tiene menos de 6 caracteres', () => {
    expect(() =>
      UserEntity.create({
        email: 'carlos@empresa.com',
        password: '123',
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        documentNumber: '1098765432',
        documentType: 'CC',
      }),
    ).toThrow('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
  });

  it('debe lanzar error si falta el nombre o apellido', () => {
    expect(() =>
      UserEntity.create({
        email: 'carlos@empresa.com',
        password: 'password123',
        firstName: '',
        lastName: 'Rodríguez',
        documentNumber: '1098765432',
        documentType: 'CC',
      }),
    ).toThrow('El nombre es obligatorio.');

    expect(() =>
      UserEntity.create({
        email: 'carlos@empresa.com',
        password: 'password123',
        firstName: 'Carlos',
        lastName: '',
        documentNumber: '1098765432',
        documentType: 'CC',
      }),
    ).toThrow('El apellido es obligatorio.');
  });
});
