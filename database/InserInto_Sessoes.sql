INSERT INTO public.sessoes (paciente_id, data, observacao, valor, in_pago, created_at, updated_at)
WITH listagem_pacientes AS (
    SELECT 
        paciente_id, 
        ROW_NUMBER() OVER (ORDER BY paciente_id) as rn,
        -- Sorteia um mês de início entre Junho (06) e Dezembro (12) de 2026
        FLOOR(RANDOM() * 7 + 6)::int AS mes_inicio,
        -- Sorteia um dia de início aleatório na primeira semana do mês (dias 1 a 7)
        FLOOR(RANDOM() * 7 + 1)::int AS dia_inicio
    FROM public.pacientes
    LIMIT 100
),
semanas AS (
    -- Define as 4 sessões consecutivas (uma a cada 7 dias)
    SELECT 0 AS num_semana, 0 AS dias_adicionais UNION ALL
    SELECT 1, 7 UNION ALL
    SELECT 2, 14 UNION ALL
    SELECT 3, 21
)
SELECT 
    p.paciente_id,
    -- Monta a data inicial com base no mês/dia sorteados, soma as semanas e adiciona horários variados (entre 08h e 18h)
    (TO_TIMESTAMP('2026-' || p.mes_inicio || '-' || p.dia_inicio || ' 08:00:00', 'YYYY-MM-DD HH24:MI:SS')::timestamp 
        + (s.dias_adicionais || ' days')::interval 
        + (FLOOR(RANDOM() * 11) || ' hours')::interval 
        + (FLOOR(RANDOM() * 4) * 15 || ' minutes')::interval) AS data,
    -- Distribuição aleatória de descrições entre Massoterapia e Acupuntura
    CASE 
        WHEN RANDOM() > 0.5 THEN 'Sessão de Massoterapia Relaxante'
        ELSE 'Sessão de Acupuntura Clínica'
    END AS observacao,
    -- Define valores aleatórios coerentes com os procedimentos (ex: entre 100 e 180)
    CASE 
        WHEN RANDOM() > 0.5 THEN 130.00
        ELSE 160.00
    END AS valor,
    -- Status de pagamento aleatório
    (RANDOM() > 0.25) AS in_pago,
    NOW() AS created_at,
    NOW() AS updated_at
FROM listagem_pacientes p
CROSS JOIN semanas s
ORDER BY p.paciente_id, s.num_semana;
