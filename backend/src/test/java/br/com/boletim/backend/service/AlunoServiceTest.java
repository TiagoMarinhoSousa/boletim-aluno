package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Turma;
import br.com.boletim.backend.dto.AlunoDTO;
import br.com.boletim.backend.repository.AlunoRepository;
import br.com.boletim.backend.repository.NotaRepository;
import br.com.boletim.backend.repository.TurmaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Testes do AlunoService - Validações e Regras de Negócio")
class AlunoServiceTest {

    @Mock
    private AlunoRepository alunoRepository;

    @Mock
    private NotaRepository notaRepository;

    @Mock
    private TurmaRepository turmaRepository;

    @InjectMocks
    private AlunoService alunoService;

    private Turma turma;
    private Aluno aluno;

    @BeforeEach
    void setUp() {
        turma = new Turma();
        turma.setId(1L);
        turma.setNome("Turma A");

        aluno = new Aluno();
        aluno.setId(1L);
        aluno.setNome("João Silva");
        aluno.setTurma(turma);
    }

    // ========== TESTES DE VALIDAÇÃO ==========

    @Test
    @DisplayName("Deve rejeitar aluno com nome nulo")
    void deveRejtarAlunoComNomeNulo() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome(null);
        alunoDTO.setTurmaId(1L);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> alunoService.salvar(alunoDTO),
            "Deve lançar exceção para nome nulo"
        );

        assertEquals("Nome do aluno e ID da turma são obrigatórios.", exception.getReason());
    }

    @Test
    @DisplayName("Deve rejeitar aluno com nome vazio")
    void deveRejtarAlunoComNomeVazio() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("");
        alunoDTO.setTurmaId(1L);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> alunoService.salvar(alunoDTO),
            "Deve lançar exceção para nome vazio"
        );

        assertEquals("Nome do aluno e ID da turma são obrigatórios.", exception.getReason());
    }

    @Test
    @DisplayName("Deve rejeitar aluno com nome apenas espaços")
    void deveRejtarAlunoComNomeApenasEspacos() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("   ");
        alunoDTO.setTurmaId(1L);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> alunoService.salvar(alunoDTO),
            "Deve lançar exceção para nome com apenas espaços"
        );

        assertEquals("Nome do aluno e ID da turma são obrigatórios.", exception.getReason());
    }

    @Test
    @DisplayName("Deve rejeitar aluno com turmaId nulo")
    void deveRejtarAlunoComTurmaIdNulo() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("João Silva");
        alunoDTO.setTurmaId(null);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> alunoService.salvar(alunoDTO),
            "Deve lançar exceção para turmaId nulo"
        );

        assertEquals("Nome do aluno e ID da turma são obrigatórios.", exception.getReason());
    }

    @Test
    @DisplayName("Deve rejeitar aluno com turmaId não existente")
    void deveRejtarAlunoComTurmaInexistente() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("João Silva");
        alunoDTO.setTurmaId(999L);

        when(turmaRepository.findById(999L)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> alunoService.salvar(alunoDTO),
            "Deve lançar exceção para turma inexistente"
        );

        assertEquals("Turma não encontrada com o ID: 999", exception.getReason());
    }

    @Test
    @DisplayName("Deve rejeitar AlunoDTO nulo")
    void deveRejtarAlunoDTONulo() {
        assertThrows(
            NullPointerException.class,
            () -> alunoService.salvar(null),
            "Deve lançar exceção para AlunoDTO nulo"
        );
    }

    // ========== TESTES DE CRIAÇÃO ==========

    @SuppressWarnings("null")
    @Test
    @DisplayName("Deve criar aluno com dados válidos")
    void deveCriarAlunoComDadosValidos() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("Maria Santos");
        alunoDTO.setTurmaId(1L);

        // Mock the object that should be returned by the save operation
        Aluno alunoSalvo = new Aluno();
        alunoSalvo.setId(2L);
        alunoSalvo.setNome("Maria Santos");
        alunoSalvo.setTurma(turma);

        when(turmaRepository.findById(1L)).thenReturn(Optional.of(turma));
        when(alunoRepository.save(any(Aluno.class))).thenReturn(alunoSalvo);

        Aluno resultado = alunoService.salvar(alunoDTO); // O aluno mockado tem nome "João Silva"

        // Use assertAll for grouped, null-safe assertions
        assertAll("Verificações do aluno salvo",
            () -> assertNotNull(resultado, "O resultado não deve ser nulo"),
            () -> assertEquals("Maria Santos", resultado.getNome(), "O nome do aluno salvo deve ser o esperado")
        );
        verify(alunoRepository, times(1)).save(any(Aluno.class));
    }

    @SuppressWarnings("null")
    @Test
    @DisplayName("Deve aceitar nome com caracteres especiais")
    void deveAceitarNomeComCaracteresEspeciais() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("João da Silva O'Brien");
        alunoDTO.setTurmaId(1L);

        Aluno alunoComCaracteresEspeciais = new Aluno();
        alunoComCaracteresEspeciais.setNome("João da Silva O'Brien");
        alunoComCaracteresEspeciais.setTurma(turma);

        when(turmaRepository.findById(1L)).thenReturn(Optional.of(turma));
        when(alunoRepository.save(any(Aluno.class))).thenReturn(alunoComCaracteresEspeciais);

        Aluno resultado = alunoService.salvar(alunoDTO);

        assertAll("Verificações do aluno com caracteres especiais",
            () -> assertNotNull(resultado, "O resultado não deve ser nulo"),
            () -> assertEquals("João da Silva O'Brien", resultado.getNome(), "O nome do aluno deve ser o esperado")
        );
        verify(alunoRepository, times(1)).save(any(Aluno.class));
    }

    @SuppressWarnings("null")
    @Test
    @DisplayName("Deve aceitar nome com acentuação")
    void deveAceitarNomeComAcentuacao() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("José Antônio da Cruz");
        alunoDTO.setTurmaId(1L);

        Aluno alunoComAcentuacao = new Aluno();
        alunoComAcentuacao.setNome("José Antônio da Cruz");
        alunoComAcentuacao.setTurma(turma);

        when(turmaRepository.findById(1L)).thenReturn(Optional.of(turma));
        when(alunoRepository.save(any(Aluno.class))).thenReturn(alunoComAcentuacao);

        Aluno resultado = alunoService.salvar(alunoDTO);

        assertAll("Verificações do aluno com acentuação",
            () -> assertNotNull(resultado, "O resultado não deve ser nulo"),
            () -> assertEquals("José Antônio da Cruz", resultado.getNome(), "O nome do aluno deve ser o esperado")
        );
        verify(alunoRepository, times(1)).save(any(Aluno.class));
    }

    // ========== TESTES DE BUSCA ==========

    @Test
    @DisplayName("Deve buscar aluno por ID quando existe")
    void deveBuscarAlunoPorIdQuandoExiste() {
        when(alunoRepository.findById(1L)).thenReturn(Optional.of(aluno));

        Aluno resultado = alunoService.buscarPorId(1L);

        assertNotNull(resultado);
        assertEquals("João Silva", resultado.getNome());
    }

    @Test
    @DisplayName("Deve lançar exceção 404 ao buscar aluno por ID inexistente")
    void deveLancarExcecaoQuandoAlunoNaoExiste() {
        when(alunoRepository.findById(999L)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> alunoService.buscarPorId(999L)
        );

        assertEquals(404, exception.getStatusCode().value());
    }

    @Test
    @DisplayName("Deve listar todos os alunos")
    void deveListarTodosAlunos() {
        Aluno aluno2 = new Aluno();
        aluno2.setId(2L);
        aluno2.setNome("Maria Silva");
        aluno2.setTurma(turma);

        when(alunoRepository.findAll()).thenReturn(java.util.List.of(aluno, aluno2));

        java.util.List<Aluno> resultado = alunoService.listarTodos();
        assertNotNull(resultado, "A lista de resultados não deve ser nula");

        assertEquals(2, resultado.size());
        verify(alunoRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Deve buscar alunos por turma")
    void deveBuscarAlunosPorTurma() {
        Aluno aluno2 = new Aluno();
        aluno2.setId(2L);
        aluno2.setNome("Maria Silva");
        aluno2.setTurma(turma);

        when(alunoRepository.findByTurmaId(1L)).thenReturn(java.util.List.of(aluno, aluno2));

        java.util.List<Aluno> resultado = alunoService.buscarPorTurma(1L);
        assertNotNull(resultado, "A lista de resultados não deve ser nula");

        assertEquals(2, resultado.size());
        verify(alunoRepository, times(1)).findByTurmaId(1L);
    }

    @Test
    @DisplayName("Deve retornar lista vazia ao buscar alunos de turma sem alunos")
    void deveRetornarListaVaziaQuandoTurmaSemAlunos() {
        when(alunoRepository.findByTurmaId(999L)).thenReturn(java.util.List.of());

        java.util.List<Aluno> resultado = alunoService.buscarPorTurma(999L);
        assertNotNull(resultado, "A lista de resultados não deve ser nula");

        assertEquals(0, resultado.size());
    }

    // ========== TESTES DE EXCLUSÃO ==========

    @Test
    @DisplayName("Deve deletar aluno por ID")
    void deveDeletarAlunoPorId() {
        when(alunoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(alunoRepository).deleteById(1L);

        alunoService.deletar(1L);

        verify(alunoRepository, times(1)).deleteById(1L);
    }
}
