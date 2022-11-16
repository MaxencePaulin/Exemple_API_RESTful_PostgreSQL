import { Router } from 'express';
import controller from './controller.js';

const router = Router();

router.get("/", controller.getEntreprises);
router.post("/", controller.addEntreprise);
router.delete("/:id", controller.deleteEntreprise);

export default router;