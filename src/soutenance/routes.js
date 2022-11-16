import { Router } from 'express';
import controller from './controller.js';

const router = Router();

router.post("/", controller.addSoutenance);

export default router;
