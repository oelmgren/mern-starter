import { Router } from 'express';
import * as EmailformController from '../controllers/emailform.controller';

const router = new Router();

router.route('/email').post(EmailformController.addPost);

export default router;
