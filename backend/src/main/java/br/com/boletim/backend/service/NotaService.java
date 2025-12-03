package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Avaliacao;
import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.dto.NotaDTO;
import br.com.boletim.backend.repository.AlunoRepository;
import br.com.boletim.backend.repository.AvaliacaoRepository;
import br.com.boletim.backend.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Nota salvar(NotaDTO notaDTO) {
        Aluno aluno = alunoRepository.findById(notaDTO.getAlunoId())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        Avaliacao avaliacao = avaliacaoRepository.findById(notaDTO.getAvaliacaoId())
                .orElseThrow(() -> new RuntimeException("Avaliação não encontrada"));

        Nota nota = new Nota();
        nota.setAluno(aluno);
        nota.setAvaliacao(avaliacao);
        nota.setValor(notaDTO.getValor());

        return notaRepository.save(nota);
    }

    public List<Nota> listarTodas() {
        return notaRepository.findAll();
    }

    public List<Nota> listarPorAluno(Long alunoId) {
        return notaRepository.findByAlunoId(alunoId);
    }
}