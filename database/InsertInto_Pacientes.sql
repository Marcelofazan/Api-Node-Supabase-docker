INSERT INTO public.pacientes (nome, email, telefone, endereco, created_at, updated_at)
SELECT 
    primeiro_nome || ' ' || segundo_nome || ' ' || ultimo_nome AS nome,
    LOWER(primeiro_nome) || '.' || LOWER(ultimo_nome) || (CASE WHEN i % 3 = 0 THEN i::text ELSE '' END) || '@email.com' AS email,
    '(11) 9' || LPAD(FLOOR(random() * 900000000 + 100000000)::text, 9, '0') AS telefone,
    logradouro || ', ' || CEIL(random() * 2000) || ' - ' || bairro || ', São Paulo - SP' AS endereco,
    NOW() - (i || ' days')::interval AS created_at,
    NOW() - (i || ' days')::interval AS updated_at
FROM generate_series(1, 100) AS i
CROSS JOIN (
    SELECT 'Ana' AS primeiro_nome, 'Beatriz' AS segundo_nome, 'Silva' AS ultimo_nome, 'Av. Paulista' AS logradouro, 'Bela Vista' AS bairro UNION ALL
    SELECT 'Bruno', 'Carlos', 'Santos', 'Rua Augusta', 'Consolação' UNION ALL
    SELECT 'Camila', 'Fernanda', 'Oliveira', 'Rua da Consolação', 'Centro' UNION ALL
    SELECT 'Diego', 'Henrique', 'Souza', 'Av. Brigadeiro Faria Lima', 'Pinheiros' UNION ALL
    SELECT 'Eduardo', 'Gabriel', 'Rodrigues', 'Rua dos Pinheiros', 'Pinheiros' UNION ALL
    SELECT 'Fernanda', 'Luiza', 'Ferreira', 'Av. Ibirapuera', 'Moema' UNION ALL
    SELECT 'Gustavo', 'Henrique', 'Almeida', 'Rua Domingos de Morais', 'Vila Mariana' UNION ALL
    SELECT 'Heloísa', 'Cristina', 'Costa', 'Av. Santo Amaro', 'Itaim Bibi' UNION ALL
    SELECT 'Igor', 'Matheus', 'Carvalho', 'Rua Teodoro Sampaio', 'Pinheiros' UNION ALL
    SELECT 'Juliana', 'Vitória', 'Ribeiro', 'Av. Rebouças', 'Jardim Paulista'
) AS nomes
ORDER BY RANDOM()
LIMIT 100;
