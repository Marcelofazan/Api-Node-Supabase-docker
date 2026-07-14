import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Paciente from './paciente.model.js';

const Sessao = db.sequelize.define(
  'sessoes',
  {
    sessaoId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    observacao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    inPago: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  },
  { underscored: true }
);

Sessao.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
});

export default Sessao;
