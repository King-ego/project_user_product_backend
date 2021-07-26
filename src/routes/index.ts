import { Router } from 'express';

import UserRoutes from './user.routes';
import ProductRoutes from './products.routes';
import SessionRoute from './session.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/products', ProductRoutes);
routes.use('/sessions', SessionRoute);

export default routes;
