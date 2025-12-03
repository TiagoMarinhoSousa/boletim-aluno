package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.dto.DisciplinaDTO;
import br.com.boletim.backend.repository.DisciplinaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplinaService {
    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public Disciplina salvar(DisciplinaDTO disciplinaDTO) {
        Disciplina disciplina = new Disciplina();
        disciplina.setNome(disciplinaDTO.getNome());
        return disciplinaRepository.save(disciplina);
    }

    public List<Disciplina> listarTodas() {
        return disciplinaRepository.findAll();
    }

    public Disciplina buscarPorId(Long id) {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
    }

    public void deletar(Long id) {
        disciplinaRepository.deleteById(id);
    }
}