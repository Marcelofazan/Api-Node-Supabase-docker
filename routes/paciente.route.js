import express from 'express';
import PacienteController from '../controllers/paciente.controller.js';

const router = express.Router();

router.post('/', PacienteController.createPaciente);
router.put('/', PacienteController.updatePaciente);
router.delete('/:id', PacienteController.deletePaciente);
router.get('/', PacienteController.getPacientes);
router.get('/likeNome/', PacienteController.getPacienteLikeNome);

export default router;
