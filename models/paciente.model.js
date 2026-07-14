import Sequelize from 'sequelize';
import db from '../repositories/db.js';

const Paciente = db.sequelize.define(
  'pacientes',
  {
    pacienteId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

export default Paciente;
