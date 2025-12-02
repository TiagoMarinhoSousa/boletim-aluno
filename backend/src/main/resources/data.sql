-- =========================
-- TURMAS
-- =========================
INSERT INTO turma (id, nome) VALUES (1, 'Turma A');
INSERT INTO turma (id, nome) VALUES (2, 'Turma B');

-- =========================
-- DISCIPLINAS
-- =========================
INSERT INTO disciplina (id, nome) VALUES (1, 'Matemática');
INSERT INTO disciplina (id, nome) VALUES (2, 'Português');
INSERT INTO disciplina (id, nome) VALUES (3, 'História');
INSERT INTO disciplina (id, nome) VALUES (4, 'Ciências');

-- =========================
-- ALUNOS (10 fictícios)
-- =========================
INSERT INTO aluno (id, nome, turma_id) VALUES (1, 'Carlos Silva', 1);
INSERT INTO aluno (id, nome, turma_id) VALUES (2, 'Mariana Souza', 1);
INSERT INTO aluno (id, nome, turma_id) VALUES (3, 'João Pereira', 1);
INSERT INTO aluno (id, nome, turma_id) VALUES (4, 'Fernanda Costa', 1);
INSERT INTO aluno (id, nome, turma_id) VALUES (5, 'Ricardo Almeida', 1);
INSERT INTO aluno (id, nome, turma_id) VALUES (6, 'Patrícia Gomes', 2);
INSERT INTO aluno (id, nome, turma_id) VALUES (7, 'André Oliveira', 2);
INSERT INTO aluno (id, nome, turma_id) VALUES (8, 'Luciana Fernandes', 2);
INSERT INTO aluno (id, nome, turma_id) VALUES (9, 'Felipe Ramos', 2);
INSERT INTO aluno (id, nome, turma_id) VALUES (10, 'Beatriz Martins', 2);

-- =========================
-- AVALIAÇÕES (3 por disciplina: Prova, Trabalho, Atividade)
-- =========================
-- Matemática
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (1, 'Prova Matemática (peso 5)', 1);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (2, 'Trabalho Matemática (peso 2)', 1);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (3, 'Atividade Matemática (peso 1)', 1);

-- Português
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (4, 'Prova Português (peso 5)', 2);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (5, 'Trabalho Português (peso 2)', 2);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (6, 'Atividade Português (peso 1)', 2);

-- História
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (7, 'Prova História (peso 5)', 3);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (8, 'Trabalho História (peso 2)', 3);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (9, 'Atividade História (peso 1)', 3);

-- Ciências
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (10, 'Prova Ciências (peso 5)', 4);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (11, 'Trabalho Ciências (peso 2)', 4);
INSERT INTO avaliacao (id, descricao, disciplina_id) VALUES (12, 'Atividade Ciências (peso 1)', 4);

-- =========================
-- NOTAS (Matemática: cada aluno tem 3 notas)
-- =========================
-- Carlos Silva
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (1, 8.0, 1, 1); -- Prova
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (2, 6.0, 1, 2); -- Trabalho
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (3, 10.0, 1, 3); -- Atividade

-- Mariana Souza
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (4, 7.5, 2, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (5, 8.0, 2, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (6, 9.0, 2, 3);

-- João Pereira
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (7, 9.0, 3, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (8, 7.0, 3, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (9, 8.0, 3, 3);

-- Fernanda Costa
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (10, 6.5, 4, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (11, 7.0, 4, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (12, 8.5, 4, 3);

-- Ricardo Almeida
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (13, 8.0, 5, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (14, 6.5, 5, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (15, 9.0, 5, 3);

-- Patrícia Gomes
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (16, 7.5, 6, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (17, 8.0, 6, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (18, 7.0, 6, 3);

-- André Oliveira
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (19, 9.2, 7, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (20, 8.5, 7, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (21, 9.0, 7, 3);

-- Luciana Fernandes
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (22, 6.8, 8, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (23, 7.5, 8, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (24, 8.0, 8, 3);

-- Felipe Ramos
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (25, 7.9, 9, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (26, 6.5, 9, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (27, 7.0, 9, 3);

-- Beatriz Martins
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (28, 8.7, 10, 1);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (29, 9.0, 10, 2);
INSERT INTO nota (id, valor, aluno_id, avaliacao_id) VALUES (30, 10.0, 10, 3);