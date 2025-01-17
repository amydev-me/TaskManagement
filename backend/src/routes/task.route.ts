import { Router } from 'express';
import { requireAuth } from '../middleware/require-auth';
import { deleteTask, getTasks, newTask } from '../controllers/taskController';
 
const router = Router();

router.get('/api/tasks', requireAuth, getTasks);
router.post('/api/tasks', requireAuth, newTask);
router.delete('/api/tasks', requireAuth, deleteTask);

export { router as taskRouter };