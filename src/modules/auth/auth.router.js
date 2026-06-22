import { Router } from 'express';
import { register, login, clearCache } from './auth.controller.js';
import { getAllUsers } from './auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/cache', clearCache);

export default router;