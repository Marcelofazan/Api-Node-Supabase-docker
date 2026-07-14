import Paciente from '../models/paciente.model.js';
import Sessao from '../models/sessao.model.js';
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
const supabase = createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_SERVICE_KEY);

async function insertSessao(sessao) {
  try {
    // 1. Tenta inserir dados na tabela 'sessoes'
    const { data, error } = await supabase
      .from('sessoes') // Nome da sua tabela no Supabase
      .insert(
      {
        paciente_id: sessao.pacienteId,
        data: sessao.data,
        valor: sessao.valor,
        observacao: sessao.observacao,
        in_pago: sessao.inPago
      }
    ) // Dados da sessão
      .select(); // Opcional: Retorna o dado inserido

    if (error) {
        console.error('Erro ao inserir sessão:', error);
        return null;
      }

      console.log('Sessão cadastrada com sucesso:', data);
      return data;

  } catch (error) {
    console.error('Erro ao inserir sessão:', error.message);
    throw error;
  }
}

async function updateSessao(sessao) {
  try {
    // 1. Atualiza os dados na tabela 'sessoes'
    const { data, error } = await supabase
      .from('sessoes') // Nome da tabela no Postgres
      .update(
        {
          sessao_id: sessao.sessaoId,
          data: sessao.data,
          valor: sessao.valor,
          observacao: sessao.observacao,
          in_pago: sessao.inPago
        }
    )
      .eq('sessao_id', sessao.sessaoId) // Filtro WHERE
      .select() // Solicita o retorno do registro atualizado
      .single(); // Garante que retorna um objeto, não um array

       if (error) {
        console.error('Erro ao alterar sessão:', error);
        return null;
      }

      console.log('Sessão alterada com sucesso:', data);
      return data;
  } catch (error) {
    console.error('Erro ao atualizar sessao:', error.message);
    throw error;
  }
}

async function deleteSessao(id) {
  try {
    const { data, error } = await supabase
      .from('sessoes') // Nome da tabela no Supabase
      .delete()
      .eq('sessao_id', id); // Filtro: coluna sessaoId == id

    if (error) {
      throw error; // Lança o erro para ser tratado
    }

    return data; // Retorna null por padrão, ou os dados deletados se usar .select()
  } catch (error) {
    console.error('Erro ao deletar sessão:', error.message);
    throw error;
  }
}

async function getSessao(id) {
  try {
    const { data, error } = await supabase
      .from('sessoes') // Nome da tabela no Supabase
      .select(`
        sessao_id, data, valor, observacao, in_pago,
        pacientes (
          paciente_id,
          nome,
          email,
          telefone,
          endereco
        )
      `) // Busca sessao e traz os dados do paciente relacionado
      .eq('sessao_id', id) // Equivalente a findByPk
      .single(); // Garante que retorne um objeto, não um array

    if (error) {
      throw error;
    }

    if (error) {
      console.error('Erro ao buscar paciente:', error);
      return null;
    }

    if (!data) {
      throw new Error('Sessão não encontrada');
    }

    console.log('Sessão encontrada:', data);
       // O id gravado está disponível em: data.sessao_id
    return data;
  } catch (error) {
    console.error('Erro ao buscar sessão:', error.message);
    throw error;
  }
}

async function getSessoes() {
  try {
    const { data, error } = await supabase
      .from('sessoes')
      .select(`
        sessao_id, data, valor, observacao, in_pago,
        pacientes (paciente_id, nome, email, telefone, endereco)
      `)
      .order('data', { ascending: true }); // 'true' para ASC, 'false' para DESC

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Sessão não encontrada');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar sessões:', error);
    throw error;
  }
}

async function getSessoesByPaciente(pacienteId) {
  try {
    const { data, error } = await supabase
      .from('sessoes') // Nome da tabela de Sessão no Supabase
      .select(`
        sessao_id, data, valor, observacao, in_pago,
        pacientes (
          paciente_id,
          nome,
          email,
          telefone,
          endereco
        )
      `)
      .eq('paciente_id', pacienteId); // Filtra pela chave estrangeira

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar sessões:', error.message);
    throw error;
  }
}

export default {
  insertSessao,
  updateSessao,
  deleteSessao,
  getSessao,
  getSessoes,
  getSessoesByPaciente,
};
