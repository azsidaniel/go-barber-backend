// encontrar por email -> findByEmail
// Criar e salvar
// encontrar usuário por id -> findById
// save

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  create: (data: ICreateUserDTO) => Promise<User>;
  save: (user: User) => Promise<User>;
}
