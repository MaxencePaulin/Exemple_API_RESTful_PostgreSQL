import express from 'express';
import valid from '../middlewares/valid.js';
import { listEntreprise,
    addEntreprise } from '../controllers/entreprise.controller.js';

const router = express.Router();

router.get('/', listEntreprise);
router.post('/', valid.validNameEntreprise, addEntreprise);

export default router;