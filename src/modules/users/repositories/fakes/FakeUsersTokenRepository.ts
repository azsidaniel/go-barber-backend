import UserToken from '../../infra/typeorm/entities/UserToken';
import AppError from '../../../../shared/errors/AppError';
import IUserTokenRepository from '../IUserTokenRepository';
import { uuid } from 'uuidv4';

class FakeUsersTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      userToken => userToken.token === token,
    );

    return userToken;
  }
}

export default FakeUsersTokenRepository;
