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
        // Validação: nota deve estar entre 0 e 10
        if (notaDTO.getValor() < 0 || notaDTO.getValor() > 10) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nota deve estar entre 0 e 10");
        }

        Aluno aluno = alunoRepository.findById(notaDTO.getAlunoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));

        Avaliacao avaliacao = avaliacaoRepository.findById(notaDTO.getAvaliacaoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliação não encontrada"));

        // Verifica se já existe nota para esse aluno e avaliação
        Optional<Nota> existente = notaRepository.findByAlunoIdAndAvaliacaoId(aluno.getId(), avaliacao.getId());

        Nota nota;
        if (existente.isPresent()) {
            // sobrescreve a nota existente
            nota = existente.get();
            nota.setValor(notaDTO.getValor());
        } else {
            // cria nova nota
            nota = new Nota();
            nota.setAluno(aluno);
            nota.setAvaliacao(avaliacao);
            nota.setValor(notaDTO.getValor());
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

    public List<Nota> salvarEmLote(List<NotaDTO> notasDTO) {
        // Validar todas as notas antes de salvar
        notasDTO.forEach(notaDTO -> {
            if (notaDTO.getValor() < 0 || notaDTO.getValor() > 10) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "Nota deve estar entre 0 e 10. Aluno ID: " + notaDTO.getAlunoId() + ", Valor: " + notaDTO.getValor());
            }
        });

        return notasDTO.stream()
                .map(this::salvar) // usa a lógica de sobrescrita já existente
                .toList();
    }

}