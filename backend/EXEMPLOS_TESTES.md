# 📚 Exemplos de Testes Unitários

## 1. Teste de Validação de Nota

### Teste Básico: Rejeitar Nota Inválida

```java
@Test
@DisplayName("Deve rejeitar nota menor que 0")
void deveRejtarNotaMenorQueZero() {
    // Arrange (Preparar dados)
    NotaDTO notaDTO = new NotaDTO();
    notaDTO.setAlunoId(1L);
    notaDTO.setAvaliacaoId(1L);
    notaDTO.setValor(-0.1);  // Valor inválido

    // Act & Assert (Executar e validar)
    ResponseStatusException exception = assertThrows(
        ResponseStatusException.class,
        () -> notaService.salvar(notaDTO),
        "Deve lançar exceção para nota negativa"
    );

    // Verificar mensagem de erro
    assertTrue(exception.getReason().contains("Nota deve estar entre 0 e 10"));
}
```

---

## 2. Teste de Cálculo de Média Ponderada

### Teste Complexo: Calcular Média com Múltiplas Notas

```java
@Test
@DisplayName("Deve calcular média ponderada corretamente com múltiplas notas")
void deveCalcularMediaPonderadaCorretamente() {
    // Setup de dados
    Turma turma = new Turma();
    turma.setId(1L);
    turma.setNome("Turma A");

    Aluno aluno = new Aluno();
    aluno.setId(1L);
    aluno.setNome("João Silva");
    aluno.setTurma(turma);

    Disciplina disciplina = new Disciplina();
    disciplina.setId(1L);
    disciplina.setNome("Matemática");

    // Avaliações com pesos
    Avaliacao prova1 = new Avaliacao();
    prova1.setId(1L);
    prova1.setDescricao("Prova 1");
    prova1.setPeso(3);  // Peso 3
    prova1.setDisciplina(disciplina);

    Avaliacao trabalho = new Avaliacao();
    trabalho.setId(2L);
    trabalho.setDescricao("Trabalho");
    trabalho.setPeso(2);  // Peso 2
    trabalho.setDisciplina(disciplina);

    Avaliacao prova2 = new Avaliacao();
    prova2.setId(3L);
    prova2.setDescricao("Prova 2");
    prova2.setPeso(5);  // Peso 5
    prova2.setDisciplina(disciplina);

    // Notas
    Nota nota1 = new Nota();
    nota1.setValor(8.0);
    nota1.setAluno(aluno);
    nota1.setAvaliacao(prova1);

    Nota nota2 = new Nota();
    nota2.setValor(6.0);
    nota2.setAluno(aluno);
    nota2.setAvaliacao(trabalho);

    Nota nota3 = new Nota();
    nota3.setValor(9.0);
    nota3.setAluno(aluno);
    nota3.setAvaliacao(prova2);

    // Mock do repositório
    List<Nota> notas = List.of(nota1, nota2, nota3);
    when(notaRepository.findByAlunoId(1L)).thenReturn(notas);

    // Act
    Double media = notaService.calcularMediaPonderadaPorAluno(1L);

    // Assert
    /*
     * Cálculo:
     * (8.0 × 3) + (6.0 × 2) + (9.0 × 5) / (3 + 2 + 5)
     * = (24 + 12 + 45) / 10
     * = 81 / 10
     * = 8.1
     */
    assertEquals(8.1, media, 0.001, "Média ponderada deve ser 8.1");
}
```

---

## 3. Teste de Validação de Aluno

### Teste Multiplo: Validar Todos os Campos

```java
@Test
@DisplayName("Deve rejeitar aluno com nome nulo")
void deveRejtarAlunoComNomeNulo() {
    // Arrange
    AlunoDTO alunoDTO = new AlunoDTO();
    alunoDTO.setNome(null);  // Nome inválido
    alunoDTO.setTurmaId(1L);

    // Act & Assert
    ResponseStatusException exception = assertThrows(
        ResponseStatusException.class,
        () -> alunoService.salvar(alunoDTO),
        "Deve lançar exceção para nome nulo"
    );

    assertTrue(exception.getReason().contains("Nome do aluno é obrigatório"));
}

@Test
@DisplayName("Deve rejeitar aluno com turmaId não existente")
void deveRejtarAlunoComTurmaInexistente() {
    // Arrange
    AlunoDTO alunoDTO = new AlunoDTO();
    alunoDTO.setNome("João Silva");
    alunoDTO.setTurmaId(999L);  // ID inexistente

    // Mock: turma não encontrada
    when(turmaRepository.findById(999L)).thenReturn(Optional.empty());

    // Act & Assert
    ResponseStatusException exception = assertThrows(
        ResponseStatusException.class,
        () -> alunoService.salvar(alunoDTO),
        "Deve lançar exceção para turma inexistente"
    );

    assertTrue(exception.getReason().contains("Turma não encontrada"));
}
```

---

## 4. Teste de Salvamento em Lote

### Teste Crítico: Pré-validação em Lote

```java
@Test
@DisplayName("Deve rejeitar lote se uma nota for inválida")
void deveRejtarLoteSeUmaNotaInvalida() {
    // Arrange: duas notas, uma inválida
    List<NotaDTO> notasDTOs = new ArrayList<>();
    
    NotaDTO dto1 = new NotaDTO();
    dto1.setAlunoId(1L);
    dto1.setAvaliacaoId(1L);
    dto1.setValor(8.0);  // ✓ Válida
    
    NotaDTO dto2 = new NotaDTO();
    dto2.setAlunoId(1L);
    dto2.setAvaliacaoId(2L);
    dto2.setValor(11.0);  // ✗ INVÁLIDA (> 10)
    
    notasDTOs.add(dto1);
    notasDTOs.add(dto2);

    // Act & Assert
    ResponseStatusException exception = assertThrows(
        ResponseStatusException.class,
        () -> notaService.salvarEmLote(notasDTOs),
        "Deve rejeitar lote com nota inválida"
    );

    assertTrue(exception.getReason().contains("Nota deve estar entre 0 e 10"));
    
    // Verificar que NENHUMA nota foi salva
    verify(notaRepository, never()).save(any(Nota.class));
}
```

---

## 5. Teste de Listagem

### Teste Simples: Listar Dados

```java
@Test
@DisplayName("Deve listar todos os alunos")
void deveListarTodosAlunos() {
    // Arrange: criar dois alunos
    Turma turma = new Turma();
    turma.setId(1L);
    turma.setNome("Turma A");

    Aluno aluno1 = new Aluno();
    aluno1.setId(1L);
    aluno1.setNome("João Silva");
    aluno1.setTurma(turma);

    Aluno aluno2 = new Aluno();
    aluno2.setId(2L);
    aluno2.setNome("Maria Santos");
    aluno2.setTurma(turma);

    // Mock
    when(alunoRepository.findAll()).thenReturn(List.of(aluno1, aluno2));

    // Act
    List<Aluno> resultado = alunoService.listarTodos();

    // Assert
    assertEquals(2, resultado.size(), "Deve retornar 2 alunos");
    verify(alunoRepository, times(1)).findAll();
}
```

---

## 6. Padrão AAA (Arrange-Act-Assert)

### Estrutura Recomendada

```java
@Test
@DisplayName("Descrição clara do comportamento esperado")
void nomeDescritivoDoTeste() {
    // ========== ARRANGE ==========
    // Preparar dados de entrada e mocks
    NotaDTO notaDTO = new NotaDTO();
    notaDTO.setValor(8.5);
    
    when(repository.findById(1L)).thenReturn(Optional.of(entity));

    // ========== ACT ==========
    // Executar a ação sendo testada
    Nota resultado = service.salvar(notaDTO);

    // ========== ASSERT ==========
    // Validar o resultado
    assertNotNull(resultado);
    assertEquals(8.5, resultado.getValor());
    verify(repository, times(1)).save(any(Nota.class));
}
```

---

## 7. Testando Comportamento de Erro

### Teste com Mockito Lenient

```java
@ExtendWith(MockitoExtension.class)
class NotaServiceTests {
    @Mock(lenient = true)  // Permite stubbings não utilizados
    private NotaRepository notaRepository;

    @InjectMocks
    private NotaService notaService;

    @Test
    void testeComMockLenient() {
        // Stubbings extras são permitidos
        when(notaRepository.findById(1L)).thenReturn(Optional.of(new Nota()));
        
        // Mesmo que nem todos sejam usados
        NotaDTO dto = new NotaDTO();
        dto.setValor(-5.0);
        
        assertThrows(ResponseStatusException.class, () -> notaService.salvar(dto));
    }
}
```

---

## 8. Assertions Úteis

```java
// Igualdade
assertEquals(8.1, media, 0.001);  // Com delta para doubles

// Nulidade
assertNotNull(resultado);
assertNull(resultado);

// Exceções
assertThrows(ResponseStatusException.class, () -> service.salvar(dto));

// Coleções
assertEquals(3, lista.size());
assertTrue(lista.contains(item));

// Condições
assertTrue(condicao);
assertFalse(condicao);

// Strings
assertTrue(mensagem.contains("Nota deve estar entre 0 e 10"));
```

---

## 9. Verificação de Mocks

```java
// Verificar chamadas
verify(repository, times(1)).save(any(Nota.class));
verify(repository, never()).delete(any());
verify(repository, atLeast(2)).findById(anyLong());

// Capturar argumentos
ArgumentCaptor<Nota> captor = ArgumentCaptor.forClass(Nota.class);
verify(repository).save(captor.capture());
Nota notaCapturada = captor.getValue();
assertEquals(8.0, notaCapturada.getValor());
```

---

## 10. Boas Práticas

### ✅ DO's

```java
// Usar @DisplayName para clareza
@DisplayName("Deve calcular média ponderada corretamente")

// Usar nomes descritivos
void deveRejtarNotaMenorQueZero() { }

// Separar Arrange, Act, Assert
// Arrange: Setup
// Act: Executar
// Assert: Validar

// Usar mocks para isolar lógica
@Mock
private NotaRepository notaRepository;

// Testar casos edge (0, limite, vazio)
```

### ❌ DON'Ts

```java
// ❌ Não usar nomes genéricos
void test() { }

// ❌ Não misturar múltiplas asserções sem contexto
assertEquals(x, 1);
assertEquals(y, 2);
assertEquals(z, 3);

// ❌ Não deixar testes dependentes
void test1() { }
void test2() { depends on test1 }

// ❌ Não usar Strings hardcoded sem constantes
if (resultado.equals("valor específico")) { }
```

---

## 📊 Cobertura de Casos

Para cada funcionalidade, testar:

```
1. Caso Feliz (Happy Path)
   ✓ Entrada válida → Resultado esperado

2. Casos Inválidos
   ✓ Valor < mínimo
   ✓ Valor > máximo
   ✓ Nulo
   ✓ Vazio
   ✓ Caracteres especiais (se aplicável)

3. Casos Edge
   ✓ Limite inferior exato
   ✓ Limite superior exato
   ✓ Valor zero (se aplicável)
   ✓ Lista vazia
   ✓ Lista com um item

4. Casos Excepcionais
   ✓ Dependência não encontrada (404)
   ✓ Conflito (409)
   ✓ Operação proibida (403)
```

---

## 🎓 Checklist para Novo Teste

- [ ] Nome do teste começa com "deve" ou "deveria"
- [ ] Anotação `@DisplayName` adicionada
- [ ] Estrutura AAA clara
- [ ] Mocks configurados corretamente
- [ ] Assertions específicas (não genéricas)
- [ ] Mensagens de erro descritivas
- [ ] Testa apenas um comportamento
- [ ] Independente de outros testes
- [ ] Executa rapidamente (< 100ms)
- [ ] Documentação em comentários se complexo

