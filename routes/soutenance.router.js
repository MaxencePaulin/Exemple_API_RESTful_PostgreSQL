import express from 'express';
import { addSoutenance } from '../controllers/soutenance.controller.js';
import valid from '../middlewares/valid.js';

const router = express.Router();

router.post('/', valid.verifExistEtudiant,
    valid.verifExistJury, valid.validNote, addSoutenance);

export default router;