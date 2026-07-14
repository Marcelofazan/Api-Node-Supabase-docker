import PacienteRepository from '../repositories/paciente.repository.js';
import SessaoRepository from '../repositories/sessao.repository.js';

async function createPaciente(paciente) {
  return await PacienteRepository.insertPaciente(paciente);
}

async function updatePaciente(paciente) {
  return await PacienteRepository.updatePaciente(paciente);
}

async function deletePaciente(id) {
  const sessoes = await SessaoRepository.getSessoesByPaciente(id);
  console.log("Sessoes: ",sessoes)
  if (sessoes.length > 0) {
    throw new Error(
      "Não pode excluir paciente pois o mesmo já tem sessao associado."
    );
  }
  await PacienteRepository.deletePaciente(id);
}

async function getPacientes() {
  return await PacienteRepository.getPacientes();
}

async function getPaciente(id) {
  return await PacienteRepository.getPaciente(id);
}
async function getPacienteLikeNome(nome) {
  return await PacienteRepository.getPacienteLikeNome(nome);
}

export default {
  createPaciente,
  getPacientes,
  getPaciente,
  deletePaciente,
  updatePaciente,
  getPacienteLikeNome,
};
