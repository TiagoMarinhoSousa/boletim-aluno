package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Avaliacao;
import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.dto.AvaliacaoDTO;
import br.com.boletim.backend.repository.AvaliacaoRepository;
import br.com.boletim.backend.repository.DisciplinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.http.HttpStatus;
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
        Long disciplinaId = avaliacaoDTO.getDisciplinaId();
        String descricao = avaliacaoDTO.getDescricao();

        // Validação explícita para garantir null-safety e robustez
        if (disciplinaId == null || descricao == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Descrição e ID da disciplina são obrigatórios.");
        }

        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Disciplina não encontrada com o ID: " + disciplinaId));

        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setDescricao(descricao);
        avaliacao.setDisciplina(disciplina);
        avaliacao.setPeso(avaliacaoDTO.getPeso());

        return avaliacaoRepository.save(avaliacao);
    }

    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAll();
    }

    public List<Avaliacao> listarPorDisciplina(Long disciplinaId) {
        if (disciplinaId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID da disciplina não pode ser nulo.");
        }
        return avaliacaoRepository.findByDisciplinaId(disciplinaId);
    }
}