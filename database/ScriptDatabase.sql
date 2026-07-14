CREATE TABLE pacientes(
paciente_id SERIAL PRIMARY KEY,
nome VARCHAR NOT NULL,
email VARCHAR NOT NULL,
telefone VARCHAR NOT NULL,
endereco VARCHAR NOT NULL
);

CREATE TABLE sessoes(
sessao_id  SERIAL PRIMARY KEY,
paciente_id INT NOT NULL,
data TIMESTAMP NOT NULL,
observacao VARCHAR NOT NULL,
valor NUMERIC NOT NULL,
in_pago BOOLEAN NOT NULL,
CONSTRAINT fk_pacientes FOREIGN KEY (paciente_id) REFERENCES pacientes (paciente_id)
);