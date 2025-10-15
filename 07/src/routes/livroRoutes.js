import express from 'express';
import LivroController from '../controllers/livroController.js';

const router = express.Router();

router.get('/', LivroController.listar);
router.post('/', LivroController.criar);
router.get('/:id', LivroController.listarPorId);
router.put('/:id', LivroController.atualizar);
router.delete('/:id', LivroController.deletar);
router.get('/autor/:autor', LivroController.buscarPorAutor);


export default router;