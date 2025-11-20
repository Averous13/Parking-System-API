import express from 'express';
import UserController from './controller/UserController.js';
import authenticateToken from './middleware/authentication.js'; 
import ParkirController from './controller/ParkirController.js';

const router = express.Router();

router.post('/user', UserController.store);
router.post('/user/login', UserController.login);
router.post('/user/register', UserController.register);
router.get('/user', UserController.get);
router.get('/user/me', authenticateToken, UserController.me);
router.get('/user/:id', UserController.getById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);


router.post('/parkir/order', authenticateToken, ParkirController.order);
router.get('/parkir', authenticateToken, ParkirController.get);
router.put('/parkir/:id', authenticateToken, ParkirController.update);
router.delete('/parkir/:id', authenticateToken, ParkirController.cancel);

export default router;