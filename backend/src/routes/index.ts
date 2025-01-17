import { Router } from 'express';

import { currentUser } from '../middleware/current-user';
import { authRouter } from './auth.route';
import { taskRouter } from './task.route';

export const setupRoutes = (app: Router) => {
  app.use(authRouter);
  app.use(currentUser);
  app.use(taskRouter); 
};