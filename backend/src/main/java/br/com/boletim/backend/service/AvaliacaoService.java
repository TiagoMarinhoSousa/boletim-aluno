package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Avaliacao;
import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.dto.AvaliacaoDTO;
import br.com.boletim.backend.repository.AvaliacaoRepository;
import br.com.boletim.backend.repository.DisciplinaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {
    private final AvaliacaoRepository avaliacaoRepository;
    private final DisciplinaRepository disciplinaRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository,
            DisciplinaRepository disciplinaRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.disciplinaRepository = disciplinaRepository;
    }

    public Avaliacao salvar(AvaliacaoDTO avaliacaoDTO) {
        Disciplina disciplina = disciplinaRepository.findById(avaliacaoDTO.getDisciplinaId())
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));

        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setDescricao(avaliacaoDTO.getDescricao());
        avaliacao.setDisciplina(disciplina);
        avaliacao.setPeso(avaliacaoDTO.getPeso());
   
        return avaliacaoRepository.save(avaliacao);
    }

    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAll();
    }

    public List<Avaliacao> listarPorDisciplina(Long disciplinaId) {
        return avaliacaoRepository.findByDisciplinaId(disciplinaId);
    }
}