import express from 'express';
import valid from '../middlewares/valid.js';
import { addJury } from '../controllers/jury.controller.js';

const router = express.Router();

router.post('/', valid.validNameJury,
    valid.verifExistIdSalle, addJury);

export default router;