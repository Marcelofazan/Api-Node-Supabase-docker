import PacienteService from '../services/paciente.service.js';

async function createPaciente(req, res, next) {
  try {
    let paciente = req.body;
    if (!paciente.nome || !paciente.email || !paciente.telefone) {
      throw new Error('Nome, email, e telefone são obrigatórios.');
    }
    paciente = await PacienteService.createPaciente(paciente);
    res.send(paciente);
    console.log(`POST /paciente - ${JSON.stringify(paciente)}`);
  } catch (error) {
    next(error);
  }
}

async function updatePaciente(req, res, next) {
  try {
    let paciente = req.body;
    if (!paciente.pacienteId || !paciente.nome || !paciente.email || !paciente.telefone) {
      throw new Error('Paciente_Id, Nome, email, e telefone são obrigatórios.');
    }
    paciente = await PacienteService.updatePaciente(paciente);
    res.send(paciente);
    console.log(`PUT /paciente - ${JSON.stringify(paciente)}`);
  } catch (error) {
    next(error);
  }
}

async function deletePaciente(req, res, next) {
  try {
    let id = req.params.id;
    await PacienteService.deletePaciente(id);
    res.end();
    console.log(`DELETE /paciente/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getPaciente(req, res, next) {
  try {
    let id = req.params.id;
    res.send(await PacienteService.getPaciente(id));
    console.log(`GET /paciente/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getPacientes(req, res, next) {
  try {
    res.send(await PacienteService.getPacientes());
    console.log('GET /paciente');
  } catch (error) {
    next(error);
  }
}

async function getPacienteLikeNome(req, res, next) {
  try {
    let nome = req.query.nome;
    res.send(await PacienteService.getPacienteLikeNome(nome));
    console.log(`GET /paciente/:{nome}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createPaciente,
  getPacientes,
  getPaciente,
  deletePaciente,
  updatePaciente,
  getPacienteLikeNome,
};
