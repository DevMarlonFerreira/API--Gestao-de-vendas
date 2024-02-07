import { Router } from 'express';
import productsRoutes from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'ok' });
});

export default routes;
