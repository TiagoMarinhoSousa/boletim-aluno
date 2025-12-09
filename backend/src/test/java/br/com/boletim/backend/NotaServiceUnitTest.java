package br.com.boletim.backend;

import br.com.boletim.backend.service.NotaService;
import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Avaliacao;
import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.domain.Turma;
import br.com.boletim.backend.dto.NotaDTO;
import br.com.boletim.backend.repository.AlunoRepository;
import br.com.boletim.backend.repository.AvaliacaoRepository;
import br.com.boletim.backend.repository.NotaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Testes do NotaService - Regras de Negócio")
class NotaServiceUnitTest {

    @Mock
    private NotaRepository notaRepository;

    @Mock
    private AlunoRepository alunoRepository;

    @Mock
    private AvaliacaoRepository avaliacaoRepository;

    @InjectMocks
    private NotaService notaService;

    private Aluno aluno;
    private Avaliacao avaliacao1;
    private Avaliacao avaliacao2;
    private Avaliacao avaliacao3;
    private Nota nota1;
    private Nota nota2;
    private Nota nota3;

    @BeforeEach
    void setUp() {
        // Setup Turma
        Turma turma = new Turma();
        turma.setId(1L);
        turma.setNome("Turma A");

        // Setup Aluno
        aluno = new Aluno();
        aluno.setId(1L);
        aluno.setNome("João Silva");
        aluno.setTurma(turma);

        // Setup Disciplina
        Disciplina disciplina = new Disciplina();
        disciplina.setId(1L);
        disciplina.setNome("Matemática");

        // Setup Avaliações com pesos diferentes
        avaliacao1 = new Avaliacao();
        avaliacao1.setId(1L);
        avaliacao1.setDescricao("Prova 1");
        avaliacao1.setPeso(3);
        avaliacao1.setDisciplina(disciplina);

        avaliacao2 = new Avaliacao();
        avaliacao2.setId(2L);
        avaliacao2.setDescricao("Trabalho");
        avaliacao2.setPeso(2);
        avaliacao2.setDisciplina(disciplina);

        avaliacao3 = new Avaliacao();
        avaliacao3.setId(3L);
        avaliacao3.setDescricao("Prova 2");
        avaliacao3.setPeso(5);
        avaliacao3.setDisciplina(disciplina);

        // Setup Notas
        nota1 = new Nota();
        nota1.setId(1L);
        nota1.setValor(8.0);
        nota1.setAluno(aluno);
        nota1.setAvaliacao(avaliacao1);

        nota2 = new Nota();
        nota2.setId(2L);
        nota2.setValor(6.0);
        nota2.setAluno(aluno);
        nota2.setAvaliacao(avaliacao2);

        nota3 = new Nota();
        nota3.setId(3L);
        nota3.setValor(9.0);
        nota3.setAluno(aluno);
        nota3.setAvaliacao(avaliacao3);
    }

    // ========== TESTES DE VALIDAÇÃO ==========

    @Test
    @DisplayName("Deve rejeitar nota menor que 0")
    void deveRejtarNotaMenorQueZero() {
        NotaDTO notaDTO = new NotaDTO();
        notaDTO.setAlunoId(1L);
        notaDTO.setAvaliacaoId(1L);
        notaDTO.setValor(-0.1);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> notaService.salvar(notaDTO),
            "Deve lançar exceção para nota negativa"
        );

        assertEquals("Nota deve estar entre 0 e 10", exception.getReason(), "A mensagem de erro para nota negativa está incorreta.");
    }

    @Test
    @DisplayName("Deve rejeitar nota maior que 10")
    void deveRejtarNotaMaiorQueDez() {
        NotaDTO notaDTO = new NotaDTO();
        notaDTO.setAlunoId(1L);
        notaDTO.setAvaliacaoId(1L);
        notaDTO.setValor(10.1);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> notaService.salvar(notaDTO),
            "Deve lançar exceção para nota > 10"
        );

        assertEquals("Nota deve estar entre 0 e 10", exception.getReason(), "A mensagem de erro para nota acima de 10 está incorreta.");
    }

    // ========== TESTES DE CÁLCULO DE MÉDIA PONDERADA ==========

    @Test
    @DisplayName("Deve calcular média ponderada corretamente com múltiplas notas")
    void deveCalcularMediaPonderadaCorretamente() {
        /*
         * Pesos: Avaliacao1=3, Avaliacao2=2, Avaliacao3=5
         * Notas: Avaliacao1=8.0, Avaliacao2=6.0, Avaliacao3=9.0
         * 
         * Média Ponderada = (8*3 + 6*2 + 9*5) / (3+2+5)
         *                 = (24 + 12 + 45) / 10
         *                 = 81 / 10
         *                 = 8.1
         */
        List<Nota> notas = List.of(nota1, nota2, nota3);
        when(notaRepository.findByAlunoId(1L)).thenReturn(notas);

        Double media = notaService.calcularMediaPonderadaPorAluno(1L);

        assertEquals(8.1, media, 0.001, "Média ponderada deve ser 8.1");
    }

    @Test
    @DisplayName("Deve retornar 0.0 quando não há notas registradas")
    void deveRetornarZeroQuandoSemNotas() {
        when(notaRepository.findByAlunoId(1L)).thenReturn(new ArrayList<>());

        Double media = notaService.calcularMediaPonderadaPorAluno(1L);

        assertEquals(0.0, media, "Média deve ser 0.0 quando não há notas");
    }

    @Test
    @DisplayName("Deve calcular média com uma única nota")
    void deveCalcularMediaComUmaNota() {
        /*
         * Uma única nota: 8.0 com peso 3
         * Média = (8*3) / 3 = 8.0
         */
        List<Nota> notas = List.of(nota1);
        when(notaRepository.findByAlunoId(1L)).thenReturn(notas);

        Double media = notaService.calcularMediaPonderadaPorAluno(1L);

        assertEquals(8.0, media, 0.001, "Média com uma nota deve ser igual à nota");
    }

    @Test
    @DisplayName("Deve calcular média ponderada com notas iguais")
    void deveCalcularMediaComNotasIguais() {
        /*
         * Todas as notas = 7.0 com pesos diferentes
         * Média = (7*3 + 7*2 + 7*5) / (3+2+5) = 70/10 = 7.0
         */
        nota1.setValor(7.0);
        nota2.setValor(7.0);
        nota3.setValor(7.0);
        
        List<Nota> notas = List.of(nota1, nota2, nota3);
        when(notaRepository.findByAlunoId(1L)).thenReturn(notas);

        Double media = notaService.calcularMediaPonderadaPorAluno(1L);

        assertEquals(7.0, media, 0.001, "Média com notas iguais deve ser igual ao valor das notas");
    }

    @Test
    @DisplayName("Deve calcular média com notas extremas (0 e 10)")
    void deveCalcularMediaComNotasExtremas() {
        /*
         * Nota 1: 0.0 (peso 1)
         * Nota 2: 10.0 (peso 1)
         * Média = (0*1 + 10*1) / 2 = 5.0
         */
        nota1.setValor(0.0);
        nota1.getAvaliacao().setPeso(1);
        nota2.setValor(10.0);
        nota2.getAvaliacao().setPeso(1);
        
        List<Nota> notas = List.of(nota1, nota2);
        when(notaRepository.findByAlunoId(1L)).thenReturn(notas);

        Double media = notaService.calcularMediaPonderadaPorAluno(1L);

        assertEquals(5.0, media, 0.001, "Média deve ser 5.0");
    }

    @Test
    @DisplayName("Deve calcular média por disciplina corretamente")
    void deveCalcularMediaPorDisciplinaCorretamente() {
        List<Nota> todasAsNotas = List.of(nota1, nota2, nota3);
        when(notaRepository.findAll()).thenReturn(todasAsNotas);

        Double media = notaService.calcularMediaPonderadaPorDisciplina(1L);

        assertEquals(8.1, media, 0.001, "Média por disciplina deve ser 8.1");
    }

    @Test
    @DisplayName("Deve retornar 0.0 para disciplina sem notas")
    void deveRetornarZeroParaDisciplinaSemNotas() {
        when(notaRepository.findAll()).thenReturn(new ArrayList<>());

        Double media = notaService.calcularMediaPonderadaPorDisciplina(999L);

        assertEquals(0.0, media, "Média deve ser 0.0 para disciplina sem notas");
    }

    @SuppressWarnings("null")
    @Test
    @DisplayName("Deve salvar múltiplas notas em lote com validação")
    void deveSalvarMultiplasNotasEmLote() {
        List<NotaDTO> notasDTOs = new ArrayList<>();
        
        NotaDTO dto1 = new NotaDTO();
        dto1.setAlunoId(1L);
        dto1.setAvaliacaoId(1L);
        dto1.setValor(8.0);
        
        NotaDTO dto2 = new NotaDTO();
        dto2.setAlunoId(1L);
        dto2.setAvaliacaoId(2L);
        dto2.setValor(7.0);
        
        notasDTOs.add(dto1);
        notasDTOs.add(dto2);

        when(alunoRepository.findById(1L)).thenReturn(Optional.of(aluno));
        when(avaliacaoRepository.findById(1L)).thenReturn(Optional.of(avaliacao1));
        when(avaliacaoRepository.findById(2L)).thenReturn(Optional.of(avaliacao2));
        when(notaRepository.findByAlunoIdAndAvaliacaoId(anyLong(), anyLong())).thenReturn(Optional.empty());
        when(notaRepository.save(any(Nota.class))).thenReturn(nota1, nota2);

        List<Nota> resultado = notaService.salvarEmLote(notasDTOs);

        assertNotNull(resultado, "A lista de resultados não deve ser nula");
        assertEquals(2, resultado.size(), "Deve salvar 2 notas");
        verify(notaRepository, times(2)).save(any(Nota.class));
    }

    @SuppressWarnings("null")
    @Test
    @DisplayName("Deve rejeitar lote se uma nota for inválida (pré-validação)")
    void deveRejtarLoteSeUmaNotaInvalida() {
        List<NotaDTO> notasDTOs = new ArrayList<>();
        
        NotaDTO dto1 = new NotaDTO();
        dto1.setAlunoId(1L);
        dto1.setAvaliacaoId(1L);
        dto1.setValor(8.0);
        
        NotaDTO dto2 = new NotaDTO();
        dto2.setAlunoId(1L);
        dto2.setAvaliacaoId(2L);
        dto2.setValor(11.0); // INVÁLIDO
        
        notasDTOs.add(dto1);
        notasDTOs.add(dto2);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> notaService.salvarEmLote(notasDTOs),
            "Deve rejeitar lote com nota inválida antes de salvar"
        );

        assertEquals("Nota deve estar entre 0 e 10", exception.getReason(), "A mensagem de erro para lote inválido está incorreta.");
        verify(notaRepository, never()).save(any(Nota.class));
    }

    @Test
    @DisplayName("Deve listar notas por aluno")
    void deveListarNotasPorAluno() {
        List<Nota> notas = List.of(nota1, nota2, nota3);
        when(notaRepository.findByAlunoId(1L)).thenReturn(notas);

        List<NotaDTO> resultado = notaService.listarPorAluno(1L);

        assertNotNull(resultado, "A lista de resultados não deve ser nula");
        assertEquals(3, resultado.size(), "Deve retornar 3 notas");
        assertNotNull(resultado.get(0), "Primeira nota não deve ser nula");
    }

}
