import SessaoService from '../services/sessao.service.js';

async function createSessao(req, res, next) {
  try {
    let sessao = req.body;
    if (!sessao.observacao || !sessao.valor || !sessao.pacienteId) {
      throw new Error('Observação, valor e pacienteId são obrigatórios.');
    }
    sessao = await SessaoService.createSessao(sessao);
    res.send(sessao);
    console.log(`POST /sessao - ${JSON.stringify(sessao)}`);
  } catch (error) {
    next(error);
  }
}

async function updateSessao(req, res, next) {
  try {
    let sessao = req.body;
    if (!sessao.sessaoId || !sessao.valor) {
      throw new Error('Sessao_Id e valor são obrigatórios.');
    }
    sessao = await SessaoService.updateSessao(sessao);
    res.send(sessao);
    console.log(`PUT /sessao - ${JSON.stringify(sessao)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteSessao(req, res, next) {
  try {
    let id = req.params.id;
    await SessaoService.deleteSessao(id);
    res.end();
    console.log(`DELETE /sessao/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getSessao(req, res, next) {
  try {
    let id = req.params.id;
    res.send(await SessaoService.getSessao(id));
    console.log(`GET /sessao/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getSessoes(req, res, next) {
  try {
    res.send(await SessaoService.getSessoes(req.query.autorId));
    console.log('GET /sessao');
  } catch (error) {
    next(error);
  }
}

export default {
  createSessao,
  getSessoes,
  getSessao,
  deleteSessao,
  updateSessao
};
