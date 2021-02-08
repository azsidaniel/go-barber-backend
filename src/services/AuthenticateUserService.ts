import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

type RequestDTO = {
  email: string;
  password: string;
};

type ResponseDTO = { user: User };

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email: email } });

    if (!user) {
      throw Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Incorrect email/password combination.');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
