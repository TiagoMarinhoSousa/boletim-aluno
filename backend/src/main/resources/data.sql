-- =========================
-- CONSTRAINT ÚNICA: aluno + avaliação
-- Garante que cada aluno tenha no máximo uma nota por avaliação
-- =========================
ALTER TABLE nota ADD CONSTRAINT IF NOT EXISTS uk_aluno_avaliacao UNIQUE (aluno_id, avaliacao_id);

-- =========================
-- TURMAS
-- =========================
INSERT INTO turma (nome) VALUES ('Turma A');
INSERT INTO turma (nome) VALUES ('Turma B');

-- =========================
-- DISCIPLINAS
-- =========================
INSERT INTO disciplina (nome) VALUES ('Matemática');
INSERT INTO disciplina (nome) VALUES ('Português'); 
INSERT INTO disciplina (nome) VALUES ('História');
INSERT INTO disciplina (nome) VALUES ('Ciências');

-- =========================
-- ALUNOS (10 fictícios)
-- =========================
INSERT INTO aluno (nome, turma_id) VALUES ('Carlos Silva', 1);
INSERT INTO aluno (nome, turma_id) VALUES ('Mariana Souza', 1);
INSERT INTO aluno (nome, turma_id) VALUES ('João Pereira', 1);
INSERT INTO aluno (nome, turma_id) VALUES ('Fernanda Costa', 1);
INSERT INTO aluno (nome, turma_id) VALUES ('Ricardo Almeida', 1);
INSERT INTO aluno (nome, turma_id) VALUES ('Patrícia Gomes', 2);
INSERT INTO aluno (nome, turma_id) VALUES ('André Oliveira', 2);
INSERT INTO aluno (nome, turma_id) VALUES ('Luciana Fernandes', 2);
INSERT INTO aluno (nome, turma_id) VALUES ('Felipe Ramos', 2);
INSERT INTO aluno (nome, turma_id) VALUES ('Beatriz Martins', 2);

-- =========================
-- AVALIAÇÕES (3 por disciplina: Prova, Trabalho, Atividade)
-- =========================
-- Matemática
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Prova Matemática (peso 5)', 1, 5);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Trabalho Matemática (peso 2)', 1, 2);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Atividade Matemática (peso 1)', 1, 1);

-- Português
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Prova Português (peso 5)', 2, 5);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Trabalho Português (peso 2)', 2, 2);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Atividade Português (peso 1)', 2, 1);

-- História
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Prova História (peso 5)', 3, 5);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Trabalho História (peso 2)', 3, 2);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Atividade História (peso 1)', 3, 1);

-- Ciências
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Prova Ciências (peso 5)', 4, 5);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Trabalho Ciências (peso 2)', 4, 2);
INSERT INTO avaliacao (descricao, disciplina_id, peso) VALUES ('Atividade Ciências (peso 1)', 4, 1);

-- =========================
-- NOTAS (Matemática: cada aluno tem 3 notas)
-- =========================
-- Carlos Silva
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.0, 1, 1); -- Prova
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (6.0, 1, 2); -- Trabalho
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (10.0, 1, 3); -- Atividade

-- Mariana Souza
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.5, 2, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.0, 2, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (9.0, 2, 3);

-- João Pereira
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (9.0, 3, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.0, 3, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.0, 3, 3);

-- Fernanda Costa
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (6.5, 4, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.0, 4, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.5, 4, 3);

-- Ricardo Almeida
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.0, 5, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (6.5, 5, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (9.0, 5, 3);

-- Patrícia Gomes
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.5, 6, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.0, 6, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.0, 6, 3);

-- André Oliveira
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (9.2, 7, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.5, 7, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (9.0, 7, 3);

-- Luciana Fernandes
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (6.8, 8, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.5, 8, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.0, 8, 3);

-- Felipe Ramos
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.9, 9, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (6.5, 9, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (7.0, 9, 3);

-- Beatriz Martins
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (8.7, 10, 1);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (9.0, 10, 2);
INSERT INTO nota (valor, aluno_id, avaliacao_id) VALUES (10.0, 10, 3);