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

import java.util.List;
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

        assertTrue(exception.getReason().contains("Nome do aluno é obrigatório"));
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

        assertTrue(exception.getReason().contains("Nome do aluno é obrigatório"));
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

        assertTrue(exception.getReason().contains("Nome do aluno é obrigatório"));
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

        assertTrue(exception.getReason().contains("turmaId é obrigatório"));
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

        assertTrue(exception.getReason().contains("Turma não encontrada"));
    }

    @Test
    @DisplayName("Deve rejeitar AlunoDTO nulo")
    void deveRejtarAlunoNulo() {
        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> alunoService.salvar(null),
            "Deve lançar exceção para AlunoDTO nulo"
        );

        assertTrue(exception.getReason().contains("Nome do aluno é obrigatório"));
    }

    // ========== TESTES DE CRIAÇÃO ==========

    @Test
    @DisplayName("Deve criar aluno com dados válidos")
    void deveCriarAlunoComDadosValidos() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("Maria Santos");
        alunoDTO.setTurmaId(1L);

        when(turmaRepository.findById(1L)).thenReturn(Optional.of(turma));
        when(alunoRepository.save(any(Aluno.class))).thenReturn(aluno);

        Aluno resultado = alunoService.salvar(alunoDTO);

        assertNotNull(resultado);
        assertEquals("João Silva", resultado.getNome());
        verify(alunoRepository, times(1)).save(any(Aluno.class));
    }

    @Test
    @DisplayName("Deve aceitar nome com caracteres especiais")
    void deveAceitarNomeComCaracteresEspeciais() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("João da Silva O'Brien");
        alunoDTO.setTurmaId(1L);

        when(turmaRepository.findById(1L)).thenReturn(Optional.of(turma));
        when(alunoRepository.save(any(Aluno.class))).thenReturn(aluno);

        Aluno resultado = alunoService.salvar(alunoDTO);

        assertNotNull(resultado);
        verify(alunoRepository, times(1)).save(any(Aluno.class));
    }

    @Test
    @DisplayName("Deve aceitar nome com acentuação")
    void deveAceitarNomeComAcentuacao() {
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome("José Antônio da Cruz");
        alunoDTO.setTurmaId(1L);

        when(turmaRepository.findById(1L)).thenReturn(Optional.of(turma));
        when(alunoRepository.save(any(Aluno.class))).thenReturn(aluno);

        Aluno resultado = alunoService.salvar(alunoDTO);

        assertNotNull(resultado);
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
    @DisplayName("Deve retornar nulo ao buscar aluno por ID inexistente")
    void deveRetornarNuloQuandoAlunoNaoExiste() {
        when(alunoRepository.findById(999L)).thenReturn(Optional.empty());

        Aluno resultado = alunoService.buscarPorId(999L);

        assertNull(resultado);
    }

    @Test
    @DisplayName("Deve listar todos os alunos")
    void deveListarTodosAlunos() {
        Aluno aluno2 = new Aluno();
        aluno2.setId(2L);
        aluno2.setNome("Maria Silva");
        aluno2.setTurma(turma);

        when(alunoRepository.findAll()).thenReturn(List.of(aluno, aluno2));

        List<Aluno> resultado = alunoService.listarTodos();

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

        when(alunoRepository.findByTurmaId(1L)).thenReturn(List.of(aluno, aluno2));

        List<Aluno> resultado = alunoService.buscarPorTurma(1L);

        assertEquals(2, resultado.size());
        verify(alunoRepository, times(1)).findByTurmaId(1L);
    }

    @Test
    @DisplayName("Deve retornar lista vazia ao buscar alunos de turma sem alunos")
    void deveRetornarListaVaziaQuandoTurmaSemAlunos() {
        when(alunoRepository.findByTurmaId(999L)).thenReturn(List.of());

        List<Aluno> resultado = alunoService.buscarPorTurma(999L);

        assertEquals(0, resultado.size());
    }

    // ========== TESTES DE EXCLUSÃO ==========

    @Test
    @DisplayName("Deve deletar aluno por ID")
    void deveDeletarAlunoPorId() {
        doNothing().when(alunoRepository).deleteById(1L);

        alunoService.deletar(1L);

        verify(alunoRepository, times(1)).deleteById(1L);
    }
}
