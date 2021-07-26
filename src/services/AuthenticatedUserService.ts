import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Auth from '../config/Auth';

import AppError from '../Error/AppError';

import Users from '../models/user';

interface RequestProps {
  email: string;
  password: string;
}

interface AuthenticatedProps {
  token: string;
  user: Users;
}

class AuthenticatedUserService {
  public async execute({
    email,
    password,
  }: RequestProps): Promise<AuthenticatedProps> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect Email/Password combination', 401);
    }

    const passwordHash = await compare(password, user.password);

    if (!passwordHash) {
      throw new AppError('Incorrect Email/password combination', 401);
    }

    const { expiresIn, secret } = Auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticatedUserService;
