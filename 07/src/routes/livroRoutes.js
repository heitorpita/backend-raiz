import express from 'express';
import LivroController from '../controllers/livroController.js';

const router = express.Router();

router.get('/', LivroController.listarLivros);
router.post('/', LivroController.criar);

export default router;
