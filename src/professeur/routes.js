import { Router } from 'express';
import controller from './controller.js';

const router = Router();

router.get("/soutenance/:nb", controller.getProfesseursByNbSoutenance);
router.post("/", controller.addProfesseur);

export default router;
