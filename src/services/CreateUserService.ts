import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../Error/AppError';

import Users from '../models/user';

interface RequesteProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: RequesteProps): Promise<Users> {
    const userRepository = getRepository(Users);

    const emailCheck = await userRepository.findOne({
      where: { email },
    });

    if (emailCheck) throw new AppError('Email address already used', 403);

    const hashPassword = await hash(password, 8);

    const user = {
      name,
      email,
      password: hashPassword,
    };
    await userRepository.save(user);

    return user as Users;
  }
}

export default CreateUserService;
