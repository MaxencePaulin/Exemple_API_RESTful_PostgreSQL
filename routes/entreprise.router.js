import express from 'express';
import valid from '../middlewares/valid.js';
import { listEntreprise,
    addEntreprise, deleteEntreprise } from '../controllers/entreprise.controller.js';

const router = express.Router();

router.get('/', listEntreprise);
router.post('/', valid.validNameEntreprise, addEntreprise);
router.delete('/:id', valid.validIdEntreprise, valid.EntrepriseNonLiee, deleteEntreprise);

export default router;