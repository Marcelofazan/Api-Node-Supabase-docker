import express from 'express';
import SessaoController from '../controllers/sessao.controller.js';

const router = express.Router();

router.post('/', SessaoController.createSessao);
router.put('/', SessaoController.updateSessao);
router.delete('/:id', SessaoController.deleteSessao);
router.get('/', SessaoController.getSessoes);
router.get('/:id', SessaoController.getSessao);

export default router;
