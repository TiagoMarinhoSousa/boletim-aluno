package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Avaliacao;
import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.dto.NotaDTO;
import br.com.boletim.backend.repository.AlunoRepository;
import br.com.boletim.backend.repository.AvaliacaoRepository;
import br.com.boletim.backend.repository.NotaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class NotaService {
    private final NotaRepository notaRepository;
    private final AlunoRepository alunoRepository;
    private final AvaliacaoRepository avaliacaoRepository;

    public NotaService(NotaRepository notaRepository,
            AlunoRepository alunoRepository,
            AvaliacaoRepository avaliacaoRepository) {
        this.notaRepository = notaRepository;
        this.alunoRepository = alunoRepository;
        this.avaliacaoRepository = avaliacaoRepository;
    }

    /**
     * Salva ou sobrescreve a nota de um aluno para uma avaliação.
     */
    public Nota salvar(NotaDTO notaDTO) {
        Long alunoId = notaDTO.getAlunoId();
        Long avaliacaoId = notaDTO.getAvaliacaoId();
        Double valorNota = notaDTO.getValor();

        // Validação explícita de nulidade para garantir type safety
        if (alunoId == null || avaliacaoId == null || valorNota == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "IDs de aluno, avaliação e o valor da nota não podem ser nulos.");
        }

        // Validação: nota deve estar entre 0 e 10
        if (valorNota < 0 || valorNota > 10) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nota deve estar entre 0 e 10");
        }

        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));

        Avaliacao avaliacao = avaliacaoRepository.findById(avaliacaoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliação não encontrada"));

        // Verifica se já existe nota para esse aluno e avaliação
        Optional<Nota> existente = notaRepository.findByAlunoIdAndAvaliacaoId(aluno.getId(), avaliacao.getId());

        Nota nota;
        if (existente.isPresent()) {
            // sobrescreve a nota existente
            nota = existente.get();
            nota.setValor(valorNota);
        } else {
            // cria nova nota
            nota = new Nota();
            nota.setAluno(aluno);
            nota.setAvaliacao(avaliacao);
            nota.setValor(valorNota);
        }

        return notaRepository.save(nota);
    }

    public List<Nota> listarTodas() {
        return notaRepository.findAll();
    }

    public List<NotaDTO> listarPorAluno(Long alunoId) {
        List<Nota> notas = notaRepository.findByAlunoId(alunoId);
        return notas.stream()
                .map(NotaDTO::new) // usa o construtor que criamos no DTO
                .toList();
    }

    public Double calcularMediaPonderadaPorAluno(Long alunoId) {
        List<Nota> notas = notaRepository.findByAlunoId(alunoId);
        if (notas.isEmpty()) {
            return 0.0;
        }

        double somaNotasXPeso = 0.0;
        int somaPesos = 0;

        for (Nota nota : notas) {
            int peso = nota.getAvaliacao().getPeso();
            somaNotasXPeso += nota.getValor() * peso;
            somaPesos += peso;
        }

        return somaPesos == 0 ? 0.0 : somaNotasXPeso / somaPesos;
    }

    public List<Nota> listarBoletimPorAluno(Long alunoId) {
        return notaRepository.findByAlunoId(alunoId);
    }

    public Double calcularMediaPonderadaPorDisciplina(Long disciplinaId) {
        List<Nota> notas = notaRepository.findAll().stream()
                .filter(n -> n.getAvaliacao().getDisciplina().getId().equals(disciplinaId))
                .toList();

        if (notas.isEmpty()) {
            return 0.0;
        }

        double somaNotasXPeso = 0.0;
        int somaPesos = 0;

        for (Nota nota : notas) {
            int peso = nota.getAvaliacao().getPeso();
            somaNotasXPeso += nota.getValor() * peso;
            somaPesos += peso;
        }

        return somaPesos == 0 ? 0.0 : somaNotasXPeso / somaPesos;
    }

    @Transactional
    public List<Nota> salvarEmLote(List<NotaDTO> notasDTO) {
        // Pré-validação: verifica se todas as notas estão no intervalo válido antes de
        // processar
        for (NotaDTO notaDTO : notasDTO) {
            Double valorNota = notaDTO.getValor();
            if (valorNota == null || valorNota < 0 || valorNota > 10) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nota deve estar entre 0 e 10");
            }
        }

        return notasDTO.stream()
                .map(this::salvar) // Reutiliza o método salvar, que agora contém toda a validação.
                .toList();
    }

}