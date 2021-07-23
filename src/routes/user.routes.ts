import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

interface UserProps {
  id: string;
  name: string;
  password?: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

const UserRoutes = Router();

UserRoutes.post('/users', async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const createUser = new CreateUserService();

    const user: UserProps = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(401).json({ message: err });
  }
});

UserRoutes.patch('/users', (request, response) => {
  const { name, password } = request.body;
  return response.json({ name, password });
});

export default UserRoutes;
