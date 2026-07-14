import Sequelize from 'sequelize';
import Paciente from '../models/paciente.model.js';
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
const supabase = createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_SERVICE_KEY);

const { Op } = Sequelize;

async function insertPaciente(novoPaciente) {
  try {
   const { data, error } = await supabase
    .from('pacientes')
    .insert(
      {
        nome: novoPaciente.nome,
        email: novoPaciente.email,
        telefone: novoPaciente.telefone,
        endereco: novoPaciente.endereco
      }
    )
    .select();
    
    if (error) {
        console.error('Erro ao inserir paciente:', error);
        return null;
      }

      console.log('Paciente cadastrado com sucesso:', data);
      return data;


  } catch (error) {
    console.error('Erro ao inserir paciente:', error.message);
    throw error;
  }
}

async function updatePaciente(paciente) {
  try {
    const { data, error } = await supabase
      .from('pacientes') // nome da sua tabela
      .update(
        {
        paciente_id: paciente.pacienteId,
        nome: paciente.nome,
        email: paciente.email,
        telefone: paciente.telefone,
        endereco: paciente.endereco
      }
    )
    .eq('paciente_id', paciente.pacienteId)
    .select() // solicita o retorno dos dados atualizados
    .single(); // garante que retorne um objeto e não um array

       if (error) {
        console.error('Erro ao alterar paciente:', error);
        return null;
      }

      console.log('Paciente alterado com sucesso:', data);
      return data;

  } catch (error) {
    console.error('Erro ao atualizar paciente:', error.message);
    return null;
  }
}

async function deletePaciente(id) {
  try {
    const { data, error } = await supabase
      .from('pacientes') // Nome da tabela no Supabase
      .delete()
      .eq('paciente_id', id); // Filtro: coluna pacienteId deve igualar o id passado
       
      if (error) {
        console.error('Erro ao deletar paciente:', error);
        return null;
      }

      console.log('Paciente deletado com sucesso:', data);
      return data;

  } catch (error) {
    console.error('Erro ao deletar paciente:', error.message);
  }
}

async function getPacientes(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('pacientes') // Nome da tabela no Supabase
      .select('*');     // Seleciona todas as colunas (equivalente ao findAll)

    if (error) {
      throw error; // Lança o erro para ser capturado no catch
    }

    if (!data) {
      throw new Error('Paciente não encontrado');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error.message);
    throw error;
  }
}

async function getPaciente(id) {
  try {
    const { data, error } = await supabase
      .from('pacientes') // Nome da tabela no Supabase
      .select('*')      // Seleciona todas as colunas
      .eq('paciente_id', id) // Filtra pela chave primária
      .single();        // Retorna apenas um objeto, não um array

       if (error) {
        console.error('Erro ao buscar paciente:', error);
        return null;
      }

      if (!data) {
        throw new Error('Paciente não encontrado');
      }

      console.log('Paciente buscou com sucesso:', data);
      return data;
      
  } catch (error) {
    console.error('Erro ao buscar paciente:', error.message);
    return null; // Ou lance o erro novamente, dependendo da sua necessidade
  }
}

async function getPacienteLikeNome(nomePaciente) {
  try {
    const { data, error } = await supabase
      .from('pacientes') // Nome da sua tabela no Supabase
      .select('*')      // Seleciona todas as colunas
      .ilike('nome', `%${nomePaciente}%`) // Busca parcial case-insensitive

       if (error) {
        console.error('Erro ao buscar paciente:', error);
        return null;
      }

      console.log('Paciente buscou com sucesso:', data);
      return data;

  } catch (error) {
    console.error('Erro ao buscar paciente:', error.message);
    throw error;
  }
}

export default {
  insertPaciente,
  getPacientes,
  getPaciente,
  updatePaciente,
  deletePaciente,
  getPacienteLikeNome
};
