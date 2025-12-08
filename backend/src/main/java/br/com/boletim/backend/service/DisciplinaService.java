package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.dto.DisciplinaDTO;
import br.com.boletim.backend.repository.DisciplinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.http.HttpStatus;
import java.util.List;

@Service
public class DisciplinaService {
    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public Disciplina salvar(DisciplinaDTO disciplinaDTO) {
        String nome = disciplinaDTO.getNome();
        // Validação explícita para garantir null-safety e robustez
        if (nome == null || nome.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da disciplina é obrigatório.");
        }

        Disciplina disciplina = new Disciplina();
        disciplina.setNome(nome);
        return disciplinaRepository.save(disciplina);
    }

    public List<Disciplina> listarTodas() {
        return disciplinaRepository.findAll();
    }

    public Disciplina buscarPorId(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID da disciplina não pode ser nulo.");
        }
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Disciplina não encontrada com o ID: " + id));
    }

    public void deletar(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID da disciplina não pode ser nulo.");
        }
        if (!disciplinaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Disciplina não encontrada com o ID: " + id);
        }
        disciplinaRepository.deleteById(id);
    }
}