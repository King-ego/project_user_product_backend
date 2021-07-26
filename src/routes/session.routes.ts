import { Router } from 'express';

import AuthenticatedUserService from '../services/AuthenticatedUserService';

interface UsersAuthtenticatedProps {
  id: string;
  password?: string;
  name: string;
  email: string;
}

interface AuthtenticatedProps {
  user: UsersAuthtenticatedProps;
  token: string;
}

const SessionRoute = Router();

SessionRoute.post('/', async (request, response) => {
  const { email, password } = request.body;
  try {
    const AuthtenticatedUser = new AuthenticatedUserService();

    const { user, token }: AuthtenticatedProps =
      await AuthtenticatedUser.execute({
        email,
        password,
      });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.json({ err });
  }
});

export default SessionRoute;
