import UserToken from '../../infra/typeorm/entities/UserToken';
import { v4 } from 'uuid';
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
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUsersTokenRepository;
