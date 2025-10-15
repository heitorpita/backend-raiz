import express from 'express';
import AlunoController from '../controllers/alunoController.js';

const router = express.Router();

router.get('/', AlunoController.listarAlunos); 
router.post('/', AlunoController.criar);
router.get('/:id', AlunoController.listarPorId);
router.put('/:id', AlunoController.atualizar);
router.delete('/:id', AlunoController.deletar);
router.get('/curso/:curso', AlunoController.listarPorCurso);

export default router;