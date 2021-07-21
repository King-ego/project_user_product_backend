import { Router } from 'express';

import UserRoutes from './user.routes';

const routes = Router();

routes.get('/', UserRoutes);

export default routes;
