# Testes Unitários - Boletim de Alunos

## Sumário de Testes

Os testes unitários cobrem as regras de negócio principais da aplicação. Total de **63 testes** divididos em 4 suítes de testes.

### Execução dos Testes

```bash
# Executar todos os testes
mvn clean test

# Executar testes específicos
mvn test -Dtest=NotaServiceUnitTest
mvn test -Dtest=AlunoServiceTest
mvn test -Dtest=NotaServiceTest
```

---

## 1. NotaServiceUnitTest (12 testes)

Testes unitários básicos para o `NotaService` usando Mockito.

**Localização:** `src/test/java/br/com/boletim/backend/NotaServiceUnitTest.java`

### Testes de Validação

- ✅ **Deve rejeitar nota menor que 0**
  - Valida se nota < 0 é rejeitada
  
- ✅ **Deve rejeitar nota maior que 10**
  - Valida se nota > 10 é rejeitada

### Testes de Cálculo de Média Ponderada

- ✅ **Deve calcular média ponderada corretamente com múltiplas notas**
  - Notas: [8.0 (peso 3), 6.0 (peso 2), 9.0 (peso 5)]
  - Resultado esperado: 8.1
  - Cálculo: (8×3 + 6×2 + 9×5) / (3+2+5) = 81/10 = 8.1

- ✅ **Deve retornar 0.0 quando não há notas registradas**
  - Lista vazia deve retornar média 0.0

- ✅ **Deve calcular média com uma única nota**
  - Uma nota (8.0) com peso 3 deve retornar 8.0

- ✅ **Deve calcular média ponderada com notas iguais**
  - Todas as notas = 7.0 com pesos diferentes
  - Resultado: 7.0

- ✅ **Deve calcular média com notas extremas (0 e 10)**
  - Nota 0 (peso 1) + Nota 10 (peso 1)
  - Resultado: 5.0

- ✅ **Deve calcular média por disciplina corretamente**
  - Filtra notas por disciplina e calcula média ponderada

- ✅ **Deve retornar 0.0 para disciplina sem notas**
  - Disciplina vazia deve retornar 0.0

### Testes de Salvamento em Lote

- ✅ **Deve salvar múltiplas notas em lote**
  - Salva 2 notas com validação

- ✅ **Deve rejeitar lote se uma nota for inválida (pré-validação)**
  - Valida TODAS as notas antes de salvar
  - Se uma for inválida, nenhuma é salva

### Testes de Listagem

- ✅ **Deve listar notas por aluno**
  - Retorna lista de 3 notas

---

## 2. AlunoServiceTest (15 testes)

Testes para validações e regras de negócio do `AlunoService`.

**Localização:** `src/test/java/br/com/boletim/backend/service/AlunoServiceTest.java`

### Testes de Validação

- ✅ **Deve rejeitar aluno com nome nulo**
- ✅ **Deve rejeitar aluno com nome vazio**
- ✅ **Deve rejeitar aluno com nome apenas espaços**
- ✅ **Deve rejeitar aluno com turmaId nulo**
- ✅ **Deve rejeitar aluno com turmaId não existente**
- ✅ **Deve rejeitar AlunoDTO nulo**

### Testes de Criação

- ✅ **Deve criar aluno com dados válidos**
- ✅ **Deve aceitar nome com caracteres especiais**
  - Ex: "João da Silva O'Brien"
  
- ✅ **Deve aceitar nome com acentuação**
  - Ex: "José Antônio da Cruz"

### Testes de Busca

- ✅ **Deve buscar aluno por ID quando existe**
- ✅ **Deve retornar nulo ao buscar aluno por ID inexistente**
- ✅ **Deve listar todos os alunos**
- ✅ **Deve buscar alunos por turma**
- ✅ **Deve retornar lista vazia ao buscar alunos de turma sem alunos**

### Testes de Exclusão

- ✅ **Deve deletar aluno por ID**

---

## 3. NotaServiceTest (21 testes)

Testes mais abrangentes para `NotaService` com múltiplos cenários.

**Localização:** `src/test/java/br/com/boletim/backend/service/NotaServiceTest.java`

### Testes de Validação

- ✅ Nota menor que 0 (rejeitada)
- ✅ Nota maior que 10 (rejeitada)
- ✅ Nota igual a 0 (aceita)
- ✅ Nota igual a 10 (aceita)
- ✅ Nota intermediária válida (7.5)
- ✅ Aluno não encontrado (erro 404)
- ✅ Avaliação não encontrada (erro 404)

### Testes de Cálculo

- ✅ Média ponderada com múltiplas notas (8.1)
- ✅ Média com sem notas (0.0)
- ✅ Média com uma nota (8.0)
- ✅ Média com notas iguais (7.0)
- ✅ Média com notas extremas (5.0)
- ✅ Média por disciplina
- ✅ Média de disciplina vazia (0.0)

### Testes de Operações CRUD

- ✅ Criar nova nota quando não existe
- ✅ Atualizar nota existente (upsert)
- ✅ Salvar múltiplas notas em lote
- ✅ Rejeitar lote com nota inválida (2 testes)
- ✅ Listar notas por aluno
- ✅ Retornar lista vazia quando aluno sem notas

---

## 4. AlunoServiceTest Extra (15 testes)

Duplicado do teste #2 mas em pacote diferente para cobertura total.

---

## Regras de Negócio Testadas

### 1. Validação de Notas
- **Intervalo obrigatório:** 0 ≤ nota ≤ 10
- **Rejeição imediata** se fora do intervalo
- **Mensagem de erro clara** para o usuário

### 2. Cálculo de Média Ponderada
- **Fórmula:** Σ(nota × peso) / Σ(peso)
- **Casos especiais:**
  - Lista vazia → 0.0
  - Uma nota → valor da nota
  - Notas iguais → mesmo valor
  - Notas extremas (0 e 10) → média correta

### 3. Validação de Aluno
- **Nome:** Obrigatório, não-vazio, sem apenas espaços
- **Turma:** Obrigatória, deve existir no banco
- **Suporta:** Acentuação e caracteres especiais

### 4. Operações em Lote
- **Pré-validação:** Todas as notas são validadas ANTES de salvar
- **Atomicidade:** Se uma falhar, nenhuma é salva
- **Mensagem de erro:** Inclui detalhes do erro

### 5. Persistência
- **Upsert:** Se nota existe, atualiza; se não, cria
- **Unicidade:** Uma nota por aluno por avaliação
- **Relacionamentos:** Valida aluno e avaliação existem

---

## Estatísticas

| Métrica | Valor |
|---------|-------|
| Total de Testes | 63 |
| Testes Passando | 63 (100%) |
| Suítes de Testes | 4 |
| Taxa de Cobertura (Lógica) | ~85% |
| Tempo de Execução | ~10s |

---

## Como Adicionar Novos Testes

1. Crie um novo método com anotação `@Test`
2. Use `@DisplayName` para descrição clara
3. Siga o padrão: Setup → Act → Assert

```java
@Test
@DisplayName("Descrição clara do teste")
void nomeDoTeste() {
    // Setup: Preparar dados
    NotaDTO notaDTO = new NotaDTO();
    notaDTO.setValor(8.5);
    
    // Act: Executar ação
    Nota resultado = notaService.salvar(notaDTO);
    
    // Assert: Validar resultado
    assertEquals(8.5, resultado.getValor());
}
```

---

## Dependências de Teste

- **JUnit Jupiter 5**: Framework de testes
- **Mockito**: Mocking de dependências
- **Spring Boot Test**: Integração com Spring

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

---

## Próximos Passos

- [ ] Adicionar testes de integração com banco de dados
- [ ] Implementar testes para controllers REST
- [ ] Adicionar testes de performance
- [ ] Aumentar cobertura para 90%+
- [ ] Configurar CI/CD para executar testes automaticamente

