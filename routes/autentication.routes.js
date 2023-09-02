import Router from 'express';
import { autenticationMiddlewares } from '../controller/autentication.middlewares.js';
import { autenticationController } from '../controller/autentication.controller0s.js';

const router = Router();

router.post('/usuarios', autenticationController.createUser);
router.post(
    '/login',
    autenticationMiddlewares.verificationUser,
    autenticationController.loginUser
);
router.get(
    '/usuarios',
    autenticationMiddlewares.verificationToken,
    autenticationController.loginUser
);

export default router;