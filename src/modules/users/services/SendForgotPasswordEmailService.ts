import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '../repositories/IUserTokensRepository';

type IRequestDTO = {
  email: string;
};

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
