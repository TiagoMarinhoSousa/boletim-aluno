package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Turma;
import br.com.boletim.backend.dto.TurmaDTO;
import br.com.boletim.backend.repository.TurmaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;

    public TurmaService(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    public List<Turma> listarTodas() {
        return turmaRepository.findAll();
    }

    public Turma buscarPorId(Long id) {
        return turmaRepository.findById(id).orElse(null);
    }

    public Turma salvar(TurmaDTO turmaDTO) {
        Turma turma = new Turma();
        turma.setNome(turmaDTO.getNome());
        return turmaRepository.save(turma);
    }

    public void deletar(Long id) {
        turmaRepository.deleteById(id);
    }
}